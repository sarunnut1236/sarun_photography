import { describe, expect, it } from "vitest";
import {
  NEXT_IMAGE_CACHE_NAME,
  NEXT_IMAGE_MAX_AGE_SECONDS,
  NEXT_IMAGE_MAX_ENTRIES,
} from "./pwa-image-cache";

describe("pwa-image-cache knobs", () => {
  it("locks Cache Storage name (bump version intentionally to flush clients)", () => {
    expect(NEXT_IMAGE_CACHE_NAME).toBe("next-image-v1");
  });

  it("locks maxEntries at 120", () => {
    expect(NEXT_IMAGE_MAX_ENTRIES).toBe(120);
  });

  it("locks maxAge to 14 days in seconds", () => {
    expect(NEXT_IMAGE_MAX_AGE_SECONDS).toBe(14 * 24 * 60 * 60);
    expect(NEXT_IMAGE_MAX_AGE_SECONDS).toBe(1_209_600);
  });
});
