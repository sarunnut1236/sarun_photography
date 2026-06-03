"use client";

import { useLocale, useTranslations } from "next-intl";
import { landscapePhotos } from "../../_content/landscape-photos";
import PhotoTile from "../gallery/PhotoTile";
import { Link } from "@/i18n/navigation";

export default function LandscapePreviewSection() {
  const t = useTranslations();
  const locale = useLocale() as "en" | "th";
  const previewIds = [
    "cityscape2",
    "architecture5",
    "nature3",
    "landscape5",
    "sky5",
    "star2",
  ] as const;
  const preview = previewIds
    .map((id) => landscapePhotos.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p != null);

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold md:text-xl">{t("landscapesSectionTitle")}</h2>
        </div>
        <Link
          href="/landscape"
          className="text-xs md:text-sm text-(--text-secondary) underline underline-offset-4 hover:text-(--text-primary)"
        >
          {t("landscapesSectionCta")}
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {preview.map((photo) => (
          <PhotoTile
            key={photo.id}
            src={photo.cloudinaryId ?? photo.src}
            alt={photo.alt[locale] ?? photo.alt.en}
            description={photo.description[locale] ?? photo.description.en}
          />
        ))}
      </div>
    </section>
  );
}
