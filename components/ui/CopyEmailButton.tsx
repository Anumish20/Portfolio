"use client";

/**
 * components/ui/CopyEmailButton.tsx
 * -------------------------------------------------------------------------
 * Secondary contact action (Client Component).
 *  - Copies the email to the clipboard and shows a brief "Copied" state.
 *  - Lives beside the primary mailto button so a recruiter can grab the
 *    address without leaving the page or opening a mail client.
 *  - Gracefully no-ops if the Clipboard API is unavailable.
 * -------------------------------------------------------------------------
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { hoverNudge, microSpring, tapScale } from "@/lib/motion";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context) — fail silently.
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={hoverNudge}
      whileTap={tapScale}
      transition={microSpring}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3.5 text-sm font-semibold text-fg transition-colors hover:border-accent/50 hover:text-accent-2"
    >
      {copied ? (
        <Check size={16} className="text-accent-2" />
      ) : (
        <Copy size={16} />
      )}
      {copied ? "Copied!" : "Copy email"}
    </motion.button>
  );
}
