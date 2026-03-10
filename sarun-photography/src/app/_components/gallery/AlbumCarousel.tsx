"use client";

import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { CldImage } from "next-cloudinary";
import { useLanguage } from "../../_providers/language-context";
import type { PortraitAlbum } from "../../_content/portrait-albums";
import { isCloudinarySrc, useCloudinary } from "../../_hooks/use-cloudinary";

interface AlbumCarouselProps {
  album: PortraitAlbum;
  autoplay?: boolean;
  intervalMs?: number;
  variant?: "preview" | "full";
}

export default function AlbumCarousel({
  album,
  autoplay = true,
  intervalMs = 5000,
  variant = "preview",
}: AlbumCarouselProps) {
  const { language } = useLanguage();
  const { isEnabled } = useCloudinary();
  const [index, setIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  const photos = album.photos;
  const active = photos[index] ?? photos[0];

  const shouldAutoplay = autoplay && !userInteracted;

  useEffect(() => {
    if (!shouldAutoplay || photos.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [shouldAutoplay, intervalMs, photos.length]);

  const goTo = (nextIndex: number) => {
    if (photos.length === 0) return;
    const wrapped = ((nextIndex % photos.length) + photos.length) % photos.length;
    setIndex(wrapped);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (!userInteracted) setUserInteracted(true);
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchCurrentX.current = touchStartX.current;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;
    touchCurrentX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchCurrentX.current == null) {
      touchStartX.current = null;
      touchCurrentX.current = null;
      return;
    }

    const deltaX = touchStartX.current - touchCurrentX.current;
    const threshold = 40;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        goTo(index + 1);
      } else {
        goTo(index - 1);
      }
    }

    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  const title = album.title[language] ?? album.title.en;
  const imageSrc =
    active && "cloudinaryId" in active && active.cloudinaryId ? active.cloudinaryId : active?.src;

  const hasMultiple = photos.length > 1;

  const prevPhoto = hasMultiple ? photos[(index - 1 + photos.length) % photos.length] : undefined;
  const nextPhoto = hasMultiple ? photos[(index + 1) % photos.length] : undefined;

  const prevImageSrc =
    prevPhoto && "cloudinaryId" in prevPhoto && prevPhoto.cloudinaryId
      ? prevPhoto.cloudinaryId
      : prevPhoto?.src;

  const nextImageSrc =
    nextPhoto && "cloudinaryId" in nextPhoto && nextPhoto.cloudinaryId
      ? nextPhoto.cloudinaryId
      : nextPhoto?.src;

  const showActive = isEnabled && isCloudinarySrc(imageSrc ?? null);
  const showPrev = isEnabled && isCloudinarySrc(prevImageSrc ?? null);
  const showNext = isEnabled && isCloudinarySrc(nextImageSrc ?? null);

  const activeSizes =
    variant === "full"
      ? "(min-width: 1024px) 720px, (min-width: 768px) 80vw, 100vw"
      : "(min-width: 1024px) 320px, (min-width: 768px) 33vw, 100vw";

  return (
    <section
      aria-label={title}
      role="region"
      aria-roledescription="carousel"
      className="flex justify-center"
    >
      <div
        className={`flex w-full flex-col align-center gap-3 ${
          variant === "full" ? "max-w-4xl" : ""
        }`}
      >
        <div
          className={`no-save-media relative overflow-hidden rounded-xl bg-(--bg) ${
            variant === "full" ? "aspect-3/4" : "aspect-4/5"
          } max-h-[calc(100vh-96px)] animate-fade-in`}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {variant === "full" && hasMultiple && prevPhoto && showPrev && (
            <div className="pointer-events-none absolute inset-y-8 left-0 hidden w-1/3 md:block">
              <div className="relative h-full w-full opacity-70">
                <CldImage
                  src={prevImageSrc as string}
                  alt=""
                  fill
                  sizes="240px"
                  className="object-cover"
                  aria-hidden="true"
                  draggable={false}
                />
              </div>
            </div>
          )}
          {variant === "full" && hasMultiple && nextPhoto && showNext && (
            <div className="pointer-events-none absolute inset-y-8 right-0 hidden w-1/3 md:block">
              <div className="relative h-full w-full opacity-70">
                <CldImage
                  src={nextImageSrc as string}
                  alt=""
                  fill
                  sizes="240px"
                  className="object-cover"
                  aria-hidden="true"
                  draggable={false}
                />
              </div>
            </div>
          )}
          {active && showActive && (
            <div
              className={`relative z-10 h-full cursor-pointer transition-opacity duration-500 ${
                variant === "full" ? "mx-auto w-4/5" : "w-full"
              }`}
              onClick={() => {
                if (!userInteracted) setUserInteracted(true);
                if (hasMultiple) goTo(index + 1);
              }}
              role="button"
              aria-label="Next photo"
            >
              <CldImage
                key={active.id}
                src={imageSrc as string}
                alt={active.alt[language] ?? active.alt.en}
                fill
                sizes={activeSizes}
                className="object-contain"
                draggable={false}
              />
            </div>
          )}
          {hasMultiple && (
            <div className="z-10 pointer-events-none absolute inset-0 flex items-center justify-between px-2">
              <button
                type="button"
                onClick={() => {
                  if (!userInteracted) setUserInteracted(true);
                  goTo(index - 1);
                }}
                className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-xs text-white backdrop-blur-sm"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!userInteracted) setUserInteracted(true);
                  goTo(index + 1);
                }}
                className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-xs text-white backdrop-blur-sm"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-(--text-secondary)">{title}</p>
          {active && (
            <p className="text-sm text-(--text-primary)">
              {active.description[language] ?? active.description.en}
            </p>
          )}
          {photos.length > 1 && (
            <div className="mt-1 flex gap-1">
              {photos.map((photo, i) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => {
                    if (!userInteracted) setUserInteracted(true);
                    goTo(i);
                  }}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i === index ? "bg-(--text-primary)" : "bg-(--border-subtle)"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
