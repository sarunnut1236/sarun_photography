"use client";

import dynamic from "next/dynamic";

function DarkModeTogglePlaceholder() {
  return (
    <span
      aria-hidden
      className="inline-flex h-8 w-8 shrink-0 rounded-full border border-(--border-subtle)"
    />
  );
}

const DarkModeToggleButton = dynamic(() => import("./DarkModeToggleButton"), {
  ssr: false,
  loading: DarkModeTogglePlaceholder,
});

export default function DarkModeToggle() {
  return <DarkModeToggleButton />;
}
