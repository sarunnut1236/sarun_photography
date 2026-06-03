import { act, fireEvent, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { PortraitAlbum } from "../../_content/portrait-albums";
import { renderWithProviders } from "../../../test/test-utils";
import AlbumCarousel from "./AlbumCarousel";

const cloudinary = (id: string) =>
  `https://res.cloudinary.com/demo/image/upload/${id}.jpg`;

const mockAlbum: PortraitAlbum = {
  id: "test-album",
  title: { en: "City wander", th: "เที่ยวในเมือง" },
  seoDescription: {
    en: "Bangkok street portrait session.",
    th: "พอร์ตเทรตเดินเที่ยวในเมืองกรุงเทพฯ",
  },
  photos: [
    {
      id: "photo-1",
      src: cloudinary("photo-1"),
      alt: { en: "First portrait", th: "ภาพแรก" },
      description: { en: "First photo description", th: "คำอธิบายภาพแรก" },
    },
    {
      id: "photo-2",
      src: cloudinary("photo-2"),
      alt: { en: "Second portrait", th: "ภาพที่สอง" },
      description: { en: "Second photo description", th: "คำอธิบายภาพที่สอง" },
    },
  ],
};

function getCarouselRegion() {
  return screen.getByRole("region", { name: "City wander" });
}

describe("AlbumCarousel", () => {
  it("shows album title and active photo description", () => {
    renderWithProviders(<AlbumCarousel album={mockAlbum} autoplay={false} />);

    const region = getCarouselRegion();
    expect(region).toBeInTheDocument();
    expect(within(region).getByText("First photo description")).toBeInTheDocument();
    expect(within(region).getByRole("img", { name: "First portrait" })).toBeInTheDocument();
  });

  it("advances to the next photo when Next is clicked", () => {
    renderWithProviders(<AlbumCarousel album={mockAlbum} autoplay={false} />);

    const region = getCarouselRegion();
    const nextButtons = within(region).getAllByRole("button", { name: "Next photo" });
    fireEvent.click(nextButtons[nextButtons.length - 1]!);

    expect(within(region).getByText("Second photo description")).toBeInTheDocument();
    expect(within(region).getByRole("img", { name: "Second portrait" })).toBeInTheDocument();
  });

  it("advances slides on autoplay interval", () => {
    vi.useFakeTimers();
    try {
      renderWithProviders(<AlbumCarousel album={mockAlbum} autoplay intervalMs={3000} />);

      const region = getCarouselRegion();
      expect(within(region).getByText("First photo description")).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(within(region).getByText("Second photo description")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("jumps to a slide when a dot indicator is clicked", () => {
    renderWithProviders(<AlbumCarousel album={mockAlbum} autoplay={false} />);

    const region = getCarouselRegion();
    fireEvent.click(within(region).getByRole("button", { name: "Go to photo 2" }));

    expect(within(region).getByText("Second photo description")).toBeInTheDocument();
  });
});
