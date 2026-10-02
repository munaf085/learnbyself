# LearnBySelf Database Architecture

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
