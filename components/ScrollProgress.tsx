"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.documentElement;
    // scrollHeight/clientHeight only change on resize — reading them on every scroll
    // event forces a synchronous reflow right after the progress-bar width write
    // (layout thrash). Cache the max scroll distance and only recompute on resize,
    // and read scrollTop inside rAF so the read/write are batched with paint.
    let max = el.scrollHeight - el.clientHeight;
    let ticking = false;

    const paint = () => {
      ticking = false;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paint);
      }
    };
    const onResize = () => {
      max = el.scrollHeight - el.clientHeight;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] h-[2px] bg-accent"
      style={{ width: `${pct}%`, transition: "width 0.1s linear" }}
    />
  );
}
