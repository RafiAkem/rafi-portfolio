"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, profile } from "@/lib/content";
import { ThemeToggle } from "./theme-toggle";

/**
 * Running head. A printed page carries the author across the top of every
 * spread in a thin ruled band, so this stays 60px and never becomes a bar.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[60px] max-w-[1360px] items-center justify-between gap-8 px-5 sm:px-10">
        <a href="#konten" className="text-[1.0625rem] whitespace-nowrap">
          {profile.name}
        </a>

        <nav aria-label="Utama" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="folio text-muted transition-colors duration-200 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#kontak"
            className="folio-caps hidden border border-border-strong px-4 py-2 whitespace-nowrap transition-colors duration-200 hover:border-accent hover:text-accent sm:inline-flex"
          >
            Hubungi saya
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-seluler"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="grid size-8 place-items-center border border-border-strong text-muted transition-colors duration-200 hover:text-accent lg:hidden"
          >
            {open ? (
              <X size={15} weight="regular" aria-hidden />
            ) : (
              <List size={15} weight="regular" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="menu-seluler"
            key="menu"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <nav
              aria-label="Menu seluler"
              className="mx-auto flex max-w-[1360px] flex-col px-5 sm:px-10"
            >
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="folio border-b border-border py-4 text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#kontak"
                onClick={() => setOpen(false)}
                className="folio-caps my-4 bg-accent px-4 py-3 text-center text-on-accent sm:hidden"
              >
                Hubungi saya
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
