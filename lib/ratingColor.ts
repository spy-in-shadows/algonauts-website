export interface RatingTier {
  name: string;
  color: string; // Tailwind text color class
  hex: string;   // Hex color for inline SVGs/borders
}

export function getRatingTier(rating: number): RatingTier {
  if (rating < 1200) {
    return { name: "Newbie", color: "text-zinc-400", hex: "#a1a1aa" };
  }
  if (rating < 1400) {
    return { name: "Pupil", color: "text-emerald-400", hex: "#34d399" };
  }
  if (rating < 1600) {
    return { name: "Specialist", color: "text-cyan-400", hex: "#22d3ee" };
  }
  if (rating < 1900) {
    return { name: "Expert", color: "text-blue-400", hex: "#60a5fa" };
  }
  if (rating < 2200) {
    return { name: "Candidate Master", color: "text-violet-400", hex: "#a78bfa" };
  }
  if (rating < 2400) {
    return { name: "Master", color: "text-amber-500", hex: "#f59e0b" };
  }
  if (rating < 2600) {
    return { name: "Grandmaster", color: "text-red-400", hex: "#f87171" };
  }
  return { name: "Legendary Grandmaster", color: "text-red-500 font-semibold", hex: "#ef4444" };
}

export function ratingColor(rating: number): string {
  return getRatingTier(rating).color;
}
