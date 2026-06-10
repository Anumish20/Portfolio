/**
 * components/ui/SectionHeading.tsx
 * -------------------------------------------------------------------------
 * Reusable heading block: a small mono "eyebrow" label, the section title,
 * and an optional supporting line. Gives every section the same typographic
 * signature. Server Component (presentational only).
 * -------------------------------------------------------------------------
 */

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
        <span className="h-px w-6 bg-accent-2/60" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
