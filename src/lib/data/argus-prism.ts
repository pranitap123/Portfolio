export const meta = {
  title: "ARGUS-PRISM",
  subtitle: "Real-Time Threat Intelligence & Graph Analysis Platform",
  github: "https://github.com/pranitap123/ARGUS---PRISM",
  live: null,
  categories: ["Cybersecurity", "Distributed Systems", "Graph Intelligence"],
  tech: ["FastAPI", "Python", "Kafka", "Neo4j", "PostgreSQL", "Docker", "React", "Pydantic"],
  stats: [
    { label: "Architecture",  value: "Event-Driven" },
    { label: "Message Broker", value: "Apache Kafka" },
    { label: "Graph DB",      value: "Neo4j" },
    { label: "API Layer",     value: "FastAPI + Async" },
  ],
} as const;

// ─── ToC sections ────────────────────────────────────────────────────────────

export const sections = [
  { id: "mission",      label: "Mission" },
  { id: "architecture", label: "Architecture" },
  { id: "auth",         label: "Auth & Security" },
  { id: "database",     label: "Database Design" },
  { id: "pipeline",     label: "Detection Pipeline" },
  { id: "api",          label: "API Design" },
  { id: "containers",   label: "Containerization" },
  { id: "decisions",    label: "Decisions" },
  { id: "challenges",   label: "Challenges" },
  { id: "lessons",      label: "Lessons Learned" },
  { id: "future",       label: "Future Work" },
] as const;

// ─── Mission ─────────────────────────────────────────────────────────────────

export const mission = {
  problem: `Modern threat intelligence faces a fundamental throughput problem. Security telemetry arrives at rates that synchronous request-response architectures cannot sustain — a single mid-size organization generates hundreds of thousands of security events per day. Batch-processing approaches introduce latency that renders intelligence stale before it can be acted upon. Point-in-time queries against flat relational tables miss the relationship patterns that characterize advanced persistent threats.

ARGUS-PRISM addresses this directly: an event-driven pipeline that ingests security telemetry via Apache Kafka, processes it through a stream analysis layer, and persists threat actor relationships in Neo4j — a graph database whose native traversal semantics make multi-hop relationship queries orders of magnitude faster than equivalent SQL joins.`,

  goals: [
    "Decouple telemetry ingestion from analysis — ingestion continues even when analysis is slow",
    "Model threat actor relationships as a native graph, not a join table",
    "Surface intelligence through a low-latency FastAPI query layer",
    "Support real-time dashboard updates via React frontend",
    "Containerize every service for environment parity and reproducible deployments",
  ],

  targetUsers: [
    { role: "Security Analysts", description: "Query threat actor relationships, trace attack paths, correlate indicators of compromise across events" },
    { role: "SOC Engineers", description: "Monitor live event pipelines, configure detection rules, investigate alert clusters in the graph view" },
    { role: "Platform Engineers", description: "Operate the Kafka cluster, tune consumer group lag, manage Neo4j instance health and index performance" },
  ],
} as const;

// ─── Architecture layers (horizontal flow) ───────────────────────────────────

export const architectureLayers = [
  {
    id: "producers",
    label: "Event Producers",
    tech: "Clients / Sensors",
    type: "external",
    description: "Security sensors, log shippers, and API clients emit telemetry events. Each event is a structured JSON payload describing a security observation — network connection, authentication attempt, file access, process execution.",
    color: "white",
  },
  {
    id: "kafka",
    label: "Kafka Broker",
    tech: "Apache Kafka",
    type: "broker",
    description: "Events land in partitioned Kafka topics. Partitioning by source IP ensures events from the same host are processed in order. Consumer group offsets allow independent replay and parallelism without duplicates.",
    color: "gold",
  },
  {
    id: "processor",
    label: "Stream Processor",
    tech: "Python Consumer",
    type: "processing",
    description: "Consumer group reads from Kafka topics, applies detection rules, enriches events with GeoIP and threat feed data, and writes both raw events to PostgreSQL and relationship edges to Neo4j.",
    color: "white",
  },
  {
    id: "neo4j",
    label: "Threat Graph",
    tech: "Neo4j",
    type: "graph",
    description: "Threat actors, IP addresses, domains, and attack techniques are modeled as nodes. Relationships between them — uses, targets, mimics, associated_with — become first-class graph edges queryable with Cypher.",
    color: "gold",
  },
  {
    id: "postgres",
    label: "Event Store",
    tech: "PostgreSQL",
    type: "relational",
    description: "Raw telemetry events stored for audit, replay, and time-series queries. The relational model complements Neo4j — structured queries by time range, severity, and source use SQL; relationship traversals use Cypher.",
    color: "white",
  },
  {
    id: "api",
    label: "Query API",
    tech: "FastAPI + Async",
    type: "api",
    description: "Async FastAPI handlers serve intelligence queries. Graph traversals execute against Neo4j; time-series and aggregation queries hit PostgreSQL. Pydantic models validate all request and response shapes.",
    color: "white",
  },
  {
    id: "frontend",
    label: "React Dashboard",
    tech: "React + D3",
    type: "frontend",
    description: "Interactive threat graph visualization built with D3 force-directed layout. Live event feed polls the API for new alerts. Analyst workspace for running Cypher-like relationship queries through a form interface.",
    color: "white",
  },
] as const;

// ─── Architecture connections ─────────────────────────────────────────────────

export const architectureConnections = [
  { from: "producers", to: "kafka",     label: "publish events" },
  { from: "kafka",     to: "processor", label: "consume + process" },
  { from: "processor", to: "neo4j",     label: "write relationships" },
  { from: "processor", to: "postgres",  label: "write raw events" },
  { from: "neo4j",     to: "api",       label: "Cypher traversal" },
  { from: "postgres",  to: "api",       label: "SQL queries" },
  { from: "api",       to: "frontend",  label: "REST / JSON" },
] as const;

// ─── Detection pipeline ───────────────────────────────────────────────────────

export const detectionPipeline = {
  description: `The detection pipeline is the core of ARGUS-PRISM. A raw security event enters at one end and exits either as an enriched graph edge in Neo4j or as a discarded non-threat with a structured reason code logged to PostgreSQL. The pipeline is designed to be fast and side-effect-free at each stage — each stage produces an output or raises, never mutates shared state.`,

  stages: [
    {
      id: "ingest",
      label: "Ingest",
      icon: "inbox",
      detail: "Kafka consumer polls topic batch (max 500 events). Pydantic validates the raw JSON schema. Malformed events are written to a dead-letter topic rather than dropped silently.",
      latency: "< 5ms",
    },
    {
      id: "enrich",
      label: "Enrich",
      icon: "layers",
      detail: "GeoIP lookup adds country and ASN to IP addresses. Threat feed check flags known malicious IPs and domains. WHOIS data cached in Redis (not yet implemented) to avoid per-event API calls.",
      latency: "10–50ms",
    },
    {
      id: "detect",
      label: "Detect",
      icon: "shield",
      detail: "Rule engine evaluates the enriched event against configured detection rules. Rules are structured Python dataclasses, not regex strings — composable, testable, and type-safe. Matching rules produce a ThreatSignal.",
      latency: "< 2ms",
    },
    {
      id: "correlate",
      label: "Correlate",
      icon: "graph",
      detail: "ThreatSignal triggers a Neo4j MERGE operation — upsert the threat actor node, upsert the target node, create or increment the relationship edge. The MERGE semantic prevents duplicate graph edges from Kafka at-least-once delivery.",
      latency: "5–20ms",
    },
    {
      id: "persist",
      label: "Persist",
      icon: "database",
      detail: "The raw enriched event is written to PostgreSQL with its detection result, matched rule IDs, and threat signal metadata. Kafka offset is committed only after both Neo4j and PostgreSQL writes succeed — no partial persistence.",
      latency: "< 10ms",
    },
    {
      id: "emit",
      label: "Emit",
      icon: "broadcast",
      detail: "High-severity ThreatSignals are published to an alert Kafka topic consumed by a notification service (planned). The API also provides a long-poll endpoint for the dashboard to receive real-time alert notifications.",
      latency: "< 5ms",
    },
  ],

  guarantees: [
    "At-least-once delivery — Kafka offsets committed only after successful write",
    "Idempotent graph writes — MERGE semantics prevent duplicate Neo4j edges",
    "Dead-letter queue — malformed events are preserved, not dropped",
    "Ordered processing — events partitioned by source for per-host ordering",
  ],
} as const;

// ─── Auth & Security ─────────────────────────────────────────────────────────

export const authSecurity = {
  description: `ARGUS-PRISM serves security analysts — the irony of a threat intelligence platform with weak authentication would not be lost. The auth model separates service-to-service authentication (Kafka producer credentials, Neo4j connection auth) from user-facing API authentication (JWT with role claims).`,

  authFlow: [
    { step: "POST /auth/login",   detail: "Analyst credentials validated against bcrypt hash in PostgreSQL" },
    { step: "JWT issued",         detail: "Access token (30 min) + refresh token (24 hr), HS256-signed" },
    { step: "API request",        detail: "Authorization: Bearer header extracted by FastAPI dependency" },
    { step: "Dependency verifies",detail: "python-jose decodes and validates token signature and expiry" },
    { step: "Role enforced",      detail: "ANALYST can query; ADMIN can configure rules and manage users" },
    { step: "Handler executes",   detail: "current_user injected into handler — identity treated as verified" },
  ],

  roles: [
    { role: "ADMIN",   permissions: ["Manage users", "Configure detection rules", "View all events", "Query threat graph", "Access system metrics"] },
    { role: "ANALYST", permissions: ["Query threat graph", "View events", "Run correlation queries", "Export indicators"] },
    { role: "VIEWER",  permissions: ["View dashboard", "Read-only graph access", "View alert history"] },
  ],

  securityDecisions: [
    { decision: "Kafka SASL auth", detail: "Producer and consumer connections use SASL/PLAIN credentials — no unauthenticated Kafka access even within the Docker network." },
    { decision: "Neo4j auth", detail: "Neo4j bolt connection uses username/password from environment variables. Credentials never appear in source code or Compose files." },
    { decision: "Secret injection", detail: "All credentials sourced from environment variables. Docker Compose reads from .env file. Production sources from CI/CD environment configuration." },
    { decision: "CORS policy", detail: "FastAPI CORS middleware restricts allowed origins explicitly. Wildcard * origins are not permitted in production configuration." },
  ],
} as const;

// ─── Database Design ──────────────────────────────────────────────────────────

export const databaseDesign = {
  description: `ARGUS-PRISM uses two databases with complementary strengths. PostgreSQL stores raw structured event data — time-series queries, aggregations, and joins against a known schema. Neo4j stores the threat intelligence graph — actor nodes, infrastructure nodes, technique nodes, and the relationships between them. Querying a threat actor's full attack infrastructure is a graph traversal; querying all events from a source IP in the last 24 hours is a relational range scan. Each database is used for what it is genuinely better at.`,

  postgresSchema: {
    description: "Relational store for raw telemetry and detection results",
    tables: [
      {
        name: "events",
        columns: [
          { col: "id",           type: "uuid",        note: "Primary key" },
          { col: "source_ip",    type: "inet",        note: "Indexed for range queries" },
          { col: "dest_ip",      type: "inet",        note: "" },
          { col: "event_type",   type: "varchar(50)", note: "connection | auth | file | process" },
          { col: "severity",     type: "smallint",    note: "1–10 scale" },
          { col: "raw_payload",  type: "jsonb",       note: "Original event, queryable" },
          { col: "enriched",     type: "jsonb",       note: "GeoIP, threat feed data" },
          { col: "threat_score", type: "numeric(4,2)", note: "0.0–10.0 detection score" },
          { col: "rule_ids",     type: "text[]",      note: "Matched detection rule IDs" },
          { col: "created_at",   type: "timestamptz", note: "Indexed, partition candidate" },
        ],
      },
      {
        name: "detection_rules",
        columns: [
          { col: "id",          type: "uuid",         note: "Primary key" },
          { col: "name",        type: "varchar(200)",  note: "Unique" },
          { col: "description", type: "text",         note: "" },
          { col: "severity",    type: "smallint",     note: "Rule base severity" },
          { col: "rule_json",   type: "jsonb",        note: "Serialized rule dataclass" },
          { col: "enabled",     type: "boolean",      note: "Default true" },
          { col: "created_by",  type: "uuid",         note: "FK → users.id" },
          { col: "updated_at",  type: "timestamptz",  note: "" },
        ],
      },
      {
        name: "users",
        columns: [
          { col: "id",            type: "uuid",         note: "Primary key" },
          { col: "email",         type: "varchar(255)", note: "Unique, indexed" },
          { col: "password_hash", type: "text",         note: "bcrypt hash" },
          { col: "role",          type: "enum",         note: "ADMIN | ANALYST | VIEWER" },
          { col: "created_at",    type: "timestamptz",  note: "" },
        ],
      },
    ],
  },

  neo4jSchema: {
    description: "Graph store for threat intelligence relationships",
    nodes: [
      { label: "ThreatActor",  properties: ["id", "name", "aliases", "motivation", "first_seen", "confidence"], color: "#C5A880" },
      { label: "IPAddress",    properties: ["address", "asn", "country", "is_tor", "threat_score"],             color: "#ffffff" },
      { label: "Domain",       properties: ["fqdn", "registrar", "created_date", "threat_score"],              color: "#ffffff" },
      { label: "Technique",    properties: ["mitre_id", "name", "tactic", "description"],                      color: "#60a5fa" },
      { label: "Organization", properties: ["name", "sector", "country"],                                      color: "#a78bfa" },
    ],
    relationships: [
      { type: "USES",           from: "ThreatActor", to: "Technique",    properties: ["confidence", "observed_at"] },
      { type: "CONTROLS",       from: "ThreatActor", to: "IPAddress",    properties: ["since", "confidence"] },
      { type: "TARGETS",        from: "ThreatActor", to: "Organization", properties: ["campaign", "observed_at"] },
      { type: "RESOLVES_TO",    from: "Domain",      to: "IPAddress",    properties: ["first_seen", "last_seen"] },
      { type: "ASSOCIATED_WITH",from: "IPAddress",   to: "ThreatActor",  properties: ["confidence"] },
    ],
  },

  indexingNotes: [
    "PostgreSQL: composite index on (source_ip, created_at) for the most common analyst query pattern",
    "PostgreSQL: GIN index on rule_ids array column for efficient 'events matching rule X' lookups",
    "PostgreSQL: JSONB GIN index on raw_payload enables ad-hoc field queries without schema migration",
    "Neo4j: node index on ThreatActor.id and IPAddress.address — all MERGE operations target these properties",
    "Neo4j: relationship index on CONTROLS.since for time-bounded infrastructure queries",
  ],
} as const;

// ─── API Endpoints ────────────────────────────────────────────────────────────

export const apiEndpoints = [
  {
    method: "POST",
    path: "/api/v1/events/ingest",
    description: "Ingest a security event into the Kafka pipeline",
    auth: true,
    request: `{
  "source_ip": "192.168.1.105",
  "dest_ip": "185.220.101.47",
  "event_type": "connection",
  "severity": 7,
  "payload": {
    "port": 443,
    "protocol": "TCP",
    "bytes_sent": 4096
  }
}`,
    response: `{
  "event_id": "uuid",
  "status": "queued",
  "kafka_offset": 14829,
  "estimated_processing_ms": 45
}`,
  },
  {
    method: "GET",
    path: "/api/v1/graph/actor/{actor_id}",
    description: "Retrieve a threat actor's full graph neighbourhood",
    auth: true,
    request: null,
    response: `{
  "actor": {
    "id": "apt-29",
    "name": "Cozy Bear",
    "motivation": "espionage",
    "confidence": 0.92
  },
  "infrastructure": [
    { "type": "IPAddress", "address": "185.220.101.47", "country": "NL" }
  ],
  "techniques": [
    { "mitre_id": "T1566", "name": "Phishing", "tactic": "initial-access" }
  ],
  "targets": [
    { "name": "Finance Sector", "country": "US" }
  ]
}`,
  },
  {
    method: "POST",
    path: "/api/v1/graph/correlate",
    description: "Find correlation paths between two graph nodes",
    auth: true,
    request: `{
  "node_a": { "type": "IPAddress", "value": "185.220.101.47" },
  "node_b": { "type": "ThreatActor", "value": "apt-29" },
  "max_hops": 3
}`,
    response: `{
  "paths": [
    {
      "hops": 2,
      "nodes": ["185.220.101.47", "apt-29-infrastructure", "apt-29"],
      "relationships": ["RESOLVES_TO", "CONTROLS"]
    }
  ],
  "query_time_ms": 12
}`,
  },
  {
    method: "GET",
    path: "/api/v1/events",
    description: "Query events with filtering and pagination",
    auth: true,
    request: null,
    response: `{
  "events": [
    {
      "id": "uuid",
      "source_ip": "192.168.1.105",
      "event_type": "connection",
      "severity": 7,
      "threat_score": 8.4,
      "rule_ids": ["tor-exit-node", "high-entropy-domain"],
      "created_at": "2024-01-15T14:32:11Z"
    }
  ],
  "total": 1482,
  "page": 1,
  "per_page": 25
}`,
  },
  {
    method: "POST",
    path: "/api/v1/rules",
    description: "Create a new detection rule (ADMIN only)",
    auth: true,
    request: `{
  "name": "tor-exit-node-connection",
  "description": "Connection to known Tor exit node",
  "severity": 8,
  "rule": {
    "field": "enriched.is_tor_exit",
    "operator": "equals",
    "value": true
  }
}`,
    response: `{
  "id": "uuid",
  "name": "tor-exit-node-connection",
  "enabled": true,
  "created_by": "uuid",
  "created_at": "2024-01-15T10:00:00Z"
}`,
  },
] as const;

// ─── Engineering decisions ────────────────────────────────────────────────────

export const engineeringDecisions = [
  {
    decision: "Message Broker",
    chosen: "Apache Kafka",
    alternative: "RabbitMQ / Redis Pub-Sub",
    reason: "Kafka's log-based storage enables consumer group replay — if the detection engine needs to be rerun with updated rules, it can rewind the offset and reprocess historical events. RabbitMQ and Redis Pub-Sub consume and discard messages; replay is not possible without a separate event store.",
  },
  {
    decision: "Graph Database",
    chosen: "Neo4j",
    alternative: "PostgreSQL with recursive CTEs",
    reason: "Multi-hop relationship traversals are Neo4j's native operation. 'Find all IPs controlled by actors who have targeted the finance sector within 3 hops' is a simple Cypher query. The equivalent PostgreSQL recursive CTE is complex to write, fragile to maintain, and slower by orders of magnitude on large graphs.",
  },
  {
    decision: "API Framework",
    chosen: "FastAPI",
    alternative: "Flask / Django REST",
    reason: "FastAPI's async-first design matches the async nature of the processing pipeline. Pydantic integration provides automatic request validation and OpenAPI schema generation with no additional tooling. Flask requires manual validation and serialization; Django REST's ORM coupling is unnecessary here.",
  },
  {
    decision: "Dual Database",
    chosen: "Neo4j + PostgreSQL",
    alternative: "Neo4j only",
    reason: "Neo4j excels at relationship traversal but is not optimized for time-series range scans, aggregations, or full-text search on structured fields. Keeping raw events in PostgreSQL and graph relationships in Neo4j uses each database for what it is genuinely faster at.",
  },
  {
    decision: "Validation",
    chosen: "Pydantic v2",
    alternative: "Marshmallow / Manual",
    reason: "Pydantic v2's Rust-based validation core is 5–50x faster than Pydantic v1. Python type annotations serve as the schema definition — no separate schema classes, no drift. FastAPI uses Pydantic models directly for both request parsing and OpenAPI documentation generation.",
  },
  {
    decision: "Containerization",
    chosen: "Docker Compose",
    alternative: "Bare metal / Virtual environments",
    reason: "ARGUS-PRISM has seven services: API, consumer, Kafka, ZooKeeper, Neo4j, PostgreSQL, React. Coordinating seven processes with correct startup ordering and networking manually is fragile. Compose provides declarative service orchestration with healthcheck-gated startup dependencies.",
  },
] as const;

// ─── Containerization ─────────────────────────────────────────────────────────

export const containerization = {
  services: [
    { name: "api",        image: "argus-api",        description: "FastAPI application server" },
    { name: "consumer",   image: "argus-consumer",   description: "Kafka stream processor" },
    { name: "kafka",      image: "confluentinc/cp-kafka", description: "Message broker" },
    { name: "zookeeper",  image: "confluentinc/cp-zookeeper", description: "Kafka coordination" },
    { name: "neo4j",      image: "neo4j:5",          description: "Graph database" },
    { name: "db",         image: "postgres:16-alpine", description: "Relational event store" },
    { name: "frontend",   image: "argus-frontend",   description: "React dashboard" },
  ],

  dockerfile: `# Stage 1: Dependencies
FROM python:3.12-slim AS deps
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Production image
FROM python:3.12-slim AS runner
WORKDIR /app
COPY --from=deps /usr/local/lib/python3.12/site-packages \\
  /usr/local/lib/python3.12/site-packages
COPY . .
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s \\
  CMD curl -f http://localhost:8000/health || exit 1
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`,

  compose: `services:
  api:
    build: ./api
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://\${DB_USER}:\${DB_PASS}@db:5432/argus
      - NEO4J_URI=bolt://neo4j:7687
      - NEO4J_USER=\${NEO4J_USER}
      - NEO4J_PASSWORD=\${NEO4J_PASSWORD}
      - KAFKA_BOOTSTRAP=kafka:9092
      - JWT_SECRET=\${JWT_SECRET}
    depends_on:
      db: { condition: service_healthy }
      neo4j: { condition: service_healthy }
      kafka: { condition: service_healthy }

  consumer:
    build: ./consumer
    environment:
      - KAFKA_BOOTSTRAP=kafka:9092
      - NEO4J_URI=bolt://neo4j:7687
      - DATABASE_URL=postgresql://\${DB_USER}:\${DB_PASS}@db:5432/argus
    depends_on:
      kafka: { condition: service_healthy }
      neo4j: { condition: service_healthy }

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    depends_on: [zookeeper]
    healthcheck:
      test: kafka-topics --bootstrap-server localhost:9092 --list
      interval: 30s
      timeout: 10s
      retries: 5

  neo4j:
    image: neo4j:5
    environment:
      NEO4J_AUTH: \${NEO4J_USER}/\${NEO4J_PASSWORD}
      NEO4J_PLUGINS: '["apoc"]'
    volumes: [neo4j_data:/data]
    healthcheck:
      test: cypher-shell -u \${NEO4J_USER} -p \${NEO4J_PASSWORD} "RETURN 1"
      interval: 30s
      timeout: 10s
      retries: 5

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: argus
      POSTGRES_USER: \${DB_USER}
      POSTGRES_PASSWORD: \${DB_PASS}
    volumes: [postgres_data:/var/lib/postgresql/data]
    healthcheck:
      test: pg_isready -U \${DB_USER}
      interval: 10s
      retries: 5

volumes:
  neo4j_data:
  postgres_data:`,

  startupOrder: [
    { service: "ZooKeeper",  dependsOn: [],                        reason: "Kafka coordination layer — must be healthy before Kafka starts" },
    { service: "Kafka",      dependsOn: ["ZooKeeper"],             reason: "Message broker — consumer and API depend on it" },
    { service: "PostgreSQL", dependsOn: [],                        reason: "Independent — starts in parallel with Kafka stack" },
    { service: "Neo4j",      dependsOn: [],                        reason: "Independent — starts in parallel with other data services" },
    { service: "Consumer",   dependsOn: ["Kafka", "Neo4j", "PostgreSQL"], reason: "Requires all data layers before processing begins" },
    { service: "API",        dependsOn: ["Kafka", "Neo4j", "PostgreSQL"], reason: "Requires all data layers before accepting requests" },
    { service: "Frontend",   dependsOn: ["API"],                   reason: "React dev server or static build served after API is ready" },
  ],
} as const;

// ─── Challenges ───────────────────────────────────────────────────────────────

export const challenges = [
  {
    title: "Kafka Consumer Lag Under Detection Load",
    description: `The detection rule engine introduced variable latency — simple field-match rules complete in under 1ms; rules requiring Neo4j lookups (does this IP already exist in the graph?) add 10–50ms per event. Under high-throughput conditions, consumer lag accumulated as the processing time per event exceeded the Kafka poll interval. The solution was to separate the enrichment/detection stage from the graph write stage, running them as separate consumers on different consumer groups with the detection output published to an intermediate topic.`,
  },
  {
    title: "Neo4j MERGE Idempotency Under At-Least-Once Delivery",
    description: `Kafka at-least-once delivery guarantees that events will be processed, but not exactly once. A consumer crash after Neo4j write but before offset commit causes the event to be reprocessed. Naive CREATE operations would duplicate graph nodes and edges. The solution is MERGE semantics — Neo4j's MERGE matches existing nodes by property before creating. Every write operation uses MERGE on the node's unique identifier property, making duplicate processing side-effect-free.`,
  },
  {
    title: "ZooKeeper and Kafka Startup Race Conditions",
    description: `Kafka requires ZooKeeper to be accepting connections before it starts. Docker Compose's depends_on without health check conditions is insufficient — it waits for the container to start, not for the service to be ready. Implementing a proper ZooKeeper health check required checking that the four-letter word 'ruok' command returns 'imok' — a non-obvious requirement that caused intermittent CI failures before being addressed.`,
  },
  {
    title: "Neo4j Schema Evolution with Live Data",
    description: `Unlike relational databases, Neo4j has no schema migration files — the graph schema is implicit in the node labels and relationship types your application creates. Adding a new property to ThreatActor nodes (such as a confidence score) required a Cypher migration script that set the default value on all existing nodes. Without this, the Pydantic response model's non-optional fields would fail serialization on legacy nodes. Treating Cypher migrations like SQL migrations — versioned, reviewed, and applied in order — is a discipline the project adopted after this issue.`,
  },
] as const;

// ─── Lessons ──────────────────────────────────────────────────────────────────

export const lessonsLearned = [
  {
    lesson: "Event-driven systems require explicit contract versioning from day one",
    detail: "The JSON schema of Kafka events is an implicit contract between producers and consumers. When the event schema changed (adding the enriched field), the consumer and producer were updated in the same commit. In a real deployment with multiple independent teams, this would cause a breaking change. Introducing an event schema registry (Confluent Schema Registry) should have been a day-one decision, not a future improvement.",
  },
  {
    lesson: "Graph data modelling requires upfront domain analysis",
    detail: "The initial Neo4j schema modelled everything as generic 'Entity' nodes with a type property. Querying this required filtering on the type property in every Cypher statement. Refactoring to use native Neo4j node labels (ThreatActor, IPAddress, Domain) made queries more readable, faster to execute, and properly indexable. The lesson: graph node labels are not metadata — they are the schema.",
  },
  {
    lesson: "Pydantic models are the best documentation for an async API",
    detail: "FastAPI's automatic OpenAPI documentation is generated from Pydantic models. Every endpoint's request shape, response shape, and field descriptions appear in the /docs endpoint without any additional work. This meant that frontend integration began with accurate, live API documentation from the first day — not a manually-maintained markdown file that drifts from reality.",
  },
  {
    lesson: "Startup ordering in multi-service stacks is a first-class concern",
    detail: "Seven services with complex dependency chains cannot be manually managed. Investing time in correct healthcheck implementations for each service — not just liveness but genuine readiness — paid off in reliable local development and CI. The cost of incorrect health checks is intermittent failures that are difficult to reproduce and time-consuming to diagnose.",
  },
] as const;

// ─── Future improvements ──────────────────────────────────────────────────────

export const futureImprovements = [
  { title: "Confluent Schema Registry",    description: "Enforce Kafka event schema versioning with backward/forward compatibility checks. Breaking schema changes become deployment-time errors, not runtime surprises.", priority: "High" },
  { title: "Redis Enrichment Cache",       description: "GeoIP and threat feed lookups are network calls. Redis caching with TTL would reduce per-event enrichment latency from 10–50ms to sub-millisecond for repeated IPs.", priority: "High" },
  { title: "Kubernetes Migration",         description: "Docker Compose is suitable for single-node deployment. Kubernetes provides horizontal scaling of the consumer deployment, rolling updates without downtime, and resource quotas per service.", priority: "Medium" },
  { title: "MITRE ATT&CK Integration",    description: "Technique nodes currently use MITRE IDs but are not synchronized from the ATT&CK STIX feed. Automated sync would keep technique descriptions, tactics, and sub-technique relationships current.", priority: "Medium" },
  { title: "WebSocket Alert Streaming",   description: "The current dashboard uses polling for new alerts. WebSocket push from the API would reduce latency from poll-interval to near-real-time and reduce unnecessary API load.", priority: "Medium" },
  { title: "Detection Rule DSL",          description: "Rules are currently Python dataclasses evaluated in the consumer. A domain-specific language for rule authoring would allow analysts (non-engineers) to create and test rules through the UI without code deployment.", priority: "Low" },
] as const;

