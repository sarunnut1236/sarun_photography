/**
 * Tunable PWA Cache Storage knobs for `/_next/image` (device-side).
 * Bump CACHE_NAME version (v1 → v2) to flush old image caches on clients.
 */
export const NEXT_IMAGE_CACHE_NAME = "next-image-v1";

/** Max cached `/_next/image?...` variants (one photo can use several `w=` slots). */
export const NEXT_IMAGE_MAX_ENTRIES = 120;

/** 14 days; ExpirationPlugin uses maxAgeFrom: "last-used". */
export const NEXT_IMAGE_MAX_AGE_SECONDS = 14 * 24 * 60 * 60;
