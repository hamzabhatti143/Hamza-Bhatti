"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el    = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] h-[2px] bg-accent"
      style={{ width: `${pct}%`, transition: "width 0.1s linear" }}
    />
  );
}
