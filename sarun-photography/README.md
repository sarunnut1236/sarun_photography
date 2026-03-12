# Sarun Photography

Minimal, bilingual (EN/TH) photography portfolio for a Bangkok-based photographer, featuring:

- **Portrait galleries** as carousels (autoplay on load; stops permanently after the user interacts with that carousel)
- **Landscape gallery** as a clean 3-column grid with hover captions
- **Light/Dark mode** and a minimalist UI so photos stay the focus

## Tech stack

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **MUI**
- **Cloudinary** as image CDN with `next/image`

## Requirements

- **Node.js**: v25.8
- **bun.js:** v1.3.10

## Setup

From the repo root:

```bash
cd sarun-photography
bun install
```

## Development

```bash
bun dev
```

Then open `http://localhost:3000`.

### Scripts

- **dev**: `bun dev`
- **build**: `bun build`
- **start**: `bun start`
- **lint**: `bun lint`

## Environment variables

Images are rendered only when Cloudinary is enabled.

Create `sarun-photography/.env.local`:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

If `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is missing, the app intentionally avoids rendering Cloudinary images (see `src/app/_hooks/use-cloudinary.ts`).

## Content management (texts + photos)

All content is authored in TypeScript files under `sarun-photography/src/app/_content/`.

Use the project guide at `.cursor/rules/content-management.md` as the source of truth, especially for:

- Updating bilingual copy
- Adding/replacing portrait albums
- Adding/replacing landscape photos

Common edit locations:

- **Copy (EN/TH UI text)**: `src/app/_content/copy.ts`
- **Portrait albums**: `src/app/_content/portrait-albums.ts`
- **Landscape photos**: `src/app/_content/landscape-photos.ts`
- **Hero image**: `src/app/_components/sections/HeroSection.ts`
