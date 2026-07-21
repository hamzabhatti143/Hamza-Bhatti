import JsonLd from "@/components/JsonLd";

// First-person FAQ shown near the foot of the homepage. Uses native
// <details>/<summary> so the accordion needs zero client-side JavaScript.
const faqs = [
  {
    q: "Who is Hamza Bhatti?",
    a: "I'm Hamza Bhatti, a full-stack developer with a frontend-leaning background, based in Karachi, Pakistan. My core stack is Next.js, FastAPI, PostgreSQL, and TypeScript, and I split my time between client projects and my own AI-driven products.",
  },
  {
    q: "Do you do SEO or not?",
    a: "Yes — and not just the technical side. I handle complete SEO alongside my development work: full site audits, technical fixes, on-page optimization, and content structure. That gives me a hybrid technical-and-marketing skillset, so the things I build are fast, crawlable, and actually get found.",
  },
  {
    q: "Why should you hire me for your project?",
    a: "Because I cover the whole stack — frontend and backend — and I have hands-on experience building AI-integrated and agentic AI systems. On top of that I bring SEO knowledge most developers simply don't have, backed by a proven track record across multiple real, shipped projects.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "I specialize in Next.js (App Router), FastAPI, PostgreSQL, TypeScript, and Tailwind CSS. For AI, I work with the OpenAI Agents SDK and RAG systems, and I use Claude Code day-to-day to move faster without cutting corners.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely. I'm available for remote freelance work globally and I'm comfortable with async communication and remote collaboration across timezones, so working together is easy no matter where you're based.",
  },
];

export default function HomeFaq() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="home-faq-heading"
      className="py-16 md:py-24 px-6 md:px-10 border-t border-stone-200 dark:border-ink-900"
    >
      <JsonLd data={faqSchema} />
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-6 flex items-center gap-3">
          <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
          FAQ
        </p>
        <h2 id="home-faq-heading" className="font-display text-3xl md:text-5xl font-bold text-stone-900 dark:text-ink-50 mb-10 leading-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-stone-200 dark:border-ink-800 bg-stone-50/60 dark:bg-ink-950/50 p-5 md:p-6"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display text-lg md:text-xl font-semibold text-stone-900 dark:text-ink-50">
                <h3 className="font-display">{faq.q}</h3>
                <svg aria-hidden="true" className="flex-shrink-0 transition-transform duration-300 group-open:rotate-45 text-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </summary>
              <p className="font-body text-stone-600 dark:text-ink-300 leading-relaxed mt-4">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
