"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type LanguageCode = "en" | "th";

type CopyRecord = Record<string, { en: string; th: string }>;

export interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANGUAGE_STORAGE_KEY = "sarun-language";

function resolveInitialLanguage(searchParams: URLSearchParams | null): LanguageCode {
  const fromQuery = searchParams?.get("lang");
  if (fromQuery === "en" || fromQuery === "th") {
    return fromQuery;
  }

  return "en";
}

export function LanguageProvider({
  copy,
  children,
}: {
  copy: CopyRecord;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [language, setLanguageState] = useState<LanguageCode>(() =>
    resolveInitialLanguage(searchParams),
  );

  useEffect(() => {
    if (!searchParams) return;

    const langParam = searchParams.get("lang");
    if (langParam === "en" || langParam === "th") {
      setLanguageState(langParam);
      return;
    }

    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === "en" || stored === "th") {
        setLanguageState(stored);
      }
    }
  }, [searchParams]);

  const setLanguage = useCallback(
    (lang: LanguageCode) => {
      setLanguageState(lang);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      }

      const current = new URLSearchParams(searchParams ? searchParams.toString() : "");
      current.set("lang", lang);
      const query = current.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url);
    },
    [pathname, router, searchParams],
  );

  const t = useCallback(
    (key: string) => {
      const entry = copy[key];
      if (!entry) return key;
      return entry[language] ?? entry.en ?? key;
    },
    [copy, language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
