import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import ContactForm from "./ContactForm";
import { getPortfolio } from "@/lib/getPortfolio";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's work together. Get in touch with Hamza Bhatti about full-stack development, AI integration, or complete SEO — available for remote freelance work worldwide.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const { personalInfo } = await getPortfolio();
  const rawEmail = personalInfo.email.replace(/^mailto:/, "");

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Person",
      name: SITE.name,
      email: rawEmail,
      url: SITE_URL,
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
      sameAs: [SITE.github, SITE.linkedin],
    },
  };

  // tel: needs digits and a leading + only (strip spaces/formatting).
  const telHref = `tel:${personalInfo.phone.replace(/[^\d+]/g, "")}`;

  const directLinks = [
    {
      label: "Email",
      value: rawEmail,
      href: personalInfo.email,
      external: false,
      icon: (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: personalInfo.phone,
      href: telHref,
      external: false,
      icon: (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.94.36 1.86.68 2.75a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.32 1.81.55 2.75.68A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/hamzabhatti143",
      href: personalInfo.github,
      external: true,
      icon: (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/hamzabhatti143",
      href: personalInfo.linkedin,
      external: true,
      icon: (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <PageFrame>
      <JsonLd data={contactSchema} />

      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <PageHeader
          eyebrow="Contact"
          title={<>Let&apos;s work together.</>}
          lead={
            <>
              I&apos;m available for remote freelance projects worldwide — full-stack
              builds, AI integration, and complete SEO. Tell me what you&apos;re
              working on and I&apos;ll get back to you.
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm email={rawEmail} />
          </div>

          {/* Direct info */}
          <aside className="lg:col-span-2 space-y-8">
            <div className="rounded-xl border border-stone-200 dark:border-ink-800 bg-stone-50 dark:bg-ink-950/60 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-mono text-xs tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                  Available for work
                </span>
              </div>
              <p className="font-body text-sm text-stone-600 dark:text-ink-300 leading-relaxed">
                Currently open to freelance and contract work. Based in Karachi,
                Pakistan (GMT+5) and comfortable collaborating async with teams in any
                timezone.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 dark:border-ink-800 p-6">
              <h2 className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Reach me directly</h2>
              <ul className="space-y-2.5" role="list">
                {directLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      aria-label={`${link.label}: ${link.value}${link.external ? " (opens in new tab)" : ""}`}
                      className="group flex items-center gap-3 rounded-lg border border-stone-200 dark:border-ink-800 px-3 py-2.5 hover:border-accent/60 hover:bg-accent/5 transition-colors"
                    >
                      <span className="flex-shrink-0 text-stone-400 dark:text-ink-500 group-hover:text-accent transition-colors">
                        {link.icon}
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-stone-400 dark:text-ink-500">{link.label}</span>
                        <span className="font-body text-sm text-stone-800 dark:text-ink-200 group-hover:text-accent transition-colors truncate">{link.value}</span>
                      </span>
                      <svg aria-hidden="true" className="ml-auto flex-shrink-0 text-stone-300 dark:text-ink-600 group-hover:text-accent group-hover:translate-x-0.5 transition-all" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
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
