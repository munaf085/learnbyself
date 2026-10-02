# -*- coding: utf-8 -*-
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# README.md
write_file("README.md", """# LearnBySelf

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
.venv\\Scripts\\activate
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
""")

# PROJECT_STATUS.md
write_file("PROJECT_STATUS.md", """# Project Status: LearnBySelf

**Current Phase**: Phase 1 Foundation Completed & Verified  
**Date**: October 2026  
**Status**: Ready for Core Curriculum Expansion & Interactive Engine Enhancements  

---

## Completed in Foundation Phase

| Area | Component | Status | Verification |
|---|---|---|---|
| **Architecture** | Monorepo Structure (`apps/*`, `packages/*`, `data/*`) | ✅ Completed | pnpm workspaces configured |
| **Contracts** | Shared TypeScript Types (`@learnbyself/types`) | ✅ Completed | tsc build & cross-package imports |
| **UI Primitives** | Reusable Design System (`@learnbyself/ui`) | ✅ Completed | Button, Card, Badge, ProgressBar |
| **Curriculum Engine** | Content Abstraction Layer (`ICurriculumProvider`) | ✅ Completed | Decoupled local file provider with unit tests |
| **Content Schema** | Multi-language Manifest + Java Track Ground Zero | ✅ Completed | Full 7-stage activity stack implemented |
| **Frontend** | Next.js App Router (`apps/web`) | ✅ Completed | Server components, routes `/`, `/[lang]`, `/[lang]/[mod]/[les]` |
| **Storage** | Client Persistence Abstraction (`lib/storage`) | ✅ Completed | Pluggable driver tested with unit tests |
| **Backend API** | FastAPI Modular Monolith (`apps/api`) | ✅ Completed | Health, Curriculum, Security & Models |
| **Security** | PBKDF2 Password Hashing & JWT Auth Utilities | ✅ Completed | Pytest validated hash & token cycles |
| **Database Models** | SQLAlchemy 2.0 Async Models | ✅ Completed | User, Org, Course, Module, Progress |
| **Worker** | Background Task Runner Foundation (`apps/worker`) | ✅ Completed | Redis/Celery configuration boundary |
| **Containerization** | Docker Compose Specification | ✅ Completed | postgres, redis, api service definitions |
| **Documentation** | System Architecture, DB, Curriculum, Dev Guides | ✅ Completed | All 5 docs + Implementation Report |

---

## Next Steps (Phase 2 & Beyond)
1. **Interactive Code Sandbox Boundary**: Wire isolated sandbox runner (Docker/WebAssembly) for safe client code execution.
2. **PostgreSQL & Alembic Migrations**: Generate initial migration scripts and wire database connection pools in production mode.
3. **User Authentication Flow**: Connect frontend login/signup modals with FastAPI JWT endpoints.
4. **Practice Engine Expansion**: Add interactive REPL and drag-and-drop code reordering components.
5. **Java Curriculum Expansion**: Add Object-Oriented Programming (OOP) and Collections modules.
""")

# docs/architecture.md
write_file("docs/architecture.md", """# LearnBySelf Architecture

## 1. Architectural Philosophy

LearnBySelf is built as an **Educational Engine**, not a static documentation website. The core philosophy separates:
1. **Curriculum & Pedagogical Structure (Content Data)**: Independent of frontend frameworks, database engines, or delivery channels.
2. **Delivery & Learning UI (Frontend)**: Next.js App Router using Server Components by default, minimizing client-side JavaScript bundle footprint.
3. **Domain Engine & Learner State (Backend API)**: FastAPI modular monolith managing identities, enrollments, progress tracking, and assessments.
4. **Execution Sandbox (Future Boundary)**: Isolated sandbox architecture for running student code without compromising the core web or API layers.

```
                    ┌─────────────────────────┐
                    │    Next.js App Router   │
                    │       (apps/web)        │
                    └───────────┬─────────────┘
                                │
          ┌─────────────────────┴─────────────────────┐
          │                                           │
          ▼                                           ▼
┌──────────────────┐                       ┌──────────────────┐
│  Curriculum Data │                       │   FastAPI API    │
│ (data/curriculum)│                       │    (apps/api)    │
└──────────────────┘                       └──────────┬───────┘
                                                      │
                                           ┌──────────┴──────────┐
                                           │                     │
                                           ▼                     ▼
                                   ┌───────────────┐     ┌───────────────┐
                                   │  PostgreSQL   │     │ Redis Broker  │
                                   │  (Relational) │     │   + Celery    │
                                   └───────────────┘     └───────────────┘
```

---

## 2. Multi-Language Extensibility

Courses are configured as data records conforming to the `@learnbyself/types` domain contract. Adding a new language (e.g. Python, C#, or Go) requires:
1. Registering the language in `data/curriculum/manifest.json`.
2. Providing the course hierarchy (`[language]/course.json`).
3. Providing module and lesson definitions with activities.

Zero changes to page layouts or routing components are required.

---

## 3. Separation of State

- **Content Data**: Stored in version-controlled JSON/Markdown or future headless CMS/PostgreSQL tables.
- **Server Data**: User accounts, course enrollments, mastery percentages, streak counters, and assessment scores.
- **Client State**: Transient quiz answer draft state, active step selection, and UI dialog toggles.
- **Browser Persistence**: Governed by `apps/web/lib/storage/index.ts` to prevent scattered `localStorage` calls.

---

## 4. MentorNxt Integration Boundary

MentorNxt integration is modeled as an external consumer:
- Single-Sign-On (SSO) through standard JWT / OAuth2 bearer tokens.
- Course progress webhooks and REST endpoints (`/api/v1/curriculum`, `/api/v1/progress`).
- Multi-tenancy via `Organization` and `OrganizationMember` models.
""")

# docs/database.md
write_file("docs/database.md", """# LearnBySelf Database Architecture

## 1. Overview
LearnBySelf utilizes **PostgreSQL** configured with async connection pooling (`asyncpg` + SQLAlchemy 2.0). UUID primary keys are used across primary entities to facilitate distributed identifiers and secure URL slugs.

---

## 2. Entity-Relationship Overview

```
[ Organization ] ◄─── 1:N ─── [ User ] ◄─── 1:N ─── [ Enrollment ]
                                  │                         │
                                  ▼                         ▼
                           [ ProgressRecord ]        [ Course ]
                                                       │
                                                       ▼
                                                   [ Section ]
                                                       │
                                                       ▼
                                                   [ Module ]
                                                       │
                                                       ▼
                                                   [ Lesson ]
```

---

## 3. Core Tables

### Identity & Organizations
- `organizations`: Multi-tenant organization support (colleges, B.Tech universities, training institutes).
- `users`: Core identity with bcrypt password hash, role (`STUDENT`, `MENTOR`, `ADMIN`, `CONTENT_AUTHOR`), and organization reference.

### Curriculum Schema (Mirroring Content Engine)
- `languages`: Language metadata (`slug`, `name`, `version`, `icon`, `is_available`, `paradigms`).
- `courses`: High-level curriculum syllabus linked to a language (`slug`, `title`, `level`, `estimated_hours`).
- `modules`: Topic groupings within a course (`slug`, `title`, `learning_objectives`).
- `lessons`: Atom of learning containing order index and reference pointer to activity content.

### Progress & Mastery
- `enrollments`: Course enrollment status (`not_started`, `in_progress`, `completed`, `mastered`).
- `progress_records`: Granular audit log recording status, scores, attempt counts, and timestamps for lessons, exercises, and quizzes.
""")

# docs/curriculum.md
write_file("docs/curriculum.md", """# Curriculum Engine & Content Model

## 1. The 7-Stage Lesson Pedagogy

To guarantee that a beginner student progresses without feeling lost or requiring a teacher, every lesson in LearnBySelf adheres to a 7-stage learning journey:

1. **Analogy (`analogy`)**: Grounding the technical concept in a concrete, memorable mental model before introducing syntax.
2. **Concept Deconstruction (`concept`)**: Theoretical foundations clearly explaining 'why' and 'how'.
3. **Code Walkthrough (`code_walkthrough`)**: Concrete source code with line-by-line keyword explanation.
4. **Guided Practice MCQ (`mcq`)**: Formative question with stepped hints and instant reasoning feedback.
5. **Debugging Challenge (`debugging`)**: Practical code snippet containing common beginner syntax or runtime bugs.
6. **Placement Interview Q&A (`interview_qa`)**: Top interview questions tagged with hiring companies, expected answers, key points, and follow-up traps.
7. **Mastery Verification Checklist (`self_evaluation`)**: Actionable checklist allowing the learner to self-assess comprehension.

---

## 2. Content Abstraction Layer

The UI never reads filesystem paths directly. Instead, it relies on `ICurriculumProvider`:

```typescript
export interface ICurriculumProvider {
  getLanguages(): Promise<Language[]>;
  getCourse(languageSlug: LanguageSlug): Promise<Course | null>;
  getLesson(languageSlug: LanguageSlug, moduleSlug: string, lessonSlug: string): Promise<LessonDetail | null>;
}
```

This abstraction allows seamless swapping from local JSON files to a PostgreSQL database or headless CMS without changing UI components.
""")

# docs/development.md
write_file("docs/development.md", """# Development Guide

## Environment Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/munaf085/learnbyself.git
   cd learnbyself
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Install monorepo dependencies:
   ```bash
   pnpm install
   ```

## Development Commands
- Start Next.js frontend: `pnpm dev:web`
- Build all packages: `pnpm build`
- Run linting: `pnpm lint`
- Run frontend unit tests: `pnpm test`
- Start docker services: `docker compose up -d postgres redis`
""")

# docs/testing.md
write_file("docs/testing.md", """# Testing Strategy

## 1. Overview
The platform enforces testing across both frontend and backend layers to ensure content integrity and reliable learning logic.

---

## 2. Frontend Tests (Vitest)
Located in `apps/web/tests/`:
- `curriculum.test.ts`: Verifies curriculum loading, JSON schema validation, manifest parsing, course resolution, and presence of all 7 activity types.
- `storage.test.ts`: Verifies the storage driver abstraction for setting, getting, and removing client state.

Execute via:
```bash
pnpm --filter @learnbyself/web test
```

---

## 3. Backend Tests (Pytest)
Located in `apps/api/tests/`:
- `test_health.py`: Validates API status endpoint and version information.
- `test_security.py`: Validates PBKDF2 password hashing, salt integrity, and JWT token issuance/decoding.
- `test_curriculum.py`: Tests API curriculum endpoints (`/languages`, `/course`, `/lesson`).

Execute via:
```bash
cd apps/api
pytest
```
""")

print("Documentation generated successfully.")
