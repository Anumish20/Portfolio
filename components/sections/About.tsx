/**
 * components/sections/About.tsx
 * -------------------------------------------------------------------------
 * Narrative bio (Server Component shell + Reveal animation).
 *  - Two-column on desktop: heading + "currently" + philosophy on the left,
 *    the story and a featured quote on the right.
 *  - Copy comes from lib/data.ts (profile.about, personalProfile, philosophy)
 *    — honest, first-person, no inflated experience claims.
 *  - A small client island links into the deeper "Field Notes" reveal.
 * -------------------------------------------------------------------------
 */

import { Quote } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import OpenFieldNotesButton from "@/components/ui/OpenFieldNotesButton";
import { personalProfile, philosophy, profile } from "@/lib/data";

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <SectionHeading eyebrow="About" title="A developer who likes to ship." />

          {/* Currently — real focus */}
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

          {/* Philosophy — three rules I build by */}
          <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
              Philosophy
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {philosophy.map((rule) => (
                <li
                  key={rule}
                  className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm font-medium text-fg"
                >
                  {rule}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <OpenFieldNotesButton />
            </div>
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

            {/* Featured quote — the thread Anubhuti keeps coming back to */}
            <figure className="relative mt-2 overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-2/10 blur-3xl"
              />
              <Quote size={22} className="text-accent-2" aria-hidden />
              <blockquote className="mt-3 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                <span className="text-gradient">{personalProfile.quote}</span>
              </blockquote>
              <figcaption className="mt-4 text-sm leading-relaxed text-muted">
                {personalProfile.quoteReflection}
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
