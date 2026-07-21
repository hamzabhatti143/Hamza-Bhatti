import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Only /api routes are disallowed. AI crawlers are explicitly welcomed so this
// portfolio can be indexed and cited by LLM-powered search tools.
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "PerplexityBot",
    "ClaudeBot",
    "Google-Extended",
    "CCBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/api/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
