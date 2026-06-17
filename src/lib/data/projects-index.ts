// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectHighlight {
  label: string;
  detail: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: "Live" | "Open Source" | "In Development";
  tech: readonly string[];
  highlights: readonly ProjectHighlight[];
  metrics: readonly ProjectMetric[];
  github: string;
  live: string | null;
  caseStudyHref: string;
  diagramType: "securevault" | "argus" | "jurisynth" | "portfolio";
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: readonly Project[] = [
  {
    slug: "securevault",
    index: "01",
    name: "SecureVault",
    tagline: "Encrypted secrets management backend",
    description:
      "A production-grade REST API for storing, managing, and rotating application secrets with AES-256-GCM encryption at rest, JWT authentication with refresh token rotation, role-based access control, and containerized deployment.",
    category: "Backend Engineering · Security",
    status: "Open Source",
    tech: ["TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker", "JWT", "AES-256"],
    highlights: [
      { label: "Encryption",     detail: "AES-256-GCM authenticated encryption at the persistence boundary" },
      { label: "Auth",           detail: "JWT + refresh token rotation with single-use invalidation" },
      { label: "Access Control", detail: "Role-based permissions enforced at middleware, before handlers" },
      { label: "Deployment",     detail: "Multi-stage Dockerfile with health checks and Compose orchestration" },
    ],
    metrics: [
      { label: "Encryption", value: "AES-256-GCM"   },
      { label: "Auth",       value: "JWT + Refresh"  },
      { label: "Database",   value: "PostgreSQL"     },
      { label: "Pattern",    value: "REST / Layered" },
    ],
    github: "https://github.com/pranitap123/securevault-backend",
    live: null,
    caseStudyHref: "/projects/securevault",
    diagramType: "securevault",
  },
  {
    slug: "argus-prism",
    index: "02",
    name: "ARGUS-PRISM",
    tagline: "Real-time threat intelligence & graph analysis platform",
    description:
      "An event-driven threat detection system with Apache Kafka for high-throughput telemetry ingestion, Neo4j for threat actor relationship modeling, FastAPI for the async intelligence query layer, and a React dashboard for live graph visualization.",
    category: "Cybersecurity · Distributed Systems",
    status: "Open Source",
    tech: ["FastAPI", "Python", "Kafka", "Neo4j", "PostgreSQL", "Docker", "React"],
    highlights: [
      { label: "Event Pipeline",      detail: "Kafka consumer groups with at-least-once delivery and dead-letter queue" },
      { label: "Graph Intelligence",  detail: "Neo4j models threat actor → infrastructure → target relationships natively" },
      { label: "Stream Processing",   detail: "Decoupled ingestion and analysis — pipeline survives detection lag spikes" },
      { label: "Dual Database",       detail: "Neo4j for graph traversal, PostgreSQL for time-series event queries" },
    ],
    metrics: [
      { label: "Architecture", value: "Event-Driven"  },
      { label: "Broker",       value: "Apache Kafka"  },
      { label: "Graph DB",     value: "Neo4j"         },
      { label: "API",          value: "FastAPI Async" },
    ],
    github: "https://github.com/pranitap123/ARGUS---PRISM",
    live: null,
    caseStudyHref: "/projects/argus-prism",
    diagramType: "argus",
  },
  {
    slug: "jurisynth-ai",
    index: "03",
    name: "Jurisynth AI",
    tagline: "AI-powered legal research & citation intelligence platform",
    description:
      "A production-deployed legal research SaaS with a full RAG pipeline, multi-agent reasoning orchestration, and a citation engine that maps every generated claim to its exact source span — eliminating hallucinated legal citations.",
    category: "AI Engineering · Full-Stack SaaS",
    status: "Live",
    tech: ["Node.js", "Express", "MongoDB", "React", "JWT", "RAG", "Vector Search"],
    highlights: [
      { label: "RAG Pipeline",    detail: "Bi-encoder retrieval + cross-encoder re-ranking over a curated legal corpus" },
      { label: "Multi-Agent",     detail: "Router → Research → Reasoning → Citation → Synthesis agent chain" },
      { label: "Citation Engine", detail: "Every claim maps to an exact source span — no unsupported assertions served" },
      { label: "Production",      detail: "Deployed and live at jurisynth.in with full auth and session management" },
    ],
    metrics: [
      { label: "Architecture", value: "RAG Pipeline" },
      { label: "Faithfulness", value: "93%"          },
      { label: "Citation P",   value: "91%"          },
      { label: "Deployment",   value: "Live"         },
    ],
    github: "https://github.com/pranitap123/Jurisynth-AI",
    live: "https://jurisynth.in",
    caseStudyHref: "/projects/jurisynth-ai",
    diagramType: "jurisynth",
  },
  {
    slug: "developer-portfolio",
    index: "04",
    name: "Developer Portfolio",
    tagline: "Engineering portfolio built as a production-grade Next.js application",
    description:
      "A multi-page engineering portfolio designed and built from scratch as a production software system — not a template. Covers full-stack Next.js 15 with App Router, reusable component architecture, per-page metadata and Open Graph, responsive mobile navigation with focus trapping, accessible SVG diagrams, and automated sitemap generation. The codebase demonstrates the same engineering standards applied to backend systems: typed data contracts, shared component primitives, and zero-placeholder content.",
    category: "Frontend Engineering · Product Design",
    status: "Live",
    tech: [
      "Next.js 15",
      "TypeScript",
      "React",
      "Tailwind CSS v4",
      "Framer Motion",
      "App Router",
      "Metadata API",
    ],
    highlights: [
      {
        label: "Architecture",
        detail:
          "App Router with per-route Server Components — client boundaries isolated to animated islands only",
      },
      {
        label: "Design System",
        detail:
          "Single shared token set (gold accent, type scale, spacing) enforced across 9 pages and 40+ components",
      },
      {
        label: "SEO",
        detail:
          "Per-page Open Graph metadata, dynamic sitemap.ts, robots.ts, and canonical URLs via Next.js Metadata API",
      },
      {
        label: "Accessibility",
        detail:
          "Skip links, aria-current routing, focus-trapped mobile menu, keyboard-navigable FAQ accordion, aria-hidden decorative SVGs",
      },
    ],
    metrics: [
      { label: "Pages",      value: "9 Routes"    },
      { label: "Framework",  value: "Next.js 15"  },
      { label: "Language",   value: "TypeScript"  },
      { label: "Deployment", value: "Live"        },
    ],
    github: "https://github.com/pranitap123/Portfolio",
    live: "https://pranitapanchal.dev",
    caseStudyHref: "/",
    diagramType: "portfolio",
  },
] as const;

// ─── Page-level stats (hero section) ─────────────────────────────────────────

export const pageStats = [
  { value: "4",   label: "Projects"           },
  { value: "18+", label: "Technologies"       },
  { value: "2",   label: "Live Deployments"   },
  { value: "4",   label: "Engineering Domains"},
] as const;