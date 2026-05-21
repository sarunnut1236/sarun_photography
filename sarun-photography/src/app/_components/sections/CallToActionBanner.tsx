"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCloudinary, isCloudinarySrc } from "../../_hooks/use-cloudinary";
import { useLanguage } from "../../_providers/language-context";
import { buildLocalizedHref } from "../../_lib/routing";

const CTA_IMAGE_SRC =
  "https://res.cloudinary.com/dkjleico2/image/upload/v1779205103/IMG_5567_d8osr8.jpg";

export default function CallToActionBanner() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const headline = t("homeCtaHeadline");
  const { isEnabled } = useCloudinary();
  const canShowImage = isEnabled && isCloudinarySrc(CTA_IMAGE_SRC);

  return (
    <section className="animate-slide-up">
      <div className="grid overflow-hidden rounded-2xl border border-(--border-subtle) md:grid-cols-2">
        <div
          className="no-save-media relative h-44 bg-(--bg) md:h-full md:min-h-56"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          {canShowImage && (
            <Image
              src={CTA_IMAGE_SRC}
              alt={headline}
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover object-center"
              draggable={false}
            />
          )}
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold leading-snug tracking-tight md:text-xl">{headline}</h2>
            <p className="text-sm leading-relaxed text-(--text-secondary) md:text-base">
              {t("homeIntroBody")}
            </p>
            <Link
              href={buildLocalizedHref("/hire", searchParams, language)}
              className="inline-flex w-fit items-center justify-center rounded-full bg-(--text-primary) px-5 py-2 text-sm text-(--bg) transition-opacity hover:opacity-90"
            >
              {t("homeIntroCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
