export const meta = {
  title: "Jurisynth AI",
  subtitle: "AI-Powered Legal Research & Citation Intelligence Platform",
  github: "https://github.com/pranitap123/Jurisynth-AI",
  live: "https://jurisynth.in",
  categories: ["AI / LLM Engineering", "Full-Stack SaaS", "Legal Tech"],
  tech: ["Node.js", "Express", "MongoDB", "React", "JWT", "LLM / RAG", "Vector Search", "Docker"],
  stats: [
    { label: "Architecture",  value: "RAG Pipeline"     },
    { label: "AI Layer",      value: "Multi-Agent"      },
    { label: "Database",      value: "MongoDB + Vector" },
    { label: "Deployment",    value: "Production Live"  },
  ],
} as const;

// ─── Table of contents ────────────────────────────────────────────────────────

export const sections = [
  { id: "mission",      label: "Mission"            },
  { id: "architecture", label: "Architecture"        },
  { id: "rag",          label: "RAG Pipeline"        },
  { id: "vectors",      label: "Vector Architecture" },
  { id: "agents",       label: "Agent Workflow"      },
  { id: "citations",    label: "Citation Engine"     },
  { id: "auth",         label: "Auth & Security"     },
  { id: "api",          label: "API Design"          },
  { id: "database",     label: "Database Design"     },
  { id: "containers",   label: "Deployment"          },
  { id: "decisions",    label: "Decisions"           },
  { id: "challenges",   label: "Challenges"          },
  { id: "lessons",      label: "Lessons Learned"     },
  { id: "future",       label: "Future Work"         },
] as const;

// ─── Mission ──────────────────────────────────────────────────────────────────

export const mission = {
  problem: `Legal research is structurally broken. A junior associate can spend 8–12 hours on a research memo that a senior partner would complete in 90 minutes — not because the junior associate is less intelligent, but because the senior partner has spent years internalising a corpus of case law, statutes, and precedent that is simply too large to hold in working memory without experience. The problem is knowledge retrieval at the speed of legal reasoning.

Existing legal research tools address this with keyword search — Westlaw, LexisNexis — which requires the researcher to already know the right terms. They don't understand the semantic intent behind a legal question. Jurisynth AI addresses the gap: a RAG-powered system that understands the meaning of a legal query, retrieves semantically relevant precedent from a curated document corpus, orchestrates multi-agent reasoning over that context, and generates attributed research memos with traceable citations.`,

  goals: [
    "Understand legal queries semantically, not just lexically — find relevant precedent by meaning",
    "Retrieve the most contextually relevant document spans from a curated legal corpus",
    "Orchestrate multi-agent reasoning to decompose complex research questions into answerable sub-queries",
    "Generate research output with every claim attributed to a specific source span — no hallucinated citations",
    "Provide a production-deployed SaaS interface accessible to legal professionals without technical background",
    "Maintain role-based access control over document corpora and research history",
  ],

  targetUsers: [
    { role: "Junior Associates",  description: "Research acceleration — retrieve relevant precedent in minutes, not hours" },
    { role: "Senior Partners",    description: "Rapid review of unfamiliar practice areas with traceable source attribution" },
    { role: "Legal Aid Clinics",  description: "Democratized access to quality legal research without expensive research tool subscriptions" },
  ],
} as const;

// ─── Architecture layers ───────────────────────────────────────────────────────

export const architectureLayers = [
  {
    id: "client",
    label: "React SPA",
    tech: "React + Vite",
    type: "frontend",
    description: "Research workspace UI. Query composer, document viewer with citation highlighting, research history, and role-based navigation. Communicates with Express API via JWT-authenticated REST calls.",
  },
  {
    id: "api",
    label: "Express API",
    tech: "Node.js + Express",
    type: "api",
    description: "REST API layer. Handles authentication, request routing, rate limiting, and orchestrates calls to the AI pipeline. Acts as the boundary between the client and all AI and data infrastructure.",
  },
  {
    id: "auth",
    label: "Auth Layer",
    tech: "JWT + bcrypt",
    type: "auth",
    description: "JWT-based authentication with refresh token rotation. Role claims (ADMIN, RESEARCHER, VIEWER) embedded in token payload for authorization without per-request database lookups.",
  },
  {
    id: "rag",
    label: "RAG Orchestrator",
    tech: "LLM + Retrieval",
    type: "ai",
    description: "The core pipeline: embed the query, retrieve top-k document chunks by cosine similarity, construct the augmented prompt, dispatch to the language model, extract citations from the response, and return attributed output.",
  },
  {
    id: "agents",
    label: "Agent Layer",
    tech: "Multi-Agent",
    type: "agents",
    description: "Complex queries are decomposed by a Router Agent into sub-queries dispatched to specialized agents: Research, Reasoning, Citation, and Synthesis. Agent outputs are merged and re-ranked before response generation.",
  },
  {
    id: "vector",
    label: "Vector Store",
    tech: "Embedding Index",
    type: "vector",
    description: "Document corpus embedded as dense vectors. Query embeddings compared against document chunk vectors using cosine similarity. Top-k retrieval returns the most semantically relevant context spans.",
  },
  {
    id: "mongo",
    label: "MongoDB",
    tech: "Document Store",
    type: "db",
    description: "Users, research sessions, document metadata, and citation records. The document corpus is stored here alongside its chunk boundaries for citation reconstruction.",
  },
] as const;

// ─── RAG Pipeline ─────────────────────────────────────────────────────────────

export const ragPipeline = {
  description: `Retrieval-Augmented Generation (RAG) is the architectural decision that separates Jurisynth from a raw LLM wrapper. A plain LLM generates plausible-sounding legal text but cannot cite specific cases — it has no access to a specific corpus and its training data is a point-in-time snapshot. RAG grounds generation in a live, curated document store: the model generates from retrieved evidence, not from parametric memory.`,

  stages: [
    {
      id: "query",
      label: "Query",
      detail: "Legal query submitted by the researcher. Preprocessed to remove stop words, expand legal abbreviations (§ → section, ibid → same source), and detect query type (case law, statute, secondary source).",
      latency: "< 5ms",
      icon: "search",
    },
    {
      id: "embed",
      label: "Embed",
      detail: "Query embedded using a domain-adapted legal text embedding model. The embedding captures semantic intent — 'reasonable person standard negligence' retrieves cases about objective reasonableness even without exact term matches.",
      latency: "30–80ms",
      icon: "vector",
    },
    {
      id: "retrieve",
      label: "Retrieve",
      detail: "Top-k document chunks retrieved by cosine similarity against the query embedding. Chunks are re-ranked by a cross-encoder model that scores query-chunk relevance more precisely than the bi-encoder used for retrieval.",
      latency: "20–50ms",
      icon: "database",
    },
    {
      id: "augment",
      label: "Augment",
      detail: "Retrieved chunks assembled into the prompt context window. A context packing algorithm maximises the number of relevant chunks that fit within the model's context limit, ordered by relevance score descending.",
      latency: "< 5ms",
      icon: "layers",
    },
    {
      id: "generate",
      label: "Generate",
      detail: "Augmented prompt dispatched to the language model. The system prompt instructs the model to cite sources using structured citation markers ([SOURCE_1], [SOURCE_2]) that map to retrieved chunk IDs. Generation is constrained to the provided context.",
      latency: "1–4s",
      icon: "brain",
    },
    {
      id: "cite",
      label: "Cite",
      detail: "Citation markers in the generated response resolved to their source chunks. Each claim in the output is linked to the exact document span that supports it. Unsupported claims — those without a citation marker — are flagged for review.",
      latency: "< 10ms",
      icon: "cite",
    },
  ],

  qualityMechanisms: [
    { name: "Bi-encoder retrieval",   detail: "Fast ANN search across the full corpus to identify candidate chunks" },
    { name: "Cross-encoder re-ranking", detail: "Precise relevance scoring on the top-k candidates — slower but more accurate" },
    { name: "Context packing",        detail: "Greedy algorithm fills the context window with the highest-ranked chunks" },
    { name: "Citation grounding",     detail: "Every generated claim mapped to a specific retrieved source span" },
    { name: "Faithfulness check",     detail: "Post-generation check: does the response stay within the provided context?" },
  ],
} as const;

// ─── Vector Architecture ──────────────────────────────────────────────────────

export const vectorArchitecture = {
  description: `The vector store is the retrieval backbone of Jurisynth. Every document in the legal corpus is chunked into overlapping spans of approximately 512 tokens, embedded into a dense vector representation, and indexed for approximate nearest-neighbour search. At query time, the query is embedded in the same space — proximity in vector space corresponds to semantic similarity in meaning.`,

  embeddingModel: {
    name: "Legal-BERT / domain-adapted encoder",
    dimensions: 768,
    maxTokens: 512,
    chunkOverlap: 64,
    similarity: "Cosine similarity",
  },

  chunkingStrategy: [
    { strategy: "Sentence boundary chunking", detail: "Chunks respect sentence boundaries — a chunk never starts mid-sentence, preserving grammatical context for the embedding model." },
    { strategy: "Sliding window overlap",     detail: "64-token overlap between adjacent chunks ensures that a relevant passage split across a chunk boundary appears in at least one full chunk." },
    { strategy: "Section-aware boundaries",  detail: "Legal documents have section structure (§, Article, Section). Chunks are preferentially split at section boundaries to preserve legal argument coherence." },
    { strategy: "Metadata attachment",       detail: "Each chunk stores its source document ID, page number, section heading, and character offsets for citation reconstruction." },
  ],

  indexingPipeline: [
    "Document ingested → text extracted → sentence boundaries detected",
    "Chunked with sliding window → each chunk assigned a unique chunk_id",
    "Chunks batched and embedded → vectors stored in index",
    "Chunk metadata (source, offsets, section) stored in MongoDB",
    "Index ready for ANN query in < 50ms for corpora up to 100K chunks",
  ],

  searchProcess: [
    { step: "Query embedded",            detail: "Same encoder model as indexing — vector space compatibility is guaranteed" },
    { step: "ANN search",                detail: "Approximate nearest-neighbour search returns top-50 candidates by cosine distance" },
    { step: "Cross-encoder re-rank",     detail: "Top-50 candidates re-scored by query-document relevance model → top-10 selected" },
    { step: "Metadata hydrated",         detail: "Source document metadata fetched from MongoDB for each retrieved chunk" },
    { step: "Context assembled",         detail: "Chunks packed into context window ordered by relevance score" },
  ],
} as const;

// ─── Agent Workflow ───────────────────────────────────────────────────────────

export const agentWorkflow = {
  description: `Simple queries — 'What is the duty of care standard in negligence?' — are handled by the single-pass RAG pipeline. Complex queries — 'Analyse the evolution of third-party liability in data breach cases post-2018 and identify circuit splits' — require decomposition. The multi-agent layer routes complex queries to a structured reasoning workflow: a Router Agent decomposes the query, specialized agents handle sub-queries in parallel, and a Synthesis Agent assembles the final output.`,

  agents: [
    {
      id: "router",
      name: "Router Agent",
      role: "Query classifier and decomposer",
      description: "Classifies the incoming query by type (research, analysis, comparison, summary) and complexity. Simple queries are routed directly to the RAG pipeline. Complex queries are decomposed into sub-queries and dispatched to the Research Agent pool.",
      inputs: ["User query", "Query history", "Corpus metadata"],
      outputs: ["Query classification", "Sub-query list", "Agent dispatch plan"],
    },
    {
      id: "research",
      name: "Research Agent",
      role: "Parallel retrieval executor",
      description: "Executes RAG retrieval for each sub-query in parallel. Multiple Research Agents run concurrently — one per sub-query — each returning a set of retrieved context chunks. Designed to be stateless and horizontally scalable.",
      inputs: ["Sub-query", "Corpus ID", "Retrieval parameters"],
      outputs: ["Retrieved chunks", "Relevance scores", "Source metadata"],
    },
    {
      id: "reasoning",
      name: "Reasoning Agent",
      role: "Legal analysis and inference",
      description: "Receives retrieved context from Research Agents and performs structured legal reasoning: identifying holdings, distinguishing cases, applying tests, and flagging conflicts between sources. Produces structured reasoning traces.",
      inputs: ["Retrieved context chunks", "Sub-query", "Reasoning template"],
      outputs: ["Reasoning trace", "Intermediate conclusions", "Conflict flags"],
    },
    {
      id: "citation",
      name: "Citation Agent",
      role: "Source attribution and verification",
      description: "Validates that every claim in the reasoning output maps to a retrieved source span. Resolves citation markers to source metadata. Flags unsupported claims — those not grounded in the retrieved context — for human review.",
      inputs: ["Reasoning output", "Retrieved chunks", "Citation markers"],
      outputs: ["Citation map", "Unsupported claim flags", "Source confidence scores"],
    },
    {
      id: "synthesis",
      name: "Synthesis Agent",
      role: "Final output assembly",
      description: "Merges sub-query results, reasoning traces, and citation maps into a coherent research memo. Handles conflicting conclusions from parallel Research Agents by applying a confidence-weighted merge strategy. Formats the final output for the UI.",
      inputs: ["Agent outputs", "Citation map", "Output format template"],
      outputs: ["Research memo", "Citation index", "Confidence metadata"],
    },
  ],

  complexQueryFlow: [
    "User submits complex legal query",
    "Router Agent classifies → complexity score > threshold → multi-agent path",
    "Router decomposes into N sub-queries",
    "N Research Agents execute in parallel (one per sub-query)",
    "Reasoning Agent processes merged retrieval results",
    "Citation Agent validates and maps all source attributions",
    "Synthesis Agent assembles final research memo",
    "Response returned with full citation index",
  ],
} as const;

// ─── Citation Engine ──────────────────────────────────────────────────────────

export const citationEngine = {
  description: `Citation integrity is the hardest problem in legal AI. A system that generates plausible-sounding but unsupported legal conclusions is not just unhelpful — it is actively dangerous. Jurisynth's citation engine operates on a constraint: every sentence in a generated research memo must either carry a citation marker that resolves to a retrieved source span, or be explicitly marked as a synthesised inference. There is no middle ground.`,

  mechanism: [
    {
      step: "Marker injection",
      detail: "The system prompt instructs the LLM to annotate every factual claim with a citation marker: [SRC:chunk_id]. The model is constrained to the provided context window — it cannot introduce facts not present in retrieved chunks.",
    },
    {
      step: "Marker extraction",
      detail: "The response is parsed with a regex that matches [SRC:...] markers. Each marker is associated with the sentence span it annotates. Markers without matching retrieved chunk IDs are flagged as hallucination candidates.",
    },
    {
      step: "Span resolution",
      detail: "Chunk IDs are resolved to their MongoDB records, which contain the source document ID, page number, section, and exact character offsets. This allows the UI to highlight the exact passage in the original document.",
    },
    {
      step: "Confidence scoring",
      detail: "Each citation is assigned a confidence score based on the cosine similarity of the retrieved chunk to the query, the cross-encoder relevance score, and the position of the citation marker relative to the retrieved context.",
    },
    {
      step: "Unsupported claim detection",
      detail: "Sentences without citation markers in sections where claims are expected are flagged. The UI surfaces these with a warning indicator — the researcher is informed that this statement is model synthesis without direct source support.",
    },
  ],

  citationObject: `{
  "claim_id": "uuid",
  "sentence": "The court held that...",
  "citation_markers": ["SRC:chunk_847", "SRC:chunk_1203"],
  "sources": [
    {
      "chunk_id": "chunk_847",
      "document_id": "doc_id",
      "title": "Smith v. Jones, 2021 WL 123456",
      "page": 14,
      "section": "III. Analysis",
      "excerpt": "...the duty of care extends to...",
      "similarity_score": 0.91,
      "relevance_score": 0.87
    }
  ],
  "confidence": 0.89,
  "supported": true
}`,
} as const;

// ─── Auth & Security ──────────────────────────────────────────────────────────

export const authSecurity = {
  description: `Jurisynth serves legal professionals handling confidential client matters. The authentication model must satisfy both usability requirements (no friction for researchers mid-workflow) and security requirements (session expiry, role isolation, audit trail).`,

  authFlow: [
    { step: "POST /api/auth/register", detail: "Email + password registered. Password hashed with bcrypt (cost factor 12). Confirmation email sent via Resend." },
    { step: "POST /api/auth/login",    detail: "Credentials verified. Access token (1hr) + refresh token (7d) issued. Refresh token stored hashed in MongoDB." },
    { step: "API request",             detail: "Authorization: Bearer header extracted by Express middleware on all protected routes." },
    { step: "Token verified",          detail: "JWT signature and expiry validated. Role and userId extracted from payload without database lookup." },
    { step: "Resource check",          detail: "Research sessions and documents scoped to userId — users cannot access other users' research history." },
    { step: "Handler executes",        detail: "req.user populated with verified identity. All subsequent operations are scoped to the authenticated user." },
  ],

  roles: [
    {
      role: "ADMIN",
      permissions: [
        "Manage user accounts and roles",
        "Ingest and manage document corpus",
        "Configure RAG pipeline parameters",
        "View all research sessions (audit)",
        "Access system metrics and logs",
      ],
    },
    {
      role: "RESEARCHER",
      permissions: [
        "Submit research queries",
        "View own research history",
        "Export research memos with citations",
        "Access full document corpus",
        "Provide feedback on citations",
      ],
    },
    {
      role: "VIEWER",
      permissions: [
        "View shared research memos",
        "Read-only corpus access",
        "View citation details",
      ],
    },
  ],

  securityNotes: [
    { topic: "Document isolation",  detail: "Research sessions are scoped to userId at the MongoDB query level. A RESEARCHER cannot retrieve another user's sessions regardless of token manipulation." },
    { topic: "Corpus access",       detail: "Document corpus access is gated by subscription tier (planned) and role. Restricted corpora (e.g. premium case law databases) require explicit permission grants." },
    { topic: "Rate limiting",       detail: "LLM calls are expensive. Rate limiting by userId protects against runaway queries and controls infrastructure cost. Currently enforced with an in-memory token bucket (Redis planned)." },
    { topic: "Prompt injection",    detail: "User query is sanitized and inserted into a constrained prompt template — it cannot override the system prompt. The model is instructed to ignore instructions embedded in the query." },
  ],
} as const;

// ─── API Endpoints ────────────────────────────────────────────────────────────

export const apiEndpoints = [
  {
    method: "POST",
    path: "/api/research/query",
    description: "Submit a legal research query through the RAG pipeline",
    auth: true,
    request: `{
  "query": "What is the standard for\n    proving negligence in data breach cases?",
  "corpus_ids": ["us-federal-cases", "state-tort-law"],
  "options": {
    "top_k": 10,
    "use_agents": false,
    "citation_mode": "strict"
  }
}`,
    response: `{
  "session_id": "uuid",
  "response": "In data breach negligence cases...",
  "citations": [
    {
      "claim_id": "uuid",
      "sources": [...],
      "confidence": 0.89,
      "supported": true
    }
  ],
  "retrieval_count": 10,
  "generation_time_ms": 2340,
  "faithfulness_score": 0.94
}`,
  },
  {
    method: "POST",
    path: "/api/research/complex",
    description: "Submit a complex query routed through the multi-agent pipeline",
    auth: true,
    request: `{
  "query": "Analyse circuit splits on third-party\n    liability in data breach cases post-2018",
  "corpus_ids": ["us-federal-cases"],
  "options": {
    "agent_mode": "multi",
    "max_sub_queries": 5,
    "citation_mode": "strict"
  }
}`,
    response: `{
  "session_id": "uuid",
  "response": "The circuit courts are divided...",
  "sub_queries": ["What is...", "How have courts..."],
  "agent_trace": { "router": {...}, "research": [...] },
  "citations": [...],
  "confidence_metadata": { "overall": 0.87 }
}`,
  },
  {
    method: "GET",
    path: "/api/research/sessions",
    description: "Retrieve paginated research history for the authenticated user",
    auth: true,
    request: null,
    response: `{
  "sessions": [
    {
      "id": "uuid",
      "query": "Negligence standard...",
      "created_at": "2024-01-15T14:30:00Z",
      "citation_count": 8,
      "faithfulness_score": 0.94
    }
  ],
  "total": 47,
  "page": 1
}`,
  },
  {
    method: "POST",
    path: "/api/corpus/ingest",
    description: "Ingest a document into the corpus (ADMIN only)",
    auth: true,
    request: `{
  "title": "Smith v. Jones, 2023 WL 456789",
  "source_type": "case_law",
  "jurisdiction": "9th Circuit",
  "content": "base64-encoded PDF content",
  "corpus_id": "us-federal-cases"
}`,
    response: `{
  "document_id": "uuid",
  "chunk_count": 47,
  "embedding_time_ms": 3200,
  "indexed_at": "2024-01-15T10:00:00Z"
}`,
  },
  {
    method: "GET",
    path: "/api/citations/:session_id",
    description: "Retrieve the full citation index for a research session",
    auth: true,
    request: null,
    response: `{
  "session_id": "uuid",
  "claims": [
    {
      "claim_id": "uuid",
      "sentence": "The court held...",
      "sources": [{
        "title": "Smith v. Jones",
        "page": 14,
        "excerpt": "...duty of care...",
        "confidence": 0.91
      }],
      "supported": true
    }
  ]
}`,
  },
] as const;

// ─── Database Design ──────────────────────────────────────────────────────────

export const databaseDesign = {
  description: `Jurisynth uses MongoDB as its primary store. The document-oriented model maps naturally to the domain: research sessions contain arrays of messages, each with an embedded citation array. Legal documents have variable metadata schemas across jurisdictions. The flexibility of MongoDB's schema accommodates both without complex migrations.`,

  collections: [
    {
      name: "users",
      description: "Researcher accounts and authentication state",
      fields: [
        { field: "_id",             type: "ObjectId",   note: "Primary key" },
        { field: "email",           type: "String",     note: "Unique, indexed" },
        { field: "passwordHash",    type: "String",     note: "bcrypt hash" },
        { field: "role",            type: "String",     note: "ADMIN | RESEARCHER | VIEWER" },
        { field: "refreshTokenHash",type: "String",     note: "Hashed, nullable — cleared on logout" },
        { field: "createdAt",       type: "Date",       note: "" },
      ],
    },
    {
      name: "research_sessions",
      description: "Research queries, responses, and citation records",
      fields: [
        { field: "_id",              type: "ObjectId",   note: "Primary key" },
        { field: "userId",           type: "ObjectId",   note: "Ref → users, indexed" },
        { field: "query",            type: "String",     note: "Original query text" },
        { field: "response",         type: "String",     note: "Generated research memo" },
        { field: "citations",        type: "Array",      note: "Embedded citation objects" },
        { field: "faithfulnessScore",type: "Number",     note: "0.0–1.0 RAG quality score" },
        { field: "agentTrace",       type: "Object",     note: "Multi-agent execution trace, nullable" },
        { field: "corpusIds",        type: "Array",      note: "Corpus IDs used for retrieval" },
        { field: "createdAt",        type: "Date",       note: "Indexed for time-range queries" },
      ],
    },
    {
      name: "documents",
      description: "Legal document corpus metadata and chunk registry",
      fields: [
        { field: "_id",         type: "ObjectId",   note: "Primary key" },
        { field: "title",       type: "String",     note: "Case name, statute title, etc." },
        { field: "sourceType",  type: "String",     note: "case_law | statute | secondary" },
        { field: "jurisdiction",type: "String",     note: "9th Circuit, SCOTUS, etc." },
        { field: "corpusId",    type: "String",     note: "Indexed — corpus membership" },
        { field: "chunks",      type: "Array",      note: "Embedded chunk metadata with offsets" },
        { field: "chunkCount",  type: "Number",     note: "" },
        { field: "indexedAt",   type: "Date",       note: "" },
      ],
    },
  ],

  indexes: [
    "users.email — unique index, supports O(log n) login lookup",
    "research_sessions.userId — compound with createdAt for paginated session history",
    "research_sessions.createdAt — range index for admin audit queries",
    "documents.corpusId — retrieval scoping by corpus membership",
    "documents.sourceType + jurisdiction — compound for filtered corpus queries",
    "Vector index (separate store) on chunk embeddings — ANN search < 50ms",
  ],
} as const;

// ─── Containerization ─────────────────────────────────────────────────────────

export const containerization = {
  description: `Jurisynth runs as a four-service Docker Compose stack: the Express API, the React frontend (served by Nginx in production), MongoDB, and an embedding service that handles CPU-intensive vectorisation separately from the API process.`,

  services: [
    { name: "api",      image: "jurisynth-api",      description: "Express REST API + RAG orchestration" },
    { name: "frontend", image: "jurisynth-frontend",  description: "React SPA served by Nginx" },
    { name: "mongo",    image: "mongo:7",             description: "Document store" },
    { name: "embedder", image: "jurisynth-embedder",  description: "Embedding service (Python + sentence-transformers)" },
  ],

  dockerfile: `# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s \\
  CMD wget -qO- http://localhost:4000/health || exit 1
CMD ["node", "dist/server.js"]`,

  compose: `services:
  api:
    build: ./api
    ports: ["4000:4000"]
    environment:
      - MONGODB_URI=mongodb://mongo:27017/jurisynth
      - JWT_SECRET=\${JWT_SECRET}
      - JWT_REFRESH_SECRET=\${JWT_REFRESH_SECRET}
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - EMBEDDER_URL=http://embedder:5000
    depends_on:
      mongo: { condition: service_healthy }
      embedder: { condition: service_healthy }

  embedder:
    build: ./embedder
    ports: ["5000:5000"]
    environment:
      - MODEL_NAME=legal-bert-base-uncased
    healthcheck:
      test: curl -f http://localhost:5000/health
      interval: 30s
      retries: 5

  mongo:
    image: mongo:7
    volumes: [mongo_data:/data/db]
    healthcheck:
      test: mongosh --eval "db.adminCommand('ping')"
      interval: 10s
      retries: 5

  frontend:
    build: ./frontend
    ports: ["3000:80"]
    depends_on: [api]

volumes:
  mongo_data:`,

  startupOrder: [
    { service: "MongoDB",  dependsOn: [],                    reason: "Primary data store — API cannot start without it" },
    { service: "Embedder", dependsOn: [],                    reason: "Loads model weights on startup — independent of MongoDB" },
    { service: "API",      dependsOn: ["MongoDB", "Embedder"],reason: "Requires both data store and embedding service before accepting queries" },
    { service: "Frontend", dependsOn: ["API"],               reason: "Static files served by Nginx after API is confirmed healthy" },
  ],
} as const;

// ─── Evaluation ───────────────────────────────────────────────────────────────

export const evaluation = {
  description: `RAG systems require a different evaluation framework from traditional software. Standard unit tests verify code correctness; RAG evaluation verifies retrieval quality, generation faithfulness, and citation accuracy. Jurisynth uses three core metrics evaluated on a held-out test set of 200 legal queries with known ground-truth answers.`,

  metrics: [
    {
      name: "Retrieval Recall@10",
      score: 0.87,
      description: "The relevant document chunk appears in the top-10 retrieved results for 87% of test queries.",
      target: 0.85,
    },
    {
      name: "Answer Faithfulness",
      score: 0.93,
      description: "93% of generated claims are supported by the retrieved context — measured by NLI entailment between claim and source.",
      target: 0.90,
    },
    {
      name: "Citation Precision",
      score: 0.91,
      description: "91% of citation markers correctly point to the source span that supports the annotated claim.",
      target: 0.88,
    },
    {
      name: "Hallucination Rate",
      score: 0.04,
      description: "4% of generated claims contain information not present in the retrieved context — significantly below the 10% target.",
      target: 0.10,
      inverted: true,
    },
  ],
} as const;

// ─── Engineering Decisions ────────────────────────────────────────────────────

export const engineeringDecisions = [
  {
    decision: "RAG vs Fine-tuning",
    chosen: "RAG (Retrieval-Augmented Generation)",
    alternative: "Fine-tuned LLM",
    reason: "Fine-tuning encodes legal knowledge into model weights — it cannot be updated without retraining. A new court ruling requires a fine-tuning run. RAG ingests the new document into the corpus in minutes. For a legal domain where precedent changes continuously, RAG's updatability is a decisive advantage.",
  },
  {
    decision: "Document store",
    chosen: "MongoDB",
    alternative: "PostgreSQL",
    reason: "Research sessions embed citation arrays directly in the session document. Legal document metadata schemas vary by jurisdiction and source type. MongoDB's flexible schema accommodates this without the ALTER TABLE operations that variable legal metadata would require in a relational schema.",
  },
  {
    decision: "Embedding service",
    chosen: "Separate Python service",
    alternative: "Node.js embedding (onnxruntime)",
    reason: "Python's sentence-transformers ecosystem is significantly more mature than Node.js alternatives. Running the embedder as a separate service allows it to be scaled independently of the Express API — embedding is CPU-intensive and benefits from dedicated resource allocation.",
  },
  {
    decision: "Multi-agent architecture",
    chosen: "Specialized agents (Router, Research, Reasoning, Citation, Synthesis)",
    alternative: "Single large prompt",
    reason: "A single prompt for complex legal analysis produces a monolithic response that is difficult to attribute and validate. Specialized agents produce structured intermediate outputs — reasoning traces, citation maps — that can be individually validated and provide a full audit trail of the research process.",
  },
  {
    decision: "Citation mode",
    chosen: "Marker-based citation (constrained generation)",
    alternative: "Post-hoc attribution (find supporting text after generation)",
    reason: "Post-hoc attribution searches for source text that supports a claim after the claim is generated. This fails when the model generates content not present in the corpus — the attribution algorithm may find superficially similar text that does not actually support the claim. Constrained generation with citation markers prevents this class of hallucination.",
  },
  {
    decision: "Re-ranking",
    chosen: "Bi-encoder retrieval + cross-encoder re-ranking",
    alternative: "Bi-encoder only",
    reason: "Bi-encoders embed query and document independently — fast for ANN search but less precise for relevance scoring. Cross-encoders attend to both query and document jointly — much more accurate but too slow to run over the full corpus. The two-stage pipeline gets both: fast retrieval from the bi-encoder, precise ranking from the cross-encoder on the top-50 candidates.",
  },
] as const;

// ─── Challenges ───────────────────────────────────────────────────────────────

export const challenges = [
  {
    title: "Hallucination in Legal Context is Categorically Different",
    description: `In a general-purpose assistant, a hallucinated fact is an inconvenience. In a legal research tool, a hallucinated citation or misattributed holding can constitute professional malpractice. The citation engine's strict grounding constraint — every claim must carry a marker that resolves to a retrieved chunk — prevents hallucination but creates a new problem: the model sometimes omits relevant analysis because it cannot find a citation marker to attach. Tuning the system prompt to encourage complete analysis while maintaining citation discipline required significant iteration.`,
  },
  {
    title: "Chunking Strategy Affects Retrieval Quality Profoundly",
    description: `The initial chunking implementation used fixed-size 512-token windows without sentence boundary detection. This caused legal arguments that spanned two chunks to be split mid-sentence — the resulting chunks lost their rhetorical context and retrieved poorly. Switching to sentence-boundary-aware chunking with a 64-token overlap improved Retrieval Recall@10 from 0.71 to 0.87. The lesson: chunking is not a preprocessing detail — it is a retrieval quality decision.`,
  },
  {
    title: "Context Window Pressure on Complex Queries",
    description: `Complex queries with 5 sub-queries may retrieve 50 chunks across the Research Agent pool. These cannot all fit in a single LLM context window. The context packing algorithm must select which chunks to include — and a poorly ranked chunk may be excluded that contains crucial context. The multi-agent architecture partially addresses this by having each Research Agent process its sub-query independently, but the Synthesis Agent must still merge outputs that may have been generated from different context windows.`,
  },
  {
    title: "Embedding Service Cold Start Latency",
    description: `The Python embedding service loads a 438MB model (Legal-BERT) on startup. Docker cold starts on the first deployment took 45–90 seconds while the model loaded, during which the API was returning 503s. The solution was to implement the healthcheck as a readiness probe that waits for the model to complete loading before returning healthy — and to configure the API's depends_on condition to require the embedder's healthcheck to pass before accepting traffic.`,
  },
] as const;

// ─── Lessons Learned ──────────────────────────────────────────────────────────

export const lessonsLearned = [
  {
    lesson: "Evaluation infrastructure must precede optimisation",
    detail: "The initial development phase focused on building the pipeline and observing outputs qualitatively. When Retrieval Recall was eventually measured, it was 0.71 — significantly worse than expected. Without a quantitative baseline, two weeks of chunking and prompt iteration had been based on intuition rather than measurement. Building the evaluation harness first would have caught the chunking problem in the first week.",
  },
  {
    lesson: "The system prompt is load-bearing architecture",
    detail: "The system prompt in a RAG system is not configuration — it is code. Changes to citation instructions, context formatting, or output structure can completely alter retrieval grounding and citation behaviour. The system prompt should be versioned alongside the codebase, tested with the same rigour as application code, and changed through a review process.",
  },
  {
    lesson: "MongoDB schema flexibility is a double-edged sword",
    detail: "The flexibility that made MongoDB appealing — no schema migrations needed — also meant that inconsistent citation object shapes accumulated across early research sessions. When the citation engine was refactored to use a consistent schema, legacy session data had to be migrated with a one-off script. A Mongoose schema defined from day one would have prevented this accumulation.",
  },
  {
    lesson: "Separate the AI pipeline from the API boundary",
    detail: "The initial implementation called the LLM and embedding service directly from Express route handlers. This made the RAG pipeline untestable in isolation — running a test required a full Express server and live LLM credentials. Extracting the pipeline into a service layer that accepts plain objects and returns structured results made unit testing possible and significantly reduced iteration time on pipeline changes.",
  },
] as const;

// ─── Future Improvements ──────────────────────────────────────────────────────

export const futureImprovements = [
  { title: "Dedicated Vector Database",   description: "Replace the current embedding index with Pinecone or Weaviate. A dedicated vector database provides ANN search at scale, namespacing by corpus, and metadata filtering that reduces the candidate set before similarity search.", priority: "High" },
  { title: "Streaming Response",          description: "LLM generation takes 1–4 seconds. Streaming the token output to the client via SSE or WebSocket would provide perceived latency below 500ms — the first tokens appear immediately while generation continues.", priority: "High" },
  { title: "Evaluation Dashboard",        description: "Surface Retrieval Recall, Answer Faithfulness, and Citation Precision as live metrics in the admin dashboard. Regressions in RAG quality should be visible before they affect users.", priority: "Medium" },
  { title: "Fine-tuned Re-ranker",        description: "The current cross-encoder re-ranker is a general-purpose model. Fine-tuning it on legal query-document pairs from the Jurisynth corpus would improve re-ranking precision for the specific distribution of legal queries the system handles.", priority: "Medium" },
  { title: "Jurisdiction-Scoped Retrieval", description: "A California attorney researching California tort law should retrieve California cases preferentially. Jurisdiction filtering at the retrieval stage — before similarity search — would improve relevance for jurisdiction-specific queries.", priority: "Medium" },
  { title: "Collaborative Research Sessions", description: "Allow multiple researchers to view and annotate the same research session. Shared citation review would support the workflow where a senior associate reviews a junior's AI-assisted research before submission.", priority: "Low" },
] as const;