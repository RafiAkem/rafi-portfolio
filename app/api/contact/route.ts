import { NextResponse } from "next/server";

type Payload = { nama?: string; email?: string; pesan?: string };

/**
 * Validates the contact form server side and hands the message off.
 *
 * TODO: wire an actual delivery step here (Resend, Nodemailer, a Google Sheet,
 * whatever Rafi prefers). Until then the message is only logged, so the
 * success state the visitor sees is honest about reaching the server but the
 * mail never leaves the box.
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

  console.log("[kontak]", { nama, email, panjangPesan: pesan.length });

  return NextResponse.json({ ok: true });
}
