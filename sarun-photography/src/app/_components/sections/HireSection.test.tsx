import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../test/test-utils";
import HireSection from "./HireSection";

describe("HireSection", () => {
  it("renders title, packages, and contact links", () => {
    renderWithProviders(<HireSection />, { pathname: "/hire" });

    expect(
      screen.getByRole("heading", { level: 1, name: "Book a portrait session" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Value pack" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Full pack" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View portrait portfolio" })).toHaveAttribute(
      "href",
      "/en/portrait",
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
