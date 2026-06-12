"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/data/securevault";

export function CaseStudyNav() {
  const [activeId, setActiveId] = useState<string>(sections[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <aside
      aria-label="Case study navigation"
      className="hidden lg:block w-52 shrink-0"
    >
      <div className="sticky top-24">
        <p className="text-[10px] font-mono text-white/25 tracking-widest uppercase mb-4 px-3">
          Contents
        </p>
        <nav>
          <ul className="space-y-0.5" role="list">
            {sections.map(({ id, label }) => {
              const isActive = activeId === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className={`
                      w-full text-left text-xs px-3 py-1.5 rounded-sm transition-all duration-200 
                      flex items-center gap-2 group
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-1 focus-visible:ring-offset-black
                      ${isActive
                        ? "text-white"
                        : "text-white/35 hover:text-white/60"
                      }
                    `}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className={`w-px h-4 rounded-full transition-all duration-200 shrink-0 ${
                        isActive ? "bg-[#C5A880]" : "bg-white/10 group-hover:bg-white/20"
                      }`}
                      aria-hidden="true"
                    />
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Back to projects */}
        <div className="mt-8 pt-6 border-t border-white/[0.07] px-3">
          <a
            href="/projects"
            className="text-[11px] text-white/25 hover:text-white/50 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
          >
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All projects
          </a>
        </div>
      </div>
    </aside>
  );
}