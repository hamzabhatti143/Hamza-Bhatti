// Two redesigned homepage feature bands with bespoke, theme-aware SVG artwork.
// Neutral line-work uses currentColor (set per-wrapper so it adapts to light/dark);
// the gold accent (#c8a96e) is identical in both themes. No raster images or JS.

const CheckIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0 text-accent mt-0.5">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 space-y-3" role="list">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 font-body text-sm md:text-base text-stone-600 dark:text-ink-300">
          <CheckIcon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Artwork: browser window + performance gauge ── */
function FrontendArt() {
  return (
    <div className="relative text-stone-300 dark:text-ink-700">
      {/* soft accent glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(200,169,110,0.10), transparent 70%)" }} />
      <svg viewBox="0 0 400 300" className="w-full h-auto" role="img" aria-label="A browser window with a 98 out of 100 performance score">
        {/* browser window */}
        <rect x="24" y="30" width="352" height="222" rx="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* chrome bar */}
        <line x1="24" y1="62" x2="376" y2="62" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="44" cy="46" r="4" fill="#c8a96e" />
        <circle cx="60" cy="46" r="4" fill="currentColor" />
        <circle cx="76" cy="46" r="4" fill="currentColor" />
        <rect x="150" y="40" width="180" height="12" rx="6" fill="currentColor" opacity="0.4" />
        {/* content skeleton */}
        <rect x="48" y="86" width="150" height="10" rx="5" fill="#c8a96e" opacity="0.85" />
        <rect x="48" y="108" width="120" height="8" rx="4" fill="currentColor" opacity="0.6" />
        <rect x="48" y="126" width="140" height="8" rx="4" fill="currentColor" opacity="0.45" />
        <rect x="48" y="160" width="92" height="34" rx="8" fill="none" stroke="#c8a96e" strokeWidth="1.5" />
        <rect x="48" y="210" width="150" height="8" rx="4" fill="currentColor" opacity="0.35" />
        <rect x="48" y="226" width="110" height="8" rx="4" fill="currentColor" opacity="0.28" />
        {/* performance gauge */}
        <g transform="translate(300 180)">
          <circle r="46" fill="none" stroke="currentColor" strokeWidth="6" opacity="0.35" />
          <circle r="46" fill="none" stroke="#c8a96e" strokeWidth="6" strokeLinecap="round"
            strokeDasharray="289" strokeDashoffset="6" transform="rotate(-90)" />
          <text x="0" y="4" textAnchor="middle" fontFamily="var(--font-space-mono), monospace" fontSize="30" fontWeight="700" fill="#c8a96e">98</text>
          <text x="0" y="24" textAnchor="middle" fontFamily="var(--font-space-mono), monospace" fontSize="9" fill="currentColor">PERF</text>
        </g>
      </svg>
    </div>
  );
}

/* ── Artwork: agent + connected tool nodes ── */
function AgentArt() {
  const nodes = [
    { x: 70, y: 70, label: "Tools" },
    { x: 330, y: 66, label: "RAG" },
    { x: 64, y: 226, label: "APIs" },
    { x: 336, y: 232, label: "Data" },
  ];
  return (
    <div className="relative text-stone-300 dark:text-ink-700">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(200,169,110,0.10), transparent 70%)" }} />
      <svg viewBox="0 0 400 300" className="w-full h-auto" role="img" aria-label="A central AI agent connected to tools, RAG, APIs, and data">
        {/* connecting lines */}
        {nodes.map((n) => (
          <line key={n.label} x1="200" y1="150" x2={n.x} y2={n.y} stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.6" />
        ))}
        {/* orbit ring */}
        <circle cx="200" cy="150" r="66" fill="none" stroke="#c8a96e" strokeWidth="1" opacity="0.25" />
        {/* satellite nodes */}
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="26" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="var(--font-space-mono), monospace" fontSize="11" fill="currentColor">{n.label}</text>
          </g>
        ))}
        {/* central agent core */}
        <circle cx="200" cy="150" r="42" fill="none" stroke="#c8a96e" strokeWidth="2" />
        <circle cx="200" cy="150" r="42" fill="#c8a96e" opacity="0.08" />
        <text x="200" y="146" textAnchor="middle" fontFamily="var(--font-space-mono), monospace" fontSize="13" fontWeight="700" fill="#c8a96e">AGENT</text>
        <text x="200" y="164" textAnchor="middle" fontFamily="var(--font-space-mono), monospace" fontSize="9" fill="currentColor">reason · act</text>
      </svg>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-5 flex items-center gap-3">
      <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
      {children}
    </p>
  );
}

export function ReliableFrontend() {
  return (
    <section aria-labelledby="reliable-heading" className="py-14 md:py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <Eyebrow>Reliability</Eyebrow>
          <h2 id="reliable-heading" className="font-display text-3xl md:text-4xl font-bold text-stone-900 dark:text-ink-50 leading-tight">
            What Makes Me a Reliable Frontend Developer?
          </h2>
          <p className="font-body text-base md:text-lg text-stone-600 dark:text-ink-300 leading-relaxed mt-5">
            I&apos;m Hamza Bhatti, and to me &ldquo;reliable&rdquo; means the work holds
            up long after launch. I pair carefully crafted, responsive interfaces with
            typed, tested code — and I sweat the details most developers skip, so what
            I ship stays fast, accessible, and dependable.
          </p>
          <FeatureList
            items={[
              "Responsive, accessible UI that works down to 375px",
              "Core Web Vitals in the green — LCP under 2.5s",
              "Strongly-typed, maintainable TypeScript",
              "Tested and reviewed before it ever ships",
            ]}
          />
        </div>
        <div className="md:pl-4">
          <FrontendArt />
        </div>
      </div>
    </section>
  );
}

export function AgenticAI() {
  return (
    <section aria-labelledby="agentic-heading" className="py-14 md:py-20 px-6 md:px-10 bg-stone-50/70 dark:bg-ink-950/40 border-y border-stone-200/70 dark:border-ink-900">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Graphic first on desktop, second on mobile */}
        <div className="order-2 md:order-1 md:pr-4">
          <AgentArt />
        </div>
        <div className="order-1 md:order-2">
          <Eyebrow>Agentic AI</Eyebrow>
          <h2 id="agentic-heading" className="font-display text-3xl md:text-4xl font-bold text-stone-900 dark:text-ink-50 leading-tight">
            What Does an Agentic AI Developer Do?
          </h2>
          <p className="font-body text-base md:text-lg text-stone-600 dark:text-ink-300 leading-relaxed mt-5">
            As an Agentic AI developer and AI automation expert, I build software that
            can reason and act — agents that use tools, RAG systems grounded in your
            real data, and automations that remove genuine busywork. I wire this
            intelligence straight into web apps with the OpenAI Agents SDK, so AI solves
            an actual problem in your product instead of sitting on the side as a demo.
          </p>
          <FeatureList
            items={[
              "Tool-using agents built on the OpenAI Agents SDK",
              "RAG pipelines grounded in your own data",
              "Workflow automation that removes real busywork",
              "Guardrails, evaluation, and safe deployment",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
