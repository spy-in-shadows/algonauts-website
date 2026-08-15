"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TerminalHero from "../shared/TerminalHero";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 md:py-24">
      {/* Background logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <img
          src="/logo.png"
          alt=""
          className="w-[85vw] max-w-[650px] aspect-square object-contain opacity-[0.04] transform -translate-y-10 rotate-6"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        {/* Narratives */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <h1 className="font-heading font-bold text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05] tracking-tight text-fg">
              We solve.<br />
              We climb.<br />
              <span className="text-accent">We compete.</span>
            </h1>
            <p className="text-fg-muted font-sans text-base md:text-lg max-w-lg leading-relaxed">
              Algonauts is the official student-led competitive programming club of Newton School of Technology (NST-ADYPU). We are dedicated to fostering a culture of coding excellence, logic building, and algorithms to conquer the global leaderboards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link
              href="/join"
              className="px-6 py-3 bg-accent text-bg hover:bg-accent/90 transition-all font-heading font-semibold text-sm rounded shadow-lg shadow-accent/10 focus:outline-none"
            >
              Join the Club
            </Link>
            <Link
              href="/leaderboard"
              className="px-6 py-3 border border-border text-fg hover:border-accent/40 hover:text-accent transition-all font-heading font-semibold text-sm rounded focus:outline-none"
            >
              View Leaderboard
            </Link>
          </motion.div>
        </div>

        {/* Embedded Fake-CLI terminal block */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <TerminalHero />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
