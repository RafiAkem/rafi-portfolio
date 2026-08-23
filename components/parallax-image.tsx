"use client";

import Image, { type StaticImageData } from "next/image";

type StaticImageProps = {
  /** Imported image, so Next has the intrinsic size and a blur placeholder. */
  src: StaticImageData;
  alt: string;
  /** Aspect-ratio utility for the frame, e.g. "aspect-[16/10]". */
  ratio: string;
  sizes: string;
  priority?: boolean;
  /**
   * Where the crop anchors. Screenshots want "top": the nav and the headline
   * are the part that identifies the product, and the dead space is always at
   * the bottom of the capture.
   */
  objectPosition?: "center" | "top";
  className?: string;
};

/** Fixed-frame project image, no scroll-based drift. */
export function ParallaxImage({
  src,
  alt,
  ratio,
  sizes,
  priority,
  objectPosition = "center",
  className = "",
}: StaticImageProps) {
  return (
    <div
      className={`overflow-hidden rounded-surface border border-border-strong bg-surface ${ratio} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        placeholder="blur"
        sizes={sizes}
        style={{ objectPosition }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
