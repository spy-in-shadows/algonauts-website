import Link from "next/link";

// EDITABLE STATS CONSTANTS WITH NAVIGATION SUPPORT
const STATS = [
  { label: "Active Competitors", value: "190+", href: "/leaderboard" },
  { label: "ICPC Regional Teams", value: "2 Teams", href: "/about#icpc-showcase" },
  { label: "Contests Hosted", value: "12", href: "/events" },
  { label: "Problems Solved", value: "14,200+", href: null },
];

export default function StatsStrip() {
  return (
    <section className="border-y border-border bg-bg-elevated/40">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center">
          {STATS.map((stat, idx) => {
            const wrapperClass = "text-center space-y-1.5 border-r last:border-r-0 border-border/60 py-2 select-none focus:outline-none transition-all";
            
            const content = (
              <>
                <span className="block font-mono text-2xl md:text-3xl font-bold tracking-tight text-accent group-hover:scale-105 transition-all">
                  {stat.value}
                </span>
                <span className="block font-sans text-xs tracking-wider uppercase text-fg-muted group-hover:text-fg transition-all">
                  {stat.label}
                </span>
              </>
            );

            return stat.href ? (
              <Link 
                href={stat.href} 
                key={idx} 
                className={`${wrapperClass} group hover:text-accent cursor-pointer`}
              >
                {content}
              </Link>
            ) : (
              <div 
                key={idx} 
                className={wrapperClass}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
