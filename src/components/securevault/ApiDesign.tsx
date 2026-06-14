"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { apiEndpoints } from "@/lib/data/securevault";
import { Section, Prose } from "./Section";

const METHOD_STYLE: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-400/[0.08] border-emerald-400/20",
  POST: "text-blue-400 bg-blue-400/[0.08] border-blue-400/20",
  PUT: "text-amber-400 bg-amber-400/[0.08] border-amber-400/20",
  DELETE: "text-red-400 bg-red-400/[0.08] border-red-400/20",
  PATCH: "text-purple-400 bg-purple-400/[0.08] border-purple-400/20",
};

export function ApiDesign() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="api-design" eyebrow="Interface" heading="API Design">
      {/* Base URL */}
      <div className="flex items-center gap-3 mb-8 p-4 border border-white/[0.08] bg-white/[0.02] rounded-sm">
        <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest shrink-0">
          Base URL
        </span>
        <code className="text-xs font-mono text-white/55">
          /api/v1
        </code>
      </div>

      {/* Endpoints */}
      <div
        ref={ref}
        className="space-y-px border border-white/[0.07] rounded-sm overflow-hidden mb-8"
      >
        {apiEndpoints.map((ep, i) => {
          const isOpen = openIndex === i;

          return (
            <motion.div
              key={ep.path}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.07 }}
              className="bg-[#080808]"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.025] transition-colors text-left"
              >
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-1 rounded-sm border ${
                    METHOD_STYLE[ep.method]
                  }`}
                >
                  {ep.method}
                </span>

                <code className="text-sm font-mono text-white/70 flex-1">
                  {ep.path}
                </code>

                <span className="hidden md:block text-xs text-white/30">
                  {ep.description}
                </span>

                {ep.auth && (
                  <span className="text-[9px] font-mono text-[#C5A880]/70 border border-[#C5A880]/20 px-2 py-0.5 rounded-sm">
                    AUTH
                  </span>
                )}
              </button>

              {isOpen && (
                <div className="border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05]">
                  <div className="bg-[#080808] p-5">
                    <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">
                      Request
                    </div>

                    <pre className="text-xs font-mono text-white/50 whitespace-pre-wrap overflow-x-auto">
                      {ep.request ?? "No request body"}
                    </pre>
                  </div>

                  <div className="bg-[#080808] p-5">
                    <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">
                      Response
                    </div>

                    <pre className="text-xs font-mono text-white/50 whitespace-pre-wrap overflow-x-auto">
                      {ep.response}
                    </pre>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Validation */}
      <div className="mb-6">
        <h3 className="text-xs font-mono text-white/35 uppercase tracking-widest mb-3">
          Zod Validation Strategy
        </h3>

        <Prose>
          All incoming requests are validated using Zod schemas before
          reaching business logic. Invalid payloads are rejected early,
          ensuring type safety and preventing malformed input from reaching
          the persistence layer.
        </Prose>
      </div>

      {/* Error format */}
      <div className="border border-white/[0.09] rounded-sm bg-white/[0.02] p-5">
        <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">
          Error Response Shape
        </div>

        <pre className="text-xs font-mono text-white/45 whitespace-pre-wrap overflow-x-auto">
{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request payload"
  }
}`}
        </pre>
      </div>
    </Section>
  );
}