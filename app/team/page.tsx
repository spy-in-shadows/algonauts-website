"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import membersData from "@/data/members.json";
import { fetchCFUsers, CodeforcesUser } from "@/lib/codeforces";
import { getRatingTier } from "@/lib/ratingColor";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function TeamPage() {
  const [cfUsers, setCfUsers] = useState<Map<string, CodeforcesUser>>(new Map());

  useEffect(() => {
    async function loadTeamRatings() {
      try {
        const handles = membersData.map((m) => m.handle).filter(Boolean);
        const users = await fetchCFUsers(handles);
        const userMap = new Map(users.map((u: CodeforcesUser): [string, CodeforcesUser] => [u.handle.toLowerCase(), u]));
        setCfUsers(userMap);
      } catch (e) {
        console.error("Failed to load team ratings from Codeforces API", e);
      }
    }
    loadTeamRatings();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-grow py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8 space-y-12">
        {/* Title Header */}
        <div className="space-y-4 max-w-xl text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider rounded">
            <Terminal size={12} />
            <span>Club Officers</span>
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-fg tracking-tight">
            Meet the Team
          </h1>
          <p className="text-fg-muted font-sans text-sm md:text-base leading-relaxed">
            The student coordinators who manage problem setting, web infrastructure, workshop scheduling, and contest operations for Algonauts.
          </p>
        </div>

        {/* Large Profile Photo Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {membersData.map((member, idx) => {
            const cfUser = member.handle ? cfUsers.get(member.handle.toLowerCase()) : null;
            const rating = cfUser?.rating ?? 0;
            const tier = getRatingTier(rating);

            // Initials-based placeholder avatar
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2);

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-bg-elevated border border-border rounded-lg overflow-hidden flex flex-col justify-between hover:border-accent/30 transition-all select-none border-glow"
              >
                <div className="flex flex-col">
                  {/* Large Profile Picture Header */}
                  <div className="w-full aspect-[4/5] bg-bg relative overflow-hidden border-b border-border">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center font-heading font-bold text-fg-muted/40 text-4xl tracking-wider select-none bg-bg-elevated/40">
                        <span>{initials}</span>
                        <span className="block font-mono text-[9px] text-fg-muted/20 uppercase tracking-widest mt-2 font-normal">
                          No Photo
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Padded Info Box */}
                  <div className="p-5 space-y-1.5 text-left">
                    <h4 className="font-heading font-semibold text-base text-fg tracking-wide truncate">
                      {member.name}
                    </h4>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-border/40 bg-bg-elevated/20">
                  {/* CF Handle Link */}
                  {member.handle ? (
                    <a
                      href={`https://codeforces.com/profile/${member.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-xs hover:underline truncate max-w-[140px] ${tier.color}`}
                    >
                      {member.handle}
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-fg-muted italic">unrated</span>
                  )}

                  {/* LinkedIn Icon Link */}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg-muted hover:text-accent transition-colors"
                      aria-label={`${member.name} LinkedIn Profile`}
                    >
                      <LinkedinIcon size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
