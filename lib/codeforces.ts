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

const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function getCachedData<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION_MS) {
      return data as T;
    }
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Error reading localStorage cache for key:", key, e);
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (e) {
    console.error("Error writing to localStorage cache for key:", key, e);
  }
}

// Fetch users info in batch
export async function fetchCFUsers(handles: string[]): Promise<CodeforcesUser[]> {
  if (handles.length === 0) return [];
  
  const cacheKey = `cf_users_${handles.sort().join("_")}`;
  const cached = getCachedData<CodeforcesUser[]>(cacheKey);
  if (cached) return cached;

  // Codeforces uses semicolon separation for multiple handles
  const url = `https://codeforces.com/api/user.info?handles=${handles.join(";")}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Codeforces API returned error status: ${res.status}`);
  }

  const json = await res.ok ? await res.json() : null;
  if (!json || json.status !== "OK") {
    throw new Error(`Codeforces API error: ${json?.comment || 'unknown'}`);
  }

  const users: CodeforcesUser[] = json.result;
  setCachedData(cacheKey, users);
  return users;
}

// Fetch rating history for a single user
export async function fetchCFRatingHistory(handle: string): Promise<CodeforcesRatingChange[]> {
  const cacheKey = `cf_rating_history_${handle}`;
  const cached = getCachedData<CodeforcesRatingChange[]>(cacheKey);
  if (cached) return cached;

  const url = `https://codeforces.com/api/user.rating?handle=${handle}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Codeforces API returned error status: ${res.status}`);
  }

  const json = await res.json();
  if (json.status !== "OK") {
    throw new Error(`Codeforces API error: ${json.comment}`);
  }

  const history: CodeforcesRatingChange[] = json.result;
  setCachedData(cacheKey, history);
  return history;
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

// Batch fetch and process all leaderboard members combining organization list
export async function getLeaderboardData(
  members: { name: string; handle: string; role: string; linkedin?: string }[],
  orgHandles: string[]
): Promise<LeaderboardMember[]> {
  // 1. Gather all unique handles, filtering out empty ones (e.g. Mahin Patel with no handle)
  const teamHandles = members.map((m) => m.handle.toLowerCase()).filter(Boolean);
  const orgHandlesClean = orgHandles.map((h) => h.toLowerCase()).filter(Boolean);
  
  const allHandlesSet = new Set([...teamHandles, ...orgHandlesClean]);
  const allHandles = Array.from(allHandlesSet);

  if (allHandles.length === 0) return [];

  // 2. Fetch all user info in ONE batch API request
  const users = await fetchCFUsers(allHandles);
  const userMap = new Map(users.map((u) => [u.handle.toLowerCase(), u]));

  // Create members lookup maps
  const memberMap = new Map(members.map((m) => [m.handle.toLowerCase(), m]));

  // Assemble base members info
  const assembled: LeaderboardMember[] = allHandles.map((handle) => {
    const cfUser = userMap.get(handle.toLowerCase());
    const member = memberMap.get(handle.toLowerCase());

    // Dynamically resolve display name
    let name = handle;
    if (member) {
      name = member.name;
    } else if (cfUser) {
      const parts = [cfUser.firstName, cfUser.lastName].filter(Boolean);
      if (parts.length > 0) {
        name = parts.join(" ");
      }
    }

    const role = member ? member.role : "Club Competitor";
    const linkedin = member?.linkedin || "";

    return {
      name,
      role,
      handle: cfUser?.handle || handle,
      rating: cfUser?.rating ?? 0,
      maxRating: cfUser?.maxRating ?? 0,
      rank: cfUser?.rank ?? "unrated",
      avatarUrl: cfUser?.titlePhoto ?? cfUser?.avatar,
      linkedin,
      delta: 0,
      history: [] as CodeforcesRatingChange[],
    };
  });

  // Sort by rating descending so we can extract top performers
  assembled.sort((a, b) => b.rating - a.rating);

  // 3. Fetch rating history ONLY for the top 15 performers to prevent 429 rate limit errors (5 reqs/sec)
  const top15 = assembled.slice(0, 15);
  const historyPromises = top15.map(async (member) => {
    try {
      const history = await fetchCFRatingHistory(member.handle);
      return { handle: member.handle.toLowerCase(), history };
    } catch (e) {
      console.warn(`Failed to fetch history for ${member.handle}, using empty`, e);
      return { handle: member.handle.toLowerCase(), history: [] as CodeforcesRatingChange[] };
    }
  });

  const histories = await Promise.all(historyPromises);
  const historyMap = new Map(histories.map((h) => [h.handle, h.history]));

  const lastUpdatedTime = new Date().toLocaleTimeString();

  // Apply rating history details and calculate rating deltas
  return assembled.map((member) => {
    const history = historyMap.get(member.handle.toLowerCase()) || [];
    let delta = 0;
    if (history.length > 0) {
      const last = history[history.length - 1];
      delta = last.newRating - last.oldRating;
    }

    return {
      ...member,
      delta,
      history,
      lastUpdated: lastUpdatedTime,
    };
  });
}
