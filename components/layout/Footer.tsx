/**
 * components/layout/Footer.tsx
 * -------------------------------------------------------------------------
 * Site footer (Server Component).
 *  - Repeats the social links for easy reach at the end of the page.
 *  - Shows a small "built with" line — honest about the stack, no fluff.
 * Content comes from lib/data.ts.
 * -------------------------------------------------------------------------
 */

import { profile, socials } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-faint">
            Built with Next.js, TypeScript &amp; Tailwind CSS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={
                social.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="text-sm text-muted transition-colors hover:text-accent-2"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
