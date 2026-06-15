"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

import {
  hero,
  philosophy,
  expertise,
  timeline,
  currentFocus,
  principles,
} from "@/lib/data/about";

// ─── Shared ease ──────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Fade-up animation variant ───────────────────────────────────────────────

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

// ─── Reusable section label ───────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/70 border border-[#C5A880]/20 bg-[#C5A880]/5 px-3 py-1 rounded-sm">
      {children}
    </span>
  );
}

// ─── Reusable inView wrapper ──────────────────────────────────────────────────

function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main
        id="main-content"
        className="min-h-screen bg-[#080808] text-white antialiased"
      >
        <AboutHero />
        <PhilosophySection />
        <ExpertiseSection />
        <TimelineSection />
        <PrinciplesSection />
        <CurrentFocusSection />
        <CallToAction />
        <PageFooter />
      </main>
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const navItems = [
    { href: "/projects",    label: "Projects"    },
    { href: "/engineering", label: "Engineering" },
    { href: "/about",       label: "About",  current: true },
  ] as const;

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
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={"current" in item && item.current ? "page" : undefined}
                  className={`text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm ${
                    "current" in item && item.current
                      ? "text-white"
                      : "text-white/50 hover:text-white"
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

function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] overflow-hidden"
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
        {/* Availability pill */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-8"
        >
          {hero.available && (
            <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/70 border border-[#C5A880]/20 bg-[#C5A880]/5 px-3 py-1 rounded-sm">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                aria-hidden="true"
              />
              Available for opportunities
            </span>
          )}
        </motion.div>

        {/* Name + title */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.07}
          className="mb-8"
        >
          <h1
            id="about-hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.06] mb-3"
          >
            {hero.name}
          </h1>
          <p className="text-xl text-[#C5A880] font-mono font-medium">
            {hero.title}
          </p>
          <p className="text-sm text-white/35 font-mono mt-1.5 flex items-center gap-1.5">
            <LocationIcon className="w-3.5 h-3.5" />
            {hero.location}
          </p>
        </motion.div>

        {/* Introduction */}
        <div className="max-w-2xl mb-10 space-y-4">
          {hero.introduction.map((para, i) => (
            <motion.p
              key={i}
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.13 + 0.06 * i}
              className="text-base text-white/55 leading-[1.85]"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* External links */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.32}
          className="flex flex-wrap gap-3"
        >
          {hero.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/40 border border-white/[0.1] px-4 py-2 rounded-sm hover:border-white/22 hover:text-white/65 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <ExternalIcon className="w-3.5 h-3.5" />
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Philosophy ───────────────────────────────────────────────────────────────

function PhilosophySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="mb-12">
          <SectionLabel>Engineering Philosophy</SectionLabel>
          <h2
            id="philosophy-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-4"
          >
            How I think about building software
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {philosophy.map((item, i) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.07 * i, ease: EASE }}
              className="bg-[#080808] p-7 hover:bg-white/[0.025] transition-colors"
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="text-[11px] font-mono text-white/18 mt-1 shrink-0 tabular-nums">
                  {item.index}
                </span>
                <h3 className="text-sm font-semibold text-white leading-snug">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-white/42 leading-[1.8] pl-8">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Expertise ────────────────────────────────────────────────────────────────

function ExpertiseSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="expertise"
      aria-labelledby="expertise-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="mb-12">
          <SectionLabel>Technical Expertise</SectionLabel>
          <h2
            id="expertise-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-4"
          >
            Tools and technologies
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {expertise.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.06 * i, ease: EASE }}
              className="bg-[#080808] p-5 hover:bg-white/[0.02] transition-colors"
            >
              {/* Category header */}
              <div className="text-[10px] font-mono font-semibold tracking-widest uppercase text-[#C5A880]/65 mb-4">
                {cat.category}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono text-white/45 border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 rounded-sm hover:text-white/65 hover:border-white/14 transition-colors"
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

// ─── Timeline ─────────────────────────────────────────────────────────────────

function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="timeline"
      aria-labelledby="timeline-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          {/* Left: sticky heading */}
          <RevealBlock className="lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>Learning Journey</SectionLabel>
            <h2
              id="timeline-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-4 mb-4"
            >
              How I got here
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">
              A sequence of deliberate focus areas, each building on the last — from
              web fundamentals to distributed systems and AI engineering.
            </p>
          </RevealBlock>

          {/* Right: timeline entries */}
          <div className="relative">
            {/* Vertical rule */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.07]"
            />

            <div className="space-y-0">
              {timeline.map((entry, i) => (
                <motion.div
                  key={`${entry.year}-${entry.title}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
                  className="relative pl-8 pb-8 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div
                    aria-hidden="true"
                    className={`absolute left-[-3px] top-1.5 w-1.5 h-1.5 rounded-full border ${
                      entry.current
                        ? "bg-[#C5A880] border-[#C5A880]/60"
                        : "bg-[#080808] border-white/20"
                    }`}
                  />

                  {/* Year */}
                  <div
                    className={`text-[11px] font-mono font-semibold mb-1.5 ${
                      entry.current ? "text-[#C5A880]" : "text-white/30"
                    }`}
                  >
                    {entry.year}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-sm font-semibold mb-2 ${
                      entry.current ? "text-white" : "text-white/75"
                    }`}
                  >
                    {entry.title}
                    {entry.current && (
                      <span className="ml-2 inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400/70 border border-emerald-400/20 bg-emerald-400/[0.05] px-1.5 py-0.5 rounded-sm align-middle">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                        active
                      </span>
                    )}
                  </h3>

                  {/* Detail */}
                  <p className="text-xs text-white/38 leading-relaxed">{entry.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Principles (manifesto) ───────────────────────────────────────────────────

function PrinciplesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="principles"
      aria-labelledby="principles-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] bg-[#C5A880]/[0.025]"
    >
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="mb-12">
          <SectionLabel>Engineering Principles</SectionLabel>
          <h2
            id="principles-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-4"
          >
            Statements I build by
          </h2>
        </RevealBlock>

        <div className="space-y-0 divide-y divide-white/[0.06]">
          {principles.map((statement, i) => (
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
              <p className="text-sm text-white/55 leading-relaxed italic group-hover:text-white/70 transition-colors duration-200">
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
          {/* Left: heading */}
          <RevealBlock className="lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>Current Focus</SectionLabel>
            <h2
              id="focus-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-4 mb-4"
            >
              What I&rsquo;m building
              <br />
              expertise in now
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">
              Continuously deepening knowledge in the systems and tools that define
              modern backend and platform engineering.
            </p>
          </RevealBlock>

          {/* Right: focus items */}
          <div className="flex flex-col gap-3">
            {currentFocus.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.07 * i, ease: EASE }}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 py-4 px-5 border border-white/[0.08] rounded-sm bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/[0.12] transition-colors group"
              >
                <span className="text-sm font-semibold text-white shrink-0 sm:min-w-[200px]">
                  {item.label}
                </span>
                <span className="text-xs text-white/35 font-mono leading-relaxed">
                  {item.detail}
                </span>
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

// ─── Call to Action ───────────────────────────────────────────────────────────

function CallToAction() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-24 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <RevealBlock>
            <SectionLabel>What&rsquo;s next</SectionLabel>
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mt-4 mb-5 leading-tight"
            >
              Let&rsquo;s build something
              <br />
              <span className="text-white/35">production-grade.</span>
            </h2>
            <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-md">
              Open to backend, full-stack, platform, and DevOps roles. I bring
              architecture thinking and a bias for observable, maintainable systems.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View Projects
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#C5A880]/25 text-[#C5A880]/80 text-sm px-5 py-2.5 rounded-sm hover:bg-[#C5A880]/10 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Get in Touch
              </Link>
            </div>
          </RevealBlock>

          {/* Right: quick links list */}
          <RevealBlock delay={0.1}>
            <div className="divide-y divide-white/[0.07]">
              {[
                {
                  label: "Engineering Projects",
                  sub: "SecureVault · ARGUS-PRISM · Jurisynth AI",
                  href: "/projects",
                },
                {
                  label: "System Design Notes",
                  sub: "Distributed systems, architecture patterns, DevOps",
                  href: "/engineering",
                },
                {
                  label: "GitHub",
                  sub: "github.com/pranitap123",
                  href: "https://github.com/pranitap123",
                  external: true,
                },
                {
                  label: "LinkedIn",
                  sub: "linkedin.com/in/pranita-panchal-5b9b3b281",
                  href: "https://www.linkedin.com/in/pranita-panchal-5b9b3b281",
                  external: true,
                },
              ].map((item) => {
                const Comp = item.external ? "a" : Link;
                const externalProps = item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {};

                return (
                  <Comp
                    key={item.label}
                    href={item.href}
                    {...externalProps}
                    className="flex items-center justify-between py-4 group hover:pl-1 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                  >
                    <div>
                      <div className="text-sm text-white/60 group-hover:text-white transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-white/28 font-mono mt-0.5">
                        {item.sub}
                      </div>
                    </div>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-white/18 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
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
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}