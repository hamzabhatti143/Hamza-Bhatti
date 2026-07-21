"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { sendMessage, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-ink-950 font-body font-semibold text-sm tracking-wide rounded hover:bg-accent-light transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
    >
      {pending ? "Sending…" : "Send Message"}
      {!pending && (
        <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      )}
    </button>
  );
}

export default function ContactForm({ email }: { email: string }) {
  const [state, formAction] = useFormState(sendMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form on success; open the user's mail client on fallback.
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
    if (state.status === "fallback" && state.values) {
      const { name, email: from, message } = state.values;
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`From: ${name} <${from}>\n\n${message}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }
  }, [state, email]);

  const isError = state.status === "error";
  const isSuccess = state.status === "success";

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block font-mono text-xs tracking-widest uppercase text-stone-500 dark:text-ink-400 mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-stone-300 dark:border-ink-700 bg-white/60 dark:bg-ink-950/60 px-4 py-3 font-body text-sm text-stone-900 dark:text-ink-100 placeholder:text-stone-400 dark:placeholder:text-ink-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-xs tracking-widest uppercase text-stone-500 dark:text-ink-400 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-stone-300 dark:border-ink-700 bg-white/60 dark:bg-ink-950/60 px-4 py-3 font-body text-sm text-stone-900 dark:text-ink-100 placeholder:text-stone-400 dark:placeholder:text-ink-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs tracking-widest uppercase text-stone-500 dark:text-ink-400 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-lg border border-stone-300 dark:border-ink-700 bg-white/60 dark:bg-ink-950/60 px-4 py-3 font-body text-sm text-stone-900 dark:text-ink-100 placeholder:text-stone-400 dark:placeholder:text-ink-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y"
          placeholder="Tell me about your project…"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
        {state.message && (
          <p
            role="status"
            aria-live="polite"
            className={`font-body text-sm ${
              isError ? "text-red-500 dark:text-red-400" : isSuccess ? "text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-ink-400"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
