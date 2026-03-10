import type { ReadonlyURLSearchParams } from "next/navigation";

export function buildLocalizedHref(
  path: string,
  searchParams: ReadonlyURLSearchParams | null,
  lang: "en" | "th",
) {
  const current = new URLSearchParams(searchParams ? searchParams.toString() : "");
  current.set("lang", lang);
  const query = current.toString();
  return query ? `${path}?${query}` : path;
}
