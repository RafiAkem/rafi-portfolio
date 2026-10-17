"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { profile } from "@/lib/content";
import { useLang } from "@/components/lang-provider";
import { HalftoneField } from "@/components/halftone-field";

const EASE = [0.16, 1, 0.3, 1] as const;

/** How long each product holds the preview. */
const CYCLE_MS = 4200;

/**
 * Editorial hero. The type states the claim, the index proves it with the
 * products that are running right now.
 *
 * Four motion jobs, each with a reason:
 *   1. Headline lines rise out of a mask, so the sentence is read in order.
 *   2. A second ink plate sits out of register behind the headline and pulls
 *      into register on load. Two-colour printing is the whole conceit of the
 *      page, so the page shows itself being printed.
 *   3. The preview is wiped in from the bottom like a fresh sheet laid over
 *      the last one, on a timer, so every product gets seen without asking
 *      the visitor to click anything. A hairline under the active row is the
 *      timer made visible.
 *   4. Hovering or focusing a row takes over the preview and holds it.
 *
 * Everything collapses to a still first product under prefers-reduced-motion.
 */
export function Hero() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const projects = t.projects;
  // The two dictionaries keep their project arrays the same length, but if
  // they ever drift `index` can point past the shorter one. Fall back to the
  // first project instead of crashing the tree on a dead reference.
  const active = projects[index] ?? projects[0];

  // A timeout keyed on the index (not an interval) so the progress hairline
  // and the swap always start from the same moment, including after a hover
  // has moved the index by hand.
  useEffect(() => {
    if (reduce || paused || projects.length < 2) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % projects.length),
      CYCLE_MS,
    );
    return () => window.clearTimeout(id);
  }, [reduce, paused, index, projects.length]);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const indexY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  function take(i: number) {
    setIndex(i);
    setPaused(true);
  }

  return (
    <section
      ref={section}
      id="konten"
      className="relative isolate overflow-hidden"
    >
      {/* Desktop only. On a phone the type fills the full width, so the screen
          would sit under the words instead of beside them, and the work would
          be spent on the device least able to afford it. */}
      <HalftoneField className="absolute inset-0 -z-10 hidden h-full w-full lg:block" />

      <div className="mx-auto flex min-h-[calc(100dvh-3.75rem)] max-w-[1360px] flex-col justify-center px-5 pt-10 pb-16 sm:px-10 lg:pt-14 lg:pb-20">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <motion.div
            style={reduce ? undefined : { y: copyY }}
            className="lg:col-span-7"
          >
            {/* The cap is the largest size at which both lines still hold on
                one line inside a seven column measure. */}
            <h1 className="display text-[clamp(1.75rem,4.5vw,3.5rem)]">
              {t.headlineLines.map((line, i) => {
                const words = line.map((segment, j) => (
                  <span key={j} className={segment.italic ? "italic" : undefined}>
                    {segment.text}
                  </span>
                ));

                return (
                  // The mask clips descenders, and Bodoni's italic swings well
                  // below the baseline, so the row reserves that space back.
                  <span
                    key={i}
                    className="block overflow-hidden pb-[0.2em] [margin-bottom:-0.2em]"
                  >
                    <motion.span
                      className="relative block"
                      initial={reduce ? false : { y: "112%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1, delay: 0.06 + i * 0.1, ease: EASE }}
                    >
                      {/* The second ink plate, out of register. It offsets up
                          and to the left on purpose: down and to the right is
                          where a drop shadow goes, and this is not one. */}
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 text-accent"
                        initial={
                          reduce ? false : { x: -13, y: -10, opacity: 0.55 }
                        }
                        animate={{ x: -2, y: -1.5, opacity: 0.1 }}
                        transition={{
                          duration: 1.5,
                          delay: 0.5 + i * 0.1,
                          ease: EASE,
                        }}
                      >
                        {words}
                      </motion.span>
                      <span className="relative">{words}</span>
                    </motion.span>
                  </span>
                );
              })}
            </h1>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.44, ease: EASE }}
              className="mt-10 grid gap-x-10 gap-y-5 border-t border-border pt-6 sm:grid-cols-[auto_1fr]"
            >
              <p className="folio-caps whitespace-nowrap text-faint">
                {t.role}
              </p>
              {/* Body copy is ink, not grey. Setting every paragraph in a muted
                  tone is a web habit that reads as unfinished on paper. */}
              <p className="measure-tight text-[1.0625rem] leading-[1.7]">
                {t.subheadline}
              </p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.54, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <a
                href="#proyek"
                className="folio-caps bg-accent px-6 py-3.5 whitespace-nowrap text-on-accent transition-colors duration-200 hover:bg-accent-hover"
              >
                {t.hero.viewProjects}
              </a>
              <a
                href={profile.cvUrl[lang]}
                className="folio-caps inline-flex items-center gap-2 border border-border-strong px-6 py-3.5 whitespace-nowrap transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <DownloadSimple size={13} weight="regular" aria-hidden />
                {t.hero.downloadCv}
              </a>
              <a
                href="#kontak"
                className="folio-caps inline-flex items-center gap-2 border-b border-border-strong pb-1 whitespace-nowrap transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {t.contactMe}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.36, ease: EASE }}
            className="lg:col-span-5"
          >
            <motion.div
              style={reduce ? undefined : { y: indexY }}
              onPointerLeave={() => setPaused(false)}
              onBlurCapture={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
              }}
            >
              {/* Preview. Each new sheet wipes up from the bottom edge over the
                  last one, which stays put underneath until it is covered. */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-surface border border-border-strong bg-surface-raised">
                <AnimatePresence initial={!reduce}>
                  <motion.a
                    key={active.slug}
                    href={active.live}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={-1}
                    aria-hidden
                    className="absolute inset-0 block"
                    initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    // Nearly-still exit: it only exists to keep the old sheet
                    // mounted until the new one has finished covering it.
                    exit={{ opacity: 0.99, transition: { duration: 0.9 } }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    <motion.div
                      className="h-full w-full"
                      initial={reduce ? false : { scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.4, ease: EASE }}
                    >
                      <Image
                        src={active.image}
                        alt=""
                        priority={index === 0}
                        placeholder="blur"
                        sizes="(max-width: 1024px) 90vw, 40vw"
                        className="h-full w-full object-cover object-top"
                      />
                    </motion.div>
                  </motion.a>
                </AnimatePresence>
              </div>

              <ul className="mt-6 border-t border-border">
                {projects.map((project, i) => {
                  const isActive = i === index;

                  return (
                    <li key={project.slug} className="relative border-b border-border">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title}, ${project.kind}. ${t.hero.openSite}.`}
                        onPointerEnter={(e) => {
                          if (e.pointerType === "mouse") take(i);
                        }}
                        onFocus={() => take(i)}
                        className="group flex items-baseline gap-4 py-3.5"
                      >
                        <span
                          className={`folio w-6 shrink-0 transition-colors duration-300 ${
                            isActive ? "text-accent" : "text-faint"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`display-sm text-[1.25rem] transition-[color,transform] duration-300 ease-out ${
                            isActive
                              ? "translate-x-1 text-text"
                              : "text-muted group-hover:text-text"
                          }`}
                        >
                          {project.title}
                        </span>
                        <span className="folio-caps ml-auto hidden truncate text-faint sm:inline">
                          {project.kind}
                        </span>
                        <ArrowUpRight
                          size={12}
                          weight="bold"
                          aria-hidden
                          className={`shrink-0 self-center transition-all duration-300 ${
                            isActive
                              ? "translate-x-0 text-accent opacity-100"
                              : "-translate-x-1 opacity-0"
                          }`}
                        />
                      </a>

                      {/* The timer made visible. Fills while this row holds the
                          preview; sits full while a hover is holding it. */}
                      {isActive && !reduce && (
                        <motion.span
                          key={`${project.slug}-${paused}`}
                          aria-hidden
                          className="absolute -bottom-px left-0 h-px w-full origin-left bg-accent"
                          initial={{ scaleX: paused ? 1 : 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: paused ? 0 : CYCLE_MS / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
