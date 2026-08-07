"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { useLang } from "@/components/lang-provider";

/**
 * Flips the .dark class on <html> and remembers the choice. The pre-paint
 * script in layout.tsx applies the stored value before hydration, so the
 * first render never flashes the wrong theme.
 */
export function ThemeToggle() {
  const { lang, t } = useLang();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private mode. The class still flips for this session.
    }
    setIsDark(next);
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
