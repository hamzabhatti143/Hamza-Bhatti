"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [ready,  setReady]  = useState(false);
  const [hiding, setHiding] = useState(false);
  const [gone,   setGone]   = useState(false);

  useEffect(() => {
    // Trigger animation only after hydration is complete
    const t0 = setTimeout(() => setReady(true),   50);
    const t1 = setTimeout(() => setHiding(true),  950);
    const t2 = setTimeout(() => setGone(true),   1500);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none bg-stone-50 dark:bg-ink-950 transition-opacity duration-500 ${
        hiding ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <span className="font-display text-6xl font-bold text-shimmer select-none">HB</span>

        <div className="relative w-36 h-[2px] bg-stone-200 dark:bg-ink-800 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-accent rounded-full"
            style={
              ready
                ? { animation: "loaderBar 0.85s cubic-bezier(0.4,0,0.2,1) forwards" }
                : { width: "0%" }
            }
          />
        </div>

        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-stone-400 dark:text-ink-600">
          Loading
        </p>
      </div>
    </div>
  );
}
