import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroSection from "../../app/_components/sections/HeroSection";
import HomeIntroSection from "../../app/_components/sections/HomeIntroSection";
import PortraitPreviewSection from "../../app/_components/sections/PortraitPreviewSection";
import LandscapePreviewSection from "../../app/_components/sections/LandscapePreviewSection";
import CallToActionBanner from "../../app/_components/sections/CallToActionBanner";
import { renderWithProviders } from "../test-utils";

// Mirrors the section composition of app/[locale]/page.tsx
function HomePage() {
  return (
    <div>
      <HeroSection />
      <HomeIntroSection />
      <PortraitPreviewSection />
      <LandscapePreviewSection />
      <CallToActionBanner />
    </div>
  );
}

describe("Home page", () => {
  it("renders the hero with the English headline and image", () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "I don't know how to use a brush, so I'll draw my art using photons",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "I don't know how to use a brush, so I'll draw my art using photons",
      }),
    ).toBeInTheDocument();
  });

  it("renders all home sections with their headings", () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole("heading", { name: "Gear I shoot with" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Portrait Sessions" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Landscape Moments" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "If you like my style, hire me plsss 🥺" }),
    ).toBeInTheDocument();
  });

  it("links each preview section to its localized destination", () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole("link", { name: "Find more portraits" })).toHaveAttribute(
      "href",
      "/en/portrait",
    );
    expect(screen.getByRole("link", { name: "Find more landscapes" })).toHaveAttribute(
      "href",
      "/en/landscape",
    );
    expect(screen.getByRole("link", { name: "Book a session now" })).toHaveAttribute(
      "href",
      "/en/hire",
    );
  });

  it("renders Thai content and Thai-prefixed links when locale is th", () => {
    renderWithProviders(<HomePage />, { lang: "th" });

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "ผมใช้พู่กันไม่เป็น เพราะฉะนั้นผมจะวาดภาพด้วยโฟตอน",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ดูภาพบุคคลเพิ่มเติม" })).toHaveAttribute(
      "href",
      "/th/portrait",
    );
  });
});
