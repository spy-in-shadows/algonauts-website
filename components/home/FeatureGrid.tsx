"use client";

import { motion } from "framer-motion";
import { Trophy, BookOpen, Layers } from "lucide-react";

const FEATURES = [
  {
    icon: Trophy,
    title: "Contests & Hackathons",
    description: "We organize regular coding contests, hackathons, and algorithm workshops to sharpen speed, logic, and implementation skills.",
  },
  {
    icon: BookOpen,
    title: "Training Sessions",
    description: "We conduct hands-on training sessions breaking down complex data structures, search algorithms, and advanced programming concepts.",
  },
  {
    icon: Layers,
    title: "Interview & Contest Prep",
    description: "We provide a dedicated platform to prepare members for technical interviews and top global tournaments like ICPC and Meta Hacker Cup.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8">
      <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
        <h2 className="font-heading font-semibold text-2xl md:text-3xl tracking-tight text-fg">
          Fostering Coding Excellence
        </h2>
        <p className="text-fg-muted font-sans text-sm md:text-base leading-relaxed">
          We are a student-led community dedicated to empowering students with the skills and opportunities needed to excel in competitive programming, logic building, and algorithms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feat, idx) => {
          const IconComponent = feat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-bg-elevated border border-border p-8 rounded-lg flex flex-col items-start gap-4 border-glow cursor-default"
            >
              <div className="p-3 bg-bg border border-border text-accent rounded-md">
                <IconComponent size={24} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-fg tracking-wide mt-2">
                {feat.title}
              </h3>
              <p className="text-fg-muted font-sans text-sm leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
