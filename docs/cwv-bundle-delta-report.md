# CWV Bundle Delta Report

## Removed/Deferred Non-Critical Client Modules

- `components/why-vicon.tsx` moved to server-rendered output (removed `useInView` client hook path).
- `components/pricing-section.tsx` moved to server-rendered output (removed `useInView` client hook path).
- `components/nav-cart-button.tsx` introduced as a route-scoped cart island loaded only on commerce pages.
- `components/chatbot.tsx` and `components/cart-sidebar.tsx` remain dynamic imports behind `components/commerce-shell.tsx`.
- `components/deferred-ga.tsx` defers GA script execution until interaction/idle.

## Icon/Animation Cost Trims

- `components/hero.tsx` no longer imports Lucide chevron icons for carousel controls (inline SVG controls used instead).
- First-paint animation logic tied to Intersection Observer removed from:
  - `components/why-vicon.tsx`
  - `components/pricing-section.tsx`

## Notes on Analyze Build

- `npm run analyze` currently cannot complete in this environment due Next.js package resolution/workspace root issues.
- Performance validation is therefore enforced through Lighthouse route audits and CWV gating scripts:
  - `scripts/run-lighthouse.mjs`
  - `scripts/cwv-gate.mjs`
