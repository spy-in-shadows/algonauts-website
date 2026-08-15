"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  target: string; // ISO date string
}

export default function Countdown({ target }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    finished: boolean;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(target) - +new Date();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        finished: false,
      };
    };

    // Hydrate immediately on client
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  if (!timeLeft) {
    return (
      <div className="flex items-center gap-4 text-center opacity-50 select-none">
        <div className="flex flex-col">
          <span className="font-mono text-3xl font-bold text-accent">00</span>
          <span className="text-[10px] uppercase tracking-wider text-fg-muted">Days</span>
        </div>
        <span className="font-mono text-2xl text-border -mt-4">:</span>
        <div className="flex flex-col">
          <span className="font-mono text-3xl font-bold text-fg">00</span>
          <span className="text-[10px] uppercase tracking-wider text-fg-muted">Hours</span>
        </div>
        <span className="font-mono text-2xl text-border -mt-4">:</span>
        <div className="flex flex-col">
          <span className="font-mono text-3xl font-bold text-fg">00</span>
          <span className="text-[10px] uppercase tracking-wider text-fg-muted">Mins</span>
        </div>
        <span className="font-mono text-2xl text-border -mt-4">:</span>
        <div className="flex flex-col">
          <span className="font-mono text-3xl font-bold text-fg">00</span>
          <span className="text-[10px] uppercase tracking-wider text-fg-muted">Secs</span>
        </div>
      </div>
    );
  }

  if (timeLeft.finished) {
    return (
      <div className="py-2 px-4 bg-accent/10 border border-accent/20 rounded">
        <span className="font-mono text-sm font-semibold text-accent uppercase tracking-wider">
          Contest Active / In Progress
        </span>
      </div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center gap-3 md:gap-4 text-center">
      <div className="flex flex-col">
        <span className="font-mono text-2xl md:text-3xl font-bold text-accent">{formatNumber(timeLeft.days)}</span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-fg-muted">Days</span>
      </div>
      <span className="font-mono text-xl md:text-2xl text-border -mt-4">:</span>
      <div className="flex flex-col">
        <span className="font-mono text-2xl md:text-3xl font-bold text-fg">{formatNumber(timeLeft.hours)}</span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-fg-muted">Hours</span>
      </div>
      <span className="font-mono text-xl md:text-2xl text-border -mt-4">:</span>
      <div className="flex flex-col">
        <span className="font-mono text-2xl md:text-3xl font-bold text-fg">{formatNumber(timeLeft.minutes)}</span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-fg-muted">Mins</span>
      </div>
      <span className="font-mono text-xl md:text-2xl text-border -mt-4">:</span>
      <div className="flex flex-col">
        <span className="font-mono text-2xl md:text-3xl font-bold text-fg">{formatNumber(timeLeft.seconds)}</span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-fg-muted">Secs</span>
      </div>
    </div>
  );
}
