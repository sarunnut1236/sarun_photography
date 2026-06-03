"use client";

import { track } from "@vercel/analytics";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { settings } from "../../_lib/settings";

const { halfDayThb, fullDayThb } = settings.rates;

export default function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="border-t border-(--border-subtle) bg-(--bg)">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2 text-sm md:text-base">
          <p className="text-(--text-primary)">{t("footerLocation")}</p>
          <p className="text-(--text-secondary)">{t("footerAvailability")}</p>
          <p className="text-(--text-primary) font-medium">
            {t("footerRateHalfDay", { halfDayThb })}
            <br />
            {t("footerRateFullDay", { fullDayThb })}
          </p>
          <p className="pt-2">
            <Link
              href="/hire"
              className="text-(--text-secondary) underline underline-offset-4 hover:text-(--text-primary)"
            >
              {t("navHire")}
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="mailto:sarunlapsuk@gmail.com"
              aria-label={t("footerEmailCta")}
              onClick={() => track("footer_email_click")}
              className="inline-flex items-center justify-center rounded-full border border-(--border-subtle) px-4 py-1.5 text-xs md:text-sm text-(--text-secondary) transition-colors hover:bg-(--border-subtle) hover:text-(--text-primary)"
            >
              {t("footerEmailCta")}
            </a>
            <a
              href="https://line.me/ti/p/~sarunut"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footerLineCta")}
              onClick={() => track("footer_line_click")}
              className="inline-flex items-center justify-center rounded-full border border-(--border-subtle) px-4 py-1.5 text-xs md:text-sm text-(--text-secondary) transition-colors hover:bg-(--border-subtle) hover:text-(--text-primary)"
            >
              {t("footerLineCta")}
            </a>
          </div>
        </div>
        <div className="space-y-2 text-sm md:text-base">
          <p className="text-(--text-primary)">{t("footerInstagramLabel")}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link
              href="https://www.instagram.com/sarun.pics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--text-secondary) underline underline-offset-4 hover:text-(--text-primary)"
            >
              @sarun.pics
            </Link>
            <Link
              href="https://www.instagram.com/_sarunnutto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--text-secondary) underline underline-offset-4 hover:text-(--text-primary)"
            >
              @_sarunnutto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
