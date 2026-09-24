import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/legal-doc";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Terms for using rafiakem.tech: acceptable use, intellectual property, liability, and governing law.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <LegalDoc kind="terms" />
      <SiteFooter />
    </>
  );
}
