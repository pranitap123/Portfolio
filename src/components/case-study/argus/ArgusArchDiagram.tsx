"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { architectureLayers } from "@/lib/data/argus-prism";

// Two-row layout: top row = data flow left→right, bottom row = annotations
// Nodes: producers → kafka → processor → [neo4j / postgres] → api → frontend

const NODE_ORDER = ["producers", "kafka", "processor", "neo4j", "postgres", "api", "frontend"];
const FLOW_CONNECTIONS = [
  { from: 0, to: 1, label: "publish" },
  { from: 1, to: 2, label: "consume" },
  { from: 2, to: 3, label: "MERGE" },
  { from: 2, to: 4, label: "INSERT" },
  { from: 3, to: 5, label: "Cypher" },
  { from: 4, to: 5, label: "SQL" },
  { from: 5, to: 6, label: "REST" },
];

export function ArgusArchDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const ordered = NODE_ORDER.map((id) => architectureLayers.find((l) => l.id === id)!);

  return (
    <div ref={ref} className="space-y-8">
      {/* SVG flow diagram */}
      <div className="border border-white/[0.07] rounded-sm bg-white/[0.015] p-6 overflow-x-auto">
        <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase mb-5">
          Event-Driven Data Flow
        </div>

        <svg
          viewBox="0 0 900 160"
          width="100%"
          height="auto"
          aria-label="ARGUS-PRISM architecture diagram showing event flow from producers through Kafka to databases and API"
          role="img"
        >
          {/* Draw connection lines first (behind nodes) */}
          {FLOW_CONNECTIONS.map((conn, ci) => {
            // Simple horizontal layout: each node at x = i * 128 + 40
            const fromX = conn.from * 124 + 80;
            const toX   = conn.to   * 124 + 40;
            const y     = conn.from === 2 && (conn.to === 3 || conn.to === 4)
              ? conn.to === 3 ? 55 : 105
              : 80;
            const fromY = conn.from === 2 && (conn.to === 3 || conn.to === 4) ? 80 : 80;

            // Branch lines from processor to neo4j (up) and postgres (down)
            if (conn.from === 2 && conn.to === 3) {
              return (
                <g key={ci}>
                  <motion.path
                    d={`M ${fromX} 80 L ${fromX + 30} 80 L ${fromX + 30} 55 L ${toX + 40} 55`}
                    fill="none"
                    stroke="rgba(197,168,128,0.25)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + 0.08 * ci }}
                  />
                  <motion.text
                    x={fromX + 55} y={47}
                    textAnchor="middle"
                    fill="rgba(197,168,128,0.4)"
                    fontSize="8"
                    fontFamily="monospace"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 }}
                  >
                    {conn.label}
                  </motion.text>
                </g>
              );
            }
            if (conn.from === 2 && conn.to === 4) {
              return (
                <g key={ci}>
                  <motion.path
                    d={`M ${fromX} 80 L ${fromX + 30} 80 L ${fromX + 30} 105 L ${toX + 40} 105`}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + 0.08 * ci }}
                  />
                  <motion.text
                    x={fromX + 55} y={117}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.2)"
                    fontSize="8"
                    fontFamily="monospace"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 }}
                  >
                    {conn.label}
                  </motion.text>
                </g>
              );
            }
            // Neo4j/postgres merge lines to api
            if ((conn.from === 3 || conn.from === 4) && conn.to === 5) {
              const lineY = conn.from === 3 ? 55 : 105;
              const endX = conn.to * 124 + 40;
              return (
                <g key={ci}>
                  <motion.path
                    d={`M ${conn.from * 124 + 80} ${lineY} L ${endX - 10} ${lineY} L ${endX - 10} 80`}
                    fill="none"
                    stroke={conn.from === 3 ? "rgba(197,168,128,0.2)" : "rgba(255,255,255,0.1)"}
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.4 + 0.08 * ci }}
                  />
                </g>
              );
            }

            // Standard horizontal connections
            return (
              <g key={ci}>
                <motion.line
                  x1={fromX} y1={80} x2={toX + 40} y2={80}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 + 0.08 * ci }}
                />
                <motion.text
                  x={(fromX + toX + 40) / 2} y={74}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.18)"
                  fontSize="8"
                  fontFamily="monospace"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 + 0.05 * ci }}
                >
                  {conn.label}
                </motion.text>
              </g>
            );
          })}

          {/* Animated flow packet (Kafka) */}
          <motion.circle
            r="3"
            fill="#C5A880"
            opacity={0.8}
            animate={{ x: [40, 164], y: [80, 80] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
          />

          {/* Nodes */}
          {ordered.map((layer, i) => {
            const x = i * 124 + 40;
            // Neo4j floats up, postgres floats down
            const y = layer.id === "neo4j" ? 40 : layer.id === "postgres" ? 90 : 65;
            const isGold = layer.color === "gold";
            const w = 80;
            const h = 30;

            return (
              <motion.g
                key={layer.id}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.06 * i + 0.1 }}
              >
                <rect
                  x={x} y={y} width={w} height={h} rx="3"
                  fill={isGold ? "rgba(197,168,128,0.08)" : "rgba(255,255,255,0.04)"}
                  stroke={isGold ? "rgba(197,168,128,0.35)" : "rgba(255,255,255,0.12)"}
                  strokeWidth="0.75"
                />
                <text
                  x={x + w / 2} y={y + 11}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isGold ? "rgba(197,168,128,0.9)" : "rgba(255,255,255,0.7)"}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {layer.label}
                </text>
                <text
                  x={x + w / 2} y={y + 21}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="rgba(255,255,255,0.22)"
                  fontSize="7.5"
                  fontFamily="monospace"
                >
                  {layer.tech}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Layer annotation grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {architectureLayers.map((layer, i) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.06 * i + 0.2 }}
            className="border border-white/[0.07] rounded-sm p-4 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${
                  layer.color === "gold" ? "text-[#C5A880]/80" : "text-white/50"
                }`}
              >
                {layer.label}
              </span>
            </div>
            <div className="text-[10px] font-mono text-white/25 mb-2">{layer.tech}</div>
            <p className="text-xs text-white/40 leading-relaxed">{layer.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}