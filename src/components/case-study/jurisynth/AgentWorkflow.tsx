"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { agentWorkflow } from "@/lib/data/jurisynth-ai";

const AGENT_ACCENT: Record<string, { border: string; bg: string; text: string }> = {
  router:    { border: "border-[#C5A880]/30",  bg: "bg-[#C5A880]/[0.06]",  text: "text-[#C5A880]" },
  research:  { border: "border-white/[0.1]",   bg: "bg-white/[0.03]",      text: "text-white/70" },
  reasoning: { border: "border-blue-400/20",   bg: "bg-blue-400/[0.04]",   text: "text-blue-300/80" },
  citation:  { border: "border-emerald-400/20",bg: "bg-emerald-400/[0.04]",text: "text-emerald-300/80" },
  synthesis: { border: "border-[#C5A880]/25",  bg: "bg-[#C5A880]/[0.05]",  text: "text-[#C5A880]/90" },
};

export function AgentWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-10">
      <p className="text-sm text-white/55 leading-[1.85]">{agentWorkflow.description}</p>

      {/* Agent cards — vertical flow */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-6">
          Agent Hierarchy
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">

          {/* Left: vertical flow diagram */}
          <div className="flex flex-col items-center gap-0 lg:sticky lg:top-24">
            {agentWorkflow.agents.map((agent, i) => {
              const accent = AGENT_ACCENT[agent.id];
              const isLast = i === agentWorkflow.agents.length - 1;

              return (
                <div key={agent.id} className="flex flex-col items-center w-full">
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.08 * i }}
                    className={`w-full border rounded-sm px-4 py-3.5 ${accent.border} ${accent.bg}`}
                  >
                    <div className={`text-xs font-semibold font-mono ${accent.text}`}>{agent.name}</div>
                    <div className="text-[10px] text-white/28 mt-0.5">{agent.role}</div>
                  </motion.div>

                  {/* Connector with parallel fork for research agents */}
                  {!isLast && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.08 * i + 0.3 }}
                      className="flex flex-col items-center origin-top"
                    >
                      <div className="w-px h-5 bg-white/[0.08]" />
                      {/* Parallel indicator for research */}
                      {agent.id === "router" && (
                        <div className="flex items-center gap-1 my-0.5">
                          {[0, 1, 2].map((j) => (
                            <div key={j} className="w-px h-3 bg-white/[0.06]" />
                          ))}
                          <span className="text-[8px] font-mono text-white/20 mx-1">parallel</span>
                          {[0, 1, 2].map((j) => (
                            <div key={j} className="w-px h-3 bg-white/[0.06]" />
                          ))}
                        </div>
                      )}
                      <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                        <path d="M1 1L5 5L9 1" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: agent detail cards */}
          <div className="space-y-4">
            {agentWorkflow.agents.map((agent, i) => {
              const accent = AGENT_ACCENT[agent.id];

              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.09 * i + 0.1 }}
                  className={`border rounded-sm p-5 ${accent.border} hover:bg-white/[0.02] transition-colors`}
                >
                  <div className={`text-sm font-semibold mb-1 ${accent.text}`}>{agent.name}</div>
                  <div className="text-[10px] font-mono text-white/30 mb-3">{agent.role}</div>
                  <p className="text-xs text-white/45 leading-relaxed mb-4">{agent.description}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[9px] font-mono text-white/22 uppercase tracking-widest mb-2">Inputs</div>
                      {agent.inputs.map((inp) => (
                        <div key={inp} className="flex items-center gap-1.5 py-1">
                          <span className="text-[#C5A880]/40 text-[9px]">→</span>
                          <span className="text-[11px] text-white/35">{inp}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-white/22 uppercase tracking-widest mb-2">Outputs</div>
                      {agent.outputs.map((out) => (
                        <div key={out} className="flex items-center gap-1.5 py-1">
                          <span className="text-emerald-400/40 text-[9px]">←</span>
                          <span className="text-[11px] text-white/35">{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Complex query execution flow */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          Complex Query Execution Steps
        </div>
        <div className="space-y-0">
          {agentWorkflow.complexQueryFlow.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.06 * i + 0.2 }}
              className="flex items-start gap-4 py-3 border-b border-white/[0.04] last:border-0"
            >
              <span className="text-[10px] font-mono text-[#C5A880]/45 shrink-0 tabular-nums mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xs text-white/45 leading-relaxed">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}