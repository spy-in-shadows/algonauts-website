import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import ProblemCard from "@/components/blog/ProblemCard";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

// Static site generation paths
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Custom components list inside MDX files
const mdxComponents = {
  ProblemCard,
  h1: (props: any) => (
    <h1 className="font-heading font-bold text-2xl md:text-3xl text-fg mt-10 mb-4 tracking-wide" {...props} />
  ),
  h2: (props: any) => (
    <h2
      className="font-heading font-semibold text-xl md:text-2xl text-fg mt-8 mb-4 tracking-wide border-b border-border pb-2"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3 className="font-heading font-semibold text-base md:text-lg text-fg mt-6 mb-2 tracking-wide" {...props} />
  ),
  p: (props: any) => (
    <p className="font-sans text-fg-muted text-sm md:text-base leading-relaxed my-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 my-4 text-fg-muted text-sm md:text-base space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 my-4 text-fg-muted text-sm md:text-base space-y-2" {...props} />
  ),
  li: (props: any) => <li className="font-sans" {...props} />,
  // Inline code highlight
  code: (props: any) => (
    <code className="bg-bg-elevated border border-border px-1.5 py-0.5 rounded font-mono text-[11px] md:text-xs text-accent" {...props} />
  ),
  // Block code highlight block configuration
  pre: (props: any) => (
    <pre
      className="bg-bg-elevated border border-border p-4 rounded-lg overflow-x-auto my-6 font-mono text-xs md:text-sm text-fg"
      {...props}
    />
  ),
};

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow py-16 md:py-24 max-w-[720px] mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-fg-muted hover:text-accent mb-8 group transition-colors"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Articles</span>
        </Link>

        {/* Article Metadata Header */}
        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-heading font-bold text-3xl md:text-4xl leading-tight text-fg tracking-wide">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-fg-muted border-y border-border py-3">
              <div className="flex items-center gap-1.5">
                <User size={13} className="text-accent" />
                <span>{post.author}</span>
              </div>
              <div className="w-1 h-1 bg-border rounded-full" />
              <div className="flex items-center gap-1.5">
                <Calendar size={13} />
                <span>{post.date}</span>
              </div>
              <div className="w-1 h-1 bg-border rounded-full" />
              <div className="flex items-center gap-1.5">
                <Clock size={13} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Render MDX Content */}
          <div className="prose prose-invert max-w-none">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: "one-dark-pro",
                        keepBackground: false,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
