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
import { interests } from "@/lib/data";
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
    </Section>
  );
}
