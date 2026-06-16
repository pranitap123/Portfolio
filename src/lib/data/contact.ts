// ─── Contact Methods ──────────────────────────────────────────────────────────

export interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  description: string;
  external: boolean;
}

export const contactMethods: readonly ContactMethod[] = [
  {
    id: "email",
    label: "Email",
    value: "pranitapanchal.dev@gmail.com",
    href: "mailto:pranitapanchal.dev@gmail.com",
    description: "Best for detailed project discussions and opportunities",
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/pranitap123",
    href: "https://github.com/pranitap123",
    description: "Open source projects and engineering work",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/pranita-panchal-5b9b3b281",
    href: "https://www.linkedin.com/in/pranita-panchal-5b9b3b281",
    description: "Professional background and experience",
    external: true,
  },
  {
    id: "portfolio",
    label: "Portfolio",
    value: "pranitapanchal.dev",
    href: "/",
    description: "Engineering projects and case studies",
    external: false,
  },
] as const;

// ─── Availability ─────────────────────────────────────────────────────────────

export interface AvailabilityItem {
  label: string;
  detail: string;
  available: boolean;
}

export const availability: readonly AvailabilityItem[] = [
  {
    label: "Full-time Roles",
    detail: "Backend, Full-Stack, Platform, and DevOps positions",
    available: true,
  },
  {
    label: "Remote Work",
    detail: "Fully remote or hybrid — open to global opportunities",
    available: true,
  },
  {
    label: "Freelance Projects",
    detail: "Backend architecture, API design, and infrastructure work",
    available: true,
  },
  {
    label: "AI & Web3 Projects",
    detail: "RAG pipelines, smart contracts, and AI-integrated systems",
    available: true,
  },
  {
    label: "Open Source Collaboration",
    detail: "Backend tooling, developer infrastructure, and DevOps projects",
    available: true,
  },
  {
    label: "On-site Relocation",
    detail: "Not currently considering relocation-required positions",
    available: false,
  },
] as const;

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: readonly FAQItem[] = [
  {
    question: "What is your preferred technology stack?",
    answer:
      "For backend systems: Node.js or Python with TypeScript, PostgreSQL or MongoDB, Docker for containerization, and GitHub Actions for CI/CD. For AI-integrated applications: FastAPI, Kafka for event-driven pipelines, Neo4j for graph data, and OpenAI-compatible APIs for LLM integration. I choose tools based on the problem constraints, not familiarity defaults.",
  },
  {
    question: "What time zone are you in, and what are your working hours?",
    answer:
      "I am based in Pune, Maharashtra, India — IST (UTC+5:30). I maintain regular working hours from 9am to 7pm IST, with flexibility for cross-timezone collaboration during morning or evening hours. I typically respond to messages within 24 hours on business days.",
  },
  {
    question: "Are you available for fully remote positions?",
    answer:
      "Yes — remote is my preferred working model. I have experience collaborating asynchronously across time zones using structured written communication, documented decision-making, and observable workflows. I do not require on-site presence and am not currently considering relocation-required roles.",
  },
  {
    question: "What types of engineering problems interest you most?",
    answer:
      "Backend architecture challenges with real constraints: high-throughput data pipelines, secure credential and secrets management, distributed systems design, AI-integrated applications with retrieval and reasoning layers, and infrastructure that needs to be reliable without full-time DevOps oversight. I am particularly drawn to systems where security and performance are non-negotiable.",
  },
  {
    question: "Do you have experience working in production environments?",
    answer:
      "Jurisynth AI is deployed and live at jurisynth.in — a full-stack AI platform with JWT authentication, a RAG pipeline, multi-agent reasoning, and MongoDB in production. SecureVault and ARGUS-PRISM are production-oriented systems designed with containerized deployment, health checks, structured logging, and environment-parity configurations from the ground up.",
  },
  {
    question: "What is the best way to reach you for a role opportunity?",
    answer:
      "Email is preferred for initial outreach — include a brief description of the role, the technology environment, and what you are building. I review every message and respond to all serious inquiries within one to two business days. LinkedIn works for an initial connection, but email is where detailed conversations happen fastest.",
  },
] as const;

// ─── Form subjects ────────────────────────────────────────────────────────────

export const subjectOptions = [
  "Job Opportunity",
  "Freelance Project",
  "Technical Collaboration",
  "Open Source",
  "General Enquiry",
] as const;

export type SubjectOption = (typeof subjectOptions)[number];