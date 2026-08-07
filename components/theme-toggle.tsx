"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { useLang } from "@/components/lang-provider";

/**
 * Flips the .dark class on <html> and remembers the choice.
 *
 * For the 250ms of the flip, <html> carries "theme-anim" (keyed in
 * globals.css), which makes every background, text and border color ease
 * between palettes instead of snapping. The class is then removed so the
 * transition cost is paid only while the switch is happening.
 */
export function ThemeToggle() {
  const { lang } = useLang();
  const [isDark, setIsDark] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function apply(next: boolean) {
    const root = document.documentElement;
    root.classList.add("theme-anim");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private mode. The class still flips for this session.
    }
    setIsDark(next);
    // Keep the easing class alive for one transition (slightly longer than
    // the 450ms CSS duration so a rapid double-click cannot cut it short).
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => root.classList.remove("theme-anim"), 500);
  }

  function toggle() {
    apply(!document.documentElement.classList.contains("dark"));
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