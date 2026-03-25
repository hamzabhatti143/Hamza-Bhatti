"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="relative w-9 h-9 flex items-center justify-center rounded-lg border
        border-stone-300 dark:border-ink-700
        text-stone-500 dark:text-ink-400
        hover:border-accent hover:text-accent
        bg-white/60 dark:bg-transparent
        transition-all duration-300 overflow-hidden group"
    >
      {/* Sun — visible in dark mode (click to go light) */}
      <span
        aria-hidden="true"
        className={`absolute transition-all duration-500 ${
          isLight
            ? "opacity-0 scale-50 rotate-90"
            : "opacity-100 scale-100 rotate-0"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1"  x2="12" y2="3"  />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22"  x2="5.64"  y2="5.64"  />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1"  y1="12" x2="3"  y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64"  y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"  />
        </svg>
      </span>

      {/* Moon — visible in light mode (click to go dark) */}
      <span
        aria-hidden="true"
        className={`absolute transition-all duration-500 ${
          isLight
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-50 -rotate-90"
        }`}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Hover ring glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%)" }}
      />
    </button>
  );
}
