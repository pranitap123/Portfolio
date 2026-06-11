"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { contactData } from "@/lib/data/homepage";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="contact-heading"
      className="py-24 px-6 md:px-12 lg:px-20 border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel className="mb-5 block">{contactData.label}</SectionLabel>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-5 leading-tight"
            >
              {contactData.heading}
            </h2>
            <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-md">
              {contactData.description}
            </p>

            {/* Email CTA */}
            <a
              href={`mailto:${contactData.email}`}
              className="inline-flex items-center gap-2 bg-[#C5A880] text-black text-sm font-semibold px-6 py-3 rounded-sm hover:bg-[#d4b990] active:bg-[#b89870] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <MailIcon className="w-4 h-4" />
              {contactData.email}
            </a>
          </motion.div>

          {/* Right: links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="divide-y divide-white/[0.07]">
              {contactData.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 group hover:pl-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                >
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="mt-8 flex items-center gap-2 text-xs text-white/25">
              <LocationIcon className="w-3.5 h-3.5" />
              Pune, Maharashtra, India — available for remote & hybrid
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs font-mono text-white/20">Pranita Panchal</span>
        <span className="text-xs text-white/15">
          © {new Date().getFullYear()} — Built with Next.js, TypeScript, Tailwind CSS
        </span>
      </div>
    </section>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}