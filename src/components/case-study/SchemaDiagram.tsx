"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { schemaDesign } from "@/lib/data/securevault";

export function SchemaDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-10">
      <p className="text-sm text-white/55 leading-[1.85]">{schemaDesign.description}</p>

      {/* Tables grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {schemaDesign.tables.map((table, ti) => (
          <motion.div
            key={table.name}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 * ti, ease: [0.22, 1, 0.36, 1] }}
            className="border border-white/[0.08] rounded-sm overflow-hidden"
          >
            {/* Table header */}
            <div className="px-4 py-3 bg-white/[0.04] border-b border-white/[0.07] flex items-center gap-2">
              <TableIcon className="w-3.5 h-3.5 text-[#C5A880]/60" />
              <span className="text-sm font-mono font-semibold text-white">{table.name}</span>
            </div>

            {/* Columns */}
            <div className="divide-y divide-white/[0.04]">
              {table.columns.map((col) => (
                <div key={col.col} className="px-4 py-2.5 flex items-start gap-3 hover:bg-white/[0.02] transition-colors">
                  <span className="text-[11px] font-mono text-white/70 min-w-[110px] shrink-0">{col.col}</span>
                  <span className="text-[11px] font-mono text-[#C5A880]/60 min-w-[80px] shrink-0">{col.type}</span>
                  <span className="text-[10px] text-white/25 leading-relaxed">{col.note}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Relationship SVG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="border border-white/[0.07] rounded-sm bg-white/[0.02] p-4"
      >
        <div className="text-[10px] font-mono text-white/25 tracking-widest uppercase mb-4">
          Entity Relationships
        </div>
        <svg viewBox="0 0 600 80" width="100%" height="auto" aria-hidden="true">
          {/* Nodes */}
          {[
            { label: "users", x: 40 },
            { label: "namespaces", x: 190 },
            { label: "secrets", x: 370 },
            { label: "permissions", x: 510 },
          ].map((n) => (
            <g key={n.label}>
              <rect x={n.x} y={25} width={90} height={30} rx="3"
                fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />
              <text x={n.x + 45} y={40} textAnchor="middle" dominantBaseline="central"
                fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="monospace">{n.label}</text>
            </g>
          ))}

          {/* Arrows */}
          {/* users → namespaces */}
          <line x1={130} y1={40} x2={190} y2={40} stroke="rgba(197,168,128,0.3)" strokeWidth="1" markerEnd="url(#arrow-rel)" />
          {/* namespaces → secrets */}
          <line x1={280} y1={40} x2={370} y2={40} stroke="rgba(197,168,128,0.3)" strokeWidth="1" markerEnd="url(#arrow-rel)" />
          {/* users → permissions */}
          <path d="M85 25 Q290 5 510 25" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />

          <defs>
            <marker id="arrow-rel" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M2 2L8 5L2 8" fill="none" stroke="rgba(197,168,128,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>

          {/* Labels */}
          <text x={158} y={34} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace">owns</text>
          <text x={323} y={34} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace">contains</text>
        </svg>
      </motion.div>

      {/* Index / design notes */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">Design Notes</div>
        <div className="space-y-0 divide-y divide-white/[0.05]">
          {schemaDesign.notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.07 * i + 0.4 }}
              className="py-3 flex items-start gap-3"
            >
              <span className="w-1 h-1 rounded-full bg-[#C5A880]/40 mt-1.5 shrink-0" aria-hidden="true" />
              <span className="text-xs text-white/45 leading-relaxed font-mono">{note}</span>
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