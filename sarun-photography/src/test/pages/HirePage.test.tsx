import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HireSection from "../../app/_components/sections/HireSection";
import { renderWithProviders } from "../test-utils";

// Mirrors the UI of app/[locale]/hire/page.tsx
describe("Hire page", () => {
  it("renders the title, intro, and both packages with rates", () => {
    renderWithProviders(<HireSection />, { pathname: "/hire" });

    expect(
      screen.getByRole("heading", { level: 1, name: "Book a portrait session" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Value pack" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Full pack" })).toBeInTheDocument();
    expect(screen.getByText("Half day: 1500 THB")).toBeInTheDocument();
    expect(screen.getByText("Full day: 2000 THB")).toBeInTheDocument();
  });

  it("lists the session types", () => {
    renderWithProviders(<HireSection />, { pathname: "/hire" });

    expect(screen.getByRole("heading", { name: "Session types" })).toBeInTheDocument();
    expect(
      screen.getByText("Lifestyle portrait sessions around Bangkok"),
    ).toBeInTheDocument();
    expect(screen.getByText("Casual campus photo walks")).toBeInTheDocument();
  });

  it("renders booking contact links and portfolio link", () => {
    renderWithProviders(<HireSection />, { pathname: "/hire" });

    expect(screen.getByRole("link", { name: "View portrait portfolio" })).toHaveAttribute(
      "href",
      "/en/portrait",
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:sarunlapsuk@gmail.com",
    );
    const line = screen.getByRole("link", { name: "LINE" });
    expect(line).toHaveAttribute("href", "https://line.me/ti/p/~sarunut");
    expect(line).toHaveAttribute("target", "_blank");
  });

  it("renders the FAQ as a description list with all questions and answers", () => {
    renderWithProviders(<HireSection />, { pathname: "/hire" });

    expect(screen.getByRole("heading", { name: "FAQ" })).toBeInTheDocument();
    expect(screen.getByText("Do you shoot outside Bangkok?")).toBeInTheDocument();
    expect(screen.getByText("How far in advance should I book?")).toBeInTheDocument();
    expect(screen.getByText("Indoor or outdoor?")).toBeInTheDocument();
  });

  it("renders Thai copy when locale is th", () => {
    renderWithProviders(<HireSection />, { lang: "th", pathname: "/hire" });

    expect(screen.getByRole("heading", { level: 1, name: "จองถ่ายภาพ" })).toBeInTheDocument();
    expect(screen.getByText("ครึ่งวัน: 1500 บาท")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "คำถามที่พบบ่อย" })).toBeInTheDocument();
  });
});
