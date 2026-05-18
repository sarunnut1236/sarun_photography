import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../test/test-utils";
import SiteFooter from "./SiteFooter";

describe("SiteFooter", () => {
  it("shows location, availability, and rates in English", () => {
    renderWithProviders(<SiteFooter />);

    expect(screen.getByText("Based in Bangkok, Thailand")).toBeInTheDocument();
    expect(screen.getByText("Available for portrait sessions")).toBeInTheDocument();
    expect(screen.getByText(/Half day 1,500 THB/)).toBeInTheDocument();
    expect(screen.getByText(/Full day 2,000 THB/)).toBeInTheDocument();
  });

  it("links to email and LINE with correct hrefs", () => {
    renderWithProviders(<SiteFooter />);

    const email = screen.getByRole("link", { name: "Email" });
    expect(email).toHaveAttribute("href", "mailto:sarunlapsuk@gmail.com");

    const line = screen.getByRole("link", { name: "LINE" });
    expect(line).toHaveAttribute("href", "https://line.me/ti/p/~sarunut");
    expect(line).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows Instagram handles", () => {
    renderWithProviders(<SiteFooter />);

    expect(screen.getByRole("link", { name: "@sarun.pics" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/sarun.pics",
    );
    expect(screen.getByRole("link", { name: "@_sarunnutto" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/_sarunnutto",
    );
  });

  it("shows Thai copy when lang is th", () => {
    renderWithProviders(<SiteFooter />, { lang: "th" });

    expect(screen.getByText("รับงานที่กรุงเทพฯเป็นหลัก")).toBeInTheDocument();
    expect(screen.getByText(/ครึ่งวัน 1500 บาท/)).toBeInTheDocument();
  });
});
