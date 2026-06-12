"use client";

import { motion } from "framer-motion";

// ─── SecureVault: Auth + Encryption Flow ────────────────────────────────────

export function SecureVaultDiagram() {
  const nodes = [
    { id: "client", label: "Client", x: 60, y: 110, w: 80, h: 32 },
    { id: "jwt", label: "JWT Middleware", x: 200, y: 60, w: 110, h: 32 },
    { id: "rbac", label: "RBAC Guard", x: 200, y: 160, w: 110, h: 32 },
    { id: "enc", label: "AES-256-GCM", x: 380, y: 110, w: 110, h: 32 },
    { id: "prisma", label: "Prisma ORM", x: 550, y: 110, w: 90, h: 32 },
    { id: "pg", label: "PostgreSQL", x: 700, y: 110, w: 90, h: 32 },
  ];

  const edges = [
    { x1: 140, y1: 126, x2: 200, y2: 76 },
    { x1: 140, y1: 126, x2: 200, y2: 176 },
    { x1: 310, y1: 76, x2: 380, y2: 120 },
    { x1: 310, y1: 176, x2: 380, y2: 132 },
    { x1: 490, y1: 126, x2: 550, y2: 126 },
    { x1: 640, y1: 126, x2: 700, y2: 126 },
  ];

  const labels = [
    { x: 168, y: 88, text: "Verify" },
    { x: 168, y: 168, text: "Authorize" },
    { x: 516, y: 118, text: "Encrypted" },
  ];

  return (
    <DiagramShell title="Authentication & Encryption Flow" width={820} height={220}>
      {edges.map((e, i) => (
        <motion.line
          key={i}
          x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="rgba(197,168,128,0.25)"
          strokeWidth="1"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={n.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.3 }}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
          <text x={n.x + n.w / 2} y={n.y + n.h / 2} textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="monospace">{n.label}</text>
        </motion.g>
      ))}
      {labels.map((l, i) => (
        <motion.text key={i} x={l.x} y={l.y} textAnchor="middle" fill="rgba(197,168,128,0.55)" fontSize="8" fontFamily="monospace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + 0.1 * i }}>{l.text}</motion.text>
      ))}
    </DiagramShell>
  );
}

// ─── ARGUS-PRISM: Kafka Event Pipeline ─────────────────────────────────────

export function ArgusDiagram() {
  const nodes = [
    { id: "prod", label: "Event Producers", x: 30, y: 95, w: 110, h: 32 },
    { id: "kafka", label: "Kafka Broker", x: 210, y: 95, w: 100, h: 32, accent: true },
    { id: "proc", label: "Stream Processor", x: 380, y: 55, w: 120, h: 32 },
    { id: "neo", label: "Neo4j Graph", x: 380, y: 135, w: 100, h: 32 },
    { id: "api", label: "FastAPI", x: 570, y: 95, w: 80, h: 32 },
    { id: "ui", label: "React Dashboard", x: 720, y: 95, w: 110, h: 32 },
  ];

  const edges = [
    { x1: 140, y1: 111, x2: 210, y2: 111 },
    { x1: 310, y1: 105, x2: 380, y2: 71 },
    { x1: 310, y1: 117, x2: 380, y2: 151 },
    { x1: 480, y1: 71, x2: 570, y2: 105 },
    { x1: 480, y1: 151, x2: 570, y2: 117 },
    { x1: 650, y1: 111, x2: 720, y2: 111 },
  ];

  return (
    <DiagramShell title="Event-Driven Threat Pipeline" width={860} height={220}>
      {/* Animated packet along Kafka line */}
      <motion.circle r="3" fill="#C5A880" opacity={0.7}
        animate={{ x: [140, 310], y: [111, 111] }}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
      />
      {edges.map((e, i) => (
        <motion.line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="rgba(197,168,128,0.2)" strokeWidth="1" strokeDasharray="4 3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * i + 0.2 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={n.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i + 0.3 }}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="3"
            fill={n.accent ? "rgba(197,168,128,0.08)" : "rgba(255,255,255,0.04)"}
            stroke={n.accent ? "rgba(197,168,128,0.35)" : "rgba(255,255,255,0.12)"}
            strokeWidth="0.75"
          />
          <text x={n.x + n.w / 2} y={n.y + n.h / 2} textAnchor="middle" dominantBaseline="central" fill={n.accent ? "rgba(197,168,128,0.9)" : "rgba(255,255,255,0.7)"} fontSize="10" fontFamily="monospace">{n.label}</text>
        </motion.g>
      ))}
      {/* Topic label */}
      <motion.text x={260} y={84} textAnchor="middle" fill="rgba(197,168,128,0.4)" fontSize="8" fontFamily="monospace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>topics</motion.text>
    </DiagramShell>
  );
}

// ─── Jurisynth: Document Processing Pipeline ───────────────────────────────

export function JurisynthDiagram() {
  const nodes = [
    { id: "upload", label: "Document Upload", x: 30, y: 95, w: 110, h: 32 },
    { id: "api", label: "Express API", x: 210, y: 95, w: 90, h: 32 },
    { id: "ai", label: "AI Pipeline", x: 380, y: 55, w: 90, h: 32, accent: true },
    { id: "mongo", label: "MongoDB", x: 380, y: 135, w: 90, h: 32 },
    { id: "result", label: "Analysis Result", x: 550, y: 95, w: 110, h: 32 },
    { id: "react", label: "React SPA", x: 730, y: 95, w: 90, h: 32 },
  ];

  const edges = [
    { x1: 140, y1: 111, x2: 210, y2: 111 },
    { x1: 300, y1: 101, x2: 380, y2: 71 },
    { x1: 300, y1: 121, x2: 380, y2: 151 },
    { x1: 470, y1: 71, x2: 550, y2: 105 },
    { x1: 470, y1: 151, x2: 550, y2: 117 },
    { x1: 660, y1: 111, x2: 730, y2: 111 },
  ];

  return (
    <DiagramShell title="Document Analysis Pipeline" width={860} height={220}>
      {/* Pulsing AI node glow */}
      <motion.rect x={378} y={53} width={94} height={36} rx="4"
        fill="rgba(197,168,128,0.06)"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {edges.map((e, i) => (
        <motion.line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="rgba(197,168,128,0.2)" strokeWidth="1" strokeDasharray="4 3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * i + 0.2 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={n.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i + 0.3 }}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="3"
            fill={n.accent ? "rgba(197,168,128,0.08)" : "rgba(255,255,255,0.04)"}
            stroke={n.accent ? "rgba(197,168,128,0.35)" : "rgba(255,255,255,0.12)"}
            strokeWidth="0.75"
          />
          <text x={n.x + n.w / 2} y={n.y + n.h / 2} textAnchor="middle" dominantBaseline="central" fill={n.accent ? "rgba(197,168,128,0.9)" : "rgba(255,255,255,0.7)"} fontSize="10" fontFamily="monospace">{n.label}</text>
        </motion.g>
      ))}
      <motion.text x={425} y={46} textAnchor="middle" fill="rgba(197,168,128,0.4)" fontSize="8" fontFamily="monospace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>LLM</motion.text>
    </DiagramShell>
  );
}

// ─── Shared shell ───────────────────────────────────────────────────────────

function DiagramShell({
  children,
  title,
  width,
  height,
}: {
  children: React.ReactNode;
  title: string;
  width: number;
  height: number;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-1 rounded-full bg-[#C5A880]/50" aria-hidden="true" />
        <span className="text-[10px] font-mono text-white/30 tracking-wider uppercase">{title}</span>
      </div>
      <div className="border border-white/[0.07] rounded-sm bg-white/[0.02] overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height="auto"
          aria-hidden="true"
          role="img"
        >
          {children}
        </svg>
      </div>
    </div>
  );
}