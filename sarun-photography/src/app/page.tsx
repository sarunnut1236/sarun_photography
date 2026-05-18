import type { Metadata } from "next";
import HeroSection from "./_components/sections/HeroSection";
import PortraitPreviewSection from "./_components/sections/PortraitPreviewSection";
import LandscapePreviewSection from "./_components/sections/LandscapePreviewSection";
import HomeIntroSection from "./_components/sections/HomeIntroSection";
import CallToActionBanner from "./_components/sections/CallToActionBanner";
import { buildPageMetadata, resolveLanguage } from "./_lib/seo";

type PageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return buildPageMetadata("home", resolveLanguage(params.lang), "/");
}

export default function Home() {
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
