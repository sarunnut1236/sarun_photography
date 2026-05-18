import type { Metadata } from "next";
import LandscapeGalleryGrid from "../_components/sections/LandscapeGalleryGrid";
import JsonLd, { landscapeGalleryJsonLd } from "../_components/seo/JsonLd";
import { buildPageMetadata, resolveLanguage } from "../_lib/seo";

type PageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return buildPageMetadata("landscape", resolveLanguage(params.lang), "/landscape");
}

export default function LandscapePage() {
  return (
    <>
      <JsonLd data={landscapeGalleryJsonLd()} />
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        <LandscapeGalleryGrid />
      </div>
    </>
  );
}
