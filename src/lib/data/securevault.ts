export const heroData = {
  title: "SecureVault Backend",
  subtitle: "Encrypted Secret Management Platform",
  description:
  "Production-grade encrypted secrets management platform with AES-256-GCM encryption, JWT authentication, PostgreSQL, Prisma, and Docker.",
  github: "https://github.com/pranitap123/securevault-backend",
  categories: ["Security Engineering", "Backend Systems", "Infrastructure"],
  tech: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "JWT", "AES-256", "Zod"],
  stats: [
    { label: "Encryption", value: "AES-256-GCM" },
    { label: "Auth", value: "JWT + Refresh" },
    { label: "Database", value: "PostgreSQL" },
    { label: "Containerized", value: "Docker" },
  ],
} as const;

export const sections = [
  { id: "mission", label: "The Mission" },
  { id: "architecture", label: "Architecture" },
  { id: "auth", label: "Authentication" },
  { id: "database", label: "Database Design" },
  { id: "encryption", label: "Encryption Model" },
  { id: "api", label: "API Design" },
  { id: "containers", label: "Containerization" },
  { id: "decisions", label: "Decisions" },
  { id: "challenges", label: "Challenges" },
  { id: "lessons", label: "Lessons Learned" },
  { id: "future", label: "Future Work" },
] as const;

export const mission = {
  problem: `In most application stacks, credentials are the weakest link — not because engineers are careless, but because the tooling to do it right is often absent. Database passwords live in .env files committed to version control. API keys are copy-pasted between team members in Slack. Secret rotation requires manual coordination across multiple services with no audit trail.\n\nThe consequences are predictable: credential leaks, access sprawl, no visibility into who accessed what and when. SecureVault is a direct response to this operational gap — a purpose-built backend service for storing, managing, and rotating application secrets with strong cryptographic guarantees and a well-defined access model.`,
  requirements: [
    {
      category: "Security",
      items: [
        "All secrets encrypted at rest with AES-256-GCM before database write",
        "Authentication tokens expire and rotate — no long-lived static credentials",
        "Role-based access ensures users can only retrieve their own secrets",
        "Input validation on every boundary to prevent injection and malformed data",
      ],
    },
    {
      category: "Operational",
      items: [
        "Structured JSON logging for every authentication and access event",
        "Environment-based configuration — no secrets in source code",
        "Docker deployment for environment parity between local and production",
        "Health check endpoints for load balancer and orchestrator integration",
      ],
    },
    {
      category: "Scalability",
      items: [
        "Stateless JWT authentication — any node can validate any token without shared state",
        "Connection pooling via Prisma to handle concurrent secret retrieval",
        "Namespace isolation for multi-tenant secret organization",
        "Schema migration history with reversible operations",
      ],
    },
  ],
} as const;

export const architectureLayers = [
  { label: "HTTP Client", tech: "REST Consumer", type: "client", description: "API consumer — CLI, application, or web client" },
  { label: "Express API Layer", tech: "Node.js + TypeScript", type: "api", description: "Route handlers, Zod validation, error normalization" },
  { label: "Auth Middleware", tech: "JWT Verification", type: "auth", description: "Token verification, role extraction, request enrichment" },
  { label: "Business Logic", tech: "Service Layer", type: "logic", description: "Secret lifecycle operations, namespace management, rotation" },
  { label: "Encryption Layer", tech: "AES-256-GCM", type: "encryption", description: "Encrypt before write, decrypt after read — never plaintext at rest" },
  { label: "Prisma ORM", tech: "Type-safe queries", type: "orm", description: "Query building, migration management, connection pooling" },
  { label: "PostgreSQL", tech: "Relational Store", type: "db", description: "Users, secrets, namespaces, permissions, audit log" },
] as const;

export const architectureData = {
  description:
    "SecureVault follows a layered architecture where every request flows through validation, authentication, business logic, encryption, and persistence before reaching PostgreSQL.",

  layers: architectureLayers.map((layer) => ({
    id: layer.type,
    label: layer.label,
    sublabel: layer.tech,
    color:
      layer.type === "auth" || layer.type === "encryption"
        ? "rgba(197,168,128,0.08)"
        : "rgba(255,255,255,0.03)",
    border:
      layer.type === "auth" || layer.type === "encryption"
        ? "rgba(197,168,128,0.25)"
        : "rgba(255,255,255,0.08)",
  })),
} as const;

export const authFlow = {
  description: `JWT was selected for its statelessness property — a critical requirement for horizontal scalability. Any instance of the API can validate any token without consulting a shared session store. The trade-off is token revocation: JWTs are valid until expiry, which is mitigated here through short expiry windows (15 minutes) and a refresh token rotation strategy backed by a token family table in PostgreSQL.`,
  whyJWT: [
    "Stateless validation — no session store, no shared state between instances",
    "Payload carries identity and role claims, reducing database lookups on protected routes",
    "Industry-standard format with broad ecosystem support",
    "Easily extended with custom claims for namespace-scoped authorization",
  ],
  tradeoffs: [
    { pro: "Horizontally scalable — no centralized session store required", con: "Token revocation requires a blocklist or short expiry windows" },
    { pro: "Carries authorization claims — role and namespace embedded in payload", con: "Payload is base64-encoded, not encrypted — never store sensitive data in claims" },
    { pro: "Expiry is enforced by the spec — expired tokens are rejected at verification", con: "Clock skew between services can cause premature rejections" },
  ],
  steps: [
    { step: "POST /auth/login", detail: "Credentials validated against bcrypt hash in PostgreSQL" },
    { step: "JWT Generated", detail: "15-min access token + 7-day refresh token, signed with RS256" },
    { step: "Request arrives", detail: "Authorization: Bearer <token> header extracted" },
    { step: "Middleware verifies", detail: "Signature checked, expiry validated, claims extracted" },
    { step: "Role checked", detail: "RBAC guard compares required role against token claims" },
    { step: "Handler executes", detail: "req.user populated — handler treats identity as verified" },
  ],
} as const;

export const schemaDesign = {
  description: `The schema reflects the domain model directly: users own namespaces, namespaces contain secrets, and permissions govern cross-user access. Secrets are never stored in plaintext — the ciphertext column contains AES-256-GCM output, and the iv column stores the initialization vector required for decryption.`,
  tables: [
    {
      name: "users",
      columns: [
        { col: "id", type: "uuid", note: "Primary key, generated" },
        { col: "email", type: "varchar(255)", note: "Unique, indexed" },
        { col: "passwordHash", type: "text", note: "bcrypt hash, never plaintext" },
        { col: "role", type: "enum", note: "ADMIN | USER" },
        { col: "createdAt", type: "timestamptz", note: "" },
      ],
    },
    {
      name: "namespaces",
      columns: [
        { col: "id", type: "uuid", note: "Primary key" },
        { col: "ownerId", type: "uuid", note: "FK → users.id" },
        { col: "name", type: "varchar(100)", note: "Unique per owner" },
        { col: "description", type: "text", note: "Optional" },
        { col: "createdAt", type: "timestamptz", note: "" },
      ],
    },
    {
      name: "secrets",
      columns: [
        { col: "id", type: "uuid", note: "Primary key" },
        { col: "namespaceId", type: "uuid", note: "FK → namespaces.id" },
        { col: "key", type: "varchar(255)", note: "Secret name, indexed" },
        { col: "ciphertext", type: "text", note: "AES-256-GCM encrypted value" },
        { col: "iv", type: "varchar(32)", note: "Initialization vector" },
        { col: "version", type: "integer", note: "Rotation counter" },
        { col: "updatedAt", type: "timestamptz", note: "" },
      ],
    },
    {
      name: "permissions",
      columns: [
        { col: "id", type: "uuid", note: "Primary key" },
        { col: "userId", type: "uuid", note: "FK → users.id" },
        { col: "namespaceId", type: "uuid", note: "FK → namespaces.id" },
        { col: "access", type: "enum", note: "READ | WRITE | ADMIN" },
      ],
    },
  ],
  notes: [
    "Composite index on (namespaceId, key) for O(log n) secret lookup within a namespace",
    "Foreign key constraints enforce referential integrity — orphaned secrets are impossible",
    "UUIDs as primary keys prevent sequential ID enumeration attacks",
    "The version column on secrets supports rotation history without a separate versions table",
  ],
} as const;

export const encryptionModel = {
  algorithm: "AES-256-GCM",
  description: `AES-256-GCM (Galois/Counter Mode) was selected over AES-256-CBC for a critical reason: GCM is an authenticated encryption mode. It produces a message authentication tag alongside the ciphertext, which means any tampering with the stored ciphertext is detectable at decryption time. CBC only provides confidentiality — an attacker who modifies a CBC-encrypted value may not be detected.\n\nEvery secret follows the same lifecycle: generate a cryptographically random 96-bit initialization vector, encrypt the plaintext using the IV and a key derived from the master secret, store the ciphertext and IV in the database. On retrieval, the process reverses. The plaintext never touches the database.`,
  keyManagement: `The current implementation uses a master encryption key sourced from environment variables and never committed to version control. A production hardening step would replace this with a proper KMS (AWS KMS, HashiCorp Vault) so that key rotation and access auditing are handled outside the application boundary.`,
  threatModel: [
    { threat: "Database compromise", mitigation: "All secrets are AES-256-GCM encrypted. A database dump contains only ciphertext — useless without the encryption key." },
    { threat: "SQL injection", mitigation: "Prisma's parameterized query builder prevents raw SQL injection. All inputs validated by Zod schemas before reaching the ORM." },
    { threat: "Token theft", mitigation: "Short-lived JWTs (15 min). Refresh tokens are single-use and rotated on each use, invalidating stolen refresh tokens after first legitimate use." },
    { threat: "Ciphertext tampering", mitigation: "GCM's authentication tag verifies ciphertext integrity. Any modification to the stored value causes decryption to throw — the tampered secret is never served." },
    { threat: "Credential enumeration", mitigation: "UUID primary keys prevent sequential ID scanning. Rate limiting (planned) and consistent error response timing prevent credential stuffing." },
  ],
} as const;

export const apiEndpoints = [
  {
    method: "POST",
    path: "/auth/register",
    description: "Register a new user account",
    auth: false,
    request: `{\n  "email": "engineer@company.com",\n  "password": "minimum-12-chars"\n}`,
    response: `{\n  "id": "550e8400-e29b-41d4-a716",\n  "email": "engineer@company.com",\n  "role": "USER",\n  "createdAt": "2024-01-15T10:00:00Z"\n}`,
  },
  {
    method: "POST",
    path: "/auth/login",
    description: "Authenticate and receive JWT pair",
    auth: false,
    request: `{\n  "email": "engineer@company.com",\n  "password": "minimum-12-chars"\n}`,
    response: `{\n  "accessToken": "eyJhbGciOiJSUzI1NiJ9...",\n  "refreshToken": "eyJhbGciOiJSUzI1NiJ9...",\n  "expiresIn": 900\n}`,
  },
  {
    method: "POST",
    path: "/namespaces/:id/secrets",
    description: "Store an encrypted secret",
    auth: true,
    request: `{\n  "key": "DATABASE_URL",\n  "value": "postgres://user:pass@host/db"\n}`,
    response: `{\n  "id": "uuid",\n  "key": "DATABASE_URL",\n  "namespaceId": "uuid",\n  "version": 1,\n  "updatedAt": "2024-01-15T10:02:00Z"\n}`,
  },
  {
    method: "GET",
    path: "/namespaces/:id/secrets/:key",
    description: "Retrieve and decrypt a secret",
    auth: true,
    request: null,
    response: `{\n  "key": "DATABASE_URL",\n  "value": "postgres://user:pass@host/db",\n  "version": 1,\n  "updatedAt": "2024-01-15T10:02:00Z"\n}`,
  },
] as const;

export const engineeringDecisions = [
  { decision: "Database", chosen: "PostgreSQL", alternative: "MongoDB", reason: "Relational integrity between users, namespaces, secrets, and permissions is a hard requirement. Foreign key constraints and ACID transactions prevent orphaned records. MongoDB's document model requires application-level join logic and cannot enforce referential integrity natively." },
  { decision: "ORM", chosen: "Prisma", alternative: "TypeORM", reason: "Prisma's generated TypeScript client provides end-to-end type safety from schema to query result. The migration system produces versioned, reviewable SQL files. TypeORM's decorator-based approach introduces more runtime complexity and weaker type inference at query boundaries." },
  { decision: "Auth", chosen: "JWT (RS256)", alternative: "Server sessions", reason: "Session-based auth requires a shared session store accessible by all API instances. JWT verification is stateless — any node validates any token using the public key. For a secrets API where horizontal scaling is a design goal, stateless auth is the correct choice." },
  { decision: "Encryption mode", chosen: "AES-256-GCM", alternative: "AES-256-CBC", reason: "GCM is authenticated encryption — it produces a MAC tag alongside ciphertext. CBC provides only confidentiality. Ciphertext tampering with CBC produces a silently incorrect decryption; GCM throws on tampered input. For secrets storage, data integrity is as critical as confidentiality." },
  { decision: "Containerization", chosen: "Docker + Compose", alternative: "Bare metal", reason: "Docker Compose provides deterministic environments that match production targets. Every contributor, CI run, and staging environment starts from the same image with the same configuration. Bare metal deployments accumulate environmental drift over time." },
  { decision: "Validation", chosen: "Zod", alternative: "Joi", reason: "Zod's TypeScript-first design means schema definitions produce inferred types — no separate type declarations, no drift between runtime validation and compile-time types. Joi requires separate TypeScript annotations that can diverge from the runtime schema." },
] as const;

export const challenges = [
  {
    title: "Token Revocation Without Session State",
    description: `The statelessness that makes JWTs valuable also makes them difficult to revoke before expiry. A compromised access token is valid until it expires. The solution is defense-in-depth: short access token lifetimes (15 minutes) minimize the damage window, and a refresh token rotation strategy in PostgreSQL allows invalidating the entire token family if compromise is detected. This adds a database read on every token refresh — an acceptable trade-off for meaningful revocation capability.`,
  },
  {
    title: "Encryption Key Management",
    description: `The master encryption key must be available at runtime but must never appear in version control, logs, or error messages. The current approach sources it from environment variables managed via Docker secrets. This is a practical first step, but production hardening requires a dedicated KMS — both to enforce rotation policies and to audit key usage independently of the application.`,
  },
  {
    title: "Schema Evolution Under Encryption",
    description: `Adding a column to an unencrypted table is a migratifon. Adding a column to a secrets table with live encrypted data requires coordination: the migration must not decrypt and re-encrypt all records in a single transaction due to lock contention, and any change affecting the encryption model requires a rotation of existing secrets. The version column was introduced specifically to support this without a separate audit table.`,
  },
  {
    title: "Docker Service Readiness",
    description: `The application and PostgreSQL share a Docker Compose network. The application container must not accept connections until the database is accepting them. The healthcheck and depends_on conditions handle this, but the interaction between Docker's healthcheck timing and Prisma's connection retry logic required tuning to be reliable across cold starts.`,
  },
] as const;

export const lessonsLearned = [
  { lesson: "Encryption decisions made late are expensive to change", detail: "Retrofitting AES-256-GCM into a system that stored plaintext would require a coordinated migration under load. Starting with encryption as a constraint meant the schema, service layer, and API were all designed to accommodate ciphertext from the beginning." },
  { lesson: "Prisma migrations deserve code review rigour", detail: "Early schema changes were applied directly to the development database without reviewing the generated SQL. A migration that performs a full table rewrite will lock it. Introducing migration review and testing against populated datasets would catch this class of issue before it reaches production." },
  { lesson: "Zod schemas are documentation", detail: "The Zod schemas at each API boundary serve a second purpose beyond runtime validation: they are the most accurate specification of what each endpoint accepts. This is only true if schemas are kept adjacent to their handlers — not centralized in a shared types file where they drift from usage." },
  { lesson: "Docker Compose health checks are non-negotiable", detail: "The first Compose configuration used depends_on without health check conditions, causing intermittent startup failures. depends_on with condition: service_healthy solved this. Service readiness and service liveness are different states that require explicit modeling." },
] as const;

export const futureImprovements = [
  { title: "Structured Audit Log", description: "Every secret access, creation, and deletion should produce a tamper-evident audit record. A dedicated audit_events table with immutable records would support SOC 2 type requirements.", priority: "High" },
  { title: "KMS Integration", description: "Replace environment variable key management with AWS KMS or HashiCorp Vault. This moves key custody outside the application boundary, enables automatic rotation, and provides independent audit trails for key usage.", priority: "High" },
  { title: "Secret Versioning", description: "The version column exists but full rotation history is not yet persisted. A secret_versions table would support rollback and provide a complete history for compliance purposes.", priority: "Medium" },
  { title: "Rate Limiting", description: "Authentication endpoints are currently unprotected against brute-force attacks beyond bcrypt's inherent cost. Adding Redis-backed rate limiting per IP and per account would close this attack surface.", priority: "Medium" },
  { title: "Observability Stack", description: "Structured logs are a foundation, not a complete observability story. Adding Prometheus metrics (request latency, encryption timing, active secret counts) and OpenTelemetry tracing would make performance regressions detectable before incidents.", priority: "Medium" },
  { title: "Multi-Region Deployment", description: "Secrets accessed by globally distributed services should be retrievable with low latency from the nearest region. This requires a replication strategy for PostgreSQL and careful key management across regions.", priority: "Low" },
] as const;