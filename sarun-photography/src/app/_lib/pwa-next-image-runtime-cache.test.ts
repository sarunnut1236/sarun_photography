import { describe, expect, it } from "vitest";
import type { RuntimeCaching } from "serwist";
import { CacheFirst, NetworkOnly, StaleWhileRevalidate } from "serwist";
import {
  buildImageAwareRuntimeCaching,
  createNextImageMatcher,
  createNextImageRuntimeCaching,
  isDefaultNextImageRule,
  nextImageCachePolicy,
} from "./pwa-next-image-runtime-cache";
import {
  NEXT_IMAGE_CACHE_NAME,
  NEXT_IMAGE_MAX_AGE_SECONDS,
  NEXT_IMAGE_MAX_ENTRIES,
} from "./pwa-image-cache";

describe("nextImageCachePolicy", () => {
  it("locks CacheFirst strategy for /_next/image (not SWR, not raw Cloudinary)", () => {
    expect(nextImageCachePolicy.strategy).toBe("CacheFirst");
    expect(nextImageCachePolicy.cacheName).toBe(NEXT_IMAGE_CACHE_NAME);
    expect(nextImageCachePolicy.expiration).toEqual({
      maxEntries: NEXT_IMAGE_MAX_ENTRIES,
      maxAgeSeconds: NEXT_IMAGE_MAX_AGE_SECONDS,
      maxAgeFrom: "last-used",
    });
    expect(nextImageCachePolicy.matcherSource).toBe(String.raw`\/_next\/image\?url=.+$`);
    expect(nextImageCachePolicy.matcherFlags).toBe("i");
  });
});

describe("createNextImageMatcher", () => {
  const matcher = createNextImageMatcher();

  it("matches optimized next/image request URLs", () => {
    expect(
      matcher.test(
        "/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdkjleico2%2Fimage%2Fupload%2Fv1%2Fphoto.jpg&w=640&q=75",
      ),
    ).toBe(true);
    expect(matcher.test("/_next/image?url=https%3A%2F%2Fexample.com%2Fa.png&w=384")).toBe(true);
  });

  it("does not match raw Cloudinary or unrelated paths", () => {
    expect(matcher.test("https://res.cloudinary.com/dkjleico2/image/upload/v1/photo.jpg")).toBe(
      false,
    );
    expect(matcher.test("/_next/static/chunks/main.js")).toBe(false);
    expect(matcher.test("/api/hello")).toBe(false);
    expect(matcher.test("/_next/image")).toBe(false);
  });
});

describe("createNextImageRuntimeCaching", () => {
  it("uses CacheFirst handler (not StaleWhileRevalidate)", () => {
    const rule = createNextImageRuntimeCaching();
    expect(rule.handler).toBeInstanceOf(CacheFirst);
    expect(rule.handler).not.toBeInstanceOf(StaleWhileRevalidate);
  });

  it("uses the locked matcher regex", () => {
    const rule = createNextImageRuntimeCaching();
    expect(rule.matcher).toBeInstanceOf(RegExp);
    expect((rule.matcher as RegExp).source).toBe(nextImageCachePolicy.matcherSource);
    expect((rule.matcher as RegExp).flags).toContain("i");
  });
});

describe("isDefaultNextImageRule", () => {
  it("detects Serwist default /_next/image regex rules", () => {
    expect(
      isDefaultNextImageRule({
        matcher: /\/_next\/image\?url=.+$/i,
        handler: new StaleWhileRevalidate({ cacheName: "next-image" }),
      }),
    ).toBe(true);
  });

  it("ignores non-image or non-regex matchers", () => {
    expect(
      isDefaultNextImageRule({
        matcher: /\/_next\/static.+\.js$/i,
        handler: new NetworkOnly(),
      }),
    ).toBe(false);
    expect(
      isDefaultNextImageRule({
        matcher: ({ request }) => request.destination === "image",
        handler: new NetworkOnly(),
      }),
    ).toBe(false);
  });
});

describe("buildImageAwareRuntimeCaching", () => {
  it("places custom next/image CacheFirst first and strips default next/image rule", () => {
    const defaultNextImage: RuntimeCaching = {
      matcher: /\/_next\/image\?url=.+$/i,
      handler: new StaleWhileRevalidate({ cacheName: "next-image" }),
    };
    const other: RuntimeCaching = {
      matcher: /\/_next\/static.+\.js$/i,
      handler: new NetworkOnly(),
    };

    const runtime = buildImageAwareRuntimeCaching([defaultNextImage, other]);

    expect(runtime).toHaveLength(2);
    expect(runtime[0]?.handler).toBeInstanceOf(CacheFirst);
    expect(runtime[1]).toBe(other);
    expect(runtime.some((entry) => entry === defaultNextImage)).toBe(false);
  });

  it("still prepends custom rule when defaultCache has no next/image entry", () => {
    const other: RuntimeCaching = {
      matcher: /\/api\//,
      handler: new NetworkOnly(),
    };
    const runtime = buildImageAwareRuntimeCaching([other]);
    expect(runtime).toHaveLength(2);
    expect(runtime[0]?.handler).toBeInstanceOf(CacheFirst);
    expect(runtime[1]).toBe(other);
  });
});
