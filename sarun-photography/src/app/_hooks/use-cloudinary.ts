"use client";

const CLOUDINARY_ENABLED =
  typeof process !== "undefined" && !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function useCloudinary() {
  return {
    isEnabled: CLOUDINARY_ENABLED,
  };
}

export function isCloudinarySrc(src: string | null | undefined): boolean {
  if (!src) return false;
  return src.startsWith("https://res.cloudinary.com/");
}
