# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, newcomers first:

- **Newcomers** (primary on the home page): US consumers who have heard that credit card and bank sign-up bonuses pay real money and want to know where to start: which offer, whether it is worth it, and what the catch is.
- **Experienced churners** (primary on the listing pages): people who already know minimum spend, Chase 5/24, and direct-deposit requirements, and want the current best offers fast in a scannable, filterable table.

## Product Purpose

Churnable (churn.cc) finds and compares credit card welcome offers and bank account sign-up bonuses so people can collect them. Success is a visitor finding an offer worth opening and understanding its requirements before they apply.

## Positioning

- **Merit-only ranking.** An offer that pays Churnable nothing still ranks first if it is the best offer. Issuers and advertisers have no say in rankings.
- **Cards and banks in one place.** Credit card bonuses and bank account bonuses are compared side by side instead of on separate sites.
- **Free, no account.** Nothing sits behind a sign-up wall.

## Operating Context

- Revenue comes from standard consumer referral programs (the same links any customer can share), possible programmatic display ads, and clearly labeled sponsored newsletter content. None of these influence rankings. Full disclosure lives at `/how-we-are-paid`.
- A free 5-day email course on bank bonuses is offered on the home page.

## Capabilities and Constraints

- Next.js App Router, React, TypeScript, Tailwind v4, shadcn/Radix primitives, Bun.
- Credit card data today comes from the third-party `credit-card-bonuses-api` JSON export (about 170 active cards) and may contain partial fields.
- Bank account offers today are mock data (`getMockBankAccounts()`, `/api/bank-rewards`).
- **Planned:** the owner's own scraping engine will be wired in, tracking 1000+ offers verified daily. Until it is connected, the live app shows the smaller feed above; designs should hold up at 1000+ offers.
- Points bonuses are converted to estimated USD with conservative cents-per-point rates (`src/lib/rewards.ts`) for ranking and display.
- Filters are driven by URL params (`type`, `fee`, `issuer`, `q`).

## Brand Commitments

- Name: Churnable. Domain: churn.cc. Logo assets: `public/logo-icon.svg`, `src/components/layout/BrandLogo.tsx`.
- `docs/branding-guidelines.md` is **not** binding; it predates the current implementation and is out of date.
- Owner direction for the current redesign: no gradients; avoid nested cards; tasteful, modern fintech rather than generic AI-generated styling.

## Evidence on Hand

- Real: card offer data and card art images from the third-party feed; issuer logos in `public/bank-logos/`; the revenue disclosure at `/how-we-are-paid`.
- Claims the owner has confirmed: 1000+ offers tracked, verified daily (via the scraping engine being wired up).
- Absent: testimonials, user counts, press, payout proof, or case studies. Do not invent them.

## Product Principles

1. The best offer wins the top spot, regardless of whether it earns us anything.
2. Show the requirement next to the reward; a bonus is meaningless without the spend or deposit it takes.
3. Teach newcomers without slowing down experienced churners.
4. Claims must be true today or explicitly confirmed by the owner.
