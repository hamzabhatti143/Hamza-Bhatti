"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Load the chat widget (and its markdown dependencies) client-side only, after
// hydration — so it never blocks the initial paint or the LCP. The floating
// button is position: fixed, so deferring it causes no layout shift.
const VisitorChat = dynamic(() => import("@/components/VisitorChat"), {
  ssr: false,
});

export default function DeferredVisitorChat() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    // Import-on-interaction: the chat bundle (react-markdown + remark/rehype, ~24 KiB
    // in chunk 102) is only fetched once the visitor first interacts with the page.
    // Real users trigger it on their first scroll/tap/keypress, but it stays out of
    // the initial load entirely — so it no longer ships as unused JS on an idle
    // pageview (or during a Lighthouse audit, which performs no interaction).
    const show = () => setMount(true);
    const events = ["pointerdown", "keydown", "touchstart", "scroll", "mousemove"] as const;
    events.forEach((ev) => window.addEventListener(ev, show, { once: true, passive: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, show));
  }, []);

  return mount ? <VisitorChat /> : null;
}
