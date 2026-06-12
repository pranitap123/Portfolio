export type ProjectCategory =
  | "Backend Engineering"
  | "Cybersecurity & Distributed Systems"
  | "AI-Powered SaaS Platform";

export interface ProjectHighlight {
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  status: "In Development" | "Live" | "Open Source";
  github: string;
  live?: string;
  tech: string[];
  highlights: ProjectHighlight[];
  architecture: {
    summary: string;
    layers: string[];
  };
  diagramType: "securevault" | "argus" | "jurisynth";
  metrics: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: "securevault-backend",
    name: "SecureVault",
    subtitle: "Encrypted secrets management backend",
    description:
      "A production-grade REST API for managing encrypted credentials and application secrets. Built with a defense-in-depth approach: AES-256-GCM encryption at rest, JWT-based authentication with refresh token rotation, role-based access control, and structured audit logging. Containerized with Docker and designed for horizontal scalability.",
    category: "Backend Engineering",
    status: "Open Source",
    github: "https://github.com/pranitap123/securevault-backend",
    tech: ["TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker", "JWT", "AES-256"],
    highlights: [
      { label: "Encryption", detail: "AES-256-GCM at rest, per-secret key derivation" },
      { label: "Auth", detail: "JWT with refresh token rotation and revocation" },
      { label: "Access Control", detail: "Role-based permissions with scope isolation" },
      { label: "Deployment", detail: "Dockerized with multi-stage build and health checks" },
      { label: "Data Layer", detail: "PostgreSQL + Prisma ORM with migration history" },
    ],
    architecture: {
      summary: "Three-tier REST architecture with encryption middleware between API and persistence layers",
      layers: ["HTTP Layer", "Auth Middleware", "Encryption Layer", "Prisma ORM", "PostgreSQL"],
    },
    diagramType: "securevault",
    metrics: [
      { label: "Encryption", value: "AES-256" },
      { label: "Auth", value: "JWT + Refresh" },
      { label: "DB", value: "PostgreSQL" },
      { label: "Deploy", value: "Docker" },
    ],
  },
  {
    slug: "argus-prism",
    name: "ARGUS-PRISM",
    subtitle: "Real-time threat intelligence platform",
    description:
      "An event-driven threat detection and intelligence system built for high-throughput security telemetry. Apache Kafka decouples event ingestion from analysis; Neo4j models threat actor relationships and attack patterns as a graph; FastAPI serves the intelligence query layer. The entire stack is containerized and orchestrated via Docker Compose with isolated network segments.",
    category: "Cybersecurity & Distributed Systems",
    status: "Open Source",
    github: "https://github.com/pranitap123/ARGUS---PRISM",
    tech: ["FastAPI", "Kafka", "Neo4j", "PostgreSQL", "Docker", "React", "Python"],
    highlights: [
      { label: "Event Pipeline", detail: "Kafka topics with consumer group partitioning" },
      { label: "Graph Database", detail: "Neo4j for threat actor relationship modeling" },
      { label: "API Layer", detail: "FastAPI with async handlers and Pydantic validation" },
      { label: "Architecture", detail: "Event-driven, decoupled producers and consumers" },
      { label: "Containerization", detail: "Multi-service Docker Compose with network isolation" },
    ],
    architecture: {
      summary: "Event-driven pipeline: ingestion → Kafka → stream processing → Neo4j graph analysis",
      layers: ["Event Producers", "Kafka Broker", "Stream Processor", "Neo4j Graph", "FastAPI Query Layer"],
    },
    diagramType: "argus",
    metrics: [
      { label: "Broker", value: "Kafka" },
      { label: "Graph DB", value: "Neo4j" },
      { label: "API", value: "FastAPI" },
      { label: "Pattern", value: "Event-Driven" },
    ],
  },
  {
    slug: "jurisynth-ai",
    name: "Jurisynth AI",
    subtitle: "AI-powered legal research platform",
    description:
      "A deployed SaaS application providing AI-assisted legal document analysis and research. Node.js/Express backend with MongoDB document store, JWT session management, and React frontend. The AI pipeline ingests legal documents, extracts structured metadata, and generates research summaries. Shipped to production at jurisynth.in.",
    category: "AI-Powered SaaS Platform",
    status: "Live",
    github: "https://github.com/pranitap123/Jurisynth-AI",
    live: "https://jurisynth.in",
    tech: ["Node.js", "Express", "MongoDB", "React", "JWT", "AI/LLM"],
    highlights: [
      { label: "AI Pipeline", detail: "Document ingestion, extraction, and summarization" },
      { label: "Auth", detail: "JWT sessions with role-based document access" },
      { label: "Document Store", detail: "MongoDB with schema validation and indexing" },
      { label: "Production", detail: "Deployed and live at jurisynth.in" },
      { label: "Full Stack", detail: "Express API + React SPA with shared auth context" },
    ],
    architecture: {
      summary: "Full-stack SaaS: React SPA → Express API → AI pipeline → MongoDB document store",
      layers: ["React SPA", "Express API", "AI Processing", "MongoDB", "Production Deployment"],
    },
    diagramType: "jurisynth",
    metrics: [
      { label: "Status", value: "Live" },
      { label: "DB", value: "MongoDB" },
      { label: "API", value: "Express" },
      { label: "AI", value: "LLM Pipeline" },
    ],
  },
];

export const comparisonData = {
  columns: ["Project", "Primary Focus", "Database", "Deployment", "Authentication", "Architecture Style"],
  rows: [
    {
      project: "SecureVault",
      focus: "Backend Security",
      database: "PostgreSQL",
      deployment: "Docker",
      auth: "JWT + Refresh Tokens",
      architecture: "REST / Layered",
    },
    {
      project: "ARGUS-PRISM",
      focus: "Threat Intelligence",
      database: "Neo4j + PostgreSQL",
      deployment: "Docker Compose",
      auth: "Service Auth",
      architecture: "Event-Driven",
    },
    {
      project: "Jurisynth AI",
      focus: "AI SaaS",
      database: "MongoDB",
      deployment: "Production VPS",
      auth: "JWT Sessions",
      architecture: "MVC / Full Stack",
    },
  ],
} as const;

export const engineeringDecisions = [
  {
    title: "Security First",
    principle: "Encryption and access control are not features — they are constraints applied before the first line of business logic.",
    implementation: "AES-256-GCM at the persistence boundary, JWT rotation preventing token reuse, RBAC enforced at the middleware layer before handlers are reached.",
  },
  {
    title: "Design for Failure",
    principle: "Every distributed component will fail. The question is whether the system degrades gracefully or collapses entirely.",
    implementation: "Kafka decouples producers from consumers in ARGUS-PRISM, ensuring telemetry ingestion continues even if the analysis layer is slow or down.",
  },
  {
    title: "Containerization as Infrastructure",
    principle: "A system that only runs on one machine is not production-ready. Docker is the minimum deployable unit.",
    implementation: "Multi-stage Dockerfiles to minimize image surface area, Docker Compose for local environment parity, health checks on every service boundary.",
  },
  {
    title: "Observability Over Debugging",
    principle: "Structured logs are not nice-to-have. A system you cannot inspect is a system you cannot trust in production.",
    implementation: "Structured JSON logging with request correlation IDs, database query timing, and authentication event auditing across all three projects.",
  },
  {
    title: "Schema as Contract",
    principle: "The database schema is the most durable part of a system. Migrations must be reversible, versioned, and reviewed like code.",
    implementation: "Prisma migration history in SecureVault, Pydantic validation at API boundaries in ARGUS-PRISM, MongoDB schema validation in Jurisynth.",
  },
] as const;