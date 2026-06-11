"use client";

/**
 * components/ui/DeveloperJourney.tsx
 * -------------------------------------------------------------------------
 * The HTML → AI arc, folded into the Skills section — read as a CURIOSITY
 * journey, not a skill timeline.
 *
 * A gradient rail of stops drives a detail panel that, for each stop, shows
 * the loop that actually moved Anubhuti forward:
 *   Question → What I learned → the next question it sparked.
 * A subtle breadcrumb shows the whole evolution at a glance. The final stop
 * (AI Engineering) is framed as the START of a new frontier, not the end —
 * with the directions it's opening up.
 *
 * Data: journey (lib/data.ts). Client Component for selection + in-view rail.
 * Reduced-motion handled globally by MotionProvider.
 * -------------------------------------------------------------------------
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Compass, GraduationCap, HelpCircle, Rocket } from "lucide-react";
import { journey } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function DeveloperJourney() {
  // Default to the present: the frontier stop.
  const [active, setActive] = useState(journey.length - 1);
  const stop = journey[active];
  const nextStop = active < journey.length - 1 ? journey[active + 1] : null;
  const isFrontierStop = stop.kind === "frontier";

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
        <span className="h-px w-6 bg-accent-2/60" aria-hidden />
        A curiosity journey
      </p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        This isn&apos;t a skill timeline — it&apos;s the trail my curiosity took.
        Each stop is a question I couldn&apos;t let go of, what answering it
        taught me, and the next question it sparked.
      </p>

      {/* Track */}
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        className="relative mt-8 flex items-start justify-between gap-1"
      >
        {/* Base rail */}
        <span aria-hidden className="absolute left-0 right-0 top-[11px] h-px bg-line" />
        {/* Filled rail */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute left-0 right-0 top-[11px] h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-2"
        />

        {journey.map((item, index) => {
          const isActive = index === active;
          const isFrontier = item.kind === "frontier";
          return (
            <motion.li
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
              }}
              className="relative z-10 flex flex-1 flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-current={isActive ? "step" : undefined}
                aria-label={item.label}
                className="group flex flex-col items-center gap-2"
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full border-2 transition-colors ${
                    isActive
                      ? "border-accent-2 bg-accent-2 shadow-[0_0_12px_var(--color-accent-2)]"
                      : "border-line bg-surface group-hover:border-accent/50"
                  }`}
                >
                  {isFrontier && !isActive ? (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
                    </span>
                  ) : null}
                </span>
                <span
                  className={`max-w-[4.5rem] text-center text-[11px] font-medium leading-tight transition-colors sm:max-w-[6rem] sm:text-xs ${
                    isActive ? "text-fg" : "text-faint group-hover:text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </motion.li>
          );
        })}
      </motion.ol>

      {/* Selected stop — the evolving thought */}
      <div className="relative mt-7 overflow-hidden rounded-xl border border-line bg-surface-2/50 p-5 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* Kicker — the milestone is secondary; the question is the story. */}
            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-wider">
              <span className="text-faint">
                Stop {String(active + 1).padStart(2, "0")} · {stop.label}
              </span>
              {isFrontierStop ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent-2/40 bg-accent-2/10 px-2 py-0.5 text-[10px] text-accent-2">
                  <Rocket size={10} />
                  new frontier
                </span>
              ) : (
                <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-faint">
                  {stop.kind}
                </span>
              )}
            </div>

            {/* The question — the hero of the whole stop */}
            <div className="mt-4 flex gap-3">
              <HelpCircle size={20} className="mt-1 shrink-0 text-accent-2" aria-hidden />
              <p className="text-2xl font-semibold leading-snug tracking-tight text-fg">
                {stop.question}
              </p>
            </div>

            <div className="mt-6 space-y-5 border-t border-line pt-5">
              {/* What chasing the question led me to do */}
              <Field icon={<Compass size={14} />} label="What chasing it led me to do">
                <span className="leading-relaxed text-muted">{stop.discovery}</span>
              </Field>

              {/* What answering it taught me */}
              <Field icon={<GraduationCap size={14} />} label="What it taught me">
                <span className="leading-relaxed text-muted">{stop.learned}</span>
              </Field>

              {/* The question it sparked → chains to the next stop */}
              <Field
                icon={<ArrowRight size={14} />}
                label={isFrontierStop ? "Where it's taking me next" : "The question it sparked"}
              >
                <span className="leading-relaxed text-muted">{stop.next}</span>
                {nextStop ? (
                  <button
                    type="button"
                    onClick={() => setActive(active + 1)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:border-accent/60 hover:bg-accent/15"
                  >
                    follow it to {nextStop.label}
                    <ArrowRight size={12} />
                  </button>
                ) : null}
              </Field>

              {/* Frontier directions — only on the AI stop */}
              {stop.frontier ? (
                <Field icon={<Rocket size={14} />} label="What it led me to">
                  <ul className="flex flex-wrap gap-2">
                    {stop.frontier.map((dir) => (
                      <li
                        key={dir}
                        className="rounded-full border border-accent-2/30 bg-accent-2/10 px-3 py-1 text-xs font-medium text-accent-2"
                      >
                        {dir}
                      </li>
                    ))}
                  </ul>
                </Field>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- A labelled field within the journey detail ---------- */

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent-2">
        <span aria-hidden>{icon}</span>
        {label}
      </p>
      <div className="mt-1.5 text-sm">{children}</div>
    </div>
  );
}
