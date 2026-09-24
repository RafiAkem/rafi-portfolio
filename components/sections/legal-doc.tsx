"use client";

import { useLang } from "@/components/lang-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/lib/content";

/**
 * Renders /privacy and /terms from the shared legal copy in lib/legal.ts.
 *
 * The running head is a reduced form of SiteNav. The homepage nav points at
 * in-page anchors that do not exist on these pages, so this carries its own bar
 * with a link back to the home page instead of a nav that would do nothing.
 *
 * No scroll animation here on purpose: a document someone is reading line by
 * line should not fade in under them.
 */
export function LegalDoc({ kind }: { kind: "privacy" | "terms" }) {
  const { lang, setLang, t } = useLang();
  const doc = t.legal[kind];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-[60px] max-w-[1360px] items-center justify-between gap-6 px-5 sm:px-10">
          <a href="/" className="text-[1.0625rem] whitespace-nowrap">
            {profile.name}
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="folio-caps hidden border border-border-strong px-4 py-2 whitespace-nowrap transition-colors duration-200 hover:border-accent hover:text-accent sm:inline-flex"
            >
              {t.legal.backHome}
            </a>
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "id" : "en")}
              aria-label={
                lang === "en" ? "Switch to Indonesian" : "Ganti ke bahasa Inggris"
              }
              className="folio-caps grid h-8 min-w-8 place-items-center border border-border-strong px-2 text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              {lang === "en" ? "ID" : "EN"}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="konten" className="mx-auto max-w-[1360px] px-5 py-20 sm:px-10 lg:py-28">
        <article>
          <p className="folio-caps text-faint">{doc.updated}</p>
          <h1 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
            {doc.title}
          </h1>
          <p className="measure mt-6 text-[1.125rem] leading-[1.75] text-muted">
            {doc.standfirst}
          </p>

          {/* Sections run as a ruled list, one clause block per row. The
              heading sits in the left column and the prose in the right, the
              same 12-column split the About section uses. */}
          <div className="mt-16 border-t border-border">
            {doc.sections.map((section, i) => (
              <section
                key={section.heading}
                className="border-b border-border py-10 lg:grid lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-4">
                  <p className="folio text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="display-sm mt-2">{section.heading}</h2>
                </div>

                <div className="mt-5 lg:col-span-7 lg:col-start-6 lg:mt-0">
                  {section.paragraphs ? (
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 24)}
                          className="measure text-[1.0625rem] leading-[1.75]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets ? (
                    <ul
                      className={`measure list-disc space-y-3 pl-5 marker:text-faint ${
                        section.paragraphs ? "mt-4" : ""
                      }`}
                    >
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet.slice(0, 24)}
                          className="pl-1 text-[1.0625rem] leading-[1.75]"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
