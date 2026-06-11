"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { currentFocusData } from "@/lib/data/homepage";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CurrentFocus() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="focus-now-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          {/* Left: heading + description */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel className="mb-4 block">{currentFocusData.label}</SectionLabel>
            <h2
              id="focus-now-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4"
            >
              {currentFocusData.heading}
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">{currentFocusData.description}</p>
          </motion.div>

          {/* Right: focus items */}
          <div className="flex flex-col gap-3">
            {currentFocusData.items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.07 * i,
                }}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 py-4 px-5 border border-white/[0.08] rounded-sm bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors group"
              >
                <span className="text-sm font-semibold text-white min-w-[180px]">
                  {item.label}
                </span>
                <span className="text-xs text-white/35 font-mono leading-relaxed">{item.detail}</span>
                <span
                  aria-hidden="true"
                  className="sm:ml-auto text-[10px] text-[#C5A880]/50 border border-[#C5A880]/20 px-2 py-0.5 rounded-sm font-mono self-start sm:self-auto shrink-0 group-hover:text-[#C5A880]/80 group-hover:border-[#C5A880]/40 transition-colors"
                >
                  active
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}