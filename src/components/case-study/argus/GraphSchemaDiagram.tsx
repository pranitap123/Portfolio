"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { databaseDesign } from "@/lib/data/argus-prism";

// Node positions for the graph visualization (viewBox 0 0 600 280)
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  ThreatActor:  { x: 300, y: 80 },
  IPAddress:    { x: 160, y: 180 },
  Domain:       { x: 300, y: 210 },
  Technique:    { x: 440, y: 180 },
  Organization: { x: 300, y: 50 },  // shown at top, targets upward
};

// Reposition to avoid overlap
const POSITIONS: Record<string, { x: number; y: number }> = {
  ThreatActor:  { x: 290, y: 120 },
  IPAddress:    { x: 130, y: 210 },
  Domain:       { x: 290, y: 220 },
  Technique:    { x: 450, y: 210 },
  Organization: { x: 290, y: 30  },
};

const REL_COLORS: Record<string, string> = {
  USES:           "rgba(197,168,128,0.4)",
  CONTROLS:       "rgba(197,168,128,0.3)",
  TARGETS:        "rgba(160,130,195,0.4)",
  RESOLVES_TO:    "rgba(255,255,255,0.2)",
  ASSOCIATED_WITH:"rgba(255,255,255,0.15)",
};

export function GraphSchemaDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const nodes = databaseDesign.neo4jSchema.nodes;
  const rels  = databaseDesign.neo4jSchema.relationships;

  return (
    <div ref={ref} className="space-y-10">
      <p className="text-sm text-white/55 leading-[1.85]">{databaseDesign.description}</p>

      {/* Two column: graph visual + PostgreSQL tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Neo4j graph visual */}
        <div className="border border-white/[0.07] rounded-sm bg-white/[0.015] p-5">
          <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-4">
            Neo4j — Threat Graph Schema
          </div>
          <svg
            viewBox="0 0 600 270"
            width="100%"
            height="auto"
            aria-label="Neo4j graph schema showing ThreatActor, IPAddress, Domain, Technique, and Organization nodes with their relationships"
            role="img"
          >
            {/* Relationship edges */}
            {rels.map((rel, i) => {
              const from = POSITIONS[rel.from];
              const to   = POSITIONS[rel.to];
              if (!from || !to) return null;
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;

              return (
                <g key={rel.type}>
                  <motion.line
                    x1={from.x} y1={from.y}
                    x2={to.x}   y2={to.y}
                    stroke={REL_COLORS[rel.type] || "rgba(255,255,255,0.15)"}
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.1 * i + 0.3 }}
                  />
                  <motion.text
                    x={midX} y={midY - 4}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.2)"
                    fontSize="7"
                    fontFamily="monospace"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.1 * i + 0.6 }}
                  >
                    {rel.type}
                  </motion.text>
                </g>
              );
            })}

            {/* Node circles */}
            {nodes.map((node, i) => {
              const pos = POSITIONS[node.label];
              if (!pos) return null;
              const isGold = node.color === "#C5A880";

              return (
                <motion.g
                  key={node.label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 * i + 0.1, type: "spring", stiffness: 200 }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                >
                  <circle
                    cx={pos.x} cy={pos.y} r="28"
                    fill={isGold ? "rgba(197,168,128,0.1)" : node.color === "#60a5fa" ? "rgba(96,165,250,0.08)" : node.color === "#a78bfa" ? "rgba(167,139,250,0.08)" : "rgba(255,255,255,0.05)"}
                    stroke={isGold ? "rgba(197,168,128,0.4)" : node.color === "#60a5fa" ? "rgba(96,165,250,0.3)" : node.color === "#a78bfa" ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.14)"}
                    strokeWidth="1"
                  />
                  <text
                    x={pos.x} y={pos.y - 3}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={node.color === "#C5A880" ? "rgba(197,168,128,0.9)" : node.color === "#60a5fa" ? "rgba(147,197,253,0.85)" : node.color === "#a78bfa" ? "rgba(196,181,253,0.85)" : "rgba(255,255,255,0.7)"}
                    fontSize="8.5"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    {node.label.replace(/([A-Z])/g, " $1").trim().split(" ")[0]}
                  </text>
                  <text
                    x={pos.x} y={pos.y + 8}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={node.color === "#C5A880" ? "rgba(197,168,128,0.7)" : "rgba(255,255,255,0.4)"}
                    fontSize="7.5"
                    fontFamily="monospace"
                  >
                    {node.label.replace(/([A-Z])/g, " $1").trim().split(" ").slice(1).join("")}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Node property list */}
        <div className="space-y-3">
          {nodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, x: 8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.07 * i + 0.2 }}
              className="border border-white/[0.07] rounded-sm overflow-hidden"
            >
              <div
                className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]"
                style={{ backgroundColor: "rgba(255,255,255,0.025)" }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: node.color }}
                  aria-hidden="true"
                />
                <span className="text-xs font-mono font-semibold text-white/70">:{node.label}</span>
              </div>
              <div className="px-4 py-2.5 flex flex-wrap gap-1.5">
                {node.properties.map((prop) => (
                  <span key={prop} className="text-[10px] font-mono text-white/30 border border-white/[0.07] px-1.5 py-0.5 rounded-sm">
                    {prop}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Relationships */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          Relationship Types
        </div>
        <div className="overflow-x-auto rounded-sm border border-white/[0.07]">
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                {["Type", "From", "To", "Properties"].map((h) => (
                  <th key={h} scope="col" className="text-left py-2.5 px-4 text-[10px] font-mono font-semibold text-white/28 tracking-widest uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rels.map((rel, i) => (
                <motion.tr
                  key={rel.type}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.06 * i + 0.4 }}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-mono font-semibold text-[#C5A880]/80">{rel.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-mono text-white/50">{rel.from}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-mono text-white/50">{rel.to}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {rel.properties.map((p) => (
                        <span key={p} className="text-[10px] font-mono text-white/28 border border-white/[0.06] px-1.5 py-0.5 rounded-sm">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PostgreSQL tables */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          PostgreSQL — Event Store Schema
        </div>
        <div className="space-y-4">
          {databaseDesign.postgresSchema.tables.map((table, ti) => (
            <motion.div
              key={table.name}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * ti + 0.3 }}
              className="border border-white/[0.07] rounded-sm overflow-hidden"
            >
              <div className="px-4 py-3 bg-white/[0.03] border-b border-white/[0.06] flex items-center gap-2">
                <TableIcon className="w-3.5 h-3.5 text-[#C5A880]/50" />
                <span className="text-sm font-mono font-semibold text-white/70">{table.name}</span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {table.columns.map((col) => (
                  <div key={col.col} className="px-4 py-2.5 flex items-start gap-3 hover:bg-white/[0.015] transition-colors">
                    <span className="text-[11px] font-mono text-white/65 min-w-[120px] shrink-0">{col.col}</span>
                    <span className="text-[11px] font-mono text-[#C5A880]/55 min-w-[90px] shrink-0">{col.type}</span>
                    <span className="text-[10px] text-white/25 leading-relaxed">{col.note}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Indexing notes */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">Indexing Strategy</div>
        <div className="divide-y divide-white/[0.05]">
          {databaseDesign.indexingNotes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.06 * i + 0.4 }}
              className="py-3 flex items-start gap-3"
            >
              <span className="w-1 h-1 rounded-full bg-[#C5A880]/40 mt-1.5 shrink-0" aria-hidden="true" />
              <span className="text-xs text-white/40 leading-relaxed font-mono">{note}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TableIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 10h18M3 6h18M3 14h18M3 18h18M8 6v12M16 6v12" strokeLinecap="round" />
    </svg>
  );
}