"use client";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { type Project } from "@/lib/content";
import { useLang } from "@/components/lang-provider";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";

/**
 * Two equal columns, one crop for every capture, so the section reads as a
 * set instead of a layout exercise. With an odd count the last plate runs the
 * full measure with the image beside the text, at the same image size as the
 * rest, so the grid closes flush instead of leaving a hole.
 */
function Entry({
  project,
  plate,
  wide,
  viewSite,
  openSite,
}: {
  project: Project;
  plate: string;
  wide: boolean;
  viewSite: string;
  openSite: string;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col ${
        wide ? "lg:grid lg:grid-cols-2 lg:gap-x-10" : ""
      }`}
    >
      <ParallaxImage
        src={project.image}
        alt={project.imageAlt}
        ratio="aspect-[16/10]"
        sizes="(max-width: 1024px) 100vw, 44vw"
        objectPosition="top"
      />

      <div className={`mt-5 flex flex-1 flex-col ${wide ? "lg:mt-0 lg:justify-between" : ""}`}>
        <div
          className={`border-t border-border pt-5 ${wide ? "lg:border-t-0 lg:pt-0" : ""}`}
        >
          <p className="folio-caps flex items-baseline gap-3">
            {/* The one place rust is allowed on this page. */}
            <span className="text-plate">{plate}</span>
            <span className="text-faint">
              {project.kind} · {project.year}
            </span>
          </p>
          <h3 className="display-sm mt-3 text-[1.625rem]">
            <span className="transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </span>
          </h3>
          <p className="mt-4 line-clamp-4 text-[1.0625rem] leading-[1.7] lg:line-clamp-5">
            {project.summary}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          {/* Spacing separates the tags. A run of middle dots reads as noise. */}
          <ul className="folio flex flex-wrap gap-x-6 gap-y-1 text-muted">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {project.copyright && (
            <span className="folio-caps inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-accent">
              {project.copyright}
            </span>
          )}
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
  const count = t.projects.length;

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

      <div className="mt-16 grid gap-x-10 gap-y-16 lg:grid-cols-2 lg:gap-y-20">
        {t.projects.map((project, i) => {
          const wide = count % 2 === 1 && i === count - 1;
          return (
            <Reveal
              key={project.slug}
              delay={0.05}
              className={`h-full ${wide ? "lg:col-span-2" : ""}`}
            >
              <Entry
                project={project}
                plate={`${t.plate} ${String(i + 1).padStart(2, "0")}`}
                wide={wide}
                viewSite={t.hero.viewSite}
                openSite={t.hero.openSite}
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
