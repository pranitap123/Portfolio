"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const dockerContent = {
  multistage: `# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s \\
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]`,

  compose: `services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/securevault
      - JWT_SECRET=\${JWT_SECRET}
      - ENCRYPTION_KEY=\${ENCRYPTION_KEY}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: securevault
      POSTGRES_USER: \${DB_USER}
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:`,
};

const principles = [
  {
    title: "Multi-stage builds",
    detail: "The build stage compiles TypeScript. The production stage copies only dist/ and node_modules — no source files, no dev dependencies. Minimized attack surface.",
  },
  {
    title: "Health check endpoints",
    detail: "The /health route reports database connectivity status. Docker uses this for container health reporting. Load balancers and orchestrators use it for traffic routing decisions.",
  },
  {
    title: "Environment injection",
    detail: "No secrets appear in the Dockerfile or Compose file. All sensitive values are injected at runtime via environment variables sourced from .env (local) or CI/CD environment configuration (production).",
  },
  {
    title: "Service readiness",
    detail: "The API container declares depends_on: db: condition: service_healthy — it does not start accepting connections until PostgreSQL passes its healthcheck. This prevents startup race conditions.",
  },
  {
    title: "Volume persistence",
    detail: "PostgreSQL data is stored in a named Docker volume, not a bind mount. Named volumes survive container removal and are managed by the Docker daemon — data persists across container restarts and image updates.",
  },
];

export function ContainerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-10">
      <p className="text-sm text-white/55 leading-[1.85]">
        Containerization is not optional for production-oriented systems — it is the mechanism that makes environment parity a guarantee rather than an aspiration. The Docker configuration makes two decisions explicit: what the production image contains (build output only, no source or dev tooling) and how services declare their readiness to each other (healthcheck-gated startup ordering).
      </p>

      {/* Principles */}
      <div className="space-y-0 divide-y divide-white/[0.05]">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.07 * i }}
            className="py-4 flex items-start gap-4"
          >
            <span className="text-[10px] font-mono text-white/20 mt-1 tabular-nums shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="text-sm font-semibold text-white/80 mb-1">{p.title}</div>
              <div className="text-xs text-white/40 leading-relaxed">{p.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Code blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CodePanel title="Dockerfile (multi-stage)" code={dockerContent.multistage} inView={inView} delay={0.2} />
        <CodePanel title="docker-compose.yml" code={dockerContent.compose} inView={inView} delay={0.3} />
      </div>
    </div>
  );
}

function CodePanel({ title, code, inView, delay }: {
  title: string;
  code: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
      className="border border-white/[0.08] rounded-sm overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-white/10" aria-hidden="true" />
        <span className="text-[11px] font-mono text-white/35">{title}</span>
      </div>
      <pre className="p-4 text-[11px] font-mono text-white/50 leading-relaxed overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </motion.div>
  );
}