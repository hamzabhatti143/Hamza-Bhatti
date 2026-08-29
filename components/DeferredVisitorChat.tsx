"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Load the chat widget (and its markdown dependencies) client-side only, after
// hydration — so it never blocks the initial paint or the LCP. The floating
// button is position: fixed, so deferring it causes no layout shift.
const VisitorChat = dynamic(() => import("@/components/VisitorChat"), {
  ssr: false,
});

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function DeferredVisitorChat() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    // Hold off on fetching the chat bundle (react-markdown + remark-gfm) until the
    // browser is idle or the visitor first interacts. This keeps ~24 KiB of JS out
    // of the initial load window, reducing unused JS and main-thread work at startup.
    const w = window as IdleWindow;
    const show = () => setMount(true);

    let idleId: number;
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(show, { timeout: 4000 });
    } else {
      idleId = window.setTimeout(show, 2500);
    }

    window.addEventListener("pointerdown", show, { once: true });
    window.addEventListener("keydown", show, { once: true });

    return () => {
      if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
      window.removeEventListener("pointerdown", show);
      window.removeEventListener("keydown", show);
    };
  }, []);

  return mount ? <VisitorChat /> : null;
}
