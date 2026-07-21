// Central site config used across metadata, sitemap, JSON-LD, and navigation.
export const SITE_URL = "https://hamza-bhatti.vercel.app";

export const SITE = {
  name: "Hamza Bhatti",
  jobTitle: "Frontend Developer & Agentic AI Developer",
  location: "Karachi, Pakistan",
  email: "bhatti3993@gmail.com",
  github: "https://github.com/hamzabhatti143",
  linkedin: "https://www.linkedin.com/in/hamzabhatti143",
} as const;

// Top-level routes surfaced in the header and footer navigation.
export const routeLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
] as const;
