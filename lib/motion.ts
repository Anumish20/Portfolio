/**
 * lib/motion.ts
 * -------------------------------------------------------------------------
 * Shared animation variants for the `motion` (Framer Motion) library.
 *
 * Centralising these keeps motion consistent across sections and makes the
 * whole site easy to retune from one place. All transitions use a gentle
 * ease and short distances so the result feels premium, never bouncy.
 *
 * Note: respecting `prefers-reduced-motion` is handled at the component
 * level (see components/ui/Reveal.tsx) and via CSS in globals.css.
 * -------------------------------------------------------------------------
 */

import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const; // easeOutExpo-ish, calm settle

/** Fade + rise. Use for headings, paragraphs, standalone blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Parent that staggers its children into view. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Child item meant to be used inside `staggerContainer`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Default viewport config so reveals trigger slightly before fully in view. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

/* ---------- Micro-interaction presets (shared by buttons & cards) ---------- */

/** Snappy, low-amplitude spring for hover/tap — never bouncy. */
export const microSpring = { type: "spring", stiffness: 400, damping: 25 } as const;

/** Subtle lift for interactive cards on hover. */
export const hoverLift = { y: -4 } as const;

/** Gentle rise for buttons on hover. */
export const hoverNudge = { y: -2 } as const;

/** Tactile press feedback for buttons. */
export const tapScale = { scale: 0.97 } as const;
