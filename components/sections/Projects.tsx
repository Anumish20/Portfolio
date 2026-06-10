/**
 * components/sections/Projects.tsx
 * -------------------------------------------------------------------------
 * Featured projects (Server Component + Reveal).
 *
 * Each project is a full-width "case study" card that tells a story:
 *   header → summary → problem → what I built (highlights) →
 *   how it works (data-flow pipeline) → stack → what I learned → links.
 *
 * This structure is deliberate: it makes the *engineering thinking* visible
 * (APIs, data flow, deployment, local LLM inference) without inventing
 * metrics or achievements. Status + links stay strictly truthful — a live
 * project links out; an in-progress one says so.
 *
 * Data: projects (lib/data.ts).
 * -------------------------------------------------------------------------
 */

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built and broken."
          subtitle="Two real, end-to-end builds — both live. Here's the thinking behind each, not just the tech list."
        />
      </Reveal>

      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.05}>
            <SpotlightCard>
              <article className="p-7 sm:p-9">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-accent">
                        {project.domain}
                      </span>
                      <span className="text-faint">{project.role}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-fg sm:text-3xl">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-accent-2">
                      {project.tagline}
                    </p>
                  </div>

                  {project.status === "live" ? (
                    <Pill variant="status" dot className="shrink-0">
                      Live
                    </Pill>
                  ) : (
                    <span className="shrink-0 rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-faint">
                      In progress
                    </span>
                  )}
                </div>

                {/* Lead summary */}
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-fg">
                  {project.summary}
                </p>

                {/* Story + technical panel */}
                <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                  {/* Left: narrative */}
                  <div>
                    <p className="leading-relaxed text-muted">
                      {project.problem}
                    </p>

                    <p className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
                      What I built
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex gap-3 text-muted">
                          <Check
                            size={18}
                            className="mt-0.5 shrink-0 text-accent-2"
                            aria-hidden
                          />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-7 border-l-2 border-accent/40 pl-4 leading-relaxed text-muted">
                      {project.learnings}
                    </p>
                  </div>

                  {/* Right: how it works + stack */}
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-line bg-surface-2/60 p-5 backdrop-blur-sm">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
                        How it works
                      </p>
                      <ol className="mt-4 space-y-0">
                        {project.flow.map((step, stepIndex) => (
                          <li key={step} className="relative flex gap-3 pb-5 last:pb-0">
                            {/* connecting line */}
                            {stepIndex < project.flow.length - 1 ? (
                              <span
                                aria-hidden
                                className="absolute left-[7px] top-4 h-full w-px bg-line"
                              />
                            ) : null}
                            <span
                              aria-hidden
                              className="relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border border-accent/50 bg-bg"
                            >
                              <span className="absolute inset-1 rounded-full bg-accent-2" />
                            </span>
                            <span className="font-mono text-sm text-fg">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
                        Stack
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <Pill key={tech}>{tech}</Pill>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="mt-8 border-t border-line pt-6">
                  {project.links.length > 0 ? (
                    <div className="flex flex-wrap gap-5">
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent-2"
                        >
                          {link.kind === "repo" ? (
                            <GithubIcon size={16} />
                          ) : null}
                          {link.label}
                          {link.kind === "live" ? (
                            <ArrowUpRight
                              size={15}
                              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          ) : null}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-faint">
                      A learning sandbox — code &amp; write-up coming soon.
                    </p>
                  )}
                </div>
              </article>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
