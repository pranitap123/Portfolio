"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { encryptionModel } from "@/lib/data/securevault";

export function EncryptionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-10">
      {/* Algorithm badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-3 border border-[#C5A880]/30 bg-[#C5A880]/06 px-5 py-3 rounded-sm"
      >
        <LockIcon className="w-4 h-4 text-[#C5A880]/80" />
        <span className="text-sm font-mono font-semibold text-[#C5A880]">{encryptionModel.algorithm}</span>
        <span className="text-xs text-white/30 font-mono">Authenticated Encryption with Associated Data (AEAD)</span>
      </motion.div>

      {/* Description paragraphs */}
      {encryptionModel.description.split("\n\n").map((para, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.06 * i + 0.1 }}
          className="text-sm text-white/55 leading-[1.85]"
        >
          {para}
        </motion.p>
      ))}

      {/* CBC vs GCM callout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="border border-red-500/15 bg-red-500/[0.03] rounded-sm p-5">
          <div className="text-xs font-mono font-semibold text-red-400/70 mb-3">AES-256-CBC (not used)</div>
          <ul className="space-y-1.5">
            {["Confidentiality only — no integrity guarantee", "Tampered ciphertext may decrypt silently to wrong value", "Requires separate MAC for integrity", "Padding oracle attacks possible if not handled carefully"].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-white/35">
                <span className="text-red-400/40 shrink-0 mt-0.5">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-[#C5A880]/25 bg-[#C5A880]/[0.04] rounded-sm p-5">
          <div className="text-xs font-mono font-semibold text-[#C5A880]/90 mb-3">AES-256-GCM (selected)</div>
          <ul className="space-y-1.5">
            {["Authenticated encryption — confidentiality + integrity in one operation", "Tampered ciphertext causes decryption to throw — detected, not served", "Authentication tag included with every encrypt operation", "Recommended by NIST for symmetric authenticated encryption"].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-white/45">
                <span className="text-[#C5A880]/60 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Key management */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.25 }}
        className="flex items-start gap-3 p-5 border border-white/[0.07] bg-white/[0.02] rounded-sm"
      >
        <KeyIcon className="w-4 h-4 text-[#C5A880]/50 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-mono font-semibold text-white/60 mb-2">Key Management</div>
          <p className="text-xs text-white/40 leading-relaxed">{encryptionModel.keyManagement}</p>
        </div>
      </motion.div>

      {/* Threat model */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">Threat Model</div>
        <div className="overflow-x-auto rounded-sm border border-white/[0.07]">
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                <th scope="col" className="text-left py-3 px-4 text-[10px] font-mono font-semibold text-white/30 tracking-widest uppercase">Threat</th>
                <th scope="col" className="text-left py-3 px-4 text-[10px] font-mono font-semibold text-white/30 tracking-widest uppercase">Mitigation</th>
              </tr>
            </thead>
            <tbody>
              {encryptionModel.threatModel.map((row, i) => (
                <motion.tr
                  key={row.threat}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.07 * i + 0.3 }}
                  className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-xs font-mono font-semibold text-white/65">{row.threat}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs text-white/40 leading-relaxed">{row.mitigation}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="M21 2l-9.6 9.6M15.5 7.5l2 2M19 6l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}