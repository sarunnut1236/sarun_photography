---
name: onboard-landscape-photo
description: >-
  Onboard a new landscape photo from a Cloudinary URL into the Sarun Photography
  /landscape page only (category/theme, bilingual en/th caption, last in that
  category). Never add to the home page. Use when the user wants to add a
  landscape photo, cityscape, nature, sky, stars, architecture, minimalism shot,
  or Cloudinary landscape URL.
---

# Onboard Landscape Photo

Add one (or more) Cloudinary landscape images to **/landscape** only.

## Required input

Collect all three before editing. Ask if any are missing.

1. **Image URL** — full Cloudinary delivery URL (`https://res.cloudinary.com/...`)
2. **Category** — which theme it belongs to (see allowed ids below)
3. **Caption** — `th` and `en` (use for both `alt` and `description`)

Example input shape:

```
https://res.cloudinary.com/dkjleico2/image/upload/v1789896483/%E0%B8%9C%E0%B8%AA%E0%B8%A1%E0%B8%9E%E0%B8%A5%E0%B8%B82_tihv8t.jpg
cityscape
ถ่ายรูปพลุหน้าไอคอนสยาม ถ่ายจากสะพานตากสิน
Taking a shot of flares by the Chao Phraya river
```

## Output

| | |
|---|---|
| **Do** | Append one `LandscapePhoto` in `sarun-photography/src/app/_content/landscape-photos.ts` |
| **Result** | Photo appears on `/landscape` under that category, **last** in that category’s grid |
| **Do not** | Touch home Landscape Moments / `previewIds` |

## Architecture

| Concern | File | Behavior |
|---|---|---|
| Photo list | `sarun-photography/src/app/_content/landscape-photos.ts` | Flat `landscapePhotos` array; each entry has `theme` |
| Categories | `sarun-photography/src/app/_content/landscape-themes.ts` | Theme order + bilingual titles/descriptions |
| `/landscape` grid | `LandscapeGalleryGrid.tsx` | Filters by theme; **array order within theme = display order** |
| Home preview | `LandscapePreviewSection.tsx` | Hardcoded `previewIds` allowlist of 6 ids |

**Hard rule: DONT add it in home page at all.** Do not edit `previewIds`, `LandscapePreviewSection.tsx`, home `page.tsx`, or messages keys for a normal onboard.

Related: `.cursor/rules/content-management.md`. Portrait albums use a different skill (`onboard-portrait-photoset`).

## Allowed categories (`theme`)

| User may say | `theme` id |
|---|---|
| cityscape | `cityscape` |
| landscape | `landscape` |
| nature | `nature` |
| stars / star | `star` |
| sky | `sky` |
| architecture | `architecture` |
| minimalism | `minimalism` |

If the category is new, stop and confirm — adding a theme requires updating the `theme` union in `landscape-photos.ts` **and** an entry in `landscape-themes.ts`. Do not invent themes silently.

## Workflow checklist

```
Landscape photo onboarding:
- [ ] Have URL + category + caption en + caption th
- [ ] Chose next id for that theme (e.g. cityscape7)
- [ ] Inserted entry as last photo for that theme in landscapePhotos
- [ ] alt and description both use the bilingual captions
- [ ] Did NOT change LandscapePreviewSection previewIds / home
```

### Step 1 — Normalize

1. Confirm URL starts with `https://res.cloudinary.com/`.
2. Map category string → `theme` id (table above).
3. Captions: `{ en, th }` for both `alt` and `description` (same text is fine; matches existing entries).
4. **Id:** `{theme}{n}` where `n` is one higher than the highest existing numeric suffix for that theme (e.g. if `cityscape6` exists → `cityscape7`). Scan the file; do not reuse ids.

### Step 2 — Append last in that category

`LandscapeGalleryGrid` does `landscapePhotos.filter(photo => photo.theme === theme.id)`, so **order among a category = order of those entries in the array**.

Always put the new photo **last in that category**:

1. Find the last index in `landscapePhotos` where `theme === <category>`.
2. Insert the new object **immediately after** that entry.
3. If the category has no photos yet, append at the end of the array (or after the natural cluster for that theme if one exists).

Do **not** only append at end of file if that would leave older same-theme photos after it — insert after the last same-theme entry.

Template:

```ts
{
  id: "cityscape7",
  src: "https://res.cloudinary.com/dkjleico2/image/upload/…",
  alt: {
    en: "Taking a shot of flares by the Chao Phraya river",
    th: "ถ่ายรูปพลุหน้าไอคอนสยาม ถ่ายจากสะพานตากสิน",
  },
  description: {
    en: "Taking a shot of flares by the Chao Phraya river",
    th: "ถ่ายรูปพลุหน้าไอคอนสยาม ถ่ายจากสะพานตากสิน",
  },
  theme: "cityscape",
},
```

### Step 3 — Home page (explicit non-goal)

- Do **not** add the new `id` to `previewIds` in `LandscapePreviewSection.tsx`.
- Do **not** replace an existing preview id unless the user explicitly asks to feature this shot on home.

### Step 4 — Batch / multiple photos

For several photos in one message: process in the order given; each becomes the new last in its category (so later ones in the same category end up after earlier ones).

## What not to do

- Do not add the photo to the home Landscape Moments grid.
- Do not create a new page, route, or gallery component.
- Do not put landscape shots into `portrait-albums.ts`.
- Do not leave `th` or `en` caption empty — draft the missing side and flag for review if needed.
- Do not edit `messages/*.json` or theme chrome unless the user asks to rename section copy.

## Verify

1. `/landscape#<theme>` (or scroll to category): new tile is the **last** in that category.
2. Home Landscape Moments: unchanged (same six preview images).
3. Hover/caption shows en; `?` / locale `th` shows Thai caption.

## Example (from user)

**Input**

- URL: `https://res.cloudinary.com/dkjleico2/image/upload/v1789896483/%E0%B8%9C%E0%B8%AA%E0%B8%A1%E0%B8%9E%E0%B8%A5%E0%B8%B82_tihv8t.jpg`
- Category: `cityscape`
- TH: `ถ่ายรูปพลุหน้าไอคอนสยาม ถ่ายจากสะพานตากสิน`
- EN: `Taking a shot of flares by the Chao Phraya river`

**Action:** Insert as next `cityscape{n}` after the last existing `theme: "cityscape"` entry; leave `previewIds` alone.
