"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

import {
  hero,
  principles,
  architectureMindset,
  techStack,
  workflowSteps,
  engineeringValues,
  currentFocus,
  systemDesignRepo,
} from "@/lib/data/engineering";

// ─── Animation constants ──────────────────────────────────────────────────────

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
    <RevealBlock className="mb-12">
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

export default function EngineeringPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-[#080808] text-white antialiased">
        <EngineeringHero />
        <PrinciplesSection />
        <ArchitectureSection />
        <TechStackSection />
        <WorkflowSection />
        <ValuesSection />
        <CurrentFocusSection />
        <SystemDesignRepoSection />
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
              { href: "/projects", label: "Projects" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
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
            <li>
              <Link
                href="/engineering"
                aria-current="page"
                className="text-sm text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
              >
                Engineering
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function EngineeringHero() {
  return (
    <section
      aria-labelledby="eng-hero-heading"
      className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] overflow-hidden"
    >
      {/* Grid */}
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
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6"
        >
          <SectionLabel>{hero.label}</SectionLabel>
        </motion.div>

        <motion.h1
          id="eng-hero-heading"
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.08}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.06] mb-6 whitespace-pre-line"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.16}
          className="text-base sm:text-lg text-white/45 max-w-xl leading-relaxed mb-12"
        >
          {hero.description}
        </motion.p>

        {/* Quick stat strip */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.24}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-sm overflow-hidden"
          role="list"
        >
          {[
            { value: "3+", label: "Production systems" },
            { value: "8+", label: "Tech categories" },
            { value: "15+", label: "Technologies" },
            { value: "∞",   label: "Things to learn" },
          ].map((s) => (
            <div key={s.label} role="listitem" className="bg-[#080808] px-6 py-5">
              <div className="text-2xl font-semibold font-mono text-white mb-1">{s.value}</div>
              <div className="text-xs text-white/35">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Principles ───────────────────────────────────────────────────────────────

function PrinciplesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="principles"
      aria-labelledby="principles-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Foundation"
          heading="Core Engineering Principles"
          sub="The invariants I apply regardless of language, framework, or scale."
          id="principles-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {principles.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.06 * i, ease: EASE }}
              className="bg-[#080808] p-7 hover:bg-white/[0.025] transition-colors group"
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="text-[11px] font-mono text-white/18 mt-1 shrink-0 tabular-nums">
                  {p.index}
                </span>
                <div className="flex items-center gap-3">
                  <PrincipleIcon name={p.icon} />
                  <h3 className="text-sm font-semibold text-white leading-snug">{p.title}</h3>
                </div>
              </div>
              <p className="text-sm text-white/42 leading-[1.8] pl-8">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Architecture Mindset ─────────────────────────────────────────────────────

function ArchitectureSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="architecture"
      aria-labelledby="architecture-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Architecture"
          heading="Architecture Mindset"
          sub="How I approach system design decisions across different problem domains."
          id="architecture-heading"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {architectureMindset.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.07 * i, ease: EASE }}
              className="border border-white/[0.08] rounded-sm p-6 hover:bg-white/[0.02] transition-colors"
            >
              <h3 className="text-sm font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed mb-4">{item.approach}</p>

              <div className="space-y-0 divide-y divide-white/[0.05]">
                {item.considerations.map((c) => (
                  <div key={c} className="flex items-start gap-2.5 py-2">
                    <span
                      aria-hidden="true"
                      className="w-1 h-1 rounded-full bg-[#C5A880]/45 mt-1.5 shrink-0"
                    />
                    <span className="text-[11px] text-white/38 font-mono leading-relaxed">{c}</span>
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

// ─── Technology Stack ─────────────────────────────────────────────────────────

function TechStackSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="stack"
      aria-labelledby="stack-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] bg-[#C5A880]/[0.02]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Technology"
          heading="Technology Stack"
          sub="Categorised by domain — chosen for the problem, not for familiarity."
          id="stack-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {techStack.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.055 * i, ease: EASE }}
              className="bg-[#080808] p-5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <TechIcon name={cat.icon} />
                <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-[#C5A880]/65">
                  {cat.category}
                </span>
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

// ─── Workflow ─────────────────────────────────────────────────────────────────

function WorkflowSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="workflow"
      aria-labelledby="workflow-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Process"
          heading="Development Workflow"
          sub="A deliberate engineering process from first principles to production monitoring."
          id="workflow-heading"
        />

        {/* Horizontal scroll container on mobile, full grid on desktop */}
        <div className="relative">
          {/* Connector line behind cards */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[38px] left-[52px] right-[52px] h-px bg-white/[0.07]"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.055 * i, ease: EASE }}
                className="bg-[#080808] p-4 flex flex-col items-center text-center group hover:bg-white/[0.025] transition-colors"
              >
                {/* Step bubble */}
                <div className="relative z-10 w-10 h-10 rounded-full border border-white/[0.1] bg-[#080808] flex items-center justify-center mb-3 group-hover:border-[#C5A880]/35 group-hover:bg-[#C5A880]/05 transition-colors">
                  <span className="text-[11px] font-mono font-semibold text-white/45 group-hover:text-[#C5A880]/80 transition-colors">
                    {step.step}
                  </span>
                </div>

                <div className="text-xs font-semibold text-white/80 mb-2 group-hover:text-white transition-colors">
                  {step.label}
                </div>
                <p className="text-[10px] text-white/28 leading-relaxed hidden lg:block">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Step descriptions for mobile/tablet — shown below the grid */}
        <div className="mt-6 space-y-0 divide-y divide-white/[0.05] lg:hidden">
          {workflowSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: EASE }}
              className="flex items-start gap-4 py-4"
            >
              <span className="text-[10px] font-mono text-[#C5A880]/50 tabular-nums shrink-0 mt-0.5">
                {step.step}
              </span>
              <div>
                <div className="text-xs font-semibold text-white/75 mb-1">{step.label}</div>
                <p className="text-xs text-white/38 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Values ───────────────────────────────────────────────────────────────────

function ValuesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="values"
      aria-labelledby="values-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] bg-[#C5A880]/[0.025]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Values"
          heading="Engineering Values"
          sub="Statements I build by — not aspirational copy, but operational constraints."
          id="values-heading"
        />

        <div className="space-y-0 divide-y divide-white/[0.06]">
          {engineeringValues.map((statement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.07 * i, ease: EASE }}
              className="py-5 flex items-start gap-5 group"
            >
              <span
                aria-hidden="true"
                className="text-[10px] font-mono text-white/18 shrink-0 tabular-nums mt-1"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-white/55 leading-relaxed italic group-hover:text-white/72 transition-colors duration-200">
                &ldquo;{statement}&rdquo;
              </p>
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
      id="focus"
      aria-labelledby="focus-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          <RevealBlock className="lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>Learning</SectionLabel>
            <h2
              id="focus-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-4 mb-4"
            >
              Current Focus
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">
              Continuously deepening expertise in the systems and tools that define
              modern backend and platform engineering.
            </p>
          </RevealBlock>

          <div className="flex flex-col gap-3">
            {currentFocus.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.07 * i, ease: EASE }}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 py-4 px-5 border border-white/[0.08] rounded-sm bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/12 transition-colors group"
              >
                <span className="text-sm font-semibold text-white shrink-0 sm:min-w-[200px]">
                  {item.label}
                </span>
                <span className="text-xs text-white/35 font-mono leading-relaxed">{item.detail}</span>
                <span
                  aria-hidden="true"
                  className="sm:ml-auto text-[9px] font-mono text-[#C5A880]/45 border border-[#C5A880]/18 px-2 py-0.5 rounded-sm self-start sm:self-auto shrink-0 group-hover:text-[#C5A880]/75 group-hover:border-[#C5A880]/35 transition-colors"
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

// ─── System Design Repo ───────────────────────────────────────────────────────

function SystemDesignRepoSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="knowledge-base"
      aria-labelledby="kb-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Knowledge Base"
          heading="System Design Repository"
          sub={systemDesignRepo.description}
          id="kb-heading"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
          className="border border-white/[0.08] rounded-sm overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/[0.025] border-b border-white/[0.07]">
            <div className="flex items-center gap-3">
              <GitHubIcon className="w-4 h-4 text-white/50" />
              <a
                href={systemDesignRepo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
              >
                pranitap123/system-design-engineering
              </a>
            </div>
            <a
              href={systemDesignRepo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#C5A880]/70 border border-[#C5A880]/20 px-3 py-1.5 rounded-sm hover:bg-[#C5A880]/10 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
            >
              View Repository
              <ExternalIcon className="w-3 h-3" />
            </a>
          </div>

          {/* Topics */}
          <div className="p-6">
            <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
              Topics covered
            </div>
            <div className="flex flex-wrap gap-2">
              {systemDesignRepo.topics.map((topic, i) => (
                <motion.span
                  key={topic}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.05 * i + 0.2 }}
                  className="text-[11px] font-mono text-white/45 border border-white/[0.08] bg-white/[0.02] px-3 py-1 rounded-sm hover:text-white/65 hover:border-white/14 transition-colors"
                >
                  {topic}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA row */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            View Projects
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-white/15 text-white/60 text-sm px-5 py-2.5 rounded-sm hover:border-white/28 hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Get in Touch
          </Link>
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

// ─── Principle icons ──────────────────────────────────────────────────────────

function PrincipleIcon({ name }: { name: string }) {
  const cls = "w-4 h-4 text-[#C5A880]/60 shrink-0";
  switch (name) {
    case "layers":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
        </svg>
      );
    case "type":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chart":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 3v18h18M7 16l4-4 4 4 4-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "zap":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      );
    case "alert":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "terminal":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 17l6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "book":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 004 22h16V2H6.5A2.5 2.5 0 004 4.5v15z" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Tech category icons ──────────────────────────────────────────────────────

function TechIcon({ name }: { name: string }) {
  const cls = "w-3.5 h-3.5 text-[#C5A880]/55 shrink-0";
  switch (name) {
    case "code":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "server":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="2" y="3" width="20" height="6" rx="1" />
          <rect x="2" y="15" width="20" height="6" rx="1" />
          <path d="M6 6h.01M6 18h.01" strokeLinecap="round" />
        </svg>
      );
    case "monitor":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        </svg>
      );
    case "database":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" />
        </svg>
      );
    case "cloud":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
        </svg>
      );
    case "brain":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.44 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 011.32-4.24A2.5 2.5 0 019.5 2z" />
          <path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.44 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-1.32-4.24A2.5 2.5 0 0014.5 2z" />
        </svg>
      );
    case "hex":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2l9 4.9V17L12 22l-9-5.1V6.9L12 2z" strokeLinejoin="round" />
        </svg>
      );
    case "wrench":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Generic icons ────────────────────────────────────────────────────────────

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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