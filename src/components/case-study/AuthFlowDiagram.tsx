"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { authFlow } from "@/lib/data/securevault";

export function AuthFlowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-10">
      {/* Prose */}
      <p className="text-sm text-white/55 leading-[1.85]">
        {authFlow.description}
      </p>

      {/* Step sequence */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          Request Lifecycle
        </div>

        <div className="relative">
          <div
            className="absolute left-3 top-3 bottom-3 w-px bg-white/[0.07]"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {authFlow.steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.07 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-5 py-3.5 border-b border-white/[0.04] last:border-0"
              >
                <div className="relative z-10 shrink-0 w-6 h-6 rounded-full border border-white/[0.12] bg-[#080808] flex items-center justify-center mt-0.5">
                  <span className="text-[10px] font-mono text-white/30 tabular-nums">
                    {i + 1}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-mono font-semibold text-white/80 mb-0.5">
                    {s.step}
                  </div>
                  <div className="text-xs text-white/40 leading-relaxed">
                    {s.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trade-offs table */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          JWT Trade-offs
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          <div className="bg-[#080808] px-5 py-3 border-b border-white/[0.06]">
            <span className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest">
              Advantages
            </span>
          </div>

          <div className="bg-[#080808] px-5 py-3 border-b border-white/[0.06]">
            <span className="text-[10px] font-mono text-orange-400/60 uppercase tracking-widest">
              Trade-offs
            </span>
          </div>

          {authFlow.tradeoffs.map((t, i) => (
            <Fragment key={`tradeoff-${i}`}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="bg-[#080808] px-5 py-4 border-b border-white/[0.04] last:border-0"
              >
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400/50 mt-0.5 text-xs shrink-0">
                    +
                  </span>
                  <span className="text-xs text-white/45 leading-relaxed">
                    {t.pro}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 * i + 0.35 }}
                className="bg-[#080808] px-5 py-4 border-b border-white/[0.04] last:border-0"
              >
                <div className="flex items-start gap-2">
                  <span className="text-orange-400/50 mt-0.5 text-xs shrink-0">
                    −
                  </span>
                  <span className="text-xs text-white/45 leading-relaxed">
                    {t.con}
                  </span>
                </div>
              </motion.div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Why JWT */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          Why JWT for this system
        </div>

        <div className="space-y-2">
          {authFlow.whyJWT.map((reason, i) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.07 * i + 0.2 }}
              className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0"
            >
              <span
                className="w-1 h-1 rounded-full bg-[#C5A880]/50 mt-1.5 shrink-0"
                aria-hidden="true"
              />
              <span className="text-xs text-white/50 leading-relaxed">
                {reason}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}