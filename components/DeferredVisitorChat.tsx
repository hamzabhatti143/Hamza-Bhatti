"use client";

import dynamic from "next/dynamic";

// Load the chat widget (and its markdown dependencies) client-side only, after
// hydration — so it never blocks the initial paint or the LCP. The floating
// button is position: fixed, so deferring it causes no layout shift.
const VisitorChat = dynamic(() => import("@/components/VisitorChat"), {
  ssr: false,
});

export default function DeferredVisitorChat() {
  return <VisitorChat />;
}
