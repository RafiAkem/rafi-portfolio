"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { useLang } from "@/components/lang-provider";

/**
 * Flips the .dark class on <html> and remembers the choice.
 *
 * The switch runs through the View Transitions API when the browser has it:
 * the old theme is snapshotted, the class flips, and the browser crossfades
 * the two frames (0.3s, keyed in globals.css). Older browsers, and users
 * under prefers-reduced-motion, get an instant flip.
 */
export function ThemeToggle() {
  const { lang } = useLang();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function apply(next: boolean) {
    // flushSync pins the class flip and the icon swap inside the view
    // transition snapshot; without it the new frame can be captured
    // before React has re-rendered.
    flushSync(() => {
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        // Private mode. The class still flips for this session.
      }
      setIsDark(next);
    });
  }

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduce) {
      doc.startViewTransition(() => apply(next));
    } else {
      apply(next);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "en" ? "Toggle light or dark theme" : "Ganti tema terang atau gelap"}
      aria-pressed={isDark}
      className="grid size-8 place-items-center border border-border-strong text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      {isDark ? (
        <Sun size={15} weight="regular" aria-hidden />
      ) : (
        <Moon size={15} weight="regular" aria-hidden />
      )}
    </button>
  );
}