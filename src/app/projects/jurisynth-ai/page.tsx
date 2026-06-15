import type { Metadata } from "next";
import Link from "next/link";

// ── Shared case-study components ──────────────────────────────────────────────
import { SectionBlock, Prose } from "@/components/case-study/SectionBlock";

// ── JuriSynth-specific components ─────────────────────────────────────────────
import { RAGPipeline }         from "@/components/case-study/jurisynth/RAGPipeline";
import { VectorArchitecture }  from "@/components/case-study/jurisynth/VectorArchitecture";
import { AgentWorkflow }       from "@/components/case-study/jurisynth/AgentWorkflow";
import { CitationEngine }      from "@/components/case-study/jurisynth/CitationEngine";
import { EvaluationSection }   from "@/components/case-study/jurisynth/EvaluationSection";

// ── Data ──────────────────────────────────────────────────────────────────────
import {
  meta,
  sections,
  mission,
  architectureLayers,
  authSecurity,
  apiEndpoints,
  databaseDesign,
  containerization,
  engineeringDecisions,
  challenges,
  lessonsLearned,
  futureImprovements,
} from "@/lib/data/jurisynth-ai";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Jurisynth AI — Case Study | Pranita Panchal",
  description:
    "Engineering case study: Jurisynth AI — an AI-powered legal research platform built with RAG, multi-agent reasoning, vector search, Node.js, Express, MongoDB, and React.",
  openGraph: {
    title: "Jurisynth AI — Engineering Case Study",
    description:
      "Production-deployed AI legal research platform: RAG pipeline, multi-agent orchestration, citation attribution engine.",
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function JurisynthPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <JurisynthHero />

        <div className="max-w-5xl mx-auto">
          <div className="relative xl:grid xl:grid-cols-[200px_1fr] xl:gap-12">

            {/* Sticky ToC — xl only */}
            <aside className="hidden xl:block">
              <div className="px-6 md:px-0 lg:pl-20 xl:pl-20 pt-16">
                <JurisynthTOC />
              </div>
            </aside>

            {/* Main content */}
            <div className="min-w-0">

              {/* ── 01 Mission ─────────────────────────────────────────── */}
              <SectionBlock id="mission" label="01 — Overview" heading="Mission & Problem Statement">
                {mission.problem.split("\n\n").map((para, i) => (
                  <Prose key={i}>{para}</Prose>
                ))}

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Goals — spans 2 cols */}
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

              {/* ── 02 Architecture ────────────────────────────────────── */}
              <SectionBlock id="architecture" label="02 — System Design" heading="System Architecture">
                <Prose>
                  Jurisynth is a full-stack AI platform with a clear separation between the web
                  application layer and the AI inference layer. The Express API acts as the
                  orchestration boundary — it handles authentication, rate limiting, and request
                  routing, then delegates to the RAG pipeline and agent layer for all AI operations.
                  This separation means the AI pipeline is independently testable, swappable, and
                  scalable without changing the API contract.
                </Prose>
                <div className="mt-8">
                  <ArchLayersVisual />
                </div>
              </SectionBlock>

              {/* ── 03 RAG Pipeline ────────────────────────────────────── */}
              <SectionBlock
                id="rag"
                label="03 — Core AI"
                heading="Retrieval-Augmented Generation Pipeline"
                accent
              >
                <RAGPipeline />
              </SectionBlock>

              {/* ── 04 Vector Architecture ─────────────────────────────── */}
              <SectionBlock id="vectors" label="04 — Retrieval" heading="Embedding & Vector Architecture">
                <VectorArchitecture />
              </SectionBlock>

              {/* ── 05 Agent Workflow ───────────────────────────────────── */}
              <SectionBlock id="agents" label="05 — AI Orchestration" heading="Multi-Agent Reasoning Workflow">
                <AgentWorkflow />
              </SectionBlock>

              {/* ── 06 Citation Engine ─────────────────────────────────── */}
              <SectionBlock id="citations" label="06 — Attribution" heading="Citation & Source Attribution Engine" accent>
                <CitationEngine />
              </SectionBlock>

              {/* ── 07 Auth ────────────────────────────────────────────── */}
              <SectionBlock id="auth" label="07 — Security" heading="Authentication & Authorization">
                <Prose>{authSecurity.description}</Prose>
                <AuthSection />
              </SectionBlock>

              {/* ── 08 API Design ──────────────────────────────────────── */}
              <SectionBlock id="api" label="08 — Interface" heading="API Design">
                <Prose>
                  All endpoints are served by Express with JWT middleware on every protected route.
                  Zod schemas validate request bodies before any pipeline execution — invalid
                  payloads are rejected with structured error objects before consuming LLM credits.
                  LLM calls are the most expensive operation: rate limiting by{" "}
                  <code className="text-[#C5A880]/80 bg-[#C5A880]/06 px-1.5 py-0.5 rounded text-[11px] font-mono">
                    userId
                  </code>{" "}
                  prevents runaway queries and is enforced before the request reaches the pipeline.
                </Prose>
                <div className="mt-8">
                  <JurisynthApiEndpoints />
                </div>
              </SectionBlock>

              {/* ── 09 Database ────────────────────────────────────────── */}
              <SectionBlock id="database" label="09 — Data Layer" heading="Database Design & Indexing">
                <Prose>{databaseDesign.description}</Prose>
                <DatabaseSection />
              </SectionBlock>

              {/* ── 10 Evaluation ──────────────────────────────────────── */}
              <SectionBlock id="evaluation" label="10 — Quality" heading="RAG Evaluation & Metrics">
                <EvaluationSection />
              </SectionBlock>

              {/* ── 11 Deployment ──────────────────────────────────────── */}
              <SectionBlock id="containers" label="11 — Infrastructure" heading="Docker Deployment Architecture">
                <Prose>{containerization.description}</Prose>
                <DeploymentSection />
              </SectionBlock>

              {/* ── 12 Decisions ───────────────────────────────────────── */}
              <SectionBlock id="decisions" label="12 — Rationale" heading="Engineering Decisions & Trade-offs">
                <JurisynthDecisionTable />
              </SectionBlock>

              {/* ── 13 Challenges ──────────────────────────────────────── */}
              <SectionBlock id="challenges" label="13 — Complexity" heading="Challenges Encountered">
                <Prose>
                  AI systems surface a category of engineering problems that conventional software
                  never encounters. These are the hardest parts of building Jurisynth.
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

              {/* ── 14 Lessons ─────────────────────────────────────────── */}
              <SectionBlock id="lessons" label="14 — Retrospective" heading="Lessons Learned">
                <div className="space-y-0 divide-y divide-white/[0.06]">
                  {lessonsLearned.map((l) => (
                    <div key={l.lesson} className="py-6 first:pt-0 last:pb-0">
                      <h3 className="text-sm font-semibold text-white mb-3">{l.lesson}</h3>
                      <p className="text-sm text-white/45 leading-[1.85]">{l.detail}</p>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              {/* ── 15 Future ──────────────────────────────────────────── */}
              <SectionBlock id="future" label="15 — Roadmap" heading="Future Improvements">
                <Prose>
                  Prioritised by impact on retrieval quality, operational reliability, and user
                  experience.
                </Prose>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {futureImprovements.map((item) => (
                    <div
                      key={item.title}
                      className="border border-white/[0.07] rounded-sm p-5 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-white">{item.title}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border shrink-0 ${
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

// ─────────────────────────────────────────────────────────────────────────────
// Inline Server Components
// These are self-contained, data-driven, and specific to JuriSynth.
// They live here to avoid creating thin single-use files.
// ─────────────────────────────────────────────────────────────────────────────

/** Layered architecture grid — maps architectureLayers to annotation cards */
function ArchLayersVisual() {
  const TYPE_ACCENT: Record<string, string> = {
    frontend: "border-white/[0.1]",
    api:      "border-white/[0.08]",
    auth:     "border-[#C5A880]/25",
    ai:       "border-[#C5A880]/30",
    agents:   "border-[#C5A880]/25",
    vector:   "border-[#C5A880]/20",
    db:       "border-white/[0.08]",
  };
  const TYPE_LABEL: Record<string, string> = {
    frontend: "text-white/60",
    api:      "text-white/55",
    auth:     "text-[#C5A880]/80",
    ai:       "text-[#C5A880]",
    agents:   "text-[#C5A880]/90",
    vector:   "text-[#C5A880]/75",
    db:       "text-white/55",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {architectureLayers.map((layer, i) => (
        <div
          key={layer.id}
          className={`border rounded-sm p-4 hover:bg-white/[0.02] transition-colors ${
            TYPE_ACCENT[layer.type] ?? "border-white/[0.08]"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-mono text-white/18 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-[11px] font-mono font-semibold ${
                TYPE_LABEL[layer.type] ?? "text-white/55"
              }`}
            >
              {layer.label}
            </span>
          </div>
          <div className="text-[10px] font-mono text-white/25 mb-2">{layer.tech}</div>
          <p className="text-xs text-white/38 leading-relaxed">{layer.description}</p>
        </div>
      ))}
    </div>
  );
}

/** Auth flow steps + roles + security notes */
function AuthSection() {
  return (
    <div className="mt-8 space-y-10">
      {/* Auth flow */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          Authentication Lifecycle
        </div>
        <div className="relative">
          <div className="absolute left-3 top-3 bottom-3 w-px bg-white/[0.06]" aria-hidden="true" />
          <div className="space-y-0">
            {authSecurity.authFlow.map((s, i) => (
              <div
                key={s.step}
                className="flex items-start gap-5 py-3.5 border-b border-white/[0.04] last:border-0"
              >
                <div className="relative z-10 shrink-0 w-6 h-6 rounded-full border border-white/[0.1] bg-[#080808] flex items-center justify-center mt-0.5">
                  <span className="text-[10px] font-mono text-white/30 tabular-nums">{i + 1}</span>
                </div>
                <div>
                  <div className="text-sm font-mono font-semibold text-white/75 mb-0.5">{s.step}</div>
                  <div className="text-xs text-white/38 leading-relaxed">{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RBAC roles */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-5">
          Role-Based Authorization
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {authSecurity.roles.map((r) => (
            <div key={r.role} className="border border-white/[0.08] rounded-sm overflow-hidden">
              <div
                className={`px-4 py-3 border-b border-white/[0.06] ${
                  r.role === "ADMIN" ? "bg-[#C5A880]/08" : "bg-white/[0.02]"
                }`}
              >
                <span
                  className={`text-xs font-mono font-semibold ${
                    r.role === "ADMIN" ? "text-[#C5A880]/90" : "text-white/55"
                  }`}
                >
                  {r.role}
                </span>
              </div>
              <ul className="divide-y divide-white/[0.04]">
                {r.permissions.map((perm) => (
                  <li key={perm} className="px-4 py-2.5 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/18 shrink-0" aria-hidden="true" />
                    <span className="text-xs text-white/38">{perm}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Security notes */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          Security Implementation Decisions
        </div>
        <div className="space-y-3">
          {authSecurity.securityNotes.map((n) => (
            <div
              key={n.topic}
              className="flex items-start gap-5 p-5 border border-white/[0.07] rounded-sm"
            >
              <span className="text-[11px] font-mono font-semibold text-[#C5A880]/70 min-w-[130px] shrink-0">
                {n.topic}
              </span>
              <p className="text-xs text-white/40 leading-relaxed">{n.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Accordion API endpoint cards — reads from jurisynth-ai.ts */
function JurisynthApiEndpoints() {
  // Note: this is a Server Component — no useState for accordion.
  // We render all panels open as a static list. For interactive accordion,
  // extract to a "use client" component. Keeping it simple here.
  const METHOD_COLORS: Record<string, { text: string; border: string; bg: string }> = {
    GET:    { text: "text-emerald-400",  border: "border-emerald-400/20", bg: "bg-emerald-400/[0.06]" },
    POST:   { text: "text-blue-400",     border: "border-blue-400/20",    bg: "bg-blue-400/[0.06]" },
    PUT:    { text: "text-orange-400",   border: "border-orange-400/20",  bg: "bg-orange-400/[0.06]" },
    DELETE: { text: "text-red-400",      border: "border-red-400/20",     bg: "bg-red-400/[0.06]" },
  };

  return (
    <div className="space-y-3">
      {apiEndpoints.map((ep) => {
        const colors = METHOD_COLORS[ep.method] ?? METHOD_COLORS.GET;
        return (
          <div key={ep.path} className="border border-white/[0.08] rounded-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-4 px-5 py-4 bg-white/[0.02]">
              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-sm border shrink-0 ${colors.text} ${colors.border} ${colors.bg}`}
              >
                {ep.method}
              </span>
              <span className="text-sm font-mono text-white/75 flex-1">{ep.path}</span>
              <span className="text-xs text-white/28 hidden sm:block">{ep.description}</span>
              {ep.auth && (
                <span className="text-[10px] font-mono text-[#C5A880]/60 border border-[#C5A880]/20 px-2 py-0.5 rounded-sm shrink-0">
                  Auth
                </span>
              )}
            </div>

            {/* Request / Response panels */}
            <div className="border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06]">
              {ep.request !== null && (
                <div className="bg-[#080808] p-5">
                  <div className="text-[10px] font-mono text-white/22 uppercase tracking-widest mb-3">
                    Request Body
                  </div>
                  <pre className="text-[11px] font-mono text-white/50 leading-relaxed whitespace-pre overflow-x-auto">
                    {ep.request}
                  </pre>
                </div>
              )}
              <div className={`bg-[#080808] p-5 ${ep.request === null ? "sm:col-span-2" : ""}`}>
                <div className="text-[10px] font-mono text-white/22 uppercase tracking-widest mb-3">
                  Response
                </div>
                <pre className="text-[11px] font-mono text-white/50 leading-relaxed whitespace-pre overflow-x-auto">
                  {ep.response}
                </pre>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** MongoDB collections + index notes */
function DatabaseSection() {
  return (
    <div className="mt-8 space-y-8">
      {/* Collections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {databaseDesign.collections.map((col) => (
          <div key={col.name} className="border border-white/[0.08] rounded-sm overflow-hidden">
            <div className="px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
              <span className="text-xs font-mono font-semibold text-white/65">{col.name}</span>
              <p className="text-[10px] text-white/25 mt-0.5">{col.description}</p>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {col.fields.map((f) => (
                <div key={f.field} className="px-4 py-2.5 flex items-start gap-3">
                  <span className="text-[11px] font-mono text-white/60 min-w-[110px] shrink-0">{f.field}</span>
                  <span className="text-[11px] font-mono text-[#C5A880]/55 min-w-[70px] shrink-0">{f.type}</span>
                  <span className="text-[10px] text-white/22 leading-relaxed">{f.note}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Indexes */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          Indexing Strategy
        </div>
        <div className="divide-y divide-white/[0.05]">
          {databaseDesign.indexes.map((note, i) => (
            <div key={i} className="py-3 flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-[#C5A880]/40 mt-1.5 shrink-0" aria-hidden="true" />
              <span className="text-xs text-white/40 leading-relaxed font-mono">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Docker service inventory + startup order + code panels */
function DeploymentSection() {
  return (
    <div className="mt-8 space-y-8">
      {/* Service inventory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {containerization.services.map((svc) => (
          <div
            key={svc.name}
            className="flex items-center gap-4 p-4 border border-white/[0.07] rounded-sm"
          >
            <span className="text-xs font-mono font-semibold text-[#C5A880]/70 min-w-[80px] shrink-0">
              {svc.name}
            </span>
            <div>
              <div className="text-[11px] font-mono text-white/38">{svc.image}</div>
              <div className="text-[10px] text-white/22 mt-0.5">{svc.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Startup order */}
      <div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-4">
          Startup Dependency Order
        </div>
        <div className="overflow-x-auto rounded-sm border border-white/[0.07]">
          <table className="w-full min-w-[480px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                {["Service", "Depends On", "Reason"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="text-left py-2.5 px-4 text-[10px] font-mono font-semibold text-white/28 tracking-widest uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {containerization.startupOrder.map((row) => (
                <tr
                  key={row.service}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.015] transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-mono font-semibold text-white/60">{row.service}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {row.dependsOn.length > 0 ? (
                        row.dependsOn.map((d) => (
                          <span
                            key={d}
                            className="text-[10px] font-mono text-[#C5A880]/60 border border-[#C5A880]/20 px-1.5 py-0.5 rounded-sm"
                          >
                            {d}
                          </span>
                        ))
                      ) : (
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
        <CodePanel title="docker-compose.yml" code={containerization.compose} />
      </div>
    </div>
  );
}

function CodePanel({ title, code }: { title: string; code: string }) {
  return (
    <div className="border border-white/[0.08] rounded-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-white/10" aria-hidden="true" />
        <span className="text-[11px] font-mono text-white/30">{title}</span>
      </div>
      <pre className="p-4 text-[11px] font-mono text-white/45 leading-relaxed overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

/** Engineering decisions table — reads from jurisynth-ai.ts */
function JurisynthDecisionTable() {
  return (
    <div className="space-y-8">
      <Prose>
        Each technology choice was evaluated against the specific constraints of an AI-powered legal
        research system: retrieval quality, citation integrity, cost per query, and deployment
        simplicity.
      </Prose>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08]">
              {["Decision", "Chosen", "Alternative", "Rationale"].map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="text-left py-3 px-4 text-[10px] font-mono font-semibold text-white/28 tracking-widest uppercase first:pl-0"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {engineeringDecisions.map((row) => (
              <tr
                key={row.decision}
                className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors align-top"
              >
                <td className="py-5 px-4 first:pl-0">
                  <span className="text-xs font-mono font-semibold text-white/65">{row.decision}</span>
                </td>
                <td className="py-5 px-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C5A880]/85 border border-[#C5A880]/20 bg-[#C5A880]/05 px-2.5 py-1 rounded-sm whitespace-nowrap">
                    <span className="w-1 h-1 rounded-full bg-[#C5A880]/60" aria-hidden="true" />
                    {row.chosen}
                  </span>
                </td>
                <td className="py-5 px-4">
                  <span className="text-xs font-mono text-white/28 line-through">{row.alternative}</span>
                </td>
                <td className="py-5 px-4 max-w-xs">
                  <span className="text-xs text-white/42 leading-relaxed">{row.reason}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Sticky Table of Contents ─────────────────────────────────────────────────
// Self-contained client component — reads jurisynth sections directly.

import { JurisynthTOCClient } from "@/components/case-study/jurisynth/JurisynthTOC";

function JurisynthTOC() {
  return <JurisynthTOCClient sections={sections} />;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function JurisynthHero() {
  return (
    <section
      aria-labelledby="jurisynth-hero-heading"
      className="pt-32 pb-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-white/25 font-mono mb-8"
        >
          <Link href="/" className="hover:text-white/50 transition-colors">
            home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-white/50 transition-colors">
            projects
          </Link>
          <span>/</span>
          <span className="text-white/50">jurisynth-ai</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-16">
          <div>
            {/* Categories */}
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
              id="jurisynth-hero-heading"
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

              {meta.live && (
                <a
                  href={meta.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#C5A880]/70 border border-[#C5A880]/20 px-5 py-2.5 rounded-sm hover:bg-[#C5A880]/10 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <ExternalIcon className="w-4 h-4" />
                  Live Demo
                </a>
              )}

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
                <span className="text-sm font-mono font-semibold text-white leading-tight">
                  {s.value}
                </span>
                <span className="text-[10px] font-mono text-white/28 uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

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

// ─── Footer ───────────────────────────────────────────────────────────────────

function PageFooter() {
  return (
    <div className="border-t border-white/[0.06] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-white/30 mb-1">Jurisynth AI</p>
          <p className="text-[11px] text-white/18 font-mono">
            Authored by Pranita Panchal · Node.js · Express · MongoDB · React · RAG
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

// ─── Icons ────────────────────────────────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
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
        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}