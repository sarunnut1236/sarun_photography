 "use client";

import { useLanguage } from "../../_providers/language-context";
import { portraitAlbums } from "../../_content/portrait-albums";
import AlbumCarousel from "../gallery/AlbumCarousel";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { buildLocalizedHref } from "../../_lib/routing";

export default function PortraitPreviewSection() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const previewAlbums = portraitAlbums.slice(0, 3);

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold md:text-xl">
            {t("portraitsSectionTitle")}
          </h2>
        </div>
        <Link
          href={buildLocalizedHref("/portrait", searchParams, language)}
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

