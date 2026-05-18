import type { Metadata } from "next";
import { seoPages, type SeoPageKey } from "../_content/seo-copy";

export const SITE_URL = "https://sarun-photography.vercel.app";
export const SITE_NAME = "Sarun Photography";

export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dkjleico2/image/upload/v1773089164/IMG_5668_p1cuxr.jpg";

export const PORTRAIT_OG_IMAGE =
  "https://res.cloudinary.com/dkjleico2/image/upload/v1773083009/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_4_nbfmm9.jpg";

export const LANDSCAPE_OG_IMAGE =
  "https://res.cloudinary.com/dkjleico2/image/upload/v1773085424/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B8%90%E0%B8%A1%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C_%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88_kqmb44.png";

export type SiteLanguage = "en" | "th";

const TRACKING_PARAM_PREFIXES = ["utm_", "fbclid", "gclid", "mc_", "ref"];

export function resolveLanguage(lang: string | undefined): SiteLanguage {
  return lang === "th" ? "th" : "en";
}

export function localizedUrl(path: string, lang: SiteLanguage): string {
  const url = new URL(path, SITE_URL);
  url.searchParams.set("lang", lang);
  return url.toString();
}

export function canonicalUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function languageAlternates(path: string): Record<string, string> {
  return {
    en: localizedUrl(path, "en"),
    th: localizedUrl(path, "th"),
    "x-default": localizedUrl(path, "en"),
  };
}

export function stripTrackingParams(url: URL): URL {
  const cleaned = new URL(url.toString());
  [...cleaned.searchParams.keys()].forEach((key) => {
    const lower = key.toLowerCase();
    if (TRACKING_PARAM_PREFIXES.some((prefix) => lower.startsWith(prefix) || lower === prefix)) {
      cleaned.searchParams.delete(key);
    }
  });
  return cleaned;
}

export function buildPageMetadata(
  pageKey: SeoPageKey,
  lang: SiteLanguage,
  path: string,
): Metadata {
  const page = seoPages[pageKey];
  const title = page.title[lang];
  const description = page.description[lang];
  const ogImage = page.ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: localizedUrl(path, lang),
      siteName: SITE_NAME,
      locale: lang === "th" ? "th_TH" : "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seoPages.home.title.en,
    template: `%s | ${SITE_NAME}`,
  },
  description: seoPages.home.description.en,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_TH",
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: DEFAULT_OG_IMAGE,
    apple: DEFAULT_OG_IMAGE,
  },
};
