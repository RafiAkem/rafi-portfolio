import type { Metadata, Viewport } from "next";
import { Geist_Mono, Newsreader } from "next/font/google";
import { en, profile } from "@/lib/content";
import { LangProvider } from "@/components/lang-provider";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";

/**
 * One serif, one mono.
 *
 * Newsreader carries both the display and the body. It has a real optical
 * size axis, so the headline is set at opsz 72 weight 300 and the body at
 * opsz 16 weight 400: the contrast comes from the axes rather than from a
 * second face, which is both sharper typographically and one fewer woff2 to
 * download. It is deliberately not Bodoni Moda, Playfair, Fraunces or
 * Instrument Serif, the faces every editorial page reaches for first.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Everything that gets scanned instead of read: folios, dates, tags, controls. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// URL absolut untuk kartu Open Graph dan JSON-LD. Root domain, bukan sub.
const SITE_URL = "https://rafiakem.tech";

// Metadata is served once at build time and defaults to English; the on-page
// copy switches live through LangProvider.
const TITLE = `${profile.name} - ${en.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s - ${profile.name}` },
  description: en.metaDescription,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "Rafi Ikhsanul Hakim",
    "fullstack developer Bandung",
    "frontend developer Indonesia",
    "web developer Bandung",
    "Next.js developer",
    "React developer",
    "Laravel developer",
    "TypeScript",
    "AI developer Indonesia",
    "AI-powered systems",
    "web apps",
    "AI learning products",
    "Informatics Universitas Pasundan",
    "web developer portfolio",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: en.metaDescription,
    url: SITE_URL,
    siteName: profile.name,
    type: "profile",
    firstName: "Rafi Ikhsanul",
    lastName: "Hakim",
    username: profile.handle,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: en.metaDescription,
    creator: `@${profile.handle}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#14130f" },
  ],
};

/** Structured data, so search results can show the person rather than a page. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  jobTitle: en.role,
  description: en.metaDescription,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  image: `${SITE_URL}${profile.portraitPath}`,
  sameAs: [profile.github, profile.linkedin, profile.blog],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bandung",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universitas Pasundan" },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Laravel",
    "PostgreSQL",
    "pgvector",
    "Retrieval Augmented Generation",
    "Frontend Development",
  ],
  knowsLanguage: ["en", "id"],
};

/**
 * Runs before first paint so a dark-mode visitor never sees a white flash.
 * Reads the saved choice first, falls back to the system preference.
 */
const themeInit = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${newsreader.variable} ${geistMono.variable}`}>
        <LangProvider>
          <SkipLink />
          {children}
        </LangProvider>
        {/*
          Chatbot MangRAG "Asisten Rafi Akem" — menjawab pertanyaan pengunjung
          dari knowledge base portofolio (profil, proyek, skill, CV).
        */}
        <script
          src="https://mangrag.vercel.app/widget.js"
          data-bot="8e03c797-6d12-4dc1-b41d-f2dec4c3f27a"
          data-key="bot-d77c803b-6a1d-43ff-8790-a1b397d4289f"
          async
        />
      </body>
    </html>
  );
}
