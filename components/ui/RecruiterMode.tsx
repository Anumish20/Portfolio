"use client";

/**
 * components/ui/RecruiterMode.tsx
 * -------------------------------------------------------------------------
 * "Recruiter Mode" — a focused overlay that lets a recruiter evaluate
 * Anubhuti in ~60 seconds: the pitch, the stack (grouped), AI experience,
 * shipped projects with live/code links, and one-tap actions (resume,
 * email, LinkedIn, GitHub).
 *
 * Opened from the navbar via the UI event bus. Respects scroll-lock + Esc
 * through useOverlay(); reduced-motion handled globally by MotionProvider.
 * -------------------------------------------------------------------------
 */

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FileText, Gauge, Mail, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile, projects, recruiterBrief, socials } from "@/lib/data";
import { UI_EVENT } from "@/lib/ui-events";
import { useOverlay } from "@/lib/useOverlay";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RecruiterMode() {
  const { open, close } = useOverlay(UI_EVENT.openRecruiter);

  const github = socials.find((s) => s.label === "GitHub");
  const linkedin = socials.find((s) => s.label === "LinkedIn");

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="recruiter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto px-4 py-6 sm:py-12 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Recruiter mode — 60-second brief"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="fixed inset-0 cursor-default bg-bg/80 backdrop-blur-md"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line bg-surface-2/50 px-6 py-4">
              <span className="inline-flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                  <Gauge size={16} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-fg">Recruiter Mode</span>
                  <span className="block font-mono text-[11px] text-faint">evaluate in ~60 seconds</span>
                </span>
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close recruiter mode"
                className="grid h-8 w-8 place-items-center rounded-md text-faint transition-colors hover:bg-surface hover:text-fg"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-7 px-6 py-6 sm:px-8">
              {/* Pitch */}
              <p className="text-lg leading-relaxed text-fg">{recruiterBrief.pitch}</p>

              {/* Quick facts */}
              <div className="grid gap-3 sm:grid-cols-3">
                <Fact label="Role" value={profile.roles[0]} />
                <Fact label="Focus" value="AI engineering" />
                <Fact label="Availability" value="Open to roles" />
              </div>

              {/* Tech stack — grouped */}
              <Block title="Stack">
                <div className="grid gap-4 sm:grid-cols-2">
                  {Object.entries(recruiterBrief.stack).map(([group, items]) => (
                    <div key={group}>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-accent-2">
                        {group}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {items.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-line bg-surface-2 px-2 py-1 text-xs text-muted"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Block>

              {/* AI experience */}
              <Block title="AI experience">
                <ul className="space-y-2">
                  {recruiterBrief.ai.map((line) => (
                    <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              {/* Projects */}
              <Block title="Shipped projects">
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.name}
                      className="rounded-xl border border-line bg-surface-2/50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-fg">{project.name}</p>
                          <p className="mt-0.5 text-xs text-muted">{project.tagline}</p>
                        </div>
                        <span className="shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
                          {project.domain}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent-2"
                          >
                            {link.label}
                            <ArrowUpRight size={12} />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Block>
            </div>

            {/* Sticky actions */}
            <div className="flex flex-wrap items-center gap-2.5 border-t border-line bg-surface-2/50 px-6 py-4 sm:px-8">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
              >
                <FileText size={15} />
                Resume
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent-2"
              >
                <Mail size={15} />
                Email
              </a>
              {linkedin ? (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent/50 hover:text-accent-2"
                >
                  <LinkedinIcon size={16} />
                </a>
              ) : null}
              {github ? (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent/50 hover:text-accent-2"
                >
                  <GithubIcon size={16} />
                </a>
              ) : null}
              <span className="ml-auto hidden font-mono text-[10px] text-faint sm:block">
                Esc to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ---------- Small building blocks ---------- */

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface-2/50 px-4 py-3">
      <p className="font-mono text-[11px] uppercase tracking-wider text-faint">{label}</p>
      <p className="mt-1 text-sm font-medium text-fg">{value}</p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
        <span className="h-px w-5 bg-accent-2/60" aria-hidden />
        {title}
      </h3>
      {children}
    </section>
  );
}
