"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { authFlow } from "@/lib/data/securevault";
import { Section, Prose, Callout } from "./Section";

export function AuthFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="auth-flow" eyebrow="Security" heading="Authentication Flow">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Flow steps */}
        <div ref={ref}>
          <h3 className="text-xs font-mono text-white/35 uppercase tracking-widest mb-5">
            Request Lifecycle
          </h3>
          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-[13px] top-4 bottom-4 w-px bg-white/[0.08]" aria-hidden="true" />

            <ol className="space-y-0 list-none p-0 m-0">
              {authFlow.steps.map((step, i) => (
                <motion.li
                  key={step.step}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.45 }}
                  className="flex items-start gap-4 pb-5 last:pb-0"
                >
                  {/* Step dot */}
                  <div className="relative z-10 w-6 h-6 rounded-full border border-white/[0.12] bg-[#080808] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[9px] font-mono text-white/30 tabular-nums">{i + 1}</span>
                  </div>

                  <div>
                    <div className="text-xs font-mono font-semibold text-white/70 mb-0.5">
                      {step.step}
                    </div>
                    <div className="text-xs text-white/35 leading-relaxed">{step.detail}</div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* JWT explanation */}
        <div>
          <h3 className="text-xs font-mono text-white/35 uppercase tracking-widest mb-5">
            Why JWT
          </h3>

          <div className="space-y-2 mb-5">
            {authFlow.whyJWT.map((adv, i) => (
              <motion.div
                key={adv}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.08 * i + 0.3 }}
                className="flex items-start gap-2.5 py-2"
              >
                <span className="text-[#C5A880]/50 text-xs mt-0.5 shrink-0" aria-hidden="true">+</span>
                <span className="text-xs text-white/50 leading-relaxed">{adv}</span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-white/[0.07] pt-4 mb-4">
            <h4 className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">
              Trade-offs accepted
            </h4>
          {authFlow.tradeoffs.map((t, i) => (
  <div key={i} className="flex flex-col gap-1">
    <span className="text-green-400">✓ {t.pro}</span>
    <span className="text-red-400">✗ {t.con}</span>
  </div>
))}
          </div>
        </div>
      </div>

      <Callout variant="gold">
        <span className="text-[#C5A880]/60 text-[10px] uppercase tracking-widest block mb-2">Security Note</span>
        {authFlow.description}
      </Callout>
    </Section>
  );
}