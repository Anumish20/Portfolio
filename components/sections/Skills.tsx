/**
 * components/sections/Skills.tsx  ("Developer DNA")
 * -------------------------------------------------------------------------
 * Skills, reframed as honest tiers instead of generic proficiency bars
 * (Server Component + Reveal).
 *
 * Three tiers — Build with daily / Reach for / Actively learning — signal
 * self-awareness: a recruiter instantly sees what you're fluent in versus
 * what you're still growing into. No percentages, no fabricated mastery.
 *
 * Visual identity comes from a unified bordered panel, a per-tier accent
 * marker, and token styling that gets quieter as the tier moves from
 * "daily" to "learning" (dashed = in progress).
 *
 * Data: developerDna (lib/data.ts).
 * -------------------------------------------------------------------------
 */

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import DeveloperJourney from "@/components/ui/DeveloperJourney";
import { developerDna, type DnaTier } from "@/lib/data";

const tierConfig: Record<
  DnaTier["level"],
  { dot: string; token: string }
> = {
  core: {
    dot: "bg-accent-2 shadow-[0_0_12px_var(--color-accent-2)]",
    token:
      "border-line bg-surface-2 text-fg hover:border-accent/50 hover:text-accent-2",
  },
  reach: {
    dot: "bg-accent",
    token: "border-line bg-surface text-muted hover:border-accent/40 hover:text-fg",
  },
  learning: {
    dot: "border border-accent-2 bg-transparent",
    token:
      "border-dashed border-accent-2/40 bg-accent-2/5 text-accent-2 hover:bg-accent-2/10",
  },
};

export default function Skills() {
  return (
    <Section id="skills">
      <Reveal>
        <SectionHeading
          eyebrow="Developer DNA"
          title="The stack behind my work."
          subtitle="Less a checklist, more an honest map of where I'm fluent and where I'm still growing — grouped by how I actually use each tool."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {developerDna.map((tier, index) => {
            const config = tierConfig[tier.level];
            return (
              <div
                key={tier.label}
                className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[280px_1fr]"
              >
                {/* Tier label */}
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={`h-2.5 w-2.5 rounded-full ${config.dot}`}
                    />
                    <span className="font-mono text-xs text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-semibold text-fg">
                      {tier.label}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                    {tier.caption}
                  </p>
                </div>

                {/* Tier tokens */}
                <div className="flex flex-wrap content-start gap-2.5">
                  {tier.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${config.token}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Developer Journey — how curiosity drove the path from HTML to AI. */}
      <Reveal delay={0.1} className="mt-6">
        <DeveloperJourney />
      </Reveal>
    </Section>
  );
}
