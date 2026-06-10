"use client";

/**
 * components/MotionProvider.tsx
 * -------------------------------------------------------------------------
 * App-wide Framer Motion configuration (Client Component).
 *
 * `reducedMotion="user"` makes EVERY motion component respect the OS-level
 * "reduce motion" setting automatically — transform/layout animations are
 * skipped (only opacity remains) without us guarding each component by hand.
 * This keeps the site accessible and lighter on low-power devices.
 *
 * Mounted once in app/layout.tsx around the page content.
 * -------------------------------------------------------------------------
 */

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
