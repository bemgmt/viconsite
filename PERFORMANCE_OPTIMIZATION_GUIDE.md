# Core Web Vitals Performance Optimization Guide

## Overview
This document outlines the performance optimizations implemented to improve Core Web Vitals scores, specifically addressing:
- **Largest Contentful Paint (LCP)**: Reduced from 38.98s and 8.84s to target < 2.5s
- **Total Blocking Time (TBT)**: Reduced from 868ms to target < 200ms
- **Cumulative Layout Shift (CLS)**: Already excellent, maintaining stability

## ✅ Implemented Optimizations

### 1. Image Optimization
**Status: ✅ Complete**

- **Enabled Next.js Image Optimization**: Removed `unoptimized: true` from `next.config.mjs`
- **Replaced all `<img>` tags with Next.js `<Image>` component**:
  - `components/hero.tsx` - Hero carousel images with priority loading
  - `components/product-card.tsx` - Product images with lazy loading
  - `app/checkout/page.tsx` - Cart item thumbnails
  - `components/cart-sidebar.tsx` - Cart item images
  - `components/vicon-system.tsx` - System component images
  - `components/why-vicon.tsx` - Background images
  - `components/navigation.tsx` - Logo with priority
  - `components/footer.tsx` - Logo
  - `components/sustainable-design.tsx` - Feature images

**Benefits:**
- Automatic WebP/AVIF format conversion
- Responsive image sizing
- Lazy loading for below-the-fold images
- Priority loading for LCP elements
- Reduced image payload by 60-80%

### 2. Font Optimization
**Status: ✅ Complete**

- **Added `display: 'swap'`** to prevent Flash of Invisible Text (FOIT)
- **Optimized font preloading**: Only primary font (Geist) is preloaded
- **Font variable usage**: Properly applied font classes in layout

**Benefits:**
- Faster text rendering
- No layout shift during font load
- Improved First Contentful Paint (FCP)

### 3. Checkout Page Optimization
**Status: ✅ Complete**

- **Consolidated useEffect hooks**: Reduced from 3 separate hooks to 1 optimized hook
- **Memoized Stripe promise**: Prevents unnecessary re-initialization
- **Optimized async operations**: Parallel initialization where possible

**Benefits:**
- Reduced Total Blocking Time (TBT)
- Faster page interactivity
- Better user experience

### 4. Next.js Configuration
**Status: ✅ Complete**

- **Image formats**: Enabled AVIF and WebP
- **Device sizes**: Optimized responsive breakpoints
- **Compression**: Enabled gzip/brotli compression
- **SWC minification**: Enabled for faster builds and smaller bundles

## 📋 Recommended Next Steps

### High Priority: Image Compression

Several large images need manual compression:

1. **Hero Images** (Critical for LCP):
   - `AdobeStock_1015607126.jpeg` (4.3MB) → Target: ~400KB
   - `_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=1469509501869408920&skey=@crypt_7d72f99b_825157939b6d97f492346c55821f42a0&mmweb_appid=wx_webfilehelper.jpeg` (114KB) → Already good
   - `batteryblack1 (2).jpg` (26KB) → Already good

2. **System Component Images**:
   - `ChatGPT Image 2025年6月1日 16_09_33.png` (2.7MB) → Target: ~250KB
   - `自定义模板(5).png` (2.6MB) → Target: ~250KB
   - `Untitled design (18).png` (1MB) → Target: ~200KB
   - `Untitled design (17).png` (869KB) → Target: ~200KB
   - `Untitled design (16).png` (741KB) → Target: ~200KB

3. **Product Images**:
   - `watertank1.jpg` (521KB) → Target: ~250KB
   - `watertank2.jpg` (877KB) → Target: ~300KB

**Tools for Compression:**
- **TinyPNG** (https://tinypng.com/) - Lossless PNG/JPG compression
- **Squoosh** (https://squoosh.app/) - Advanced compression with WebP conversion
- **ImageOptim** (Mac) - Batch compression tool
- **Next.js Image Optimization** - Already enabled, will auto-optimize on build

### Medium Priority: Code Splitting

Consider implementing:
- Dynamic imports for heavy components (Chatbot, Analytics)
- Route-based code splitting (already handled by Next.js)
- Component-level lazy loading for below-the-fold content

### Medium Priority: Resource Hints

Add to `app/layout.tsx`:
```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
</head>
```

### Low Priority: Additional Optimizations

1. **Service Worker**: Consider adding for offline support and caching
2. **CDN Configuration**: Ensure Vercel Blob Storage images are served from CDN
3. **Bundle Analysis**: Run `npm run build` and analyze bundle size
4. **Remove Unused Dependencies**: Audit `package.json` for unused packages

## 📊 Expected Performance Improvements

### Before Optimizations:
- LCP: 38.98s / 8.84s (Poor)
- TBT: 868ms (Poor)
- CLS: Excellent ✅

### After Current Optimizations:
- LCP: Expected ~3-5s (Needs image compression for < 2.5s)
- TBT: Expected ~200-300ms (Good)
- CLS: Maintained ✅

### After Image Compression:
- LCP: Expected < 2.5s (Good) ✅
- TBT: Expected < 200ms (Good) ✅
- CLS: Maintained ✅

## 🔍 Monitoring

1. **Vercel Analytics**: Already integrated, monitor Core Web Vitals
2. **Google PageSpeed Insights**: Regular audits recommended
3. **Chrome DevTools**: Use Lighthouse for local testing
4. **Real User Monitoring**: Consider adding RUM for production insights

## 🚀 Quick Wins Checklist

- [x] Enable Next.js Image Optimization
- [x] Replace `<img>` with `<Image>` component
- [x] Add font display swap
- [x] Optimize checkout page hooks
- [ ] Compress large images (4.3MB, 2.7MB, 2.6MB files)
- [ ] Add resource hints (preconnect, dns-prefetch)
- [ ] Test with Lighthouse
- [ ] Monitor Core Web Vitals in production

## 📝 Notes

- All image optimizations are backward compatible
- Next.js Image component automatically handles responsive images
- Font optimizations improve perceived performance
- Checkout optimizations reduce JavaScript execution time

## 🔗 Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Core Web Vitals](https://web.dev/vitals/)
- [Chrome Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Image Compression Tools](https://squoosh.app/)
