"use client";

/**
 * components/ui/OpenFieldNotesButton.tsx
 * -------------------------------------------------------------------------
 * A tiny client island that opens the "Field Notes" personal reveal from
 * anywhere on the page (e.g. the About section), so the experience is
 * discoverable without relying on the visitor clicking the navbar brand.
 * Keeps the surrounding section a Server Component.
 * -------------------------------------------------------------------------
 */

import { ArrowUpRight } from "lucide-react";
import { emitUiEvent, UI_EVENT } from "@/lib/ui-events";

export default function OpenFieldNotesButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => emitUiEvent(UI_EVENT.openProfile)}
      className={`group inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition-colors hover:text-accent ${className}`}
    >
      Open my field notes
      <ArrowUpRight
        size={15}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
