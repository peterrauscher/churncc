# Churnable Branding Guidelines

## Brand Positioning

Churnable is a premium personal-finance publication and toolset for readers who optimize credit card and bank bonuses. The brand voice should feel credible, calm, and analytical while still being practical for everyday users.

## Visual Direction

- Style: Editorial Premium
- Mood: Confident, clear, data-driven, reward-focused
- Inspiration references: modern personal finance blogs, premium newsletter layouts, fintech dashboards with editorial typography

## Color System

Use this palette consistently through theme tokens and component variants.

- Ink Navy (`brand.ink`): primary text, headers, high-contrast surfaces
- Deep Navy (`brand.deep`): hero gradients, dark surfaces
- Emerald (`brand.emerald`): primary call-to-action, positive highlights
- Mint (`brand.mint`): secondary accent backgrounds and badges
- Gold (`brand.gold`): bonus/rewards emphasis and highlight text
- Cloud (`brand.cloud`): app background and subtle section surfaces

Application rules:

- Use navy tones for trust and readability.
- Use emerald for primary action and positive signals.
- Use gold only for reward emphasis (bonus amounts, key KPIs).
- Keep neutral surfaces warm-light (cloud) rather than plain white.

## Typography

- Headlines: Serif family (`Playfair Display`) for editorial authority.
- Body/UI: Sans family (`Poppins`) for readability and modern UX.
- Numeric UI: Monospace optional for tabular values only (`IBM Plex Mono`).

Type usage rules:

- Page titles and section titles should use serif display treatment.
- Body copy, labels, form controls, and navigation stay sans.
- Keep line lengths short in content-heavy sections (max 70-75 characters).

## Layout and Spacing

- Base rhythm: 4px scale through Tailwind spacing.
- Section spacing: 64-96px desktop, 40-56px mobile.
- Content width: max 1200-1400px depending on context.
- Card spacing: generous top/bottom padding to avoid dense UI.

## Component Styling Principles

- Start from shadcn/ui primitives and extend with semantic variants.
- Prefer layered surfaces (`bg-card` + soft border + subtle shadow).
- Use rounded corners consistently (`rounded-xl` or token-based radius).
- Include hover and focus-visible states on all interactive elements.

## Imagery and Iconography

- Use Lucide icons with semantic colors from tokens.
- Card and account imagery should sit on soft framed backgrounds.
- Avoid decorative icons without meaning.

## Content Voice

- Headings: concise, outcome-oriented.
- Body: practical and instructional.
- CTAs: direct and specific (for example: "Compare Card Offers", "Open Account").

## Accessibility Guardrails

- Maintain WCAG AA contrast for text and controls.
- Provide visible focus states for links, tabs, and buttons.
- Ensure status/feedback is not color-only.
- Keep loading, empty, and error states explicit and readable.

## Motion and Interaction

- Use subtle transitions (150-250ms) for hover and state changes.
- Avoid excessive animation loops.
- Use motion to reinforce hierarchy, not decoration.

## Implementation Notes

- Keep all style decisions token-driven through `globals.css` variables.
- Build page sections from reusable design-system components, not page-local one-offs.
- Favor composition over deeply specialized components.
