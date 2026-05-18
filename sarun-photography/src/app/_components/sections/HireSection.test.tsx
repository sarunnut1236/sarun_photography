import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../test/test-utils";
import HireSection from "./HireSection";

describe("HireSection", () => {
  it("renders title, packages, and contact links", () => {
    renderWithProviders(<HireSection />, { pathname: "/hire" });

    expect(
      screen.getByRole("heading", { level: 1, name: "Book a portrait session in Bangkok" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Half day" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Full day" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View portrait portfolio" })).toHaveAttribute(
      "href",
      "/portrait?lang=en",
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:sarunlapsuk@gmail.com",
    );
    expect(screen.getByRole("link", { name: "LINE" })).toHaveAttribute(
      "href",
      "https://line.me/ti/p/~sarunut",
    );
  });
});
