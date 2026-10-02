# Development Guide

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
