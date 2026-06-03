"use client";

import { useColorMode } from "../../_providers/color-mode-context";

export default function DarkModeToggleButton() {
  const { mode, toggleMode } = useColorMode();

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--border-subtle) text-xs md:text-sm transition-colors hover:bg-(--border-subtle)"
    >
      {mode === "light" ? "☾" : "☀︎"}
    </button>
  );
}
