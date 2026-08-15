import problemData from "@/data/problem-of-week.json";
import Countdown from "../shared/Countdown";
import RatingColorTag from "../shared/RatingColorTag";
import { ExternalLink, Flame } from "lucide-react";

export default function ProblemOfWeek() {
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
            <div className="space-y-1">
              <h4 className="font-heading font-semibold text-sm tracking-widest text-fg uppercase">
                Next Contest Starts In
              </h4>
              <p className="text-xs text-fg-muted font-sans">
                Prepare your templates. The countdown is live.
              </p>
            </div>

            <Countdown target={problemData.countdownTarget} />
          </div>
        </div>
      </div>
    </section>
  );
}
