import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";
import JsonLd from "@/components/JsonLd";
import { getPortfolio } from "@/lib/getPortfolio";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hamza Bhatti — CV & Career History",
  description:
    "A recruiter-ready CV for Hamza Bhatti: three-plus years shipping typed full-stack products and production AI agents, a downloadable PDF, and the hiring context behind each role, credential, and shipped build.",
  alternates: { canonical: "/resume" },
};

const DownloadIcon = () => (
  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-ink-50 mb-6 flex items-center gap-4">
      {children}
      <span aria-hidden="true" className="flex-1 h-px bg-gradient-to-r from-accent/40 to-transparent" />
    </h2>
  );
}

export default async function ResumePage() {
  const data = await getPortfolio();
  const { personalInfo, skillCategories, experiences, projects, education, achievements } = data;

  // Highlight a handful of flagship projects on the resume rather than all of them.
  const featured = projects.filter((p) => p.liveUrl).slice(0, 6);

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: SITE.name,
      jobTitle: "Full-Stack Developer & Agentic AI Developer",
      url: `${SITE_URL}/resume`,
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
      sameAs: [SITE.github, SITE.linkedin],
      knowsAbout: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "SEO", "AI Agents"],
    },
  };

  return (
    <PageFrame
      footerCta={{
        eyebrow: "Hiring?",
        title: (
          <>
            Let&apos;s talk about the{" "}
            <span className="italic text-accent font-normal">role.</span>
          </>
        ),
        text: "Have the PDF in hand? Tell me about the position and I'll walk you through the parts of my background that fit.",
        buttonLabel: "Email me about a role",
      }}
    >
      <JsonLd data={profileSchema} />

      <section className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
              Resume
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 dark:text-ink-50 leading-tight">
              {personalInfo.name}
            </h1>
            <p className="font-body text-lg text-stone-600 dark:text-ink-300 mt-2">
              Full-Stack Developer &amp; Agentic AI Developer · Karachi, Pakistan
            </p>
          </div>
          <a
            href={personalInfo.resumeUrl}
            download
            className="resume-btn-glow inline-flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/40 text-accent font-mono text-sm rounded hover:bg-accent/20 hover:border-accent transition-all duration-300 flex-shrink-0"
          >
            <DownloadIcon />
            Download PDF
          </a>
        </div>

        {/* Professional profile */}
        <section className="mb-14">
          <SectionTitle>Professional Profile</SectionTitle>
          <div className="space-y-5 font-body text-base md:text-lg text-stone-600 dark:text-ink-300 leading-relaxed max-w-3xl">
            <p>
              This page is the condensed, hiring-focused version of my work — the same
              story a recruiter or engineering manager needs in about ninety seconds,
              paired with a downloadable PDF that drops cleanly into an applicant-tracking
              system. I&apos;m a full-stack engineer based in Karachi who ships in
              production rather than in prototypes: over the past three years my client
              and personal projects have gone live, stayed live, and been handed over to
              the people who now maintain them. Every entry below maps to something real
              you can click through to, not a line written to fill space.
            </p>
            <p>
              In practice that means I own a feature from the database schema all the way
              to the rendered pixel. On a typical engagement I model the data in
              PostgreSQL, expose it through a typed FastAPI service, and consume it from a
              Next.js App Router frontend tuned to score well on Core Web Vitals. Where it
              genuinely earns its place, I layer in AI — retrieval-augmented chatbots and
              multi-step agents built on the OpenAI Agents SDK — and then wire in the
              analytics and structured metadata that let the finished product actually get
              found by the people it was built for.
            </p>
            <p>
              What tends to matter to the teams I join is that I close the loop between
              engineering and outcomes: I can build the thing and then explain, in a
              standup or a client call, why it moves a number that the business cares
              about. The sections that follow expand this summary into specifics — the
              stacks I reach for first, the roles and responsibilities I&apos;ve held, the
              projects I point to as proof of work, and the formal education and
              certifications behind them. If a single line here raises a question, the
              contact page is the fastest route to a straight answer.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-14">
          <SectionTitle>Technical Toolkit</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillCategories.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-mono text-xs tracking-widest uppercase text-stone-500 dark:text-ink-500 mb-3">
                  {cat.category}
                </h3>
                <ul className="flex flex-wrap gap-2" role="list">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="skill-pill font-mono text-[11px] px-2.5 py-1 rounded-full border border-stone-200 dark:border-ink-700 text-stone-600 dark:text-ink-300">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-14">
          <SectionTitle>Career History</SectionTitle>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <article key={`${exp.company}-${exp.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-xl font-semibold text-stone-900 dark:text-ink-50">
                    {exp.role} <span className="text-accent">· {exp.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-stone-500 dark:text-ink-500">{exp.period}</span>
                </div>
                <ul className="mt-3 space-y-2 list-disc pl-5" role="list">
                  {exp.points.map((point, i) => (
                    <li key={i} className="font-body text-sm text-stone-600 dark:text-ink-300 leading-relaxed marker:text-accent">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-14">
          <SectionTitle>Flagship Builds</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featured.map((project) => (
              <article key={project.title} className="rounded-lg border border-stone-200 dark:border-ink-800 p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-display text-base font-semibold text-stone-900 dark:text-ink-50">{project.title}</h3>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-accent hover:text-accent-light" aria-label={`${project.title} live demo (opens in new tab)`}>
                      live ↗
                    </a>
                  )}
                </div>
                <p className="font-body text-xs text-stone-600 dark:text-ink-400 leading-relaxed">{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-14">
          <SectionTitle>Academic Background</SectionTitle>
          <div className="space-y-6">
            {education.map((edu) => (
              <article key={edu.degree}>
                <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-ink-50">{edu.degree}</h3>
                <p className="font-mono text-xs text-accent mt-1">{edu.institution}</p>
                <p className="font-body text-sm text-stone-600 dark:text-ink-300 mt-2 leading-relaxed">{edu.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <SectionTitle>Credentials &amp; Recognition</SectionTitle>
          <ul className="space-y-3" role="list">
            {achievements.map((a) => (
              <li key={a.title} className="flex items-start gap-3">
                <span aria-hidden="true" className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full ${a.type === "award" ? "bg-accent" : "bg-stone-400 dark:bg-ink-500"}`} />
                <div>
                  <span className="font-body text-sm font-medium text-stone-800 dark:text-ink-100">{a.title}</span>
                  <span className="font-body text-sm text-stone-500 dark:text-ink-500"> — {a.issuer}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </PageFrame>
  );
}
