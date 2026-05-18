"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "../../_providers/language-context";
import { buildLocalizedHref } from "../../_lib/routing";
import { DEFAULT_OG_IMAGE } from "../../_lib/seo";

export default function CallToActionBanner() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const headline = t("homeCtaHeadline");

  return (
    <section className="animate-slide-up">
      <div className="grid overflow-hidden rounded-2xl border border-(--border-subtle) md:grid-cols-2">
        <div className="no-save-media relative h-44 bg-(--bg) md:h-56"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <Image
            src={DEFAULT_OG_IMAGE}
            alt={headline}
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover object-center"
            draggable={false}
          />
        </div>
        <div className="flex items-center p-6 md:p-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold leading-snug tracking-tight md:text-xl">{headline}</h2>
            <Link
              href={buildLocalizedHref("/hire", searchParams, language)}
              className="inline-flex items-center justify-center rounded-full bg-(--text-primary) px-5 py-2 text-sm text-(--bg) transition-opacity hover:opacity-90"
            >
              {t("homeIntroCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
