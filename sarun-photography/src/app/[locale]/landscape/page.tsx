import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import LandscapeGalleryGrid from "../../_components/sections/LandscapeGalleryGrid";
import JsonLd, { landscapeGalleryJsonLd } from "../../_components/seo/JsonLd";
import { buildPageMetadata, resolveLanguage } from "../../_lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("landscape", resolveLanguage(locale), "/landscape");
}

export default async function LandscapePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={landscapeGalleryJsonLd()} />
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        <LandscapeGalleryGrid />
      </div>
    </>
  );
}
