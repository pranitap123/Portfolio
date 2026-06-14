"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { detectionPipeline } from "@/lib/data/argus-prism";

const STAGE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  inbox: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M22 12h-6l-2 3H10l-2-3H2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" strokeLinejoin="round" />
    </svg>
  ),
  layers: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  shield: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
    </svg>
  ),
  graph: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="6" cy="12" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" />
      <path d="M8 11l8-4M8 13l8 4" strokeLinecap="round" />
    </svg>
  ),
  database: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" />
    </svg>
  ),
  broadcast: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 11a1 1 0 110 2 1 1 0 010-2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.636 5.636a9 9 0 000 12.728M8.464 8.464a5 5 0 000 7.072" strokeLinecap="round" />
    </svg>
  ),
};

export function DetectionPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-10">
      <p className="text-sm text-white/55 leading-[1.85]">{detectionPipeline.description}</p>

      {/* Horizontal pipeline stages */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          Processing Stages
        </div>

        {/* Stage cards — horizontal scroll on mobile */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-px bg-white/[0.06] rounded-sm overflow-hidden">
            {detectionPipeline.stages.map((stage, i) => {
              const Icon = STAGE_ICONS[stage.icon];
              const isLast = i === detectionPipeline.stages.length - 1;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.07 * i }}
                  className="flex-1 bg-[#080808] p-5 min-w-[140px] hover:bg-white/[0.025] transition-colors relative"
                >
                  {/* Stage number */}
                  <div className="text-[9px] font-mono text-white/20 mb-3 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <Icon className="w-4 h-4 text-[#C5A880]/60 mb-3" />

                  <div className="text-xs font-semibold text-white mb-2">{stage.label}</div>
                  <p className="text-[11px] text-white/35 leading-relaxed mb-4">{stage.detail}</p>

                  {/* Latency badge */}
                  <div className="inline-flex items-center gap-1 text-[9px] font-mono border border-white/[0.08] text-white/30 px-2 py-0.5 rounded-sm">
                    <span aria-hidden="true">⏱</span>
                    {stage.latency}
                  </div>

                  {/* Arrow connector */}
                  {!isLast && (
                    <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animated pipeline event trace */}
      <div className="border border-white/[0.07] rounded-sm bg-white/[0.015] p-5">
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          Live Event Trace
        </div>
        <svg viewBox="0 0 700 60" width="100%" height="auto" aria-hidden="true">
          {/* Stage labels */}
          {detectionPipeline.stages.map((stage, i) => (
            <g key={stage.id}>
              <rect
                x={i * 113 + 5} y={15} width={100} height={28} rx="3"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.75"
              />
              <text
                x={i * 113 + 55} y={29}
                textAnchor="middle" dominantBaseline="central"
                fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace"
              >
                {stage.label}
              </text>
            </g>
          ))}

          {/* Connection lines */}
          {detectionPipeline.stages.slice(0, -1).map((_, i) => (
            <line
              key={i}
              x1={i * 113 + 105} y1={29}
              x2={i * 113 + 118} y2={29}
              stroke="rgba(255,255,255,0.1)" strokeWidth="1"
            />
          ))}

          {/* Animated event packet */}
          <motion.circle
            r="4"
            fill="#C5A880"
            opacity={0.85}
            animate={{
              x: [55, 168, 281, 394, 507, 620],
              y: [29, 29, 29, 29, 29, 29],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }}
          />

          {/* Glow trail */}
          <motion.circle
            r="7"
            fill="#C5A880"
            opacity={0.15}
            animate={{
              x: [55, 168, 281, 394, 507, 620],
              y: [29, 29, 29, 29, 29, 29],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              delay: 0.05,
            }}
          />
        </svg>
      </div>

      {/* Delivery guarantees */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          Delivery Guarantees
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {detectionPipeline.guarantees.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.07 * i + 0.3 }}
              className="flex items-start gap-3 p-4 border border-white/[0.06] rounded-sm bg-white/[0.015]"
            >
              <span className="text-[#C5A880]/60 mt-0.5 text-xs shrink-0">✓</span>
              <span className="text-xs text-white/45 leading-relaxed font-mono">{g}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}