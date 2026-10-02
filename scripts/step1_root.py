import os
import json

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# 1. Root Configs
write_file("pnpm-workspace.yaml", """
packages:
  - "apps/*"
  - "packages/*"
""")

write_file("package.json", """{
  "name": "learnbyself-monorepo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev:web": "pnpm --filter @learnbyself/web dev",
    "build": "pnpm --filter \"@learnbyself/*\" build",
    "lint": "pnpm --filter \"@learnbyself/*\" lint",
    "test": "pnpm --filter \"@learnbyself/*\" test",
    "format": "prettier --write \"**/*.{ts,tsx,js,json,md,py}\""
  },
  "devDependencies": {
    "prettier": "^3.5.0",
    "typescript": "^5.7.3"
  }
}""")

write_file(".env.example", """# Application Environment
NODE_ENV=development
PORT=3000

# Backend API
API_PORT=8000
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/learnbyself
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=change-this-in-production-min-32-chars-secret-key
JWT_REFRESH_SECRET=change-this-in-production-min-32-chars-refresh-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
""")

write_file("docker-compose.yml", """services:
  postgres:
    image: postgres:16-alpine
    container_name: learnbyself-postgres
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DB:-learnbyself}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: learnbyself-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    container_name: learnbyself-api
    environment:
      DATABASE_URL: postgresql+asyncpg://postgres:postgres@postgres:5432/learnbyself
      REDIS_URL: redis://redis:6379/0
      JWT_SECRET: ${JWT_SECRET:-change-this-in-production-min-32-chars-secret-key}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET:-change-this-in-production-min-32-chars-refresh-key}
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

volumes:
  postgres_data:
  redis_data:
""")

print("Root configuration written successfully.")
