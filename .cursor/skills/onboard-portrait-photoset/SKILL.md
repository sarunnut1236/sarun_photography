---
name: onboard-portrait-photoset
description: >-
  Onboard a new portrait photoset from Cloudinary URLs into the Sarun Photography
  site (image list, home Portrait Sessions preview, /portrait section with header,
  subheader, and carousel, bilingual en/th copy). Use when the user wants to add a
  portrait album, photoset, session, Cloudinary portrait URLs, or onboard new
  portrait photos.
---

# Onboard Portrait Photoset

Turn Cloudinary delivery URLs into a live portrait album on home + `/portrait`.

## Required input

Collect before editing. Ask if any are missing.

1. **Image URLs** — one or more full Cloudinary delivery URLs (`https://res.cloudinary.com/...`)
2. **Session label** (optional) — e.g. `Graduation photoshoot` / `Couple graduation photoshoot` (context; use to disambiguate titles when needed)
3. **Subheader** — EN blurb, often with TH after ` - ` or on the same line (→ `seoDescription`)
4. **Title / slide caption** — short name used for album `title` and shared photo `alt`/`description` (EN; draft TH if missing)

Optional follow-up: **shot-number order** — e.g. `202, 235, 131, …` — keep only those URL shot numbers, sort in that order, drop the rest.

### Example input shape

```
https://res.cloudinary.com/dkjleico2/image/upload/v1789894661/Aing_Grad_Portrait_2569_1_dnafn5.jpg
https://res.cloudinary.com/dkjleico2/image/upload/v1789894661/Aing_Grad_Portrait_2569_27_fuxuzn.jpg
https://res.cloudinary.com/dkjleico2/image/upload/v1789894661/Aing_Grad_Portrait_2569_20_uadm0o.jpg
…
Graduation photoshoot
Take a photoshoot with academic gown in Chulalongkorn university - ถ่ายรูปกับชุดครุยที่จุฬาฯ
Graduation portraits 2026
```

Another real prompt:

```
https://res.cloudinary.com/dkjleico2/image/upload/v1789895553/Fern_Grad_Portrait_131_mpiqsm.jpg
https://res.cloudinary.com/dkjleico2/image/upload/v1789895554/Fern_Grad_Portrait_202_necc1e.jpg
…
Couple graduation photoshoot
Take a photoshoot in pair with academic gown in Benjakitti park- ถ่ายรูปคู่กับชุดครุยที่สวนเบญ
Couple graduation portraits
```

Then a sort/filter follow-up:

```
in url there will be "Fern_Grad_Portrait_186" I will tell you that this image is img no. 186
in ferngrad, pls sort like this
202, 235, 131, 308, 104, 93, 73, 186, 222, 258
the rest will be dropped from the repo
```

### How to map that input

| User line | Field |
|---|---|
| URL list | `photos[].src` (then reorder/drop if shot numbers given) |
| `Graduation photoshoot` / `Couple graduation photoshoot` | Session context; prefer the **title/caption** line for `title` when it is more specific (avoids colliding with an existing “Graduation photoshoot” album) |
| `Take a photoshoot … - ถ่ายรูป…` | `seoDescription.en` + `seoDescription.th` (split on ` - ` / `-` when TH is inline) |
| `Graduation portraits 2026` / `Couple graduation portraits` | `title` + shared `alt`/`description` (draft TH to match, e.g. `ชุดภาพรับปริญญา 2569`) |

## Output

| | |
|---|---|
| **Input** | Cloudinary URLs + copy lines as above |
| **Output** | Album in `portrait-albums.ts` → home Portrait Sessions (if in first 3) + `/portrait` carousel section, all strings bilingual |

Ask for anything still missing: album slug/`id` if not obvious from filenames, display title (en/th), SEO/subheader (en/th), ordered URL list. If Thai is missing, draft `th` from English and flag for review.

## Architecture (do not invent new pages)

One data append wires the UI. **Do not** create a new route, section component, or locale JSON file.

| Concern | File | Behavior |
|---|---|---|
| Image URL list + album copy | `sarun-photography/src/app/_content/portrait-albums.ts` | Source of truth |
| Home “Portrait Sessions” | `PortraitPreviewSection.tsx` | `portraitAlbums.slice(0, 3)` — first **3** albums only |
| `/portrait` header / subheader / carousel | `PortraitGallerySection.tsx` | Maps **all** albums; `title` → h2, `seoDescription` → subheader, `AlbumCarousel` |
| Section chrome (“Portrait Sessions”, CTA) | `sarun-photography/src/app/_content/copy.ts` | Shared keys via `t()` — edit only if renaming chrome |
| i18n | Inline `{ en, th }` | No `locales/` or message catalogs |

Related ops notes: `.cursor/rules/content-management.md`.

## Workflow checklist

Copy and track:

```
Portrait photoset onboarding:
- [ ] Collected Cloudinary URLs + album id/title/seoDescription (en + th)
- [ ] Appended PortraitAlbum to portraitAlbums (photos with id/src/alt/description)
- [ ] Home preview: album in first 3 positions if it should show on home
- [ ] /portrait: verify new article (header, subheader, carousel) — no component change needed
- [ ] All new strings have en + th
- [ ] URLs are full res.cloudinary.com delivery URLs
- [ ] Optional: PORTRAIT_OG_IMAGE / seoPages.portrait if social/meta should change
```

### Step 1 — Normalize input

1. Album `id`: short lowercase slug (e.g. `ferntam`, `aing`, `nam`).
2. Photo `id`: `{albumId}{n}` starting at 1 (`nam1`, `nam2`, …) — sequential in **final display order**, not Cloudinary shot numbers.
3. Each `src` must be a full Cloudinary URL starting with `https://res.cloudinary.com/`.
4. Every localized field is `{ en: string; th: string }` with fallback `value[language] ?? value.en`.

**Shot numbers in URLs:** Filenames like `Fern_Grad_Portrait_186_….jpg` mean image **no. 186**. When the user gives an ordered list of numbers (e.g. `202, 235, 131`), match each number to the URL containing that shot id, keep only those photos, sort in that order, and **drop** any other URLs from the album.

### Step 2 — Append album (image URL list)

Edit **only** `sarun-photography/src/app/_content/portrait-albums.ts` unless chrome/SEO must change.

Template:

```ts
{
  id: "slug",
  title: {
    en: "Session title",
    th: "ชื่อชุด",
  },
  seoDescription: {
    en: "One-line session blurb for the portrait page subheader.",
    th: "คำอธิบายสั้น ๆ ใต้หัวข้อในหน้าภาพบุคคล",
  },
  photos: [
    {
      id: "slug1",
      src: "https://res.cloudinary.com/dkjleico2/image/upload/v…/….jpg",
      alt: {
        en: "Short alt for accessibility/SEO",
        th: "คำอธิบายสั้นสำหรับ alt",
      },
      description: {
        en: "Caption under the carousel slide",
        th: "คำบรรยายใต้ภาพในแคร์ousel",
      },
    },
    // …remaining URLs in display order
  ],
},
```

Rules:

- Keep array order = display order (after applying any shot-number sort/filter from the user).
- Prefer unique, descriptive `alt` / `description` per photo when the user provides captions; reuse a shared session caption only if they want that (matches some existing albums).
- Do not set `cloudinaryId` unless the user supplies a public ID separately; carousel uses `src`.

### Step 3 — Home Portrait Sessions

Home preview uses:

```ts
portraitAlbums.slice(0, 3)
```

- To show on home: place the album within the **first three** entries (usually insert at index 0 for “newest first,” or ask the user).
- Albums after index 2 appear on `/portrait` only.
- No edit to `PortraitPreviewSection.tsx` for a normal onboard.

Section title/CTA come from `copy.ts` keys `portraitsSectionTitle` / `portraitsSectionCta` — leave them unless the user wants chrome renamed.

### Step 4 — Portrait page section

`PortraitGallerySection` already renders for each album:

1. **Header** — `album.title`
2. **Subheader** — `album.seoDescription`
3. **Carousel** — `<AlbumCarousel album={…} autoplay variant="full" />`

No new section component. Confirm the new album appears after the data change.

### Step 5 — i18n

Every new user-facing string must include both `en` and `th`:

| Text | Where |
|---|---|
| Album title, seoDescription, photo alt/description | `portrait-albums.ts` |
| “Portrait Sessions” / “Find more portraits” | `copy.ts` (only if changing chrome) |
| Page `<title>` / meta description | `seo-copy.ts` → `seoPages.portrait` (optional) |

Do **not** add keys to a fictitious locale file.

### Step 6 — Optional SEO / env

- Images need `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` set; non-Cloudinary URLs do not render.
- Optionally update `PORTRAIT_OG_IMAGE` in `seo-copy.ts` / `seo.ts` to a hero frame from the new set.
- JSON-LD on `/portrait` picks up new photos automatically (capped at 24 total).

## What not to do

- Do not add a per-album route or duplicate carousel section by hand.
- Do not edit `AlbumCarousel` / gallery components for a normal onboard.
- Do not use local `/public` image paths for portraits.
- Do not leave `th` empty — draft Thai and note it for review if the user only gave English.

## Verify

1. Home: new set in Portrait Sessions if within first 3; titles bilingual (`?lang=th`).
2. `/portrait`: new block with title, seoDescription, working carousel for all URLs.
3. Typecheck / existing portrait tests still pass if you run them.

## Example (end-to-end)

**From the Aing Chula set:** URLs → id `ainggrad`, title “Graduation portraits 2026” / “ชุดภาพรับปริญญา 2569”, seoDescription from the Chula gown line, shared captions from the title line, insert at index 0 for home preview.

**From the Fern couple set:** URLs → id `ferngrad`, title “Couple graduation portraits” / “ชุดภาพรับปริญญาคู่”, then reorder to shot numbers `202, 235, 131, …` and drop unused URLs.
