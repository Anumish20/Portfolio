/**
 * components/ui/Section.tsx
 * -------------------------------------------------------------------------
 * Consistent <section> wrapper used by every page section.
 *  - Provides the scroll anchor `id` (navbar links target these).
 *  - Enforces uniform vertical rhythm and a centered max-width container.
 *  - Server Component: purely presentational, no client JS.
 * -------------------------------------------------------------------------
 */

import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Narrower inner width for text-heavy sections. */
  width?: "default" | "narrow";
};

export default function Section({
  id,
  children,
  className = "",
  width = "default",
}: SectionProps) {
  const maxWidth = width === "narrow" ? "max-w-3xl" : "max-w-6xl";

  return (
    <section
      id={id}
      className={`scroll-mt-24 px-6 py-24 sm:py-28 ${className}`}
    >
      <div className={`mx-auto w-full ${maxWidth}`}>{children}</div>
    </section>
  );
}
