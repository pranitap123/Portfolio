import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { SectionBlock, Prose } from "@/components/case-study/Section";
import { TableOfContents } from "@/components/case-study/TableOfContents";
import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";
import { AuthFlowDiagram } from "@/components/case-study/AuthFlowDiagram";
import { SchemaDiagram } from "@/components/case-study/SchemaDiagram";
import { EncryptionSection } from "@/components/case-study/EncryptionSection";
import { ApiEndpoints } from "@/components/case-study/ApiEndpoints";
import { ContainerSection } from "@/components/case-study/ContainerSection";
import { DecisionTable } from "@/components/case-study/DecisionTable";
import {
  mission,
  challenges,
  lessonsLearned,
  futureImprovements,
} from "@/lib/data/securevault";

export const metadata: Metadata = {
  title: "SecureVault — Case Study | Pranita Panchal",
  description:
    "Engineering case study: SecureVault Backend — an encrypted secrets management API built with Node.js, TypeScript, PostgreSQL, AES-256-GCM, JWT, Prisma, and Docker.",
  openGraph: {
    title: "SecureVault Backend — Engineering Case Study",
    description:
      "Production-grade encrypted secrets management platform. Architecture, security design, and implementation decisions.",
  },
};

export default function SecureVaultPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CaseStudyHero />

        {/* Two-column layout: TOC (sticky left) + content (right) */}
        <div className="max-w-5xl mx-auto">
          <div className="relative xl:grid xl:grid-cols-[200px_1fr] xl:gap-12">

            {/* Sticky TOC — xl only */}
            <aside className="hidden xl:block">
              <div className="px-6 md:px-0 lg:pl-20 xl:pl-20 pt-16">
                <TableOfContents />
              </div>
            </aside>

            {/* Main content column */}
            <div className="min-w-0">

              {/* ── Section 1: Mission ───────────────────────────────── */}
              <SectionBlock id="mission" label="01 — Overview" heading="The Mission">
                {mission.problem.split("\n\n").map((para, i) => (
                  <Prose key={i}>{para}</Prose>
                ))}

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mission.requirements.map((req) => (
                    <div key={req.category} className="border border-white/[0.07] rounded-sm p-5">
                      <div className="text-[10px] font-mono font-semibold text-[#C5A880]/70 uppercase tracking-widest mb-4">
                        {req.category}
                      </div>
                      <ul className="space-y-2.5">
                        {req.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#C5A880]/40 mt-1.5 shrink-0" aria-hidden="true" />
                            <span className="text-xs text-white/45 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              {/* ── Section 2: Architecture ──────────────────────────── */}
              <SectionBlock id="architecture" label="02 — System Design" heading="Architecture Overview">
                <Prose>
                  SecureVault follows a strict layered architecture where each layer has a single, explicit responsibility. The encryption layer is the most important constraint: it sits between business logic and the ORM, ensuring that no code outside that layer ever writes a plaintext secret to the database — even if a developer makes an error in the service layer above it.
                </Prose>
                <div className="mt-8">
                  <ArchitectureDiagram />
                </div>
              </SectionBlock>

              {/* ── Section 3: Auth ──────────────────────────────────── */}
              <SectionBlock id="auth" label="03 — Security" heading="Authentication Flow">
                <AuthFlowDiagram />
              </SectionBlock>

              {/* ── Section 4: Database ──────────────────────────────── */}
              <SectionBlock id="database" label="04 — Data Layer" heading="Database Design">
                <SchemaDiagram />
              </SectionBlock>

              {/* ── Section 5: Encryption ───────────────────────────── */}
              <SectionBlock
                id="encryption"
                label="05 — Cryptography"
                heading="Encryption Model"
                accent
              >
                <EncryptionSection />
              </SectionBlock>

              {/* ── Section 6: API ───────────────────────────────────── */}
              <SectionBlock id="api" label="06 — Interface" heading="API Design">
                <ApiEndpoints />
              </SectionBlock>

              {/* ── Section 7: Containers ───────────────────────────── */}
              <SectionBlock id="containers" label="07 — Infrastructure" heading="Containerization">
                <ContainerSection />
              </SectionBlock>

              {/* ── Section 8: Decisions ────────────────────────────── */}
              <SectionBlock id="decisions" label="08 — Rationale" heading="Engineering Decisions">
                <DecisionTable />
              </SectionBlock>

              {/* ── Section 9: Challenges ───────────────────────────── */}
              <SectionBlock id="challenges" label="09 — Complexity" heading="Challenges & Trade-offs">
                <Prose>
                  Production-grade systems surface problems that toy implementations never encounter. These are the genuinely hard parts of building SecureVault.
                </Prose>
                <div className="mt-8 space-y-6">
                  {challenges.map((c, i) => (
                    <div key={c.title} className="border border-white/[0.07] rounded-sm p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <span className="text-[10px] font-mono text-white/20 mt-1 shrink-0 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm font-semibold text-white">{c.title}</h3>
                      </div>
                      <p className="text-sm text-white/45 leading-[1.85] pl-7">{c.description}</p>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              {/* ── Section 10: Lessons ─────────────────────────────── */}
              <SectionBlock id="lessons" label="10 — Retrospective" heading="Lessons Learned">
                <Prose>
                  What would be done differently with the benefit of hindsight. These are not failures — they are the natural output of engineering under uncertainty.
                </Prose>
                <div className="mt-8 space-y-0 divide-y divide-white/[0.06]">
                  {lessonsLearned.map((l) => (
                    <div key={l.lesson} className="py-6 first:pt-0 last:pb-0">
                      <h3 className="text-sm font-semibold text-white mb-3">{l.lesson}</h3>
                      <p className="text-sm text-white/45 leading-[1.85]">{l.detail}</p>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              {/* ── Section 11: Future ──────────────────────────────── */}
              <SectionBlock id="future" label="11 — Roadmap" heading="Future Improvements">
                <Prose>
                  The following improvements are scoped and prioritized. High-priority items address security and compliance gaps; medium-priority items address operational maturity.
                </Prose>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {futureImprovements.map((item) => (
                    <div key={item.title} className="border border-white/[0.07] rounded-sm p-5 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{item.title}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${
                            item.priority === "High"
                              ? "text-orange-400/80 border-orange-400/20 bg-orange-400/[0.05]"
                              : item.priority === "Medium"
                              ? "text-[#C5A880]/70 border-[#C5A880]/20 bg-[#C5A880]/[0.04]"
                              : "text-white/30 border-white/[0.08]"
                          }`}
                        >
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </SectionBlock>

            </div>
          </div>
        </div>

        <PageFooter />
      </main>
    </>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────

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
              <Link href="/projects" className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/engineering" className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm">
                Engineering
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm font-medium text-black bg-white px-4 py-1.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function PageFooter() {
  return (
    <div className="border-t border-white/[0.06] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-white/30 mb-1">SecureVault Backend</p>
          <p className="text-[11px] text-white/18 font-mono">
            Authored by Pranita Panchal · Node.js · TypeScript · PostgreSQL · Docker
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="text-sm text-white/35 border border-white/[0.08] px-5 py-2.5 rounded-sm hover:border-white/20 hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            ← All Projects
          </Link>
          <a
            href="https://github.com/pranitap123/securevault-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/35 border border-white/[0.08] px-5 py-2.5 rounded-sm hover:border-white/20 hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black inline-flex items-center gap-2"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}