"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { personalInfo } from "@/data/portfolio";

/* ── CSS 3D wireframe cube model ── */
function WireframeCube({
  size, color, duration, className, style,
}: { size: number; color: string; duration: string; className?: string; style?: React.CSSProperties }) {
  const h = size / 2;
  const faces: [string, string][] = [
    ["front",  `translateZ(${h}px)`],
    ["back",   `rotateY(180deg) translateZ(${h}px)`],
    ["left",   `rotateY(-90deg) translateZ(${h}px)`],
    ["right",  `rotateY(90deg) translateZ(${h}px)`],
    ["top",    `rotateX(90deg) translateZ(${h}px)`],
    ["bottom", `rotateX(-90deg) translateZ(${h}px)`],
  ];
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className ?? ""}`}
      style={{ width: size, height: size, transformStyle: "preserve-3d", animation: `cubeFloat ${duration} ease-in-out infinite`, ...style }}
    >
      {faces.map(([name, transform]) => (
        <div key={name} style={{ position: "absolute", width: size, height: size, border: `1px solid ${color}`, background: "transparent", transform }} />
      ))}
    </div>
  );
}

/* ── CSS 3D diamond (two crossed planes) ── */
function FloatingDiamond({
  size, color, duration, className, style,
}: { size: number; color: string; duration: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className ?? ""}`}
      style={{ width: size, height: size, transformStyle: "preserve-3d", animation: `diamondFloat ${duration} ease-in-out infinite`, ...style }}
    >
      <div style={{ position: "absolute", width: size, height: size, border: `1px solid ${color}`, transform: "rotate(45deg) rotateX(30deg)" }} />
      <div style={{ position: "absolute", width: size, height: size, border: `1px solid ${color}`, transform: "rotate(45deg) rotateX(30deg) rotateZ(60deg)", opacity: 0.5 }} />
      <div style={{ position: "absolute", width: size, height: size, border: `1px solid ${color}`, transform: "rotate(45deg) rotateX(30deg) rotateZ(120deg)", opacity: 0.3 }} />
    </div>
  );
}

/* ── CSS 3D sphere ── */
function FloatingSphere({
  size, className,
}: { size: number; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none sphere-3d ${className ?? ""}`}
      style={{ width: size, height: size }}
    />
  );
}

export default function Hero() {
  const heroRef  = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [photoError, setPhotoError] = useState(false);

  /* ── Mouse-parallax tilt ── */
  useEffect(() => {
    const hero  = heroRef.current;
    const photo = photoRef.current;
    if (!hero || !photo) return;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        photo.style.transition = "transform 0.12s ease";
        photo.style.transform  = `perspective(900px) rotateY(${x * 18}deg) rotateX(${-y * 12}deg) translateZ(30px)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      photo.style.transition = "transform 1s cubic-bezier(0.23,1,0.32,1)";
      photo.style.transform  = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => { hero.removeEventListener("mousemove", onMove); hero.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(raf); };
  }, []);

  const accentFaint = "rgba(200,169,110,0.18)";
  const accentSoft  = "rgba(200,169,110,0.12)";

  return (
    <section
      ref={heroRef}
      aria-label="Hero — introduction"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-10"
    >
      {/* ── Background grid (theme-aware via CSS var) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Radial glow — right ── */}
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[650px] h-[650px]"
        style={{ background: "radial-gradient(ellipse at right center, rgba(200,169,110,0.09) 0%, transparent 65%)" }} />

      {/* ── Ghost profile background (blurred photo layer) ── */}
      {!photoError && (
        <div aria-hidden="true" className="pointer-events-none absolute right-[-4%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] overflow-hidden rounded-full opacity-[0.06] dark:opacity-[0.035]">
          <Image src="/images/profile-pic.jpeg" alt="" fill className="object-cover object-top blur-3xl scale-110" priority />
        </div>
      )}

      {/* ── 3D Decoration models (background) ── */}
      {/* Large cube — top-left */}
      <WireframeCube size={110} color={accentFaint} duration="18s" className="top-28 left-[5%] opacity-60 dark:opacity-40" />
      {/* Small cube — bottom-right */}
      <WireframeCube size={60} color={accentSoft} duration="12s" className="bottom-32 right-[8%] opacity-50 dark:opacity-30" style={{ animationDelay: "-6s" } as React.CSSProperties} />
      {/* Diamond — top-right area */}
      <FloatingDiamond size={80} color={accentFaint} duration="14s" className="top-36 right-[18%] opacity-50 dark:opacity-35" />
      {/* Small diamond — bottom-left */}
      <FloatingDiamond size={45} color={accentSoft} duration="10s" className="bottom-24 left-[12%] opacity-40 dark:opacity-25" style={{ animationDelay: "-5s" } as React.CSSProperties} />
      {/* Sphere — mid-left */}
      <FloatingSphere size={70} className="top-1/3 left-[3%] opacity-30 dark:opacity-20" />

      {/* ── Two-column layout ── */}
      <div className="relative max-w-6xl mx-auto w-full pt-28 pb-20 md:pt-32 md:pb-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* ─── LEFT ─── */}
        <div>
          <p className="animate-float-up font-mono text-xs tracking-[0.3em] uppercase text-accent mb-8 flex items-center gap-3" aria-label="Status: Available for work">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-accent opacity-70" />
            Available for work
          </p>

          <h1 className="font-display text-6xl sm:text-7xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6">
            <span className="block overflow-hidden">
              <span className="block animate-reveal-line text-stone-900 dark:text-ink-50">
                {personalInfo.name.split(" ")[0]}
              </span>
            </span>
            <span className="block overflow-hidden mt-1">
              <span className="block animate-reveal-line text-shimmer" style={{ animationDelay: "0.15s" }}>
                {personalInfo.name.split(" ")[1]}
              </span>
            </span>
          </h1>

          <div aria-hidden="true" className="animate-float-up-delay w-20 h-px bg-gradient-to-r from-accent to-transparent mb-7" />

          <p className="animate-float-up-delay font-body text-xl md:text-2xl font-light text-stone-600 dark:text-ink-200 max-w-md leading-relaxed mb-3">
            {personalInfo.tagline}
          </p>

          <p className="animate-float-up-delay-2 font-body text-base text-stone-500 dark:text-ink-400 max-w-sm leading-relaxed mb-10">
            {personalInfo.bio}
          </p>

          {/* CTAs */}
          <div className="animate-float-up-delay-2 flex flex-wrap gap-3" role="group" aria-label="Call to action">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-ink-950 font-body font-semibold text-sm tracking-wide rounded hover:bg-accent-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
            >
              View Projects
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>

            <a
              href={personalInfo.resumeUrl}
              download
              aria-label="Download resume PDF"
              className="resume-btn-glow inline-flex items-center gap-2 px-6 py-3 border border-accent/50 text-accent font-body font-medium text-sm tracking-wide rounded hover:bg-accent/10 hover:border-accent transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub (opens in new tab)"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 dark:border-ink-700 text-stone-500 dark:text-ink-400 font-body font-medium text-sm tracking-wide rounded hover:border-stone-400 dark:hover:border-ink-500 hover:text-stone-700 dark:hover:text-ink-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Scroll indicator */}
          <div aria-hidden="true" className="animate-float-up-delay-3 mt-14 flex items-center gap-3">
            {/* Mouse icon */}
            <div className="relative flex-shrink-0 w-6 h-10 rounded-full border-2 border-stone-400 dark:border-ink-400 flex justify-center pt-1.5">
              <div className="w-1 h-2.5 rounded-full bg-accent" style={{ animation: "scrollLine 2s ease-in-out infinite" }} />
            </div>
            <span className="font-mono text-xs tracking-widest uppercase text-stone-500 dark:text-ink-400">Scroll</span>
          </div>
        </div>

        {/* ─── RIGHT — 3D photo ─── */}
        <div className="hidden md:flex items-center justify-center">
          <div ref={photoRef} className="relative will-change-transform" style={{ transformStyle: "preserve-3d" }}>

            {/* Morphing blob */}
            <div aria-hidden="true" className="blob-morph absolute"
              style={{ width: 360, height: 360, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(ellipse at center, rgba(200,169,110,0.14) 0%, rgba(168,137,62,0.06) 55%, transparent 80%)", zIndex: 0 }} />

            {/* Ripple rings */}
            {[0, 1, 2].map((i) => (
              <div key={i} aria-hidden="true" className="ripple-ring" style={{ width: 288, height: 288, animationDelay: `${i * 1.4}s`, animationDuration: "4.2s", zIndex: 0 }} />
            ))}

            {/* 3D spinning rings */}
            <div aria-hidden="true" className="ring-3d absolute rounded-full border border-accent/20"
              style={{ width: 390, height: 390, top: "50%", left: "50%", transform: "translate(-50%,-50%) rotateX(70deg)", "--ring-dur": "10s", zIndex: 0 } as React.CSSProperties} />
            <div aria-hidden="true" className="absolute rounded-full border border-accent/10"
              style={{ width: 440, height: 440, top: "50%", left: "50%", transform: "translate(-50%,-50%) rotateX(70deg)", animation: "ringRotate 14s linear infinite reverse", zIndex: 0 }} />

            {/* Orbit particles */}
            {([
              { r: "168px", dur: "7s",  dir: false, sz: "10px", color: "bg-accent",     delay: "0s" },
              { r: "190px", dur: "11s", dir: true,  sz: "8px",  color: "bg-stone-400 dark:bg-ink-300", delay: "-4s" },
              { r: "148px", dur: "9s",  dir: false, sz: "8px",  color: "bg-accent/50",  delay: "-3s" },
              { r: "172px", dur: "13s", dir: true,  sz: "6px",  color: "bg-accent/70",  delay: "-7s" },
            ] as const).map((p, i) => (
              <div key={i} aria-hidden="true"
                className={p.dir ? "orbit-particle-reverse" : "orbit-particle"}
                style={{ "--orbit-r": p.r, "--orbit-dur": p.dur, animationDelay: p.delay, zIndex: 1 } as React.CSSProperties}
              >
                <div className={`w-full h-full rounded-full ${p.color}`} style={{ width: p.sz, height: p.sz }} />
              </div>
            ))}

            {/* Photo + float3D + badges */}
            <div className="photo-float relative" style={{ transformStyle: "preserve-3d", zIndex: 2 }}>
              {/* Glow ring */}
              <div aria-hidden="true" className="photo-glow absolute -inset-1.5 rounded-full"
                style={{ background: "linear-gradient(135deg, rgba(200,169,110,0.45), rgba(168,137,62,0.12), rgba(200,169,110,0.45))" }} />

              {/* Photo */}
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-2 border-accent/50">
                {!photoError ? (
                  <Image src="/images/profile-pic.jpeg" alt="Hamza Bhatti — Frontend Developer" fill className="object-cover object-top" onError={() => setPhotoError(true)} priority />
                ) : (
                  <div className="w-full h-full bg-stone-100 dark:bg-ink-800 flex flex-col items-center justify-center gap-2">
                    <span className="font-display text-5xl font-bold text-accent">Hamza Bhatti</span>
                  </div>
                )}
              </div>

              {/* Floating badges */}
              <div className="float-tag-3d absolute -bottom-5 left-1/2 px-5 py-2 rounded-full border border-accent/35 navbar-glass whitespace-nowrap" style={{ transform: "translateX(-50%) translateZ(50px)" }} aria-hidden="true">
                <span className="font-mono text-xs text-accent tracking-widest">Frontend Dev</span>
              </div>
              <div className="float-tag-3d absolute -top-4 -right-8 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-ink-700 bg-white/90 dark:bg-ink-900/90 backdrop-blur-sm" style={{ transform: "translateZ(55px)" }} aria-hidden="true">
                <span className="font-mono text-xs text-blue-500 dark:text-blue-400">TypeScript ✦</span>
              </div>
              <div className="float-tag-3d absolute top-1/3 -left-12 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-ink-700 bg-white/90 dark:bg-ink-900/90 backdrop-blur-sm" style={{ transform: "translateY(-50%) translateZ(55px)" }} aria-hidden="true">
                <span className="font-mono text-xs text-stone-700 dark:text-ink-300">Next.js</span>
              </div>
              <div className="float-tag-3d absolute top-6 -left-6 px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800/60 bg-purple-50/80 dark:bg-purple-950/50 backdrop-blur-sm" style={{ transform: "translateZ(45px)" }} aria-hidden="true">
                <span className="font-mono text-xs text-purple-600 dark:text-purple-400">AI Builder</span>
              </div>
              <div className="float-tag-3d absolute -bottom-1 -right-10 px-3 py-1.5 rounded-lg border border-sky-200 dark:border-sky-800/60 bg-sky-50/80 dark:bg-sky-950/50 backdrop-blur-sm" style={{ transform: "translateZ(40px)" }} aria-hidden="true">
                <span className="font-mono text-xs text-sky-600 dark:text-sky-400">Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile photo ── */}
      <div className="md:hidden flex justify-center pb-20 relative">
        <div className="relative will-change-transform">

          {/* Morphing blob */}
          <div aria-hidden="true" className="blob-morph absolute"
            style={{ width: 280, height: 280, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(ellipse at center, rgba(200,169,110,0.14) 0%, rgba(168,137,62,0.06) 55%, transparent 80%)", zIndex: 0 }} />

          {/* Ripple rings */}
          {[0, 1, 2].map((i) => (
            <div key={i} aria-hidden="true" className="ripple-ring" style={{ width: 208, height: 208, animationDelay: `${i * 1.4}s`, animationDuration: "4.2s", zIndex: 0 }} />
          ))}

          {/* 3D spinning rings */}
          <div aria-hidden="true" className="ring-3d absolute rounded-full border border-accent/20"
            style={{ width: 296, height: 296, top: "50%", left: "50%", transform: "translate(-50%,-50%) rotateX(70deg)", "--ring-dur": "10s", zIndex: 0 } as React.CSSProperties} />
          <div aria-hidden="true" className="absolute rounded-full border border-accent/10"
            style={{ width: 336, height: 336, top: "50%", left: "50%", transform: "translate(-50%,-50%) rotateX(70deg)", animation: "ringRotate 14s linear infinite reverse", zIndex: 0 }} />

          {/* Orbit particles */}
          {([
            { r: "118px", dur: "7s",  dir: false, sz: "8px",  color: "bg-accent",    delay: "0s"  },
            { r: "132px", dur: "11s", dir: true,  sz: "6px",  color: "bg-accent/50", delay: "-4s" },
            { r: "108px", dur: "9s",  dir: false, sz: "6px",  color: "bg-accent/70", delay: "-3s" },
          ] as const).map((p, i) => (
            <div key={i} aria-hidden="true"
              className={p.dir ? "orbit-particle-reverse" : "orbit-particle"}
              style={{ "--orbit-r": p.r, "--orbit-dur": p.dur, animationDelay: p.delay, zIndex: 1 } as React.CSSProperties}
            >
              <div className={`rounded-full ${p.color}`} style={{ width: p.sz, height: p.sz }} />
            </div>
          ))}

          {/* Photo + float3D + glow + badges */}
          <div className="photo-float relative" style={{ transformStyle: "preserve-3d", zIndex: 2 }}>
            {/* Glow ring */}
            <div aria-hidden="true" className="photo-glow absolute -inset-1.5 rounded-full"
              style={{ background: "linear-gradient(135deg, rgba(200,169,110,0.45), rgba(168,137,62,0.12), rgba(200,169,110,0.45))" }} />

            {/* Photo */}
            <div className="relative w-52 h-52 rounded-full overflow-hidden border-2 border-accent/50">
              {!photoError ? (
                <Image src="/images/profile-pic.jpeg" alt="Hamza Bhatti" fill className="object-cover object-top" onError={() => setPhotoError(true)} />
              ) : (
                <div className="w-full h-full bg-stone-100 dark:bg-ink-800 flex items-center justify-center">
                  <span className="font-display text-4xl font-bold text-accent">HB</span>
                </div>
              )}
            </div>

            {/* Floating badges */}
            <div className="float-tag-3d absolute -bottom-5 left-1/2 px-4 py-1.5 rounded-full border border-accent/35 navbar-glass whitespace-nowrap" style={{ transform: "translateX(-50%) translateZ(30px)" }} aria-hidden="true">
              <span className="font-mono text-[10px] text-accent tracking-widest">Frontend Dev</span>
            </div>
            <div className="float-tag-3d absolute -top-3 -right-6 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-ink-700 bg-white/90 dark:bg-ink-900/90 backdrop-blur-sm" style={{ transform: "translateZ(35px)" }} aria-hidden="true">
              <span className="font-mono text-[10px] text-blue-500 dark:text-blue-400">TypeScript ✦</span>
            </div>
            <div className="float-tag-3d absolute top-1/3 -left-10 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-ink-700 bg-white/90 dark:bg-ink-900/90 backdrop-blur-sm" style={{ transform: "translateY(-50%) translateZ(35px)" }} aria-hidden="true">
              <span className="font-mono text-[10px] text-stone-700 dark:text-ink-300">Next.js</span>
            </div>
            <div className="float-tag-3d absolute top-4 -left-5 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800/60 bg-purple-50/80 dark:bg-purple-950/50 backdrop-blur-sm" style={{ transform: "translateZ(28px)" }} aria-hidden="true">
              <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400">AI Builder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
