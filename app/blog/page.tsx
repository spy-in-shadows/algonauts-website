import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="flex-grow py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8 space-y-12">
        {/* Title Header */}
        <div className="space-y-4 max-w-xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-fg tracking-tight">
            Editorials & Blog
          </h1>
          <p className="text-fg-muted font-sans text-sm md:text-base leading-relaxed">
            Walkthroughs, algorithm dissections, and guides prepared by our members. Learn the intuition behind complex solutions.
          </p>
        </div>

        {/* Blog Posts Grid Catalog */}
        {posts.length === 0 ? (
          <div className="border border-border rounded-lg p-12 text-center text-fg-muted font-mono text-sm">
            No posts found in /content/blog/*.mdx
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.slug} className="h-full">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
