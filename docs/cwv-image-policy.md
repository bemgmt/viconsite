# CWV Image Policy

## Primary LCP Media Rules

- Keep one primary above-the-fold image per route.
- Use WebP sources from `public/optimized/` for hero/background media.
- Use `priority` only for the first hero image on `/`.
- Keep non-visible carousel slides and below-fold backgrounds lazy.

## Route Templates

| Route template | Component | Source | Target sizes | Quality |
| --- | --- | --- | --- | --- |
| Home hero | `components/hero.tsx` | `/optimized/viconbanner-1920.webp` | `(max-width: 768px) 100vw, (max-width: 1536px) 95vw, 1536px` | 68 |
| Home hero slide 2 | `components/hero.tsx` | `/optimized/batteryblack1-1600.webp` | `(max-width: 768px) 100vw, (max-width: 1536px) 95vw, 1536px` | 68 |
| Home hero slide 3 | `components/hero.tsx` | `/optimized/adobestock-1015607126-1920.webp` | `(max-width: 768px) 100vw, (max-width: 1536px) 95vw, 1536px` | 68 |
| Home section background | `components/why-vicon.tsx` | `/optimized/adobestock-1731470527-1920.webp` | `(max-width: 768px) 100vw, (max-width: 1536px) 95vw, 1536px` | 66 |
| About page hero image | `app/about/page.tsx` | `/optimized/aboutvicon-1400.webp` | `(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px` | 74 |

## Asset Conversion Targets

- `AdobeStock_1015607126.jpeg` -> `optimized/adobestock-1015607126-1920.webp`
- `AdobeStock_1731470527.jpeg` -> `optimized/adobestock-1731470527-1920.webp`
- `viconbanner.png` -> `optimized/viconbanner-1920.webp`
- `aboutvicon.jpg` -> `optimized/aboutvicon-1400.webp`
- `viconlogo.png` -> `optimized/viconlogo-160.webp`
