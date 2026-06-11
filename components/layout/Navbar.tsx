"use client";

/**
 * components/layout/Navbar.tsx
 * -------------------------------------------------------------------------
 * Sticky top navigation (Client Component).
 *  - Gains a glassy background + hairline once the user scrolls past the top.
 *  - Scroll-spy: highlights the nav link for the section currently in view,
 *    implemented with IntersectionObserver (no scroll-event thrashing).
 *  - Responsive: collapses into an animated mobile sheet under `md`.
 * Content comes from lib/data.ts (navItems / profile).
 * -------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { navItems, profile } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Reading-progress bar: smooth the raw scroll value with a spring so the
  // bar glides rather than jitters.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Background change on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy via IntersectionObserver.
  useEffect(() => {
    const ids = navItems.map((item) => item.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu links live inside an AnimatePresence sheet that unmounts on
  // tap. Relying on the anchor's default hash-scroll races that unmount, and
  // mobile browsers cancel the in-flight smooth scroll when the tapped element
  // animates away — so the link appears dead. Fix: scroll the target ourselves
  // (owned by the document, not the disappearing anchor), THEN close the sheet.
  // scrollIntoView() with no args honours the CSS scroll-behavior + scroll-mt
  // offset and respects prefers-reduced-motion, matching the desktop links.
  function handleMobileNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (!href.startsWith("#")) return; // external links (e.g. Resume) behave normally
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView();
    history.replaceState(null, "", href); // keep the URL/hash in sync, no extra jump
    setOpen(false);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        {/* No brand mark by design — the name lives once, in the hero, and is
            the single trigger for the personal-profile discovery. */}

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {/* Sliding pill shared across links via layoutId */}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent-2"
          >
            <FileText size={15} />
            Resume
          </a>
          <a
            href="#contact"
            className="inline-flex rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent-2"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-fg md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => handleMobileNavClick(event, item.href)}
                    className={`block rounded-lg px-3 py-3 text-base transition-colors ${
                      active === item.href
                        ? "bg-surface text-fg"
                        : "text-muted hover:bg-surface hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-1 flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-3 text-base font-medium text-fg"
                >
                  <FileText size={17} />
                  Resume
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(event) => handleMobileNavClick(event, "#contact")}
                  className="block rounded-lg border border-accent/30 bg-accent/10 px-3 py-3 text-base font-medium text-accent"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Reading-progress bar, pinned to the bottom edge of the nav row */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute left-0 top-16 h-px w-full origin-left bg-gradient-to-r from-accent via-accent-2 to-accent"
      />
    </motion.header>
  );
}
