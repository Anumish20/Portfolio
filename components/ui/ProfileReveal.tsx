"use client";

/**
 * components/ui/ProfileReveal.tsx
 * -------------------------------------------------------------------------
 * The clickable-name experience — opened by tapping the brand in the navbar
 * (or "Open my field notes" in About).
 *
 * Deliberately NOT an About card. It's a premium side drawer that slides in
 * like a discovered "hidden profile": the anchor quote up top, then sections
 * (obsessions → learning → how I think → reading → hobbies → dream →
 * philosophy) that reveal in sequence with a tasteful stagger.
 *
 * Single source of truth: pulls personalProfile/philosophy plus the page's
 * own `interests` (hobbies) and `readingInterests`, so nothing drifts.
 *
 * Structure: the drawer is a child that only mounts while open, so every
 * open replays the reveal from the top. Scroll-lock + Esc via useOverlay();
 * reduced-motion is handled globally by MotionProvider.
 * -------------------------------------------------------------------------
 */

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Bug,
  Gamepad2,
  Lightbulb,
  Quote,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import {
  interests,
  personalProfile,
  philosophy,
  profile,
  readingInterests,
} from "@/lib/data";
import { emitUiEvent, UI_EVENT } from "@/lib/ui-events";
import { useOverlay } from "@/lib/useOverlay";

/** Deep-link hash that opens the drawer (also a reliable manual test handle). */
const PROFILE_HASH = "#field-notes";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function ProfileReveal() {
  const { open, close } = useOverlay(UI_EVENT.openProfile);

  // Deep-link support: visiting /#field-notes (or changing the hash) opens the
  // drawer. Emitting the event — rather than calling setState here — keeps the
  // single open-path and avoids setState-in-effect. A reliable way to open it
  // even if a click is ever missed.
  useEffect(() => {
    function syncFromHash() {
      if (window.location.hash === PROFILE_HASH) emitUiEvent(UI_EVENT.openProfile);
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function handleClose() {
    // Clear the deep-link hash on close so it doesn't re-open on refresh.
    if (window.location.hash === PROFILE_HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    close();
  }

  return (
    <AnimatePresence>
      {open ? <ProfileDrawer onClose={handleClose} /> : null}
    </AnimatePresence>
  );
}

/* ---------- Drawer (fresh mount per open) ---------- */

function ProfileDrawer({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLElement>(null);

  // Move focus into the dialog on open (DOM side-effect only).
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] print:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Anubhuti Mishra — personal profile"
    >
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close profile"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 cursor-default bg-bg/70 backdrop-blur-md"
      />

      {/* Drawer panel */}
      <motion.aside
        ref={panelRef}
        tabIndex={-1}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-surface shadow-2xl shadow-black/60 outline-none"
      >
        {/* Ambient accent glow (decorative) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-aurora absolute -right-24 -top-16 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />
          <div className="animate-aurora absolute -left-16 top-1/2 h-60 w-60 rounded-full bg-accent-2/10 blur-[100px] [animation-delay:-9s]" />
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-line px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 font-mono text-sm font-semibold text-gradient">
              {profile.initials}
            </span>
            <div>
              <p className="text-sm font-semibold text-fg">{profile.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-2">
                the person behind the code
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="grid h-8 w-8 place-items-center rounded-md text-faint transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable, progressively-revealed body */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative flex-1 space-y-7 overflow-y-auto px-6 py-7"
        >
          {/* Quote — the anchor */}
          <motion.figure variants={item}>
            <Quote size={22} className="text-accent-2" aria-hidden />
            <blockquote className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
              <span className="text-gradient">{personalProfile.quote}</span>
            </blockquote>
            <figcaption className="mt-3 text-sm leading-relaxed text-muted">
              {personalProfile.quoteReflection}
            </figcaption>
          </motion.figure>

          <motion.span variants={item} className="block h-px w-full bg-line" aria-hidden />

          {/* Current obsessions */}
          <Block icon={<Sparkles size={14} />} label="Current obsessions">
            <ChipRow items={personalProfile.obsessions} accent />
          </Block>

          {/* Currently learning */}
          <Block icon={<Target size={14} />} label="Currently learning">
            <ChipRow items={personalProfile.learning} />
          </Block>

          {/* Why I enjoy debugging */}
          <Block icon={<Bug size={14} />} label="Why I enjoy debugging">
            <p className="leading-relaxed text-muted">{personalProfile.mindset}</p>
          </Block>

          {/* Reading */}
          <Block icon={<BookOpen size={14} />} label="Reading interests">
            <ChipRow items={readingInterests} />
          </Block>

          {/* Hobbies */}
          <Block icon={<Gamepad2 size={14} />} label="Hobbies">
            <ChipRow items={interests.map((h) => h.title)} />
          </Block>

          {/* Dream project */}
          <Block icon={<Sparkles size={14} />} label="Dream project">
            <p className="rounded-xl border border-accent/20 bg-accent/5 p-4 leading-relaxed text-fg">
              {personalProfile.dreamProject}
            </p>
          </Block>

          {/* Fun facts */}
          <Block icon={<Lightbulb size={14} />} label="Fun facts">
            <ul className="space-y-2.5">
              {personalProfile.funFacts.map((fact) => (
                <li key={fact} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </Block>

          {/* Philosophy */}
          <Block icon={<Brain size={14} />} label="Philosophy">
            <ul className="space-y-1.5">
              {philosophy.map((rule, i) => (
                <li key={rule} className="flex items-center gap-2.5 text-base font-medium text-fg">
                  <span className="font-mono text-xs text-accent-2">{`0${i + 1}`}</span>
                  {rule}
                </li>
              ))}
            </ul>
          </Block>

          {/* a quiet sign-off */}
          <motion.p variants={item} className="pt-2 font-mono text-[11px] text-faint">
            {"// stay curious — that's the whole thing."}
          </motion.p>
        </motion.div>
      </motion.aside>
    </div>
  );
}

/* ---------- Building blocks ---------- */

function Block({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section variants={item}>
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-2">
        <span aria-hidden>{icon}</span>
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </motion.section>
  );
}

function ChipRow({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((text) => (
        <li
          key={text}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
            accent
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-line bg-surface-2 text-muted hover:border-accent/40 hover:text-fg"
          }`}
        >
          {text}
        </li>
      ))}
    </ul>
  );
}
