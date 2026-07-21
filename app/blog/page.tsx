import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "@/components/PageFrame";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { getAllPosts, formatDate } from "@/lib/blog";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "I write about full-stack development, Next.js, FastAPI, PostgreSQL, AI integration, and SEO — practical, first-person guides from real projects.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Hamza Bhatti — Blog",
    url: `${SITE_URL}/blog`,
    author: { "@type": "Person", name: SITE.name, url: SITE_URL },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE_URL}/blog/${p.slug}`,
    })),
  };

  return (
    <PageFrame>
      <JsonLd data={blogSchema} />

      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <PageHeader
          eyebrow="Blog"
          title={<>Notes from the build.</>}
          lead={
            <>
              I write about the things I actually work on — full-stack architecture,
              AI integration, PostgreSQL, and the SEO that most developers
              skip. Practical, first-person, and drawn from real projects.
            </>
          }
        />

        <ul className="mt-14 space-y-5" role="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-hover group block rounded-xl border border-stone-200 dark:border-ink-800 bg-stone-50/60 dark:bg-ink-950/50 p-6 md:p-8"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-stone-500 dark:text-ink-500 mb-3">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>

                <h2 className="font-display text-2xl md:text-3xl font-semibold text-stone-900 dark:text-ink-50 group-hover:text-accent transition-colors duration-300 leading-snug">
                  {post.title}
                </h2>

                <p className="font-body text-stone-600 dark:text-ink-300 mt-3 leading-relaxed max-w-2xl">
                  {post.description}
                </p>

                {post.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mt-5" role="list">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-stone-200 dark:border-ink-700 text-stone-500 dark:text-ink-400"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent mt-5 group-hover:gap-2.5 transition-all">
                  Read article
                  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageFrame>
  );
}
