import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PortraitGallerySection from "../../app/_components/sections/PortraitGallerySection";
import { renderWithProviders } from "../test-utils";

// Mirrors the UI of app/[locale]/portrait/page.tsx
describe("Portrait page", () => {
  it("renders the gallery heading", () => {
    renderWithProviders(<PortraitGallerySection />, { pathname: "/portrait" });

    expect(
      screen.getByRole("heading", { level: 1, name: "Portrait Sessions" }),
    ).toBeInTheDocument();
  });

  it("renders each album title and SEO description", () => {
    renderWithProviders(<PortraitGallerySection />, { pathname: "/portrait" });

    expect(screen.getByRole("heading", { name: "City wander" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "University shots" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Graduation photoshoot" })).toBeInTheDocument();
    expect(
      screen.getByText(/Bangkok street portrait session/),
    ).toBeInTheDocument();
  });

  it("renders Thai album titles when locale is th", () => {
    renderWithProviders(<PortraitGallerySection />, { lang: "th", pathname: "/portrait" });

    expect(screen.getByRole("heading", { name: "เที่ยวในเมือง" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ถ่ายรูปรับปริญญา" })).toBeInTheDocument();
  });
});
