import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import MuiThemeProvider from "./_providers/mui-theme-provider";
import { ColorModeProvider } from "./_providers/color-mode-context";
import { LanguageProvider } from "./_providers/language-context";
import { copy } from "./_content/copy";
import SiteHeader from "./_components/layout/SiteHeader";
import SiteFooter from "./_components/layout/SiteFooter";
import JsonLd, { photographerJsonLd, websiteJsonLd } from "./_components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { rootMetadata } from "./_lib/seo";

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <JsonLd data={[websiteJsonLd(), photographerJsonLd()]} />
        <MuiThemeProvider>
          <ColorModeProvider>
            <Suspense fallback={<div className="flex min-h-screen flex-col bg-(--bg)" />}>
              <LanguageProvider copy={copy}>
                <Analytics />
                <SpeedInsights />
                <div className="flex min-h-screen flex-col bg-(--bg) text-(--text-primary)">
                  <SiteHeader />
                  <main className="flex-1">{children}</main>
                  <SiteFooter />
                </div>
              </LanguageProvider>
            </Suspense>
          </ColorModeProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
