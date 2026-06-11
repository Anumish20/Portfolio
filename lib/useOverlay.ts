/**
 * lib/useOverlay.ts
 * -------------------------------------------------------------------------
 * Shared behaviour for full-screen overlays (ProfileReveal, RecruiterMode):
 *  - Opens when its UI event fires (see lib/ui-events.ts).
 *  - Closes on Escape.
 *  - Locks body scroll while open and restores it on close/unmount.
 * Keeps both overlays consistent and accessible without duplicated effects.
 * -------------------------------------------------------------------------
 */

import { useCallback, useEffect, useState } from "react";
import { onUiEvent, type UiEventName } from "@/lib/ui-events";

export function useOverlay(openEvent: UiEventName) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Open when the corresponding UI event is emitted (e.g. from the navbar).
  useEffect(() => onUiEvent(openEvent, () => setOpen(true)), [openEvent]);

  // While open: Escape closes, and body scroll is locked.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return { open, setOpen, close };
}
