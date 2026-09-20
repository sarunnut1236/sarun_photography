---
name: next-js-pwa-image-cache
description: >-
  Design and implement Serwist PWA runtime caching for Next.js /_next/image
  responses (device Cache Storage), distinct from Vercel/Next image CDN cache.
  Use when adding a service worker, PWA, offline image cache, CacheFirst for
  next/image, or tuning maxEntries / maxAge for gallery images.
---

# Next.js PWA image cache (`/_next/image`)

Knowledge for this photography portfolio: **client service-worker cache** of optimized images the browser actually requests—not server CDN cache, and not raw Cloudinary URLs from content files.

## Two caches (do not confuse)

| Layer | Where | What |
|---|---|---|
| Next / Vercel Image Optimization | Server / CDN | Re-encodes Cloudinary → WebP/AVIF at width `w`; shared across users |
| **PWA service worker** | User device (Cache Storage) | Stores **response bytes** for a **request URL** key |

`next/image` with a Cloudinary `src` causes the browser to fetch:

```text
/_next/image?url=<encoded-cloudinary-url>&w=<width>&q=<quality>
```

The SW must cache **that** request/response. Caching only the string in `portrait-albums.ts` / `landscape-photos.ts` does nothing useful while `next/image` sits in the middle.

```text
content src → next/image → GET /_next/image?... → SW → Cache Storage
                                         ↘ miss → Image Optimizer → Cloudinary
```

## Goals for this repo

- **In scope:** Faster revisits + offline for images the user has **already viewed** (runtime cache).
- **Out of scope:** Precaching the full gallery / “whole site offline” from content arrays.
- **Stack:** Serwist (`serwist` + `@serwist/next`) on Next App Router—not legacy `next-pwa`.

## Repo surface (keep small)

| Piece | Role |
|---|---|
| `next.config.ts` | `withSerwist(withNextIntl(config))` |
| `sw.ts` (app or src root per Serwist setup) | Runtime routes; build injects precache manifest |
| `_lib/pwa-image-cache.ts` | **Only** knobs: `CACHE_NAME`, `maxEntries`, `maxAgeSeconds` |
| Layout | Register SW in **production** only |
| `site.webmanifest` | Installability (`start_url`, local icons)—separate from image cache |

**Do not** add cache logic inside `PhotoTile` / `AlbumCarousel` / Hero—they already emit `/_next/image`; the SW intercepts automatically.

**Do not** change onboard-portrait / onboard-landscape skills to list SW URLs—new images cache on first view with zero SW edits.

## Recommended `/_next/image` rule

- **Matcher:** same-origin, pathname `/_next/image`.
- **Strategy:** `CacheFirst` + `ExpirationPlugin` with locked knobs in `_lib/pwa-image-cache.ts`:
  - `CACHE_NAME`: `next-image-v1` — bump version to flush stale device caches.
  - `maxEntries`: **120**
  - `maxAgeSeconds`: **14 days** (`14 * 24 * 60 * 60`), `maxAgeFrom: "last-used"`
- **Compose:** Use Serwist `defaultCache` for fonts/static assets, but **override** its stock `/_next/image` entry with the tuned CacheFirst rule.
- **Only cache** `/_next/image?url=...` — not raw `res.cloudinary.com`.
- **Register:** production only (`disable` when `NODE_ENV === "development"`).
- **Manifest `start_url`:** `/en` — routing uses `localePrefix: "always"` and `defaultLocale: "en"` ([`src/i18n/routing.ts`](../../../sarun-photography/src/i18n/routing.ts)); `/` alone is not a locale page.
- **Dev / build:** SW disabled when not production. Production build must use **webpack** (`next build --webpack`) because `@serwist/next` does not support Turbopack yet. Verify with `bun run build` then `next start`.
- **Gitignore:** `public/sw.js`, `public/sw.js.map`, `public/swe-worker*`.

## Scalability

- Gallery growth does not require SW changes.
- Bound by `maxEntries`, not photo count in content files.
- Same Cloudinary asset at `w=384` and `w=1080` = **two** cache entries (correct).
- If pressure is high: lower `maxEntries` or tighten UI `sizes`—do not precache content lists.

## What not to do

- Precache all URLs from `portrait-albums.ts` / `landscape-photos.ts`.
- Treat raw `res.cloudinary.com` as the primary SW target while using `next/image` (unless `unoptimized` / custom Cloudinary loader).
- Promise full offline galleries.
- Rely on `next dev` alone to validate SW image caching.

## Maintenance

1. Tune only `_lib/pwa-image-cache.ts` (and matching `nextImageCachePolicy` / tests if behavior changes intentionally).
2. Bump `CACHE_NAME` version to invalidate.
3. Unit tests pin knobs + matcher + CacheFirst composition:
   - `_lib/pwa-image-cache.test.ts`
   - `_lib/pwa-next-image-runtime-cache.test.ts`
4. Manual check: production build → open `/landscape` or `/portrait` → reload → Network shows ServiceWorker for `/_next/image` → Application → Cache Storage shows versioned cache name.
5. Content onboarding remains data-only.

## Related

- Plan: PWA next-image cache (Serwist + bounded CacheFirst).
- Next.js docs skill: [next-js-image-optimization.md](../next-js-image-optimization.md) (optimizer behavior).
- Serwist: https://serwist.pages.dev/docs/next/getting-started
