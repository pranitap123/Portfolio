import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { EngineeringFocus } from "@/components/home/EngineeringFocus";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Principles } from "@/components/home/Principles";
import { CurrentFocus } from "@/components/home/CurrentFocus";
import { KnowledgeBase } from "@/components/home/KnowledgeBase";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Pranita Panchal — Software Engineer",
  description:
    "Software Engineer specializing in Node.js, TypeScript, PostgreSQL, Docker, CI/CD, and distributed systems. Backend, Full-Stack, and DevOps.",
};

// This page itself is a Server Component — no "use client" needed here.
// All animation is encapsulated inside client boundary components.

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <EngineeringFocus />
        <FeaturedProjects />
        <Principles />
        <CurrentFocus />
        <KnowledgeBase />
        <ContactCTA />
      </main>
    </>
  );
}

// Nav is a minimal server component — no interactivity needed
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C5A880] focus:text-black focus:text-sm focus:font-medium focus:rounded-sm"
      >
        Skip to main content
      </a>

      <div className="max-w-5xl mx-auto h-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="text-sm font-semibold text-white tracking-tight hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
        >
          Pranita Panchal
        </Link>

        {/* Nav links */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            <li>
              <Link
                href="/projects"
                className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/engineering"
                className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
              >
                Engineering
              </Link>
            </li>
            <li>
              <Link
                href="/resume"
                className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
              >
                Resume
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-medium text-black bg-white px-4 py-1.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}