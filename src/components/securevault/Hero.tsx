"use client";

import { motion } from "framer-motion";
import { heroData } from "@/lib/data/securevault";

const METHOD_COLORS: Record<string, string> = {
  GET: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  POST: "text-blue-400 border-blue-400/20 bg-blue-400/5",
  PUT: "text-amber-400 border-amber-400/20 bg-amber-400/5",
  DELETE: "text-red-400 border-red-400/20 bg-red-400/5",
};

export function Hero() {
  return (
    <header className="pt-32 pb-12 border-b border-white/[0.06]">
      {/* Breadcrumb */}
      <motion.nav
        aria-label="Breadcrumb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <ol className="flex items-center gap-2 text-xs font-mono text-white/30 list-none p-0 m-0">
          <li><a href="/" className="hover:text-white/60 transition-colors">pranita</a></li>
          <li aria-hidden="true" className="text-white/15">/</li>
          <li><a href="/projects" className="hover:text-white/60 transition-colors">projects</a></li>
          <li aria-hidden="true" className="text-white/15">/</li>
          <li className="text-white/60">securevault</li>
        </ol>
      </motion.nav>

      {/* Category tags */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="flex flex-wrap gap-2 mb-5"
      >
        {heroData.categories.map((cat) => (
          <span
            key={cat}
            className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/70 border border-[#C5A880]/20 bg-[#C5A880]/5 px-3 py-1 rounded-sm"
          >
            {cat}
          </span>
        ))}
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.09 }}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.06] mb-4"
      >
        {heroData.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.14 }}
        className="text-base sm:text-lg text-white/40 mb-6 max-w-xl leading-relaxed"
      >
        {heroData.subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.18 }}
        className="text-sm text-white/55 max-w-2xl leading-[1.75] mb-8"
      >
        {heroData.description}
      </motion.p>

      {/* Tech stack */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.22 }}
        className="flex flex-wrap gap-1.5 mb-8"
      >
        {heroData.tech.map((t) => (
          <span
            key={t}
            className="text-[11px] font-mono text-white/40 border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 rounded-sm"
          >
            {t}
          </span>
        ))}
      </motion.div>

      {/* Stats + GitHub row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.26 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {heroData.stats.map((s) => (
            <div key={s.label} className="bg-[#080808] px-5 py-3">
              <div className="text-[11px] font-mono font-semibold text-white/60 mb-0.5">{s.value}</div>
              <div className="text-[9px] font-mono text-white/25 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* GitHub */}
        <a
          href={heroData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-white/45 border border-white/[0.10] px-5 py-2.5 rounded-sm hover:border-white/25 hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black shrink-0"
        >
          <GithubIcon className="w-4 h-4" />
          View on GitHub
        </a>
      </motion.div>
    </header>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}