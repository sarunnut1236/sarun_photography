import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HeroSection from "../_components/sections/HeroSection";
import PortraitPreviewSection from "../_components/sections/PortraitPreviewSection";
import LandscapePreviewSection from "../_components/sections/LandscapePreviewSection";
import HomeIntroSection from "../_components/sections/HomeIntroSection";
import CallToActionBanner from "../_components/sections/CallToActionBanner";
import { buildPageMetadata, resolveLanguage } from "../_lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("home", resolveLanguage(locale), "/");
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-10 md:py-16">
      <HeroSection />
      <HomeIntroSection />
      <PortraitPreviewSection />
      <LandscapePreviewSection />
      <CallToActionBanner />
    </div>
  );
}
