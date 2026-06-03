import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../test/test-utils";
import SiteFooter from "./SiteFooter";

describe("SiteFooter", () => {
  it("shows location, availability, and rates in English", () => {
    renderWithProviders(<SiteFooter />);

    expect(screen.getByText("Based in Bangkok, Thailand")).toBeInTheDocument();
    expect(screen.getByText("Available for portrait sessions")).toBeInTheDocument();
    expect(screen.getByText(/Half day: 1500 THB/)).toBeInTheDocument();
    expect(screen.getByText(/Full day: 2000 THB/)).toBeInTheDocument();
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

  it("links to the localized hire page", () => {
    renderWithProviders(<SiteFooter />);

    expect(screen.getByRole("link", { name: "Hire me" })).toHaveAttribute("href", "/en/hire");
  });

  it("exposes accessible labels on the contact buttons", () => {
    renderWithProviders(<SiteFooter />);

    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute("aria-label", "Email");
    expect(screen.getByRole("link", { name: "LINE" })).toHaveAttribute("aria-label", "LINE");
  });

  it("shows Thai copy and Thai-prefixed hire link when lang is th", () => {
    renderWithProviders(<SiteFooter />, { lang: "th" });

    expect(screen.getByText("รับงานที่กรุงเทพฯเป็นหลัก")).toBeInTheDocument();
    expect(screen.getByText(/ครึ่งวัน: 1500 บาท/)).toBeInTheDocument();
    expect(screen.getByText(/เต็มวัน: 2000 บาท/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "จ้างถ่าย" })).toHaveAttribute("href", "/th/hire");
  });
});
