"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import { SecureVaultDiagram, ArgusDiagram, JurisynthDiagram } from "./ArchDiagram";

const DIAGRAM_MAP = {
  securevault: SecureVaultDiagram,
  argus: ArgusDiagram,
  jurisynth: JurisynthDiagram,
} as const;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const DiagramComponent = DIAGRAM_MAP[project.diagramType];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-white/[0.06] group"
      aria-labelledby={`project-${project.slug}-heading`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">

        {/* Top bar: category + status + index */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/70 border border-[#C5A880]/20 bg-[#C5A880]/5 px-3 py-1 rounded-sm">
              {project.category}
            </span>
            {project.status === "Live" && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/80 border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse" aria-hidden="true" />
                Live
              </span>
            )}
            {project.status === "Open Source" && (
              <span className="text-[10px] font-mono text-white/30 border border-white/[0.08] px-2.5 py-1 rounded-sm">
                Open Source
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-white/15 tabular-nums">
            {String(index + 1).padStart(2, "0")} / 03
          </span>
        </div>

        {/* Main grid: left content, right diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">

          {/* Left: text content */}
          <div>
            <h2
              id={`project-${project.slug}-heading`}
              className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2 leading-tight"
            >
              {project.name}
            </h2>
            <p className="text-sm text-white/35 font-mono mb-6">{project.subtitle}</p>

            <p className="text-sm text-white/55 leading-[1.75] mb-8">
              {project.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2 mb-8">
              {project.highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-start gap-3 py-2.5 border-b border-white/[0.05] last:border-0"
                >
                  <span className="text-[11px] font-mono font-semibold text-[#C5A880]/80 min-w-[100px] mt-0.5 shrink-0">
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
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/20 px-5 py-2.5 rounded-sm hover:bg-white hover:text-black transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View Case Study
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/40 border border-white/[0.08] px-5 py-2.5 rounded-sm hover:border-white/20 hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#C5A880]/70 border border-[#C5A880]/20 px-5 py-2.5 rounded-sm hover:bg-[#C5A880]/10 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <ExternalIcon className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Right: architecture diagram */}
          <div className="flex flex-col gap-6">
            {/* Architecture summary */}
            <div className="p-5 border border-white/[0.07] rounded-sm bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-3">
                <DiagramIcon className="w-3.5 h-3.5 text-[#C5A880]/60" />
                <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">Architecture Summary</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed font-mono">
                {project.architecture.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.architecture.layers.map((layer, i) => (
                  <span key={layer} className="flex items-center gap-1.5 text-[10px] font-mono text-white/30">
                    <span className="text-[#C5A880]/40">{String(i + 1)}</span>
                    {layer}
                    {i < project.architecture.layers.length - 1 && (
                      <span className="text-white/15 mx-0.5">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Animated architecture diagram */}
            <DiagramComponent />

            {/* Metrics strip */}
            <div className="grid grid-cols-4 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-[#080808] px-3 py-3 text-center">
                  <div className="text-[11px] font-mono font-semibold text-white/60 mb-0.5">{m.value}</div>
                  <div className="text-[9px] font-mono text-white/25 uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────

function ArrowRight({ className }: { className?: string }) {
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

function DiagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v3a3 3 0 003 3h6a3 3 0 003-3V9M12 12v3" strokeLinecap="round" />
    </svg>
  );
}