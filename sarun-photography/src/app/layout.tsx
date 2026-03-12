import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import MuiThemeProvider from "./_providers/mui-theme-provider";
import { ColorModeProvider } from "./_providers/color-mode-context";
import { LanguageProvider } from "./_providers/language-context";
import { copy } from "./_content/copy";
import SiteHeader from "./_components/layout/SiteHeader";
import SiteFooter from "./_components/layout/SiteFooter";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Sarun Photography",
  description: "Portrait and landscape photography portfolio based in Bangkok.",
};

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
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
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
