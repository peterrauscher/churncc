# Churnable Component Library

This list covers the component library used to recreate the current site with the new brand system using shadcn/ui as the foundation.

## Foundation Components

- `PageContainer`: standardized max-width and section padding wrapper.
- `PageHeader`: reusable title/description block with serif heading style.
- `SectionHeading`: section title + supporting copy + optional action slot.
- `BackLink`: consistent back navigation pattern for detail pages.
- `EmptyState`: icon, title, copy, optional action button.
- `LoadingCards`: skeleton card grid for list and featured loading states.

## Navigation and Shell

- `Navbar`: redesigned top navigation with clear hierarchy and premium styling.
- `Footer`: editorial-style footer with grouped links and legal copy.

## Content and Marketing

- `HomeHero` (section composition in `src/app/page.tsx`): homepage hero structure with visual background treatment.
- `ValueProps` (section composition in `src/app/page.tsx`): reusable value proposition card row.
- `ResourceCard`: icon + heading + body card for resources page.

## Data Display Components

- `CurrencyValue`: normalized reward/bonus amount formatter.
- `OfferSummary`: shared block for spend + time + expiry requirements.
- `FeeStat` (in-card composition): annual/monthly fee display with waivable state.
- `AccountTypeBadge` (in-card composition): consistent badge styles for bank account types.

## Domain Cards

- `CreditCardItem`: upgraded card design using `CurrencyValue` and `OfferSummary`.
- `BankAccountItem`: upgraded account card design with structured requirement info.
- `CreditCardGrid`: responsive grid with empty-state integration.
- `BankAccountGrid`: responsive grid with empty-state integration.

## Detail Surfaces

- `DetailHero` pattern (page-level composition): top information block for card/account detail pages.
- `HighlightPanel` (page-level composition): reusable visual panel for top offer/bonus display.
- `InfoList` (page-level composition): icon + label/value list pattern for detail attributes.

## Filter Components

- Existing filter components are retained and restyled to match the new design system surface treatment.
- Current components:
  - `CreditCardFilters`
  - `BankAccountFilters`

## Refactor Order

1. Foundation components
2. Shell (navbar/footer)
3. Domain cards and grids
4. Home and resources pages
5. Credit card and bank account detail pages
6. Filter extraction and polishing
