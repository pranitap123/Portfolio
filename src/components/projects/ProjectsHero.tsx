"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const stats = [
  { value: "3", label: "Projects" },
  { value: "10+", label: "Technologies" },
  { value: "1", label: "Production Deployment" },
  { value: "3", label: "System Design Domains" },
];

export function ProjectsHero() {
  return (
    <section
      aria-labelledby="projects-page-heading"
      className="pt-32 pb-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <SectionLabel>Engineering Projects</SectionLabel>
        </motion.div>

        <motion.h1
          id="projects-page-heading"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.06] mb-6"
        >
          Systems built to
          <br />
          <span className="text-white/40">production standard.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
          className="text-base sm:text-lg text-white/45 max-w-2xl leading-relaxed mb-16"
        >
          A collection of production-oriented systems spanning backend engineering,
          security, distributed systems, AI integration, and infrastructure.
          Each project documents architecture decisions, not just code.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-sm overflow-hidden"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 + 0.05 * i, duration: 0.4 }}
              className="bg-[#080808] px-6 py-5"
            >
              <div className="text-2xl font-semibold text-white font-mono mb-1">{s.value}</div>
              <div className="text-xs text-white/35 tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}