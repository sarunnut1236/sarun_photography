import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HireSection from "../../_components/sections/HireSection";
import { buildPageMetadata, resolveLanguage } from "../../_lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("hire", resolveLanguage(locale), "/hire");
}

export default async function HirePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">
      <HireSection />
    </div>
  );
}
