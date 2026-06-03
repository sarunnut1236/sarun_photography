import type { MetadataRoute } from "next";
import { localizedUrl } from "./_lib/seo";

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified: string;
};

const ROUTES: RouteConfig[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: "2026-05-18" },
  { path: "/hire", priority: 0.95, changeFrequency: "monthly", lastModified: "2026-05-18" },
  { path: "/portrait", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-05-18" },
  { path: "/landscape", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-05-18" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: localizedUrl(path, "en"),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: localizedUrl(path, "en"),
        th: localizedUrl(path, "th"),
        "x-default": localizedUrl(path, "en"),
      },
    },
  }));
}
