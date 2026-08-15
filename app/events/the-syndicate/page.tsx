"use client";

import { useState } from "react";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Flame, 
  Terminal, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  Clock,
  Laptop,
  Video,
  ShieldCheck
} from "lucide-react";

const SYNDICATE_IMAGES = [
  { src: "/syndicate/syndicate1.jpg", caption: "The SYNDICATE - Code. Capital. Conquer." },
  { src: "/syndicate/syndicate3.jpg", caption: "The crew behind it all." },
  { src: "/syndicate/syndicate2.jpg", caption: "The energy in the room." },
  { src: "/syndicate/syndicate4.jpg", caption: "Participants understanding the event." },
];

export default function TheSyndicateEvent() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SYNDICATE_IMAGES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SYNDICATE_IMAGES.length) % SYNDICATE_IMAGES.length);
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-bg text-fg min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 border-b border-border bg-bg-elevated/10 overflow-hidden text-left">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />
          
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg border border-border text-fg-muted font-mono text-[10px] uppercase tracking-wider rounded">
              <Clock size={10} />
              <span>Past Event Archive</span>
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-fg tracking-tight leading-none uppercase">
              The Syndicate
            </h1>
            <p className="font-heading font-semibold text-sm md:text-base text-[#f39c12] uppercase tracking-widest">
              Code. Capital. Conquer.
            </p>
            <p className="text-fg-muted font-sans text-sm md:text-base leading-relaxed max-w-2xl">
              Conducted by the Algonauts club, <strong className="text-fg">The Syndicate</strong> was a major competitive programming tournament that challenged participants to balance algorithm optimization with a live, strategic bidding economy.
            </p>
            
            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 pt-2 font-mono text-[11px] text-fg-muted">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-elevated/40 border border-border rounded">
                <Trophy size={12} className="text-[#f39c12]" />
                <span>20 Teams Competed</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-elevated/40 border border-border rounded">
                <Terminal size={12} className="text-accent" />
                <span>$200 Initial Capital</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-elevated/40 border border-border rounded">
                <Clock size={12} className="text-accent-warn" />
                <span>4.5 Hours Duration</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 max-w-[960px] mx-auto px-6 md:px-8 text-center space-y-6">
          <div className="space-y-1 text-left">
            <h2 className="font-heading font-semibold text-xl text-fg tracking-wide">
              Event Highlights
            </h2>
            <p className="text-fg-muted font-sans text-xs">
              Photos from the live auction room, collaborative code tables, and organizing desks.
            </p>
          </div>

          {/* Carousel Frame */}
          <div className="relative border border-border rounded-xl overflow-hidden aspect-[16/9] bg-bg-elevated flex items-center justify-center select-none shadow-lg">
            <img
              src={SYNDICATE_IMAGES[activeSlide].src}
              alt={`Syndicate slide ${activeSlide + 1}`}
              className="w-full h-full object-cover object-center"
            />
            {/* Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-bg via-bg/85 to-transparent p-6 text-left space-y-1">
              <span className="block font-mono text-[9px] text-accent uppercase tracking-wider">
                Photo {activeSlide + 1} of {SYNDICATE_IMAGES.length}
              </span>
              <p className="text-fg font-sans text-xs md:text-sm font-medium">
                {SYNDICATE_IMAGES[activeSlide].caption}
              </p>
            </div>

            {/* Left Nav Button */}
            <button
              onClick={prevSlide}
              className="absolute left-4 p-2 bg-bg/80 hover:bg-bg border border-border text-fg hover:text-accent rounded-full transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={nextSlide}
              className="absolute right-4 p-2 bg-bg/80 hover:bg-bg border border-border text-fg hover:text-accent rounded-full transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Bullet Indicators */}
          <div className="flex justify-center gap-1.5">
            {SYNDICATE_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-2 h-2 rounded-full border transition-all cursor-pointer ${
                  activeSlide === idx 
                    ? "bg-accent border-accent scale-105" 
                    : "bg-transparent border-border"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Game Rules & Economy Structure Section */}
        <section className="py-12 border-t border-border bg-bg-elevated/10 text-left">
          <div className="max-w-[1280px] w-full mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Economy Mechanics */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="font-heading font-semibold text-2xl md:text-3xl text-fg tracking-wide">
                  The Game Economy
                </h2>
                <p className="text-fg-muted font-sans text-sm md:text-base leading-relaxed">
                  Every team started with <strong className="text-fg">$200 in virtual funds</strong>. To get coding problems, teams had to buy them in a live auction. Solving a problem successfully yielded a reward, but because the purchase price was always higher than the reward, <strong className="text-fg">every solved problem resulted in a net capital loss</strong>. Bidding recklessly meant bankruptcy and a soft-lock out of the contest!
                </p>
              </div>

              {/* Game Mechanics summary table */}
              <div className="border border-border rounded-lg overflow-hidden bg-bg-elevated/20 p-6 space-y-4">
                <h3 className="font-heading font-semibold text-sm text-fg tracking-wide flex items-center gap-2">
                  <Terminal size={14} className="text-accent" />
                  <span>Economy Parameters</span>
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center pb-2 border-b border-border/40 font-mono">
                  <div className="p-3 bg-bg border border-border rounded">
                    <span className="block font-bold text-accent text-lg">$200</span>
                    <span className="text-[9px] text-fg-muted uppercase tracking-wider">Starting Budget</span>
                  </div>
                  <div className="p-3 bg-bg border border-border rounded">
                    <span className="block font-bold text-accent-warn text-lg">$30</span>
                    <span className="text-[9px] text-fg-muted uppercase tracking-wider">Base Problem Bid</span>
                  </div>
                  <div className="p-3 bg-bg border border-border rounded">
                    <span className="block font-bold text-accent text-lg">$15</span>
                    <span className="text-[9px] text-fg-muted uppercase tracking-wider">Max Solve Reward</span>
                  </div>
                </div>
                <div className="text-[11px] font-sans text-fg-muted italic">
                  * Bidding War Purchases cost $50+ (netting -$35+), while Expert Call Lifelines cost an extra $15 (netting -$15 extra).
                </div>
              </div>
            </div>

            {/* Right Column: Rules Synopsis */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="border border-border bg-bg-elevated/40 rounded-xl p-6 md:p-8 space-y-6">
                <h3 className="font-heading font-semibold text-lg text-fg tracking-wide flex items-center gap-2">
                  <Info size={18} className="text-[#f39c12]" />
                  <span>Contest Phases & Rules</span>
                </h3>
                
                <div className="space-y-6 text-sm font-sans text-fg-muted leading-relaxed">
                  {/* Phase 1 */}
                  <div className="space-y-2">
                    <div className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                      Phase 1: The Live Auction (90 Mins)
                    </div>
                    <ul className="list-disc pl-4 space-y-1.5 text-xs">
                      <li>~85 curated problems (800–1200 difficulty rating) on the block.</li>
                      <li>Auctioneer revealed rating and tags (e.g. "800 - Sliding Window") only.</li>
                      <li>Opening bid was $30. Paddles raised to lock in ownership.</li>
                      <li>Winning team received a physical Problem Coupon card.</li>
                    </ul>
                  </div>

                  {/* Lifeline */}
                  <div className="space-y-2 border-l-2 border-[#8e44ad] pl-4">
                    <div className="font-mono text-xs font-semibold text-[#8e44ad] uppercase tracking-wider flex items-center gap-1.5">
                      <span>Lifeline: Expert Call</span>
                    </div>
                    <p className="text-[11px]">
                      Teams could purchase an Expert Call for an extra <strong className="text-fg">$15</strong>. An expert mentor unblocked the team, but the solve reward for that problem dropped to <strong className="text-fg">$0</strong>.
                    </p>
                  </div>

                  {/* Phase 2 */}
                  <div className="space-y-2">
                    <div className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                      Phase 2: The Coding Block (3 Hours)
                    </div>
                    <ul className="list-disc pl-4 space-y-1.5 text-xs">
                      <li><strong>The All Kill Checkpoint</strong>: A team must successfully solve every problem purchased during the auction before they could buy random pool problems.</li>
                      <li><strong>1500-Rated Side Quest</strong>: Difficult 1500-rated problems open to all teams at all times to bypass checkpoints for exclusive rewards.</li>
                    </ul>
                  </div>

                  {/* Fair Play */}
                  <div className="space-y-2 border-t border-border pt-4">
                    <div className="font-mono text-xs font-semibold text-accent-warn uppercase tracking-wider flex items-center gap-1.5">
                      <span>Fair Play Rules</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px]">
                      <div className="flex items-center gap-1">
                        <Laptop size={12} className="text-fg-muted shrink-0" />
                        <span>Single Laptop</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video size={12} className="text-fg-muted shrink-0" />
                        <span>Surveillance</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShieldCheck size={12} className="text-fg-muted shrink-0" />
                        <span>No AI Assist</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Victory Conditions, Prizes & Tech Infra */}
        <section className="py-16 max-w-[1280px] mx-auto px-6 md:px-8 space-y-16 text-left">
          {/* Prizes */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="font-heading font-semibold text-2xl md:text-3xl text-fg tracking-wide">
                Victory Conditions & Prizes
              </h2>
              <p className="text-fg-muted font-sans text-sm md:text-base">
                Virtual currency acted as a survival mechanic; the podium was determined by the total number of problems solved.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-border bg-bg-elevated/20 p-6 rounded-lg space-y-4">
                <div className="p-3 bg-bg border border-border text-[#f39c12] rounded-md w-fit">
                  <Trophy size={20} />
                </div>
                <h3 className="font-heading font-semibold text-base md:text-lg text-fg uppercase tracking-wide">
                  The Podium
                </h3>
                <span className="block font-mono text-xs text-accent font-semibold">Overall Top 3 Teams</span>
                <p className="text-fg-muted text-xs md:text-sm font-sans leading-relaxed">
                  Awarded <strong className="text-fg">Premium Event Hoodies</strong> for solving the highest total number of problems during the 3-hour coding block.
                </p>
              </div>

              <div className="border border-border bg-bg-elevated/20 p-6 rounded-lg space-y-4">
                <div className="p-3 bg-bg border border-border text-accent-warn rounded-md w-fit">
                  <Flame size={20} />
                </div>
                <h3 className="font-heading font-semibold text-base md:text-lg text-fg uppercase tracking-wide">
                  Bounty Hunters
                </h3>
                <span className="block font-mono text-xs text-accent font-semibold">1500-Rated Conquerors</span>
                <p className="text-fg-muted text-xs md:text-sm font-sans leading-relaxed">
                  Awarded <strong className="text-fg">Exclusive T-Shirts</strong> for successfully unlocking and solving the 1500-rated challenge problem.
                </p>
              </div>

              <div className="border border-border bg-bg-elevated/20 p-6 rounded-lg space-y-4">
                <div className="p-3 bg-bg border border-border text-accent rounded-md w-fit">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-heading font-semibold text-base md:text-lg text-fg uppercase tracking-wide">
                  The Vanguard
                </h3>
                <span className="block font-mono text-xs text-accent font-semibold">Fastest All Kill</span>
                <p className="text-fg-muted text-xs md:text-sm font-sans leading-relaxed">
                  Awarded <strong className="text-fg">Premium Bottles</strong> to the absolute fastest team to achieve "All Kill" on all auction purchases.
                </p>
              </div>
            </div>
          </div>

          {/* Behind the scenes Tech Infrastructure Grid */}
          <div className="border border-border bg-bg-elevated/10 rounded-xl p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-heading font-semibold text-xl text-fg tracking-wide flex items-center gap-2">
                <Terminal size={18} className="text-accent" />
                <span>Behind the Scenes: Tech Infrastructure</span>
              </h3>
              <p className="text-fg-muted font-sans text-xs md:text-sm leading-relaxed">
                To manage 20 teams bidding and coding in real-time, the Algonauts dev team built a <strong className="text-fg">Live Tracking Dashboard</strong> powered by Next.js. Projected live on the venue's main screen, this dashboard featured a dark-mode UI with frosted glassmorphism elements, displaying team balances, problem ownership, and "All Kill" status updates live as submissions processed on Codeforces.
              </p>
            </div>
            
            <div className="lg:col-span-4 grid grid-cols-2 gap-4 font-mono text-center">
              <div className="p-4 bg-bg border border-border rounded">
                <span className="block font-bold text-accent text-lg">Next.js</span>
                <span className="text-[10px] text-fg-muted">Dev Stack</span>
              </div>
              <div className="p-4 bg-bg border border-border rounded">
                <span className="block font-bold text-accent text-lg">20 Teams</span>
                <span className="text-[10px] text-fg-muted">Active Tracking</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
