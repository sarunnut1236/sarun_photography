import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PortraitGallerySection from "../../_components/sections/PortraitGallerySection";
import JsonLd, { portraitGalleryJsonLd } from "../../_components/seo/JsonLd";
import { buildPageMetadata, resolveLanguage } from "../../_lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("portrait", resolveLanguage(locale), "/portrait");
}

export default async function PortraitPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={portraitGalleryJsonLd()} />
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        <PortraitGallerySection />
      </div>
    </>
  );
}
