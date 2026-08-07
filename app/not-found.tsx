"use client";

import Link from "next/link";
import { useLang } from "@/components/lang-provider";

export default function NotFound() {
  const { t } = useLang();

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[1360px] flex-col justify-center px-5 py-24 sm:px-10">
      <p className="folio-caps text-faint">404</p>
      <h1 className="display mt-5 max-w-[20ch] text-[clamp(1.875rem,4.8vw,3.75rem)]">
        {t.notFound.title}
      </h1>
      <p className="measure-tight mt-6 text-[1.125rem] leading-[1.75]">
        {t.notFound.body}
      </p>
      <Link
        href="/"
        className="folio-caps mt-10 self-start bg-accent px-6 py-3.5 whitespace-nowrap text-on-accent transition-colors duration-200 hover:bg-accent-hover"
      >
        {t.notFound.backHome}
      </Link>
    </main>
  );
}
