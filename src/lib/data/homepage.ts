export const heroData = {
  label: "Available for new opportunities",
  headline: "Software Engineer",
  headlineAccent: "Backend, Full-Stack & DevOps",
  statement: "Building robust backend systems, production-grade applications, and scalable infrastructure.",
  tagline:
    "I architect secure backends, optimize data pipelines, and ship production-grade applications.",
  cta: {
    primary: { label: "View Projects", href: "/projects" },
    secondary: { label: "Explore Engineering", href: "/engineering" },
  },
  github: "https://github.com/pranitap123",
} as const;

export const engineeringFocusData = {
  label: "Specialization",
  heading: "Engineering Focus",
  items: [
    {
      title: "Backend Systems",
      description:
        "Node.js, TypeScript, and PostgreSQL. REST APIs with JWT auth, AES-256 encryption, and Prisma ORM in production.",
      icon: "server",
      tags: ["Node.js", "TypeScript", "PostgreSQL", "Prisma"],
    },
    {
      title: "Infrastructure & DevOps",
      description:
        "Docker, CI/CD pipelines, and container orchestration. Zero-downtime deployments and automated release workflows.",
      icon: "layers",
      tags: ["Docker", "GitHub Actions", "CI/CD", "Linux"],
    },
    {
      title: "Data Engineering",
      description:
        "Stream processing with Kafka, graph databases with Neo4j, and high-throughput data pipeline design.",
      icon: "database",
      tags: ["Kafka", "Neo4j", "MongoDB", "Redis"],
    },
    {
      title: "System Design",
      description:
        "Distributed systems architecture, CAP theorem trade-offs, and documented design patterns with Mermaid diagrams.",
      icon: "diagram",
      tags: ["Distributed Systems", "Architecture", "Scalability"],
    },
  ],
} as const;

export const projectsData = {
  label: "Work",
  heading: "Featured Projects",
  items: [
    {
      slug: "securevault",
      name: "SecureVault",
      subtitle: "Encrypted secrets management backend",
      description:
        "Production-grade REST API for secure credential storage. AES-256 encryption at rest, JWT authentication, role-based access control, and full audit logging built on Node.js, TypeScript, and PostgreSQL.",
      tech: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "JWT", "AES-256"],
      github: "https://github.com/pranitap123/securevault-backend",
      live: null,
      status: "Backend API",
    },
    {
      slug: "argus-prism",
      name: "ARGUS-PRISM",
      subtitle: "Real-time threat intelligence platform",
      description:
        "Event-driven threat detection system using Kafka for stream processing, Neo4j for relationship graph analysis, and FastAPI for the intelligence API layer. React dashboard with live graph visualization.",
      tech: ["FastAPI", "Kafka", "Neo4j", "PostgreSQL", "Docker", "React"],
      github: "https://github.com/pranitap123/ARGUS---PRISM",
      live: null,
      status: "Full Stack",
    },
    {
      slug: "jurisynth-ai",
      name: "Jurisynth AI",
      subtitle: "AI-powered legal research assistant",
      description:
        "Deployed legal research platform with JWT-authenticated user sessions, MongoDB document store, and Express backend. Shipped to production at jurisynth.in with full CRUD and session management.",
      tech: ["Node.js", "Express", "MongoDB", "React", "JWT"],
      github: "https://github.com/pranitap123/Jurisynth-AI",
      live: "https://jurisynth.in",
      status: "Live Product",
    },
  ],
} as const;

export const principlesData = {
  label: "Philosophy",
  heading: "Engineering Principles",
  items: [
    {
      title: "Security by Default",
      description:
        "Encryption, input validation, and least-privilege access are first-class requirements — not afterthoughts applied at the end of a sprint.",
    },
    {
      title: "Simplicity Over Cleverness",
      description:
        "The best code is the code a colleague can read at 2am during an incident. Clever abstractions are a liability until proven otherwise.",
    },
    {
      title: "Observability Matters",
      description:
        "Systems that cannot be inspected cannot be trusted. Structured logging, metrics, and traces are built in from day one.",
    },
    {
      title: "Automate the Repetitive",
      description:
        "If a human is doing it more than twice, it belongs in a pipeline. CI/CD, linting, testing, and deployment are engineering infrastructure.",
    },
  ],
} as const;

export const currentFocusData = {
  label: "Learning",
  heading: "Current Focus",
  description:
    "Continuously deepening expertise in the systems and tools that define modern backend and platform engineering.",
  items: [
    { label: "Advanced PostgreSQL", detail: "Query optimization, indexing strategies, partitioning" },
    { label: "Distributed Systems", detail: "Consensus algorithms, eventual consistency, CRDT" },
    { label: "Rust", detail: "Systems programming, ownership model, async runtimes" },
    { label: "Kubernetes", detail: "Pod scheduling, service mesh, cluster operations" },
    { label: "Infrastructure Engineering", detail: "IaC with Terraform, cloud-native patterns" },
  ],
} as const;

export const knowledgeBaseData = {
  label: "Knowledge Base",
  heading: "Engineering Documentation",
  description:
    "A living repository of system design notes, architecture diagrams, and engineering research. Maintained as a public resource for backend and infrastructure engineers.",
  items: [
    {
      title: "System Design Notes",
      description: "Load balancing, caching layers, database replication, CAP theorem.",
      count: "15+ topics",
    },
    {
      title: "Architecture Diagrams",
      description: "Mermaid diagrams documenting distributed system patterns and service interactions.",
      count: "20+ diagrams",
    },
    {
      title: "Engineering Documentation",
      description: "Networking fundamentals, DevOps runbooks, and infrastructure patterns.",
      count: "10+ guides",
    },
  ],
  repo: "https://github.com/pranitap123/system-design-engineering",
} as const;

export const contactData = {
  label: "Contact",
  heading: "Let's build something.",
  description:
    "Open to backend, full-stack, platform, and DevOps roles. Based in Pune, Maharashtra, India — available for remote and hybrid positions.",
  email: "pranitapanchal339@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/pranitap123" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pranita-panchal-5b9b3b281",
    },
    {
      label: "System Design Repo",
      href: "https://github.com/pranitap123/system-design-engineering",
    },
  ],
} as const;