"use client";

import { useEffect, useState } from "react";
import AddToCalendarButton from "./AddToCalendarButton";
import { CalendarEvent } from "@/lib/generateIcs";
import { Clock, MapPin } from "lucide-react";

interface EventCardProps {
  event: CalendarEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const date = new Date(event.date);
    const formatted = new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);
    setFormattedDate(formatted);
  }, [event.date]);

  return (
    <div className="bg-bg-elevated border border-border p-6 rounded-lg flex flex-col justify-between gap-6 hover:border-accent/20 transition-all select-none">
      <div className="space-y-4">
        {/* Date and duration info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-accent font-mono text-[10px] uppercase tracking-wider">
            <Clock size={12} />
            <span>{formattedDate || "Loading date..."}</span>
          </div>
          <span className="block text-[11px] text-fg-muted font-sans font-medium">
            Duration: {event.durationMinutes} minutes
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="font-heading font-semibold text-lg text-fg tracking-wide leading-snug">
            {event.title}
          </h3>
          <p className="text-fg-muted font-sans text-sm leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Location and download button */}
      <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-fg-muted font-mono text-[11px]">
          <MapPin size={12} className="text-accent/60" />
          <span>{event.location}</span>
        </div>

        <AddToCalendarButton event={event} />
      </div>
    </div>
  );
}
