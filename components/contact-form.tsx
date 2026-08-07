"use client";

import { useState, type FormEvent } from "react";
import {
  CheckCircle,
  CircleNotch,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import { useLang } from "@/components/lang-provider";

type Errors = Partial<Record<"nama" | "email" | "pesan", string>>;
type Status = "idle" | "submitting" | "success" | "error";

/** `.field` is the underlined print input defined in globals.css. */
const LABEL = "folio-caps text-faint";

export function ContactForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState("");

  function validate(values: Record<string, string>): Errors {
    const found: Errors = {};
    if (values.nama.trim().length < 2) found.nama = t.form.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      found.email = t.form.errors.email;
    if (values.pesan.trim().length < 10)
      found.pesan = t.form.errors.message;
    return found;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = {
      nama: String(new FormData(form).get("nama") ?? ""),
      email: String(new FormData(form).get("email") ?? ""),
      pesan: String(new FormData(form).get("pesan") ?? ""),
    };

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    setFailure("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setFailure(t.form.failure);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start border border-border-strong p-8"
      >
        <CheckCircle size={24} weight="regular" aria-hidden className="text-accent" />
        <p className="display-sm mt-5 text-[1.5rem]">{t.form.successTitle}</p>
        <p className="measure-tight mt-3 text-[1.0625rem] leading-[1.7]">
          {t.form.successBody}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="folio-caps mt-7 border border-border-strong px-4 py-2.5 transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          {t.form.writeAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-9">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nama" className={LABEL}>
          {t.form.name}
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          autoComplete="name"
          placeholder={t.form.namePlaceholder}
          aria-invalid={Boolean(errors.nama)}
          aria-describedby={errors.nama ? "nama-error" : undefined}
          className="field"
        />
        {errors.nama && (
          <p id="nama-error" role="alert" className="mt-1 text-[0.9375rem] text-danger">
            {errors.nama}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={LABEL}>
          {t.form.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t.form.emailPlaceholder}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : "email-help"}
          className="field"
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="mt-1 text-[0.9375rem] text-danger">
            {errors.email}
          </p>
        ) : (
          <p id="email-help" className="mt-1 text-[0.9375rem] text-muted">
            {t.form.emailHelp}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pesan" className={LABEL}>
          {t.form.message}
        </label>
        <textarea
          id="pesan"
          name="pesan"
          rows={4}
          placeholder={t.form.messagePlaceholder}
          aria-invalid={Boolean(errors.pesan)}
          aria-describedby={errors.pesan ? "pesan-error" : undefined}
          className="field resize-y"
        />
        {errors.pesan && (
          <p id="pesan-error" role="alert" className="mt-1 text-[0.9375rem] text-danger">
            {errors.pesan}
          </p>
        )}
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 border border-danger px-4 py-3 text-[0.9375rem] text-danger"
        >
          <WarningCircle size={16} weight="regular" aria-hidden className="mt-1 shrink-0" />
          {failure}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="folio-caps inline-flex items-center justify-center gap-2 self-start bg-accent px-6 py-3.5 whitespace-nowrap text-on-accent transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" && (
          <CircleNotch size={13} weight="bold" aria-hidden className="animate-spin" />
        )}
        {status === "submitting" ? t.form.sending : t.form.submit}
      </button>
    </form>
  );
}
