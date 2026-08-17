import { NextRequest, NextResponse } from "next/server";
import { getLeaderboardData, getLatestFinishedContestId } from "@/lib/codeforces";
import { readLeaderboardBlob, writeLeaderboardBlob } from "@/lib/leaderboard-blob";
import membersData from "@/data/members.json";
import orgHandles from "@/data/org-handles.json";

export const maxDuration = 60; // Max allowable duration
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return handleRefresh(req);
}

export async function POST(req: NextRequest) {
  return handleRefresh(req);
}

async function handleRefresh(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const force = searchParams.get("force") === "true";
  const secret = searchParams.get("secret");

  // Optional authentication via REFRESH_SECRET if configured in env
  const expectedSecret = process.env.REFRESH_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const latestContestId = await getLatestFinishedContestId();
    const existingBlob = await readLeaderboardBlob();

    if (!force && existingBlob && latestContestId > 0 && latestContestId <= existingBlob.lastContestId) {
      return NextResponse.json({
        message: "No new contest detected. Data unchanged.",
        lastContestId: existingBlob.lastContestId,
        lastUpdatedAt: existingBlob.lastUpdatedAt,
        memberCount: existingBlob.members.length,
      });
    }

    // Fetch full data for all handles
    const members = await getLeaderboardData(membersData, orgHandles, {
      fetchAll: true,
      delayMs: 300,
    });

    const blobData = {
      members,
      lastUpdatedAt: Date.now(),
      lastContestId: latestContestId,
    };

    await writeLeaderboardBlob(blobData);

    return NextResponse.json({
      success: true,
      message: `Updated ${members.length} members with full rating history.`,
      lastContestId: latestContestId,
      lastUpdatedAt: blobData.lastUpdatedAt,
      memberCount: members.length,
    });
  } catch (err: any) {
    console.error("Refresh API error:", err);
    return NextResponse.json(
      { error: "Failed to refresh leaderboard data", details: err?.message },
      { status: 500 }
    );
  }
}
