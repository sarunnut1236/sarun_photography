import type { Metadata } from "next";
import PortraitGallerySection from "../_components/sections/PortraitGallerySection";
import JsonLd, { portraitGalleryJsonLd } from "../_components/seo/JsonLd";
import { buildPageMetadata, resolveLanguage } from "../_lib/seo";

type PageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return buildPageMetadata("portrait", resolveLanguage(params.lang), "/portrait");
}

export default function PortraitPage() {
  return (
    <>
      <JsonLd data={portraitGalleryJsonLd()} />
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        <PortraitGallerySection />
      </div>
    </>
  );
}
