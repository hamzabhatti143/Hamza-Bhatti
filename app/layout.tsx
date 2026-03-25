import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import CursorGlow from "@/components/CursorGlow";

export const metadata: Metadata = {
  title: "Hamza Bhatti — Frontend Developer & AI-Assisted Builder",
  description:
    "Portfolio of Hamza Bhatti, a frontend developer specialising in TypeScript, Next.js, and AI-assisted development.",
  keywords: ["Hamza Bhatti", "Frontend Developer", "TypeScript", "Next.js", "AI Development", "Portfolio"],
  authors: [{ name: "Hamza Bhatti" }],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Hamza Bhatti — Frontend Developer",
    description: "Frontend Developer & AI-Assisted Builder crafting modern web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        {/* ── No-flash theme init — runs before paint ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('hb-theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');})();`,
          }}
        />
      </head>
      <body className="grain-overlay antialiased">
        <CursorGlow />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
