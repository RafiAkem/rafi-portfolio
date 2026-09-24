/**
 * Legal copy for /privacy and /terms, in both site languages.
 *
 * Kept out of content.ts because these documents are long and change on their
 * own schedule. Shape matches the other dictionaries so components read them
 * through the same useLang() context.
 *
 * Written against what the site actually does: a static portfolio on a VPS,
 * a contact form that emails through Resend, a Cloudflare analytics beacon
 * with no cookies, two localStorage preferences, and an embedded chat widget
 * served by MangRAG. The Google user data section describes personal
 * automation tools that act on the owner's own account, which is what the
 * OAuth app is actually used for.
 */

export type LegalSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type LegalDocument = {
  title: string;
  updated: string;
  standfirst: string;
  sections: readonly LegalSection[];
};

export type LegalCopy = {
  backHome: string;
  privacy: LegalDocument;
  terms: LegalDocument;
};

const CONTACT_EMAIL = "contact@rafiakem.tech";

const en: LegalCopy = {
  backHome: "Back to home",
  privacy: {
    title: "Privacy policy",
    updated: "Last updated 24 September 2026",
    standfirst:
      "This is a personal portfolio, not a product with accounts. It collects as little as it can, and none of what it collects is sold or used for advertising.",
    sections: [
      {
        heading: "Who is responsible",
        paragraphs: [
          `This site is run by Rafi Ikhsanul Hakim, an individual based in Bandung, Indonesia. For anything in this policy, write to ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: "What the contact form collects",
        paragraphs: [
          "The contact form asks for your name, your email address, and your message. Those three fields are sent to my inbox as an email so that I can reply to you.",
          "This site keeps no database. Nothing you type into the form is stored on the server after it is sent. The message exists only as an email in my inbox, and I delete it when it is no longer useful.",
        ],
      },
      {
        heading: "The chat assistant on this site",
        paragraphs: [
          "The portfolio includes a chat assistant that answers questions about my work from a knowledge base. Messages you send to it are processed by MangRAG, a product I run, hosted on Vercel. Your messages are used to produce an answer and to keep the conversation going for that session.",
          "Treat that conversation like any other online chat. Do not send passwords, financial details, identity documents, or anything you would not want stored on a third party server.",
        ],
      },
      {
        heading: "Analytics",
        paragraphs: [
          "Visits are measured with Cloudflare Web Analytics. It reports aggregate numbers such as page views, referrers, and country. It sets no cookies, does not fingerprint your device, and does not follow you across other websites.",
        ],
      },
      {
        heading: "Storage in your browser",
        paragraphs: [
          "Two preferences are saved in your browser's local storage: whether you chose the light or dark theme, and which language you chose. Both stay on your device. Neither is sent to the server.",
        ],
      },
      {
        heading: "Google user data",
        paragraphs: [
          "Separately from this website, I use Google APIs in personal automation tools that run on my own computer. Those tools act on data in my own Google Account only. No visitor to this site is ever asked to connect a Google Account, and no Google user data belonging to anyone else is accessed, collected, or stored.",
          "Scopes used, and what each one is for:",
        ],
        bullets: [
          "Gmail, read and modify: to find replies from employers and companies in my own inbox and record them in my own application tracker.",
          "Google Sheets: to write that tracker into a spreadsheet I own.",
          "Google Drive, Docs, Calendar, and Contacts, read access: to organise my own files, notes, and schedule.",
        ],
      },
      {
        heading: "How Google user data is handled",
        bullets: [
          "It is used only to run those personal tools. It is not sold, not shared with third parties, not used for advertising, and not used to train machine learning models.",
          "It is stored on my own machine and in my own Google Account. It is not transferred to any server that serves this website.",
          "My use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
          "You can revoke access at any time at myaccount.google.com/permissions. Revoking stops the tools immediately, and the stored token is discarded.",
        ],
      },
      {
        heading: "Who else processes data",
        paragraphs: [
          "A few service providers handle data as part of running the site. They act on my instructions and are not permitted to use your data for their own purposes:",
        ],
        bullets: [
          "Resend, which delivers contact form messages by email.",
          "Cloudflare, which provides DNS, email routing, and the analytics described above.",
          "Vercel, which hosts the chat assistant.",
          "Tencent Cloud, which hosts this website on a virtual server.",
        ],
      },
      {
        heading: "Legal basis and retention",
        paragraphs: [
          "Contact form data is processed on the basis of your consent, which you give when you press send. It is kept in my inbox for as long as it is useful for replying, and deleted on request.",
          "Under Indonesia's Personal Data Protection Law, UU No. 27 Tahun 2022, you may ask to see, correct, or delete the data you sent, and you may withdraw consent at any time. Withdrawing consent does not affect processing that already happened lawfully.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          `Write to ${CONTACT_EMAIL} to request access, correction, or deletion, or to object to processing. I answer within 14 days.`,
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "This site sets no cookies. Cloudflare Web Analytics is cookieless, and the theme and language preferences live in local storage rather than in cookies.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "If this policy changes, the date at the top changes with it. If a change is material, I will note it on the home page.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `Rafi Ikhsanul Hakim, Bandung, Indonesia. ${CONTACT_EMAIL}`,
        ],
      },
    ],
  },
  terms: {
    title: "Terms of service",
    updated: "Last updated 24 September 2026",
    standfirst:
      "Plain terms for using this website. They cover this site only, not the products it links to.",
    sections: [
      {
        heading: "Acceptance",
        paragraphs: [
          "By using this website you agree to these terms. If you do not agree with them, please do not use the site.",
        ],
      },
      {
        heading: "What this site is",
        paragraphs: [
          "This is a personal portfolio. It presents my work, my writing, and a way to contact me. It is informational. Nothing on it is an offer of employment, a commercial proposal, or professional advice.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "Please do not:",
        ],
        bullets: [
          "Attempt to break, overload, or gain unauthorised access to this site or the services behind it.",
          "Scrape at a rate that degrades the site for other people.",
          "Use the contact form to send spam, malware, or unlawful content.",
          "Present my work as your own.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The text, design, and code of this site belong to me unless stated otherwise. Project names, screenshots, and product copy belong to their respective projects.",
          "MangMicro is registered for copyright with Indonesia's Directorate General of Intellectual Property, registration number 001404869.",
          "You may quote from this site or link to it with attribution. You may not republish it wholesale or present it as your own work.",
        ],
      },
      {
        heading: "Third party links and products",
        paragraphs: [
          "This site links to things I build or use, including MangRAG, NusaGate, MangMicro, MangQuiz, and Akem Ramblings. Each of those has its own terms and privacy practices. These terms cover this website only.",
        ],
      },
      {
        heading: "Messages you send",
        paragraphs: [
          "Do not send confidential information, trade secrets, or credentials through the contact form. A message to me creates no obligation of confidentiality and no contract, until we agree to one in writing.",
        ],
      },
      {
        heading: "No warranty",
        paragraphs: [
          "This site is provided as is. I aim to keep it accurate and available, but I promise neither. Content may be out of date, and access may be interrupted without notice.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the extent the law allows, I am not liable for indirect or consequential loss arising from your use of this site or from relying on its content.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of the Republic of Indonesia. Any dispute falls under the jurisdiction of the courts of Bandung.",
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "I may update these terms. The date at the top shows the current version. Continuing to use the site after a change means you accept the new version.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `Rafi Ikhsanul Hakim, Bandung, Indonesia. ${CONTACT_EMAIL}`,
        ],
      },
    ],
  },
};

const id: LegalCopy = {
  backHome: "Kembali ke beranda",
  privacy: {
    title: "Kebijakan privasi",
    updated: "Terakhir diperbarui 24 September 2026",
    standfirst:
      "Ini portofolio pribadi, bukan produk yang punya akun pengguna. Data yang dikumpulkan sesedikit mungkin, dan tidak satu pun dijual atau dipakai untuk iklan.",
    sections: [
      {
        heading: "Siapa yang bertanggung jawab",
        paragraphs: [
          `Situs ini dikelola oleh Rafi Ikhsanul Hakim, perorangan yang berdomisili di Bandung, Indonesia. Untuk hal apa pun yang menyangkut kebijakan ini, kirim pesan ke ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: "Apa yang dikumpulkan formulir kontak",
        paragraphs: [
          "Formulir kontak meminta nama, alamat email, dan pesan Anda. Ketiga isian itu dikirim ke kotak masuk saya dalam bentuk email supaya saya bisa membalas.",
          "Situs ini tidak punya basis data. Apa pun yang Anda tulis di formulir tidak disimpan di server setelah terkirim. Pesannya hanya ada sebagai email di kotak masuk saya, dan saya hapus kalau sudah tidak diperlukan lagi.",
        ],
      },
      {
        heading: "Asisten chat di situs ini",
        paragraphs: [
          "Portofolio ini memuat asisten chat yang menjawab pertanyaan tentang pekerjaan saya dari sebuah basis pengetahuan. Pesan yang Anda kirim ke asisten itu diproses oleh MangRAG, produk yang saya kelola, dan dijalankan di Vercel. Pesan itu dipakai untuk menyusun jawaban dan melanjutkan percakapan pada sesi tersebut.",
          "Perlakukan percakapan itu seperti chat online pada umumnya. Jangan kirim kata sandi, data keuangan, dokumen identitas, atau apa pun yang tidak ingin Anda simpan di server pihak ketiga.",
        ],
      },
      {
        heading: "Analitik",
        paragraphs: [
          "Kunjungan diukur dengan Cloudflare Web Analytics. Yang dilaporkan hanya angka agregat seperti jumlah tampilan halaman, sumber rujukan, dan negara. Layanan ini tidak memasang cookie, tidak membuat sidik jari perangkat Anda, dan tidak melacak Anda ke situs lain.",
        ],
      },
      {
        heading: "Penyimpanan di peramban Anda",
        paragraphs: [
          "Ada dua preferensi yang disimpan di local storage peramban Anda: pilihan tema terang atau gelap, dan pilihan bahasa. Keduanya tetap di perangkat Anda dan tidak dikirim ke server.",
        ],
      },
      {
        heading: "Data pengguna Google",
        paragraphs: [
          "Terpisah dari situs ini, saya memakai Google API di alat otomasi pribadi yang berjalan di komputer saya sendiri. Alat itu hanya bekerja pada data di Akun Google milik saya. Pengunjung situs ini tidak pernah diminta menyambungkan Akun Google, dan tidak ada data pengguna Google milik orang lain yang diakses, dikumpulkan, atau disimpan.",
          "Izin yang dipakai, beserta keperluannya:",
        ],
        bullets: [
          "Gmail, baca dan ubah: untuk menemukan balasan dari perusahaan di kotak masuk saya sendiri dan mencatatnya di pelacak lamaran kerja saya.",
          "Google Sheets: untuk menulis catatan itu ke spreadsheet milik saya.",
          "Google Drive, Docs, Calendar, dan Contacts, akses baca: untuk merapikan berkas, catatan, dan jadwal saya sendiri.",
        ],
      },
      {
        heading: "Bagaimana data pengguna Google diperlakukan",
        bullets: [
          "Dipakai hanya untuk menjalankan alat otomasi pribadi tadi. Tidak dijual, tidak dibagikan ke pihak ketiga, tidak dipakai untuk iklan, dan tidak dipakai melatih model pembelajaran mesin.",
          "Disimpan di komputer saya sendiri dan di dalam Akun Google saya. Tidak dipindahkan ke server mana pun yang melayani situs ini.",
          "Penggunaan saya atas informasi yang diterima dari Google API mengikuti Google API Services User Data Policy, termasuk ketentuan Limited Use.",
          "Anda dapat mencabut akses kapan saja di myaccount.google.com/permissions. Pencabutan langsung menghentikan alat itu, dan token yang tersimpan ikut dibuang.",
        ],
      },
      {
        heading: "Siapa lagi yang memproses data",
        paragraphs: [
          "Ada beberapa penyedia layanan yang menangani data sebagai bagian dari menjalankan situs ini. Mereka bekerja atas instruksi saya dan tidak boleh memakai data Anda untuk kepentingan sendiri:",
        ],
        bullets: [
          "Resend, yang mengirimkan pesan formulir kontak lewat email.",
          "Cloudflare, yang menangani DNS, penerusan email, dan analitik di atas.",
          "Vercel, yang menjalankan asisten chat.",
          "Tencent Cloud, yang menempatkan situs ini di sebuah server virtual.",
        ],
      },
      {
        heading: "Dasar hukum dan masa simpan",
        paragraphs: [
          "Data formulir kontak diproses atas dasar persetujuan Anda, yang diberikan saat Anda menekan tombol kirim. Data itu disimpan di kotak masuk saya selama masih berguna untuk membalas, dan dihapus kalau Anda memintanya.",
          "Berdasarkan Undang-Undang Pelindungan Data Pribadi, UU No. 27 Tahun 2022, Anda berhak meminta akses, perbaikan, atau penghapusan atas data yang Anda kirim, serta menarik persetujuan kapan saja. Penarikan persetujuan tidak berlaku surut untuk pemrosesan yang sebelumnya sudah sah.",
        ],
      },
      {
        heading: "Hak Anda",
        paragraphs: [
          `Kirim permintaan akses, perbaikan, atau penghapusan, atau keberatan atas pemrosesan, ke ${CONTACT_EMAIL}. Saya menjawab dalam 14 hari.`,
        ],
      },
      {
        heading: "Cookie",
        paragraphs: [
          "Situs ini tidak memasang cookie. Cloudflare Web Analytics berjalan tanpa cookie, dan preferensi tema serta bahasa disimpan di local storage, bukan di cookie.",
        ],
      },
      {
        heading: "Perubahan kebijakan ini",
        paragraphs: [
          "Kalau kebijakan ini berubah, tanggal di bagian atas ikut berubah. Kalau perubahannya penting, saya cantumkan catatannya di beranda.",
        ],
      },
      {
        heading: "Kontak",
        paragraphs: [
          `Rafi Ikhsanul Hakim, Bandung, Indonesia. ${CONTACT_EMAIL}`,
        ],
      },
    ],
  },
  terms: {
    title: "Syarat dan ketentuan",
    updated: "Terakhir diperbarui 24 September 2026",
    standfirst:
      "Ketentuan sederhana untuk memakai situs ini. Cakupannya hanya situs ini, bukan produk yang ditautkan di dalamnya.",
    sections: [
      {
        heading: "Penerimaan",
        paragraphs: [
          "Dengan memakai situs ini, Anda setuju pada ketentuan berikut. Kalau tidak setuju, mohon jangan memakai situsnya.",
        ],
      },
      {
        heading: "Situs ini apa",
        paragraphs: [
          "Ini portofolio pribadi. Isinya karya saya, tulisan saya, dan cara menghubungi saya. Sifatnya informatif. Tidak ada di dalamnya yang merupakan tawaran kerja, penawaran komersial, atau nasihat profesional.",
        ],
      },
      {
        heading: "Penggunaan yang wajar",
        paragraphs: [
          "Mohon jangan:",
        ],
        bullets: [
          "Mencoba merusak, membebani berlebihan, atau masuk tanpa izin ke situs ini atau layanan di belakangnya.",
          "Mengambil data otomatis dengan laju yang membuat situs ini lambat bagi orang lain.",
          "Memakai formulir kontak untuk mengirim spam, perangkat berbahaya, atau konten yang melanggar hukum.",
          "Mengklaim karya saya sebagai milik Anda.",
        ],
      },
      {
        heading: "Hak kekayaan intelektual",
        paragraphs: [
          "Teks, desain, dan kode situs ini milik saya, kecuali dinyatakan lain. Nama proyek, tangkapan layar, dan deskripsi produk mengikuti proyek masing-masing.",
          "MangMicro tercatat hak ciptanya di Direktorat Jenderal Kekayaan Intelektual dengan nomor pendaftaran 001404869.",
          "Anda boleh mengutip atau menautkan situs ini dengan menyebutkan sumbernya. Anda tidak boleh menerbitkan ulang isinya secara utuh atau mengakuinya sebagai karya sendiri.",
        ],
      },
      {
        heading: "Tautan dan produk pihak ketiga",
        paragraphs: [
          "Situs ini menautkan hal-hal yang saya bangun atau pakai, termasuk MangRAG, NusaGate, MangMicro, MangQuiz, dan Akem Ramblings. Masing-masing punya ketentuan dan kebijakan privasi sendiri. Ketentuan di halaman ini hanya berlaku untuk situs ini.",
        ],
      },
      {
        heading: "Pesan yang Anda kirim",
        paragraphs: [
          "Jangan mengirim informasi rahasia, rahasia dagang, atau kredensial lewat formulir kontak. Pesan yang masuk tidak menimbulkan kewajiban kerahasiaan dan tidak membentuk perjanjian apa pun, sampai kita sepakati secara tertulis.",
        ],
      },
      {
        heading: "Tanpa jaminan",
        paragraphs: [
          "Situs ini disediakan apa adanya. Saya berusaha menjaganya akurat dan bisa diakses, tetapi tidak menjanjikan keduanya. Isinya bisa kedaluwarsa, dan akses bisa terhenti tanpa pemberitahuan.",
        ],
      },
      {
        heading: "Batasan tanggung jawab",
        paragraphs: [
          "Sejauh diizinkan hukum, saya tidak bertanggung jawab atas kerugian tidak langsung atau ikutan yang timbul dari penggunaan situs ini, atau dari mengandalkan isinya.",
        ],
      },
      {
        heading: "Hukum yang berlaku",
        paragraphs: [
          "Ketentuan ini tunduk pada hukum Republik Indonesia. Sengketa yang timbul masuk ke kewenangan pengadilan di Bandung.",
        ],
      },
      {
        heading: "Perubahan ketentuan ini",
        paragraphs: [
          "Ketentuan ini bisa saya perbarui. Tanggal di bagian atas menunjukkan versi yang berlaku. Kalau Anda tetap memakai situsnya setelah perubahan, artinya Anda menerima versi barunya.",
        ],
      },
      {
        heading: "Kontak",
        paragraphs: [
          `Rafi Ikhsanul Hakim, Bandung, Indonesia. ${CONTACT_EMAIL}`,
        ],
      },
    ],
  },
};

export const legalCopy: Record<"en" | "id", LegalCopy> = { en, id };
