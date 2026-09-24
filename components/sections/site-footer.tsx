"use client";

import { profile, socials } from "@/lib/content";
import { useLang } from "@/components/lang-provider";

export function SiteFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  // The legal pages are linked from here rather than from the running head:
  // the footer is on every page, and a privacy policy has to be reachable
  // from the home page.
  const legalLinks = [
    { label: t.legal.privacy.title, href: "/privacy" },
    { label: t.legal.terms.title, href: "/terms" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="folio mx-auto flex max-w-[1360px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p className="text-faint">
          {profile.name} · {year}
        </p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                className="text-muted transition-colors hover:text-accent"
              >
                {social.label}
              </a>
            </li>
          ))}
          {legalLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
