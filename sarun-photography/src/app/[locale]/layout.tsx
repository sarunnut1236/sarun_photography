import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { routing } from "@/i18n/routing";
import MuiThemeProvider from "../_providers/mui-theme-provider";
import { ColorModeProvider } from "../_providers/color-mode-context";
import SiteHeader from "../_components/layout/SiteHeader";
import SiteFooter from "../_components/layout/SiteFooter";
import JsonLd, { photographerJsonLd, websiteJsonLd } from "../_components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ColorModeInitScript from "../_components/theme/ColorModeInitScript";
import { rootMetadata } from "../_lib/seo";

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <ColorModeInitScript />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <JsonLd data={[websiteJsonLd(), photographerJsonLd()]} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MuiThemeProvider>
            <Suspense fallback={<div className="flex min-h-screen flex-col bg-(--bg)" />}>
              <ColorModeProvider>
                <Analytics />
                <SpeedInsights />
                <div className="flex min-h-screen flex-col bg-(--bg) text-(--text-primary)">
                  <SiteHeader />
                  <main className="flex-1">{children}</main>
                  <SiteFooter />
                </div>
              </ColorModeProvider>
            </Suspense>
          </MuiThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
