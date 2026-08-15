"use client";

import { useEffect, useState, useRef } from "react";

export default function TerminalHero() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const command = "> whoami";
    const responses = [
      "Algonauts — competitive programmers, est. 2024",
      "status: ACTIVE_RUNNING",
      "mission: SOLVE. CLIMB. COMPETE.",
      "commands: [leaderboard, contests, join]",
      "> "
    ];

    const typeCommand = async () => {
      // Small boot delay
      await new Promise((resolve) => setTimeout(resolve, 400));
      
      // Type command character by character with randomized speed
      for (let i = 0; i <= command.length; i++) {
        if (!isMounted) return;
        setCurrentLine(command.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 60 + Math.random() * 80));
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
      if (!isMounted) return;
      setLines((prev) => [...prev, command]);
      setCurrentLine("");

      // Render responses line-by-line with staggered delay
      for (const line of responses) {
        if (!isMounted) return;
        await new Promise((resolve) => setTimeout(resolve, 150 + Math.random() * 100));
        
        if (line.startsWith("> ")) {
          // Type the final active cursor prompt
          for (let i = 0; i <= line.length; i++) {
            if (!isMounted) return;
            setCurrentLine(line.slice(0, i));
            await new Promise((resolve) => setTimeout(resolve, 80));
          }
        } else {
          setLines((prev) => [...prev, line]);
        }
      }
    };

    typeCommand();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-bg-elevated border border-border rounded-lg overflow-hidden shadow-2xl font-mono text-[11px] md:text-xs">
      {/* Window bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-bg border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-warn/30 border border-accent-warn/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30 border border-amber-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent/30 border border-accent/20" />
        </div>
        <span className="text-fg-muted font-medium text-[9px] uppercase tracking-widest select-none">
          algonauts.sh
        </span>
        <div className="w-8" />
      </div>

      {/* Terminal View */}
      <div
        ref={containerRef}
        className="p-4 md:p-5 space-y-2 h-[150px] md:h-[160px] overflow-y-auto text-left select-none"
      >
        {lines.map((line, idx) => (
          <div key={idx} className={line.startsWith("> ") ? "text-accent" : "text-fg-muted"}>
            {line}
          </div>
        ))}
        {currentLine !== undefined && (
          <div className={currentLine.startsWith("> ") ? "text-accent" : "text-fg"}>
            {currentLine}
            <span className="animate-pulse bg-accent text-accent inline-block w-1.5 h-3.5 ml-0.5 align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
