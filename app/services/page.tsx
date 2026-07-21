import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "@/components/PageFrame";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "I offer full-stack web development (Next.js + FastAPI), AI-integrated applications, complete SEO (technical, on-page, and content), and WordPress development. Here's how I help clients ship.",
  alternates: { canonical: "/services" },
};

type Service = {
  id: string;
  title: string;
  answer: string;
  who: string;
  process: string[];
};

const services: Service[] = [
  {
    id: "full-stack-web-development",
    title: "Full-Stack Web Development",
    answer:
      "I design and build complete web applications end to end with Next.js on the frontend and FastAPI plus PostgreSQL on the backend.",
    who: "Startups and businesses that need a real product — not a template — with a frontend and backend that are built to scale together.",
    process: [
      "We scope the product, data model, and key user flows together.",
      "I build a typed FastAPI backend with PostgreSQL as the source of truth.",
      "I craft a fast, responsive Next.js frontend against that API.",
      "I test, optimise for Core Web Vitals, and ship to production.",
    ],
  },
  {
    id: "ai-integrated-applications",
    title: "AI-Integrated Applications",
    answer:
      "I add practical AI to your product — agentic AI workflows, RAG chatbots grounded in your own data, and automation that removes real busywork.",
    who: "Teams who want AI that solves an actual problem in their product, not a gimmick bolted on for a demo.",
    process: [
      "We identify where AI genuinely adds value to your workflow.",
      "I design the agent or RAG pipeline using the OpenAI Agents SDK.",
      "I ground it in your data and connect it to your app securely.",
      "I evaluate outputs, add guardrails, and deploy with monitoring.",
    ],
  },
  {
    id: "seo-audits",
    title: "SEO Audits & Optimization",
    answer:
      "I handle complete SEO — not just the technical foundations, but on-page optimization, keyword and content structure, and the fixes that get your site crawled, indexed, and ranked.",
    who: "Site owners who want to rank and stay ranked across the full SEO picture — technical, on-page, and content.",
    process: [
      "I audit the full picture: technical health, on-page, keywords, and content.",
      "I deliver a prioritised report of what's costing you rankings.",
      "I implement the fixes — performance, metadata, schema, on-page, and internal links.",
      "I verify improvements against Core Web Vitals and search tooling.",
    ],
  },
  {
    id: "wordpress-development",
    title: "WordPress Development",
    answer:
      "I build clean, fast, responsive WordPress websites for businesses that need a maintainable site they can update themselves.",
    who: "Small businesses and content-driven brands that want a polished, easy-to-manage website without a heavy custom stack.",
    process: [
      "We agree on structure, design direction, and content needs.",
      "I build a responsive, accessible theme tailored to your brand.",
      "I optimise for speed, mobile, and on-page SEO.",
      "I hand over a site you can confidently maintain and grow.",
    ],
  },
];

export default function ServicesPage() {
  const serviceSchemas = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.answer,
    serviceType: s.title,
    url: `${SITE_URL}/services#${s.id}`,
    areaServed: "Worldwide",
    provider: {
      "@type": "Person",
      name: SITE.name,
      url: SITE_URL,
    },
  }));

  return (
    <PageFrame>
      <JsonLd data={serviceSchemas} />

      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <PageHeader
          eyebrow="Services"
          title={<>How I can help.</>}
          lead={
            <>
              I offer full-stack development, AI integration, complete SEO, and
              WordPress work. Whatever the project, I aim for the same outcome:
              something fast, reliable, and genuinely useful to the people who use it.
            </>
          }
        />

        <div className="mt-14 space-y-6">
          {services.map((service, i) => (
            <article
              key={service.id}
              id={service.id}
              className="card-hover rounded-xl border border-stone-200 dark:border-ink-800 bg-stone-50/60 dark:bg-ink-950/50 p-7 md:p-9 scroll-mt-28"
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-mono text-sm text-accent/70">0{i + 1}</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-ink-50">
                  {service.title}
                </h2>
              </div>

              <p className="font-body text-lg text-stone-700 dark:text-ink-200 leading-relaxed mb-6 max-w-3xl">
                {service.answer}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-mono text-xs tracking-widest uppercase text-accent mb-2">Who it&apos;s for</h3>
                  <p className="font-body text-sm text-stone-600 dark:text-ink-300 leading-relaxed">
                    {service.who}
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-xs tracking-widest uppercase text-accent mb-3">How it works</h3>
                  <ol className="space-y-2" role="list">
                    {service.process.map((step, si) => (
                      <li key={si} className="flex gap-3 font-body text-sm text-stone-600 dark:text-ink-300">
                        <span className="flex-shrink-0 font-mono text-accent/70">{si + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-stone-200 dark:border-ink-800">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:gap-2.5 transition-all"
                >
                  See proof of work
                  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-xl border border-accent/30 bg-accent/5 p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-stone-900 dark:text-ink-50 mb-4">
            Have a project in mind?
          </h2>
          <p className="font-body text-stone-600 dark:text-ink-300 max-w-lg mx-auto mb-8">
            Tell me what you&apos;re building and I&apos;ll tell you honestly how I can
            help. No hard sell — just a straight answer.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-ink-950 font-body font-semibold text-sm tracking-wide rounded hover:bg-accent-light transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/20"
          >
            Start a Conversation
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
