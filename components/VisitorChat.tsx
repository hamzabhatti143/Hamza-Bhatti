"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm Hamza's assistant. Ask me anything about his skills, projects, or experience.",
};

export default function VisitorChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef<string>(
    Math.random().toString(36).slice(2) + Date.now().toString(36)
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/visitor-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id: sessionId.current }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "Sorry, I couldn't get a response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-8 right-5 z-50 flex flex-col items-end gap-3">
      {/* ── Chat panel ── */}
      <div
        aria-live="polite"
        className={`transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-3 pointer-events-none"
        }`}
      >
        <div
          className="flex flex-col rounded-2xl border shadow-2xl overflow-hidden"
          style={{
            width: "min(360px, calc(100vw - 2.5rem))",
            maxHeight: "min(520px, calc(100vh - 140px))",
            background: "var(--bg-card)",
            borderColor: "var(--border-main)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-sub)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold select-none"
                style={{ background: "var(--accent)", color: "#0f0f0e" }}
              >
                H
              </div>
              <div>
                <p
                  className="text-sm font-semibold leading-none"
                  style={{ color: "var(--text-high)", fontFamily: "var(--font-dm-sans)" }}
                >
                  Ask about Hamza
                </p>
                <p
                  className="text-[10px] mt-0.5 tracking-wide"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-space-mono)" }}
                >
                  AI Assistant · online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 transition-colors hover:bg-[var(--border-sub)]"
              style={{ color: "var(--text-low)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
            style={{ minHeight: 0 }}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? {
                          background: "var(--accent)",
                          color: "#0f0f0e",
                          fontFamily: "var(--font-dm-sans)",
                          borderBottomRightRadius: "6px",
                        }
                      : {
                          background: "var(--bg-surface)",
                          color: "var(--text-high)",
                          border: "1px solid var(--border-sub)",
                          fontFamily: "var(--font-dm-sans)",
                          borderBottomLeftRadius: "6px",
                        }
                  }
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p:      ({ children }) => <p className="mb-1 last:mb-0 leading-relaxed">{children}</p>,
                        ul:     ({ children }) => <ul className="mb-1 pl-4 list-disc space-y-0.5">{children}</ul>,
                        ol:     ({ children }) => <ol className="mb-1 pl-4 list-decimal space-y-0.5">{children}</ol>,
                        li:     ({ children }) => <li className="leading-relaxed">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        a:      ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 opacity-80 hover:opacity-100">{children}</a>,
                        code:   ({ children }) => <code className="px-1 py-0.5 rounded text-xs font-mono opacity-80" style={{ background: "rgba(0,0,0,0.15)" }}>{children}</code>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="px-3.5 py-3 rounded-2xl border"
                  style={{
                    background: "var(--bg-surface)",
                    borderColor: "var(--border-sub)",
                    borderBottomLeftRadius: "6px",
                  }}
                >
                  <span className="flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{
                          background: "var(--accent)",
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: "0.8s",
                        }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input row */}
          <div
            className="flex items-center gap-2 px-3 py-3 border-t flex-shrink-0"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-sub)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something…"
              disabled={isTyping}
              aria-label="Chat input"
              className="flex-1 bg-transparent outline-none text-sm disabled:opacity-40"
              style={{
                color: "var(--text-high)",
                fontFamily: "var(--font-dm-sans)",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "var(--accent)" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0f0f0e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Toggle bubble ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Chat with Hamza's AI assistant"}
        aria-expanded={isOpen}
        className="relative flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex-shrink-0"
        style={{
          width: 52,
          height: 52,
          background: "var(--accent)",
          boxShadow: "0 8px 24px rgba(200,169,110,0.35)",
        }}
      >
        {/* Pulse ring — only when closed */}
        {!isOpen && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: "var(--accent)" }}
          />
        )}

        {/* Chat icon */}
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0f0f0e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`absolute transition-all duration-200 ${
            isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>

        {/* Close icon */}
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0f0f0e"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
          className={`absolute transition-all duration-200 ${
            isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
          }`}
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
