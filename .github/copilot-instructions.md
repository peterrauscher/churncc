# Project Guidelines

## Build and Test

- Use Bun for all local automation (`bun.lock`).
- Install dependencies with `bun install`.
- Start local development with `bun run dev`.
- Build with `bun run build` and run production locally with `bun start`.
- Lint with `bun run lint`.
- Format check with `bun run format`.
- When making edits, prefer `bun run lint:fix` and `bun run format:fix` before finishing.

## Architecture

- This is a Next.js App Router project under `src/app`.
- Route files follow App Router conventions: `page.tsx`, nested route folders, and API routes under `src/app/api`.
- Global shell and metadata live in `src/app/layout.tsx`.
- Shared providers live in `src/app/app-providers.tsx`.
- UI primitives are in `src/components/ui` (shadcn + Radix).
- Feature UI components are organized by concern in `src/components/cards`, `src/components/filters`, and `src/components/layout`.
- Data fetching helpers are centralized in `src/services/api.ts`.
- Shared types are in `src/types/index.ts`.

## Conventions

- Use TypeScript with strict mode. Avoid `any` and keep types explicit when inference is unclear.
- Use the `@/*` path alias for imports from `src`.
- Mark interactive components/pages with `"use client"`.
- Prefer Next.js navigation APIs (`next/link`, `next/navigation`) over React Router patterns.
- Keep utility class composition through `cn()` from `src/lib/utils.ts`.
- Use existing component patterns: PascalCase component files, props interfaces, and functional components.
- Reuse existing types from `src/types/index.ts` before creating duplicates.

## Data and API Rules

- Keep network and mock-data access in `src/services/api.ts` unless implementing or extending an App Router API route.
- Handle fetch failures with explicit error handling and safe fallbacks for UI rendering.
- Bank account data currently relies on mock/proxy flow (`/api/bank-rewards` + mock helpers). Preserve this behavior unless explicitly changing data strategy.
- Credit card data comes from an external JSON source and may contain partial fields; code defensively for missing values.

## Styling and UI

- Use Tailwind CSS utilities and existing design tokens from `src/app/globals.css`.
- Prefer existing shadcn/Radix primitives from `src/components/ui` before adding new UI libraries.
- Keep loading, empty, and error states visible for async pages.

## Practical Pitfalls

- `useSearchParams` and other navigation hooks require client components.
- Metadata exports belong in server components like `layout.tsx`.
- Avoid moving generated or framework-managed files (`.next`, `next-env.d.ts`) unless required.
- Do not duplicate mock data across files when a shared helper/API route already exists.
