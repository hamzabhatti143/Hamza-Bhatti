"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Add a new project",
  "Remove a project",
  "Add a skill",
  "Update my tagline",
  "Show all projects",
] as const;

const SECTIONS = ["Projects", "Skills", "Education", "Experience", "Achievements"] as const;

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("Projects");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef<string>(
    Math.random().toString(36).slice(2) + Date.now().toString(36)
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isAuthenticated) {
      inputRef.current?.focus();
    }
  }, [isAuthenticated]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (expected && password === expected) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Try again.");
      setPassword("");
    }
  }

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, password, session_id: sessionId.current }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? data.error ?? "No response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Is the backend running?" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 flex items-center justify-center gap-3">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-accent opacity-70" />
              Admin Panel
              <span aria-hidden="true" className="inline-block w-6 h-px bg-accent opacity-70" />
            </p>
            <h1 className="font-display text-3xl font-bold text-[var(--text-high)]">
              Portfolio CMS
            </h1>
            <p className="font-body text-sm text-[var(--text-mid)] mt-3 leading-relaxed">
              Enter your admin password to manage your portfolio content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError("");
                }}
                placeholder="Password"
                autoFocus
                className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-main)] rounded text-[var(--text-high)] font-body text-sm placeholder:text-[var(--text-low)] focus:outline-none focus:border-accent transition-colors duration-200"
              />
              {authError && (
                <p className="font-mono text-xs text-red-400 mt-2 pl-1">{authError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-accent text-ink-950 font-body font-semibold text-sm rounded hover:bg-accent-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
            >
              Unlock
            </button>
          </form>

          <p className="text-center font-mono text-xs text-[var(--text-low)] mt-8">
            <a href="/" className="hover:text-accent transition-colors duration-200">
              ← Back to portfolio
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-[var(--border-sub)] flex items-center px-6 bg-[var(--bg-surface)] shrink-0">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-accent">Admin</span>
        <span className="font-mono text-xs text-[var(--text-low)] ml-2">/ Portfolio CMS</span>
        <a
          href="/"
          className="ml-auto font-mono text-xs text-[var(--text-low)] hover:text-accent transition-colors duration-200"
        >
          ← Back to site
        </a>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 3.5rem)" }}>
        {/* Sidebar */}
        <aside className="w-52 border-r border-[var(--border-sub)] bg-[var(--bg-surface)] flex flex-col shrink-0 overflow-y-auto">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-low)] px-4 pt-5 pb-3">
            Sections
          </p>
          <nav>
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full text-left px-4 py-2.5 font-body text-sm transition-colors duration-200 border-r-2 ${
                  activeSection === section
                    ? "text-accent border-accent bg-accent/10"
                    : "text-[var(--text-mid)] border-transparent hover:text-[var(--text-high)] hover:bg-[var(--bg-card)]"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>

          <div className="mt-auto px-4 pb-5 pt-4 border-t border-[var(--border-sub)]">
            <p className="font-mono text-[10px] text-[var(--text-low)] leading-relaxed">
              Currently editing:{" "}
              <span className="text-accent">{activeSection}</span>
            </p>
          </div>
        </aside>

        {/* Chat area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center select-none">
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-5 flex items-center gap-3">
                  <span aria-hidden="true" className="inline-block w-6 h-px bg-accent opacity-70" />
                  Ready
                  <span aria-hidden="true" className="inline-block w-6 h-px bg-accent opacity-70" />
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-high)] mb-3">
                  Manage your portfolio
                </h2>
                <p className="font-body text-sm text-[var(--text-mid)] max-w-xs leading-relaxed">
                  Type a command or pick a suggestion below to update your{" "}
                  <span className="text-accent">{activeSection}</span> section.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[72%] px-4 py-3 rounded text-sm font-body leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-ink-950 font-medium"
                      : "bg-[var(--bg-card)] border border-[var(--border-sub)] text-[var(--text-high)]"
                  }`}
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => <p className="font-display font-bold text-base mb-1">{children}</p>,
                        h2: ({ children }) => <p className="font-display font-bold text-sm mb-1">{children}</p>,
                        h3: ({ children }) => <p className="font-semibold text-sm mb-1">{children}</p>,
                        p:  ({ children }) => <p className="mb-1.5 last:mb-0 leading-relaxed">{children}</p>,
                        ul: ({ children }) => <ul className="mb-1.5 space-y-0.5 pl-4 list-disc">{children}</ul>,
                        ol: ({ children }) => <ol className="mb-1.5 space-y-0.5 pl-4 list-decimal">{children}</ol>,
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-[var(--text-high)]">{children}</strong>,
                        code: ({ children }) => <code className="px-1 py-0.5 rounded text-xs font-mono bg-[var(--bg-surface)] border border-[var(--border-sub)]">{children}</code>,
                        a:  ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-light">{children}</a>,
                        hr: () => <hr className="my-2 border-[var(--border-sub)]" />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[var(--bg-card)] border border-[var(--border-sub)] px-4 py-3 rounded">
                  <span className="font-mono text-xs text-[var(--text-mid)] animate-pulse">
                    thinking…
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestion chips — only shown before first message */}
          {messages.length === 0 && (
            <div className="px-6 pb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="px-3 py-1.5 border border-[var(--border-main)] rounded font-mono text-xs text-[var(--text-mid)] hover:border-accent hover:text-accent transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div className="border-t border-[var(--border-sub)] bg-[var(--bg-surface)] px-6 py-4 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command…"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-main)] rounded text-[var(--text-high)] font-body text-sm placeholder:text-[var(--text-low)] focus:outline-none focus:border-accent transition-colors duration-200 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-5 py-2.5 bg-accent text-ink-950 font-body font-semibold text-sm rounded hover:bg-accent-light transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                Send
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
