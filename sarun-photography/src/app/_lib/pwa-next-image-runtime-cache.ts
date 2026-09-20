import type { RuntimeCaching } from "serwist";
import { CacheFirst, ExpirationPlugin } from "serwist";
import {
  NEXT_IMAGE_CACHE_NAME,
  NEXT_IMAGE_MAX_AGE_SECONDS,
  NEXT_IMAGE_MAX_ENTRIES,
} from "./pwa-image-cache";

/**
 * Locked PWA policy for `/_next/image` device caching.
 * Unit tests pin these values so accidental drift fails CI.
 */
export const nextImageCachePolicy = {
  /** Matches optimized Next image URLs the browser requests (not raw Cloudinary). */
  matcherSource: String.raw`\/_next\/image\?url=.+$`,
  matcherFlags: "i",
  strategy: "CacheFirst" as const,
  cacheName: NEXT_IMAGE_CACHE_NAME,
  expiration: {
    maxEntries: NEXT_IMAGE_MAX_ENTRIES,
    maxAgeSeconds: NEXT_IMAGE_MAX_AGE_SECONDS,
    maxAgeFrom: "last-used" as const,
  },
};

export function createNextImageMatcher(): RegExp {
  return new RegExp(nextImageCachePolicy.matcherSource, nextImageCachePolicy.matcherFlags);
}

/**
 * CacheFirst for optimized next/image responses.
 * Must be first in runtimeCaching so it overrides Serwist defaultCache's SWR rule.
 */
export function createNextImageRuntimeCaching(): RuntimeCaching {
  return {
    matcher: createNextImageMatcher(),
    handler: new CacheFirst({
      cacheName: nextImageCachePolicy.cacheName,
      plugins: [new ExpirationPlugin({ ...nextImageCachePolicy.expiration })],
    }),
  };
}

export function isDefaultNextImageRule(entry: RuntimeCaching): boolean {
  const { matcher } = entry;
  return matcher instanceof RegExp && matcher.source.includes("_next\\/image");
}

/** Custom next/image rule first, then defaultCache without its stock /_next/image entry. */
export function buildImageAwareRuntimeCaching(defaultCache: RuntimeCaching[]): RuntimeCaching[] {
  return [
    createNextImageRuntimeCaching(),
    ...defaultCache.filter((entry) => !isDefaultNextImageRule(entry)),
  ];
}
