import Image from "next/image";
import { about, profile } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section
      id="tentang"
      className="mx-auto max-w-[1360px] px-5 py-24 sm:px-10 lg:py-36"
    >
      <Reveal>
        {/* Section headings sit a step below the hero. A section head set
            larger than the page's own headline inverts the hierarchy. */}
        <h2 className="display border-b border-border pb-6 text-[clamp(1.625rem,3.4vw,2.75rem)]">
          {about.heading}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          {/* Real photo, kept small rather than stretched, because the source
              is a 460px avatar and a blown-up portrait would read as soft. */}
          <figure className="max-w-[300px]">
            <Image
              src={profile.portrait}
              alt={profile.portraitAlt}
              placeholder="blur"
              sizes="(max-width: 1024px) 55vw, 300px"
              className="aspect-square w-full rounded-surface border border-border-strong object-cover"
            />
            <figcaption className="folio mt-3 border-t border-border pt-3 text-muted">
              {profile.name}
              <br />
              {profile.city}
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <div className="space-y-6">
              {about.paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={`measure text-[1.125rem] leading-[1.75] ${
                    i === 0 ? "dropcap" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="folio mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 text-muted">
              {about.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
