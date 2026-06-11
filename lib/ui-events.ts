/**
 * lib/ui-events.ts
 * -------------------------------------------------------------------------
 * A tiny, typed window-event bus for app-wide overlays.
 *
 * The Navbar lives in a different part of the tree from the overlays it
 * opens (ProfileReveal, RecruiterMode). Rather than thread a context
 * provider across the server/client boundary, triggers `emit()` a named
 * event and the overlays `onUiEvent()` subscribe. Decoupled, SSR-safe, and
 * trivial to extend with new overlays.
 * -------------------------------------------------------------------------
 */

export const UI_EVENT = {
  openProfile: "ui:open-profile",
  openRecruiter: "ui:open-recruiter",
} as const;

export type UiEventName = (typeof UI_EVENT)[keyof typeof UI_EVENT];

/** Fire a UI event (no-op during SSR). */
export function emitUiEvent(name: UiEventName): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(name));
}

/** Subscribe to a UI event; returns an unsubscribe function. */
export function onUiEvent(name: UiEventName, handler: () => void): () => void {
  window.addEventListener(name, handler);
  return () => window.removeEventListener(name, handler);
}
