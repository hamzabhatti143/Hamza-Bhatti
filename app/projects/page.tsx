import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "@/components/PageFrame";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { getPortfolio, type Project } from "@/lib/getPortfolio";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of projects I've built — AI platforms, full-stack Next.js apps, developer tools, and WordPress sites, using Next.js, FastAPI, TypeScript, and agentic AI.",
  alternates: { canonical: "/projects" },
};

const GitHubIcon = () => (
  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-hover group flex flex-col rounded-xl border border-stone-200 dark:border-ink-800 bg-stone-50/60 dark:bg-ink-950/50 p-6 overflow-hidden">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-ink-50 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h2>
        <span className="flex-shrink-0 font-mono text-[10px] tracking-widest uppercase text-accent/80 border border-accent/20 rounded px-2 py-1">
          {project.category}
        </span>
      </div>

      <p className="font-body text-sm text-stone-600 dark:text-ink-300 leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      <ul className="flex flex-wrap gap-2 mb-5" role="list">
        {project.tech.map((t) => (
          <li
            key={t}
            className="skill-pill font-mono text-[11px] px-2.5 py-1 rounded-full border border-stone-200 dark:border-ink-700 text-stone-500 dark:text-ink-400"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4 pt-1">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:text-accent-light transition-colors"
            aria-label={`View ${project.title} live demo (opens in new tab)`}
          >
            <ExternalIcon />
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-500 dark:text-ink-400 hover:text-accent transition-colors"
            aria-label={`View ${project.title} source on GitHub (opens in new tab)`}
          >
            <GitHubIcon />
            Code
          </a>
        )}
        {project.npxPackage && !project.liveUrl && (
          <span className="font-mono text-xs text-stone-500 dark:text-ink-400">
            {project.runCommand}
          </span>
        )}
      </div>
    </article>
  );
}

export default async function ProjectsPage() {
  const { projects } = await getPortfolio();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects — Hamza Bhatti",
    url: `${SITE_URL}/projects`,
    description:
      "A collection of web development and AI projects built by Hamza Bhatti.",
    hasPart: projects.map((p) => ({
      "@type": "SoftwareSourceCode",
      name: p.title,
      description: p.description,
      ...(p.githubUrl ? { codeRepository: p.githubUrl } : {}),
      ...(p.liveUrl ? { url: p.liveUrl } : {}),
    })),
  };

  return (
    <PageFrame>
      <JsonLd data={collectionSchema} />

      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <PageHeader
          eyebrow={`Projects · ${projects.length} builds`}
          title={<>Things I&apos;ve built.</>}
          lead={
            <>
              Here are some of the projects I&apos;ve shipped — from agentic AI
              platforms and full-stack Next.js apps to developer CLIs and WordPress
              sites. Each one taught me something I now bring to client work.
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-stone-200 dark:border-ink-800 bg-stone-50 dark:bg-ink-950/60 p-8 text-center">
          <p className="font-body text-stone-600 dark:text-ink-300 mb-5">
            Want something like this built for your business? I offer full-stack and
            AI-integration work as a service.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-ink-950 font-body font-semibold text-sm tracking-wide rounded hover:bg-accent-light transition-all duration-300 hover:-translate-y-0.5"
            >
              View Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent/50 text-accent font-body font-medium text-sm tracking-wide rounded hover:bg-accent/10 transition-all duration-300"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
