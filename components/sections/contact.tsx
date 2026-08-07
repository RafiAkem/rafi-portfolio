"use client";

import { GithubLogo, LinkedinLogo, NotePencil } from "@phosphor-icons/react/dist/ssr";
import { profile, socials } from "@/lib/content";
import { useLang } from "@/components/lang-provider";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";

const ICONS = {
  GitHub: GithubLogo,
  LinkedIn: LinkedinLogo,
  Blog: NotePencil,
} as const;

export function Contact() {
  const { t } = useLang();

  return (
    <section id="kontak" className="border-t border-border py-24 lg:py-36">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <Reveal>
          <h2 className="display border-b border-border pb-6 text-[clamp(1.625rem,3.4vw,2.75rem)]">
            {t.contact.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="measure-tight text-[1.125rem] leading-[1.75]">
              {t.contact.body}
            </p>

            <dl className="mt-12 space-y-6">
              <div>
                <dt className="folio-caps text-faint">{t.contact.emailLabel}</dt>
                <dd className="mt-1.5 text-[1.0625rem]">
                  <a
                    href={`mailto:${profile.email}`}
                    className="border-b border-border-strong pb-0.5 transition-colors hover:border-accent hover:text-accent"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="folio-caps text-faint">{t.contact.locationLabel}</dt>
                <dd className="mt-1.5 text-[1.0625rem]">{t.city}</dd>
              </div>
            </dl>

            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5">
              {socials.map((social) => {
                const Icon = ICONS[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="folio inline-flex items-center gap-2 text-muted transition-colors duration-200 hover:text-accent"
                    >
                      <Icon size={13} weight="regular" aria-hidden />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
