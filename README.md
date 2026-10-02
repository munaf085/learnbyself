# LearnBySelf

A scalable, production-grade self-learning programming education platform engineered for Indian B.Tech / college students, beginners, placement candidates, and software engineering aspirants.

LearnBySelf bridges the gap between college theory and real-world software engineering interviews with a **zero-teacher dependency** learning model.

---

## 🏛️ Foundational Highlights

- **Progression Engine**: Seamless journey from Ground Zero -> Mental Models -> Deconstruction -> Practice -> Debugging -> Projects -> Interviews -> Placement Ready.
- **Multi-Language Learning Engine**: Reusable curriculum engine decoupled from frontend UI and storage backend. Supports Java (Phase 1 active), Python, C#, TypeScript, C++, and Go through configuration and structured curriculum data.
- **Modern Monorepo**: pnpm workspaces hosting Next.js App Router (React 19, Tailwind CSS), FastAPI (Python 3.13, SQLAlchemy 2 async), Celery worker, shared contracts (`@learnbyself/types`), and design system primitives (`@learnbyself/ui`).
- **Student-First Pedagogy**: Real-world visual analogies, line-by-line keyword deconstruction, interactive exercises (MCQ, output prediction, syntax bug hunting), and actual placement interview Q&A.
- **Containerized Infrastructure**: Docker Compose setup for PostgreSQL 16, Redis 7, and FastAPI.

---

## 📁 Repository Structure

```
learnbyself/
├── apps/
│   ├── web/                    # Next.js App Router, Tailwind, Server Components
│   ├── api/                    # FastAPI, Pydantic v2, SQLAlchemy 2 Async, JWT
│   └── worker/                 # Background Celery/Redis worker foundation
├── packages/
│   ├── types/                  # Domain contracts (curriculum, progress, auth)
│   ├── ui/                     # UI components (Button, Card, Badge, ProgressBar)
│   └── config/                 # Base TypeScript configs
├── data/
│   └── curriculum/             # Version-controlled multi-language curriculum
│       ├── manifest.json       # Language catalog & roadmap
│       └── java/               # Java track (course, modules, lessons)
├── docs/                       # Architecture, DB, curriculum, dev, and test docs
├── docker-compose.yml          # Postgres, Redis, and FastAPI orchestration
└── PROJECT_STATUS.md           # Accurate implementation tracker
```

---

## 🚀 Quickstart

### Prerequisites
- Node.js `>= 20.x` & `pnpm >= 8.x`
- Python `>= 3.11` (Python 3.13 supported)
- Docker & Docker Compose

### 1. Environment Setup
```bash
cp .env.example .env
```

### 2. Frontend & Monorepo Dependencies
```bash
pnpm install
pnpm dev:web
```
Access the web application at [http://localhost:3000](http://localhost:3000).

### 3. Backend Setup
```bash
cd apps/api
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```
Access OpenAPI documentation at [http://localhost:8000/docs](http://localhost:8000/docs).

### 4. Running Verification Tests
```bash
# Frontend Unit Tests (Vitest)
pnpm --filter @learnbyself/web test

# Backend Tests (Pytest)
cd apps/api && pytest
```

---

## 📜 Documentation

- [Architecture Design](docs/architecture.md)
- [Database Schema & Relationships](docs/database.md)
- [Curriculum Engine & Content Specifications](docs/curriculum.md)
- [Development Workflow](docs/development.md)
- [Testing Strategy](docs/testing.md)
- [Implementation Report](IMPLEMENTATION_REPORT.md)
