"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import membersData from "@/data/members.json";
import { fetchCFUsers, CodeforcesUser } from "@/lib/codeforces";
import { getRatingTier } from "@/lib/ratingColor";
import { motion } from "framer-motion";
import { Shield, Target, Award } from "lucide-react";

// Timeline milestones
const TIMELINE = [
  {
    date: "September 2024",
    title: "Club Founded",
    description: "Algonauts was established by students at Newton School of Technology - ADYPU to bridge the gap in advanced algorithms and logic design.",
  },
  {
    date: "December 2024",
    title: "First Insomnia Round",
    description: "Hosted our first competitive programming round with 120+ participants, setting the benchmark for high-quality problem sets.",
  },
  {
    date: "April 2025",
    title: "ICPC Regional Representation",
    description: "Two teams qualified for the ICPC Regionals, with our top team achieving a spot in the top 200 standings.",
  },
  {
    date: "July 2026",
    title: "13 Core members",
    description: "Expanded our community network, launching dedicated learning tracks for beginners and intermediate candidates.",
  },
];

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function About() {
  const [cfUsers, setCfUsers] = useState<Map<string, CodeforcesUser>>(new Map());

  useEffect(() => {
    async function loadTeamRatings() {
      try {
        const handles = membersData.map((m) => m.handle).filter(Boolean);
        const users = await fetchCFUsers(handles);
        const userMap = new Map(users.map((u: CodeforcesUser): [string, CodeforcesUser] => [u.handle.toLowerCase(), u]));
        setCfUsers(userMap);
      } catch (e) {
        console.error("Failed to load team ratings from Codeforces API", e);
      }
    }
    loadTeamRatings();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-grow py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8 space-y-24">
        {/* Header content aligned with LinkedIn page */}
        <section className="max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-fg tracking-tight mb-6">
              About Algonauts
            </h1>
            <div className="space-y-4 font-sans text-fg-muted text-sm md:text-base leading-relaxed">
              <p>
                Algonauts is the official student-led competitive programming club of Newton School of Technology (NST-ADYPU). 
                We are a student-led community dedicated to fostering a culture of coding excellence, problem-solving, and innovation. 
                Our mission is to empower students with the skills and opportunities needed to excel in competitive programming, logic building, and algorithms.
              </p>
              <p>
                Whether you're a beginner starting with your first loops or an experienced coder aiming for global standings, our club welcomes all students who are passionate about coding and eager to learn. 
                By conducting active workshops, coordinating weekly contest simulations, and preparing for tournaments like ICPC and Meta Hacker Cup, we build a vibrant programming community together.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Pillars / Principles */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-border bg-bg-elevated/20 p-6 rounded-lg space-y-4">
            <div className="p-3 bg-bg border border-border text-accent rounded-md w-fit">
              <Shield size={20} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-fg">Academic Integrity</h3>
            <p className="text-fg-muted text-sm font-sans leading-relaxed">
              We focus on absolute integrity in contests. No plagiarism, no copying templates blindly. We understand algorithms bottom-up.
            </p>
          </div>

          <div className="border border-border bg-bg-elevated/20 p-6 rounded-lg space-y-4">
            <div className="p-3 bg-bg border border-border text-accent rounded-md w-fit">
              <Target size={20} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-fg">Targeted Progress</h3>
            <p className="text-fg-muted text-sm font-sans leading-relaxed">
              We structure resources based on Codeforces rating milestones so you focus precisely on skills that scale your profile.
            </p>
          </div>

          <div className="border border-border bg-bg-elevated/20 p-6 rounded-lg space-y-4">
            <div className="p-3 bg-bg border border-border text-accent rounded-md w-fit">
              <Award size={20} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-fg">Peer Mentorship</h3>
            <p className="text-fg-muted text-sm font-sans leading-relaxed">
              Advanced members regularly coordinate tutorials and review problem-sets, providing support for juniors climbing the ranks.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="space-y-12">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-fg tracking-wide">
            Our Journey
          </h2>
          <div className="relative border-l border-border pl-6 md:pl-8 ml-3 space-y-10">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-bg" />
                <span className="block font-mono text-xs text-accent font-semibold mb-1">
                  {item.date}
                </span>
                <h3 className="font-heading font-semibold text-base md:text-lg text-fg">
                  {item.title}
                </h3>
                <p className="text-fg-muted text-sm font-sans max-w-2xl leading-relaxed mt-1">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ICPC Regionals Showcase */}
        <section id="icpc-showcase" className="space-y-12 pt-6 scroll-mt-28">
          <div className="space-y-3 text-left">
            <h2 className="font-heading font-semibold text-2xl md:text-3xl text-fg tracking-wide">
              ICPC Regionals Success
            </h2>
            <p className="text-fg-muted text-sm font-sans max-w-lg leading-relaxed">
              Algonauts teams qualified for and represented Newton School of Technology (NST-ADYPU) at the prestigious ICPC Amritapuri Regionals, competing against the finest algorithmic minds in the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team 1 Card */}
            <div className="bg-bg-elevated border border-border rounded-lg overflow-hidden flex flex-col justify-between hover:border-accent/30 transition-all select-none border-glow">
              <div className="flex flex-col">
                <div className="w-full aspect-[16/10] bg-bg relative overflow-hidden border-b border-border">
                  <img
                    src="/team/team1.jpeg"
                    alt="NST-ADYPU Team 1"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-accent text-bg font-mono text-[9px] uppercase tracking-wider font-bold rounded">
                    Team 1: Ryu
                  </div>
                </div>
                <div className="p-5 space-y-3 text-left">
                  <h3 className="font-heading font-semibold text-lg text-fg tracking-wide">
                    NST–ADYPU Team 1 (Ryu)
                  </h3>
                  <span className="block font-mono text-xs text-[#f39c12] uppercase tracking-wider font-semibold">
                    Rank 158 — Amritapuri Regional
                  </span>
                  <div className="pt-2 space-y-2 border-t border-border/40 text-xs text-fg-muted">
                    <div className="font-semibold text-fg">Team Members:</div>
                    <div className="space-y-2 font-sans pt-1">
                      <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-b-0">
                        <span className="text-fg font-medium">Md. Faisal</span>
                        <a
                          href="https://www.linkedin.com/in/md-f-21a4b0131/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 border border-border/40 hover:border-accent/40 text-fg-muted hover:text-accent rounded transition-all focus:outline-none"
                          aria-label="Md. F. LinkedIn Profile"
                        >
                          <LinkedinIcon size={12} />
                        </a>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-b-0">
                        <span className="text-fg font-medium">Vansh Singhal</span>
                        <a
                          href="https://www.linkedin.com/in/vansh-singhal-33852b356/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 border border-border/40 hover:border-accent/40 text-fg-muted hover:text-accent rounded transition-all focus:outline-none"
                          aria-label="Vansh Singhal LinkedIn Profile"
                        >
                          <LinkedinIcon size={12} />
                        </a>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-b-0">
                        <span className="text-fg font-medium">Vaibhav Singh</span>
                        <a
                          href="https://www.linkedin.com/in/vaibhav-singh-4a206a312/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 border border-border/40 hover:border-accent/40 text-fg-muted hover:text-accent rounded transition-all focus:outline-none"
                          aria-label="Vaibhav Singh LinkedIn Profile"
                        >
                          <LinkedinIcon size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team 2 Card */}
            <div className="bg-bg-elevated border border-border rounded-lg overflow-hidden flex flex-col justify-between hover:border-accent/30 transition-all select-none border-glow">
              <div className="flex flex-col">
                <div className="w-full aspect-[16/10] bg-bg relative overflow-hidden border-b border-border">
                  <img
                    src="/team/team2.jpeg"
                    alt="NST-ADYPU Team 2"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-accent text-bg font-mono text-[9px] uppercase tracking-wider font-bold rounded">
                    Team 2: SAKE
                  </div>
                </div>
                <div className="p-5 space-y-3 text-left">
                  <h3 className="font-heading font-semibold text-lg text-fg tracking-wide">
                    NST–ADYPU Team 2 (SAKE)
                  </h3>
                  <span className="block font-mono text-xs text-[#f39c12] uppercase tracking-wider font-semibold">
                    Rank 219 — Amritapuri Regional
                  </span>
                  <div className="pt-2 space-y-2 border-t border-border/40 text-xs text-fg-muted">
                    <div className="font-semibold text-fg">Team Members:</div>
                    <div className="space-y-2 font-sans pt-1">
                      <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-b-0">
                        <span className="text-fg font-medium">Krish Modi</span>
                        <a
                          href="https://www.linkedin.com/in/krish-modi-5a60b6321/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 border border-border/40 hover:border-accent/40 text-fg-muted hover:text-accent rounded transition-all focus:outline-none"
                          aria-label="Krish Modi LinkedIn Profile"
                        >
                          <LinkedinIcon size={12} />
                        </a>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-b-0">
                        <span className="text-fg font-medium">Akrapravo Rajkonwar</span>
                        <span className="text-[10px] text-fg-muted font-mono italic">No Profile</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-b-0">
                        <span className="text-fg font-medium">Sunny Singh</span>
                        <a
                          href="https://www.linkedin.com/in/sunny-singh-b9166a330/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 border border-border/40 hover:border-accent/40 text-fg-muted hover:text-accent rounded transition-all focus:outline-none"
                          aria-label="Sunny Singh LinkedIn Profile"
                        >
                          <LinkedinIcon size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
