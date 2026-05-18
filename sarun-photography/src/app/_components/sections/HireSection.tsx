"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { useLanguage } from "../../_providers/language-context";
import { buildLocalizedHref } from "../../_lib/routing";

export default function HireSection() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold md:text-3xl">{t("hireTitle")}</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-(--text-secondary) md:text-base">
          {t("hireIntro")}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="space-y-3 rounded-2xl border border-(--border-subtle) p-6">
          <h2 className="text-lg font-semibold">{t("hirePackageHalfDayTitle")}</h2>
          <p className="text-xl font-medium text-(--text-primary)">{t("footerRateHalfDay")}</p>
          <p className="text-sm text-(--text-secondary)">{t("hirePackageHalfDayDetail")}</p>
        </article>
        <article className="space-y-3 rounded-2xl border border-(--border-subtle) p-6">
          <h2 className="text-lg font-semibold">{t("hirePackageFullDayTitle")}</h2>
          <p className="text-xl font-medium text-(--text-primary)">{t("footerRateFullDay")}</p>
          <p className="text-sm text-(--text-secondary)">{t("hirePackageFullDayDetail")}</p>
        </article>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">{t("hireSessionsTitle")}</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-(--text-secondary) md:text-base">
          <li>{t("hireSessionGeneral")}</li>
          <li>{t("hireSessionGraduation")}</li>
          <li>{t("hireSessionUniversity")}</li>
        </ul>
        <p className="text-sm text-(--text-secondary)">
          <Link
            href={buildLocalizedHref("/portrait", searchParams, language)}
            className="underline underline-offset-4 hover:text-(--text-primary)"
          >
            {t("hireViewPortfolio")}
          </Link>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">{t("hireBookTitle")}</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:sarunlapsuk@gmail.com"
            onClick={() => track("hire_email_click")}
            className="inline-flex items-center justify-center rounded-full border border-(--border-subtle) px-5 py-2 text-sm transition-colors hover:bg-(--border-subtle)"
          >
            {t("footerEmailCta")}
          </a>
          <a
            href="https://line.me/ti/p/~sarunut"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("hire_line_click")}
            className="inline-flex items-center justify-center rounded-full bg-(--text-primary) px-5 py-2 text-sm text-(--bg) transition-opacity hover:opacity-90"
          >
            {t("footerLineCta")}
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{t("hireFaqTitle")}</h2>
        <dl className="space-y-4">
          {(
            [
              ["hireFaq1Q", "hireFaq1A"],
              ["hireFaq2Q", "hireFaq2A"],
              ["hireFaq3Q", "hireFaq3A"],
            ] as const
          ).map(([q, a]) => (
            <div key={q}>
              <dt className="font-medium text-(--text-primary)">{t(q)}</dt>
              <dd className="mt-1 text-sm text-(--text-secondary) md:text-base">{t(a)}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
}
