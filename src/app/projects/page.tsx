"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { projects, pageStats, type Project } from "@/lib/data/projects-index";

// ─── Ease curve used throughout ───────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-[#080808]">
        <ProjectsHero />
        <ProjectsList />
        <PageFooter />
      </main>
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C5A880] focus:text-black focus:text-sm focus:font-medium focus:rounded-sm"
      >
        Skip to main content
      </a>
      <div className="max-w-5xl mx-auto h-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-white tracking-tight hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
        >
          Pranita Panchal
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {[
              { href: "/projects",    label: "Projects",     current: true  },
              { href: "/engineering", label: "Engineering",  current: false },
              { href: "/resume",      label: "Resume",       current: false },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={`text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm ${
                    item.current ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="text-sm font-medium text-black bg-white px-4 py-1.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ProjectsHero() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="pt-32 pb-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 top-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/70 border border-[#C5A880]/20 bg-[#C5A880]/5 px-3 py-1 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/60" aria-hidden="true" />
            Engineering Portfolio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="projects-heading"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.06] mb-6"
        >
          Engineering
          <br />
          <span className="text-white/35">Projects</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.14 }}
          className="text-base sm:text-lg text-white/45 max-w-2xl leading-relaxed mb-14"
        >
          Production-oriented systems built to demonstrate architecture thinking, security
          awareness, and engineering depth — not tutorial completions.
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-sm overflow-hidden"
          role="list"
          aria-label="Portfolio statistics"
        >
          {pageStats.map((s, i) => (
            <motion.div
              key={s.label}
              role="listitem"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 + 0.05 * i }}
              className="bg-[#080808] px-6 py-5"
            >
              <div className="text-2xl font-semibold font-mono text-white mb-1">{s.value}</div>
              <div className="text-xs text-white/35 tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Projects list ────────────────────────────────────────────────────────────

function ProjectsList() {
  return (
    <section aria-label="Featured engineering projects" className="py-8">
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} />
      ))}
    </section>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  // Subtle tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-1.5, 1.5]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: 0.08 * index }}
      className="border-b border-white/[0.06] last:border-0"
      aria-labelledby={`project-${project.slug}-name`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        transition={{ type: "spring", stiffness: 300, damping: 40 }}
        className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 py-14 md:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

          {/* ── Left: content ──────────────────────────────────────────── */}
          <div>
            {/* Top row: index + category + status */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-[10px] font-mono text-white/18 tabular-nums">
                {project.index}
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/65 border border-[#C5A880]/20 bg-[#C5A880]/5 px-2.5 py-0.5 rounded-sm">
                {project.category}
              </span>
              <StatusBadge status={project.status} />
            </div>

            {/* Title */}
            <h2
              id={`project-${project.slug}-name`}
              className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2 leading-tight"
            >
              {project.name}
            </h2>
            <p className="text-sm font-mono text-white/32 mb-6">{project.tagline}</p>

            {/* Description */}
            <p className="text-sm text-white/52 leading-[1.8] mb-8 max-w-xl">
              {project.description}
            </p>

            {/* Highlights */}
            <div className="space-y-0 mb-8 divide-y divide-white/[0.05]">
              {project.highlights.map((h) => (
                <div key={h.label} className="flex items-start gap-4 py-3">
                  <span className="text-[11px] font-mono font-semibold text-[#C5A880]/70 min-w-[120px] shrink-0 mt-0.5">
                    {h.label}
                  </span>
                  <span className="text-xs text-white/40 leading-relaxed">{h.detail}</span>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono text-white/35 border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={project.caseStudyHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/22 px-5 py-2.5 rounded-sm hover:bg-white hover:text-black transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  View Case Study
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </motion.div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/38 border border-white/[0.08] px-5 py-2.5 rounded-sm hover:border-white/20 hover:text-white/65 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#C5A880]/65 border border-[#C5A880]/20 px-5 py-2.5 rounded-sm hover:bg-[#C5A880]/10 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <ExternalIcon className="w-3.5 h-3.5" />
                  Live
                </a>
              )}
            </div>
          </div>

          {/* ── Right: visual panel ─────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Animated diagram */}
            <div className="border border-white/[0.07] rounded-sm bg-white/[0.015] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/50" aria-hidden="true" />
                <span className="text-[10px] font-mono text-white/28 uppercase tracking-wider">
                  Architecture Preview
                </span>
              </div>
              <div className="p-4">
                <ProjectDiagram type={project.diagramType} hovered={hovered} />
              </div>
            </div>

            {/* Metrics strip */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-[#080808] px-4 py-3.5">
                  <div className="text-xs font-mono font-semibold text-white/62 mb-0.5">
                    {m.value}
                  </div>
                  <div className="text-[9px] font-mono text-white/25 uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.article>
  );
}

// ─── Architecture diagrams ────────────────────────────────────────────────────
// One SVG per project type — draw-on-hover animation, unique topology

function ProjectDiagram({
  type,
  hovered,
}: {
  type: Project["diagramType"];
  hovered: boolean;
}) {
  if (type === "securevault") return <SecureVaultDiagram hovered={hovered} />;
  if (type === "argus")       return <ArgusDiagram hovered={hovered} />;
  return                             <JurisynthDiagram hovered={hovered} />;
}

// Shared node component
function Node({
  x, y, w = 88, h = 28, label, sub, accent = false,
}: {
  x: number; y: number; w?: number; h?: number;
  label: string; sub?: string; accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx="3"
        fill={accent ? "rgba(197,168,128,0.09)" : "rgba(255,255,255,0.04)"}
        stroke={accent ? "rgba(197,168,128,0.38)" : "rgba(255,255,255,0.11)"}
        strokeWidth="0.75"
      />
      <text
        x={x + w / 2} y={sub ? y + 10 : y + h / 2}
        textAnchor="middle" dominantBaseline="central"
        fill={accent ? "rgba(197,168,128,0.92)" : "rgba(255,255,255,0.68)"}
        fontSize="9" fontFamily="monospace" fontWeight="600"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2} y={y + 20}
          textAnchor="middle" dominantBaseline="central"
          fill="rgba(255,255,255,0.22)" fontSize="7.5" fontFamily="monospace"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

// Animated dashed edge
function Edge({
  x1, y1, x2, y2, hovered, delay = 0, gold = false,
}: {
  x1: number; y1: number; x2: number; y2: number;
  hovered: boolean; delay?: number; gold?: boolean;
}) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={gold ? "rgba(197,168,128,0.35)" : "rgba(255,255,255,0.12)"}
      strokeWidth="1"
      strokeDasharray="4 3"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: hovered ? 1 : 0.3 }}
      transition={{ duration: 0.3, delay }}
    />
  );
}

/** SecureVault: Client → JWT → RBAC → Encrypt → Prisma → PG */
function SecureVaultDiagram({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 340 170" width="100%" height="auto" aria-hidden="true">
      {/* Packet animation along main path */}
      <AnimatePresence>
        {hovered && (
          <motion.circle
            r="3" fill="#C5A880" opacity={0.85}
            initial={{ x: 30, y: 85 }}
            animate={{ x: [30, 90, 155, 220, 285], y: [85, 60, 85, 60, 85] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Edges */}
      <Edge x1={78}  y1={71}  x2={92}  y2={71}  hovered={hovered} delay={0}    />
      <Edge x1={78}  y1={99}  x2={92}  y2={99}  hovered={hovered} delay={0.05} />
      <Edge x1={180} y1={71}  x2={210} y2={80}  hovered={hovered} delay={0.1}  gold />
      <Edge x1={180} y1={99}  x2={210} y2={90}  hovered={hovered} delay={0.12} gold />
      <Edge x1={278} y1={85}  x2={292} y2={85}  hovered={hovered} delay={0.18} />

      {/* Nodes */}
      <Node x={0}   y={71}  w={78}  h={28} label="HTTP Client"  />
      <Node x={92}  y={57}  w={88}  h={28} label="JWT Middleware" sub="verify + decode" />
      <Node x={92}  y={85}  w={88}  h={28} label="RBAC Guard"   sub="role check" />
      <Node x={210} y={71}  w={88}  h={28} label="AES-256-GCM" sub="encrypt/decrypt" accent />
      <Node x={292} y={71}  w={48}  h={28} label="PG"           sub="store" />

      {/* Layer annotation */}
      <text x="170" y="148" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="monospace">
        3-tier layered architecture · encryption at persistence boundary
      </text>
    </svg>
  );
}

/** ARGUS: Producers → Kafka → Processor → Neo4j/PG → FastAPI → React */
function ArgusDiagram({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 340 170" width="100%" height="auto" aria-hidden="true">
      {/* Kafka packet animation */}
      <AnimatePresence>
        {hovered && (
          <motion.circle
            r="3" fill="#C5A880" opacity={0.85}
            animate={{ x: [0, 68, 140, 210, 280], y: [85, 85, 85, 65, 85] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Edges */}
      <Edge x1={62}  y1={85}  x2={76}  y2={85}  hovered={hovered} delay={0}    />
      <Edge x1={140} y1={75}  x2={154} y2={60}  hovered={hovered} delay={0.06} gold />
      <Edge x1={140} y1={95}  x2={154} y2={110} hovered={hovered} delay={0.08} />
      <Edge x1={222} y1={57}  x2={238} y2={85}  hovered={hovered} delay={0.14} gold />
      <Edge x1={222} y1={113} x2={238} y2={93}  hovered={hovered} delay={0.16} />
      <Edge x1={306} y1={85}  x2={320} y2={85}  hovered={hovered} delay={0.22} />

      {/* Nodes */}
      <Node x={0}   y={71}  w={62}  h={28} label="Events"       sub="producers"  />
      <Node x={76}  y={71}  w={64}  h={28} label="Kafka"        sub="broker"     accent />
      <Node x={154} y={43}  w={68}  h={28} label="Processor"    sub="consumer"   />
      <Node x={154} y={99}  w={68}  h={28} label="Neo4j"        sub="graph"      accent />
      <Node x={238} y={71}  w={68}  h={28} label="FastAPI"      sub="async"      />
      <Node x={320} y={71}  w={20}  h={28} label="↗"            />

      <text x="170" y="148" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="monospace">
        event-driven · decoupled ingestion & analysis · graph intelligence
      </text>
    </svg>
  );
}

/** JuriSynth: Query → Embed → Retrieve → Augment → LLM → Cite */
function JurisynthDiagram({ hovered }: { hovered: boolean }) {
  const stages = [
    { x: 0,   label: "Query",    sub: "legal"  },
    { x: 58,  label: "Embed",    sub: "vector", accent: true },
    { x: 116, label: "Retrieve", sub: "top-k",  accent: true },
    { x: 178, label: "Augment",  sub: "context" },
    { x: 240, label: "LLM",      sub: "generate", accent: true },
    { x: 296, label: "Cite",     sub: "attrs"  },
  ];

  return (
    <svg viewBox="0 0 340 170" width="100%" height="auto" aria-hidden="true">
      {/* Query token animation */}
      <AnimatePresence>
        {hovered && (
          <motion.circle
            r="3" fill="#C5A880" opacity={0.85}
            animate={{
              x: [15, 73, 131, 193, 255, 311],
              y: [85, 85, 85, 85, 85, 85],
            }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.5,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Edges between stages */}
      {stages.slice(0, -1).map((s, i) => (
        <Edge
          key={i}
          x1={s.x + 44} y1={85}
          x2={stages[i + 1].x + 4} y2={85}
          hovered={hovered}
          delay={0.06 * i}
          gold={stages[i + 1].accent}
        />
      ))}

      {/* Stage nodes */}
      {stages.map((s) => (
        <Node key={s.label} x={s.x} y={71} w={44} h={28} label={s.label} sub={s.sub} accent={s.accent} />
      ))}

      {/* Agent layer indicator */}
      <motion.rect
        x={178} y={108} width={106} height={16} rx="2"
        fill="rgba(197,168,128,0.05)"
        stroke="rgba(197,168,128,0.18)"
        strokeWidth="0.75"
        animate={{ opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      />
      <text x={231} y={117} textAnchor="middle" dominantBaseline="central"
        fill="rgba(197,168,128,0.5)" fontSize="7.5" fontFamily="monospace">
        multi-agent layer
      </text>

      <text x="170" y="148" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="monospace">
        RAG pipeline · citation-grounded generation · 93% faithfulness
      </text>
    </svg>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "Live") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/80 border border-emerald-400/20 bg-emerald-400/[0.05] px-2.5 py-0.5 rounded-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
        Live
      </span>
    );
  }
  if (status === "Open Source") {
    return (
      <span className="text-[10px] font-mono text-white/30 border border-white/[0.08] px-2.5 py-0.5 rounded-sm">
        Open Source
      </span>
    );
  }
  return (
    <span className="text-[10px] font-mono text-blue-400/60 border border-blue-400/15 px-2.5 py-0.5 rounded-sm">
      In Development
    </span>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function PageFooter() {
  return (
    <footer className="border-t border-white/[0.06] py-14 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm text-white/38 mb-1">
            All projects independently designed, built, and deployed.
          </p>
          <p className="text-xs text-white/18 font-mono">
            Architecture, implementation, and documentation by Pranita Panchal.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-white/32 border border-white/[0.07] px-5 py-2.5 rounded-sm hover:border-white/18 hover:text-white/55 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            ← Home
          </Link>
          <Link
            href="/engineering"
            className="text-sm text-white/32 border border-white/[0.07] px-5 py-2.5 rounded-sm hover:border-white/18 hover:text-white/55 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Engineering →
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}