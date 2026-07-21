"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PersonalInfo } from "@/lib/getPortfolio";
import { routeLinks } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

const DownloadIcon = () => (
  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function Navbar({
  personalInfo,
  navLinks,
}: {
  personalInfo: PersonalInfo;
  // Homepage section anchors (e.g. #skills). Optional — only shown on "/".
  navLinks?: readonly { label: string; href: string }[];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [logoError, setLogoError] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const isActive = (href: string) =>
    href === "/blog" ? pathname.startsWith("/blog") : pathname === href;

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome ? "navbar-glass" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]"
      >
        {/* ── Logo → home ── */}
        <Link
          href="/"
          aria-label="Hamza Bhatti — home"
          className="flex items-center gap-2.5 group"
        >
          {!logoError ? (
            <div className="relative w-9 h-9 rounded-lg overflow-hidden ring-1 ring-accent/30 group-hover:ring-accent/70 transition-all duration-300 bg-stone-800 dark:bg-transparent">
              <Image src="/images/logo.png" alt="Hamza Bhatti logo" fill sizes="36px" className="object-cover" onError={() => setLogoError(true)} priority />
            </div>
          ) : (
            <span className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-ink-800 ring-1 ring-accent/30 group-hover:ring-accent/60 transition-all duration-300 flex items-center justify-center font-display font-bold text-accent text-lg">
              H
            </span>
          )}
          <span className="font-display text-base font-semibold tracking-tight text-stone-900 dark:text-ink-50 group-hover:text-accent transition-colors duration-300">
            Hamza<span className="text-accent">.</span>
          </span>
        </Link>

        {/* ── Desktop route links ── */}
        <ul className="hidden md:flex items-center gap-7" role="list">
          {routeLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`font-body text-sm font-medium tracking-wide transition-colors duration-300 relative group focus-visible:outline-none ${
                  isActive(link.href)
                    ? "text-accent"
                    : "text-stone-600 dark:text-ink-300 hover:text-accent dark:hover:text-accent"
                }`}
              >
                {link.label}
                <span aria-hidden="true" className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right CTA group ── */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Hamza's GitHub profile (opens in new tab)"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium font-mono border border-stone-300 dark:border-ink-700 text-stone-600 dark:text-ink-300 rounded hover:border-accent hover:text-accent transition-all duration-300"
          >
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* ── Mobile trigger ── */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex flex-col gap-1.5 p-2 text-stone-500 dark:text-ink-300 hover:text-accent transition-colors"
          >
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`md:hidden overflow-hidden transition-all duration-500 navbar-glass ${menuOpen ? "max-h-[640px] py-5" : "max-h-0"}`}
      >
        <ul className="flex flex-col items-center gap-4 px-6" role="list">
          {routeLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`font-body text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                  isActive(link.href) ? "text-accent" : "text-stone-600 dark:text-ink-300 hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Homepage in-page sections — only on "/" */}
          {isHome && navLinks && navLinks.length > 0 && (
            <>
              <li aria-hidden="true" className="w-full flex items-center gap-3 pt-1">
                <span className="flex-1 h-px bg-stone-200 dark:bg-ink-800" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-stone-400 dark:text-ink-600">On this page</span>
                <span className="flex-1 h-px bg-stone-200 dark:bg-ink-800" />
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleAnchorClick(link.href)}
                    tabIndex={menuOpen ? 0 : -1}
                    className="font-body text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-ink-400 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </>
          )}

          <li className="pt-1">
            <a
              href={personalInfo.resumeUrl}
              download
              tabIndex={menuOpen ? 0 : -1}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-mono bg-accent/10 border border-accent/40 text-accent rounded hover:bg-accent/20 transition-all duration-300"
            >
              <DownloadIcon />
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
