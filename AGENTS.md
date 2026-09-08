# Repository Guidelines

Practical rules for editing Churnable (`churn.cc`): compare credit-card welcome bonuses and bank-account signup bonuses.

## Project Overview

Churnable is a Next.js App Router marketing/comparison site. Users browse, filter, sort, and open detail pages for card and bank offers. Credit-card data is live external JSON; bank-account data is mock. Brand voice and tokens: `docs/branding-guidelines.md`. Component inventory: `docs/component-library-plan.md`. Existing agent rules also live in `.github/copilot-instructions.md`.

## Architecture & Data Flow

- App Router under `src/app`. Server shell: `src/app/layout.tsx` (metadata, fonts, Navbar/Footer). Client providers: `src/app/app-providers.tsx` (`next-themes`, unused TanStack Query, tooltips, toasters).
- Listing and detail pages are `"use client"`. They fetch in `useEffect`, store results in `useState`, then filter/sort/paginate in memory. No global store. `QueryClientProvider` is mounted but **no page uses `useQuery`** — match `useEffect` + `useState`.
- Data access is `src/services/api.ts`:
  - Cards: `GET https://raw.githubusercontent.com/andenacitelli/credit-card-bonuses-api/main/exports/data.json`. Prefix relative `imageUrl` with `https://offeroptimist.com`. Filter out `discontinued` on listings. Failures return `[]` / `null`.
  - Banks: pages call `getMockBankAccounts()` / `fetchBankAccountById()`. `fetchBankAccounts()` hits `/api/bank-rewards` but **listing pages do not use it**. The route (`src/app/api/bank-rewards/route.ts`) duplicates the same six mock records. Keep both in sync unless the data strategy is being changed on purpose.
- Credit-card filters (`CreditCardFilters`): no annual fee, business, fee waived yr 1, issuer, max annual fee, min bonus. **There is no Network filter.** `CreditCard.network` still exists and is shown as a badge on tiles/detail — do not strip display or re-add the filter.
- Bank filters use a local `BankAccountFilterState` (institutions, account types, min bonus, no monthly fee, direct deposit), not `FilterOptions`.
- URL pre-filters on listings: `issuer`, `fee=0`, `type=travel|cashback`, `q` (cards); similar query params on banks. `useSearchParams` pages wrap inner content in `<Suspense>`.

```
page (use client) → useEffect → src/services/api.ts → setState → client filter/sort/slice
```

## Key Directories

| Path                      | Purpose                                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/`                | Routes: `/`, `/credit-cards`, `/credit-cards/[id]`, `/bank-accounts`, `/bank-accounts/[id]`, `/resources`, legal/contact pages, `api/bank-rewards` |
| `src/components/ui/`      | shadcn/Radix primitives (kebab-case files)                                                                                                         |
| `src/components/cards/`   | `CreditCardItem`, `BankAccountItem`, grids                                                                                                         |
| `src/components/filters/` | `FilterBar` primitives + `CreditCardFilters` / `BankAccountFilters`                                                                                |
| `src/components/shared/`  | `PageContainer`, `PageHeader`, `EmptyState`, `LoadingCards`, `PaginationControls`                                                                  |
| `src/components/finance/` | `CurrencyValue`, `OfferSummary`, `BonusCalculator`                                                                                                 |
| `src/components/layout/`  | Navbar, Footer, hero pieces                                                                                                                        |
| `src/services/api.ts`     | All network/mock access                                                                                                                            |
| `src/types/index.ts`      | Shared domain types                                                                                                                                |
| `src/lib/utils.ts`        | `cn()`                                                                                                                                             |
| `docs/`                   | Branding and component-library plan                                                                                                                |

Prefer existing folders over new ones. Do not add a third copy of mock bank data.

## Development Commands

```bash
bun install
bun run dev          # next dev --turbopack
bun run build        # next build (webpack; typecheck happens here)
bun start            # production server
bun run lint         # next lint
bun run lint:fix
bun run format       # prettier --check .
bun run format:fix
```

Finish edits with `lint:fix` and `format:fix`. There is no `test` script.

## Code Conventions & Common Patterns

- TypeScript `strict`. Avoid `any`. Reuse `src/types/index.ts` before adding types. `FilterOptions.categories` is unused; do not invent a categories UI around it.
- Imports from `src` via `@/*`. Feature components: PascalCase files, `FooProps` interfaces, functional components. UI primitives: kebab-case under `src/components/ui`.
- Interactive pages/components: `"use client"`. Metadata only in server files (`layout.tsx`). Navigation: `next/link`, `next/navigation`. External apply links: `<a target="_blank" rel="noopener noreferrer">`.
- Class names: `cn()` from `src/lib/utils.ts`. Tailwind + tokens in `src/app/globals.css`. Prefer existing shadcn/Radix before new UI libraries. Read `docs/branding-guidelines.md` before visual work.
- Async UI: keep `LoadingCards`, `EmptyState`, and error/empty copy visible. Fetch helpers `try/catch`, `console.error`, return `[]`/`null`.
- Issuer/network strings often use underscores (`CHASE_...`); display with `.replaceAll("_", " ")`. Card JSON is partial — guard `offers`, `amount`, `imageUrl`, `network`.
- Icons: `@phosphor-icons/react` (client) or `@phosphor-icons/react/dist/ssr` (server-safe). Lucide is the shadcn default.
- Compose new filters from `FilterBar` (`FilterTogglePill`, `FilterMenuPill`, `FilterCheckboxList`), not one-off controls.
- `next.config.ts` sets `images.unoptimized: true`. Do not add `remotePatterns` expecting optimization.

## Important Files

- `src/app/layout.tsx` — metadata, fonts (IBM Plex / Inter), skip link, shell
- `src/app/app-providers.tsx` — theme + unused QueryClient
- `src/app/credit-cards/page.tsx` / `src/app/bank-accounts/page.tsx` — listing pattern (near-duplicates)
- `src/services/api.ts` / `src/app/api/bank-rewards/route.ts` — data
- `src/types/index.ts`
- `src/components/filters/FilterBar.tsx`
- `package.json`, `tsconfig.json` (`@/*` → `./src/*`), `eslint.config.mjs`, `.prettierrc` (`{}` = Prettier defaults), `components.json` (shadcn new-york, `rsc: false`)
- `.github/workflows/ci.yml`, `.husky/pre-commit`

Do not edit `.next/` or `next-env.d.ts`.

## Runtime/Tooling Preferences

- Next **15.3.3**, React 19, TypeScript 5, Tailwind v4 (CSS-first in `globals.css` plus leftover `tailwind.config.ts`).
- Package manager is **Bun**. Lockfile: `bun.lock`. CI (`.github/workflows/ci.yml`) and Husky (`bunx lint-staged`) use Bun. Do not add `package-lock.json`.
- Pre-commit only runs Prettier on staged files. Lint and typecheck gate in CI via `next build`.
- No committed `.env*`. All env lives on Vercel if at all.
- Dev = Turbopack; production build = webpack. Confirm with `build`, not only `dev`.

## Testing & QA

There is **no test runner, no test files, and no coverage**. Do not add tests unless asked to introduce a framework.

Merge bar (`.github/workflows/ci.yml` on `main` and PRs):

1. `bun run format`
2. `bun run lint`
3. `bun run build`

Until a runner exists, treat those three plus visible loading/empty states as QA. Do not claim tests passed.
