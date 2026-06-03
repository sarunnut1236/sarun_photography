import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LandscapeGalleryGrid from "../../app/_components/sections/LandscapeGalleryGrid";
import { renderWithProviders } from "../test-utils";

// Mirrors the UI of app/[locale]/landscape/page.tsx
describe("Landscape page", () => {
  it("renders the gallery heading and intro", () => {
    renderWithProviders(<LandscapeGalleryGrid />, { pathname: "/landscape" });

    expect(
      screen.getByRole("heading", { level: 1, name: "Landscape Moments" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/If I were to define my style/)).toBeInTheDocument();
  });

  it("renders a heading for every landscape theme", () => {
    renderWithProviders(<LandscapeGalleryGrid />, { pathname: "/landscape" });

    for (const theme of [
      "Cityscape",
      "Landscape",
      "Nature",
      "Stars",
      "Sky",
      "Architecture",
      "Minimalism",
    ]) {
      expect(screen.getByRole("heading", { name: theme })).toBeInTheDocument();
    }
  });

  it("renders Thai theme titles and intro when locale is th", () => {
    renderWithProviders(<LandscapeGalleryGrid />, { lang: "th", pathname: "/landscape" });

    expect(screen.getByText(/ถ้าให้นิยามว่าตัวเองเป็นช่างภาพสายไหน/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ภาพซิตี้สเคป" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ภาพมินิมอล" })).toBeInTheDocument();
  });
});
