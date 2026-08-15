import Link from "next/link";

export interface PostMeta {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  readTime: string;
}

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group focus:outline-none block h-full">
      <article className="bg-bg-elevated border border-border p-6 rounded-lg border-glow flex flex-col justify-between h-full cursor-pointer">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-fg-muted">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="font-heading font-semibold text-lg text-fg group-hover:text-accent transition-colors leading-snug tracking-wide">
            {post.title}
          </h3>
          <p className="text-fg-muted font-sans text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-8 flex items-center justify-between text-xs font-mono font-semibold">
          <span className="text-accent group-hover:translate-x-1 transition-transform">
            Read Article &rarr;
          </span>
          <span className="text-fg-muted font-normal text-[11px] font-sans">
            by {post.author}
          </span>
        </div>
      </article>
    </Link>
  );
}
