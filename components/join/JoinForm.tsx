"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Loader2, Sparkles } from "lucide-react";

export default function JoinForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [year, setYear] = useState("");
  const [why, setWhy] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Required fields check (Codeforces handle is now mandatory for contest entry)
    if (!name.trim() || !email.trim() || !handle.trim() || !year.trim() || !why.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // POST request to Formspree placeholder endpoint
      const res = await fetch("https://formspree.io/f/mnpabdzb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          codeforcesHandle: handle,
          yearOrGrade: year,
          experienceDetails: why,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      console.error("Join form submission error:", err);
      setError("Unable to submit registration. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-bg-elevated border border-border rounded-lg p-8 md:p-12 text-center space-y-6 select-none">
        {/* Animated logo mark drawing (Section 3.2) */}
        <div className="w-20 h-20 mx-auto text-accent flex items-center justify-center">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <motion.path
              d="M10 90 C30 80 50 60 90 10"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <div className="space-y-3">
          <h2 className="font-heading font-bold text-2xl text-fg tracking-wide flex items-center justify-center gap-2">
            <CheckCircle2 size={24} className="text-accent" />
            <span>Contest Registration Confirmed!</span>
          </h2>
          <p className="text-fg-muted font-sans text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Your details have been registered for our next scheduled Recruitment Contest. We will email you the competition rules, timings, and credentials shortly.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] uppercase tracking-wider rounded">
            <Sparkles size={12} />
            <span>Awaiting Contest Entry</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left side: Eligibility & Info */}
      <div className="lg:col-span-5 space-y-6">
        <h2 className="font-heading font-semibold text-2xl text-fg tracking-wide">
          Recruitment & Membership
        </h2>
        <div className="space-y-4 font-sans text-fg-muted text-sm md:text-base leading-relaxed">
          <p>
            At Algonauts, we believe in open education. All our lectures, workshops, study materials, and beginner training camps are <strong className="text-fg">open to all students</strong> who wish to learn.
          </p>
          <p>
            However, to become an <strong className="text-fg">official club member</strong> (granting access to internal contest rounds, official ICPC team representation, and mentorship coordinators), you must prove your skills in our periodic recruitment contests.
          </p>
          <div className="space-y-2 border-l border-border pl-4">
            <div className="font-semibold text-fg">How it works:</div>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Register using the form below with your Codeforces handle.</li>
              <li>Attend our open training sessions and study groups.</li>
              <li>Participate in the next scheduled Recruitment Contest.</li>
              <li>Qualify by rank and code optimization parameters.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right side: Form Fields */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-7 bg-bg-elevated border border-border p-6 md:p-8 rounded-lg space-y-5 text-left"
      >
        {error && (
          <div className="flex items-center gap-2 p-3 bg-accent-warn/10 border border-accent-warn/25 text-accent-warn text-xs rounded">
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-fg-muted">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-bg border border-border focus:border-accent hover:border-accent/40 rounded px-4 py-2.5 text-sm text-fg outline-none transition-colors"
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-fg-muted">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg border border-border focus:border-accent hover:border-accent/40 rounded px-4 py-2.5 text-sm text-fg outline-none transition-colors"
              placeholder="e.g. john@school.edu"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="handle" className="block text-xs font-mono uppercase tracking-wider text-fg-muted font-semibold">
              Codeforces Handle *
            </label>
            <input
              type="text"
              id="handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full bg-bg border border-border focus:border-accent hover:border-accent/40 rounded px-4 py-2.5 text-sm text-fg font-mono outline-none transition-colors"
              placeholder="e.g. spy-in-shadows"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="year" className="block text-xs font-mono uppercase tracking-wider text-fg-muted">
              Year / Grade *
            </label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-bg border border-border focus:border-accent hover:border-accent/40 rounded px-4 py-2.5 text-sm text-fg outline-none transition-colors"
              placeholder="e.g. Undergraduate Sophomore"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="why" className="block text-xs font-mono uppercase tracking-wider text-fg-muted">
            Coding Experience / Contest History *
          </label>
          <textarea
            id="why"
            rows={4}
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            className="w-full bg-bg border border-border focus:border-accent hover:border-accent/40 rounded px-4 py-2.5 text-sm text-fg outline-none transition-colors resize-none"
            placeholder="Mention standard libraries or languages you use, your current contest ratings (if any), and previous experience."
            required
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-bg hover:bg-accent/90 disabled:opacity-50 transition-all font-heading font-semibold text-sm rounded shadow-lg shadow-accent/10 flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            <span>{loading ? "Registering..." : "Register for Recruitment Contest"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
