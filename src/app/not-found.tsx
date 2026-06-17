import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you were looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased flex flex-col">
      {/* Skip link */}
      <a
        href="#not-found-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C5A880] focus:text-black focus:text-sm focus:font-medium focus:rounded-sm"
      >
        Skip to content
      </a>

      {/* Minimal nav */}
      <header className="h-14 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-md flex-shrink-0">
        <div className="max-w-5xl mx-auto h-full px-6 md:px-12 lg:px-20 flex items-center">
          <Link
            href="/"
            className="text-sm font-semibold text-white tracking-tight hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
          >
            Pranita Panchal
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main
        id="not-found-content"
        className="flex-1 flex items-center justify-center px-6"
      >
        <div className="max-w-lg w-full text-center">
          {/* Error code */}
          <div
            aria-hidden="true"
            className="text-[120px] sm:text-[160px] font-semibold text-white/[0.04] leading-none select-none mb-0 font-mono"
          >
            404
          </div>

          {/* Message */}
          <div className="-mt-4 sm:-mt-8 relative z-10">
            <span className="inline-block text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/70 border border-[#C5A880]/20 bg-[#C5A880]/5 px-3 py-1 rounded-sm mb-6">
              Page not found
            </span>

            <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4">
              This route doesn&rsquo;t exist.
            </h1>

            <p className="text-sm text-white/45 leading-relaxed mb-10 max-w-sm mx-auto">
              The page you&rsquo;re looking for may have been moved, renamed, or never
              existed. Check the URL or navigate back to familiar ground.
            </p>

            {/* Actions */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              role="navigation"
              aria-label="Recovery options"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-2.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black w-full sm:w-auto justify-center"
              >
                <HomeIcon className="w-4 h-4" />
                Go Home
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-white/15 text-white/60 text-sm px-6 py-2.5 rounded-sm hover:border-white/28 hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black w-full sm:w-auto justify-center"
              >
                Browse Projects
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick links */}
            <div className="mt-12 pt-8 border-t border-white/[0.06]">
              <p className="text-[11px] font-mono text-white/25 uppercase tracking-widest mb-4">
                Or jump to
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {[
                  { href: "/about",       label: "About"       },
                  { href: "/engineering", label: "Engineering" },
                  { href: "/resume",      label: "Resume"      },
                  { href: "/contact",     label: "Contact"     },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs text-white/35 hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="flex-shrink-0 py-6 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono text-white/18">
            © {new Date().getFullYear()} Pranita Panchal
          </span>
        </div>
      </footer>
    </div>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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