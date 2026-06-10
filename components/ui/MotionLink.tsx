"use client";

/**
 * components/ui/MotionLink.tsx
 * -------------------------------------------------------------------------
 * Anchor with tasteful button micro-interactions (Client Component).
 *  - Lifts slightly on hover and depresses on tap (spring-eased).
 *  - Animates transform/opacity only, so it stays GPU-cheap.
 *  - A reusable client "island" so server sections (e.g. Contact) can use
 *    it without becoming client components themselves.
 *  - Honours reduced-motion via the app-wide MotionProvider.
 * -------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { hoverNudge, microSpring, tapScale } from "@/lib/motion";

type MotionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  "aria-label"?: string;
};

export default function MotionLink({
  href,
  children,
  className,
  external = false,
  ...rest
}: MotionLinkProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={hoverNudge}
      whileTap={tapScale}
      transition={microSpring}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
