"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { principlesData } from "@/lib/data/homepage";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Principles() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="principles-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <SectionLabel className="mb-4 block">{principlesData.label}</SectionLabel>
            <h2
              id="principles-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
            >
              {principlesData.heading}
            </h2>
          </motion.div>

          {/* Right: principle list */}
          <div className="divide-y divide-white/[0.07]">
            {principlesData.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.07 * i,
                }}
                className="py-6 first:pt-0 lg:first:pt-0"
              >
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#C5A880] block shrink-0" aria-hidden="true" />
                  {item.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed pl-3">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}