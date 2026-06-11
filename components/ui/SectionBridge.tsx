"use client";

/**
 * components/ui/SectionBridge.tsx
 * -------------------------------------------------------------------------
 * A quiet connective beat between sections — the thing that makes the page
 * read as one narrative instead of stacked blocks.
 *
 * A hairline draws down into a short, lowercase phrase as it scrolls into
 * view, handing the story from one section to the next (curiosity → tools →
 * projects → process → let's talk). Deliberately subtle: no flash, just a
 * guided thread. Reduced motion is honoured globally by MotionProvider.
 * -------------------------------------------------------------------------
 */

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SectionBridge({ children }: { children: string }) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-4 sm:py-6">
      <motion.span
        aria-hidden
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="h-12 w-px origin-top bg-gradient-to-b from-transparent via-line to-accent-2/50"
      />
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.18 }}
        className="text-center font-mono text-xs lowercase tracking-wide text-faint"
      >
        {children}
      </motion.p>
    </div>
  );
}
