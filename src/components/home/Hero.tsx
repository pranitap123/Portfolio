"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { heroData } from "@/lib/data/homepage";
import { SectionLabel } from "@/components/ui/SectionLabel";

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6 md:px-12 lg:px-20"
    >
      {/* Subtle grid overlay — infrastructure aesthetic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto w-full">
        {/* Availability pill */}
        <motion.div
          custom={0}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <SectionLabel>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 align-middle" />
            {heroData.label}
          </SectionLabel>
        </motion.div>

        {/* Main headline */}
        <motion.div
          custom={0.08}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.08]">
            {heroData.headline}
            <br />
            <span className="text-[#C5A880]">{heroData.headlineAccent}</span>
          </h1>
        </motion.div>

        {/* Statement */}
        <motion.p
          custom={0.16}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl md:text-2xl text-white/80 font-normal max-w-2xl leading-relaxed mb-4"
        >
          {heroData.statement}
        </motion.p>

        {/* Tagline */}
        <motion.p
          custom={0.22}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="text-sm sm:text-base text-white/40 max-w-xl leading-relaxed mb-10"
        >
          {heroData.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.3}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-3"
        >
          <Link
            href={heroData.cta.primary.href}
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {heroData.cta.primary.label}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href={heroData.cta.secondary.href}
            className="inline-flex items-center gap-2 border border-white/15 text-white/70 text-sm font-medium px-5 py-2.5 rounded-sm hover:border-white/30 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {heroData.cta.secondary.label}
          </Link>

          <a
            href={heroData.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
          >
            <GitHubIcon className="w-4 h-4" />
            <span className="font-mono text-xs">pranitap123</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        custom={0.45}
        variants={FADE_UP}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="text-[10px] tracking-widest uppercase text-white/20">scroll</span>
      </motion.div>
    </section>
  );
}

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