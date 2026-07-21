import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "@/components/PageFrame";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "I'm Hamza Bhatti, a full-stack developer with complete SEO expertise based in Karachi, Pakistan. I build Next.js and FastAPI apps with PostgreSQL and integrate AI using the OpenAI Agents SDK and RAG systems.",
  alternates: { canonical: "/about" },
};

const knowsAbout = [
  "Next.js",
  "FastAPI",
  "PostgreSQL",
  "SEO",
  "AI Agents",
  "TypeScript",
  "Tailwind CSS",
  "RAG Systems",
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: "Full-Stack Developer & Agentic AI Developer",
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/images/profile-pic.jpeg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: [SITE.github, SITE.linkedin],
  knowsAbout,
};

export default function AboutPage() {
  return (
    <PageFrame>
      <JsonLd data={personSchema} />

      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <PageHeader
          eyebrow="About"
          title={<>I&apos;m Hamza Bhatti.</>}
          lead={
            <>
              I&apos;m a full-stack developer with a frontend-leaning background and
              hands-on SEO expertise, based in Karachi, Pakistan. I build
              fast, accessible web applications and integrate AI into them so
              products don&apos;t just look good — they work smarter.
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Narrative */}
          <div className="lg:col-span-2 space-y-6 font-body text-base md:text-lg leading-relaxed text-stone-600 dark:text-ink-300">
            <p>
              My core stack is <strong className="text-stone-800 dark:text-ink-100">Next.js, FastAPI,
              PostgreSQL, TypeScript, and Tailwind CSS</strong>. I like living on both
              sides of the stack: crafting polished, responsive interfaces on the
              frontend, then backing them with typed, well-structured APIs and
              relational data models that hold up under real usage.
            </p>
            <p>
              What sets my work apart is how I blend that engineering with AI. I build
              agentic AI features using the <strong className="text-stone-800 dark:text-ink-100">OpenAI
              Agents SDK</strong> and design <strong className="text-stone-800 dark:text-ink-100">RAG
              (retrieval-augmented generation) systems</strong> that ground large
              language models in real, project-specific data — the same approach that
              powers the AI assistant on this very site. To me, AI isn&apos;t a
              bolt-on gimmick; it&apos;s another tool for solving the actual problem in
              front of a user.
            </p>
            <p>
              I also bring something most developers don&apos;t: real
              <strong className="text-stone-800 dark:text-ink-100"> SEO</strong> expertise —
              and not just the technical side. I run full audits, handle on-page and
              content optimization, fix crawlability and Core Web Vitals issues, and
              structure metadata so the things I build are actually discoverable. That
              hybrid technical-and-marketing skillset means I can ship a product and
              help it get found.
            </p>
            <p>
              I&apos;ve put this into practice across freelance client work and my own
              AI-driven products — from a containerised, multi-agent agri-tech platform
              to SEO outreach tooling and production apps with integrated AI chatbots.
              I care about clean code, measurable outcomes, and shipping things that
              last.
            </p>
            <p>
              If that sounds like the kind of person you want on your project, take a
              look at{" "}
              <Link href="/projects" className="text-accent hover:text-accent-light underline underline-offset-4 decoration-accent/40">
                what I&apos;ve built
              </Link>{" "}
              or the{" "}
              <Link href="/services" className="text-accent hover:text-accent-light underline underline-offset-4 decoration-accent/40">
                services I offer
              </Link>
              , and then{" "}
              <Link href="/contact" className="text-accent hover:text-accent-light underline underline-offset-4 decoration-accent/40">
                get in touch
              </Link>
              .
            </p>
          </div>

          {/* Facts sidebar */}
          <aside className="space-y-8">
            <div className="rounded-xl border border-stone-200 dark:border-ink-800 bg-stone-50 dark:bg-ink-950/60 p-6">
              <h2 className="font-mono text-xs tracking-widest uppercase text-accent mb-4">At a glance</h2>
              <dl className="space-y-3 font-body text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500 dark:text-ink-500">Location</dt>
                  <dd className="text-stone-800 dark:text-ink-200 text-right">Karachi, Pakistan</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500 dark:text-ink-500">Focus</dt>
                  <dd className="text-stone-800 dark:text-ink-200 text-right">Full-Stack + AI</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500 dark:text-ink-500">Availability</dt>
                  <dd className="text-stone-800 dark:text-ink-200 text-right">Remote, worldwide</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-stone-200 dark:border-ink-800 p-6">
              <h2 className="font-mono text-xs tracking-widest uppercase text-accent mb-4">What I know</h2>
              <ul className="flex flex-wrap gap-2" role="list">
                {knowsAbout.map((item) => (
                  <li
                    key={item}
                    className="skill-pill font-mono text-xs px-3 py-1.5 rounded-full border border-stone-200 dark:border-ink-700 text-stone-600 dark:text-ink-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </PageFrame>
  );
}
