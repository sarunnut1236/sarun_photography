"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLanguage } from "../../_providers/language-context";
import { useColorMode } from "../../_providers/color-mode-context";
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

function DarkModeToggle() {
  const { mode, toggleMode } = useColorMode();

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--border-subtle) text-xs md:text-sm transition-colors hover:bg-(--border-subtle)"
    >
      {mode === "light" ? "☾" : "☀︎"}
    </button>
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
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href={buildLocalizedHref("/", searchParams, language)}>
          <span className="text-sm font-semibold tracking-tight md:text-lg">{t("siteTitle")}</span>
        </Link>
        <nav className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:justify-end md:gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {links.map((link) => (
              <NavLink
                key={link.path}
                href={link.href}
                label={link.label}
                isActive={pathname === link.path}
              />
            ))}
          </div>
          <LanguageSwitcher />
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}
