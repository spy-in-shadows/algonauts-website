import RatingColorTag from "../shared/RatingColorTag";
import { ExternalLink, Terminal } from "lucide-react";

interface ProblemCardProps {
  id: string; // e.g. "1899G"
  title: string; // e.g. "Unusual Entertainment"
  rating: number; // e.g. 2000
  tags?: string[]; // e.g. ["graphs", "trees"]
}

export default function ProblemCard({ id, title, rating, tags = [] }: ProblemCardProps) {
  // Extract contest ID and problem index for URL
  // e.g. 1899G -> contest 1899, index G
  const match = id.match(/^(\d+)([A-Z]\d*)$/);
  const problemUrl = match
    ? `https://codeforces.com/problemset/problem/${match[1]}/${match[2]}`
    : `https://codeforces.com/problemset?query=${id}`;

  return (
    <div className="my-8 bg-bg-elevated border border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-accent/30 transition-all select-none">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-bg border border-border text-accent rounded">
            {id}
          </span>
          <RatingColorTag rating={rating} showName={true} />
        </div>
        <h4 className="font-heading font-semibold text-base md:text-lg text-fg tracking-wide flex items-center gap-2">
          <Terminal size={16} className="text-fg-muted" />
          <span>{title}</span>
        </h4>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] md:text-xs font-mono text-fg-muted bg-bg px-2 py-0.5 rounded border border-border/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center">
        <a
          href={problemUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-accent/40 text-fg hover:text-accent font-heading font-semibold text-xs rounded transition-all focus:outline-none"
        >
          <span>View Problem</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
