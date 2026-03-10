"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ColorMode = "light" | "dark";

interface ColorModeContextValue {
  mode: ColorMode;
  toggleMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

const COLOR_MODE_STORAGE_KEY = "sarun-color-mode";

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ColorMode>("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        setMode(stored);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setMode("dark");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next: ColorMode = prev === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      mode,
      toggleMode,
    }),
    [mode, toggleMode],
  );

  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>;
}

export function useColorMode(): ColorModeContextValue {
  const ctx = useContext(ColorModeContext);
  if (!ctx) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return ctx;
}
