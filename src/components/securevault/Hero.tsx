
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { heroData } from "@/lib/data/securevault";

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
          <li>
            <Link href="/" className="hover:text-white/60 transition-colors">
              pranita
            </Link>
          </li>

          <li aria-hidden="true" className="text-white/15">
            /
          </li>

          <li>
            <Link
              href="/projects"
              className="hover:text-white/60 transition-colors"
            >
              projects
            </Link>
          </li>

          <li aria-hidden="true" className="text-white/15">
            /
          </li>

          <li className="text-white/60">securevault</li>
        </ol>
      </motion.nav>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-wrap gap-2 mb-5"
      >
        {heroData.categories.map((cat: string) => (
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
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.06] mb-4"
      >
        {heroData.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="text-base sm:text-lg text-white/40 mb-5 max-w-2xl"
      >
        {heroData.subtitle}
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="text-sm text-white/55 max-w-3xl leading-7 mb-8"
      >
        {heroData.description}
      </motion.p>

      {/* Tech */}
      <div className="flex flex-wrap gap-2 mb-8">
        {heroData.tech.map((tech: string) => (
          <span
            key={tech}
            className="text-[11px] font-mono border border-white/10 px-2.5 py-1 rounded-sm text-white/45"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-sm overflow-hidden">
          {heroData.stats.map(
            (stat: { label: string; value: string }) => (
              <div
                key={stat.label}
                className="bg-[#080808] px-5 py-3"
              >
                <p className="text-xs font-semibold text-white">
                  {stat.value}
                </p>

                <p className="text-[10px] uppercase tracking-wider text-white/30 mt-1">
                  {stat.label}
                </p>
              </div>
            )
          )}
        </div>

        <a
          href={heroData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-white/10 px-5 py-2.5 rounded-sm text-white/50 hover:text-white hover:border-white/30 transition-colors"
        >
          <GithubIcon className="w-4 h-4" />
          View on GitHub
        </a>
      </div>
    </header>
  );
}

function GithubIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0112 6.84c.85 0 1.7.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.54 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
}