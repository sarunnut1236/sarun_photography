import { landscapePhotos } from "../../_content/landscape-photos";
import { portraitAlbums } from "../../_content/portrait-albums";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "../../_lib/seo";

const MAX_GALLERY_IMAGES = 24;

type GalleryImage = {
  url: string;
  caption?: string;
};

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "th"],
  };
}

export function photographerJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    description: "Portrait and landscape photography in Bangkok, Thailand.",
    areaServed: {
      "@type": "City",
      name: "Bangkok",
    },
    priceRange: "฿฿",
    sameAs: [
      "https://www.instagram.com/sarun.pics",
      "https://www.instagram.com/_sarunnutto",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "sarunlapsuk@gmail.com",
        availableLanguage: ["English", "Thai"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        url: "https://line.me/ti/p/~sarunut",
        availableLanguage: ["English", "Thai"],
      },
    ],
  };
}

export function imageGalleryJsonLd(name: string, pagePath: string, images: GalleryImage[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    url: `${SITE_URL}${pagePath}`,
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.url,
      ...(img.caption ? { caption: img.caption } : {}),
    })),
  };
}

export function portraitGalleryJsonLd() {
  const images = portraitAlbums
    .flatMap((album) => album.photos)
    .slice(0, MAX_GALLERY_IMAGES)
    .map((photo) => ({ url: photo.src, caption: photo.alt.en }));

  return imageGalleryJsonLd("Portrait photography — Bangkok", "/portrait", images);
}

export function landscapeGalleryJsonLd() {
  const images = landscapePhotos
    .slice(0, MAX_GALLERY_IMAGES)
    .map((photo) => ({ url: photo.src, caption: photo.alt.en }));

  return imageGalleryJsonLd("Landscape photography — Thailand", "/landscape", images);
}
