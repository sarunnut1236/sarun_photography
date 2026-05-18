import type { Metadata } from "next";
import HireSection from "../_components/sections/HireSection";
import { buildPageMetadata, resolveLanguage } from "../_lib/seo";

type PageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return buildPageMetadata("hire", resolveLanguage(params.lang), "/hire");
}

export default function HirePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">
      <HireSection />
    </div>
  );
}
