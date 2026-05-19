import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../test/test-utils";
import HomeIntroSection from "./HomeIntroSection";

describe("HomeIntroSection", () => {
  it("renders gear title and listed equipment", () => {
    renderWithProviders(<HomeIntroSection />);

    expect(screen.getByRole("heading", { name: "Gear I shoot with" })).toBeInTheDocument();
    expect(screen.getByText("Nikon D5600")).toBeInTheDocument();
    expect(screen.getByText("35mm lens")).toBeInTheDocument();
    expect(screen.getByText("Kit lens")).toBeInTheDocument();
    expect(screen.getByText("Telephoto lens")).toBeInTheDocument();
  });
});
