"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { architectureData } from "@/lib/data/securevault";
import { Section, Prose } from "./Section";

const LAYER_H = 52;
const LAYER_GAP = 8;
const LAYER_W = 520;
const LAYER_X = (640 - LAYER_W) / 2;

export function ArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const totalLayers = architectureData.layers.length;

  return (
    <Section id="architecture" eyebrow="System Design" heading="Architecture Overview">
      <Prose className="mb-8">{architectureData.description}</Prose>

      <div ref={ref} className="border border-white/[0.07] rounded-sm bg-white/[0.015] overflow-hidden mb-6">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.07]">
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="text-[10px] font-mono text-white/25 ml-2">securevault — architecture</span>
        </div>

        <div className="p-4 sm:p-8">
          <svg
            viewBox={`0 0 640 ${totalLayers * (LAYER_H + LAYER_GAP) + 40}`}
            width="100%"
            height="auto"
            aria-label="SecureVault architecture layer diagram"
            role="img"
          >
            {/* Animated data-flow dot traveling down */}
            {inView && (
              <motion.circle
                r="3"
                fill="#C5A880"
                opacity={0.75}
                cx={LAYER_X + LAYER_W / 2}
                animate={{
                  cy: [
                    20,
                    ...architectureData.layers.map((_, i) => 20 + i * (LAYER_H + LAYER_GAP) + LAYER_H / 2),
                    20 + totalLayers * (LAYER_H + LAYER_GAP),
                  ],
                  opacity: [0, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Connector lines between layers */}
            {architectureData.layers.slice(0, -1).map((_, i) => {
              const y = 20 + i * (LAYER_H + LAYER_GAP) + LAYER_H;
              return (
                <motion.line
                  key={i}
                  x1={LAYER_X + LAYER_W / 2}
                  y1={y}
                  x2={LAYER_X + LAYER_W / 2}
                  y2={y + LAYER_GAP}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.1 * i + 0.3 }}
                />
              );
            })}

            {/* Layer rectangles */}
            {architectureData.layers.map((layer, i) => {
              const y = 20 + i * (LAYER_H + LAYER_GAP);
              const isAccent = layer.id === "auth" || layer.id === "encryption";

              return (
                <motion.g
                  key={layer.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 * i + 0.2 }}
                >
                  <rect
                    x={LAYER_X}
                    y={y}
                    width={LAYER_W}
                    height={LAYER_H}
                    rx="4"
                    fill={layer.color}
                    stroke={layer.border}
                    strokeWidth="0.75"
                  />
                  {/* Layer label */}
                  <text
                    x={LAYER_X + 20}
                    y={y + LAYER_H / 2 - 7}
                    fill={isAccent ? "rgba(197,168,128,0.95)" : "rgba(255,255,255,0.75)"}
                    fontSize="12"
                    fontWeight="500"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                  >
                    {layer.label}
                  </text>
                  {/* Sublabel */}
                  <text
                    x={LAYER_X + 20}
                    y={y + LAYER_H / 2 + 9}
                    fill="rgba(255,255,255,0.28)"
                    fontSize="9.5"
                    fontFamily="ui-monospace, monospace"
                  >
                    {layer.sublabel}
                  </text>
                  {/* Right accent for security layers */}
                  {isAccent && (
                    <rect
                      x={LAYER_X + LAYER_W - 4}
                      y={y + 8}
                      width="3"
                      height={LAYER_H - 16}
                      rx="1.5"
                      fill="#C5A880"
                      opacity={0.5}
                    />
                  )}
                </motion.g>
              );
            })}

            {/* Docker container bracket */}
            {inView && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <rect
                  x={LAYER_X - 28}
                  y={20 + 1 * (LAYER_H + LAYER_GAP) - 6}
                  width="16"
                  height={5 * (LAYER_H + LAYER_GAP) + LAYER_H + 12}
                  rx="3"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.75"
                />
                <text
                  x={LAYER_X - 20}
                  y={20 + 3.5 * (LAYER_H + LAYER_GAP) + LAYER_H / 2}
                  fill="rgba(255,255,255,0.18)"
                  fontSize="8"
                  fontFamily="ui-monospace, monospace"
                  textAnchor="middle"
                  transform={`rotate(-90, ${LAYER_X - 20}, ${20 + 3.5 * (LAYER_H + LAYER_GAP) + LAYER_H / 2})`}
                >
                  Docker Container
                </text>
              </motion.g>
            )}
          </svg>
        </div>
      </div>
    </Section>
  );
}