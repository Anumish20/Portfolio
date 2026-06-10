"use client";

/**
 * components/ui/Reveal.tsx
 * -------------------------------------------------------------------------
 * Scroll-into-view animation wrapper (Client Component).
 *  - Wraps children in a motion element that fades + rises once when it
 *    scrolls into the viewport (triggers a touch early, only once).
 *  - `delay` lets callers cascade multiple reveals.
 *  - `as` lets the wrapper render as any intrinsic element (div, span...).
 *  Respect for reduced-motion is handled globally in globals.css.
 * -------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
