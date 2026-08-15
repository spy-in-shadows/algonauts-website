export interface CodeforcesUser {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  avatar?: string;
  titlePhoto?: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
}

export interface CodeforcesRatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

export interface LeaderboardMember {
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

// Fetch all user info in one batch request — Next.js caches this fetch server-side
export async function fetchCFUsers(handles: string[]): Promise<CodeforcesUser[]> {
  if (handles.length === 0) return [];
  const url = `https://codeforces.com/api/user.info?handles=${handles.join(";")}`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`CF user.info failed: ${res.status}`);
  const json = await res.json();
  if (json.status !== "OK") throw new Error(`CF API error: ${json.comment}`);
  return json.result as CodeforcesUser[];
}

// Fetch rating history for a single user — Next.js caches this fetch server-side
export async function fetchCFRatingHistory(handle: string): Promise<CodeforcesRatingChange[]> {
  const url = `https://codeforces.com/api/user.rating?handle=${handle}`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`CF user.rating failed for ${handle}: ${res.status}`);
  const json = await res.json();
  if (json.status !== "OK") throw new Error(`CF API error for ${handle}: ${json.comment}`);
  return json.result as CodeforcesRatingChange[];
}

// Batch-fetch and process all leaderboard members, combining org group handles
export async function getLeaderboardData(
  members: { name: string; handle: string; role: string; linkedin?: string }[],
  orgHandles: string[]
): Promise<LeaderboardMember[]> {
  const teamHandles = members.map((m) => m.handle.toLowerCase()).filter(Boolean);
  const orgHandlesClean = orgHandles.map((h) => h.toLowerCase()).filter(Boolean);
  const allHandles = Array.from(new Set([...teamHandles, ...orgHandlesClean]));

  if (allHandles.length === 0) return [];

  // 1. Batch-fetch all user info in ONE API call
  const users = await fetchCFUsers(allHandles);
  const userMap = new Map(users.map((u) => [u.handle.toLowerCase(), u]));
  const memberMap = new Map(members.map((m) => [m.handle.toLowerCase(), m]));

  // 2. Assemble base info
  const assembled: LeaderboardMember[] = allHandles.map((handle) => {
    const cfUser = userMap.get(handle.toLowerCase());
    const member = memberMap.get(handle.toLowerCase());

    let name = handle;
    if (member) {
      name = member.name;
    } else if (cfUser) {
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

  // Sort by rating descending
  assembled.sort((a, b) => b.rating - a.rating);

  // 3. Fetch rating history for ALL members in sequential batches of 4 with 300ms delay
  // Each fetch is individually cached by Next.js — repeat builds are near-instant
  const BATCH_SIZE = 4;
  const BATCH_DELAY_MS = 300;
  const historyMap = new Map<string, CodeforcesRatingChange[]>();

  for (let i = 0; i < assembled.length; i += BATCH_SIZE) {
    const batch = assembled.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(async (member) => {
        try {
          const history = await fetchCFRatingHistory(member.handle);
          return { handle: member.handle.toLowerCase(), history };
        } catch (e) {
          console.warn(`History fetch failed for ${member.handle}:`, e);
          return { handle: member.handle.toLowerCase(), history: [] as CodeforcesRatingChange[] };
        }
      })
    );
    for (const r of batchResults) historyMap.set(r.handle, r.history);
    if (i + BATCH_SIZE < assembled.length) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  const lastUpdatedTime = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });

  return assembled.map((member) => {
    const history = historyMap.get(member.handle.toLowerCase()) ?? [];
    const delta =
      history.length > 0
        ? history[history.length - 1].newRating - history[history.length - 1].oldRating
        : 0;
    return { ...member, delta, history, lastUpdated: lastUpdatedTime };
  });
}

