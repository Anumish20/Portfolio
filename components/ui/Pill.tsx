/**
 * components/ui/Pill.tsx
 * -------------------------------------------------------------------------
 * Small label chip. Two variants:
 *  - "status": a soft accent chip with an optional pulsing dot (used for the
 *    hero "available / learning" indicator).
 *  - "tag": a neutral hairline chip used for skill + tech-stack tokens.
 * Server Component.
 * -------------------------------------------------------------------------
 */

import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  variant?: "status" | "tag";
  dot?: boolean;
  className?: string;
};

export default function Pill({
  children,
  variant = "tag",
  dot = false,
  className = "",
}: PillProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full text-sm font-medium transition-colors";

  const styles =
    variant === "status"
      ? "border border-accent/30 bg-accent/10 px-4 py-1.5 text-accent"
      : "border border-line bg-surface px-3 py-1 text-muted hover:border-accent/40 hover:text-fg";

  return (
    <span className={`${base} ${styles} ${className}`}>
      {dot ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
        </span>
      ) : null}
      {children}
    </span>
  );
}
