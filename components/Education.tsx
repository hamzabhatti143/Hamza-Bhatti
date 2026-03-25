"use client";

import { useEffect, useRef } from "react";
import { education } from "@/data/portfolio";

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".edu-card").forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateX(0)";
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} aria-labelledby="education-heading" className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden">
      {/* ── 3D floating decorations ── */}
      <div
        aria-hidden="true"
        className="absolute top-20 right-[5%] pointer-events-none opacity-[0.11] dark:opacity-[0.06]"
        style={{
          width: 70, height: 70,
          border: "1px solid rgba(200,169,110,0.55)",
          transformStyle: "preserve-3d",
          animation: "cubeFloat 18s ease-in-out infinite",
          transform: "rotateX(22deg) rotateY(32deg)",
          animationDelay: "-6s",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-24 left-[3%] pointer-events-none opacity-[0.09] dark:opacity-[0.05]"
        style={{
          width: 48, height: 48,
          border: "1px solid rgba(200,169,110,0.5)",
          animation: "diamondFloat 12s ease-in-out infinite",
          transform: "rotate(45deg) rotateX(18deg)",
          animationDelay: "-3s",
        }}
      />
      <div
        aria-hidden="true"
        className="sphere-3d absolute top-2/3 right-[2%] pointer-events-none opacity-[0.07] dark:opacity-[0.04]"
        style={{ width: 42, height: 42 }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
            Background
          </p>
          <h2 id="education-heading" className="font-display text-4xl md:text-5xl font-bold text-stone-900 dark:text-ink-50">
            Education &{" "}
            <span className="italic text-accent font-normal">Training</span>
          </h2>
          <div aria-hidden="true" className="section-rule w-full mt-8" />
        </div>

        <ol className="relative" aria-label="Education timeline">
          <div aria-hidden="true" className="hidden md:block absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-accent/40 via-stone-200 dark:via-ink-800 to-transparent" />

          {education.map((edu, index) => (
            <li
              key={edu.degree}
              className="edu-card relative md:pl-20 mb-12 last:mb-0"
              style={{
                opacity: 0,
                transform: "translateX(-20px)",
                transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
              }}
            >
              {/* Timeline dot */}
              <div aria-hidden="true" className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-full border border-stone-200 dark:border-ink-700 bg-stone-50 dark:bg-ink-900 items-center justify-center transition-colors">
                <span className="font-mono text-xs text-accent font-bold">{String(index + 1).padStart(2, "0")}</span>
              </div>

              <article className="card-hover bg-white/70 dark:bg-ink-900/60 border border-stone-200 dark:border-ink-800 rounded-lg p-7 md:p-8 group" aria-label={`${edu.degree} at ${edu.institution}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                  <span aria-hidden="true" className="md:hidden font-mono text-xs text-accent font-bold w-8 h-8 flex items-center justify-center border border-accent/40 rounded-full flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-stone-900 dark:text-ink-50 group-hover:text-accent transition-colors duration-300 mb-2">
                      {edu.degree}
                    </h3>
                    <p className="font-mono text-sm text-accent/80 tracking-wide">{edu.institution}</p>
                  </div>

                  <div aria-hidden="true" className="hidden sm:flex w-10 h-10 items-center justify-center text-stone-300 dark:text-ink-700 group-hover:text-accent/50 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                </div>

                <div aria-hidden="true" className="w-12 h-px bg-stone-200 dark:bg-ink-700 group-hover:bg-accent/40 transition-colors mb-4" />
                <p className="font-body text-sm md:text-base text-stone-500 dark:text-ink-400 leading-relaxed">{edu.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
