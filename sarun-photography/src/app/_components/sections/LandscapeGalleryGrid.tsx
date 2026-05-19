"use client";

import { useLanguage } from "../../_providers/language-context";
import { landscapePhotos } from "../../_content/landscape-photos";
import PhotoTile from "../gallery/PhotoTile";

export default function LandscapeGalleryGrid() {
  const { t, language } = useLanguage();

  const themesInOrder = [
    "cityscape",
    "landscape",
    "nature",
    "star",
    "sky",
    "architecture",
    "minimalism",
  ] as const;

  const themeLabels: Record<(typeof themesInOrder)[number], string> = {
    cityscape: t("landscapeThemeCityscape"),
    minimalism: t("landscapeThemeMinimalism"),
    nature: t("landscapeThemeNature"),
    architecture: t("landscapeThemeArchitecture"),
    star: t("landscapeThemeStar"),
    landscape: t("landscapeThemeLandscape"),
    sky: t("landscapeThemeSky"),
  };

  const photosByTheme = themesInOrder
    .map((theme) => ({
      theme,
      label: themeLabels[theme],
      photos: landscapePhotos.filter((photo) => photo.theme === theme),
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
        {photosByTheme.map((group) => (
          <section key={group.theme} className="space-y-3" id={group.theme}>
            <h2 className="text-lg font-semibold md:text-xl">{group.label}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.photos.map((photo) => (
                <PhotoTile
                  key={photo.id}
                  src={photo.cloudinaryId ?? photo.src}
                  alt={photo.alt[language] ?? photo.alt.en}
                  description={photo.description[language] ?? photo.description.en}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
