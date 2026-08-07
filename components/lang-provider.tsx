"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { defaultLang, dictionaries, type Lang } from "@/lib/content";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof dictionaries)["en"];
};

const LangContext = createContext<LangContextValue | null>(null);

/**
 * Language switcher. English is the default; the choice is persisted so a
 * returning visitor keeps it. Reads the saved value once on mount to avoid a
 * flash of the wrong language.
 */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "id") setLangState(saved);
    } catch {
      /* storage unavailable; keep default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* storage unavailable; keep in-memory only */
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
