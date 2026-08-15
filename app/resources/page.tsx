"use client";

import { useState } from "react";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import RatingColorTag from "@/components/shared/RatingColorTag";
import { getRatingTier } from "@/lib/ratingColor";
import { ChevronDown, BookOpen, ExternalLink, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RoadmapSection {
  id: string;
  topic: string;
  description: string;
  ratingMin: number;
  resources: { label: string; href: string; source: string }[];
}

const ROADMAP: RoadmapSection[] = [
  {
    id: "sec-1",
    topic: "1. Arrays & Prefix Sums",
    description: "Fundamentals of linear memory storage. Topics include sliding window, suffix arrays, and difference arrays.",
    ratingMin: 1000,
    resources: [
      { label: "CSES Sorting & Searching Problemset", href: "https://cses.fi/problemset/", source: "CSES" },
      { label: "Prefix Sum Basics & Applications", href: "https://codeforces.com/blog/entry/146389", source: "Codeforces Blog" },
      { label: "USACO Guide: Prefix Sums Introduction", href: "https://usaco.guide/silver/prefix-sums?lang=cpp", source: "USACO Guide" },
    ],
  },
  {
    id: "sec-2",
    topic: "2. Two Pointers & Binary Search",
    description: "Searching spaces in logarithmic time and matching values from two directions. Critical optimization strategy.",
    ratingMin: 1300,
    resources: [
      { label: "USACO Guide: Binary Search Introduction", href: "https://usaco.guide/silver/binary-search?lang=cpp", source: "USACO Guide" },
      { label: "Binary Search on Answer Problems", href: "https://www.geeksforgeeks.org/dsa/binary-search-on-answer-tutorial-with-problems/", source: "GeeksForGeeks" },
      { label: "Two Pointer Technique walkthroughs", href: "https://www.reddit.com/r/leetcode/comments/18g9383/twopointer_technique_an_indepth_guide_concepts/", source: "Reddit" },
    ],
  },
  {
    id: "sec-3",
    topic: "3. Graph Traversals & Trees",
    description: "Deep dive into nodes, edges, DFS/BFS, topological sorting, and tree representations.",
    ratingMin: 1500,
    resources: [
      { label: "Dijkstra and Shortest Path sets problems", href: "https://codeforces.com/problemset?tags=shortest+paths", source: "Codeforces" },
      { label: "Tree Algorithms Practice", href: "https://cses.fi/problemset/", source: "CSES" },
      { label: "William Fiset Graph Algorithm series", href: "https://youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&si=wlnvIsn7CyOq_0lC", source: "YouTube Channel" },
    ],
  },
  {
    id: "sec-4",
    topic: "4. Dynamic Programming Basics",
    description: "Solving optimization problems by breaking them into overlapping subproblems. Memorization & Tabulation.",
    ratingMin: 1700,
    resources: [
      { label: "CSES DP Problemset practice", href: "https://cses.fi/problemset/", source: "CSES" },
      { label: "AtCoder Educational DP Contest", href: "https://atcoder.jp/contests/dp/tasks", source: "AtCoder" },
      { label: "Codeforces DP practice collection", href: "https://codeforces.com/blog/entry/67679", source: "Codeforces" },
    ],
  },
  {
    id: "sec-5",
    topic: "5. Advanced Structures & Optimization",
    description: "Convex Hull DP optimization, Segment Trees, Fenwick Trees, Heavy-Light Decomposition.",
    ratingMin: 2100,
    resources: [
      { label: "Segment Tree Templates and Exercises", href: "https://cp-algorithms.com/data_structures/segment_tree.html", source: "CP-Algorithms" },
      { label: "Convex Hull Optimization guide", href: "https://codeforces.com/blog/entry/63823", source: "Codeforces Blog" },
      { label: "Heavy Light Decomposition", href: "https://codeforces.com/blog/entry/81317", source: "Codeforces Blog" },
    ],
  },
];

const LEGEND_RATINGS = [900, 1300, 1500, 1700, 2100];

// SVG Notch bullet styling (Section 3.4)
const CustomNotchBullet = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3 h-3 text-accent shrink-0 inline-block mr-3 mt-1.5"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Resources() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "sec-1": true, // keep first open by default
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8 space-y-16">
        {/* Title Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-fg tracking-tight">
              Learning Resources
            </h1>
            <p className="text-fg-muted font-sans text-sm md:text-base leading-relaxed">
              Our structured roadmaps guide members from basic arrays to advanced range query optimizations. Check out the rating difficulty levels below.
            </p>
          </div>

          {/* Difficulty Legend (Section 4.4) */}
          <div className="lg:col-span-5 bg-bg-elevated border border-border p-6 rounded-lg space-y-4">
            <h3 className="font-heading font-semibold text-xs tracking-wider uppercase text-fg-muted flex items-center gap-1.5">
              <HelpCircle size={14} className="text-accent" />
              <span>Target Rating Legend</span>
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {LEGEND_RATINGS.map((rating) => {
                const tier = getRatingTier(rating);
                return (
                  <div key={rating} className="flex items-center">
                    <RatingColorTag rating={rating} showName={true} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Roadmap Collapsible Accordion (Section 4.4) */}
        <section className="max-w-4xl space-y-6">
          {ROADMAP.map((section) => {
            const isOpen = !!openSections[section.id];
            return (
              <div
                key={section.id}
                className="border border-border rounded-lg bg-bg-elevated/10 overflow-hidden transition-colors duration-250 hover:bg-bg-elevated/20"
              >
                <details
                  open={isOpen}
                  className="group"
                >
                  <summary
                    className="flex items-center justify-between p-6 cursor-pointer font-heading font-semibold text-base md:text-lg text-fg tracking-wide select-none focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection(section.id);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span>{section.topic}</span>
                      <RatingColorTag rating={section.ratingMin} />
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-fg-muted transition-transform duration-300 ${
                        isOpen ? "transform rotate-180 text-accent" : ""
                      }`}
                    />
                  </summary>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-border/60 space-y-4">
                          <p className="text-fg-muted font-sans text-sm leading-relaxed max-w-2xl">
                            {section.description}
                          </p>

                          {/* Resource Links using logo swoosh bullet point markers */}
                          <ul className="space-y-3 pt-2">
                            {section.resources.map((res, index) => (
                              <li key={index} className="flex items-start">
                                <CustomNotchBullet />
                                <div className="space-y-0.5">
                                  <a
                                    href={res.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans font-medium text-sm text-fg hover:text-accent hover:underline flex items-center gap-1.5"
                                  >
                                    <span>{res.label}</span>
                                    <ExternalLink size={12} className="text-fg-muted" />
                                  </a>
                                  <span className="block font-mono text-[10px] text-fg-muted">
                                    Source: {res.source}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </details>
              </div>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
