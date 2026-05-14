# Contributing

## Scope baseline
- `murmur-core/` contains the production app and all verification scripts.
- Root `.github/workflows/` defines required CI gates.

## Local setup
1. `cd /home/runner/work/Constellation-/Constellation-/murmur-core`
2. `cp .env.local.example .env.local`
3. `npm ci`

## Required local checks
Run before opening a PR:
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run check:bundle-budget`

Or run all in one command:
- `npm run check`

## Security checks
- Dependency risk: `npm run audit`
- Secret leaks: validated in CI with gitleaks
- Static analysis: validated in CI with CodeQL

## Performance checks
- Bundle budget: `npm run check:bundle-budget`
- Optional local analysis: `npm run analyze`
- Lighthouse regression checks run in CI

## Branch protection guidance
Configure branch protection for `main` to require successful checks from:
- `CI / quality`
- `CI / lighthouse`
- `CI / secret-scan`
- `Dependency Review / dependency-review`
- `CodeQL / Analyze`
