"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { comparisonData } from "@/lib/data/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const rows = comparisonData.rows;

  return (
    <section
      ref={ref}
      aria-labelledby="comparison-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <SectionLabel className="mb-4 block">Technical Comparison</SectionLabel>
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3"
          >
            Engineering Matrix
          </h2>
          <p className="text-sm text-white/40 max-w-lg leading-relaxed">
            A structured comparison of architectural decisions across all three projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-x-auto"
          role="region"
          aria-label="Project comparison table"
        >
          <table className="w-full min-w-[640px] border-collapse">
            {/* Header */}
            <thead>
              <tr className="border-b border-white/[0.08]">
                {comparisonData.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="text-left py-3 px-4 text-[10px] font-mono font-semibold text-white/30 tracking-widest uppercase first:pl-0"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.project}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.18 + 0.08 * i, duration: 0.45 }}
                  className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Project name */}
                  <td className="py-4 px-4 first:pl-0">
                    <span className="text-sm font-semibold text-white">{row.project}</span>
                  </td>

                  {/* Primary Focus */}
                  <td className="py-4 px-4">
                    <span className="text-xs font-mono text-[#C5A880]/70">{row.focus}</span>
                  </td>

                  {/* Database */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center text-[11px] font-mono text-white/45 border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 rounded-sm">
                      {row.database}
                    </span>
                  </td>

                  {/* Deployment */}
                  <td className="py-4 px-4">
                    <span className="text-xs text-white/40 font-mono">{row.deployment}</span>
                  </td>

                  {/* Auth */}
                  <td className="py-4 px-4">
                    <span className="text-xs text-white/40">{row.auth}</span>
                  </td>

                  {/* Architecture */}
                  <td className="py-4 px-4">
                    <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{row.architecture}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-[11px] font-mono text-white/20 mt-6"
        >
          * All projects follow a security-first design philosophy with containerized deployment targets.
        </motion.p>
      </div>
    </section>
  );
}