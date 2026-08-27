"use client";

import dynamic from "next/dynamic";

// The custom cursor is purely decorative and desktop-only (it early-returns on
// coarse-pointer devices). Loading it client-side only, after hydration, keeps its
// JS and rAF loop off the critical path so it never adds to initial main-thread work.
const CursorGlow = dynamic(() => import("@/components/CursorGlow"), {
  ssr: false,
});

export default function DeferredCursorGlow() {
  return <CursorGlow />;
}
