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
  index: string;           // "01" | "02" | "03"
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
  diagramType: "securevault" | "argus" | "jurisynth";
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
      { label: "Encryption",    detail: "AES-256-GCM authenticated encryption at the persistence boundary" },
      { label: "Auth",          detail: "JWT + refresh token rotation with single-use invalidation" },
      { label: "Access Control",detail: "Role-based permissions enforced at middleware, before handlers" },
      { label: "Deployment",    detail: "Multi-stage Dockerfile with health checks and Compose orchestration" },
    ],
    metrics: [
      { label: "Encryption",  value: "AES-256-GCM" },
      { label: "Auth",        value: "JWT + Refresh" },
      { label: "Database",    value: "PostgreSQL" },
      { label: "Pattern",     value: "REST / Layered" },
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
      { label: "Event Pipeline", detail: "Kafka consumer groups with at-least-once delivery and dead-letter queue" },
      { label: "Graph Intelligence", detail: "Neo4j models threat actor → infrastructure → target relationships natively" },
      { label: "Stream Processing",  detail: "Decoupled ingestion and analysis — pipeline survives detection lag spikes" },
      { label: "Dual Database",      detail: "Neo4j for graph traversal, PostgreSQL for time-series event queries" },
    ],
    metrics: [
      { label: "Architecture", value: "Event-Driven" },
      { label: "Broker",       value: "Apache Kafka" },
      { label: "Graph DB",     value: "Neo4j" },
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
      { label: "Architecture",    value: "RAG Pipeline" },
      { label: "Faithfulness",    value: "93%" },
      { label: "Citation P",      value: "91%" },
      { label: "Deployment",      value: "Live" },
    ],
    github: "https://github.com/pranitap123/Jurisynth-AI",
    live: "https://jurisynth.in",
    caseStudyHref: "/projects/jurisynth-ai",
    diagramType: "jurisynth",
  },
] as const;

// ─── Page-level stats (hero section) ─────────────────────────────────────────

export const pageStats = [
  { value: "3",    label: "Production Systems"    },
  { value: "15+",  label: "Technologies"          },
  { value: "1",    label: "Live Deployment"       },
  { value: "3",    label: "Architecture Domains"  },
] as const;