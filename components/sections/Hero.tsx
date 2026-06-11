"use client";

/**
 * components/sections/Hero.tsx
 * -------------------------------------------------------------------------
 * Above-the-fold introduction (Client Component).
 *  - Ambient animated "aurora" blobs + faint grid for depth (decorative).
 *  - Staggered entrance animation for the headline block.
 *  - A rotating role line (cycles the roles from lib/data.ts) — a small,
 *    memorable touch that stays truthful (only your real roles appear).
 *  - Primary CTAs (view work / contact) and quick social links.
 * -------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import MotionLink from "@/components/ui/MotionLink";
import ThoughtCard from "@/components/ui/ThoughtCard";
import { profile, socials } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/motion";

const socialIcon = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
} as const;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [thoughtsOpen, setThoughtsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((index) => (index + 1) % profile.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-center overflow-hidden px-6 pt-24"
    >
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.35]" />
        <div className="animate-aurora absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="animate-aurora absolute -right-32 top-40 h-[30rem] w-[30rem] rounded-full bg-accent-2/15 blur-[120px] [animation-delay:-9s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-6xl"
      >
        {/* Status */}
        <motion.div variants={staggerItem}>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
            </span>
            {profile.resumeNote}
          </span>
        </motion.div>

        {/* Name — looks normal at rest; on hover it reveals it's a doorway.
            Clicking it unfolds one small thought (ThoughtCard), anchored here. */}
        <motion.div variants={staggerItem} className="relative mt-6">
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            Hi, I&apos;m{" "}
            <button
              type="button"
              onClick={() => setThoughtsOpen((value) => !value)}
              aria-expanded={thoughtsOpen}
              aria-label="Reveal a thought from Anubhuti"
              className="group relative inline-block text-gradient outline-none"
            >
              {profile.name}
              {/* hover/focus-only underline — nothing forced when idle */}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-90 group-focus-visible:scale-x-100 group-focus-visible:opacity-90"
              />
            </button>
            .
          </h1>

          <ThoughtCard open={thoughtsOpen} onClose={() => setThoughtsOpen(false)} />
        </motion.div>

        {/* Rotating role */}
        <motion.div
          variants={staggerItem}
          className="mt-5 flex h-8 items-center gap-3 font-mono text-lg text-muted sm:text-xl"
        >
          <span className="text-faint">{"//"}</span>
          <span className="relative inline-block">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="inline-block text-accent-2"
              >
                {profile.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.p
          variants={staggerItem}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-fg sm:text-xl"
        >
          {profile.headline}
        </motion.p>

        {/* Secondary positioning line */}
        <motion.p
          variants={staggerItem}
          className="mt-3 max-w-2xl text-base leading-relaxed text-muted"
        >
          {profile.subline}
        </motion.p>

        {/* Stack at a glance */}
        <motion.ul
          variants={staggerItem}
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-faint"
        >
          {profile.heroStack.map((tech, index) => (
            <li key={tech} className="flex items-center gap-3">
              {index > 0 ? (
                <span className="text-line" aria-hidden>
                  /
                </span>
              ) : null}
              <span className="transition-colors hover:text-accent-2">{tech}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTAs */}
        <motion.div
          variants={staggerItem}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MotionLink
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg"
          >
            View my work
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </MotionLink>
          <MotionLink
            href={profile.resumeUrl}
            external
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/50 hover:text-accent-2"
          >
            <FileText size={16} />
            Resume
          </MotionLink>
          <MotionLink
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/50 hover:text-accent-2"
          >
            Get in touch
          </MotionLink>

          {/* Social icons */}
          <div className="ml-1 flex items-center gap-2">
            {socials.map((social) => {
              const Icon = socialIcon[social.label as keyof typeof socialIcon];
              if (!Icon) return null;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent/50 hover:text-accent-2"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-faint transition-colors hover:text-accent-2 sm:block"
      >
        <ArrowDown size={20} className="animate-float" />
      </a>
    </section>
  );
}
