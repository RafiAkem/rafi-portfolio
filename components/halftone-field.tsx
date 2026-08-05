"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A printing screen, drawn in canvas 2D.
 *
 * Motivation: the page is set like a printed annual, and a halftone is what a
 * press actually leaves behind. The dots swell toward the cursor and breathe
 * on a slow wave, which turns the flat paper into a surface without adding a
 * single image request.
 *
 * Performance budget, in order of importance:
 *   - No WebGL and no library. This file is the whole effect.
 *   - Device pixel ratio is capped at 1.5. Retina gains nothing here because
 *     the dots are soft shapes, and uncapped DPR quadruples the fill cost.
 *   - Frames are throttled to ~30fps, which is invisible on a slow wave and
 *     halves the work.
 *   - An IntersectionObserver stops the loop the moment the hero leaves the
 *     viewport, so scrolling the rest of the page costs nothing.
 *   - Under prefers-reduced-motion it paints exactly one static frame.
 *   - fillRect, not arc. Square dots are letterpress anyway, and rects skip
 *     the path machinery entirely.
 */
export function HalftoneField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const GRID = 15; // css px between dot centres
    const MAX_DOT = 4.6;
    const POINTER_RADIUS = 190;
    const FRAME_MS = 1000 / 30;

    let width = 0;
    let height = 0;
    let dpr = 1;
    // Pointer starts off-canvas so the field is even until the cursor arrives.
    let pointerX = -9999;
    let pointerY = -9999;
    let frame = 0;
    let last = 0;
    let running = false;

    // Read the ink colour off the element so the field follows the theme
    // toggle instead of hard-coding a hex that only works in one mode.
    let ink = "23, 21, 15";
    function readInk() {
      const value = getComputedStyle(canvas!).color.match(/\d+/g);
      if (value && value.length >= 3) ink = value.slice(0, 3).join(", ");
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);

      const wave = time / 2600;
      const cols = Math.ceil(width / GRID);
      const rows = Math.ceil(height / GRID);

      for (let col = 0; col <= cols; col++) {
        const x = col * GRID;
        // Density ramps left to right and only begins past the middle, so the
        // type side of the hero stays clean paper and the plate side carries
        // the screen. Text never has to compete with it.
        const ramp = Math.min(1, Math.max(0, (x / width - 0.42) / 0.5));
        if (ramp <= 0) continue;

        for (let row = 0; row <= rows; row++) {
          const y = row * GRID;

          const breathe =
            0.5 + 0.5 * Math.sin(wave + col * 0.28 + row * 0.19);

          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const pull =
            distance < POINTER_RADIUS ? 1 - distance / POINTER_RADIUS : 0;

          const size = MAX_DOT * ramp * (0.34 + breathe * 0.3 + pull * pull * 0.9);
          if (size < 0.35) continue;

          ctx!.fillStyle = `rgba(${ink}, ${0.06 + ramp * 0.1 + pull * 0.24})`;
          ctx!.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
    }

    function loop(time: number) {
      frame = requestAnimationFrame(loop);
      if (time - last < FRAME_MS) return;
      last = time;
      draw(time);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const rect = canvas!.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
    }

    function handlePointerLeave() {
      pointerX = -9999;
      pointerY = -9999;
    }

    readInk();
    resize();
    draw(0);

    // Only run while the hero is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      readInk();
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    // The theme toggle swaps the ink colour, so repaint on class changes.
    const themeObserver = new MutationObserver(() => {
      readInk();
      draw(performance.now());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    function handleVisibility() {
      if (document.hidden) stop();
      else if (!reduce) start();
    }
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerLeave, { passive: true });

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerLeave);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      // `color` is read by the effect above to pick the ink.
      className={`pointer-events-none text-text ${className}`}
    />
  );
}
