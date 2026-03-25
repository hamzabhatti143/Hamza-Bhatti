"use client";

import { useEffect, useRef } from "react";
import { experiences } from "@/data/portfolio";

function onTiltMove(e: React.MouseEvent<HTMLElement>) {
  const el   = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x    = (e.clientX - rect.left) / rect.width  - 0.5;
  const y    = (e.clientY - rect.top)  / rect.height - 0.5;
  el.style.transition = "transform 0.08s ease";
  el.style.transform  = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
}

function onTiltLeave(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.transition = "transform 0.7s cubic-bezier(0.23,1,0.32,1)";
  el.style.transform  = "perspective(800px) rotateX(0deg) rotateY(0deg)";
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".exp-card").forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 180);
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
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
    >
      {/* ── 3D floating decorations ── */}
      <div
        aria-hidden="true"
        className="absolute top-16 right-[6%] pointer-events-none opacity-[0.12] dark:opacity-[0.07]"
        style={{
          width: 80, height: 80,
          border: "1px solid rgba(200,169,110,0.55)",
          transformStyle: "preserve-3d",
          animation: "cubeFloat 17s ease-in-out infinite",
          transform: "rotateX(28deg) rotateY(28deg)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-16 right-[6%] pointer-events-none opacity-[0.07] dark:opacity-[0.04]"
        style={{
          width: 80, height: 80,
          border: "1px solid rgba(200,169,110,0.4)",
          transformStyle: "preserve-3d",
          animation: "cubeFloat 17s ease-in-out infinite",
          transform: "rotateX(28deg) rotateY(28deg) rotateZ(45deg)",
          animationDelay: "-3s",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-28 left-[4%] pointer-events-none opacity-[0.10] dark:opacity-[0.06]"
        style={{
          width: 55, height: 55,
          border: "1px solid rgba(200,169,110,0.5)",
          animation: "diamondFloat 13s ease-in-out infinite",
          transform: "rotate(45deg) rotateX(20deg)",
          animationDelay: "-5s",
        }}
      />
      <div
        aria-hidden="true"
        className="sphere-3d absolute top-1/3 left-[1%] pointer-events-none opacity-[0.08] dark:opacity-[0.04]"
        style={{ width: 40, height: 40 }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-16 right-[10%] pointer-events-none opacity-[0.07] dark:opacity-[0.04]"
        style={{
          width: 36, height: 36,
          border: "1px solid rgba(200,169,110,0.45)",
          animation: "diamondFloat 10s ease-in-out infinite",
          transform: "rotate(45deg)",
          animationDelay: "-2s",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
            Where I&apos;ve worked
          </p>
          <h2 id="experience-heading" className="font-display text-4xl md:text-5xl font-bold text-stone-900 dark:text-ink-50">
            Work{" "}
            <span className="italic text-accent font-normal">Experience</span>
          </h2>
          <div aria-hidden="true" className="section-rule w-full mt-8" />
        </div>

        <ol className="relative" aria-label="Work experience timeline">
          <div aria-hidden="true" className="hidden md:block absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-accent/40 via-stone-200 dark:via-ink-800 to-transparent" />

          {experiences.map((exp, index) => (
            <li
              key={`${exp.company}-${index}`}
              className="exp-card relative md:pl-20 mb-12 last:mb-0"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.6s ease ${index * 0.18}s, transform 0.6s ease ${index * 0.18}s`,
              }}
            >
              {/* Timeline dot */}
              <div aria-hidden="true" className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-full border border-stone-200 dark:border-ink-700 bg-stone-50 dark:bg-ink-900 items-center justify-center">
                <span className="font-mono text-xs text-accent font-bold">{String(index + 1).padStart(2, "0")}</span>
              </div>

              <article
                className="card-hover bg-white/70 dark:bg-ink-900/60 border border-stone-200 dark:border-ink-800 rounded-lg p-7 md:p-8 group"
                aria-label={`${exp.role} at ${exp.company}`}
                onMouseMove={onTiltMove}
                onMouseLeave={onTiltLeave}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                  <span aria-hidden="true" className="md:hidden font-mono text-xs text-accent font-bold w-8 h-8 flex items-center justify-center border border-accent/40 rounded-full flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-stone-900 dark:text-ink-50 group-hover:text-accent transition-colors duration-300">
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 tracking-wider">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-sm text-accent/80 tracking-wide">{exp.company}</p>
                  </div>

                  <span className="font-mono text-xs text-stone-400 dark:text-ink-500 whitespace-nowrap pt-1 flex-shrink-0">
                    {exp.period}
                  </span>
                </div>

                <div aria-hidden="true" className="w-12 h-px bg-stone-200 dark:bg-ink-700 group-hover:bg-accent/40 transition-colors mb-5" />

                <ul className="space-y-3" aria-label="Responsibilities">
                  {exp.points.map((point, pi) => (
                    <li key={pi} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                      <p className="font-body text-sm md:text-base text-stone-500 dark:text-ink-400 leading-relaxed">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
