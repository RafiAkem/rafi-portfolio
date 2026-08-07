"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { profile } from "@/lib/content";
import { useLang } from "@/components/lang-provider";
import { HalftoneField } from "@/components/halftone-field";

const EASE = [0.16, 1, 0.3, 1] as const;

/** How long each project holds the top of the pile. */
const CYCLE_MS = 4800;

/**
 * Resting transform per depth slot, front first. The plates hinge on their
 * left edge, so moving between slots reads as a page turning rather than a
 * card sliding.
 */
const SLOTS = [
  { x: 0, y: 0, rotate: 0, rotateY: 0 },
  { x: 16, y: -13, rotate: 1.2, rotateY: -7 },
  { x: 32, y: -26, rotate: 2.4, rotateY: -13 },
] as const;

/**
 * Editorial hero. The type states the claim, the plates prove it with the
 * three products that are running right now.
 *
 * Five motion jobs, each with a reason:
 *   1. Headline lines rise out of a mask, so the sentence is read in order.
 *   2. A second ink plate sits out of register behind the headline and pulls
 *      into register on load. Two-colour printing is the whole conceit of the
 *      page, so the page shows itself being printed.
 *   3. The plates arrive after the sentence lands, in reading order.
 *   4. The top plate turns to the back of the pile on a timer, so all three
 *      get seen without asking the visitor to click anything.
 *   5. Pointer tilt, the halftone screen and scroll drift separate the plate
 *      layer from the type layer, which is what gives flat paper depth.
 *
 * Everything collapses to one static plate and a still screen under
 * prefers-reduced-motion.
 */
export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const projects = t.projects;
  const active = projects[index];

  useEffect(() => {
    if (reduce || paused || projects.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % projects.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  // Pointer tilt lives on motion values so it never re-renders the tree.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.6 };
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), spring);
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), spring);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width - 0.5);
    pointerY.set((event.clientY - box.top) / box.height - 0.5);
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
            <motion.div style={reduce ? undefined : { y: plateY }}>
              {/* Reserve the room the stacked plates offset into. */}
              <div
                className="mx-auto w-full max-w-[540px] pt-9 pr-9 lg:max-w-none"
                style={{ perspective: 1600 }}
                onPointerMove={handlePointerMove}
                onPointerLeave={() => {
                  pointerX.set(0);
                  pointerY.set(0);
                  setPaused(false);
                }}
                onPointerEnter={() => setPaused(true)}
                onFocusCapture={() => setPaused(true)}
                onBlurCapture={() => setPaused(false)}
              >
                <motion.div
                  style={
                    reduce
                      ? undefined
                      : {
                          rotateX: tiltX,
                          rotateY: tiltY,
                          transformStyle: "preserve-3d",
                        }
                  }
                  className="relative aspect-[16/10] w-full"
                >
                  {projects.map((project, i) => {
                    const slot = (i - index + projects.length) % projects.length;
                    const rest = SLOTS[Math.min(slot, SLOTS.length - 1)];
                    const isFront = slot === 0;

                    return (
                      <motion.div
                        key={project.slug}
                        className="absolute inset-0"
                        style={{
                          zIndex: projects.length - slot,
                          transformOrigin: "left center",
                        }}
                        animate={
                          reduce
                            ? {
                                x: 0,
                                y: 0,
                                rotate: 0,
                                rotateY: 0,
                                opacity: isFront ? 1 : 0,
                              }
                            : { ...rest, opacity: 1 }
                        }
                        // Quick enough that the pile has resettled by the time
                        // the caption below has finished swapping.
                        transition={{
                          type: "spring",
                          stiffness: 230,
                          damping: 27,
                          mass: 0.8,
                        }}
                      >
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title}, ${project.kind}. ${t.hero.openSite}.`}
                          aria-hidden={!isFront}
                          tabIndex={isFront ? 0 : -1}
                          className={`block h-full w-full overflow-hidden rounded-surface border border-border-strong bg-surface-raised transition-transform duration-300 ${
                            isFront ? "hover:-translate-y-1.5" : "pointer-events-none"
                          }`}
                        >
                          <Image
                            src={project.image}
                            alt={project.imageAlt}
                            priority={i === 0}
                            placeholder="blur"
                            sizes="(max-width: 1024px) 90vw, 40vw"
                            className="h-full w-full object-cover object-top"
                          />
                        </a>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Caption for the plate above. The link itself carries the same
                  text for assistive tech, so this echo is hidden from it. */}
              {/* Echo visual dari link card. Dijadikan link nyata (pointer/mobile
                  tap target), tapi di-sembunyikan dari keyboard + screen reader
                  (tabIndex=-1 + aria-hidden) karena link card udah bawa
                  aria-label yang sama. */}
              <a
                href={active.live}
                target="_blank"
                rel="noreferrer"
                aria-hidden
                tabIndex={-1}
                className="folio-caps mt-5 flex items-baseline gap-3 border-t border-border pt-3 pr-9 text-faint transition-colors duration-300 hover:text-accent"
              >
                <motion.span
                  key={active.slug}
                  initial={reduce ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex min-w-0 items-baseline gap-3"
                >
                  <span className="text-text">{active.title}</span>
                  <span className="truncate">{active.kind}</span>
                </motion.span>
                <span className="ml-auto inline-flex shrink-0 items-center gap-1 whitespace-nowrap">
                  {t.hero.viewSite}
                  <ArrowUpRight size={11} weight="bold" />
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
