"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Resources", href: "/resources" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg-elevated/80 backdrop-blur-md border-b border-border py-4"
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            {/* SVG Logo mark embedded */}
            <div className="w-8 h-8 text-fg relative">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path
                  d="M50 10 L20 90 H38 L50 38 C53 45 56 52 62 62 C70 74 78 82 88 90 H70 C62 82 56 72 53 60 C50 48 50 32 50 10 Z"
                  fill="currentColor"
                  className="transition-colors group-hover:text-accent"
                />
                <path
                  d="M54 55 C58 64 62 76 66 90 H56 C52 78 49 68 54 55 Z"
                  fill="currentColor"
                  className="opacity-60 transition-colors group-hover:text-accent group-hover:opacity-100"
                />
              </svg>
            </div>
            <span className="font-heading font-semibold text-lg tracking-wider text-fg transition-colors group-hover:text-accent">
              ALGONAUTS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans font-medium text-sm transition-colors hover:text-accent focus:outline-none ${
                    isActive ? "text-accent" : "text-fg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Join CTA & Mobile menu toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/join"
              className="px-4 py-1.5 border border-accent text-accent hover:bg-accent/10 transition-all text-xs md:text-sm font-semibold rounded focus:outline-none focus:ring-1 focus:ring-accent"
            >
              Join
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-fg hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent rounded"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[73px] z-40 bg-bg-elevated border-b border-border md:hidden overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-sans font-semibold text-lg tracking-wide hover:text-accent focus:outline-none ${
                      isActive ? "text-accent" : "text-fg"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
