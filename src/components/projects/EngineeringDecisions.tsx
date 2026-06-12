"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { engineeringDecisions } from "@/lib/data/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function EngineeringDecisions() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="decisions-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">

          {/* Left: heading sticky */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <SectionLabel className="mb-4 block">Design Philosophy</SectionLabel>
            <h2
              id="decisions-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4"
            >
              Engineering
              <br />
              Decisions
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">
              The architectural thinking that shapes how these systems are built — not retrofitted after the fact.
            </p>
          </motion.div>

          {/* Right: decision cards */}
          <div className="space-y-0">
            {engineeringDecisions.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.07 * i,
                }}
                className="py-7 border-b border-white/[0.07] last:border-0 group"
              >
                {/* Title row */}
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-[10px] font-mono text-white/15 mt-1.5 tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold text-white group-hover:text-[#C5A880] transition-colors duration-300">
                    {d.title}
                  </h3>
                </div>

                {/* Principle */}
                <div className="pl-9">
                  <p className="text-sm text-white/55 leading-relaxed mb-4 italic">
                    &ldquo;{d.principle}&rdquo;
                  </p>

                  {/* Implementation detail */}
                  <div className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-sm">
                    <TerminalIcon className="w-3.5 h-3.5 text-[#C5A880]/50 mt-0.5 shrink-0" />
                    <p className="text-xs text-white/40 font-mono leading-relaxed">
                      {d.implementation}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="19" x2="20" y2="19" strokeLinecap="round" />
    </svg>
  );
}