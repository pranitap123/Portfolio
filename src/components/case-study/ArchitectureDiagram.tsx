"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { architectureLayers } from "@/lib/data/securevault";

const TYPE_COLORS: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  client:     { border: "rgba(255,255,255,0.14)", bg: "rgba(255,255,255,0.05)", text: "rgba(255,255,255,0.75)", dot: "#ffffff" },
  api:        { border: "rgba(255,255,255,0.1)",  bg: "rgba(255,255,255,0.03)", text: "rgba(255,255,255,0.65)", dot: "rgba(255,255,255,0.4)" },
  auth:       { border: "rgba(197,168,128,0.3)",  bg: "rgba(197,168,128,0.06)", text: "rgba(197,168,128,0.9)", dot: "#C5A880" },
  logic:      { border: "rgba(255,255,255,0.1)",  bg: "rgba(255,255,255,0.03)", text: "rgba(255,255,255,0.65)", dot: "rgba(255,255,255,0.4)" },
  encryption: { border: "rgba(197,168,128,0.4)",  bg: "rgba(197,168,128,0.09)", text: "rgba(197,168,128,1)",   dot: "#C5A880" },
  orm:        { border: "rgba(255,255,255,0.1)",  bg: "rgba(255,255,255,0.03)", text: "rgba(255,255,255,0.55)", dot: "rgba(255,255,255,0.3)" },
  db:         { border: "rgba(255,255,255,0.14)", bg: "rgba(255,255,255,0.05)", text: "rgba(255,255,255,0.75)", dot: "#ffffff" },
};

export function ArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Diagram column */}
      <div className="flex flex-col items-center w-full lg:w-80 shrink-0">
        {architectureLayers.map((layer, i) => {
          const colors = TYPE_COLORS[layer.type];
          const isLast = i === architectureLayers.length - 1;

          return (
            <div key={layer.label} className="flex flex-col items-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                className="w-full border rounded-sm px-4 py-3.5 flex items-center justify-between"
                style={{ borderColor: colors.border, backgroundColor: colors.bg }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: colors.dot }}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: colors.text }}>
                      {layer.label}
                    </div>
                    <div className="text-[10px] font-mono text-white/25 mt-0.5">{layer.tech}</div>
                  </div>
                </div>
              </motion.div>

              {/* Connector */}
              {!isLast && (
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.06 * i + 0.3 }}
                  className="flex flex-col items-center origin-top"
                >
                  <div className="w-px h-4 bg-white/10" />
                  <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Docker container label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-4 w-full border border-dashed border-white/10 rounded-sm px-4 py-2 text-center"
        >
          <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
            Docker Container
          </span>
        </motion.div>
      </div>

      {/* Annotation column */}
      <div className="flex-1 space-y-0 divide-y divide-white/[0.05]">
        {architectureLayers.map((layer, i) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.07 * i + 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="py-3.5 first:pt-0"
          >
            <div className="text-[11px] font-mono font-semibold text-[#C5A880]/70 mb-1">
              {layer.label}
            </div>
            <div className="text-xs text-white/40 leading-relaxed">
              {layer.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}