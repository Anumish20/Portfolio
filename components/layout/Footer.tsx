/**
 * components/layout/Footer.tsx
 * -------------------------------------------------------------------------
 * Minimal site footer (Server Component).
 *  - One quiet sign-off line + an honest "built with" credit.
 *  - Deliberately carries NO social or contact links — those live once, in
 *    the Contact section, so nothing is duplicated at the end of the page.
 * -------------------------------------------------------------------------
 */

import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 text-center">
        <p className="text-sm text-muted">
          Designed &amp; built by{" "}
          <span className="font-medium text-fg">{profile.name}</span>.
        </p>
        <p className="mt-1.5 font-mono text-xs text-faint">
          Built with Next.js, Prisma, PostgreSQL &amp; Claude Code.
        </p>
      </div>
    </footer>
  );
}
