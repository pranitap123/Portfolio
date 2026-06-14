"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { citationEngine } from "@/lib/data/jurisynth-ai";

// Simulated response with citation highlights
const DEMO_RESPONSE = {
  sentences: [
    {
      text: "In data breach negligence cases, courts apply the reasonable foreseeability standard to determine whether a duty of care exists between the defendant and affected parties.",
      citations: ["SRC:chunk_847", "SRC:chunk_1203"],
      supported: true,
    },
    {
      text: "The Ninth Circuit held in Krottner v. Starbucks Corp. that increased risk of identity theft constitutes sufficient injury for Article III standing.",
      citations: ["SRC:chunk_392"],
      supported: true,
    },
    {
      text: "Circuit courts are increasingly aligned on this standard.",
      citations: [],
      supported: false,
      warning: "Synthesized inference — no direct source support",
    },
    {
      text: "Defendants must demonstrate that reasonable security measures were implemented and that the breach occurred despite those measures.",
      citations: ["SRC:chunk_1508"],
      supported: true,
    },
  ],
};

export function CitationEngine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-10">
      <p className="text-sm text-white/55 leading-[1.85]">{citationEngine.description}</p>

      {/* Mechanism steps */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          Attribution Mechanism
        </div>
        <div className="relative">
          <div className="absolute left-3 top-3 bottom-3 w-px bg-white/[0.06]" aria-hidden="true" />
          <div className="space-y-0">
            {citationEngine.mechanism.map((m, i) => (
              <motion.div
                key={m.step}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="flex items-start gap-5 py-4 border-b border-white/[0.04] last:border-0"
              >
                <div className="relative z-10 shrink-0 w-6 h-6 rounded-full border border-white/[0.1] bg-[#080808] flex items-center justify-center mt-0.5">
                  <span className="text-[10px] font-mono text-white/30 tabular-nums">{i + 1}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/75 mb-1 font-mono">{m.step}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{m.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Live demo simulation */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          Research Output — Citation View
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="border border-white/[0.08] rounded-sm overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06]">
            <DocIcon className="w-3.5 h-3.5 text-[#C5A880]/60" />
            <span className="text-[11px] font-mono text-white/35">research_memo.jurisynth</span>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-[10px] font-mono text-emerald-400/60 border border-emerald-400/20 px-2 py-0.5 rounded-sm">
                3 / 4 claims cited
              </span>
              <span className="text-[10px] font-mono text-orange-400/60 border border-orange-400/20 px-2 py-0.5 rounded-sm">
                1 unsupported
              </span>
            </div>
          </div>

          {/* Simulated response */}
          <div className="p-6 space-y-4">
            {DEMO_RESPONSE.sentences.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.08 * i + 0.4 }}
                className="flex items-start gap-3"
              >
                <div className="flex-1">
                  <p
                    className={`text-sm leading-relaxed ${
                      s.supported ? "text-white/65" : "text-white/40"
                    }`}
                  >
                    {s.text}
                    {s.citations.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center ml-1 text-[10px] font-mono text-[#C5A880]/70 bg-[#C5A880]/08 border border-[#C5A880]/20 px-1.5 py-0.5 rounded-sm align-middle"
                        title={c}
                      >
                        {c.replace("SRC:chunk_", "§")}
                      </span>
                    ))}
                  </p>
                  {!s.supported && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-orange-400/60">
                      <WarningIcon className="w-3 h-3" />
                      {s.warning}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Source panel */}
          <div className="border-t border-white/[0.06] bg-white/[0.015] px-5 py-4">
            <div className="text-[10px] font-mono text-white/22 uppercase tracking-widest mb-3">
              Cited Sources
            </div>
            <div className="space-y-2">
              {[
                { id: "chunk_847",  source: "Smith v. Jones, 2021 WL 123456", page: 14, score: 0.91 },
                { id: "chunk_1203", source: "Restatement (Third) of Torts §7", page: 3,  score: 0.87 },
                { id: "chunk_392",  source: "Krottner v. Starbucks Corp., 628 F.3d 1139", page: 7, score: 0.94 },
                { id: "chunk_1508", source: "FTC v. Wyndham Worldwide Corp., 799 F.3d 236", page: 22, score: 0.83 },
              ].map((src, i) => (
                <motion.div
                  key={src.id}
                  initial={{ opacity: 0, x: -4 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.06 * i + 0.55 }}
                  className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0"
                >
                  <span className="text-[10px] font-mono text-[#C5A880]/55 shrink-0">§{src.id.replace("chunk_", "")}</span>
                  <span className="text-xs text-white/45 flex-1">{src.source}</span>
                  <span className="text-[10px] font-mono text-white/25">p.{src.page}</span>
                  <span className="text-[10px] font-mono text-[#C5A880]/50">{(src.score * 100).toFixed(0)}%</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Citation object specimen */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          Citation Object Schema
        </div>
        <div className="border border-white/[0.08] rounded-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-white/10" aria-hidden="true" />
            <span className="text-[11px] font-mono text-white/30">CitationRecord</span>
          </div>
          <pre className="p-5 text-[11px] font-mono text-white/48 leading-relaxed overflow-x-auto whitespace-pre">
            {citationEngine.citationObject}
          </pre>
        </div>
      </div>
    </div>
  );
}

function DocIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}