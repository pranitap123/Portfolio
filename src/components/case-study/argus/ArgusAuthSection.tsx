"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { authSecurity } from "@/lib/data/argus-prism";

export function ArgusAuthSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-10">
      <p className="text-sm text-white/55 leading-[1.85]">{authSecurity.description}</p>

      {/* Auth flow steps */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          Authentication Lifecycle
        </div>
        <div className="relative">
          <div className="absolute left-3 top-3 bottom-3 w-px bg-white/[0.06]" aria-hidden="true" />
          <div className="space-y-0">
            {authSecurity.authFlow.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.07 * i }}
                className="flex items-start gap-5 py-3.5 border-b border-white/[0.04] last:border-0"
              >
                <div className="relative z-10 shrink-0 w-6 h-6 rounded-full border border-white/[0.1] bg-[#080808] flex items-center justify-center mt-0.5">
                  <span className="text-[10px] font-mono text-white/30 tabular-nums">{i + 1}</span>
                </div>
                <div>
                  <div className="text-sm font-mono font-semibold text-white/75 mb-0.5">{s.step}</div>
                  <div className="text-xs text-white/38 leading-relaxed">{s.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* RBAC roles */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          Role-Based Authorization
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {authSecurity.roles.map((r, i) => (
            <motion.div
              key={r.role}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * i + 0.1 }}
              className="border border-white/[0.08] rounded-sm overflow-hidden"
            >
              <div className={`px-4 py-3 border-b border-white/[0.06] ${
                r.role === "ADMIN"   ? "bg-[#C5A880]/08" :
                r.role === "ANALYST" ? "bg-white/[0.03]" :
                "bg-white/[0.02]"
              }`}>
                <span className={`text-xs font-mono font-semibold ${
                  r.role === "ADMIN" ? "text-[#C5A880]/90" : "text-white/60"
                }`}>
                  {r.role}
                </span>
              </div>
              <ul className="divide-y divide-white/[0.04]">
                {r.permissions.map((perm) => (
                  <li key={perm} className="px-4 py-2.5 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" aria-hidden="true" />
                    <span className="text-xs text-white/40">{perm}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security decisions */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          Security Implementation Decisions
        </div>
        <div className="space-y-3">
          {authSecurity.securityDecisions.map((d, i) => (
            <motion.div
              key={d.decision}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.07 * i + 0.2 }}
              className="flex items-start gap-5 p-5 border border-white/[0.07] rounded-sm hover:bg-white/[0.02] transition-colors"
            >
              <div className="min-w-[140px] shrink-0">
                <span className="text-[11px] font-mono font-semibold text-[#C5A880]/75">{d.decision}</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">{d.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}