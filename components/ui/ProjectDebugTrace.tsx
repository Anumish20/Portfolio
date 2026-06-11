"use client";

/**
 * components/ui/ProjectDebugTrace.tsx
 * -------------------------------------------------------------------------
 * Turns a project from "here's what I built" into "here's how I think when
 * something's hard". Instead of dumping the engineering story, it stays
 * folded as an invitation — "follow the debugging trace" — and reveals,
 * step by step, the challenge → how it was traced → the insight.
 *
 * This is the section that answers the mentor's "they should understand how I
 * solve problems": the visitor doesn't read it, they UNCOVER it. Opening one
 * also marks the matching discovery on the Curiosity Trail.
 *
 * Content is a real, honest `debug` object from lib/data.ts. Client Component
 * for the reveal state; reduced motion handled globally by MotionProvider.
 * -------------------------------------------------------------------------
 */

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bug, ChevronRight, Lightbulb, Search, Terminal } from "lucide-react";
import type { Project } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  { key: "challenge" as const, icon: Bug, label: "The hard part" },
  { key: "trace" as const, icon: Search, label: "How I traced it" },
  { key: "insight" as const, icon: Lightbulb, label: "What clicked" },
];

export default function ProjectDebugTrace({ debug }: { debug: Project["debug"] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  function toggle() {
    setOpen((v) => !v);
  }

  return (
    <div className="mt-7 rounded-2xl border border-line bg-surface-2/40 p-1">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-surface-2/70"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent-2/30 bg-accent-2/10 text-accent-2">
          <Terminal size={15} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-fg">
            {open ? "The debugging trace" : "Follow the debugging trace"}
          </span>
          <span className="block text-xs text-muted">
            {open ? "the part I actually enjoyed" : "the hard part, and how I chased it down"}
          </span>
        </span>
        <ChevronRight
          size={18}
          className={`shrink-0 text-faint transition-transform group-hover:text-accent-2 ${
            open ? "rotate-90" : ""
          }`}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="trace"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <ol className="space-y-0 px-4 pb-4 pt-1">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                return (
                  <motion.li
                    key={step.key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: EASE, delay: 0.06 + index * 0.1 }}
                    className="relative flex gap-3.5 pb-5 last:pb-0"
                  >
                    {!isLast ? (
                      <span
                        aria-hidden
                        className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-line"
                      />
                    ) : null}
                    <span
                      className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border ${
                        isLast
                          ? "border-accent-2/40 bg-accent-2/15 text-accent-2"
                          : "border-line bg-surface text-muted"
                      }`}
                    >
                      <Icon size={14} />
                    </span>
                    <span className="min-w-0 pt-1">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-accent-2">
                        {step.label}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">
                        {debug[step.key]}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ol>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
