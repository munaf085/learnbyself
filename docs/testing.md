# Testing Strategy

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
