"use client";

import { useLocale, useTranslations } from "next-intl";
import { portraitAlbums } from "../../_content/portrait-albums";
import AlbumCarousel from "../gallery/AlbumCarousel";

export default function PortraitGallerySection() {
  const t = useTranslations();
  const locale = useLocale() as "en" | "th";

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold md:text-2xl">{t("portraitsSectionTitle")}</h1>
      </header>
      <div className="space-y-10">
        {portraitAlbums.map((album) => (
          <article key={album.id} className="space-y-3">
            <h2 className="text-lg font-semibold md:text-xl">
              {album.title[locale] ?? album.title.en}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-(--text-secondary) md:text-base">
              {album.seoDescription[locale] ?? album.seoDescription.en}
            </p>
            <AlbumCarousel
              album={album}
              autoplay={true}
              intervalMs={4000}
              variant="full"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
