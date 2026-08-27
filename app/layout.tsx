import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/context/ThemeContext";
import DeferredCursorGlow from "@/components/DeferredCursorGlow";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import DeferredVisitorChat from "@/components/DeferredVisitorChat";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hamza Bhatti — Frontend Developer & Agentic AI Developer",
    template: "%s — Hamza Bhatti",
  },
  description:
    "I'm Hamza Bhatti, a Frontend Developer and Agentic AI Developer based in Karachi, Pakistan. I build fast, SEO-friendly web apps with Next.js, FastAPI, and PostgreSQL, integrate AI automation with the OpenAI Agents SDK and RAG systems, and handle complete SEO — technical, on-page, and content.",
  keywords: [
    "Hamza Bhatti",
    "Frontend Developer",
    "Agentic AI Developer",
    "AI Automation Expert",
    "Best Frontend Developer",
    "Next.js Developer",
    "Full-Stack Developer",
    "TypeScript",
    "FastAPI",
    "PostgreSQL",
    "SEO Expert",
    "Technical SEO",
    "Web Developer Karachi",
  ],
  authors: [{ name: "Hamza Bhatti", url: SITE_URL }],
  creator: "Hamza Bhatti",
  publisher: "Hamza Bhatti",
  category: "technology",
  alternates: { canonical: "/" },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Hamza Bhatti — Frontend Developer & Agentic AI Developer",
    description: "Frontend Developer & Agentic AI Developer building fast, AI-integrated, SEO-friendly web experiences with Next.js, FastAPI, and PostgreSQL.",
    url: SITE_URL,
    siteName: "Hamza Bhatti",
    locale: "en_US",
    type: "website",
    images: [
      { url: "/images/profile-pic.jpeg", width: 1200, height: 630, alt: "Hamza Bhatti — Frontend Developer & Agentic AI Developer" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Bhatti — Frontend Developer & Agentic AI Developer",
    description: "Frontend Developer & Agentic AI Developer building fast, AI-integrated, SEO-friendly web experiences.",
    images: ["/images/profile-pic.jpeg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-smooth dark ${playfair.variable} ${dmSans.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        {/* ── No-flash theme init — runs before paint ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('hb-theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');})();`,
          }}
        />
      </head>
      <body className="grain-overlay antialiased">
        <DeferredCursorGlow />
        <WhatsAppFloat />
        <DeferredVisitorChat />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
