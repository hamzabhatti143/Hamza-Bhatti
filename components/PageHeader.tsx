// Consistent page header (eyebrow + display title + lead) used across the new
// routes so they match the homepage's typographic rhythm.
export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
        {eyebrow}
      </p>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-stone-900 dark:text-ink-50">
        {title}
      </h1>
      {lead && (
        <p className="font-body text-lg md:text-xl font-light text-stone-600 dark:text-ink-300 mt-6 leading-relaxed">
          {lead}
        </p>
      )}
    </header>
  );
}
