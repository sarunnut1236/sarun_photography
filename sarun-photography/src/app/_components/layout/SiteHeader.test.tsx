import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../test/test-utils";
import SiteHeader from "./SiteHeader";

describe("SiteHeader", () => {
  it("renders site title and navigation labels", () => {
    renderWithProviders(<SiteHeader />, { withColorMode: true });

    expect(screen.getByText("Sarun Photography")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Portrait" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Landscape" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Hire me" })).toBeInTheDocument();
  });

  it("prefixes the active locale on every nav link", () => {
    renderWithProviders(<SiteHeader />, { withColorMode: true });

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "Portrait" })).toHaveAttribute("href", "/en/portrait");
    expect(screen.getByRole("link", { name: "Landscape" })).toHaveAttribute(
      "href",
      "/en/landscape",
    );
    expect(screen.getByRole("link", { name: "Hire me" })).toHaveAttribute("href", "/en/hire");
  });

  it("marks the nav link for the current path as active", () => {
    renderWithProviders(<SiteHeader />, { withColorMode: true, pathname: "/portrait" });

    expect(screen.getByRole("link", { name: "Portrait" })).toHaveClass("text-(--text-primary)");
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("text-(--text-secondary)");
  });

  it("renders Thai labels and Thai-prefixed links when locale is th", () => {
    renderWithProviders(<SiteHeader />, { withColorMode: true, lang: "th" });

    expect(screen.getByText("ซารัน โฟโตกราฟฟี")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "หน้าแรก" })).toHaveAttribute("href", "/th");
    expect(screen.getByRole("link", { name: "จ้างถ่าย" })).toHaveAttribute("href", "/th/hire");
  });

  it("marks the active locale and links to the other locale", () => {
    renderWithProviders(<SiteHeader />, { withColorMode: true });

    const en = screen.getByRole("link", { name: "EN" });
    const th = screen.getByRole("link", { name: "TH" });

    expect(en).toHaveAttribute("aria-current", "true");
    expect(th).not.toHaveAttribute("aria-current");
    expect(th).toHaveAttribute("href", "/th");
  });

  it("links to the English variant of the current path when locale is th", () => {
    renderWithProviders(<SiteHeader />, { withColorMode: true, lang: "th", pathname: "/portrait" });

    const th = screen.getByRole("link", { name: "TH" });
    const en = screen.getByRole("link", { name: "EN" });

    expect(th).toHaveAttribute("aria-current", "true");
    expect(en).not.toHaveAttribute("aria-current");
    expect(en).toHaveAttribute("href", "/en/portrait");
  });

  it("toggles dark mode via the theme button", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />, { withColorMode: true });

    const toggle = await screen.findByRole("button", { name: "Switch to dark mode" });
    await user.click(toggle);

    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("persists the chosen color mode to localStorage", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />, { withColorMode: true });

    const toggle = await screen.findByRole("button", { name: "Switch to dark mode" });
    await user.click(toggle);

    expect(window.localStorage.getItem("sarun-color-mode")).toBe("dark");
  });
});
