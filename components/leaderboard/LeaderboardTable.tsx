"use client";

import { useEffect, useState } from "react";
import membersData from "@/data/members.json";
import orgHandles from "@/data/org-handles.json";
import { getLeaderboardData, LeaderboardMember } from "@/lib/codeforces";
import { getRatingTier } from "@/lib/ratingColor";
import RatingSparkline from "../shared/RatingSparkline";
import { ArrowUp, ArrowDown, ArrowUpDown, ShieldAlert, CheckCircle2 } from "lucide-react";

type SortKey = "rating" | "maxRating" | "delta";
type SortDirection = "asc" | "desc";

// LinkedIn Icon component
const LinkedinIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block shrink-0"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function LeaderboardTable() {
  const [members, setMembers] = useState<LeaderboardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({
    key: "rating",
    direction: "desc",
  });

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await getLeaderboardData(membersData, orgHandles);
        setMembers(data);
        if (data.length > 0 && data[0].lastUpdated) {
          setLastUpdated(data[0].lastUpdated);
        }
        setError(null);
      } catch (err) {
        console.error("Leaderboard fetch failed", err);
        setError("Codeforces API error or rate-limit. Rendering fallback cache.");
        
        // Clean list of handles to search in cache
        const teamHandles = membersData.map((m) => m.handle.toLowerCase()).filter(Boolean);
        const orgHandlesClean = orgHandles.map((h) => h.toLowerCase()).filter(Boolean);
        const allHandles = Array.from(new Set([...teamHandles, ...orgHandlesClean]));
        
        const cacheKey = `cf_users_${allHandles.sort().join("_")}`;
        const cachedStr = localStorage.getItem(cacheKey);
        if (cachedStr) {
          try {
            const { data: cachedUsers, timestamp } = JSON.parse(cachedStr);
            const memberMap = new Map(membersData.map((m) => [m.handle.toLowerCase(), m]));
            
            const formatted = allHandles.map(handle => {
              const cfUser = cachedUsers.find((u: any) => u.handle.toLowerCase() === handle);
              const m = memberMap.get(handle);
              
              let name = handle;
              if (m) {
                name = m.name;
              } else if (cfUser) {
                const parts = [cfUser.firstName, cfUser.lastName].filter(Boolean);
                if (parts.length > 0) name = parts.join(" ");
              }
              
              return {
                name,
                role: m ? m.role : "Club Competitor",
                handle: cfUser?.handle || handle,
                rating: cfUser?.rating ?? 0,
                maxRating: cfUser?.maxRating ?? 0,
                rank: cfUser?.rank ?? "unrated",
                delta: 0,
                history: [],
                linkedin: m?.linkedin || "",
              } as LeaderboardMember;
            });
            setMembers(formatted);
            setLastUpdated(new Date(timestamp).toLocaleTimeString());
          } catch (e) {
            console.error("Parsing cache fallback failed", e);
          }
        }
      } finally {
        setLoading(false);
      }
    }
    loadLeaderboard();
  }, []);

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const sortedMembers = [...members].sort((a, b) => {
    const aVal = a[sortConfig.key] ?? 0;
    const bVal = b[sortConfig.key] ?? 0;
    if (sortConfig.direction === "desc") {
      return bVal - aVal;
    }
    return aVal - bVal;
  });

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={12} className="text-fg-muted/40 ml-1" />;
    return sortConfig.direction === "desc" ? (
      <ArrowDown size={12} className="text-accent ml-1" />
    ) : (
      <ArrowUp size={12} className="text-accent ml-1" />
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-bg-elevated/40 border border-border rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header controls & stats status */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {error ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-accent-warn/10 border border-accent-warn/20 text-accent-warn text-xs rounded">
              <ShieldAlert size={14} />
              <span>{error}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs rounded">
              <CheckCircle2 size={14} />
              <span>Live Codeforces Ratings Sync ({members.length} members)</span>
            </div>
          )}
        </div>

        {lastUpdated && (
          <span className="font-mono text-xs text-fg-muted">
            Last Updated: {lastUpdated}
          </span>
        )}
      </div>

      {/* Main Table view */}
      <div className="border border-border rounded-lg overflow-hidden bg-bg-elevated/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse select-none md:select-text">
            <thead>
              <tr className="border-b border-border bg-bg-elevated/40 font-mono text-xs uppercase tracking-widest text-fg-muted">
                <th className="py-4 px-6 w-16 text-center">Rank</th>
                <th className="py-4 px-6">Member</th>
                <th className="py-4 px-6 cursor-pointer hover:bg-bg-elevated/40 transition-colors" onClick={() => handleSort("rating")}>
                  <div className="flex items-center">
                    <span>Rating</span>
                    {getSortIcon("rating")}
                  </div>
                </th>
                <th className="py-4 px-6 cursor-pointer hover:bg-bg-elevated/40 transition-colors" onClick={() => handleSort("maxRating")}>
                  <div className="flex items-center">
                    <span>Max Rating</span>
                    {getSortIcon("maxRating")}
                  </div>
                </th>
                <th className="py-4 px-6 cursor-pointer hover:bg-bg-elevated/40 transition-colors" onClick={() => handleSort("delta")}>
                  <div className="flex items-center">
                    <span>Delta</span>
                    {getSortIcon("delta")}
                  </div>
                </th>
                <th className="py-4 px-6">History Sparkline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm font-sans">
              {sortedMembers.map((member, index) => {
                const tier = getRatingTier(member.rating);
                const isPositive = member.delta > 0;
                const isZero = member.delta === 0;

                return (
                  <tr key={member.handle} className="hover:bg-bg-elevated/30 transition-colors">
                    {/* Dynamic Rank column based on sort results */}
                    <td className="py-4 px-6 text-center font-mono text-xs font-semibold text-fg-muted">
                      {index + 1}
                    </td>

                    {/* Member Details */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-heading font-semibold text-fg tracking-wide flex items-center gap-2">
                          <span>{member.name}</span>
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-fg-muted hover:text-accent transition-colors"
                              aria-label={`${member.name} LinkedIn Profile`}
                            >
                              <LinkedinIcon size={12} />
                            </a>
                          )}
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <a
                            href={`https://codeforces.com/profile/${member.handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-mono text-xs w-fit hover:underline ${tier.color}`}
                          >
                            {member.handle}
                          </a>
                          {member.role && member.role !== "Club Competitor" && (
                            <span className="px-1.5 py-0.2 bg-accent/10 border border-accent/20 text-accent font-mono text-[8px] uppercase tracking-wider rounded">
                              {member.role}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Current Rating */}
                    <td className="py-4 px-6 font-mono font-bold text-fg">
                      {member.rating || "unrated"}
                    </td>

                    {/* Max Rating */}
                    <td className="py-4 px-6 font-mono text-fg-muted">
                      {member.maxRating || "unrated"}
                    </td>

                    {/* Delta rating change */}
                    <td className="py-4 px-6 font-mono">
                      {isZero ? (
                        <span className="text-fg-muted">-</span>
                      ) : isPositive ? (
                        <span className="text-accent flex items-center gap-0.5">
                          ▲ +{member.delta}
                        </span>
                      ) : (
                        <span className="text-accent-warn flex items-center gap-0.5">
                          ▼ {member.delta}
                        </span>
                      )}
                    </td>

                    {/* Sparkline rating graph */}
                    <td className="py-3 px-6">
                      <RatingSparkline history={member.history} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
