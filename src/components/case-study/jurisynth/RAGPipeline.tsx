"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ragPipeline } from "@/lib/data/jurisynth-ai";

const STAGE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  search: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  ),
  vector: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round" />
    </svg>
  ),
  database: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" />
    </svg>
  ),
  layers: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  brain: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  cite: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
    </svg>
  ),
};

export function RAGPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const stages = ragPipeline.stages;

  return (
    <div ref={ref} className="space-y-10">
      <p className="text-sm text-white/55 leading-[1.85]">{ragPipeline.description}</p>

      {/* Animated pipeline flow */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          RAG Processing Stages
        </div>

        {/* Stage cards */}
        <div className="flex flex-col sm:flex-row gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {stages.map((stage, i) => {
            const Icon = STAGE_ICONS[stage.icon];
            const isLast = i === stages.length - 1;
            const isGenerate = stage.id === "generate";

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.07 * i }}
                className={`flex-1 p-5 min-w-[130px] relative hover:bg-white/[0.03] transition-colors ${
                  isGenerate
                    ? "bg-[#C5A880]/[0.06] border-t border-[#C5A880]/15 sm:border-t-0 sm:border-l sm:border-r border-[#C5A880]/15"
                    : "bg-[#080808]"
                }`}
              >
                <div className="text-[9px] font-mono text-white/18 mb-3 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <Icon
                  className={`w-4 h-4 mb-3 ${isGenerate ? "text-[#C5A880]/80" : "text-[#C5A880]/50"}`}
                />

                <div className={`text-xs font-semibold mb-2 ${isGenerate ? "text-[#C5A880]" : "text-white"}`}>
                  {stage.label}
                </div>

                <p className="text-[11px] text-white/35 leading-relaxed mb-4 line-clamp-3">
                  {stage.detail}
                </p>

                <span className="inline-flex items-center gap-1 text-[9px] font-mono border border-white/[0.07] text-white/28 px-2 py-0.5 rounded-sm">
                  <span aria-hidden="true">⏱</span>
                  {stage.latency}
                </span>

                {/* Arrow */}
                {!isLast && (
                  <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-[60%] z-10 bg-[#080808] rounded-full p-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M2 5h6M6 2l3 3-3 3" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Live query pulse trace */}
        <div className="mt-3 border border-white/[0.06] rounded-sm bg-white/[0.01] px-4 py-3 overflow-hidden">
          <div className="text-[10px] font-mono text-white/20 mb-3 uppercase tracking-widest">
            Query in flight
          </div>
          <div className="relative h-6">
            {/* Stage lane markers */}
            <div className="absolute inset-0 flex">
              {stages.map((s) => (
                <div key={s.id} className="flex-1 border-r border-white/[0.05] last:border-0" />
              ))}
            </div>

            {/* Animated query particle */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C5A880]"
              style={{ left: 0 }}
              animate={{ left: ["0%", "100%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            {/* Glow */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#C5A880]/20"
              style={{ left: 0 }}
              animate={{ left: ["0%", "100%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.04,
              }}
            />
          </div>
        </div>
      </div>

      {/* Quality mechanisms */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          Quality Mechanisms
        </div>
        <div className="space-y-0 divide-y divide-white/[0.05]">
          {ragPipeline.qualityMechanisms.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.07 * i + 0.3 }}
              className="py-3.5 flex items-start gap-4"
            >
              <span className="text-[11px] font-mono font-semibold text-[#C5A880]/70 min-w-[180px] shrink-0 mt-0.5">
                {m.name}
              </span>
              <span className="text-xs text-white/40 leading-relaxed">{m.detail}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}