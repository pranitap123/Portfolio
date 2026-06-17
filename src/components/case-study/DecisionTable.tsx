"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Decision {
  decision: string;
  chosen: string;
  alternative: string;
  reason: string;
}

interface DecisionTableProps {
  decisions: readonly Decision[];
}

export function DecisionTable({ decisions }: DecisionTableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-8">
      <p className="text-sm text-white/55 leading-[1.85]">
        Every non-trivial technology choice has an explicit rationale. The alternatives were evaluated against the specific requirements of a secrets management system — not general best practices.
      </p>

      {/* Wide table for desktop */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08]">
              {["Decision", "Chosen", "Alternative", "Rationale"].map((col) => (
                <th key={col} scope="col" className="text-left py-3 px-4 text-[10px] font-mono font-semibold text-white/30 tracking-widest uppercase first:pl-0">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {decisions.map((row, i) => (
              <motion.tr
                key={row.decision}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors group align-top"
              >
                <td className="py-5 px-4 first:pl-0">
                  <span className="text-xs font-mono font-semibold text-white/70">{row.decision}</span>
                </td>
                <td className="py-5 px-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C5A880]/85 border border-[#C5A880]/20 bg-[#C5A880]/05 px-2.5 py-1 rounded-sm whitespace-nowrap">
                    <span className="w-1 h-1 rounded-full bg-[#C5A880]/60" aria-hidden="true" />
                    {row.chosen}
                  </span>
                </td>
                <td className="py-5 px-4">
                  <span className="text-xs font-mono text-white/30 line-through">{row.alternative}</span>
                </td>
                <td className="py-5 px-4 max-w-xs">
                  <span className="text-xs text-white/45 leading-relaxed">{row.reason}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}