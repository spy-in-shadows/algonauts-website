"use client";

import { useState } from "react";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import EventCard from "@/components/events/EventCard";
import eventsData from "@/data/events.json";
import Link from "next/link";
import { CalendarRange, Archive, ExternalLink, FileText } from "lucide-react";

export default function Events() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <>
      <Navbar />
      <main className="flex-grow py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8 space-y-12">
        {/* Title Header */}
        <div className="space-y-4 max-w-xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-fg tracking-tight">
            Contests & Events
          </h1>
          <p className="text-fg-muted font-sans text-sm md:text-base leading-relaxed">
            Participate in our practice rounds, algorithm bootcamps, and regional competitive mocks.
          </p>
        </div>
        {/* Featured Event Spotlight */}
        <div className="border border-border bg-bg-elevated/20 rounded-xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center text-left">
          {/* Thumbnail Image */}
          <div className="w-full lg:w-2/5 aspect-[16/10] rounded-lg overflow-hidden border border-border bg-bg shrink-0 relative">
            <img
              src="/syndicate/syndicate2.jpg"
              alt="The Syndicate CP Event"
              className="w-full h-full object-cover"
            />
            {/* Banner badge */}
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-accent text-bg font-mono text-[9px] uppercase tracking-wider font-bold rounded">
              Featured Showcase
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="block font-mono text-xs text-accent uppercase tracking-widest font-semibold">
                Algonauts Major Event
              </span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-fg tracking-tight">
                The Syndicate 2026
              </h2>
              <p className="font-heading font-semibold text-xs md:text-sm text-[#f39c12] uppercase tracking-widest">
                Code. Capital. Conquer.
              </p>
            </div>
            
            <p className="text-fg-muted font-sans text-xs md:text-sm leading-relaxed">
              Our biggest event of the year, combining algorithmic competitive programming with a live strategic bidding economy. Teams bid for problems using virtual capital and competed for top podium hoodies.
            </p>

            <div className="pt-2">
              <Link
                href="/events/the-syndicate"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent/10 border border-accent/20 hover:border-accent/40 hover:bg-accent/15 text-accent font-heading font-semibold text-xs rounded transition-all focus:outline-none"
              >
                <span>Explore The Syndicate 2026 Details</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-border w-fit gap-6 font-heading font-semibold text-sm">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-4 flex items-center gap-2 border-b-2 transition-all focus:outline-none ${
              activeTab === "upcoming"
                ? "border-accent text-accent"
                : "border-transparent text-fg-muted hover:text-fg"
            }`}
          >
            <CalendarRange size={16} />
            <span>Upcoming Events</span>
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-4 flex items-center gap-2 border-b-2 transition-all focus:outline-none ${
              activeTab === "past"
                ? "border-accent text-accent"
                : "border-transparent text-fg-muted hover:text-fg"
            }`}
          >
            <Archive size={16} />
            <span>Past Contests</span>
          </button>
        </div>

        {/* Content Panel */}
        <div className="pt-4">
          {activeTab === "upcoming" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventsData.upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            // Past Contests Archive Table
            <div className="border border-border rounded-lg overflow-hidden bg-bg-elevated/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse select-none md:select-text">
                  <thead>
                    <tr className="border-b border-border bg-bg-elevated/40 text-[10px] md:text-xs font-mono uppercase tracking-widest text-fg-muted">
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Contest Name</th>
                      <th className="py-4 px-6">Winners</th>
                      <th className="py-4 px-6 text-right">Resource</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm font-sans">
                    {eventsData.past.map((contest) => {
                      const isInternal = contest.editorialUrl.startsWith("/");
                      return (
                        <tr key={contest.id} className="hover:bg-bg-elevated/30 transition-colors">
                          <td className="py-4 px-6 font-mono text-xs text-fg-muted whitespace-nowrap">
                            {contest.date}
                          </td>
                          <td className="py-4 px-6 font-heading font-semibold text-fg tracking-wide">
                            {contest.name}
                          </td>
                          <td className="py-4 px-6 text-fg-muted">
                            <div className="flex gap-2">
                              {contest.winners.map((winner) => (
                                <span
                                  key={winner}
                                  className="font-mono text-xs text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/15"
                                >
                                  {winner}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            {isInternal ? (
                              <Link
                                href={contest.editorialUrl}
                                className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold hover:underline"
                              >
                                <FileText size={14} />
                                <span>Editorial</span>
                              </Link>
                            ) : (
                              <a
                                href={contest.editorialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-accent hover:underline font-semibold"
                              >
                                <span>Codeforces</span>
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
