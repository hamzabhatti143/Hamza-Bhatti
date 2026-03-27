"use client";

import { useEffect, useRef, useState } from "react";
import { projects, personalInfo, type Project } from "@/data/portfolio";

/* ─────────────────────────────────
   3D tilt helpers (shared)
───────────────────────────────── */
function onTiltMove(e: React.MouseEvent<HTMLElement>) {
  const el   = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x    = (e.clientX - rect.left) / rect.width  - 0.5;
  const y    = (e.clientY - rect.top)  / rect.height - 0.5;
  el.style.transition = "transform 0.08s ease, box-shadow 0.08s ease";
  el.style.transform  = `perspective(900px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale3d(1.02,1.02,1.02)`;
}

function onTiltLeave(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.transition = "transform 0.7s cubic-bezier(0.23,1,0.32,1), box-shadow 0.7s ease";
  el.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
}

/* ─────────────────────────────────
   Copy-to-clipboard helper
───────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy command to clipboard"}
      title={copied ? "Copied!" : "Copy"}
      className="relative flex-shrink-0 p-1.5 rounded border border-green-900/50 text-green-700 hover:text-green-400 hover:border-green-700 transition-colors duration-200"
    >
      {copied ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {copied && (
        <span className="copy-toast" aria-live="polite">Copied!</span>
      )}
    </button>
  );
}

/* ─────────────────────────────────
   TERMINAL CARD  (CLI projects)
───────────────────────────────── */
function TerminalCard({ project, staggerDelay }: { project: Project; staggerDelay: string }) {
  const cmds       = project.cliCommands ?? ["$ node app.js", "> Running...", "> Done ✓", "> _"];
  const repoName   = project.githubUrl?.split("/").pop() ?? "project";
  const runCmd     = project.runCommand ?? "node app.js";
  const cloneCmd   = `git clone ${project.githubUrl ?? personalInfo.github + "/" + repoName}`;
  const fullScript = `${cloneCmd}\ncd ${repoName} && npm install\n${runCmd}`;

  return (
    <div
      className="project-card tilt-card terminal-card rounded-xl overflow-hidden flex flex-col h-full"
      style={{ transitionDelay: staggerDelay }}
      onMouseMove={onTiltMove}
      onMouseLeave={onTiltLeave}
      aria-label={`${project.title} — CLI project`}
    >
      {/* Terminal chrome bar */}
      <div className="terminal-content flex items-center gap-2 px-4 py-3 bg-[#0a140a] border-b border-[#1d3a1d]">
        <span aria-hidden="true" className="w-3 h-3 rounded-full bg-red-500/80" />
        <span aria-hidden="true" className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span aria-hidden="true" className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="flex-1 text-center font-mono text-[10px] text-green-600/70 tracking-widest">
          bash — zsh
        </span>
        <span aria-hidden="true" className="font-mono text-[10px] text-green-900">
          {String(projects.findIndex((p) => p.title === project.title) + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Terminal body */}
      <div className="terminal-content flex-1 p-5 flex flex-col gap-4">

        {/* Fake shell output */}
        <div className="bg-black/30 rounded-lg p-4 border border-green-950/60 min-h-[110px]" aria-hidden="true">
          {cmds.map((line, i) => {
            const isLast   = i === cmds.length - 1;
            const isDollar = line.startsWith("$");
            const isArrow  = line.startsWith(">");
            return (
              <div key={i} className="flex items-start gap-1.5 leading-5 mb-1">
                <span
                  className="font-mono text-[11px]"
                  style={{ color: isDollar ? "#86efac" : isArrow ? "#4ade80" : "#22c55e" }}
                >
                  {isLast && line.endsWith("_") ? (
                    <>{line.replace("_", "")}<span className="terminal-cursor" /></>
                  ) : line}
                </span>
              </div>
            );
          })}
        </div>

        {/* Badge + project info */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono border border-green-900/60 text-green-400 rounded-full bg-green-950/40">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-green-400" />
            CLI — Terminal App
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold text-green-100 leading-snug">
          {project.title}
        </h3>

        <p className="font-mono text-[12px] text-green-700 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <ul className="flex flex-wrap gap-2" aria-label={`Technologies: ${project.tech.join(", ")}`}>
          {project.tech.map((t) => (
            <li key={t}>
              <span className="inline-block px-2.5 py-1 text-[10px] font-mono text-green-600 border border-green-900/50 rounded bg-green-950/30">
                {t}
              </span>
            </li>
          ))}
        </ul>

        {/* ── How to Run ── */}
        <div className="border border-green-900/40 rounded-lg overflow-hidden bg-black/20">
          {/* Header */}
          <div className="flex items-center gap-2 px-3 py-2 bg-green-950/30 border-b border-green-900/30">
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="font-mono text-[10px] text-green-500 tracking-widest uppercase">How to Run</span>
          </div>

          {/* Commands */}
          <div className="p-3 space-y-1.5">
            {/* Quick NPX shortcut if published */}
            {project.npxPackage && (
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-green-950/40">
                <span className="font-mono text-[9px] text-green-600 w-10 flex-shrink-0 uppercase tracking-wider">quick</span>
                <code className="flex-1 font-mono text-[10px] text-green-300 bg-black/40 px-2 py-1 rounded truncate border border-green-900/40">
                  npx {project.npxPackage}
                </code>
                <CopyButton text={`npx ${project.npxPackage}`} />
              </div>
            )}
            {project.npxPackage && (
              <p className="font-mono text-[9px] text-green-800 px-1 pb-1">— or clone &amp; run locally:</p>
            )}
            {[
              { label: "clone",   cmd: cloneCmd },
              { label: "install", cmd: `cd ${repoName} && npm install` },
              { label: "run",     cmd: runCmd },
            ].map(({ label, cmd }) => (
              <div key={label} className="flex items-center gap-2 group/cmd">
                <span className="font-mono text-[9px] text-green-800 w-10 flex-shrink-0 uppercase tracking-wider">{label}</span>
                <code className="flex-1 font-mono text-[10px] text-green-400 bg-black/30 px-2 py-1 rounded truncate border border-green-950/50">
                  {cmd}
                </code>
                {label === "clone" && <CopyButton text={fullScript} />}
              </div>
            ))}
          </div>

          {/* GitHub link */}
          {project.githubUrl && (
            <div className="px-3 pb-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                className="w-full flex items-center justify-center gap-2 py-2 rounded border border-green-800/50 text-green-500 hover:bg-green-950/40 hover:border-green-600 hover:text-green-300 transition-all duration-200 font-mono text-[10px] tracking-wider uppercase"
              >
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                View Source on GitHub
                <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────
   WEB CARD  (Web / Website / API / Game / Tool)
───────────────────────────────── */
const categoryMeta: Record<string, { label: string; badgeClass: string; dotColor: string }> = {
  "Web App":     { label: "Web App",     badgeClass: "text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40", dotColor: "#34d399" },
  "AI Platform": { label: "AI Platform", badgeClass: "text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-900/60 bg-teal-50 dark:bg-teal-950/40",                   dotColor: "#2dd4bf" },
  Website:       { label: "Website",     badgeClass: "text-accent border-accent/30 bg-accent/10",                                                                                  dotColor: "#c8a96e" },
  API:           { label: "API",         badgeClass: "text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-900/60 bg-violet-50 dark:bg-violet-950/40",        dotColor: "#a78bfa" },
  Game:          { label: "Game",        badgeClass: "text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-900/60 bg-orange-50 dark:bg-orange-950/40",        dotColor: "#fb923c" },
  Tool:          { label: "Tool",        badgeClass: "text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-900/60 bg-sky-50 dark:bg-sky-950/40",                          dotColor: "#38bdf8" },
};

function WebCard({ project, staggerDelay }: { project: Project; staggerDelay: string }) {
  const meta   = categoryMeta[project.category] ?? categoryMeta["Web App"];
  const accent = project.accentColor ?? "#c8a96e";
  const url    = project.previewUrl ?? "localhost:3000";

  return (
    <div
      className="project-card tilt-card browser-card rounded-xl overflow-hidden flex flex-col h-full"
      style={{ transitionDelay: staggerDelay }}
      onMouseMove={onTiltMove}
      onMouseLeave={onTiltLeave}
      aria-label={`${project.title} — ${project.category} project`}
    >
      {/* Browser chrome */}
      <div className="browser-chrome px-4 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full" style={{ background: accent, opacity: 0.8 }} />
        </div>
        <div className="flex-1 browser-addressbar px-3 py-1 flex items-center gap-2 truncate">
          <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#7878aa] flex-shrink-0">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
        <span aria-hidden="true" className="font-mono text-[10px] text-stone-400">
          {String(projects.findIndex((p) => p.title === project.title) + 1).padStart(2, "0")}
        </span>
      </div>

      {/* UI Preview pane */}
      <div
        aria-hidden="true"
        className="relative h-28 overflow-hidden border-b border-stone-300 dark:border-[#22224a]"
        style={{ background: `linear-gradient(135deg, var(--preview-bg) 0%, ${accent}28 60%, ${accent}12 100%)` }}
      >
        <div className="absolute inset-0 p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="h-2 w-12 rounded-full" style={{ background: `${accent}70` }} />
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => <div key={i} className="h-2 w-8 rounded-full" style={{ background: "rgba(128,128,128,0.18)" }} />)}
            </div>
          </div>
          <div className="flex gap-3 mt-1">
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="h-3 w-3/4 rounded-sm" style={{ background: `${accent}55` }} />
              <div className="h-2 w-1/2 rounded-sm" style={{ background: "rgba(128,128,128,0.18)" }} />
              <div className="h-2 w-2/3 rounded-sm" style={{ background: "rgba(128,128,128,0.13)" }} />
            </div>
            <div className="w-14 h-14 rounded-lg" style={{ background: `${accent}30` }} />
          </div>
          <div className="flex gap-2 mt-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-6 rounded" style={{ background: i === 1 ? `${accent}38` : "rgba(128,128,128,0.10)" }} />
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-8 to-transparent" style={{ backgroundImage: "linear-gradient(to top, var(--preview-bg), transparent)" }} />
      </div>

      {/* Card body */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        <span className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 text-[10px] font-mono border rounded-full ${meta.badgeClass}`}>
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ background: meta.dotColor }} />
          {meta.label}
        </span>

        <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-ink-100 leading-snug">
          {project.title}
        </h3>

        <p className="font-body text-sm text-stone-600 dark:text-ink-500 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech + GitHub row */}
        <div className="pt-2 border-t border-stone-200 dark:border-ink-800/60 space-y-3">
          <ul className="flex flex-wrap gap-2" aria-label={`Technologies: ${project.tech.join(", ")}`}>
            {project.tech.map((t) => (
              <li key={t}>
                <span className="skill-pill inline-block px-2.5 py-1 text-[10px] font-mono text-stone-500 dark:text-ink-500 border border-stone-300 dark:border-ink-800 rounded">
                  {t}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 flex-wrap">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo of ${project.title} (opens in new tab)`}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors duration-200 font-semibold"
              >
                <svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Live Demo →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-stone-500 dark:text-ink-600 hover:text-accent transition-colors duration-200"
              >
                <svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────
   MAIN SECTION
───────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll<HTMLElement>(".project-card").forEach((card, i) => {
            setTimeout(() => card.classList.add("is-visible"), i * 90);
          });
        });
      },
      { threshold: 0.04 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cliProjects = projects.filter((p) => p.category === "CLI");
  const webProjects = projects.filter((p) => p.category !== "CLI");

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-heading"
      className="relative py-24 md:py-32 px-6 md:px-10 bg-stone-100/60 dark:bg-ink-950/60 overflow-hidden"
    >
      {/* ── 3D floating decorations ── */}
      <div
        aria-hidden="true"
        className="absolute top-14 left-[2%] pointer-events-none opacity-[0.08]"
        style={{
          width: 60, height: 60,
          border: "1px solid rgba(200,169,110,0.45)",
          transformStyle: "preserve-3d",
          animation: "cubeFloat 16s ease-in-out infinite",
          transform: "rotateX(25deg) rotateY(25deg)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-32 right-[3%] pointer-events-none opacity-[0.07]"
        style={{
          width: 45, height: 45,
          border: "1px solid rgba(200,169,110,0.4)",
          animation: "diamondFloat 12s ease-in-out infinite",
          transform: "rotate(45deg) rotateX(20deg)",
          animationDelay: "-5s",
        }}
      />
      <div
        aria-hidden="true"
        className="sphere-3d absolute top-1/2 right-[1%] pointer-events-none opacity-[0.05]"
        style={{ width: 36, height: 36 }}
      />
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
            What I&apos;ve built
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 id="projects-heading" className="font-display text-4xl md:text-5xl font-bold text-stone-900 dark:text-ink-50">
              Selected <span className="italic text-accent font-normal">Projects</span>
            </h2>
            <p className="font-mono text-xs text-ink-600 tracking-widest">
              {String(projects.length).padStart(2, "0")} projects total
            </p>
          </div>
          <div aria-hidden="true" className="section-rule w-full mt-8" />
        </div>

        {/* ── Web section ── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="font-mono text-xs tracking-[0.25em] uppercase text-accent">Web / Browser</h3>
          </div>
          <div aria-hidden="true" className="flex-1 h-px bg-accent/20" />
          <span className="font-mono text-[10px] text-ink-700">
            {String(webProjects.length).padStart(2, "0")} projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" role="list" aria-label="Web and browser-based projects">
          {webProjects.map((project, i) => (
            <div key={project.title} role="listitem" className="flex">
              <WebCard project={project} staggerDelay={`${i * 90}ms`} />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div aria-hidden="true" className="section-rule w-full mb-16" />

        {/* ── CLI section header + explainer banner ── */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-green-500" />
              <h3 className="font-mono text-xs tracking-[0.25em] uppercase text-green-500">
                Terminal / CLI
              </h3>
            </div>
            <div aria-hidden="true" className="flex-1 h-px bg-green-900/30" />
            <span className="font-mono text-[10px] text-ink-700">
              {String(cliProjects.length).padStart(2, "0")} projects
            </span>
          </div>

          {/* ── How-to explainer banner ── */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4 rounded-xl border border-green-900/60 mb-8"
            style={{ background: "#070f07" }}
            role="note"
            aria-label="How to run CLI projects"
          >
            {/* Terminal icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-950/80 border border-green-900/60 flex items-center justify-center">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.8">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-mono text-xs text-green-400 font-semibold mb-1 tracking-wide">
                These run in your terminal — not in a browser
              </p>
              <p className="font-body text-xs text-green-600 leading-relaxed">
                Each card below shows the exact{" "}
                <code className="font-mono text-green-400 bg-black/40 px-1.5 py-0.5 rounded">git clone</code>,{" "}
                <code className="font-mono text-green-400 bg-black/40 px-1.5 py-0.5 rounded">npm install</code>, and run
                commands. Hit the copy button to grab everything at once, or click{" "}
                <strong className="text-green-400 font-semibold">View Source on GitHub</strong> to browse the code.
                You need <strong className="text-green-400">Node.js</strong> installed to run them.
              </p>
            </div>
            {/* Node.js badge */}
            <a
              href="https://nodejs.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Node.js (opens in new tab)"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-green-800/50 text-green-500 hover:text-green-400 hover:border-green-600 transition-colors font-mono text-[10px] tracking-wide whitespace-nowrap"
            >
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Get Node.js →
            </a>
          </div>
        </div>

        {/* CLI cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="CLI and terminal projects">
          {cliProjects.map((project, i) => (
            <div key={project.title} role="listitem" className="flex">
              <TerminalCard project={project} staggerDelay={`${(webProjects.length + i) * 90}ms`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
