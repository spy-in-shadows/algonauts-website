import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import membersData from "@/data/members.json";
import orgHandles from "@/data/org-handles.json";
import { getLeaderboardData } from "@/lib/codeforces";

// ISR: rebuild this page at most once every 10 minutes
export const revalidate = 600;

export default async function Leaderboard() {
  const members = await getLeaderboardData(membersData, orgHandles);

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
