"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";

const METHOD_COLORS: Record<string, { text: string; border: string; bg: string }> = {
  GET:    { text: "text-emerald-400",  border: "border-emerald-400/20", bg: "bg-emerald-400/[0.06]" },
  POST:   { text: "text-blue-400",     border: "border-blue-400/20",    bg: "bg-blue-400/[0.06]" },
  PUT:    { text: "text-orange-400",   border: "border-orange-400/20",  bg: "bg-orange-400/[0.06]" },
  DELETE: { text: "text-red-400",      border: "border-red-400/20",     bg: "bg-red-400/[0.06]" },
};

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  auth: boolean;
  request?: string;
  response?: string;
}

interface ApiEndpointsProps {
  endpoints: readonly ApiEndpoint[];
}

export function ApiEndpoints({ endpoints }: ApiEndpointsProps)  {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div ref={ref} className="space-y-10">
      <p className="text-sm text-white/55 leading-[1.85]">
        All endpoints accept and return <code className="font-mono text-[#C5A880]/80 bg-[#C5A880]/08 px-1.5 py-0.5 rounded text-xs">application/json</code>. Input validation is performed by Zod schemas before any business logic executes — invalid payloads receive a structured 400 response before touching the database. Authentication is enforced by middleware on all routes marked as protected.
      </p>

      {/* Endpoint list */}
      <div className="space-y-2">
        {endpoints.map((ep, i) => {
          const colors = METHOD_COLORS[ep.method] || METHOD_COLORS.GET;
          const isOpen = expanded === i;

          return (
            <motion.div
              key={ep.path}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.07 * i }}
              className="border border-white/[0.08] rounded-sm overflow-hidden"
            >
              {/* Header row — clickable */}
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                aria-expanded={isOpen}
                aria-controls={`endpoint-panel-${i}`}
              >
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-sm border shrink-0 ${colors.text} ${colors.border} ${colors.bg}`}>
                  {ep.method}
                </span>
                <span className="text-sm font-mono text-white/80 flex-1">{ep.path}</span>
                <span className="text-xs text-white/30 hidden sm:block">{ep.description}</span>
                {ep.auth && (
                  <span className="text-[10px] font-mono text-[#C5A880]/60 border border-[#C5A880]/20 px-2 py-0.5 rounded-sm shrink-0">
                    Auth
                  </span>
                )}
                <ChevronIcon
                  className={`w-4 h-4 text-white/20 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Expanded panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`endpoint-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06]">
                      {ep.request !== null && (
                        <div className="bg-[#080808] p-5">
                          <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">Request Body</div>
                          <pre className="text-[11px] font-mono text-white/55 leading-relaxed whitespace-pre overflow-x-auto">
                            {ep.request}
                          </pre>
                        </div>
                      )}
                      <div className={`bg-[#080808] p-5 ${ep.request === null ? "sm:col-span-2" : ""}`}>
                        <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">Response</div>
                        <pre className="text-[11px] font-mono text-white/55 leading-relaxed whitespace-pre overflow-x-auto">
                          {ep.response}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Validation note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="flex items-start gap-3 p-5 border border-white/[0.07] bg-white/[0.02] rounded-sm"
      >
        <ShieldIcon className="w-4 h-4 text-[#C5A880]/50 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-mono font-semibold text-white/60 mb-2">Zod Validation Strategy</div>
          <p className="text-xs text-white/40 leading-relaxed">
            Each route defines a Zod schema co-located with its handler. Schemas are not centralized — they live adjacent to the code that uses them. This prevents drift between the runtime schema and the handler logic, and means schema changes surface in the same PR as handler changes. The validation middleware calls <code className="text-[#C5A880]/70 bg-[#C5A880]/06 px-1 rounded text-[10px]">schema.safeParse()</code> and returns a structured 400 with field-level error paths before the handler is invoked.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
    </svg>
  );
}