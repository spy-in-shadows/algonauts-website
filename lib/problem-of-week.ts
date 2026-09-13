import fallbackPool from "@/data/problems-pool.json";

export interface ProblemOfWeekData {
  title: string;
  rating: number;
  tags: string[];
  url: string;
  contestId: number;
  index: string;
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function getProblemOfTheWeek(): ProblemOfWeekData {
  // Epoch week number (advances every 7 days / week)
  const now = Date.now();
  const weekNumber = Math.floor(now / (7 * 24 * 60 * 60 * 1000));

  const pool = fallbackPool as {
    contestId: number;
    index: string;
    name: string;
    rating: number;
    tags: string[];
  }[];

  const idx = Math.floor(pseudoRandom(weekNumber) * pool.length);
  const p = pool[idx];

  return {
    title: `${p.contestId}${p.index} - ${p.name}`,
    rating: p.rating,
    tags: p.tags && p.tags.length > 0 ? p.tags : ["algorithms"],
    url: `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`,
    contestId: p.contestId,
    index: p.index,
  };
}
