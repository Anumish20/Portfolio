"use client";

/**
 * components/sections/BuildStory.tsx  →  "How This Website Was Built"
 * -------------------------------------------------------------------------
 * The meta-project: this portfolio, built human-in-the-loop with Claude Code.
 *
 * An interactive pipeline (Idea → Planning → Claude Code → Iterations →
 * Debugging → PostgreSQL → Deployment). Selecting a phase swaps a detail
 * panel that tells the story AND shows how the prompting/collaboration
 * actually evolved — so the section doubles as evidence of prompt
 * engineering and an AI-first workflow.
 *
 * Data: buildStory (lib/data.ts). Client Component for the selection state;
 * reuses the server-rendered Section/SectionHeading shells for consistency.
 * -------------------------------------------------------------------------
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { buildStory } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BuildStory() {
  const [active, setActive] = useState(0);
  const phase = buildStory[active];

  return (
    <Section id="build">
      <Reveal>
        <SectionHeading
          eyebrow="How this was built"
          title="The site is itself a build story."
          subtitle="This portfolio was built human-in-the-loop with Claude Code — I drove the direction and taste, the model handled scaffolding and the tedious parts. Walk the pipeline; each step shows the process and how the prompting evolved."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,300px)_1fr]">
          {/* Pipeline rail */}
          <ol className="relative flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {buildStory.map((step, index) => {
              const isActive = index === active;
              return (
                <li key={step.phase} className="relative shrink-0 lg:shrink lg:pl-8">
                  {/* Connector line (desktop) */}
                  {index < buildStory.length - 1 ? (
                    <span
                      aria-hidden
                      className={`absolute left-[7px] top-7 hidden h-full w-px lg:block ${
                        index < active ? "bg-accent-2/50" : "bg-line"
                      }`}
                    />
                  ) : null}
                  {/* Node (desktop) */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-3 hidden h-3.5 w-3.5 rounded-full border-2 transition-colors lg:block ${
                      isActive
                        ? "border-accent-2 bg-accent-2 shadow-[0_0_12px_var(--color-accent-2)]"
                        : index < active
                          ? "border-accent-2/60 bg-accent-2/30"
                          : "border-line bg-surface"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-current={isActive ? "step" : undefined}
                    className={`group flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors lg:border-transparent lg:bg-transparent lg:px-2 lg:py-2.5 ${
                      isActive
                        ? "border-accent/40 bg-surface lg:border-transparent"
                        : "border-line bg-surface/60 hover:border-accent/30 lg:hover:bg-surface/60"
                    }`}
                  >
                    <span
                      className={`font-mono text-xs ${isActive ? "text-accent-2" : "text-faint"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`whitespace-nowrap text-sm font-medium transition-colors ${
                        isActive ? "text-fg" : "text-muted group-hover:text-fg"
                      }`}
                    >
                      {step.phase}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Detail panel */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
                  Phase {String(active + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {phase.phase}
                </h3>
                <p className="mt-2 text-base text-muted">{phase.summary}</p>

                <p className="mt-6 leading-relaxed text-muted">{phase.detail}</p>

                {/* Prompt-craft callout */}
                <div className="mt-6 rounded-xl border border-line bg-surface-2/60 p-4">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-accent">
                    <Sparkles size={13} />
                    how the prompting evolved
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg">{phase.craft}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
