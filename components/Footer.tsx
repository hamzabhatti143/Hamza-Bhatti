import { personalInfo } from "@/data/portfolio";

const socialLinks = [
  {
    label: "GitHub",
    href: personalInfo.github,
    icon: (
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    icon: (
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: personalInfo.email,
    icon: (
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" aria-label="Footer with contact information" className="border-t border-stone-200 dark:border-ink-800">
      {/* CTA band */}
      <div className="py-20 md:py-28 px-6 md:px-10 bg-stone-50 dark:bg-ink-950">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-6 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
            Get in touch
            <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
          </p>

          <h2 className="font-display text-4xl md:text-6xl font-bold text-stone-900 dark:text-ink-50 mb-6 leading-tight">
            Let&apos;s build something{" "}
            <span className="italic text-accent font-normal">together.</span>
          </h2>

          <p className="font-body text-stone-500 dark:text-ink-400 text-base md:text-lg max-w-md mx-auto mb-12 leading-relaxed">
            I&apos;m open to frontend roles, freelance projects, and collaborations. Drop me a message.
          </p>

          <a
            href={personalInfo.email}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-ink-950 font-body font-semibold text-sm tracking-wide rounded hover:bg-accent-light transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/20"
            aria-label="Send an email to Hamza Bhatti"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Send a Message
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-8 px-6 md:px-10 border-t border-stone-100 dark:border-ink-900">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs text-stone-400 dark:text-ink-600 text-center sm:text-left">
            &copy; {year}{" "}
            <span className="text-stone-500 dark:text-ink-500">{personalInfo.name}</span>
            {" "}— Built with Next.js & Tailwind CSS
          </p>

          <nav aria-label="Social media links">
            <ul className="flex items-center gap-5" role="list">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={`${link.label}${link.href.startsWith("mailto") ? "" : " (opens in new tab)"}`}
                    className="text-stone-400 dark:text-ink-600 hover:text-accent transition-colors duration-300 block p-1"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
