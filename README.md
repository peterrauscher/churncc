# Churnable

Compare credit card welcome bonuses and bank account signup offers. Live site: [churn.cc](https://churn.cc).

Credit card data comes from the [credit-card-bonuses-api](https://github.com/andenacitelli/credit-card-bonuses-api) JSON export. Bank account offers are mock data behind `/api/bank-rewards` and `getMockBankAccounts()` until a real source exists.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui

## Setup

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Dev uses Turbopack. Lockfile is `bun.lock`.

## Scripts

| Command                         | What it does                        |
| ------------------------------- | ----------------------------------- |
| `bun run dev`                   | Dev server (`next dev --turbopack`) |
| `bun run build`                 | Production build                    |
| `bun start`                     | Serve the production build          |
| `bun run lint` / `lint:fix`     | ESLint (`next lint`)                |
| `bun run format` / `format:fix` | Prettier check / write              |

There is no test suite. CI on `main` and PRs runs format, lint, and build.

## Layout

```
src/app/                 routes + /api/bank-rewards
src/components/          ui (shadcn), cards, filters, shared, finance, layout
src/services/api.ts      fetches and mocks
src/types/index.ts       shared types
docs/                    branding + component library plan
```

Agent-oriented conventions: [AGENTS.md](./AGENTS.md).

## Brand

See `docs/branding-guidelines.md` before UI work. Tokens live in `src/app/globals.css`.
