"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type ParallaxImageProps = {
  /** Imported image, so Next has the intrinsic size and a blur placeholder. */
  src: StaticImageData;
  alt: string;
  /** Aspect-ratio utility for the frame, e.g. "aspect-[16/10]". */
  ratio: string;
  sizes: string;
  priority?: boolean;
  /** Drift in percent of frame height, each direction. */
  amount?: number;
  /**
   * Where the crop anchors. Screenshots want "top": the nav and the headline
   * are the part that identifies the product, and the dead space is always at
   * the bottom of the capture.
   */
  objectPosition?: "center" | "top";
  className?: string;
};

/**
 * Image that drifts inside a fixed frame as the frame crosses the viewport.
 * The inner layer is scaled up so the drift never exposes an empty edge.
 */
export function ParallaxImage({
  src,
  alt,
  ratio,
  sizes,
  priority,
  amount = 10,
  objectPosition = "center",
  className = "",
}: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-amount}%`, `${amount}%`]);
  const scale = 1 + (amount * 2) / 100 + 0.04;

  return (
    <div
      ref={frame}
      className={`overflow-hidden rounded-surface border border-border-strong bg-surface ${ratio} ${className}`}
    >
      <motion.div
        style={reduce ? undefined : { y }}
        className="h-full w-full will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          priority={priority}
          placeholder="blur"
          sizes={sizes}
          style={{ transform: `scale(${scale})`, objectPosition }}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
