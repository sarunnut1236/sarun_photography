import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../test/test-utils";
import CallToActionBanner from "./CallToActionBanner";

describe("CallToActionBanner", () => {
  it("renders CTA headline and link to hire page", () => {
    renderWithProviders(<CallToActionBanner />);

    expect(
      screen.getByRole("heading", { name: "If you like my style, hire me plsss 🥺" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a session now" })).toHaveAttribute(
      "href",
      "/en/hire",
    );
    expect(
      screen.getByRole("img", { name: "If you like my style, hire me plsss 🥺" }),
    ).toBeInTheDocument();
  });
});
