"use client";

import { CldImage } from "next-cloudinary";
import { useLanguage } from "../../_providers/language-context";
import { useCloudinary, isCloudinarySrc } from "../../_hooks/use-cloudinary";

const HERO_IMAGE_SRC =
  "https://res.cloudinary.com/dkjleico2/image/upload/v1773089164/IMG_5668_p1cuxr.jpg";

export default function HeroSection() {
  const { t } = useLanguage();
  const { isEnabled } = useCloudinary();
  const canShowHero = isEnabled && isCloudinarySrc(HERO_IMAGE_SRC);

  return (
    <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center animate-fade-in">
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-(--bg)">
        {canShowHero && (
          <CldImage
            src={HERO_IMAGE_SRC}
            alt={t("heroTitle")}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-bottom"
            preload={true}
          />
        )}
      </div>
      <div className="space-y-4 md:space-y-6">
        <h1 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
          {t("heroTitle")}
        </h1>
        <p className="text-sm leading-relaxed text-(--text-secondary) md:text-base">
          {t("heroSubtitle")}
        </p>
      </div>
    </section>
  );
}

