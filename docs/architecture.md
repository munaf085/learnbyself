# LearnBySelf Architecture

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
