
```markdown
# Portfolio Engine v1.0 🏗️

> A premium, production-grade engineering portfolio and system architecture knowledge base. Inspired by the deterministic, minimal design language of Linear, Vercel, and Stripe Docs.

[![License: MIT](https://img.shields.io/badge/License-MIT-000000.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Engine: Next.js](https://img.shields.io/badge/Engine-Next.js-000000.svg?style=flat-square)](https://nextjs.org/)

---

## 🏛️ Architecture Overview

This portfolio is not a static template; it is designed as an interactive product platform to demonstrate full-stack engineering capability, systems documentation, and infrastructure topology.

```text
       ┌────────────────────────────────────────────────────────┐
       │                 EDGE / USER INTERACTION                │
       │       Next.js App Router  │  TailwindCSS Grid          │
       └───────────────┬────────────────────────┬───────────────┘
                       │                        │
                       ▼                        ▼
        ┌─────────────────────────────┐  ┌─────────────────────────────┐
        │       OMNIPRESENT Core      │  │      THREE.JS PLATFORM      │
        │  Ctrl+K Command Palette AI  │  │ Interactive Network Topology│
        └───────────────┬─────────────┘  └─────────────────────────────┘
                        │
                        ▼
        ┌────────────────────────────────────────────────────────┐
        │                     CONTENT LAYER                      │
        │     Unified Content Sync (MDX + Mermaid Parsing)       │
        └───────────────────────┬────────────────────────────────┘
                                │
                                ▼
        ┌────────────────────────────────────────────────────────┐
        │                     EXTERNAL DATA                      │
        │    system-design-engineering Repo (Upstream Source)   │
        └────────────────────────────────────────────────────────┘

```

---

## 🛠️ Core Technology Stack

* **Core Framework:** Next.js (App Router) / TypeScript — chosen for deterministic SSR/ISR capabilities and rigorous type safety.
* **Styling & Aesthetics:** TailwindCSS — implemented via a strict documentation-style grid system utilizing a monochrome palette (black background, white typography, gray supporting text, gold accents).
* **Interactive Layer (Three.js):** Custom low-overhead network topology rendering with interactive data-flow animations (zero floating planets, zero crypto gimmicks).
* **Intelligence Layer:** Omnipresent `Ctrl + K` command palette UI (inspired by Linear) indexing projects, core skills, and system design content.
* **Content Management:** Fully integrated MDX rendering pipeline with native **Mermaid.js** parsing to dynamically pull and compile architecture docs directly from upstream repositories.

---

## 📂 System File Tree

```text
├── .github/workflows/      # Automated CI/CD deployment pipelines
├── src/
│   ├── app/                # Next.js App Router (/projects, /engineering, etc.)
│   ├── components/         # Production-grade UI components
│   │   ├── cmd-palette/    # Ctrl+K Command Palette Architecture
│   │   ├── canvas/         # Three.js Interactive Network Topology Canvas
│   │   └── ui/             # High-fidelity atomic grid & layout components
│   ├── lib/                # Core system utilities & data-fetching clients
│   │   ├── github/         # Upstream GitHub API synchronization logic
│   │   └── mdx/            # Markdown compile engine with Mermaid.js support
│   └── styles/             # Global typography tokens & CSS variables
├── content/                # Local cache / static system schemas
├── tailwind.config.js      # Custom theme configurations (Strict premium token mapping)
└── tsconfig.json           # Compiler rules & path mappings

```

---

## 🛤️ Active Implementation Blueprint

### Phase 1: Core Core & Architecture (Week 1)

* [ ] Setup strict TypeScript compiler environments and boilerplate layouts.
* [ ] Implement full typography tokens and grid layout constraints.

### Phase 2: Upstream Sync & Content Engine (Week 2)

* [ ] Establish GitHub API client layer to fetch raw `.md` files from `system-design-engineering`.
* [ ] Build local MDX parser with native string injection for interactive Mermaid diagrams.

### Phase 3: Interaction & Intelligence (Week 3)

* [ ] Build command palette context layer to register global shortcuts (`Ctrl + K`).
* [ ] Build canvas viewport to run Three.js infrastructure lines.

### Phase 4: CI/CD & Edge Delivery (Week 4)

* [ ] Audit responsive break-points and code-splitting boundaries.
* [ ] Configure zero-downtime deployment pipelines with strict caching boundaries.

---

## ⚙️ Engineering Environment Setup

1. **Clone the environment along with upstream configurations:**
```bash
git clone [https://github.com/pranitap123/your-portfolio-repo-name.git](https://github.com/pranitap123/your-portfolio-repo-name.git)
cd your-portfolio-repo-name

```


2. **Install exact dependency lockfile specifications:**
```bash
npm clean-install

```


3. **Configure local environment systems (`.env.local`):**
```env
GITHUB_ACCESS_TOKEN=your_secure_personal_access_token
NEXT_PUBLIC_APP_URL=[https://jurisynth.in](https://jurisynth.in)

```


4. **Initialize development runtime:**
```bash
npm run dev

```



---

```

### Why this works perfectly for your project repo:
* **Product, Not Project:** It describes your code layout exactly how a Principal Engineer documents a core software product.
* **Visualizes the Blueprint:** The text-based architecture diagram instantly signals to anyone browsing your GitHub that you think in structural flows before typing lines of code.
* **Shows Intent:** It links your engineering knowledge base as a data dependency, showing a clean separation of concerns.

```