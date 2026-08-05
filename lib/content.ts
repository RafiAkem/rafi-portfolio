import type { StaticImageData } from "next/image";

/**
 * Screenshots are imported rather than referenced by path so Next reads their
 * real intrinsic size at build time and generates a blur placeholder. Without
 * that, a lazily loaded shot shows an empty frame until it decodes.
 */
import mangmicroShot from "@/public/projects/mangmicro.webp";
import mangquizShot from "@/public/projects/mangquiz.webp";
import ramblingsShot from "@/public/projects/akem-ramblings.webp";
import portraitShot from "@/public/rafi.jpg";

/**
 * Every visible string and asset path on the site lives here.
 *
 * Sources of truth:
 *   - CV (Rafi Ikhsanul Hakim, resumeCV-1.pdf) for work history and education
 *   - github.com/RafiAkem for repos, avatar and blog link
 *   - The live products themselves for project copy and screenshots
 */

export type HeadlineSegment = { text: string; italic?: boolean };

/**
 * Hero headline, one array per line. Each line is a list of segments so a
 * single phrase can be emphasised without splitting the mask reveal.
 * Emphasis is the serif's own italic, not a colour change, which keeps the
 * accent doing one job on this page instead of two.
 * Declared outside `profile` so `as const` does not narrow `italic` away.
 */
const headlineLines: readonly (readonly HeadlineSegment[])[] = [
  [{ text: "Membangun aplikasi web" }],
  [{ text: "dan sistem " }, { text: "berbasis AI.", italic: true }],
];

export const profile = {
  name: "Rafi Ikhsanul Hakim",
  shortName: "Rafi",
  handle: "RafiAkem",
  role: "Fullstack Web & AI Developer",
  headlineLines,
  /** Hero standfirst. Leads with credentials, because that is what a reader
   *  scanning a portfolio for thirty seconds is actually looking for. */
  subheadline:
    "Mahasiswa Teknik Informatika Universitas Pasundan dengan pengalaman internship fullstack di PT Telkom Indonesia. Terbuka untuk peran dan proyek baru.",
  /**
   * Search and social description. Deliberately not the same string as the
   * standfirst: this one is written for a result page, so it front-loads the
   * role, the city and the stack instead of the personal framing.
   */
  metaDescription:
    "Fullstack web developer di Bandung. Membangun aplikasi web dan sistem berbasis AI dengan Next.js, TypeScript, dan Laravel. Eks-intern di PT Telkom Indonesia.",
  email: "yc66zio@gmail.com",
  city: "Bandung, Jawa Barat",
  blog: "https://akemramblings.dev",
  github: "https://github.com/RafiAkem",
  linkedin: "https://www.linkedin.com/in/rafi-ikhsanul-hakim/",
  /** Avatar pulled from the GitHub profile, so it stays a real photo. */
  portrait: portraitShot,
  /** Absolute-path form, for metadata and JSON-LD where a URL is required. */
  portraitPath: "/rafi.jpg",
  portraitAlt: "Potret Rafi Ikhsanul Hakim",
  cvUrl: "/cv-rafi-ikhsanul-hakim.pdf",
} as const;

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Blog", href: profile.blog },
] as const;

export const nav = [
  { label: "Tentang", href: "#tentang" },
  { label: "Proyek", href: "#proyek" },
  { label: "Pengalaman", href: "#pengalaman" },
  { label: "Kontak", href: "#kontak" },
] as const;

/**
 * Stack row. Slugs resolve against the Simple Icons CDN and are rendered as
 * CSS masks, so one element per logo picks up the current text color.
 */
export const stack = [
  { slug: "typescript", name: "TypeScript" },
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "react", name: "React" },
  { slug: "tailwindcss", name: "Tailwind CSS" },
  { slug: "laravel", name: "Laravel" },
  { slug: "postgresql", name: "PostgreSQL" },
  { slug: "supabase", name: "Supabase" },
  { slug: "drizzle", name: "Drizzle ORM" },
  { slug: "googlegemini", name: "Google Gemini" },
] as const;

export const about = {
  heading: "Tentang saya",
  paragraphs: [
    "Saya mengerjakan aplikasi web secara end-to-end: sistem internal perusahaan, situs dan panel operasional klien, sampai produk pembelajaran. Yang terakhir adalah yang paling lama saya tekuni. MangMicro dan MangQuiz berangkat dari satu masalah yang sama: materi kuliah terlalu panjang, sementara waktu untuk memahaminya terbatas.",
    "Fokus utama saya ada di frontend, terutama pada performa, keterbacaan, dan aksesibilitas keyboard. Di sisi backend saya terbiasa bekerja dengan Laravel, PostgreSQL, pgvector, dan pipeline model bahasa.",
  ],
  focus: [
    "Next.js App Router",
    "TypeScript",
    "Laravel & Inertia",
    "Postgres & pgvector",
    "Gemini API",
  ],
} as const;

export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  tags: readonly string[];
  year: string;
  /** Screenshot of the running product, captured from the live site. */
  image: StaticImageData;
  imageAlt: string;
  /** Live deployment. Every selected project has one. */
  live: string;
};

export const projects: readonly Project[] = [
  {
    slug: "mangmicro",
    title: "MangMicro",
    kind: "Microlearning berbasis AI",
    summary:
      "Mengubah satu dokumen kuliah menjadi enam format belajar: ringkasan, kuis, slide, mind map, audio, dan video bernarasi. Dirancang untuk menurunkan beban kognitif mahasiswa, bukan menambah satu aplikasi lagi.",
    tags: ["Next.js", "AI pipeline", "PostgreSQL"],
    year: "2026",
    image: mangmicroShot,
    imageAlt: "Halaman depan MangMicro dengan judul dan pratinjau produk",
    live: "https://mangmicro.web.id",
  },
  {
    slug: "mangquiz",
    title: "MangQuiz",
    kind: "Platform trivia AI",
    summary:
      "Platform trivia kompetitif dengan ranked matchmaking dan bank soal yang dihasilkan Gemini. Antarmukanya dirancang neo-brutalist berkontras tinggi, jauh dari tampilan kuis pada umumnya.",
    tags: ["Vite", "Express", "PostgreSQL", "Gemini"],
    year: "2026",
    image: mangquizShot,
    imageAlt: "Halaman depan MangQuiz dengan wordmark besar dan tombol mulai",
    live: "https://mangquiz.app",
  },
  {
    slug: "akem-ramblings",
    title: "Akem's Ramblings",
    kind: "Blog personal",
    summary:
      "Blog pribadi yang dibangun sebagai latihan tipografi dan motion: layout menyerupai buku cetak, header beranimasi, dan transisi antarhalaman.",
    tags: ["Next.js 15", "GSAP", "Literata"],
    year: "2026",
    image: ramblingsShot,
    imageAlt: "Halaman depan Akem's Ramblings dengan judul dan tulisan terbaru",
    live: "https://akemramblings.dev",
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  /** Month range, omitted when the work has no clean start and end. */
  period?: string;
  detail: string;
};

export type ExperienceGroup = {
  year: string;
  items: readonly ExperienceItem[];
};

export const experience: readonly ExperienceGroup[] = [
  {
    year: "2026",
    items: [
      {
        role: "Frontend Developer",
        org: "Ciptaware",
        detail:
          "Mengerjakan landing page agensi dengan fokus pada kualitas animasi dan smooth scroll.",
      },
    ],
  },
  {
    year: "2025",
    items: [
      {
        role: "Fullstack Web Developer Intern",
        org: "PT Telkom Indonesia (Persero) Tbk",
        period: "Jul - Sep 2025",
        detail:
          "Berkontribusi pada pengembangan TGCast, sistem internal karyawan Telkom. Membangun layanan backend dengan Laravel 12 tanpa layer API terpisah, serta antarmuka Inertia.js dengan React 19 dan Radix UI. Proses rutin diotomatiskan lewat Laravel Job & Scheduler, dan rilis dijalankan melalui pipeline GitLab CI/CD ke OpenShift.",
      },
      {
        role: "Freelance Web Developer",
        org: "Proyek klien",
        detail:
          "Membangun situs publik dengan Next.js dan panel operasional dengan Laravel. Keduanya dirancang agar dapat digunakan tanpa pengetahuan teknis.",
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        role: "Freelance Web Developer",
        org: "EasyIzin",
        period: "Okt - Nov 2024",
        detail:
          "Merancang dan membangun website perusahaan dengan Next.js dan Tailwind CSS, mencakup halaman konsultasi, profil perusahaan, dan sistem booking sederhana. Dikerjakan langsung bersama pendiri perusahaan.",
      },
    ],
  },
];

export const education = {
  label: "Pendidikan",
  school: "Universitas Pasundan",
  degree: "S1 Teknik Informatika",
  period: "2022 - 2026 (perkiraan lulus)",
  note: "IPK 3.65 / 4.00",
} as const;

export const organization = {
  label: "Organisasi",
  school: "Google Developer Student Club",
  degree: "Member, Universitas Pasundan",
  period: "Sep 2023 - sekarang",
  note: "Proyek dan pelatihan teknis bersama komunitas kampus",
} as const;

export const contact = {
  heading: "Mari terhubung",
  body: "Saya terbuka untuk peran fullstack maupun frontend, magang atau penuh waktu, serta proyek klien. Silakan kirim pesan melalui formulir di samping, atau langsung ke alamat email di bawah.",
} as const;

export const projectsIntro =
  "Tiga produk yang sudah dirilis dan dapat diakses publik. Dua di antaranya berkaitan dengan cara belajar, satu dengan cara menulis. Seluruh prosesnya saya kerjakan sendiri, dari desain antarmuka hingga deployment." as const;
