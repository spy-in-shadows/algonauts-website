import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/home/Hero";
import StatsStrip from "@/components/home/StatsStrip";
import FeatureGrid from "@/components/home/FeatureGrid";
import SectionDivider from "@/components/shared/SectionDivider";
import ProblemOfWeek from "@/components/home/ProblemOfWeek";
import LeaderboardPreview from "@/components/home/LeaderboardPreview";
import PostCard from "@/components/blog/PostCard";
import Footer from "@/components/nav/Footer";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner with embedded terminal shell */}
        <Hero />

        {/* Stats segment */}
        <StatsStrip />

        {/* Brand swoosh curve separator */}
        <SectionDivider />

        {/* Feature Grid ("What we do") */}
        <FeatureGrid />

        {/* Brand swoosh curve separator */}
        <SectionDivider />

        {/* Weekly CP Problem challenge + countdown */}
        <ProblemOfWeek />

        {/* Brand swoosh curve separator */}
        <SectionDivider />

        {/* Top 5 rankings preview */}
        <LeaderboardPreview />

        {/* Brand swoosh curve separator */}
        <SectionDivider />

        {/* Recent Blog Editorials */}
        <section className="py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="font-heading font-semibold text-2xl md:text-3xl tracking-tight text-fg">
                Recent Editorials
              </h2>
              <p className="text-fg-muted font-sans text-sm md:text-base max-w-lg leading-relaxed">
                Check out the latest walkthroughs, strategies, and editorials written by Algonauts members.
              </p>
            </div>
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 group text-accent font-heading font-semibold text-sm hover:underline"
              >
                <span>Browse All Posts</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <div key={post.slug} className="h-full">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA block */}
        <section className="py-20 md:py-28 border-t border-border bg-bg-elevated/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-[50vw] h-auto">
              <path
                d="M50 10 L20 90 H38 L50 38 C53 45 56 52 62 62 C70 74 78 82 88 90 H70 C62 82 56 72 53 60 C50 48 50 32 50 10 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="max-w-[1280px] mx-auto px-6 md:px-8 relative z-10 space-y-6">
            <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-fg">
              Ready to prove yourself?
            </h2>
            <p className="text-fg-muted font-sans text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Our lectures, resources, and bootcamps are open to all students. However, official club membership is reserved for those who qualify in our recruitment contests.
            </p>
            <div className="pt-4">
              <Link
                href="/join"
                className="inline-flex px-8 py-3.5 bg-accent text-bg hover:bg-accent/90 transition-all font-heading font-bold text-sm rounded shadow-lg shadow-accent/10 focus:outline-none"
              >
                Register for Next Contest
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
