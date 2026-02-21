# Third-Party Loading Matrix

## Required and Deferred Scripts

| Integration | File | Trigger | Reason |
| --- | --- | --- | --- |
| Google Analytics (gtag bootstrap) | `components/deferred-ga.tsx` | First user interaction or 3.5s idle timeout | Avoids blocking early main-thread work while preserving tracking. |
| GTM origin preconnect | `app/layout.tsx` | Document head | Reduces connection setup cost once deferred GA starts. |
| Vercel Analytics | `app/layout.tsx` | Default runtime load | Kept for telemetry continuity. |

## Widget Scope

| Widget | File | Scope |
| --- | --- | --- |
| Chatbot | `components/commerce-shell.tsx` | Commerce routes only |
| Cart Sidebar | `components/commerce-shell.tsx` | Commerce routes only |
| Cart state provider | `components/commerce-shell.tsx` | Commerce routes only |

## Preconnect and DNS Prefetch Policy

- Keep only `www.googletagmanager.com` preconnect/dns-prefetch in global layout.
- Do not add extra preconnect hints without observing a critical-path request dependency.
