import type { StaticImageData } from "next/image";

/**
 * Screenshots are imported rather than referenced by path so Next reads their
 * real intrinsic size at build time and generates a blur placeholder. Without
 * that, a lazily loaded shot shows an empty frame until it decodes.
 */
import mangmicroShot from "@/public/projects/mangmicro.webp";
import mangquizShot from "@/public/projects/mangquiz.webp";
import mangragShot from "@/public/projects/mangrag.webp";
import ramblingsShot from "@/public/projects/akem-ramblings.webp";
import portraitShot from "@/public/rafi.jpg";

/**
 * Every visible string and asset path on the site lives here, in two
 * dictionaries (English default, Indonesian). Components read the active
 * language through useLang() from components/lang-provider.
 *
 * Sources of truth:
 *   - CV (Rafi Ikhsanul Hakim, resumeCV-1.pdf) for work history and education
 *   - github.com/RafiAkem for repos, avatar and blog link
 *   - The live products themselves for project copy and screenshots
 */

export type HeadlineSegment = { text: string; italic?: boolean };

export type Lang = "en" | "id";

/** Everything shared between languages: identity, links, images. */
export const profile = {
  name: "Rafi Ikhsanul Hakim",
  shortName: "Rafi",
  handle: "RafiAkem",
  email: "contact@rafiakem.tech",
  blog: "https://akemramblings.dev",
  github: "https://github.com/RafiAkem",
  linkedin: "https://www.linkedin.com/in/rafi-ikhsanul-hakim/",
  /** Avatar pulled from the GitHub profile, so it stays a real photo. */
  portrait: portraitShot,
  /** Absolute-path form, for metadata and JSON-LD where a URL is required. */
  portraitPath: "/rafi.jpg",
  cvUrl: "/cv-rafi-ikhsanul-hakim.pdf",
};

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Blog", href: profile.blog },
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
];

export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  tags: readonly string[];
  /** Optional legal registration shown as a badge on the card. */
  copyright?: string;
  year: string;
  /** Screenshot of the running product, captured from the live site. */
  image: StaticImageData;
  imageAlt: string;
  /** Live deployment. Every selected project has one. */
  live: string;
};

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

export const en = {
  langName: "English",
  metaDescription:
    "Fullstack web developer in Bandung. Building web apps and AI-powered systems with Next.js, TypeScript, and Laravel. Former intern at PT Telkom Indonesia.",
  role: "Fullstack Web & AI Developer",
  city: "Bandung, West Java",
  portraitAlt: "Portrait of Rafi Ikhsanul Hakim",
  headlineLines: [
    [{ text: "Building web apps" }],
    [{ text: "and " }, { text: "AI-powered systems.", italic: true }],
  ],
  /** Hero standfirst. Leads with credentials, because that is what a reader
   *  scanning a portfolio for thirty seconds is actually looking for. */
  subheadline:
    "Informatics student at Universitas Pasundan with fullstack internship experience at PT Telkom Indonesia. Open to new roles and projects.",
  nav: [
    { label: "About", href: "#tentang" },
    { label: "Projects", href: "#proyek" },
    { label: "Experience", href: "#pengalaman" },
    { label: "Contact", href: "#kontak" },
  ],
  navAria: "Main",
  mobileNavAria: "Mobile menu",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  contactMe: "Contact me",
  skipLink: "Skip to content",
  hero: {
    viewProjects: "View projects",
    viewSite: "View site",
    openSite: "Open site",
  },
  plate: "Plate",
  projectsHeading: "Selected projects",
  stackAria: "Technologies I use day to day",
  about: {
    heading: "About me",
    paragraphs: [
      "I build web applications end to end: internal company systems, client sites and operation panels, right through to learning products. The last one is what I have worked on the longest. MangMicro and MangQuiz started from the same problem: lecture material is too long, and the time to understand it is short.",
      "My main focus is frontend, especially performance, readability, and keyboard accessibility. On the backend I work with Laravel, PostgreSQL, pgvector, and language model pipelines.",
    ],
    focus: [
      "Next.js App Router",
      "TypeScript",
      "Laravel & Inertia",
      "Postgres & pgvector",
      "Gemini API",
    ],
  },
  projectsIntro:
    "Four shipped products, all publicly accessible. Two are about learning, one about writing, and one for teams building chatbots for their clients. I did the entire process myself, from interface design to deployment.",
  projects: [
    {
      slug: "mangmicro",
      title: "MangMicro",
      kind: "AI microlearning",
      summary:
        "Turns one lecture document into six study formats: summary, quiz, slides, mind map, audio, and narrated video. Designed to lower students' cognitive load, not add another app.",
      tags: ["Next.js", "AI pipeline", "PostgreSQL"],
      copyright: "Registered copyright · No. 001404869 (DJKI)",
      year: "2026",
      image: mangmicroShot,
      imageAlt: "MangMicro landing page with title and product preview",
      live: "https://mangmicro.web.id",
    },
    {
      slug: "mangquiz",
      title: "MangQuiz",
      kind: "AI trivia platform",
      summary:
        "A competitive trivia platform with ranked matchmaking and a question bank generated by Gemini. The interface is a high-contrast neo-brutalist take, far from the usual quiz look.",
      tags: ["Vite", "Express", "PostgreSQL", "Gemini"],
      year: "2026",
      image: mangquizShot,
      imageAlt: "MangQuiz landing page with large wordmark and start button",
      live: "https://mangquiz.app",
    },
    {
      slug: "akem-ramblings",
      title: "Akem's Ramblings",
      kind: "Personal blog",
      summary:
        "A personal blog built as an exercise in typography and motion: a print-book layout, animated header, and page transitions.",
      tags: ["Next.js 15", "GSAP", "Literata"],
      year: "2026",
      image: ramblingsShot,
      imageAlt: "Akem's Ramblings landing page with title and latest posts",
      live: "https://akemramblings.dev",
    },
    {
      slug: "mangrag",
      title: "MangRAG",
      kind: "RAG SaaS",
      summary:
        "A SaaS for building RAG chatbots that clients install with a single snippet: upload a PDF, the system builds a knowledge base, and answers always cite their sources. Includes cross-instance rate limiting, multi-user auth, and a bot readiness score.",
      tags: ["Next.js", "Supabase", "Gemini", "RAG"],
      year: "2026",
      image: mangragShot,
      imageAlt: "MangRAG landing page with hero and chatbot demo",
      live: "https://mangrag.vercel.app",
    },
  ],
  experience: {
    heading: "Experience",
    downloadCv: "Download CV",
    groups: [
      {
        year: "2026",
        items: [
          {
            role: "Frontend & DevOps Developer",
            org: "Ciptaware",
            detail:
              "Built the agency landing page and shipped it to production: frontend work focused on animation quality and smooth scrolling, plus the devops side — CI/CD pipeline and deployment.",
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
              "Contributed to TGCast, Telkom's internal employee system. Built backend services with Laravel 12 without a separate API layer, plus Inertia.js interfaces with React 19 and Radix UI. Automated routine processes with Laravel Jobs & Scheduler, and shipped releases through a GitLab CI/CD pipeline to OpenShift.",
          },
        ],
      },
      {
        year: "2024",
        items: [
          {
            role: "Freelance Web Developer",
            org: "Client projects",
            period: "2024 - Present",
            detail:
              "Public websites with Next.js and operation panels with Laravel for EasyIzin and other startups and small businesses. Built to be usable without technical knowledge, from scoping with founders to deployment.",
          },
        ],
      },
    ],
    education: {
      label: "Education",
      school: "Universitas Pasundan",
      degree: "B.Sc. Informatics Engineering",
      period: "2022 - 2026",
      note: "GPA 3.66 / 4.00",
    },
    organization: {
      label: "Organization",
      school: "Google Developer Student Club",
      degree: "Member, Universitas Pasundan",
      period: "Sep 2023 - 2025",
      note: "Technical projects and training with a campus community",
    },
  },
  codeLog: {
    heading: "Code notes",
    githubProfile: "GitHub profile",
    scope:
      "The numbers below are read directly from GitHub and only cover public repositories. Most client work and running products live in private repositories, so what you see here is a working rhythm, not the full output.",
    activityHeading: "12 months of activity",
  },
  contact: {
    heading: "Let's connect",
    body: "I'm open to fullstack and frontend roles, internships or full-time, as well as client projects. Send a message through the form, or reach me directly at the email below.",
    emailLabel: "Email",
    locationLabel: "Location",
  },
  form: {
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Full name",
    emailPlaceholder: "you@company.com",
    messagePlaceholder:
      "Tell me about the role or project you're offering, and when you'd like to start.",
    emailHelp: "Replies will be sent to this address.",
    errors: {
      name: "Please enter your full name.",
      email: "That email address isn't valid.",
      message: "Please write a message of at least 10 characters.",
    },
    successTitle: "Message sent",
    successBody:
      "Thank you. I usually reply within one to two business days.",
    writeAnother: "Write another message",
    failure:
      "Your message failed to send. Please try again, or reach me by email.",
    submit: "Send message",
    sending: "Sending",
  },
  contribution: {
    contributions: "contributions",
    activeDays: "active days",
    to: "to",
    dailyPeak: "Daily peak {n} contributions · busiest month {m}",
    caption: "GitHub contributions per month, {start} to {end}",
    month: "Month",
    contribution: "Contributions",
  },
  notFound: {
    title: "Page not found",
    body: "The address may be wrong, or the page has moved.",
    backHome: "Back to home",
  },
};

export const id: typeof en = {
  langName: "Bahasa Indonesia",
  metaDescription:
    "Fullstack web developer di Bandung. Membangun aplikasi web dan sistem berbasis AI dengan Next.js, TypeScript, dan Laravel. Eks-intern di PT Telkom Indonesia.",
  role: "Fullstack Web & AI Developer",
  city: "Bandung, Jawa Barat",
  portraitAlt: "Potret Rafi Ikhsanul Hakim",
  headlineLines: [
    [{ text: "Membangun aplikasi web" }],
    [{ text: "dan sistem " }, { text: "berbasis AI.", italic: true }],
  ],
  subheadline:
    "Mahasiswa Teknik Informatika Universitas Pasundan dengan pengalaman internship fullstack di PT Telkom Indonesia. Terbuka untuk peran dan proyek baru.",
  nav: [
    { label: "Tentang", href: "#tentang" },
    { label: "Proyek", href: "#proyek" },
    { label: "Pengalaman", href: "#pengalaman" },
    { label: "Kontak", href: "#kontak" },
  ],
  navAria: "Utama",
  mobileNavAria: "Menu seluler",
  openMenu: "Buka menu",
  closeMenu: "Tutup menu",
  contactMe: "Hubungi saya",
  skipLink: "Lompat ke konten",
  hero: {
    viewProjects: "Lihat proyek",
    viewSite: "Lihat situs",
    openSite: "Buka situs",
  },
  plate: "Plat",
  projectsHeading: "Proyek pilihan",
  stackAria: "Teknologi yang sehari-hari saya pakai",
  about: {
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
  },
  projectsIntro:
    "Empat produk yang sudah dirilis dan dapat diakses publik. Dua berkaitan dengan cara belajar, satu dengan cara menulis, dan satu untuk tim yang membangun chatbot bagi kliennya. Seluruh prosesnya saya kerjakan sendiri, dari desain antarmuka hingga deployment.",
  projects: [
    {
      slug: "mangmicro",
      title: "MangMicro",
      kind: "Microlearning berbasis AI",
      summary:
        "Mengubah satu dokumen kuliah menjadi enam format belajar: ringkasan, kuis, slide, mind map, audio, dan video bernarasi. Dirancang untuk menurunkan beban kognitif mahasiswa, bukan menambah satu aplikasi lagi.",
      tags: ["Next.js", "AI pipeline", "PostgreSQL"],
      copyright: "Hak Cipta Terdaftar · No. 001404869 (DJKI)",
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
    {
      slug: "mangrag",
      title: "MangRAG",
      kind: "RAG SaaS",
      summary:
        "SaaS untuk membuat chatbot RAG yang dipasang klien lewat satu baris snippet: upload PDF, sistem membangun knowledge base, dan jawaban selalu menyertakan sitasi sumber. Dilengkapi rate limit lintas instance, autentikasi multi-user, dan skor kesiapan bot.",
      tags: ["Next.js", "Supabase", "Gemini", "RAG"],
      year: "2026",
      image: mangragShot,
      imageAlt: "Halaman depan MangRAG dengan hero dan demo chatbot",
      live: "https://mangrag.vercel.app",
    },
  ],
  experience: {
    heading: "Pengalaman",
    downloadCv: "Unduh CV",
    groups: [
      {
        year: "2026",
        items: [
          {
            role: "Frontend & DevOps Developer",
            org: "Ciptaware",
            detail:
              "Membangun landing page agensi dengan fokus kualitas animasi dan smooth scroll, sekaligus menangani sisi devops: pipeline CI/CD dan deployment ke produksi.",
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
        ],
      },
      {
        year: "2024",
        items: [
          {
            role: "Freelance Web Developer",
            org: "Proyek klien",
            period: "2024 - Sekarang",
            detail:
              "Situs publik dengan Next.js dan panel operasional dengan Laravel untuk EasyIzin serta startup dan usaha kecil lainnya. Semua dirancang agar dapat digunakan tanpa pengetahuan teknis, dari diskusi lingkup bersama pendiri hingga deployment.",
          },
        ],
      },
    ],
    education: {
      label: "Pendidikan",
      school: "Universitas Pasundan",
      degree: "S1 Teknik Informatika",
      period: "2022 - 2026",
      note: "IPK 3.66 / 4.00",
    },
    organization: {
      label: "Organisasi",
      school: "Google Developer Student Club",
      degree: "Member, Universitas Pasundan",
      period: "Sep 2023 - 2025",
      note: "Proyek dan pelatihan teknis bersama komunitas kampus",
    },
  },
  codeLog: {
    heading: "Catatan kode",
    githubProfile: "Profil GitHub",
    scope:
      "Angka di bawah dibaca langsung dari GitHub dan hanya mencakup repositori publik. Sebagian besar pekerjaan klien dan produk yang sedang berjalan tersimpan di repositori privat, jadi yang tergambar di sini adalah ritme kerja, bukan seluruh keluaran.",
    activityHeading: "Aktivitas 12 bulan",
  },
  contact: {
    heading: "Mari terhubung",
    body: "Saya terbuka untuk peran fullstack maupun frontend, magang atau penuh waktu, serta proyek klien. Silakan kirim pesan melalui formulir di samping, atau langsung ke alamat email di bawah.",
    emailLabel: "Email",
    locationLabel: "Domisili",
  },
  form: {
    name: "Nama",
    email: "Email",
    message: "Pesan",
    namePlaceholder: "Nama lengkap",
    emailPlaceholder: "nama@perusahaan.com",
    messagePlaceholder:
      "Ceritakan peran atau proyek yang Anda tawarkan, dan perkiraan waktu mulainya.",
    emailHelp: "Balasan akan dikirim ke alamat ini.",
    errors: {
      name: "Mohon isi nama lengkap Anda.",
      email: "Format alamat email belum valid.",
      message: "Mohon tulis pesan minimal 10 karakter.",
    },
    successTitle: "Pesan terkirim",
    successBody:
      "Terima kasih. Saya biasanya membalas dalam satu hingga dua hari kerja.",
    writeAnother: "Tulis pesan lain",
    failure:
      "Pesan gagal terkirim. Silakan coba lagi, atau hubungi saya lewat email.",
    submit: "Kirim pesan",
    sending: "Mengirim",
  },
  contribution: {
    contributions: "kontribusi",
    activeDays: "hari aktif",
    to: "hingga",
    dailyPeak: "Puncak harian {n} kontribusi · bulan tersibuk {m}",
    caption: "Kontribusi GitHub per bulan, {start} sampai {end}",
    month: "Bulan",
    contribution: "Kontribusi",
  },
  notFound: {
    title: "Halaman tidak ditemukan",
    body: "Alamat yang Anda tuju mungkin keliru, atau halamannya sudah dipindahkan.",
    backHome: "Kembali ke beranda",
  },
};

export const dictionaries: Record<Lang, typeof en> = { en, id };
export const defaultLang: Lang = "en";
