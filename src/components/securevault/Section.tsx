"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, heading, children, className }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-heading`}
      className={cn("py-14 border-b border-white/[0.06]", className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <span className="text-[10px] font-mono text-[#C5A880]/60 tracking-widest uppercase mb-2 block">
          {eyebrow}
        </span>
        <h2
          id={`${id}-heading`}
          className="text-xl sm:text-2xl font-semibold text-white tracking-tight"
        >
          {heading}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

// Reusable prose paragraph
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm text-white/55 leading-[1.80]", className)}>{children}</p>
  );
}

// Reusable inline callout box
export function Callout({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "gold" | "warning";
}) {
  const styles = {
    default: "border-white/[0.09] bg-white/[0.03] text-white/50",
    gold: "border-[#C5A880]/25 bg-[#C5A880]/05 text-[#C5A880]/80",
    warning: "border-amber-400/20 bg-amber-400/05 text-amber-400/80",
  };

  return (
    <div className={cn("p-5 border rounded-sm text-sm font-mono leading-relaxed mt-4", styles[variant])}>
      {children}
    </div>
  );
}