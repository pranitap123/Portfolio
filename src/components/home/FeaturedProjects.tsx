"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { projectsData } from "@/lib/data/homepage";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="projects-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <SectionLabel className="mb-4 block">{projectsData.label}</SectionLabel>
            <h2
              id="projects-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
            >
              {projectsData.heading}
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
          >
            All projects
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {projectsData.items.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.08 * i,
              }}
              className="bg-[#0a0a0a] p-7 flex flex-col group hover:bg-white/[0.03] transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#C5A880]/70 tracking-wider uppercase mb-1.5 block">
                    {project.status}
                  </span>
                  <h3 className="text-base font-semibold text-white">{project.name}</h3>
                  <p className="text-xs text-white/35 mt-0.5">{project.subtitle}</p>
                </div>
                {project.live && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400/80 border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 rounded-sm shrink-0 ml-2">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 block" aria-hidden="true" />
                    Live
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-white/45 leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono text-white/30 border border-white/[0.08] px-2 py-0.5 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-5 border-t border-white/[0.07]">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  Source
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/40 hover:text-[#C5A880] transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                  >
                    <ExternalIcon className="w-3.5 h-3.5" />
                    {project.live.replace("https://", "")}
                  </a>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="ml-auto text-xs text-white/30 hover:text-white/60 transition-colors inline-flex items-center gap-1 group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                >
                  Details
                  <svg
                    className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
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