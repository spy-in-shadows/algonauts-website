import { getRatingTier } from "@/lib/ratingColor";

interface RatingColorTagProps {
  rating: number;
  showName?: boolean;
}

export default function RatingColorTag({ rating, showName = false }: RatingColorTagProps) {
  const tier = getRatingTier(rating);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] md:text-xs font-mono font-medium border`}
      style={{
        color: tier.hex,
        borderColor: `${tier.hex}30`, // 30 in hex is roughly 18% opacity
        backgroundColor: `${tier.hex}08`, // 08 in hex is roughly 3% opacity
      }}
    >
      <span>{rating}</span>
      {showName && (
        <span
          className="font-sans font-normal border-l pl-1.5 text-[9px] md:text-[10px] uppercase tracking-wider"
          style={{ borderLeftColor: `${tier.hex}30` }}
        >
          {tier.name}
        </span>
      )}
    </span>
  );
}
