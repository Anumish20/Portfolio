"use client";

/**
 * components/ui/BehindTheScenes.tsx
 * -------------------------------------------------------------------------
 * A live "architecture inspector" — the portfolio's signature, unusual touch.
 *
 * A small dev-mode toggle (bottom-right) opens a devtools-style panel that
 * narrates how the CURRENTLY-VISIBLE section is actually built, and updates
 * as you scroll (IntersectionObserver picks the active section). It turns the
 * site into a self-documenting tour of its own stack — honest, opt-in, and
 * the kind of thing that signals real architecture awareness to an engineer.
 *
 * Notes content lives in lib/data.ts (buildNotes) and describes the real
 * implementation. Toggle with the button, the "I" key, or close with Esc.
 * -------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, X } from "lucide-react";
import { buildNotes } from "@/lib/data";

type Health =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "ok"; latencyMs: number }
  | { state: "error" };

export default function BehindTheScenes() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(buildNotes[0]?.id ?? "");
  const [health, setHealth] = useState<Health>({ state: "idle" });

  // Track which annotated section is in view.
  useEffect(() => {
    const sections = buildNotes
      .map((note) => document.getElementById(note.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Keyboard: "I" toggles (unless typing), Esc closes.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (!typing && event.key.toLowerCase() === "i") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Ping the real DB health endpoint while the panel is open (every 15s).
  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    async function ping() {
      setHealth({ state: "loading" });
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        const data: { status?: string; latencyMs?: number } = await res
          .json()
          .catch(() => ({}));
        if (cancelled) return;
        if (res.ok && data.status === "ok") {
          setHealth({ state: "ok", latencyMs: data.latencyMs ?? 0 });
        } else {
          setHealth({ state: "error" });
        }
      } catch {
        if (!cancelled) setHealth({ state: "error" });
      }
    }

    ping();
    const interval = setInterval(ping, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [open]);

  const active = buildNotes.find((note) => note.id === activeId) ?? buildNotes[0];
  const serverCount = buildNotes.filter((note) => note.kind === "server").length;
  const clientCount = buildNotes.length - serverCount;

  const healthDot =
    health.state === "ok"
      ? "bg-green-500"
      : health.state === "error"
        ? "bg-red-500"
        : "bg-yellow-500 animate-pulse";

  const healthLabel =
    health.state === "ok"
      ? `connected · ${health.latencyMs}ms`
      : health.state === "error"
        ? "unreachable"
        : "pinging…";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 print:hidden">
      {/* Panel */}
      <AnimatePresence>
        {open && active ? (
          <motion.aside
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="region"
            aria-label="Behind the scenes — how this section is built"
            className="w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-surface/90 font-mono text-sm shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-line bg-surface-2/60 px-4 py-2.5">
              <span className="flex items-center gap-2 text-xs text-faint">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                </span>
                behind&nbsp;the&nbsp;scenes
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close inspector"
                className="grid h-6 w-6 place-items-center rounded text-faint transition-colors hover:bg-surface hover:text-fg"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="px-4 py-4">
              <div className="flex items-center gap-2">
                <span className="text-faint">›</span>
                <span className="text-fg">{active.label}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${
                    active.kind === "server"
                      ? "bg-accent/15 text-accent"
                      : "bg-accent-2/15 text-accent-2"
                  }`}
                >
                  {active.kind === "server" ? "RSC" : "Client"}
                </span>
                <span className="ml-auto inline-block h-4 w-1.5 animate-pulse bg-accent-2" aria-hidden />
              </div>

              <ul className="mt-3 space-y-2">
                <AnimatePresence mode="popLayout">
                  {active.notes.map((note) => (
                    <motion.li
                      key={note}
                      layout
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-2 leading-relaxed text-muted"
                    >
                      <span className="select-none text-accent-2">+</span>
                      <span>{note}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {/* Live database health — proves the backend is real */}
              <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-[11px]">
                <span className={`h-2 w-2 rounded-full ${healthDot}`} aria-hidden />
                <span className="text-faint">neon postgres:</span>
                <span
                  className={
                    health.state === "error" ? "text-red-400" : "text-muted"
                  }
                >
                  {healthLabel}
                </span>
                <span className="ml-auto text-faint">live · /api/health</span>
              </div>

              {/* Architecture at a glance — section makeup across the page */}
              <div className="mt-3 flex items-center gap-3 text-[11px] text-faint">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-accent/60" aria-hidden />
                  {serverCount} server
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-accent-2/60" aria-hidden />
                  {clientCount} client
                </span>
                <span className="ml-auto">{buildNotes.length} sections mapped</span>
              </div>

              <p className="mt-2 text-[11px] text-faint">
                Commentary updates as you scroll — everything here is the real
                implementation.
              </p>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-pressed={open}
        title="Inspect how this site is built (press I)"
        className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/90 px-4 py-2 font-mono text-xs text-muted shadow-lg shadow-black/30 backdrop-blur-xl transition-colors hover:border-accent/50 hover:text-fg"
      >
        <Code2 size={14} className="text-accent-2" />
        {open ? "close" : "how it's built"}
        <kbd className="hidden rounded border border-line bg-surface-2 px-1.5 py-0.5 text-[10px] text-faint sm:inline">
          I
        </kbd>
      </button>
    </div>
  );
}
