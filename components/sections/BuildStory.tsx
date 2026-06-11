"use client";

/**
 * components/sections/BuildStory.tsx  →  "Behind the Build"
 * -------------------------------------------------------------------------
 * The meta-project: this portfolio, built human-in-the-loop with Claude Code.
 *
 * Answers one question — "how does Anubhuti build software?" — not "how to use
 * Next.js". A rail of stages (Idea → Planning → Claude Code → Iteration →
 * Debugging → PostgreSQL → Deployment); selecting one swaps a deliberately
 * TIGHT panel: Problem → Decision → Outcome, plus an explicit human-in-the-loop
 * split so it's obvious the AI accelerated the work while the judgment stayed
 * mine. Scannable in under a minute by design — no documentation, no dump.
 *
 * Data: buildStory (lib/data.ts). Client Component for the selection state.
 * -------------------------------------------------------------------------
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Compass, HelpCircle, Terminal } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { buildStory, profile } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BuildStory() {
  const [active, setActive] = useState(0);
  const phase = buildStory[active];

  return (
    <Section id="build">
      <Reveal>
        <SectionHeading
          eyebrow="Behind the build"
          title="How I actually build software."
          subtitle="This whole site, built human-in-the-loop with Claude Code. Each stage is one problem, the call I made, and what shipped — plus who did what. I set the direction and the taste; the AI moved faster on the parts that aren't the thinking."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,260px)_1fr]">
          {/* Stage rail */}
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
                  Stage {String(active + 1).padStart(2, "0")} / {String(buildStory.length).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {phase.phase}
                </h3>

                {/* Problem → Decision → Outcome — a tight, scannable spec */}
                <dl className="mt-6 overflow-hidden rounded-xl border border-line">
                  <SpecRow
                    icon={<HelpCircle size={13} />}
                    label="Problem"
                    tone="text-faint"
                  >
                    <span className="text-muted">{phase.problem}</span>
                  </SpecRow>
                  <SpecRow
                    icon={<Compass size={13} />}
                    label="Decision"
                    tone="text-accent"
                    divider
                  >
                    <span className="text-fg">{phase.decision}</span>
                  </SpecRow>
                  <SpecRow
                    icon={<Check size={13} />}
                    label="Outcome"
                    tone="text-accent-2"
                    divider
                  >
                    <span className="font-medium text-fg">{phase.outcome}</span>
                  </SpecRow>
                </dl>

                {/* Human-in-the-loop — who did what, made explicit */}
                <div className="mt-6 rounded-xl border border-line bg-surface-2/50 p-4 sm:p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-2">
                    Human-in-the-loop
                  </p>
                  <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
                    <Role
                      badge={
                        <span className="inline-flex items-center gap-1.5">
                          <Terminal size={12} />
                          Claude Code
                        </span>
                      }
                    >
                      {phase.loop.ai}
                    </Role>
                    <Role
                      badge={
                        <span className="inline-flex items-center gap-1.5">
                          <span className="font-mono text-[10px] tracking-tight">
                            {profile.initials}
                          </span>
                          {profile.name.split(" ")[0]}
                        </span>
                      }
                      mine
                    >
                      {phase.loop.me}
                    </Role>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- A labelled Problem/Decision/Outcome row ---------- */

function SpecRow({
  icon,
  label,
  tone,
  divider = false,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  tone: string;
  divider?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-3.5 sm:px-5 ${
        divider ? "border-t border-line" : ""
      }`}
    >
      <dt className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider ${tone}`}>
        <span aria-hidden>{icon}</span>
        {label}
      </dt>
      <dd className="text-sm leading-relaxed">{children}</dd>
    </div>
  );
}

/* ---------- One side of the human-in-the-loop split ---------- */

function Role({
  badge,
  mine = false,
  children,
}: {
  badge: React.ReactNode;
  mine?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-line bg-bg/40 p-3">
      <span
        className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-[11px] ${
          mine
            ? "border-accent/30 bg-accent/10 text-accent"
            : "border-accent-2/30 bg-accent-2/10 text-accent-2"
        }`}
      >
        {badge}
      </span>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}
