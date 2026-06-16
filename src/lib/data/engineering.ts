// ─── Hero ─────────────────────────────────────────────────────────────────────

export const hero = {
  label: "Engineering",
  headline: "How I think about\nbuilding systems.",
  description:
    "Scalable backends, distributed architectures, secure APIs, AI-integrated pipelines, and cloud-native infrastructure — built to last beyond the first deployment.",
} as const;

// ─── Core Principles ──────────────────────────────────────────────────────────

export interface Principle {
  index: string;
  title: string;
  body: string;
  icon: string;
}

export const principles: readonly Principle[] = [
  {
    index: "01",
    title: "Simplicity over cleverness",
    body: "The right abstraction reduces cognitive load. The wrong one multiplies it. Code should be readable by an engineer encountering it for the first time during an incident.",
    icon: "layers",
  },
  {
    index: "02",
    title: "Security by design",
    body: "Encryption, input validation, and least-privilege access are first-class requirements — not retrofit features applied before a launch. The threat model is written before the schema.",
    icon: "shield",
  },
  {
    index: "03",
    title: "Type safety end-to-end",
    body: "Types are documentation that the compiler enforces. A type boundary between the API and the database is a guarantee. An unchecked any is a bug scheduled for production.",
    icon: "type",
  },
  {
    index: "04",
    title: "Observability first",
    body: "A system without structured logging, metrics, and tracing cannot be trusted in production. Observability is engineered in from day one — not added after the first outage.",
    icon: "chart",
  },
  {
    index: "05",
    title: "Performance is a constraint",
    body: "Latency targets are requirements, not aspirations. Caching strategies, query plans, and connection pool sizing are designed before they become incidents.",
    icon: "zap",
  },
  {
    index: "06",
    title: "Design for failure",
    body: "Distributed components fail. Retries, circuit breakers, dead-letter queues, and graceful degradation are the difference between an incident and an outage.",
    icon: "alert",
  },
  {
    index: "07",
    title: "Automate the operational",
    body: "CI/CD, infrastructure provisioning, schema migrations, and deployment pipelines remove human error from the critical path. Toil is engineering debt.",
    icon: "terminal",
  },
  {
    index: "08",
    title: "Continuous learning",
    body: "The gap between what works now and what works at the next scale is always a learning problem. Reading papers, maintaining a knowledge base, and building deliberately are how that gap closes.",
    icon: "book",
  },
] as const;

// ─── Architecture Mindset ─────────────────────────────────────────────────────

export interface ArchitectureItem {
  title: string;
  approach: string;
  considerations: readonly string[];
}

export const architectureMindset: readonly ArchitectureItem[] = [
  {
    title: "Distributed Systems",
    approach:
      "Design for partition tolerance from the first commit. Every network call is a failure mode. Idempotency, retry budgets, and backpressure are requirements.",
    considerations: [
      "CAP theorem trade-offs are explicit, not accidental",
      "Kafka for at-least-once with MERGE semantics for idempotency",
      "Bulkhead isolation between services prevents cascade failure",
      "Event sourcing over direct mutation when audit matters",
    ],
  },
  {
    title: "API Design",
    approach:
      "APIs are contracts. Versioning, backwards compatibility, and consistent error shapes are designed before the first endpoint. REST for resource-oriented interfaces, event-driven for async workflows.",
    considerations: [
      "Structured error responses with machine-readable codes",
      "Input validation at the boundary — Zod or Pydantic before business logic",
      "Rate limiting and authentication enforced by middleware, not handlers",
      "OpenAPI spec generated from types, not written separately",
    ],
  },
  {
    title: "Database Modeling",
    approach:
      "The schema is the most durable artefact in a system. Relational integrity for structured data, document stores for variable schemas, graph databases for relationship-heavy queries.",
    considerations: [
      "Foreign key constraints over application-level integrity checks",
      "Composite indexes designed for query patterns, not columns",
      "UUIDs over sequential IDs to prevent enumeration attacks",
      "Migration history versioned and reviewed like application code",
    ],
  },
  {
    title: "Authentication & Authorization",
    approach:
      "Stateless JWT for horizontally scalable APIs, refresh token rotation for revocability, RBAC enforced at the middleware layer before any handler executes.",
    considerations: [
      "Short-lived access tokens — 15 minutes maximum",
      "Refresh tokens single-use and rotated on each use",
      "Role claims embedded in token payload — no per-request DB lookups",
      "bcrypt cost factor calibrated to server performance budget",
    ],
  },
  {
    title: "Caching Strategy",
    approach:
      "Cache at the layer closest to the consumer for latency. Invalidate on write, not on schedule. TTL is not a substitute for correctness.",
    considerations: [
      "Redis for session data and rate limit counters",
      "CDN caching for static assets with cache-busting via content hash",
      "Database query result caching only for proven hot paths",
      "Stale-while-revalidate for acceptable eventual consistency",
    ],
  },
  {
    title: "Scalability Patterns",
    approach:
      "Horizontal scaling requires stateless services. Shared state lives in the database or cache — not in application memory. Design the data access pattern before choosing the database.",
    considerations: [
      "Connection pooling sized to database connection limits",
      "Async processing for workloads that don't need synchronous results",
      "Read replicas for analytics queries that would block writes",
      "Partitioning strategy defined before the first large table",
    ],
  },
] as const;

// ─── Technology Stack ─────────────────────────────────────────────────────────

export interface TechCategory {
  category: string;
  icon: string;
  skills: readonly string[];
}

export const techStack: readonly TechCategory[] = [
  {
    category: "Languages",
    icon: "code",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "Bash", "Solidity", "Rust (learning)"],
  },
  {
    category: "Backend",
    icon: "server",
    skills: ["Node.js", "Express", "FastAPI", "REST", "GraphQL", "WebSockets", "gRPC"],
  },
  {
    category: "Frontend",
    icon: "monitor",
    skills: ["React", "Next.js 15", "Tailwind CSS v4", "Framer Motion", "Vite"],
  },
  {
    category: "Databases",
    icon: "database",
    skills: ["PostgreSQL", "MongoDB", "Neo4j", "Redis", "Prisma ORM", "Vector DBs"],
  },
  {
    category: "DevOps & Cloud",
    icon: "cloud",
    skills: ["Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Nginx", "Linux", "Kubernetes"],
  },
  {
    category: "AI / LLMs",
    icon: "brain",
    skills: ["RAG Pipelines", "OpenAI API", "LangChain", "Embeddings", "Multi-Agent", "Vector Search"],
  },
  {
    category: "Web3",
    icon: "hex",
    skills: ["Ethereum", "Solidity", "Hardhat", "ethers.js", "Smart Contracts", "IPFS"],
  },
  {
    category: "Tooling",
    icon: "wrench",
    skills: ["Git", "Zod", "Pydantic", "JWT", "AES-256", "Kafka", "Vitest", "ESLint"],
  },
] as const;

// ─── Development Workflow ─────────────────────────────────────────────────────

export interface WorkflowStep {
  step: string;
  label: string;
  description: string;
}

export const workflowSteps: readonly WorkflowStep[] = [
  {
    step: "01",
    label: "Understand",
    description:
      "Define the problem constraints, non-functional requirements, and failure modes before writing a line of code.",
  },
  {
    step: "02",
    label: "Research",
    description:
      "Survey existing patterns, prior art, and trade-offs. Understand what others built and why before deciding to build something new.",
  },
  {
    step: "03",
    label: "Architect",
    description:
      "Design the data model, service boundaries, API contracts, and deployment topology. Document decisions with explicit rationale.",
  },
  {
    step: "04",
    label: "Implement",
    description:
      "Build incrementally with strong typing, meaningful abstractions, and tests at every boundary. No feature is done without a test.",
  },
  {
    step: "05",
    label: "Validate",
    description:
      "Integration tests, load testing on critical paths, and security review before any deployment to a shared environment.",
  },
  {
    step: "06",
    label: "Deploy",
    description:
      "Containerised, reproducible, and observable. Health checks gate traffic. Rollback is possible within two minutes.",
  },
  {
    step: "07",
    label: "Monitor",
    description:
      "Structured logs, latency percentiles, error rates, and saturation metrics in place before the first production request.",
  },
  {
    step: "08",
    label: "Iterate",
    description:
      "Every incident produces a post-mortem. Every quarter produces a deliberate review of what should be simplified or removed.",
  },
] as const;

// ─── Engineering Values ───────────────────────────────────────────────────────

export const engineeringValues: readonly string[] = [
  "Code is read far more often than it is written. Optimise for the reader.",
  "The schema outlives the application. Treat migrations like production deployments.",
  "Every external dependency is a risk surface. Depend deliberately.",
  "If it isn't tested, it isn't done. If it isn't monitored, it doesn't exist.",
  "Complexity introduced for performance must be justified by measurement, not intuition.",
  "Security is a property of the system, not a layer on top of it.",
  "The best architecture is the one your team can operate at 2am.",
] as const;

// ─── Current Focus ────────────────────────────────────────────────────────────

export interface FocusItem {
  label: string;
  detail: string;
}

export const currentFocus: readonly FocusItem[] = [
  {
    label: "AI Agents & RAG",
    detail: "Multi-agent orchestration, retrieval pipeline optimisation, faithfulness evaluation, and citation attribution engines.",
  },
  {
    label: "Backend Systems",
    detail: "High-throughput API design, connection pool tuning, query optimisation, and zero-downtime deployment strategies.",
  },
  {
    label: "Cloud-Native Infrastructure",
    detail: "Kubernetes cluster operations, service mesh patterns, IaC with Terraform, and cloud-agnostic deployment architectures.",
  },
  {
    label: "Distributed Systems Theory",
    detail: "Consensus algorithms, CRDT, vector clocks, and the practical application of CAP theorem trade-offs.",
  },
  {
    label: "Rust",
    detail: "Systems programming, the ownership model, async runtimes, and building high-performance networking utilities.",
  },
  {
    label: "Developer Tooling",
    detail: "CLI tooling, internal platform engineering, and reducing toil through well-designed automation.",
  },
] as const;

// ─── System Design Repo ───────────────────────────────────────────────────────

export const systemDesignRepo = {
  title: "System Design Engineering",
  description:
    "A living public repository documenting distributed systems patterns, architecture decision records, networking fundamentals, and DevOps practices — maintained as a personal knowledge base and engineering reference.",
  href: "https://github.com/pranitap123/system-design-engineering",
  topics: [
    "Distributed Systems",
    "CAP Theorem",
    "Load Balancing",
    "Database Replication",
    "Event-Driven Architecture",
    "API Design Patterns",
    "Caching Strategies",
    "Message Queues",
    "Consensus Algorithms",
    "Infrastructure as Code",
  ],
} as const;