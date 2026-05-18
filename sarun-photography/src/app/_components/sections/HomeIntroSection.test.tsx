import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../test/test-utils";
import HomeIntroSection from "./HomeIntroSection";

describe("HomeIntroSection", () => {
  it("renders intro copy and hire CTA", () => {
    renderWithProviders(<HomeIntroSection />);

    expect(screen.getByRole("heading", { name: "Portrait photographer in Bangkok" })).toBeInTheDocument();
    expect(screen.getByText(/graduation, university, and lifestyle portraits/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a session" })).toHaveAttribute("href", "/hire?lang=en");
  });
});
