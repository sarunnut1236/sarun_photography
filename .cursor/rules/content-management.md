---
description: How to update CMS texts and Cloudinary images in the Sarun Photography portfolio
globs:
  - "sarun-photography/src/app/_content/**"
---

# Content Management Guide

This document explains how to update text content and images in the Sarun Photography portfolio. All content is defined in TypeScript/JSON files under `sarun-photography/src/app/_content/`, and images are loaded from Cloudinary using full URLs.

---

## 1. Site settings (numbers only)

### Location
- **File**: `sarun-photography/settings.json`

### Structure
Values only — no copy, formatting, or translations:

```json
{
  "rates": {
    "halfDayThb": 1500,
    "fullDayThb": 2000
  }
}
```

### How to update
1. Edit the numbers in `settings.json`.
2. Wording that includes rates lives in `copy.ts` and `seo-copy.ts` (those files import `settings` and interpolate `${halfDayThb}` / `${fullDayThb}`).

---

## 2. Updating Text Content (Copy)

### Location
- **File**: `sarun-photography/src/app/_content/copy.ts`

### Structure
Every text string is bilingual with `en` (English) and `th` (Thai):

```ts
export const copy = {
  siteTitle: {
    en: "Sarun Photography",
    th: "ซารุน โฟโต้กราฟฟี",
  },
  heroTitle: {
    en: "Portrait & Landscape Photography in Bangkok",
    th: "ภาพบุคคลและภูมิทัศน์ในกรุงเทพฯ",
  },
  // ...
};
```

### How to update
1. Open `copy.ts`.
2. Find the key for the text you want to change (e.g. `heroSubtitle`, `footerRate`).
3. Edit both `en` and `th` values.
4. Add new keys if needed — the key must be used in a component via `t("keyName")` to appear on the site.

### Copy keys reference
| Key | Where it appears |
|-----|------------------|
| `siteTitle` | Header logo |
| `navHome`, `navPortrait`, `navLandscape` | Header navigation |
| `heroTitle`, `heroSubtitle` | Landing page hero section |
| `portraitsSectionTitle`, `portraitsSectionCta` | Portrait preview / gallery |
| `landscapesSectionTitle`, `landscapesSectionCta` | Landscape preview / gallery |
| `footerLocation`, `footerAvailability`, `footerRateHalfDay`, `footerRateFullDay` | Footer text |
| `footerEmailCta`, `footerInstagramLabel` | Footer contact labels |

---

## 2. Updating Portrait Images and Descriptions (Cloudinary)

### Location
- **File**: `sarun-photography/src/app/_content/portrait-albums.ts`

### Structure
Portrait content is organized by **albums**, each containing multiple **photos**. All images are referenced by **Cloudinary URLs**:

```ts
{
  id: "album-id",
  title: { en: "...", th: "..." },
  photos: [
    {
      id: "photo-id",
      src: "https://res.cloudinary.com/your-cloud/image/upload/....jpg",
      alt: { en: "...", th: "..." },
      description: { en: "...", th: "..." },
    },
  ],
}
```

### How to update
1. **Change an existing image**: Upload the new photo to Cloudinary and update the `src` field with the full Cloudinary URL.
2. **Change captions**: Edit `alt` and `description` for both `en` and `th`.
3. **Add a new photo**: Add a new object to the album's `photos` array.
4. **Add a new album**: Add a new album object to `portraitAlbums` and ensure it has at least one photo.

### Image rules
- Portrait images must be stored in Cloudinary.
- The `src` value must be a full Cloudinary URL (e.g. `https://res.cloudinary.com/.../image/upload/...`).
// Supported formats come from Cloudinary (JPG, JPEG, PNG, WebP, etc.).

---

## 4. Updating Landscape Images and Descriptions (Cloudinary)

### Location
- **File**: `sarun-photography/src/app/_content/landscape-photos.ts`

### Structure
Landscape content is a flat list of photos (no albums), each with a Cloudinary URL:

```ts
{
  id: "photo-id",
  src: "https://res.cloudinary.com/your-cloud/image/upload/....jpg",
  alt: { en: "...", th: "..." },
  description: { en: "...", th: "..." },
  location: { en: "...", th: "..." },  // optional
}
```

### How to update
1. **Change an existing image**: Upload the new photo to Cloudinary and update the `src` field with the full Cloudinary URL.
2. **Change captions**: Edit `alt`, `description`, and optionally `location` for both `en` and `th`.
3. **Add a new photo**: Add a new object to the `landscapePhotos` array.

### Image rules
- Landscape images must be stored in Cloudinary.
- The `src` value must be a full Cloudinary URL (e.g. `https://res.cloudinary.com/.../image/upload/...`).

---

## 5. Hero Section Image (Cloudinary)

### Location
- **Component**: `sarun-photography/src/app/_components/sections/HeroSection.tsx`

### How to update
1. Upload the desired hero image to Cloudinary.
2. Update the hero image constant (in `HeroSection.tsx`) with the new Cloudinary URL.

---

## 6. Adding New Images to the Project (Cloudinary)

### Step-by-step
1. **Upload the file to Cloudinary** using your Cloudinary account.
2. **Copy the full delivery URL** from Cloudinary (e.g. `https://res.cloudinary.com/.../image/upload/...`).
3. **Reference it in content**:
   - Portrait: Update or add a photo entry in `portrait-albums.ts` with `src: "<cloudinary-url>"`.
   - Landscape: Update or add a photo entry in `landscape-photos.ts` with `src: "<cloudinary-url>"`.

3. **Provide bilingual metadata**:
   - `alt`: Short description for screen readers and SEO.
   - `description`: Caption shown below or on hover.
   - `location` (landscape only): Optional place name.

### Naming conventions
- Use descriptive, lowercase filenames with hyphens (e.g. `bangkok-sunset-01.jpg`).
- Avoid spaces and special characters.

---

## 7. Cloudinary Configuration and Behavior

- The app uses a single `useCloudinary()` hook (`src/app/_hooks/use-cloudinary.ts`) to read `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` once.
- When Cloudinary is not configured (missing env var) or when a URL is not a Cloudinary URL, portfolio and hero images are not rendered.
- If an image fails to load from Cloudinary, the components are implemented to avoid falling back to local images; the image slot will simply not show the photo.
