"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { schemaDesign } from "@/lib/data/securevault";
import { Section, Prose, Callout } from "./Section";

export function DatabaseSchema() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="database" eyebrow="Data Layer" heading="Database Design">
      <Prose className="mb-8">{schemaDesign.description}</Prose>

      {/* Schema table grid */}
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
      >
        {schemaDesign.tables.map((table, i) => (
          <motion.div
            key={table.name}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.08 * i,
            }}
            className="border border-white/[0.09] rounded-sm overflow-hidden bg-white/[0.02]"
          >
            {/* Table header */}
            <div className="px-4 py-3 border-b border-white/[0.07] flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-white/80">
                {table.name}
              </span>

              <span className="text-[9px] font-mono text-white/25 border border-white/[0.08] px-2 py-0.5 rounded-sm">
                TABLE
              </span>
            </div>

            {/* Fields */}
            <div className="divide-y divide-white/[0.05]">
              {table.columns.map((field) => (
                <div
                  key={field.col}
                  className="px-4 py-2 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {field.note.includes("Primary key") && (
                      <KeyIcon className="w-3 h-3 text-[#C5A880]/60 shrink-0" />
                    )}

                  {(
                     field.note.includes("FK → users") ||
                    field.note.includes("FK → namespaces")
                          ) && (
                     <LinkIcon className="w-3 h-3 text-blue-400/40 shrink-0" />
                     )}
                    {!field.note && (
                      <span
                        className="w-3 h-3 shrink-0"
                        aria-hidden="true"
                      />
                    )}

                    <span className="text-[11px] font-mono text-white/65 truncate">
                      {field.col}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-white/25 hidden sm:block">
                      {field.type}
                    </span>
{field.note.includes("Primary key") && (
  <span className="text-[9px] font-mono text-[#C5A880]/70 border border-[#C5A880]/20 px-1.5 py-0.5 rounded-sm">
    PK
  </span>
)}

{(field.note.includes("FK → users") ||
  field.note.includes("FK → namespaces")) && (
  <span className="text-[9px] font-mono text-blue-400/50 border border-blue-400/15 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
    {field.note}
  </span>
)}

{!field.note.includes("Primary key") &&
  !field.note.includes("FK → users") &&
  !field.note.includes("FK → namespaces") &&
  field.note && (
    <span className="text-[9px] font-mono text-[#C5A880]/50 border border-[#C5A880]/15 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
      {field.note}
    </span>
)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Relationships note */}
      <Callout>
        <span className="text-white/30 text-[10px] uppercase tracking-widest block mb-3">
          Index Strategy
        </span>

        <ul className="space-y-2 list-none p-0 m-0">
          {schemaDesign.notes.map((note, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-white/55 leading-relaxed"
            >
              <span
                className="mt-2 h-1 w-1 rounded-full bg-[#C5A880] shrink-0"
                aria-hidden="true"
              />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </Callout>
    </Section>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path
        d="M21 2l-9.6 9.6M15.5 7.5l2 2M18 5l2 2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
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
        d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}