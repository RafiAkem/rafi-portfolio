"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

/**
 * Lenis drives the window scroll, so Motion's useScroll and every parallax
 * transform on the page stay in sync with it for free.
 *
 * Under prefers-reduced-motion Lenis never initialises: scrolling falls back
 * to the browser's own instant behaviour, which is the correct degradation.
 */
export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.1,
      // Lenis handles in-page anchors itself; CSS scroll-behavior stays off.
      anchors: { offset: -72 },
    });

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}
