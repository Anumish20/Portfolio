/**
 * components/sections/About.tsx
 * -------------------------------------------------------------------------
 * Narrative bio (Server Component shell + Reveal animation).
 *  - Left: heading + a single "Currently" focus card.
 *  - Right: the first-person story — honest, no inflated experience claims.
 *
 * Deliberately restrained: the quote, the philosophy, and the deeper
 * personality live in the clickable-name reveal, so they're DISCOVERED
 * rather than shown twice. About stays a calm, professional introduction.
 * Copy comes from lib/data.ts (profile.about).
 * -------------------------------------------------------------------------
 */

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { profile } from "@/lib/data";

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <SectionHeading eyebrow="About" title="A developer who likes to ship." />

          {/* Currently — real, current focus */}
          <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
              Currently
            </p>
            <p className="mt-3 text-fg">
              Going deep on AI engineering and agentic systems.
            </p>
            <p className="mt-2 text-sm text-muted">
              Local LLMs (Ollama), prompt design, and building with Claude Code.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6">
            {profile.about.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed text-muted [&>strong]:text-fg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
