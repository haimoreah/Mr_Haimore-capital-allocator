# Contributing

Thanks for your interest in contributing to this project — the first tool in
the Mr Haimore Tools collection.

## Principles

Every tool in this collection is meant to stay:

- **Lightweight** — minimal dependencies, fast `npm install`.
- **Client-side only** — no backend, no database, no build-time secrets.
- **Simple** — a beginner-friendly React/TypeScript/Tailwind codebase.
- **Layered** — keep the three-layer split intact:
  - `src/domain/` — pure calculation logic, no React, no side effects.
  - `src/config/` — tunable rules and all user-facing copy.
  - `src/components/` — presentation only; no calculation logic here.

## Getting started

```bash
npm install
npm run dev
```

## Before opening a pull request

```bash
npm run lint
npm run test
npm run build
```

All three must pass.

## Changing the allocation rules

The allocation percentages live in `src/config/allocationRules.ts` and must
be transparent and easy to read — this tool is educational, and its logic
should be understandable at a glance. If you change a risk profile's
percentages, keep them summing to 100 and update/add tests in
`src/domain/allocation.test.ts`.

## Scope

This tool does not predict markets, generate trading signals, or give
financial advice — please keep contributions aligned with that scope.
