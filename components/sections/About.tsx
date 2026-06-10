/**
 * components/sections/About.tsx
 * -------------------------------------------------------------------------
 * Narrative bio (Server Component shell + Reveal animation).
 *  - Two-column on desktop: heading on the left, story on the right.
 *  - Copy comes from profile.about (lib/data.ts) — honest, first-person,
 *    no inflated experience claims.
 *  - A compact "currently" card grounds the AI-learning angle.
 * -------------------------------------------------------------------------
 */

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { profile } from "@/lib/data";

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading eyebrow="About" title="A developer who likes to ship." />
          <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
              Currently
            </p>
            <p className="mt-3 text-fg">
              Learning AI engineering through hands-on side projects.
            </p>
            <p className="mt-2 text-sm text-muted">
              Local LLMs, prompt design, and privacy-first AI interfaces.
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
