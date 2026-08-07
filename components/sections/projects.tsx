"use client";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { type Project } from "@/lib/content";
import { useLang } from "@/components/lang-provider";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";

/**
 * Four plates. The lead runs the full measure, then the pair below splits
 * seven and five and the narrow one drops a step, so the section reads as a
 * spread instead of a repeated row. The closing plate runs full measure again
 * so the newest product gets the same banner treatment as the lead.
 */
const LAYOUT = [
  {
    cell: "lg:col-span-12",
    // Wide band, anchored to the top of the capture, so the lead reads as the
    // product's own header rather than a slice out of its middle.
    ratio: "aspect-[21/9]",
    sizes: "(max-width: 1024px) 100vw, 88vw",
    lead: true,
  },
  {
    cell: "lg:col-span-7",
    ratio: "aspect-[16/10]",
    sizes: "(max-width: 1024px) 100vw, 52vw",
    lead: false,
  },
  {
    cell: "lg:col-span-5 lg:mt-20",
    ratio: "aspect-[16/10]",
    sizes: "(max-width: 1024px) 100vw, 36vw",
    lead: false,
  },
  {
    cell: "lg:col-span-12",
    ratio: "aspect-[21/9]",
    sizes: "(max-width: 1024px) 100vw, 88vw",
    lead: true,
  },
] as const;

function Entry({
  project,
  plate,
  ratio,
  sizes,
  lead,
  viewSite,
  openSite,
}: {
  project: Project;
  plate: string;
  ratio: string;
  sizes: string;
  lead: boolean;
  viewSite: string;
  openSite: string;
}) {
  return (
    <article className="group relative">
      <ParallaxImage
        src={project.image}
        alt={project.imageAlt}
        ratio={ratio}
        sizes={sizes}
        amount={4}
        objectPosition="top"
      />

      <div
        className={`mt-5 border-t border-border pt-5 ${
          lead ? "grid gap-6 md:grid-cols-12 md:gap-10" : ""
        }`}
      >
        <div className={lead ? "md:col-span-5" : ""}>
          <p className="folio-caps flex items-baseline gap-3">
            {/* The one place rust is allowed on this page. */}
            <span className="text-plate">{plate}</span>
            <span className="text-faint">
              {project.kind} · {project.year}
            </span>
          </p>
          <h3
            className={`display-sm mt-3 ${
              lead ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-[1.625rem]"
            }`}
          >
            <span className="transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </span>
          </h3>
        </div>

        <div className={lead ? "md:col-span-6 md:col-start-7" : "mt-5"}>
          <p className="measure text-[1.0625rem] leading-[1.7]">{project.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">
            {/* Spacing separates the tags. A run of middle dots reads as noise. */}
            <ul className="folio flex flex-wrap gap-x-6 gap-y-1 text-muted">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className="folio-caps ml-auto inline-flex items-center gap-1.5 transition-colors duration-300 group-hover:text-accent">
              {viewSite}
              <ArrowUpRight
                size={11}
                weight="bold"
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </div>

      {/* Seluruh card = satu link (stretched link). Target tap paling natural,
          terutama di mobile, adalah gambarnya — jadi seluruh area harus bisa
          dipencet, bukan cuma teksnya. */}
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        aria-label={`${openSite} ${project.title}`}
        className="absolute inset-0 z-10 rounded-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
    </article>
  );
}

export function Projects() {
  const { t } = useLang();

  return (
    <section id="proyek" className="mx-auto max-w-[1360px] px-5 py-24 sm:px-10 lg:py-36">
      <Reveal>
        <h2 className="display border-b border-border pb-6 text-[clamp(1.625rem,3.4vw,2.75rem)]">
          {t.projectsHeading}
        </h2>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="measure mt-8 text-[1.125rem] leading-[1.75]">{t.projectsIntro}</p>
      </Reveal>

      <div className="mt-20 grid items-start gap-x-10 gap-y-24 lg:grid-cols-12 lg:gap-y-28">
        {t.projects.map((project, i) => (
          <Reveal key={project.slug} delay={0.05} className={LAYOUT[i].cell}>
            <Entry
              project={project}
              plate={`${t.plate} ${String(i + 1).padStart(2, "0")}`}
              ratio={LAYOUT[i].ratio}
              sizes={LAYOUT[i].sizes}
              lead={LAYOUT[i].lead}
              viewSite={t.hero.viewSite}
              openSite={t.hero.openSite}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
