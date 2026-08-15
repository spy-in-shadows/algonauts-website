"use client";

import { CodeforcesRatingChange } from "@/lib/codeforces";

interface RatingSparklineProps {
  history: CodeforcesRatingChange[];
}

export default function RatingSparkline({ history }: RatingSparklineProps) {
  if (!history || history.length < 2) {
    return (
      <svg className="w-24 h-8 text-border" viewBox="0 0 100 30" aria-label="No rating history">
        <line x1="0" y1="15" x2="100" y2="15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
      </svg>
    );
  }

  // Extract rating values
  const ratings = history.map((h) => h.newRating);
  const min = Math.min(...ratings);
  const max = Math.max(...ratings);
  const range = max - min || 1;

  const width = 120;
  const height = 30;
  const padding = 3;

  // Map ratings to canvas coordinates
  const points = ratings.map((val, idx) => {
    const x = padding + (idx / (ratings.length - 1)) * (width - 2 * padding);
    const y = padding + (1 - (val - min) / range) * (height - 2 * padding);
    return { x, y };
  });

  // Construct monotone cubic bezier curve to reflect our logo swoosh style
  let pathStr = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    // Tension points
    const cp1x = curr.x + (next.x - curr.x) * 0.45;
    const cp1y = curr.y;
    const cp2x = curr.x + (next.x - curr.x) * 0.55;
    const cp2y = next.y;
    pathStr += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  // Fill path closing at the bottom of the chart
  const fillPathStr = `${pathStr} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <svg
      className="w-24 md:w-28 h-7 text-accent"
      viewBox={`0 0 ${width} ${height}`}
      aria-label="Codeforces rating history chart"
    >
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Underline fill gradient */}
      <path d={fillPathStr} fill="url(#spark-grad)" />
      {/* Line path */}
      <path
        d={pathStr}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Latest rating checkpoint */}
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="1.75"
        fill="var(--accent)"
      />
    </svg>
  );
}
