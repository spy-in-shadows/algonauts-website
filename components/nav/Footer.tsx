import Link from "next/link";
import { Send, Mail } from "lucide-react";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
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

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Logo & Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-8 h-8 text-fg">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <path
                    d="M50 10 L20 90 H38 L50 38 C53 45 56 52 62 62 C70 74 78 82 88 90 H70 C62 82 56 72 53 60 C50 48 50 32 50 10 Z"
                    fill="currentColor"
                  />
                  <path
                    d="M54 55 C58 64 62 76 66 90 H56 C52 78 49 68 54 55 Z"
                    fill="currentColor"
                    className="opacity-60"
                  />
                </svg>
              </div>
              <span className="font-heading font-semibold text-lg tracking-wider">
                ALGONAUTS
              </span>
            </Link>
            <p className="text-fg-muted font-sans text-sm max-w-sm">
              The official student-led competitive programming club of Newton School of Technology (NST-ADYPU).
            </p>
            {/* Social Icons / Contact */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://discord.gg/your-invite-link" /* TODO: replace placeholder */
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border text-fg-muted hover:text-accent hover:border-accent/40 rounded transition-all focus:outline-none"
                aria-label="Discord"
              >
                <Send size={18} />
              </a>
              <a
                href="https://github.com/algonauts-club" /* TODO: replace placeholder */
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border text-fg-muted hover:text-accent hover:border-accent/40 rounded transition-all focus:outline-none"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://instagram.com/algonauts_club" /* TODO: replace placeholder */
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border text-fg-muted hover:text-accent hover:border-accent/40 rounded transition-all focus:outline-none"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="mailto:contact@algonauts.club" /* TODO: replace placeholder */
                className="p-2 border border-border text-fg-muted hover:text-accent hover:border-accent/40 rounded transition-all focus:outline-none"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Directory */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-fg">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-accent transition-colors">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-accent transition-colors">
                  Contests & Events
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-accent transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-fg">
              Community
            </h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li>
                <Link href="/leaderboard" className="hover:text-accent transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  Read Editorials
                </Link>
              </li>
              <li>
                <Link href="/join" className="hover:text-accent transition-colors text-accent">
                  Join Algonauts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Hairline spacer & credits */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-fg-muted font-mono">
            &copy; {new Date().getFullYear()} Algonauts Club. All rights reserved.
          </p>
          <p className="text-xs text-fg-muted font-mono">
            Made by{" "}
            <Link
              href="https://github.com/spy-in-shadows"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg font-semibold hover:text-accent transition-colors"
            >
              spy-in-shadows
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
