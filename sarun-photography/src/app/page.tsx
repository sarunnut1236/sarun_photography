import HeroSection from "./_components/sections/HeroSection";
import PortraitPreviewSection from "./_components/sections/PortraitPreviewSection";
import LandscapePreviewSection from "./_components/sections/LandscapePreviewSection";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-10 md:py-16">
      <HeroSection />
      <PortraitPreviewSection />
      <LandscapePreviewSection />
    </div>
  );
}
