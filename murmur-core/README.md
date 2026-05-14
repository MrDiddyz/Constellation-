# MURMUR Core

Production-ready baseline for the Constellation project.

## Included hardening baseline
- Next.js + TypeScript + Tailwind bootstrap
- Strict runtime environment validation (`lib/env.ts`)
- Structured logging and monitoring hooks (`lib/logger.ts`, `lib/monitoring.ts`)
- Reliability endpoints and input validation (`/api/health`, `/api/signal`)
- Quality gates: lint, typecheck, tests, build
- Performance guardrails: bundle analysis + bundle budget check + Lighthouse CI assertions
- Security guardrails: npm audit, gitleaks workflow, dependency review, CodeQL

## Environment strategy
Use templates:
- `.env.local.example` for local development
- `.env.example` for deployment environments

## Commands
- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run check:bundle-budget`
- `npm run analyze`
- `npm run audit`
- `npm run check` (all core gates)

## Quick start
```bash
cd /home/runner/work/Constellation-/Constellation-/murmur-core
cp .env.local.example .env.local
npm ci
npm run check
```
