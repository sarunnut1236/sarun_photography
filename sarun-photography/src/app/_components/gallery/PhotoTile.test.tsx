import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PhotoTile from "./PhotoTile";

const cloudinarySrc = "https://res.cloudinary.com/demo/image/upload/sample.jpg";

describe("PhotoTile", () => {
  it("renders description and image alt for appearance", () => {
    render(
      <PhotoTile
        src={cloudinarySrc}
        alt="Portrait in Bangkok"
        description="Golden hour portrait session"
      />,
    );

    expect(screen.getByText("Golden hour portrait session")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Portrait in Bangkok" })).toBeInTheDocument();
  });

  it("uses layout classes on the tile wrapper", () => {
    const { container } = render(
      <PhotoTile src={cloudinarySrc} alt="Alt text" description="Caption" />,
    );

    const tile = container.firstChild as HTMLElement;
    expect(tile).toHaveClass("aspect-square", "rounded-xl");
  });

  it("prevents context menu and drag on protected media", () => {
    const { container } = render(
      <PhotoTile src={cloudinarySrc} alt="Alt text" description="Caption" />,
    );

    const tile = container.firstChild as HTMLElement;

    const contextEvent = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    tile.dispatchEvent(contextEvent);
    expect(contextEvent.defaultPrevented).toBe(true);

    const dragEvent = new DragEvent("dragstart", { bubbles: true, cancelable: true });
    tile.dispatchEvent(dragEvent);
    expect(dragEvent.defaultPrevented).toBe(true);
  });

  it("does not render image when src is not Cloudinary", () => {
    const { container } = render(
      <PhotoTile src="/local.jpg" alt="Local" description="No cloud" />,
    );
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByText("No cloud")).toBeInTheDocument();
  });
});
