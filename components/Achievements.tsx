"use client";

import { useEffect, useRef } from "react";
import { achievements, stats } from "@/data/portfolio";

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".ach-item").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0) scale(1)";
              }, i * 90);
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
    <section
      id="achievements"
      ref={sectionRef}
      aria-labelledby="achievements-heading"
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
    >
      {/* ── 3D floating decorations ── */}
      <div
        aria-hidden="true"
        className="absolute top-14 right-[5%] pointer-events-none opacity-[0.11] dark:opacity-[0.07]"
        style={{
          width: 72, height: 72,
          border: "1px solid rgba(200,169,110,0.55)",
          transformStyle: "preserve-3d",
          animation: "cubeFloat 16s ease-in-out infinite",
          transform: "rotateX(25deg) rotateY(30deg)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-24 left-[3%] pointer-events-none opacity-[0.09] dark:opacity-[0.05]"
        style={{
          width: 50, height: 50,
          border: "1px solid rgba(200,169,110,0.5)",
          animation: "diamondFloat 13s ease-in-out infinite",
          transform: "rotate(45deg) rotateX(18deg)",
          animationDelay: "-4s",
        }}
      />
      <div
        aria-hidden="true"
        className="sphere-3d absolute top-1/2 left-[1%] pointer-events-none opacity-[0.07] dark:opacity-[0.04]"
        style={{ width: 38, height: 38 }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-[2%] pointer-events-none opacity-[0.06] dark:opacity-[0.04]"
        style={{
          width: 34, height: 34,
          border: "1px solid rgba(200,169,110,0.45)",
          animation: "diamondFloat 10s ease-in-out infinite",
          transform: "rotate(45deg)",
          animationDelay: "-2s",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
            Recognition &amp; credentials
          </p>
          <h2 id="achievements-heading" className="font-display text-4xl md:text-5xl font-bold text-stone-900 dark:text-ink-50">
            Achievements &amp;{" "}
            <span className="italic text-accent font-normal">Certifications</span>
          </h2>
          <div aria-hidden="true" className="section-rule w-full mt-8" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14" role="list" aria-label="Key metrics">
          {stats.map((s, i) => (
            <div
              key={s.label}
              role="listitem"
              className="ach-item card-hover bg-white/70 dark:bg-ink-900/60 border border-stone-200 dark:border-ink-800 rounded-lg p-5 text-center"
              style={{
                opacity: 0,
                transform: "translateY(16px) scale(0.97)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-1">{s.value}</p>
              <p className="font-body text-sm font-medium text-stone-700 dark:text-ink-200 mb-0.5">{s.label}</p>
              <p className="font-mono text-[10px] text-stone-400 dark:text-ink-600">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" role="list" aria-label="Achievements and certifications">
          {achievements.map((ach, i) => (
            <article
              key={ach.title}
              role="listitem"
              aria-label={`${ach.type === "award" ? "Award" : "Certification"}: ${ach.title}`}
              className="ach-item card-hover bg-white/70 dark:bg-ink-900/60 border border-stone-200 dark:border-ink-800 rounded-lg p-6 group flex items-start gap-4"
              style={{
                opacity: 0,
                transform: "translateY(16px) scale(0.97)",
                transition: `opacity 0.5s ease ${(i + 4) * 0.09}s, transform 0.5s ease ${(i + 4) * 0.09}s`,
              }}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${
                ach.type === "award"
                  ? "border-amber-500/30 bg-amber-500/10"
                  : "border-sky-500/30 bg-sky-500/10"
              }`}>
                {ach.type === "award" ? (
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                ) : (
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-display text-base font-semibold text-stone-900 dark:text-ink-50 group-hover:text-accent transition-colors duration-300 leading-snug">
                    {ach.title}
                  </h3>
                  <span className={`flex-shrink-0 font-mono text-[9px] px-2 py-0.5 rounded-full border tracking-wider ${
                    ach.type === "award"
                      ? "text-amber-500 border-amber-500/30 bg-amber-500/10"
                      : "text-sky-500 border-sky-500/30 bg-sky-500/10"
                  }`}>
                    {ach.type === "award" ? "Award" : "Cert"}
                  </span>
                </div>
                <p className="font-mono text-xs text-stone-400 dark:text-ink-500 leading-relaxed">{ach.issuer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
