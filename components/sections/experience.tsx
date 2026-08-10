"use client";

import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/lib/content";
import { useLang } from "@/components/lang-provider";
import { Reveal } from "@/components/reveal";

export function Experience() {
  const { t } = useLang();
  const credentials = [t.experience.education, t.experience.organization] as const;

  return (
    <section
      id="pengalaman"
      className="mx-auto max-w-[1360px] px-5 py-24 sm:px-10 lg:py-36"
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <h2 className="display text-[clamp(1.625rem,3.4vw,2.75rem)]">{t.experience.heading}</h2>
          <a
            href={profile.cvUrl}
            className="folio-caps inline-flex items-center gap-2 border border-border-strong px-4 py-2.5 whitespace-nowrap transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <DownloadSimple size={13} weight="regular" aria-hidden />
            {t.experience.downloadCv}
          </a>
        </div>
      </Reveal>

      {/* One hairline per year group, not per row. */}
      <div>
        {t.experience.groups.map((group, groupIndex) => (
          <Reveal key={group.year} delay={groupIndex * 0.06}>
            <div className="grid gap-6 border-b border-border py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
              <p className="folio-caps text-faint lg:col-span-2">{group.year}</p>

              <div className="space-y-12 lg:col-span-9 lg:col-start-4">
                {group.items.map((item) => (
                  <div key={`${item.role}-${item.org}`}>
                    <h3 className="display-sm text-[1.5rem] sm:text-[1.75rem]">
                      {item.role}
                    </h3>
                    <p className="folio mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="text-accent">{item.org}</span>
                      {"period" in item && item.period && (
                        <span className="text-faint">{item.period}</span>
                      )}
                    </p>
                    <p className="measure mt-4 text-[1.0625rem] leading-[1.7]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.06}>
        <div className="grid gap-10 pt-10 sm:grid-cols-2 sm:gap-10">
          {credentials.map((entry) => (
            <div key={entry.label}>
              <p className="folio-caps text-faint">{entry.label}</p>
              <p className="display-sm mt-3 text-[1.25rem]">{entry.school}</p>
              <p className="mt-1 text-[1.0625rem]">{entry.degree}</p>
              <p className="folio mt-4 text-faint">{entry.period}</p>
              <p className="mt-1 text-[0.9375rem] text-muted">{entry.note}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
