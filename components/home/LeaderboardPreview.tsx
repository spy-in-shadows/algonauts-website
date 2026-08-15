"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import membersData from "@/data/members.json";
import orgHandles from "@/data/org-handles.json";
import { getLeaderboardData, LeaderboardMember } from "@/lib/codeforces";
import { getRatingTier } from "@/lib/ratingColor";
import { Trophy, ArrowUpRight, ShieldAlert } from "lucide-react";

export default function LeaderboardPreview() {
  const [topMembers, setTopMembers] = useState<LeaderboardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPreview() {
      try {
        const data = await getLeaderboardData(membersData, []);
        // Sort by current rating descending
        const sorted = data.sort((a, b) => b.rating - a.rating);
        setTopMembers(sorted);
      } catch (err) {
        console.error("Leaderboard preview failed to fetch:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadPreview();
  }, []);

  return (
    <section className="py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Callout text */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="inline-flex p-2.5 bg-accent/10 border border-accent/20 text-accent rounded-md">
            <Trophy size={20} />
          </div>
          <h2 className="font-heading font-semibold text-2xl md:text-3xl tracking-tight text-fg">
            Club Members Leaderboard
          </h2>
          <p className="text-fg-muted font-sans text-sm md:text-base leading-relaxed">
            We track our core club members' ratings on Codeforces. Here is a preview of our leading coordinators who guide the club's workshops and contest schedules.
          </p>
          <div className="pt-2">
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 group text-accent font-heading font-semibold text-sm hover:underline"
            >
              <span>View Full Leaderboard</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        {/* Right Side: List / Table Preview */}
        <div className="lg:col-span-7 bg-bg-elevated border border-border rounded-lg overflow-hidden p-6 md:p-8">
          <h3 className="font-heading font-semibold text-sm tracking-wider uppercase text-fg-muted mb-6">
            Club Standings
          </h3>

          {loading ? (
            // Skeleton load state
            <div className="space-y-4">
              {[...Array(13)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-border last:border-b-0 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-border rounded-full" />
                    <div className="space-y-1">
                      <div className="h-4 w-24 bg-border rounded" />
                      <div className="h-3 w-16 bg-border rounded" />
                    </div>
                  </div>
                  <div className="h-5 w-12 bg-border rounded" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-fg-muted space-y-3">
              <ShieldAlert size={36} className="text-accent-warn" />
              <p className="text-sm font-sans">
                Failed to fetch live Codeforces standings. Please view the full leaderboard to review cached stats.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {topMembers.map((member, index) => {
                const tier = getRatingTier(member.rating);
                return (
                  <div
                    key={member.handle}
                    className="flex justify-between items-center py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank number badge */}
                      <span className="font-mono text-sm font-semibold text-fg-muted w-4">
                        {index + 1}
                      </span>
                      <div>
                        {/* Member Name */}
                        <div className="font-sans font-medium text-sm text-fg">
                          {member.name}
                        </div>
                        {/* CF Handle color-coded */}
                        <a
                          href={`https://codeforces.com/profile/${member.handle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-mono text-xs hover:underline ${tier.color}`}
                        >
                          {member.handle}
                        </a>
                      </div>
                    </div>

                    {/* Rating score badge */}
                    <div className="text-right">
                      <span className="font-mono text-sm font-bold text-fg">
                        {member.rating || "unrated"}
                      </span>
                      <span className="block text-[9px] uppercase tracking-wider text-fg-muted font-sans font-medium">
                        {tier.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
