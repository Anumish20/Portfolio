"use client";

/**
 * components/ui/ThoughtCard.tsx
 * -------------------------------------------------------------------------
 * The one small discovery on the site. Clicking the name in the hero unfolds
 * this — a tiny note resting just below the name, NOT a modal or overlay.
 *
 * One thought at a time. Tap the card (or the quiet ← → hints, or arrow keys)
 * to drift to the next; the dots show where you are. Click anywhere outside,
 * press Esc, or tap ✕ to fold it away. No backdrop dim, no buttons that shout,
 * no dashboard — Apple-Notes calm, Linear-quiet, Stripe-clean.
 *
 * Content: `thoughts` in lib/data.ts (four, curated). Anchored by the hero,
 * which owns the open state. Reduced motion handled globally by MotionProvider.
 * -------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { thoughts } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;
const COUNT = thoughts.length;

export default function ThoughtCard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  // Direction drives the crossfade slide (+1 next, -1 prev).
  const [dir, setDir] = useState(1);

  // Arrow keys page through; Esc folds it away.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function go(step: number) {
    setDir(step);
    setIndex((i) => (i + step + COUNT) % COUNT);
  }

  const thought = thoughts[index];

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* Invisible outside-click catcher — no dim, just closes on tap-away. */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="fixed inset-0 z-40 cursor-default"
          />

          {/* The note, anchored just below the name */}
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.32, ease: EASE }}
            role="dialog"
            aria-label="A thought from Anubhuti"
            onClick={() => go(1)}
            className="absolute left-0 top-full z-50 mt-4 w-[min(20rem,calc(100vw-3rem))] cursor-pointer select-none rounded-2xl border border-line bg-surface/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            {/* Ambient accent (decorative) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent-2/10 blur-2xl"
            />

            {/* Label + close */}
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-[11px] lowercase tracking-wide text-accent-2">
                {thought.label}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close"
                className="-mr-1 -mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md text-faint transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <X size={13} />
              </button>
            </div>

            {/* The thought itself — crossfades in place */}
            <div className="mt-2 min-h-[3.5rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: dir * 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -12 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="text-[15px] leading-relaxed text-fg"
                >
                  {thought.body}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Quiet navigation: ← dots → (no labels, no buttons that shout) */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous thought"
                className="text-faint transition-colors hover:text-accent-2"
              >
                <ChevronLeft size={15} />
              </button>

              <div className="flex items-center gap-1.5" aria-hidden>
                {thoughts.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-4 bg-accent-2" : "w-1.5 bg-line"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next thought"
                className="text-faint transition-colors hover:text-accent-2"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
