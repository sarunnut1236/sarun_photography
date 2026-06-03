"use client";

import { useLocale, useTranslations } from "next-intl";
import { landscapePhotos } from "../../_content/landscape-photos";
import { landscapeThemes } from "../../_content/landscape-themes";
import PhotoTile from "../gallery/PhotoTile";

export default function LandscapeGalleryGrid() {
  const t = useTranslations();
  const locale = useLocale() as "en" | "th";

  const photosByTheme = landscapeThemes
    .map((theme) => ({
      theme,
      photos: landscapePhotos.filter((photo) => photo.theme === theme.id),
    }))
    .filter((group) => group.photos.length > 0);

  return (
    <section className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold md:text-2xl">{t("landscapesSectionTitle")}</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-(--text-secondary) md:text-base">
          {t("landscapeIntro")}
        </p>
      </header>
      <div className="space-y-8">
        {photosByTheme.map(({ theme, photos }) => (
          <section key={theme.id} className="space-y-3" id={theme.id}>
            <h2 className="text-lg font-semibold md:text-xl">
              {theme.title[locale] ?? theme.title.en}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-(--text-secondary) md:text-base">
              {theme.description[locale] ?? theme.description.en}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <PhotoTile
                  key={photo.id}
                  src={photo.cloudinaryId ?? photo.src}
                  alt={photo.alt[locale] ?? photo.alt.en}
                  description={photo.description[locale] ?? photo.description.en}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
