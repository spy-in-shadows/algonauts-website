import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import { LeaderboardMember } from "@/lib/codeforces";
import { readLeaderboardBlob } from "@/lib/leaderboard-blob";
import cachedLeaderboard from "@/data/leaderboard-cache.json";

// ISR: recheck blob storage at most once every 5 minutes
export const revalidate = 300;

export default async function Leaderboard() {
  // 1. Try reading from persistent Netlify Blob storage (populated after contests by background worker)
  const blobData = await readLeaderboardBlob();
  
  // 2. If blob exists and has data, use it. Otherwise, use full 194-member pre-cached baseline dataset!
  const members: LeaderboardMember[] =
    blobData && blobData.members && blobData.members.length > 0
      ? blobData.members
      : (cachedLeaderboard as LeaderboardMember[]);

  return (
    <>
      <Navbar />
      <main className="flex-grow py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8 space-y-12">
        {/* Title Header */}
        <div className="space-y-4 max-w-xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-fg tracking-tight">
            NST-ADYPU Standings (Codeforces)
          </h1>
          <p className="text-fg-muted font-sans text-sm md:text-base leading-relaxed">
            Track official handles, current ratings, maximum ratings achieved, and recent round deltas for all NST-ADYPU students.
          </p>
        </div>

        {/* Live Leaderboard Datatable block */}
        <LeaderboardTable initialMembers={members} />
      </main>
      <Footer />
    </>
  );
}

