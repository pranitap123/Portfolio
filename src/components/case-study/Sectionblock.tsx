"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionBlockProps {
  id: string;
  label: string;
  heading: string;
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export function SectionBlock({
  id,
  label,
  heading,
  children,
  className,
  accent = false,
}: SectionBlockProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "py-16 md:py-20 border-t border-white/[0.06]",
        accent && "bg-[#C5A880]/[0.03]",
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <span className="inline-block text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/70 border border-[#C5A880]/20 bg-[#C5A880]/5 px-3 py-1 rounded-sm mb-4">
            {label}
          </span>
          <h2
            id={`${id}-heading`}
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
          >
            {heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Prose paragraph ─────────────────────────────────────────────────────────
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm text-white/55 leading-[1.85] mb-5 last:mb-0", className)}>
      {children}
    </p>
  );
}

// ─── Inline label-value row ───────────────────────────────────────────────────
export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-white/[0.05] last:border-0">
      <span className="text-[11px] font-mono font-semibold text-[#C5A880]/70 min-w-[120px] mt-0.5 shrink-0">
        {label}
      </span>
      <span className="text-sm text-white/55">{value}</span>
    </div>
  );
}