"use client";

import { useEffect, useRef } from "react";
import { skillCategories } from "@/data/portfolio";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".skill-card").forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} aria-labelledby="skills-heading" className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden">
      {/* ── 3D floating decorations ── */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-[3%] pointer-events-none opacity-[0.10] dark:opacity-[0.06]"
        style={{
          width: 65, height: 65,
          border: "1px solid rgba(200,169,110,0.55)",
          transformStyle: "preserve-3d",
          animation: "cubeFloat 15s ease-in-out infinite",
          transform: "rotateX(30deg) rotateY(20deg)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 right-[4%] pointer-events-none opacity-[0.08] dark:opacity-[0.05]"
        style={{
          width: 50, height: 50,
          border: "1px solid rgba(200,169,110,0.5)",
          animation: "diamondFloat 11s ease-in-out infinite",
          transform: "rotate(45deg) rotateX(15deg)",
          animationDelay: "-4s",
        }}
      />
      <div
        aria-hidden="true"
        className="sphere-3d absolute top-1/2 right-[1%] pointer-events-none opacity-[0.07] dark:opacity-[0.04]"
        style={{ width: 38, height: 38 }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-[1%] pointer-events-none opacity-[0.06] dark:opacity-[0.04]"
        style={{
          width: 32, height: 32,
          border: "1px solid rgba(200,169,110,0.45)",
          animation: "diamondFloat 9s ease-in-out infinite",
          transform: "rotate(45deg)",
          animationDelay: "-2s",
        }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
            What I work with
          </p>
          <h2 id="skills-heading" className="font-display text-4xl md:text-5xl font-bold text-stone-900 dark:text-ink-50 mb-4">
            Skills &{" "}
            <span className="italic text-accent font-normal">Expertise</span>
          </h2>
          <div aria-hidden="true" className="section-rule w-full mt-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Skill categories">
          {skillCategories.map((cat, index) => (
            <article
              key={cat.category}
              role="listitem"
              aria-label={`${cat.category} skills`}
              className="skill-card card-hover bg-white/70 dark:bg-ink-900/60 border border-stone-200 dark:border-ink-800 rounded-lg p-6 group"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
              }}
            >
              <span aria-hidden="true" className="font-mono text-xs text-stone-300 dark:text-ink-700 group-hover:text-accent/40 transition-colors mb-3 block">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="font-display text-lg font-semibold text-stone-800 dark:text-ink-100 mb-4 group-hover:text-accent transition-colors duration-300">
                {cat.category}
              </h3>

              <ul className="flex flex-wrap gap-2" aria-label={`${cat.category} skill list`}>
                {cat.skills.map((skill) => (
                  <li key={skill}>
                    <span className="skill-pill inline-block px-3 py-1 text-xs font-mono text-stone-500 dark:text-ink-400 border border-stone-200 dark:border-ink-800 rounded-full">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
