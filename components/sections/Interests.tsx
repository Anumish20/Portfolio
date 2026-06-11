"use client";

/**
 * components/sections/Interests.tsx
 * -------------------------------------------------------------------------
 * "Beyond the code" interests (Client Component + Reveal).
 *  - Humanises the portfolio; recruiters remember people, not just stacks.
 *  - Simple responsive grid of small cards, each a real hobby with a short,
 *    genuine one-liner (no clichés, no padding).
 *  - Cards lift gently on hover to match the project/skill cards.
 * Data: interests (lib/data.ts).
 * -------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { interests, readingInterests } from "@/lib/data";
import { hoverLift, microSpring } from "@/lib/motion";

export default function Interests() {
  return (
    <Section id="interests">
      <Reveal>
        <SectionHeading
          eyebrow="Beyond the code"
          title="What keeps me curious."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {interests.map((interest, index) => (
          <Reveal key={interest.title} delay={index * 0.06}>
            <motion.div
              whileHover={hoverLift}
              transition={microSpring}
              className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <h3 className="text-base font-semibold text-fg">
                {interest.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {interest.description}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* What I read — long-form is where most of the thinking starts. */}
      <Reveal delay={0.1} className="mt-6">
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
            On my reading list
          </p>
          <p className="mt-2 text-sm text-muted">
            Long-form across fiction and non-fiction — most of my ideas start here.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {readingInterests.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-fg"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
