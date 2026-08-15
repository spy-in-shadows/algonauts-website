import Link from "next/link";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import { Terminal, Home } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center py-20 text-center px-6">
        <div className="space-y-6 max-w-md bg-bg-elevated border border-border p-8 rounded-lg select-none">
          {/* Logo mark icon */}
          <div className="w-14 h-14 mx-auto relative opacity-85">
            <img
              src="/logo.png"
              alt="ALGONAUTS Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-2">
            <h1 className="font-heading font-bold text-2xl text-fg tracking-wide">
              404: Wrong Approach
            </h1>
            <p className="font-mono text-[10px] md:text-xs text-accent-warn uppercase tracking-wider font-semibold">
              STATUS: Time Limit Exceeded (TLE) on this route
            </p>
          </div>

          <p className="text-fg-muted font-sans text-sm leading-relaxed">
            The page you are looking for has either been garbage collected, optimized out of memory, or never existed. Check the pointer address and try again.
          </p>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg hover:bg-accent/90 transition-all font-heading font-semibold text-xs rounded focus:outline-none"
            >
              <Home size={15} />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
