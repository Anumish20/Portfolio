"use client";

/**
 * components/ui/SpotlightCard.tsx
 * -------------------------------------------------------------------------
 * The portfolio's signature interactive element (Client Component).
 *
 * A surface card that renders a soft radial "spotlight" following the
 * cursor, plus a gradient hairline that brightens on hover. It's subtle,
 * not gimmicky — the kind of detail that makes a page feel hand-built.
 *
 * Implementation notes:
 *  - Uses motion values (not React state) for pointer tracking, so moving
 *    the mouse never triggers a re-render — it writes straight to the DOM.
 *  - The spotlight is a separate layer revealed via group-hover opacity.
 * -------------------------------------------------------------------------
 */

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { hoverLift, microSpring } from "@/lib/motion";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

export default function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, var(--color-accent) 18%, transparent), transparent 70%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={hoverLift}
      transition={microSpring}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent/40 ${className}`}
    >
      {/* Cursor-following glow (decorative) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {/* Content sits above the glow */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
