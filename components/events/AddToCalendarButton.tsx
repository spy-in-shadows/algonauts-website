"use client";

import { generateIcs, CalendarEvent } from "@/lib/generateIcs";
import { Calendar } from "lucide-react";

interface AddToCalendarButtonProps {
  event: CalendarEvent;
}

export default function AddToCalendarButton({ event }: AddToCalendarButtonProps) {
  return (
    <button
      onClick={() => generateIcs(event)}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-border hover:border-accent/40 text-fg hover:text-accent font-heading font-semibold text-[11px] md:text-xs rounded transition-all focus:outline-none"
    >
      <Calendar size={13} />
      <span>Add to Calendar</span>
    </button>
  );
}
