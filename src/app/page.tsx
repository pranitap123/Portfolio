import type { Metadata } from "next";
import { projects } from "@/lib/data/projects";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ComparisonTable } from "@/components/projects/ComparisonTable";
import { EngineeringDecisions } from "@/components/projects/EngineeringDecisions";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects — Pranita Panchal",
  description:
    "Production-oriented engineering projects: SecureVault (encrypted secrets API), ARGUS-PRISM (Kafka threat intelligence platform), and Jurisynth AI (legal SaaS). Backend, distributed systems, and infrastructure.",
  openGraph: {
    title: "Engineering Projects — Pranita Panchal",
    description:
      "Backend engineering, distributed systems, and AI-powered SaaS projects built to production standard.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <ProjectsHero />

        {/* Project cards — full-width, stacked */}
        <div role="feed" aria-label="Engineering projects">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <ComparisonTable />
        <EngineeringDecisions />
        <PageFooter />
      </main>
    </>
  );
}

// ─── Shared Nav (matches homepage) ──────────────────────────────────────────

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
        <Link
          href="/"
          className="text-sm font-semibold text-white tracking-tight hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
        >
          Pranita Panchal
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            <li>
              <Link
                href="/projects"
                aria-current="page"
                className="text-sm text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
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

// ─── Page footer ─────────────────────────────────────────────────────────────

function PageFooter() {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm text-white/40 mb-1">All projects are independently designed and built.</p>
          <p className="text-xs text-white/20 font-mono">Architecture, implementation, and deployment by Pranita Panchal.</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/35 border border-white/[0.08] px-5 py-2.5 rounded-sm hover:border-white/20 hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}