import type { MetadataRoute } from "next";
import { localizedUrl } from "./_lib/seo";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] =
  [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/hire", priority: 0.95, changeFrequency: "monthly" },
    { path: "/portrait", priority: 0.9, changeFrequency: "monthly" },
    { path: "/landscape", priority: 0.7, changeFrequency: "monthly" },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(({ path, priority, changeFrequency }) =>
    (["en", "th"] as const).map((lang) => ({
      url: localizedUrl(path, lang),
      lastModified: "2026-05-18",
      changeFrequency,
      priority,
    })),
  );
}
