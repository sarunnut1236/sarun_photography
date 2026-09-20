import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";
import { buildImageAwareRuntimeCaching } from "./_lib/pwa-next-image-runtime-cache";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

/**
 * Do not precache gallery Cloudinary URLs — they populate on first view within maxEntries.
 * Image CacheFirst policy lives in `_lib/pwa-next-image-runtime-cache.ts` (unit-tested).
 */
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: buildImageAwareRuntimeCaching(defaultCache),
});

serwist.addEventListeners();
