import Image from "next/image";
import { isCloudinarySrc, useCloudinary } from "../../_hooks/use-cloudinary";

interface PhotoTileProps {
  src: string;
  alt: string;
  description: string;
}

export default function PhotoTile({ src, alt, description }: PhotoTileProps) {
  const { isEnabled } = useCloudinary();
  const shouldShow = isEnabled && isCloudinarySrc(src);

  return (
    <div
      className="no-save-media group relative aspect-square overflow-hidden rounded-xl border border-transparent bg-(--bg) transition-transform duration-300 group-hover:scale-[1.02]"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {shouldShow && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 100vw"
          className="object-contain"
          draggable={false}
        />
      )}
      <div className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
        <div className="pointer-events-auto w-full px-3 pb-3 text-xs text-white">{description}</div>
      </div>
    </div>
  );
}
