"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  sections: {
    id: string;
    label: string;
  }[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [active, setActive] = useState<string>(
    sections[0]?.id ?? ""
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        {
          rootMargin: "-20% 0px -70% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-24 hidden xl:block self-start"
    >
      <p className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
        On this page
      </p>

      <ul className="space-y-0.5">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={cn(
                "flex items-center gap-2.5 py-1.5 text-xs transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]",
                active === id
                  ? "text-white"
                  : "text-white/30 hover:text-white/55"
              )}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span
                className={cn(
                  "w-1 h-1 rounded-full shrink-0 transition-colors",
                  active === id
                    ? "bg-[#C5A880]"
                    : "bg-white/15"
                )}
                aria-hidden="true"
              />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}