"use client";

/**
 * components/sections/ContactSection.tsx
 * -------------------------------------------------------------------------
 * The full-stack contact section (Client Component).
 *
 * A real form (Name / Email / Message) that POSTs to /api/contact and walks
 * a clear state machine: idle → submitting → success | error.
 *  - Client validation mirrors the server for instant feedback, but the API
 *    stays the source of truth (it independently rejects bad input).
 *  - Field-level errors from the API are mapped back onto the inputs.
 *  - Keeps the existing direct-email + Copy + socials alongside the form, and
 *    reuses the portfolio's design tokens (surface / line / accent, the
 *    grid-backdrop panel, the availability pill, Reveal entrance).
 * -------------------------------------------------------------------------
 */

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CopyEmailButton from "@/components/ui/CopyEmailButton";
import MotionLink from "@/components/ui/MotionLink";
import { profile, socials } from "@/lib/data";

type Field = "name" | "email" | "message";
type FieldErrors = Partial<Record<Field, string[]>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY = { name: "", email: "", message: "" };

/** Client-side mirror of the server rules — UX only, not the trust boundary. */
function validate(values: typeof EMPTY): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = ["Please enter your name."];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = ["Please enter a valid email address."];
  if (values.message.trim().length < 10)
    errors.message = ["Message should be at least 10 characters."];
  return errors;
}

const fieldBase =
  "w-full rounded-lg border bg-surface-2 px-4 py-3 text-fg placeholder:text-faint outline-none transition-colors focus:ring-2 focus:ring-accent/20";

export default function ContactSection() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const submitting = status === "submitting";

  function update(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error as soon as the user edits it.
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.status === 201) {
        setValues(EMPTY);
        setStatus("success");
        return;
      }

      const data: { error?: string; fieldErrors?: FieldErrors } = await res
        .json()
        .catch(() => ({}));

      if (res.status === 400 && data.fieldErrors) {
        setFieldErrors(data.fieldErrors);
      }
      setFormError(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  function errorClass(field: Field) {
    return fieldErrors[field]
      ? "border-red-500/60 focus:border-red-500/60"
      : "border-line focus:border-accent/60";
  }

  return (
    <Section id="contact">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 sm:px-10 sm:py-16">
          {/* Backdrop echoes the hero */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
          </div>

          <div className="relative">
            {/* Header */}
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
              Contact
            </span>
            <div className="mt-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-2/30 bg-accent-2/10 px-4 py-1.5 text-sm font-medium text-accent-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
                </span>
                {profile.availability}
              </span>
            </div>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Let&apos;s build something, or just talk shop.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Have a role, a project, or a question? Send it straight to my
              inbox with the form — it goes into my database and I&apos;ll get
              back to you.
            </p>

            {/* Body: form + direct contact */}
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
              {/* Left: form / success */}
              <div>
                {status === "success" ? (
                  <div className="flex h-full flex-col items-start justify-center rounded-2xl border border-accent-2/30 bg-accent-2/5 p-8">
                    <CheckCircle2 className="text-accent-2" size={32} />
                    <h3 className="mt-4 text-xl font-semibold text-fg">
                      Message sent — thank you!
                    </h3>
                    <p className="mt-2 text-muted">
                      It&apos;s safely stored and I&apos;ll reply to you soon.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent/50 hover:text-accent-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-fg"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => update("name", e.target.value)}
                        disabled={submitting}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        placeholder="Your name"
                        className={`${fieldBase} ${errorClass("name")}`}
                      />
                      {fieldErrors.name ? (
                        <p id="name-error" className="mt-1.5 text-sm text-red-400">
                          {fieldErrors.name[0]}
                        </p>
                      ) : null}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-fg"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                        disabled={submitting}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        placeholder="you@example.com"
                        className={`${fieldBase} ${errorClass("email")}`}
                      />
                      {fieldErrors.email ? (
                        <p id="email-error" className="mt-1.5 text-sm text-red-400">
                          {fieldErrors.email[0]}
                        </p>
                      ) : null}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium text-fg"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={values.message}
                        onChange={(e) => update("message", e.target.value)}
                        disabled={submitting}
                        aria-invalid={Boolean(fieldErrors.message)}
                        aria-describedby={
                          fieldErrors.message ? "message-error" : undefined
                        }
                        placeholder="Tell me a little about what you have in mind…"
                        className={`${fieldBase} resize-y ${errorClass("message")}`}
                      />
                      {fieldErrors.message ? (
                        <p id="message-error" className="mt-1.5 text-sm text-red-400">
                          {fieldErrors.message[0]}
                        </p>
                      ) : null}
                    </div>

                    {/* General error banner */}
                    {status === "error" && formError ? (
                      <div
                        role="alert"
                        className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                      >
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    ) : null}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-fg px-7 py-3.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Right: direct contact */}
              <div className="lg:border-l lg:border-line lg:pl-10">
                <h3 className="text-sm font-semibold text-fg">
                  Prefer email?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {profile.responseNote}
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <MotionLink
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/50 hover:text-accent-2"
                  >
                    {profile.email}
                  </MotionLink>
                  <CopyEmailButton email={profile.email} />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {socials
                    .filter((social) => social.href.startsWith("http"))
                    .map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted transition-colors hover:text-accent-2"
                      >
                        {social.label}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
