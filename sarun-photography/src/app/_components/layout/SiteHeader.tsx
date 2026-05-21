"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";
import { useLanguage } from "../../_providers/language-context";
import { buildLocalizedHref } from "../../_lib/routing";

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`text-sm md:text-base transition-colors ${
        isActive ? "text-(--text-primary)" : "text-(--text-secondary) hover:text-(--text-primary)"
      }`}
    >
      {label}
    </Link>
  );
}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-(--border-subtle) px-2 py-1 text-xs md:text-sm">
      {(["en", "th"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            language === code
              ? "bg-(--text-primary) text-(--bg)"
              : "text-(--text-secondary) hover:text-(--text-primary)"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function SiteHeader() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const links = [
    { path: "/", label: t("navHome") },
    { path: "/portrait", label: t("navPortrait") },
    { path: "/landscape", label: t("navLandscape") },
    { path: "/hire", label: t("navHire") },
  ].map((link) => ({
    ...link,
    href: buildLocalizedHref(link.path, searchParams, language),
  }));

  return (
    <header className="sticky top-0 z-30 border-b border-(--border-subtle) bg-(--bg)/95 backdrop-blur">
      <div className="@container/header mx-auto max-w-5xl px-6 py-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href={buildLocalizedHref("/", searchParams, language)} className="shrink-0">
            <span className="text-sm font-semibold tracking-tight md:text-lg">{t("siteTitle")}</span>
          </Link>

          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-2 md:gap-x-5">
            <nav
              aria-label="Main"
              className="flex w-full flex-wrap items-center justify-end gap-x-4 gap-y-1 @[34rem]/header:w-auto md:gap-x-5"
            >
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.path}
                />
              ))}
            </nav>

            <div className="ml-auto flex basis-full items-center justify-end gap-2 @[34rem]/header:basis-auto">
              <LanguageSwitcher />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
