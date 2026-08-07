"use client";

import { useLang } from "@/components/lang-provider";

/** Skip link, rendered inside LangProvider so its label follows the language. */
export function SkipLink() {
  const { t } = useLang();

  return (
    <a
      href="#konten"
      className="folio-caps sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
    >
      {t.skipLink}
    </a>
  );
}
