"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "../../_providers/language-context";
import { buildLocalizedHref } from "../../_lib/routing";

export default function HomeIntroSection() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  return (
    <section className="rounded-2xl border border-(--border-subtle) bg-(--bg) p-6 md:p-8">
      <h2 className="text-lg font-semibold md:text-xl">{t("homeIntroTitle")}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--text-secondary) md:text-base">
        {t("homeIntroBody")}
      </p>
      <Link
        href={buildLocalizedHref("/hire", searchParams, language)}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-(--text-primary) px-5 py-2 text-sm text-(--bg) transition-opacity hover:opacity-90"
      >
        {t("homeIntroCta")}
      </Link>
    </section>
  );
}
