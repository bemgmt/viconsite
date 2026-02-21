# CWV Hydration Map

## Marketing Routes

- `/`, `/about`, `/contact`, `/learn-more`, `/how-it-works`, `/the-system`, `/careers`, `/login`
- Shared nav remains client-rendered for menu state and route-aware links.
- Contact and careers pages are server shells with client form islands:
  - `components/contact-form-client.tsx`
  - `components/careers-application-form.tsx`

## Commerce Routes

- `/products/**`, `/checkout/**`, `/battery`, `/agent-pricing`
- `components/commerce-shell.tsx` wraps pages with cart provider and deferred cart/chat widgets.

## Deferred Client Modules

- `components/nav-cart-button.tsx` loaded only for commerce route paths from `components/navigation.tsx`.
- `components/chatbot.tsx` and `components/cart-sidebar.tsx` dynamically imported in `components/commerce-shell.tsx`.
- GA scripts deferred by interaction or idle timeout in `components/deferred-ga.tsx`.

## Server-Only Visual Sections (No Hydration)

- `components/why-vicon.tsx`
- `components/pricing-section.tsx`
- `components/final-cta.tsx`
