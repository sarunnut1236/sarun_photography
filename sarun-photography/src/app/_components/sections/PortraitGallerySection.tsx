"use client";

import { useLanguage } from "../../_providers/language-context";
import { portraitAlbums } from "../../_content/portrait-albums";
import AlbumCarousel from "../gallery/AlbumCarousel";

export default function PortraitGallerySection() {
  const { t } = useLanguage();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold md:text-2xl">{t("portraitsSectionTitle")}</h1>
      </header>
      <div className="space-y-10">
        {portraitAlbums.map((album) => (
          <AlbumCarousel
            key={album.id}
            album={album}
            autoplay={true}
            intervalMs={4000}
            variant="full"
          />
        ))}
      </div>
    </section>
  );
}
