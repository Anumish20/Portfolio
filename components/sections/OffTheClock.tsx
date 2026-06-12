"use client";

/**
 * components/sections/OffTheClock.tsx
 * -------------------------------------------------------------------------
 * The human beat between "how I build" and "let's talk".
 *
 * A personality grid: a shuffled subset of `offTheClock` (lib/data.ts) that a
 * visitor can reshuffle, so the section feels alive — a person, not a CV. The
 * card order reflows with a layout animation on every shuffle.
 *
 * Borrowed in spirit from the best part of a rival site, then rebuilt to match
 * this portfolio's calm motion language: no flash, just a small, replayable
 * moment of personality. Reduced motion is honoured globally.
 * -------------------------------------------------------------------------
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { offTheClock, type Interest } from "@/lib/data";
import { microSpring, tapScale } from "@/lib/motion";

/** How many cards are on screen at once (the pool is larger, so shuffle surprises). */
const VISIBLE = 6;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Per-category tint — keeps the grid varied without shouting. */
const tagTint: Record<Interest["tag"], string> = {
  reading: "text-accent",
  gaming: "text-accent-2",
  music: "text-accent",
  movement: "text-accent-2",
};

/** Fisher–Yates — returns a new shuffled copy (client-only, never during render). */
function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function OffTheClock() {
  // Deterministic first paint (no Math.random during render → no hydration drift);
  // the shuffle button is what brings the grid to life.
  const [order, setOrder] = useState<Interest[]>(() => offTheClock.slice(0, VISIBLE));
  const [spins, setSpins] = useState(0);

  function reshuffle() {
    setOrder(shuffle(offTheClock).slice(0, VISIBLE));
    setSpins((n) => n + 1);
  }

  return (
    <Section id="off-the-clock">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Off the clock"
            title="There's a person behind the commits."
            subtitle="The other half of staying curious — what I reach for when the editor is closed."
          />

          <motion.button
            type="button"
            onClick={reshuffle}
            whileHover={{ y: -2 }}
            whileTap={tapScale}
            transition={microSpring}
            aria-label="Shuffle interests"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent/50 hover:text-accent-2"
          >
            <motion.span
              key={spins}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex"
              aria-hidden
            >
              <Shuffle size={16} />
            </motion.span>
            Shuffle
          </motion.button>
        </div>
      </Reveal>

      {/* The grid reflows with a layout animation on every shuffle. */}
      <motion.ul
        layout
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {order.map((item) => (
            <motion.li
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/40"
            >
              {/* Ambient tint that warms up on hover (decorative). */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-2/5 blur-2xl transition-opacity duration-300 group-hover:bg-accent-2/10"
              />
              <span className="text-2xl" aria-hidden>
                {item.glyph}
              </span>
              <h3 className={`mt-4 text-base font-semibold ${tagTint[item.tag]}`}>
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Reveal delay={0.1}>
        <p className="mt-8 text-center font-mono text-xs lowercase tracking-wide text-faint">
          {offTheClock.length} things, {VISIBLE} at a time — hit shuffle for a different side of me
        </p>
      </Reveal>
    </Section>
  );
}
