// ─── Hero ─────────────────────────────────────────────────────────────────────

export const hero = {
  name: "Pranita Panchal",
  title: "Software Engineer",
  tagline:
    "Backend engineering · Distributed systems · AI-integrated applications · DevOps · Web3",
  summary:
    "Production-grade software engineer focused on building secure backend systems, scalable data pipelines, and AI-integrated applications. I design with observability from the first commit and deploy with reproducibility as a constraint.",
  resumePdfUrl: "/resume/pranita-panchal-resume.pdf",
  location: "Pune, Maharashtra, India",
  email: "pranitapanchal.dev@gmail.com",
  github: "https://github.com/pranitap123",
  linkedin: "https://www.linkedin.com/in/pranita-panchal-5b9b3b281",
} as const;

// ─── Professional Summary ─────────────────────────────────────────────────────

export const professionalSummary = {
  paragraphs: [
    "I build production-grade backend systems — REST APIs with strong typing, PostgreSQL schemas designed for longevity, and containerised deployments that behave identically in development and production. My work spans secure credential management, event-driven threat intelligence platforms, and AI-powered SaaS applications shipped to production.",
    "I approach every system with the same question: what happens when this fails at 2am with no one watching? That question drives decisions around observability, graceful degradation, and operational automation. Security is a first-class constraint, not a retrofit.",
    "My current interests sit at the intersection of distributed systems theory and applied AI: RAG pipeline engineering, multi-agent orchestration, and the backend infrastructure required to make AI applications reliable in production.",
  ],
} as const;

// ─── Education ────────────────────────────────────────────────────────────────

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  location: string;
  highlights: readonly string[];
  current: boolean;
}

export const education: readonly EducationEntry[] = [
  {
    degree: "Bachelor of Technology — Computer Science & Engineering",
    institution: "Savitribai Phule Pune University",
    period: "2021 — 2025",
    location: "Pune, Maharashtra, India",
    highlights: [
      "Core curriculum: Data Structures, Algorithms, Operating Systems, Computer Networks, DBMS",
      "Relevant coursework: Distributed Computing, Cryptography, Compiler Design",
      "Final year project: AI-integrated legal research platform (Jurisynth AI) — deployed to production",
    ],
    current: true,
  },
] as const;

// ─── Technical Skills ─────────────────────────────────────────────────────────

export interface SkillCategory {
  category: string;
  skills: readonly string[];
}

export const skillCategories: readonly SkillCategory[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "Bash", "Solidity", "Rust"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "FastAPI", "REST APIs", "GraphQL", "WebSockets", "JWT", "AES-256"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js 15", "Tailwind CSS v4", "Framer Motion", "Vite"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Neo4j", "Redis", "Prisma", "Vector DBs"],
  },
  {
    category: "DevOps & Cloud",
    skills: ["Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Nginx", "Linux", "Kubernetes"],
  },
  {
    category: "AI / LLMs",
    skills: ["RAG Pipelines", "OpenAI API", "LangChain", "Embeddings", "Multi-Agent Systems", "Vector Search"],
  },
  {
    category: "Web3",
    skills: ["Ethereum", "Solidity", "Hardhat", "ethers.js", "Smart Contracts", "IPFS"],
  },
  {
    category: "Tools",
    skills: ["Git", "Zod", "Pydantic", "Kafka", "Vitest", "Postman", "ESLint", "Prettier"],
  },
] as const;

// ─── Featured Projects ────────────────────────────────────────────────────────

export interface FeaturedProject {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  tech: readonly string[];
  github: string;
  live: string | null;
  caseStudyHref: string;
  status: "Live" | "Open Source";
  highlight: string;
}

export const featuredProjects: readonly FeaturedProject[] = [
  {
    name: "SecureVault",
    slug: "securevault",
    tagline: "Encrypted secrets management backend",
    description:
      "Production-grade REST API for storing and rotating application secrets with AES-256-GCM encryption at rest, JWT authentication with refresh token rotation, role-based access control, and containerised deployment.",
    tech: ["TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker", "JWT", "AES-256"],
    github: "https://github.com/pranitap123/securevault-backend",
    live: null,
    caseStudyHref: "/projects/securevault",
    status: "Open Source",
    highlight: "AES-256-GCM encryption at the persistence boundary — plaintext never touches the database",
  },
  {
    name: "ARGUS-PRISM",
    slug: "argus-prism",
    tagline: "Real-time threat intelligence & graph analysis platform",
    description:
      "Event-driven threat detection system with Kafka for high-throughput ingestion, Neo4j for threat actor graph modeling, FastAPI for the async intelligence query layer, and a React dashboard for live graph visualization.",
    tech: ["FastAPI", "Python", "Kafka", "Neo4j", "PostgreSQL", "Docker", "React"],
    github: "https://github.com/pranitap123/ARGUS---PRISM",
    live: null,
    caseStudyHref: "/projects/argus-prism",
    status: "Open Source",
    highlight: "Decoupled ingestion and analysis — Kafka ensures pipeline continues under detection lag",
  },
  {
    name: "Jurisynth AI",
    slug: "jurisynth-ai",
    tagline: "AI-powered legal research & citation intelligence platform",
    description:
      "Production-deployed SaaS with a RAG pipeline, multi-agent reasoning orchestration (Router → Research → Reasoning → Citation → Synthesis), and a citation engine that maps every generated claim to its exact source span.",
    tech: ["Node.js", "Express", "MongoDB", "React", "JWT", "RAG", "Vector Search"],
    github: "https://github.com/pranitap123/Jurisynth-AI",
    live: "https://jurisynth.in",
    caseStudyHref: "/projects/jurisynth-ai",
    status: "Live",
    highlight: "93% answer faithfulness, 91% citation precision — measured on a held-out legal test set",
  },
] as const;

// ─── Certifications & Learning ────────────────────────────────────────────────

export interface CertItem {
  title: string;
  issuer: string;
  year: string;
  category: "Certification" | "Course" | "Self-Study";
  url?: string;
}

export const certifications: readonly CertItem[] = [
  {
    title: "The Web Developer Bootcamp",
    issuer: "Udemy / Colt Steele",
    year: "2022",
    category: "Course",
  },
  {
    title: "Complete Node.js Developer",
    issuer: "Udemy / Andrew Mead",
    year: "2022",
    category: "Course",
  },
  {
    title: "Docker & Kubernetes: The Practical Guide",
    issuer: "Udemy / Maximilian Schwarzmüller",
    year: "2023",
    category: "Course",
  },
  {
    title: "Ethereum and Solidity: The Complete Developer's Guide",
    issuer: "Udemy / Stephen Grider",
    year: "2023",
    category: "Course",
  },
  {
    title: "System Design Engineering (Self-Maintained Repository)",
    issuer: "github.com/pranitap123/system-design-engineering",
    year: "2024–present",
    category: "Self-Study",
    url: "https://github.com/pranitap123/system-design-engineering",
  },
  {
    title: "LLM Engineering: Master AI & LLMs",
    issuer: "Udemy",
    year: "2024",
    category: "Course",
  },
  {
    title: "Rust Programming: The Complete Developer's Guide",
    issuer: "Udemy",
    year: "2025",
    category: "Course",
  },
  {
    title: "Kubernetes: Zero to Production",
    issuer: "Self-Study (in progress)",
    year: "2025",
    category: "Self-Study",
  },
] as const;

// ─── Experience ───────────────────────────────────────────────────────────────

export interface ExperienceEntry {
  title: string;
  company: string;
  type: "Internship" | "Freelance" | "Part-time" | "Contract";
  period: string;
  location: string;
  description: string;
  contributions: readonly string[];
  tech: readonly string[];
}

export const experience: readonly ExperienceEntry[] = [
  {
    title: "Full-Stack Developer",
    company: "Freelance",
    type: "Freelance",
    period: "2023 — Present",
    location: "Remote",
    description:
      "Designed and delivered backend-focused web applications for clients requiring custom API development, database design, and deployment automation.",
    contributions: [
      "Architected and deployed Jurisynth AI — a production RAG platform now live at jurisynth.in",
      "Built custom REST APIs with Node.js and Express for client CMS and e-commerce integrations",
      "Implemented JWT-based authentication systems with role-based access control",
      "Containerised multi-service stacks with Docker Compose and configured Nginx reverse proxies",
    ],
    tech: ["Node.js", "Express", "MongoDB", "React", "Docker", "Next.js", "PostgreSQL"],
  },
] as const;

// ─── Current Focus ────────────────────────────────────────────────────────────

export const currentFocus: readonly string[] = [
  "Advanced PostgreSQL internals and query optimisation",
  "Kubernetes cluster operations and cloud-native patterns",
  "Rust systems programming and async runtimes",
  "Distributed systems consensus and CRDT theory",
  "RAG pipeline engineering and LLM evaluation frameworks",
] as const;