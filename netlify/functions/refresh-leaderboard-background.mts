import type { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import membersData from "../../data/members.json" with { type: "json" };
import orgHandles from "../../data/org-handles.json" with { type: "json" };

interface CodeforcesUser {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  avatar?: string;
  titlePhoto?: string;
  firstName?: string;
  lastName?: string;
}

interface CodeforcesRatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

interface LeaderboardMember {
  name: string;
  role: string;
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  delta: number;
  history: CodeforcesRatingChange[];
  avatarUrl?: string;
  linkedin?: string;
  lastUpdated?: string;
}

interface LeaderboardBlobData {
  members: LeaderboardMember[];
  lastUpdatedAt: number;
  lastContestId: number;
}

async function fetchCFUsers(handles: string[]): Promise<CodeforcesUser[]> {
  if (handles.length === 0) return [];
  const url = `https://codeforces.com/api/user.info?handles=${handles.join(";")}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CF user.info failed: ${res.status}`);
  const json = (await res.json()) as { status: string; result: CodeforcesUser[] };
  if (json.status !== "OK") throw new Error(`CF API error`);
  return json.result;
}

async function fetchCFRatingHistory(handle: string): Promise<CodeforcesRatingChange[]> {
  try {
    const url = `https://codeforces.com/api/user.rating?handle=${handle}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = (await res.json()) as { status: string; result: CodeforcesRatingChange[] };
    if (json.status !== "OK") return [];
    return json.result;
  } catch (e) {
    return [];
  }
}

async function getLatestFinishedContestId(): Promise<number> {
  try {
    const res = await fetch("https://codeforces.com/api/contest.list?gym=false");
    if (!res.ok) return 0;
    const json = (await res.json()) as { status: string; result: { id: number; phase: string }[] };
    if (json.status !== "OK") return 0;
    const finished = json.result.filter((c) => c.phase === "FINISHED");
    return finished.length > 0 ? finished[0].id : 0;
  } catch (e) {
    return 0;
  }
}

async function buildLeaderboardData(): Promise<LeaderboardMember[]> {
  const teamHandles = (membersData as { handle: string }[]).map((m) => m.handle.toLowerCase()).filter(Boolean);
  const orgHandlesClean = (orgHandles as string[]).map((h) => h.toLowerCase()).filter(Boolean);
  const allHandles = Array.from(new Set([...teamHandles, ...orgHandlesClean]));

  if (allHandles.length === 0) return [];

  const memberMap = new Map((membersData as { name: string; handle: string; role: string; linkedin?: string }[]).map((m) => [m.handle.toLowerCase(), m]));

  const users = await fetchCFUsers(allHandles);
  const userMap = new Map(users.map((u) => [u.handle.toLowerCase(), u]));

  const assembled: LeaderboardMember[] = allHandles.map((handle) => {
    const cfUser = userMap.get(handle);
    const member = memberMap.get(handle);
    let name = handle;
    if (member) name = member.name;
    else if (cfUser) {
      const parts = [cfUser.firstName, cfUser.lastName].filter(Boolean);
      if (parts.length > 0) name = parts.join(" ");
    }
    return {
      name,
      role: member ? "Algonauts Member" : "Club Competitor",
      handle: cfUser?.handle || handle,
      rating: cfUser?.rating ?? 0,
      maxRating: cfUser?.maxRating ?? 0,
      rank: cfUser?.rank ?? "unrated",
      avatarUrl: cfUser?.titlePhoto ?? cfUser?.avatar,
      linkedin: member?.linkedin || "",
      delta: 0,
      history: [],
    };
  });

  assembled.sort((a, b) => b.rating - a.rating);

  const historyMap = new Map<string, CodeforcesRatingChange[]>();

  for (let i = 0; i < assembled.length; i++) {
    const member = assembled[i];
    const history = await fetchCFRatingHistory(member.handle);
    historyMap.set(member.handle.toLowerCase(), history);
    // 220ms strictly serial delay — zero rate limits on CF across 194 handles
    await new Promise((r) => setTimeout(r, 220));
  }

  const lastUpdatedTime = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });

  return assembled.map((member) => {
    const history = historyMap.get(member.handle.toLowerCase()) ?? [];
    const delta = history.length > 0
      ? history[history.length - 1].newRating - history[history.length - 1].oldRating
      : 0;
    return { ...member, delta, history, lastUpdated: lastUpdatedTime };
  });
}

export const handler: Handler = async () => {
  console.log("[refresh-leaderboard-background] Starting background check...");

  try {
    const store = getStore("leaderboard");

    const latestContestId = await getLatestFinishedContestId();
    console.log(`[refresh-leaderboard-background] Latest finished contest: ${latestContestId}`);

    let existingData: LeaderboardBlobData | null = null;
    try {
      existingData = (await store.get("data", { type: "json" })) as LeaderboardBlobData | null;
    } catch {
      // blob doesn't exist yet
    }

    const lastContestId = existingData?.lastContestId ?? 0;
    console.log(`[refresh-leaderboard-background] Last stored contest: ${lastContestId}`);

    if (existingData && latestContestId > 0 && latestContestId <= lastContestId) {
      console.log("[refresh-leaderboard-background] No new contest detected. Skipping fetch.");
      return { statusCode: 200, body: "No new contest." };
    }

    console.log("[refresh-leaderboard-background] Fetching fresh Codeforces data for all handles...");
    const members = await buildLeaderboardData();

    const blobData: LeaderboardBlobData = {
      members,
      lastUpdatedAt: Date.now(),
      lastContestId: latestContestId,
    };

    await store.setJSON("data", blobData);
    console.log(`[refresh-leaderboard-background] Blob successfully updated with ${members.length} members.`);

    return {
      statusCode: 200,
      body: `Updated ${members.length} members.`,
    };
  } catch (err) {
    console.error("[refresh-leaderboard-background] Error:", err);
    return { statusCode: 500, body: "Refresh failed" };
  }
};
