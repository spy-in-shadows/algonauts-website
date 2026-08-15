"use client";

import { useState, useEffect } from "react";
import problemData from "@/data/problem-of-week.json";
import Countdown from "../shared/Countdown";
import RatingColorTag from "../shared/RatingColorTag";
import { ExternalLink, Flame } from "lucide-react";

export default function ProblemOfWeek() {
  const [targetTime, setTargetTime] = useState<string | number>(problemData.countdownTarget);
  const [contestName, setContestName] = useState<string>("Next Codeforces Contest");

  useEffect(() => {
    fetch("https://codeforces.com/api/contest.list?gym=false")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "OK" && Array.isArray(data.result)) {
          // Filter for upcoming contests (phase is BEFORE or relativeTimeSeconds is negative)
          const upcoming = data.result
            .filter((c: any) => c.phase === "BEFORE" || c.relativeTimeSeconds < 0)
            .sort((a: any, b: any) => a.startTimeSeconds - b.startTimeSeconds);

          if (upcoming.length > 0) {
            const nextContest = upcoming[0];
            setTargetTime(nextContest.startTimeSeconds * 1000);
            setContestName(nextContest.name);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching Codeforces contest list:", err);
      });
  }, []);

  return (
    <section className="py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8">
      <div className="bg-bg-elevated border border-border rounded-xl p-8 md:p-12 relative overflow-hidden">
        {/* Subtle decorative background detail */}
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-accent/5 rounded-full filter blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          {/* Problem Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[11px] font-mono uppercase tracking-wider rounded">
                <Flame size={12} />
                <span>Problem of the Week</span>
              </div>
              <RatingColorTag rating={problemData.rating} showName={true} />
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-fg tracking-wide">
                {problemData.title}
              </h3>
              <p className="text-fg-muted font-sans text-sm md:text-base max-w-xl leading-relaxed">
                Analyze constraints, find the invariants, and optimize. Submit your solutions directly on Codeforces to rank up.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {problemData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-bg border border-border text-fg-muted font-mono text-[10px] md:text-xs rounded hover:border-accent/40 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <a
                href={problemData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg hover:bg-accent/90 transition-all font-heading font-semibold text-xs md:text-sm rounded"
              >
                <span>Solve on Codeforces</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Countdown Side */}
          <div className="lg:col-span-5 bg-bg border border-border rounded-lg p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="space-y-1.5 w-full">
              <h4 className="font-heading font-semibold text-sm tracking-wider text-accent uppercase line-clamp-2 px-2" title={contestName}>
                {contestName}
              </h4>
              <p className="text-xs text-fg-muted font-sans uppercase tracking-widest text-[10px] font-semibold opacity-70">
                Starts In
              </p>
            </div>

            <Countdown target={targetTime} />
          </div>
        </div>
      </div>
    </section>
  );
}
