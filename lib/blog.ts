import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  readTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        author: data.author || "Anonymous",
        date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date || ""),
        excerpt: data.excerpt || "",
        readTime: data.readTime || "5 min read",
        content,
      } as BlogPost;
    });

  // Sort chronologically descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      author: data.author || "Anonymous",
      date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date || ""),
      excerpt: data.excerpt || "",
      readTime: data.readTime || "5 min read",
      content,
    } as BlogPost;
  } catch (e) {
    console.error(`Error loading blog post for slug "${slug}":`, e);
    return null;
  }
}
