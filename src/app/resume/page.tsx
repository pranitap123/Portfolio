"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

import {
  hero,
  professionalSummary,
  education,
  skillCategories,
  featuredProjects,
  certifications,
  experience,
  currentFocus,
} from "@/lib/data/resume";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const FADE_UP = {
  hidden: { opacity: 0, y: 14 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: d },
  }),
};

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/70 border border-[#C5A880]/20 bg-[#C5A880]/5 px-3 py-1 rounded-sm">
      {children}
    </span>
  );
}

function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={FADE_UP}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  label,
  heading,
  sub,
  id,
}: {
  label: string;
  heading: string;
  sub?: string;
  id: string;
}) {
  return (
    <RevealBlock className="mb-10">
      <SectionLabel>{label}</SectionLabel>
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-4"
      >
        {heading}
      </h2>
      {sub && (
        <p className="text-sm text-white/40 mt-3 max-w-xl leading-relaxed">{sub}</p>
      )}
    </RevealBlock>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-[#080808] text-white antialiased">
        <ResumeHero />
        <ProfessionalSummarySection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <CurrentFocusSection />
        <CTASection />
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
              { href: "/projects",    label: "Projects"    },
              { href: "/engineering", label: "Engineering" },
              { href: "/about",       label: "About"       },
              { href: "/contact",     label: "Contact"     },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ResumeHero() {
  return (
    <section
      aria-labelledby="resume-heading"
      className="relative pt-32 pb-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%,black 30%,transparent 100%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <motion.div variants={FADE_UP} initial="hidden" animate="visible" custom={0} className="mb-6">
              <SectionLabel>Resume</SectionLabel>
            </motion.div>

            <motion.h1
              id="resume-heading"
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.08}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.06] mb-3"
            >
              {hero.name}
            </motion.h1>

            <motion.p
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.14}
              className="text-lg text-[#C5A880] font-mono font-medium mb-2"
            >
              {hero.title}
            </motion.p>

            <motion.p
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.18}
              className="text-sm text-white/35 font-mono mb-6"
            >
              {hero.tagline}
            </motion.p>

            <motion.p
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.22}
              className="text-sm text-white/50 leading-relaxed max-w-xl mb-8"
            >
              {hero.summary}
            </motion.p>

            {/* Contact meta row */}
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.28}
              className="flex flex-wrap gap-x-5 gap-y-2 mb-8"
            >
              {[
                { icon: "location", text: hero.location,  href: null },
                { icon: "email",    text: hero.email,      href: `mailto:${hero.email}` },
                { icon: "github",   text: "pranitap123",   href: hero.github },
                { icon: "linkedin", text: "LinkedIn",      href: hero.linkedin },
              ].map((item) => (
                <span key={item.icon} className="flex items-center gap-1.5">
                  <MetaIcon name={item.icon} />
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-xs font-mono text-white/38 hover:text-white/65 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-white/38">{item.text}</span>
                  )}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.32}
              className="flex flex-wrap gap-3"
            >
              <a
                href={hero.resumePdfUrl}
                download
                className="inline-flex items-center gap-2 bg-[#C5A880] text-black text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-[#d4b990] active:bg-[#b89870] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <DownloadIcon className="w-4 h-4" />
                Download PDF
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-white/15 text-white/60 text-sm px-5 py-2.5 rounded-sm hover:border-white/28 hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View Projects
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Right: quick facts card */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="hidden lg:block"
          >
            <div className="border border-white/[0.08] rounded-sm overflow-hidden min-w-[200px]">
              <div className="px-5 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  At a glance
                </span>
              </div>
              {[
                { label: "Status",   value: "Available"   },
                { label: "Focus",    value: "Backend / AI"  },
                { label: "Mode",     value: "Remote-first" },
                { label: "Location", value: "Pune, India"  },
                { label: "Type",     value: "Full-time"    },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-5 py-3 border-b border-white/[0.05] last:border-0"
                >
                  <span className="text-[11px] font-mono text-white/28">{row.label}</span>
                  <span className="text-[11px] font-mono text-white/65">{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Professional Summary ─────────────────────────────────────────────────────

function ProfessionalSummarySection() {
  return (
    <section
      aria-labelledby="summary-heading"
      className="py-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          <RevealBlock>
            <SectionLabel>Summary</SectionLabel>
            <h2 id="summary-heading" className="sr-only">
              Professional Summary
            </h2>
          </RevealBlock>
          <div className="space-y-4">
            {professionalSummary.paragraphs.map((para, i) => (
              <RevealBlock key={i} delay={0.06 * i}>
                <p className="text-sm text-white/55 leading-[1.85]">{para}</p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="experience-heading"
      className="py-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Experience" heading="Work Experience" id="experience-heading" />

        <div className="relative">
          {/* Vertical rule */}
          <div aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.07]" />

          <div className="space-y-10">
            {experience.map((entry, i) => (
              <motion.div
                key={`${entry.company}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
                className="relative pl-8"
              >
                {/* Dot */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-3px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#C5A880] border border-[#C5A880]/60"
                />

                <div className="border border-white/[0.08] rounded-sm p-6 hover:bg-white/[0.02] transition-colors">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-base font-semibold text-white mb-0.5">{entry.title}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-white/55">{entry.company}</span>
                        <span className="text-[10px] font-mono text-white/30 border border-white/[0.08] px-2 py-0.5 rounded-sm">
                          {entry.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono text-[#C5A880]/70">{entry.period}</div>
                      <div className="text-[11px] text-white/30 mt-0.5">{entry.location}</div>
                    </div>
                  </div>

                  <p className="text-sm text-white/45 leading-relaxed mb-5">{entry.description}</p>

                  {/* Contributions */}
                  <div className="space-y-2 mb-5">
                    {entry.contributions.map((c) => (
                      <div key={c} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#C5A880]/45 mt-1.5 shrink-0" />
                        <span className="text-xs text-white/42 leading-relaxed">{c}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-white/35 border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────

function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="education-heading"
      className="py-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Education" heading="Academic Background" id="education-heading" />

        <div className="space-y-4">
          {education.map((entry, i) => (
            <motion.div
              key={entry.institution}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.08 * i, ease: EASE }}
              className="border border-white/[0.08] rounded-sm p-6 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{entry.degree}</h3>
                  <div className="text-sm text-white/55">{entry.institution}</div>
                  <div className="text-xs text-white/30 mt-0.5">{entry.location}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-mono text-[#C5A880]/70">{entry.period}</div>
                  {entry.current && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-mono text-emerald-400/70 border border-emerald-400/20 bg-emerald-400/[0.05] px-2 py-0.5 rounded-sm">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                      In Progress
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {entry.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#C5A880]/40 mt-1.5 shrink-0" />
                    <span className="text-xs text-white/40 leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="skills-heading"
      className="py-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] bg-[#C5A880]/[0.02]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Skills"
          heading="Technical Skills"
          sub="Categorised by domain — chosen for the problem, not for familiarity."
          id="skills-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: EASE }}
              className="bg-[#080808] p-5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="text-[10px] font-mono font-semibold tracking-widest uppercase text-[#C5A880]/65 mb-4">
                {cat.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono text-white/42 border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 rounded-sm hover:text-white/62 hover:border-white/12 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="projects-heading"
      className="py-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Projects"
          heading="Featured Projects"
          sub="Production-oriented systems — each with architecture decisions, not just code."
          id="projects-heading"
        />

        <div className="space-y-4">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.08 * i, ease: EASE }}
              className="border border-white/[0.08] rounded-sm p-6 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1">
                    <h3 className="text-base font-semibold text-white">{project.name}</h3>
                    {project.status === "Live" ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400/75 border border-emerald-400/20 bg-emerald-400/[0.05] px-2 py-0.5 rounded-sm">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                        Live
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-white/28 border border-white/[0.08] px-2 py-0.5 rounded-sm">
                        Open Source
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/35 font-mono">{project.tagline}</p>
                </div>
                <Link
                  href={project.caseStudyHref}
                  className="inline-flex items-center gap-1.5 text-xs text-[#C5A880]/65 border border-[#C5A880]/20 px-3 py-1.5 rounded-sm hover:bg-[#C5A880]/10 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] shrink-0"
                >
                  Case Study
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>

              <p className="text-sm text-white/45 leading-relaxed mb-4">{project.description}</p>

              {/* Highlight */}
              <div className="flex items-start gap-2.5 mb-4 px-4 py-3 border border-[#C5A880]/12 bg-[#C5A880]/[0.04] rounded-sm">
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#C5A880]/60 mt-1.5 shrink-0" />
                <span className="text-xs text-[#C5A880]/70 leading-relaxed font-mono">{project.highlight}</span>
              </div>

              {/* Tech + links */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-white/32 border border-white/[0.07] bg-white/[0.015] px-2 py-0.5 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/35 hover:text-white/60 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/35 hover:text-white/60 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                    >
                      <ExternalIcon className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Certifications ───────────────────────────────────────────────────────────

function CertificationsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const CATEGORY_STYLES = {
    Certification: "text-[#C5A880]/75 border-[#C5A880]/25 bg-[#C5A880]/[0.05]",
    Course:        "text-blue-400/70  border-blue-400/20  bg-blue-400/[0.04]",
    "Self-Study":  "text-white/40     border-white/[0.1]",
  } as const;

  return (
    <section
      ref={ref}
      aria-labelledby="certs-heading"
      className="py-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Learning"
          heading="Certifications & Continuous Learning"
          sub="Formal coursework and self-directed study — always in progress."
          id="certs-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={`${cert.title}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: EASE }}
              className="border border-white/[0.07] rounded-sm p-5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-sm font-semibold text-white leading-snug flex-1">
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                    >
                      {cert.title}
                    </a>
                  ) : (
                    cert.title
                  )}
                </h3>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-sm border shrink-0 ${
                    CATEGORY_STYLES[cert.category]
                  }`}
                >
                  {cert.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/35">{cert.issuer}</span>
                <span className="text-[11px] font-mono text-white/28">{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Current Focus ────────────────────────────────────────────────────────────

function CurrentFocusSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="focus-heading"
      className="py-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] bg-[#C5A880]/[0.02]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-20">
          <RevealBlock>
            <SectionLabel>Learning</SectionLabel>
            <h2
              id="focus-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-4 mb-4"
            >
              Current Focus
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">
              Actively deepening expertise in systems and tools that matter for production
              backend and AI engineering.
            </p>
          </RevealBlock>

          <div className="flex flex-col gap-2.5">
            {currentFocus.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.07 * i, ease: EASE }}
                className="flex items-center gap-4 py-3.5 px-5 border border-white/[0.08] rounded-sm bg-white/[0.015] hover:bg-white/[0.03] transition-colors group"
              >
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#C5A880]/50 shrink-0" />
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto text-[9px] font-mono text-[#C5A880]/40 border border-[#C5A880]/15 px-2 py-0.5 rounded-sm shrink-0 group-hover:text-[#C5A880]/70 group-hover:border-[#C5A880]/30 transition-colors"
                >
                  active
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <RevealBlock>
            <SectionLabel>Next steps</SectionLabel>
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mt-4 mb-5 leading-tight"
            >
              Let&rsquo;s build something
              <br />
              <span className="text-white/35">production-grade.</span>
            </h2>
            <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-md">
              Open to backend, full-stack, platform, and DevOps roles. Based in Pune,
              India — remote-first, available globally.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Get in Touch
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-white/15 text-white/60 text-sm px-5 py-2.5 rounded-sm hover:border-white/28 hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View Projects
              </Link>
              <a
                href={hero.resumePdfUrl}
                download
                className="inline-flex items-center gap-2 border border-[#C5A880]/22 text-[#C5A880]/65 text-sm px-5 py-2.5 rounded-sm hover:bg-[#C5A880]/10 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                Download Resume
              </a>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="divide-y divide-white/[0.07]">
              {[
                { label: "GitHub",         sub: "Open source projects and engineering work", href: hero.github,   external: true },
                { label: "LinkedIn",       sub: "Professional background and experience",    href: hero.linkedin, external: true },
                { label: "System Design",  sub: "Personal knowledge base and engineering notes", href: "https://github.com/pranitap123/system-design-engineering", external: true },
                { label: "Engineering",    sub: "Technical philosophy and architecture thinking", href: "/engineering", external: false },
              ].map((item) => {
                const Comp = item.external ? "a" : Link;
                const ext = item.external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
                return (
                  <Comp
                    key={item.label}
                    href={item.href}
                    {...ext}
                    className="flex items-center justify-between py-4 group hover:pl-1 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                  >
                    <div>
                      <div className="text-sm text-white/58 group-hover:text-white transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-white/25 font-mono mt-0.5">{item.sub}</div>
                    </div>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-white/18 group-hover:text-white/48 group-hover:translate-x-0.5 transition-all" />
                  </Comp>
                );
              })}
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function PageFooter() {
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs font-mono text-white/20">Pranita Panchal</span>
        <span className="text-xs text-white/15">
          © {new Date().getFullYear()} — Built with Next.js, TypeScript, Tailwind CSS
        </span>
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

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
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

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function MetaIcon({ name }: { name: string }) {
  const cls = "w-3.5 h-3.5 text-white/28 shrink-0";
  switch (name) {
    case "location":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "email":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "github":
      return <GitHubIcon className={cls} />;
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return null;
  }
}