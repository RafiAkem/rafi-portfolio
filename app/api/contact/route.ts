import { NextResponse } from "next/server";

type Payload = { nama?: string; email?: string; pesan?: string };

const CONTACT_TO = process.env.CONTACT_TO ?? "yc66zio@gmail.com";
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "contact@rafiakem.tech";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

/**
 * Validates the contact form server side and delivers the message via the
 * Resend API (https://resend.com). Requires RESEND_API_KEY in the
 * environment; see .env.example.
 */
export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Body bukan JSON yang valid." }, { status: 400 });
  }

  const nama = (body.nama ?? "").trim();
  const email = (body.email ?? "").trim();
  const pesan = (body.pesan ?? "").trim();

  if (
    nama.length < 2 ||
    pesan.length < 10 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  ) {
    return NextResponse.json({ error: "Isian belum lengkap." }, { status: 422 });
  }

  if (!RESEND_API_KEY) {
    console.error("[kontak] RESEND_API_KEY belum di-set di environment.");
    return NextResponse.json(
      { error: "Server email belum dikonfigurasi." },
      { status: 500 },
    );
  }

  const html = `
    <p><strong>Nama:</strong> ${escapeHtml(nama)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Pesan:</strong></p>
    <p>${escapeHtml(pesan).replace(/\n/g, "<br>")}</p>
  `;

  const resend = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      reply_to: email,
      subject: `[Kontak Portfolio] ${nama}`,
      html,
    }),
  });

  if (!resend.ok) {
    console.error("[kontak] Resend menolak:", resend.status, await resend.text());
    return NextResponse.json(
      { error: "Pesan gagal dikirim." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
