import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../test/test-utils";
import PortraitPreviewSection from "./PortraitPreviewSection";

describe("PortraitPreviewSection", () => {
  it("renders section title and CTA link to portrait page", () => {
    renderWithProviders(<PortraitPreviewSection />);

    expect(screen.getByRole("heading", { name: "Portrait Sessions" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Find more portraits" })).toHaveAttribute(
      "href",
      "/portrait?lang=en",
    );
  });

  it("shows preview album titles from content", () => {
    renderWithProviders(<PortraitPreviewSection />);

    expect(screen.getAllByText("City wander").length).toBeGreaterThan(0);
    expect(screen.getAllByText("University shots").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Graduation photoshoot").length).toBeGreaterThan(0);
  });
});
