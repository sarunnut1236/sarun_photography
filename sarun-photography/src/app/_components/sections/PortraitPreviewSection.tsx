"use client";

import { useTranslations } from "next-intl";
import { portraitAlbums } from "../../_content/portrait-albums";
import AlbumCarousel from "../gallery/AlbumCarousel";
import { Link } from "@/i18n/navigation";

export default function PortraitPreviewSection() {
  const t = useTranslations();
  const previewAlbums = portraitAlbums.slice(0, 3);

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold md:text-xl">{t("portraitsSectionTitle")}</h2>
        </div>
        <Link
          href="/portrait"
          className="text-xs md:text-sm text-(--text-secondary) underline underline-offset-4 hover:text-(--text-primary)"
        >
          {t("portraitsSectionCta")}
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {previewAlbums.map((album) => (
          <AlbumCarousel key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
}
