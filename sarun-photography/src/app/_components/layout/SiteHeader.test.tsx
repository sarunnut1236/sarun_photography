import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { navigationState, renderWithProviders } from "../../../test/test-utils";
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

  it("includes lang query in localized nav links", () => {
    renderWithProviders(<SiteHeader />, { withColorMode: true });

    expect(screen.getByRole("link", { name: "Portrait" })).toHaveAttribute("href", "/portrait?lang=en");
  });

  it("marks EN as pressed by default and switches to TH on click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />, { withColorMode: true });

    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "TH" })).toHaveAttribute("aria-pressed", "false");

    await user.click(screen.getByRole("button", { name: "TH" }));

    expect(screen.getByRole("button", { name: "TH" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "false");
    expect(navigationState.replace).toHaveBeenCalled();
    expect(navigationState.searchParams).toContain("lang=th");
  });

  it("toggles dark mode via the theme button", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />, { withColorMode: true });

    const toggle = screen.getByRole("button", { name: "Switch to dark mode" });
    await user.click(toggle);

    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
});
