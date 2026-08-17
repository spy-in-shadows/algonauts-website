import { getStore } from "@netlify/blobs";
import type { LeaderboardMember } from "./codeforces";

const STORE_NAME = "leaderboard";
const DATA_KEY = "data";

export interface LeaderboardBlobData {
  members: LeaderboardMember[];
  lastUpdatedAt: number; // unix timestamp ms
  lastContestId: number; // CF contest ID of the last detected contest
}

function getLeaderboardStore() {
  return getStore(STORE_NAME);
}

/** Read leaderboard data from the blob store. Returns null if not yet populated. */
export async function readLeaderboardBlob(): Promise<LeaderboardBlobData | null> {
  try {
    const store = getLeaderboardStore();
    const data = await store.get(DATA_KEY, { type: "json" });
    return data as LeaderboardBlobData | null;
  } catch (e) {
    console.warn("Failed to read leaderboard blob:", e);
    return null;
  }
}

/** Write full leaderboard data to the blob store. */
export async function writeLeaderboardBlob(data: LeaderboardBlobData): Promise<void> {
  const store = getLeaderboardStore();
  await store.setJSON(DATA_KEY, data);
}
