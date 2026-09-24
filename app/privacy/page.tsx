import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/legal-doc";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What rafiakem.tech collects, how it is used, who processes it, and how to ask for its deletion.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <LegalDoc kind="privacy" />
      <SiteFooter />
    </>
  );
}
