import type { Metadata } from "next";
import Link from "next/link";

// ── Shared case-study components (reused from SecureVault) ────────────────────
import { SectionBlock, Prose } from "@/components/case-study/SectionBlock";
import { TableOfContents } from "@/components/case-study/TableOfContents";
import { ApiEndpoints } from "@/components/case-study/ApiEndpoints";
import { DecisionTable } from "@/components/case-study/DecisionTable";

// ── ARGUS-specific components ─────────────────────────────────────────────────
import { ArgusArchDiagram } from "@/components/case-study/argus/ArgusArchDiagram";
import { DetectionPipeline } from "@/components/case-study/argus/DetectionPipeline";
import { GraphSchemaDiagram } from "@/components/case-study/argus/GraphSchemaDiagram";
import { ArgusAuthSection } from "@/components/case-study/argus/ArgusAuthSection";

// ── Data ──────────────────────────────────────────────────────────────────────
import {
  meta,
  sections,
  mission,
  challenges,
  lessonsLearned,
  futureImprovements,
  containerization,
  engineeringDecisions,
} from "@/lib/data/argus-prism";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "ARGUS-PRISM — Case Study | Pranita Panchal",
  description:
    "Engineering case study: ARGUS-PRISM — a real-time threat intelligence and graph analysis platform built with FastAPI, Apache Kafka, Neo4j, PostgreSQL, and Docker.",
  openGraph: {
    title: "ARGUS-PRISM — Engineering Case Study",
    description:
      "Event-driven threat intelligence platform: Kafka-powered ingestion, Neo4j graph analysis, FastAPI query layer.",
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ArgusPrismPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <ArgusHero />

        <div className="max-w-5xl mx-auto">
          <div className="relative xl:grid xl:grid-cols-[200px_1fr] xl:gap-12">

            {/* Sticky ToC */}
            <aside className="hidden xl:block">
              <div className="px-6 md:px-0 lg:pl-20 xl:pl-20 pt-16">
                <TableOfContents sections={sections} />
              </div>
            </aside>

            {/* Main content */}
            <div className="min-w-0">

              {/* ── 01 Mission ──────────────────────────────────────── */}
              <SectionBlock id="mission" label="01 — Overview" heading="The Mission">
                {mission.problem.split("\n\n").map((para, i) => (
                  <Prose key={i}>{para}</Prose>
                ))}

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Goals */}
                  <div className="sm:col-span-2 border border-white/[0.07] rounded-sm p-5">
                    <div className="text-[10px] font-mono font-semibold text-[#C5A880]/70 uppercase tracking-widest mb-4">
                      Design Goals
                    </div>
                    <ul className="space-y-2.5">
                      {mission.goals.map((g) => (
                        <li key={g} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#C5A880]/40 mt-1.5 shrink-0" aria-hidden="true" />
                          <span className="text-xs text-white/45 leading-relaxed">{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Target users */}
                  <div className="border border-white/[0.07] rounded-sm p-5">
                    <div className="text-[10px] font-mono font-semibold text-[#C5A880]/70 uppercase tracking-widest mb-4">
                      Users
                    </div>
                    <div className="space-y-4">
                      {mission.targetUsers.map((u) => (
                        <div key={u.role}>
                          <div className="text-xs font-semibold text-white/70 mb-1">{u.role}</div>
                          <p className="text-xs text-white/35 leading-relaxed">{u.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionBlock>

              {/* ── 02 Architecture ─────────────────────────────────── */}
              <SectionBlock id="architecture" label="02 — System Design" heading="System Architecture">
                <Prose>
                  ARGUS-PRISM is an event-driven system, not a request-response system. The fundamental design decision is that ingestion and analysis are decoupled through Apache Kafka — a producer can publish events at any rate, and the analysis pipeline processes them independently. This means the API never blocks on detection logic, and the detection pipeline can be scaled, upgraded, or replaced without touching the ingestion path.
                </Prose>
                <div className="mt-8">
                  <ArgusArchDiagram />
                </div>
              </SectionBlock>

              {/* ── 03 Auth ─────────────────────────────────────────── */}
              <SectionBlock id="auth" label="03 — Security" heading="Authentication & Security">
                <ArgusAuthSection />
              </SectionBlock>

              {/* ── 04 Database ─────────────────────────────────────── */}
              <SectionBlock id="database" label="04 — Data Layer" heading="Database Design">
                <GraphSchemaDiagram />
              </SectionBlock>

              {/* ── 05 Detection Pipeline ───────────────────────────── */}
              <SectionBlock
                id="pipeline"
                label="05 — Core Engine"
                heading="Detection Pipeline"
                accent
              >
                <DetectionPipeline />
              </SectionBlock>

              {/* ── 06 API ──────────────────────────────────────────── */}
              <SectionBlock id="api" label="06 — Interface" heading="API Design">
                <Prose>
                  All endpoints are served by an async FastAPI application. Pydantic v2 models define the schema for every request and response — FastAPI generates the OpenAPI documentation automatically from these models. Authentication is enforced by a FastAPI dependency injection pattern: a <code className="text-[#C5A880]/80 bg-[#C5A880]/06 px-1.5 py-0.5 rounded text-[11px] font-mono">get_current_user</code> dependency is declared on every protected route, eliminating the possibility of accidentally exposing a route without auth enforcement.
                </Prose>
                <div className="mt-8">
                  <ApiEndpoints endpoints={apiEndpoints} />
                </div>
              </SectionBlock>

              {/* ── 07 Containers ───────────────────────────────────── */}
              <SectionBlock id="containers" label="07 — Infrastructure" heading="Containerization & Deployment">
                <ContainerSection />
              </SectionBlock>

              {/* ── 08 Decisions ────────────────────────────────────── */}
              <SectionBlock id="decisions" label="08 — Rationale" heading="Engineering Decisions">
                <DecisionTable decisions={engineeringDecisions} />
              </SectionBlock>

              {/* Challenges */}
              <SectionBlock id="challenges" label="09 — Complexity" heading="Challenges Faced">
                <Prose>
                  Distributed systems surface a class of problems that single-process architectures never encounter. These are the genuinely hard parts of building ARGUS-PRISM.
                </Prose>
                <div className="mt-8 space-y-5">
                  {challenges.map((c, i) => (
                    <div key={c.title} className="border border-white/[0.07] rounded-sm p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-[10px] font-mono text-white/20 mt-0.5 shrink-0 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm font-semibold text-white">{c.title}</h3>
                      </div>
                      <p className="text-sm text-white/45 leading-[1.85] pl-7">{c.description}</p>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              {/* ── 10 Lessons ──────────────────────────────────────── */}
              <SectionBlock id="lessons" label="10 — Retrospective" heading="Lessons Learned">
                <div className="space-y-0 divide-y divide-white/[0.06]">
                  {lessonsLearned.map((l) => (
                    <div key={l.lesson} className="py-6 first:pt-0 last:pb-0">
                      <h3 className="text-sm font-semibold text-white mb-3">{l.lesson}</h3>
                      <p className="text-sm text-white/45 leading-[1.85]">{l.detail}</p>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              {/* ── 11 Future ───────────────────────────────────────── */}
              <SectionBlock id="future" label="11 — Roadmap" heading="Future Improvements">
                <Prose>
                  The following improvements are scoped and prioritized based on their impact on reliability, performance, and operational maturity.
                </Prose>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {futureImprovements.map((item) => (
                    <div key={item.title} className="border border-white/[0.07] rounded-sm p-5 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-white">{item.title}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border shrink-0 ${
                          item.priority === "High"
                            ? "text-orange-400/80 border-orange-400/20 bg-orange-400/[0.05]"
                            : item.priority === "Medium"
                            ? "text-[#C5A880]/70 border-[#C5A880]/20 bg-[#C5A880]/[0.04]"
                            : "text-white/30 border-white/[0.08]"
                        }`}>
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

// ── Inline server components ──────────────────────────────────────────────────

// Re-export from data for use in page (avoids cross-component import in page.tsx)
import { apiEndpoints } from "@/lib/data/argus-prism";

function ArgusHero() {
  return (
    <section
      aria-labelledby="argus-hero-heading"
      className="pt-32 pb-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/25 font-mono mb-8">
          <Link href="/" className="hover:text-white/50 transition-colors">home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-white/50 transition-colors">projects</Link>
          <span>/</span>
          <span className="text-white/50">argus-prism</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-16">
          <div>
            {/* Category badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {meta.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/70 border border-[#C5A880]/20 bg-[#C5A880]/5 px-3 py-1 rounded-sm"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1
              id="argus-hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.06] mb-4"
            >
              {meta.title}
            </h1>

            <p className="text-lg text-white/40 mb-8 max-w-xl leading-relaxed">
              {meta.subtitle}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {meta.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono text-white/40 border border-white/[0.1] bg-white/[0.03] px-2.5 py-1 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <GitHubIcon className="w-4 h-4" />
                View on GitHub
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-white/40 border border-white/[0.1] px-5 py-2.5 rounded-sm hover:border-white/20 hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                ← All Projects
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-sm overflow-hidden self-start">
            {meta.stats.map((s) => (
              <div key={s.label} className="bg-[#080808] p-5 flex flex-col gap-1">
                <span className="text-sm font-mono font-semibold text-white leading-tight">{s.value}</span>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContainerSection() {
  return (
    <div className="space-y-10">
      <Prose>
        ARGUS-PRISM comprises seven services. Docker Compose provides declarative startup ordering through healthcheck-gated <code className="text-[#C5A880]/80 bg-[#C5A880]/06 px-1.5 py-0.5 rounded text-[11px] font-mono">depends_on</code> conditions — the consumer and API do not start until Kafka, Neo4j, and PostgreSQL all pass their health checks. This is non-trivial for Kafka, which requires ZooKeeper to be ready before it can start accepting connections.
      </Prose>

      {/* Service inventory */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">Service Inventory</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {containerization.services.map((svc) => (
            <div key={svc.name} className="flex items-center gap-4 p-4 border border-white/[0.07] rounded-sm hover:bg-white/[0.02] transition-colors">
              <span className="text-xs font-mono font-semibold text-[#C5A880]/70 min-w-[80px]">{svc.name}</span>
              <div>
                <div className="text-[11px] font-mono text-white/40">{svc.image}</div>
                <div className="text-[10px] text-white/25">{svc.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Startup order */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          Startup Dependency Order
        </div>
        <div className="overflow-x-auto rounded-sm border border-white/[0.07]">
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                {["Service", "Depends On", "Reason"].map((h) => (
                  <th key={h} scope="col" className="text-left py-2.5 px-4 text-[10px] font-mono font-semibold text-white/28 tracking-widest uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {containerization.startupOrder.map((row) => (
                <tr key={row.service} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.015] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-mono font-semibold text-white/65">{row.service}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {row.dependsOn.length > 0 ? row.dependsOn.map((d) => (
                        <span key={d} className="text-[10px] font-mono text-[#C5A880]/60 border border-[#C5A880]/20 px-1.5 py-0.5 rounded-sm">
                          {d}
                        </span>
                      )) : (
                        <span className="text-[10px] text-white/20 font-mono">none</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs text-white/35 leading-relaxed">{row.reason}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CodePanel title="Dockerfile (API)" code={containerization.dockerfile} />
        <CodePanel title="docker-compose.yml (excerpt)" code={containerization.compose} />
      </div>
    </div>
  );
}

function CodePanel({ title, code }: { title: string; code: string }) {
  return (
    <div className="border border-white/[0.08] rounded-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-white/10" aria-hidden="true" />
        <span className="text-[11px] font-mono text-white/35">{title}</span>
      </div>
      <pre className="p-4 text-[11px] font-mono text-white/48 leading-relaxed overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

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

// ── Footer ────────────────────────────────────────────────────────────────────

function PageFooter() {
  return (
    <div className="border-t border-white/[0.06] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-white/30 mb-1">ARGUS-PRISM</p>
          <p className="text-[11px] text-white/18 font-mono">
            Authored by Pranita Panchal · FastAPI · Kafka · Neo4j · PostgreSQL · Docker
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
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/35 border border-white/[0.08] px-5 py-2.5 rounded-sm hover:border-white/20 hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Icon ─────────────────────────────────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}