// ─── Hero ─────────────────────────────────────────────────────────────────────

export const hero = {
  name: "Pranita Panchal",
  title: "Software Engineer",
  location: "Pune, Maharashtra, India",
  available: true,
  introduction: [
    "I design and build production-grade backend systems — APIs that handle real traffic, data pipelines that process real load, and infrastructure that deploys and recovers without manual intervention.",
    "My work spans secure backend architecture, distributed systems design, DevOps automation, and AI-integrated applications. I approach every system with the same question: what happens when this fails at 2am with no one watching?",
    "I maintain a public engineering knowledge base documenting system design patterns, distributed systems theory, and infrastructure decisions — because understanding the 'why' behind architectural choices matters more than knowing the 'what'.",
  ],
  links: [
    { label: "GitHub",         href: "https://github.com/pranitap123"                               },
    { label: "LinkedIn",       href: "https://www.linkedin.com/in/pranita-panchal-5b9b3b281"       },
    { label: "System Design",  href: "https://github.com/pranitap123/system-design-engineering"    },
  ],
} as const;

// ─── Engineering Philosophy ───────────────────────────────────────────────────

export const philosophy = [
  {
    index: "01",
    title: "Security by design, not retrofit",
    body: "Encryption, input validation, and least-privilege access are first-class constraints applied before the first line of business logic — not features bolted on before a launch deadline.",
  },
  {
    index: "02",
    title: "Simplicity over cleverness",
    body: "The best system design is the one your colleague can reason about at 2am during an incident. Abstraction earns its place by reducing cognitive load, not by demonstrating sophistication.",
  },
  {
    index: "03",
    title: "Observability is not optional",
    body: "A system you cannot inspect is a system you cannot trust. Structured logging, distributed tracing, and meaningful metrics are built in from day one — not added after the first production outage.",
  },
  {
    index: "04",
    title: "Types are documentation that compiles",
    body: "Strong typing eliminates an entire class of runtime errors and makes intent explicit. TypeScript types and Pydantic models are not overhead — they are the contract between the author and every future reader.",
  },
  {
    index: "05",
    title: "Automate everything repetitive",
    body: "If a human is performing the same sequence of steps more than twice, it belongs in a pipeline. CI/CD, schema migrations, infrastructure provisioning — operational toil is engineering debt.",
  },
  {
    index: "06",
    title: "Design for failure, not for success",
    body: "Every distributed component will fail. The engineering question is not 'will this break?' but 'when this breaks, does the system degrade gracefully or collapse entirely?'",
  },
] as const;

// ─── Technical Expertise ──────────────────────────────────────────────────────

export interface SkillCategory {
  category: string;
  skills: readonly string[];
}

export const expertise: readonly SkillCategory[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "Bash", "Solidity"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "FastAPI", "REST APIs", "GraphQL", "WebSockets", "gRPC"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Neo4j", "Redis", "Prisma", "Vector DBs"],
  },
  {
    category: "DevOps & Cloud",
    skills: ["Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Linux", "Nginx", "Kubernetes"],
  },
  {
    category: "AI / ML",
    skills: ["RAG Pipelines", "LLM Integration", "Vector Search", "Multi-Agent Systems", "Embeddings", "OpenAI API"],
  },
  {
    category: "Web3",
    skills: ["Ethereum", "Solidity", "Hardhat", "ethers.js", "Smart Contracts", "IPFS"],
  },
  {
    category: "Tools & Practices",
    skills: ["Git", "Zod", "Pydantic", "JWT", "AES-256", "System Design", "Kafka", "TDD"],
  },
] as const;

// ─── Learning Timeline ────────────────────────────────────────────────────────

export const timeline = [
  {
    year: "2021",
    title: "B.Tech Computer Science",
    detail: "Started formal study of computer science — data structures, algorithms, operating systems, and computer networks.",
    current: false,
  },
  {
    year: "2022",
    title: "Full-Stack Development",
    detail: "Built production web applications with React and Node.js. Learned database design, REST API patterns, and authentication systems from first principles.",
    current: false,
  },
  {
    year: "2023",
    title: "Backend Architecture & DevOps",
    detail: "Deepened backend expertise: containerization with Docker, CI/CD pipeline design, PostgreSQL schema optimization, and JWT-based auth systems. Built SecureVault.",
    current: false,
  },
  {
    year: "2023",
    title: "Distributed Systems & Web3",
    detail: "Studied consensus algorithms, CAP theorem, and event-driven architectures. Explored Ethereum, Solidity smart contracts, and decentralized application design.",
    current: false,
  },
  {
    year: "2024",
    title: "AI Systems & RAG Engineering",
    detail: "Built AI-integrated applications including Jurisynth AI — a RAG-powered legal research platform with multi-agent orchestration, citation attribution, and a production deployment.",
    current: false,
  },
  {
    year: "2024",
    title: "Cybersecurity & Graph Intelligence",
    detail: "Built ARGUS-PRISM: a Kafka-powered threat intelligence platform with Neo4j graph analysis, event-driven stream processing, and a FastAPI query layer.",
    current: false,
  },
  {
    year: "Now",
    title: "Advanced Infrastructure & Systems",
    detail: "Studying advanced PostgreSQL internals, Rust systems programming, Kubernetes cluster operations, and infrastructure engineering with Terraform.",
    current: true,
  },
] as const;

// ─── Current Focus ────────────────────────────────────────────────────────────

export const currentFocus = [
  {
    label: "Distributed Systems",
    detail: "Consensus algorithms, CRDT, eventual consistency, and partition tolerance strategies",
  },
  {
    label: "AI Agents & RAG",
    detail: "Multi-agent orchestration, retrieval pipeline optimization, faithfulness evaluation",
  },
  {
    label: "Secure Backend Architecture",
    detail: "Defense-in-depth API design, secrets management, cryptographic protocol selection",
  },
  {
    label: "Rust",
    detail: "Systems programming, ownership model, async runtimes, and zero-cost abstractions",
  },
  {
    label: "Kubernetes",
    detail: "Pod scheduling, service mesh, cluster operations, and cloud-native deployment patterns",
  },
  {
    label: "Infrastructure as Code",
    detail: "Terraform, reproducible environments, and declarative infrastructure management",
  },
] as const;

// ─── Engineering Principles (short-form manifesto lines) ──────────────────────

export const principles = [
  "Write code for the engineer who inherits it, not the deadline that creates it.",
  "The schema is the most durable part of a system — design it like it will outlive the code.",
  "Every external call is a failure mode. Design for the unhappy path first.",
  "Complexity is not sophistication. The simplest solution that satisfies the constraints is the correct solution.",
  "If it isn't monitored, it doesn't exist in production.",
  "Security requirements are not negotiable features. They are table stakes.",
] as const;