"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch / coarse-pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;   // exact mouse position
    let rx = 0, ry = 0;   // ring lerp position
    let entered  = false;
    let hovering = false;
    let visible  = false;
    let raf      = 0;

    /* ── position helpers ── */
    const moveDot = () => {
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };

    /* ── mouse move ── */
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // snap ring to cursor on very first entry so it doesn't fly in
      if (!entered) { rx = mx; ry = my; entered = true; }
      moveDot();
      if (!visible) {
        visible = true;
        dot.style.opacity  = hovering ? "0" : "1";
        ring.style.opacity = "1";
      }
    };

    /* ── cursor leaves window ── */
    const onLeave = () => {
      visible = false;
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
    };

    /* ── interactive-element detection ── */
    const isInteractive = (t: EventTarget | null) =>
      !!(t as HTMLElement)?.closest(
        "a, button, [role='button'], input, textarea, label, select"
      );

    /* ── hover over link / button ── */
    const onOver = (e: MouseEvent) => {
      if (!isInteractive(e.target)) return;
      hovering = true;
      dot.style.opacity      = "0";
      ring.style.width       = "48px";
      ring.style.height      = "48px";
      ring.style.borderColor = "rgba(200,169,110,0.9)";
      ring.style.background  = "rgba(200,169,110,0.07)";
      ring.style.borderWidth = "1.5px";
    };

    /* ── leave link / button ── */
    const onOut = (e: MouseEvent) => {
      if (!isInteractive(e.target)) return;
      hovering = false;
      if (visible) dot.style.opacity = "1";
      ring.style.width       = "30px";
      ring.style.height      = "30px";
      ring.style.borderColor = "rgba(200,169,110,0.55)";
      ring.style.background  = "transparent";
      ring.style.borderWidth = "1px";
    };

    /* ── click flash ── */
    const onDown = () => {
      dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%) scale(0.5)`;
      ring.style.background = "rgba(200,169,110,0.12)";
    };
    const onUp = () => {
      moveDot();
      if (!hovering) ring.style.background = "transparent";
    };

    /* ── smooth ring follow ── */
    const animate = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(animate);
    };

    document.documentElement.classList.add("custom-cursor");
    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Small filled dot — follows cursor exactly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none opacity-0"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#c8a96e",
          willChange: "transform",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Ring — lags behind with lerp, expands on interactive hover */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none opacity-0"
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1px solid rgba(200,169,110,0.55)",
          willChange: "transform",
          transition:
            "width 0.2s ease, height 0.2s ease, " +
            "border-color 0.2s ease, border-width 0.2s ease, " +
            "background 0.2s ease, opacity 0.25s ease",
        }}
      />
    </>
  );
}
