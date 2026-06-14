"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { encryptionModel } from "@/lib/data/securevault";
import { Section, Prose, Callout } from "./Section";

export function EncryptionModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="encryption" eyebrow="Security Core" heading="Encryption Model">
      {/* Highlighted callout — this is the most security-critical section */}
      <div className="p-5 mb-8 border border-[#C5A880]/25 bg-[#C5A880]/[0.04] rounded-sm">
        <div className="flex items-center gap-2 mb-3">
          <LockIcon className="w-4 h-4 text-[#C5A880]/70" />
          <span className="text-[10px] font-mono text-[#C5A880]/70 uppercase tracking-widest">Encryption Standard</span>
        </div>
        <p className="text-sm text-white/65 leading-[1.80] font-mono">
          AES-256-GCM · Authenticated Encryption with Associated Data (AEAD) · 96-bit IV per secret · 128-bit authentication tag
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Why GCM */}
        <div>
          <h3 className="text-xs font-mono text-white/35 uppercase tracking-widest mb-4">
            Why GCM over CBC
          </h3>
          <Prose>{encryptionModel.threatModel[0].mitigation}</Prose>
        </div>

        {/* Per-secret IV */}
        <div>
          <h3 className="text-xs font-mono text-white/35 uppercase tracking-widest mb-4">
            Per-Secret IV Strategy
          </h3>
          <Prose>{encryptionModel.threatModel[1].mitigation}</Prose>
        </div>
      </div>

      {/* Threat model table */}
      <div ref={ref}>
        <h3 className="text-xs font-mono text-white/35 uppercase tracking-widest mb-4">
          Threat Model — Mitigated Attack Vectors
        </h3>

        <div className="border border-white/[0.07] rounded-sm overflow-hidden">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                <th scope="col" className="text-left px-5 py-3 text-[10px] font-mono text-white/30 uppercase tracking-widest w-2/5">
                  Attack Vector
                </th>
                <th scope="col" className="text-left px-5 py-3 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  Mitigation
                </th>
              </tr>
            </thead>
            <tbody>
              {encryptionModel.threatModel.map((row, i) => (
                <motion.tr
                  key={row.threat}
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.07 * i + 0.1, duration: 0.4 }}
                  className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400/40 shrink-0" aria-hidden="true" />
                      <span className="text-xs font-mono text-white/55">{row.threat}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-white/40 leading-relaxed">{row.mitigation}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}