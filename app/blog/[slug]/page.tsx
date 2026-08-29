import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import PageFrame from "@/components/PageFrame";
import JsonLd from "@/components/JsonLd";
import { getPost, getPostSlugs, getAllPosts, formatDate } from "@/lib/blog";
import { SITE, SITE_URL } from "@/lib/site";
import "../blog-prose.css";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${slug}`,
      authors: [SITE.name],
    },
  };
}

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [rehypeSlug, rehypeHighlight] as never,
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = getPost(slug);
  if (!post) notFound();

  // Two related posts for internal linking at the foot of the article.
  const related = getAllPosts().filter((p) => p.slug !== slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: SITE.name, url: SITE_URL },
    publisher: { "@type": "Person", name: SITE.name, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    keywords: post.tags.join(", "),
  };

  const faqSchema =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <PageFrame>
      <JsonLd data={faqSchema ? [articleSchema, faqSchema] : articleSchema} />

      <article className="max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-500 dark:text-ink-400 hover:text-accent transition-colors">
            <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All articles
          </Link>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-stone-500 dark:text-ink-500 mb-5">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-stone-900 dark:text-ink-50">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-6" role="list">
              {post.tags.map((tag) => (
                <li key={tag} className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-stone-200 dark:border-ink-700 text-stone-500 dark:text-ink-400">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="prose-hb">
          <MDXRemote source={post.content} options={mdxOptions} />
        </div>

        {/* FAQ */}
        {post.faqs.length > 0 && (
          <section aria-labelledby="faq-heading" className="mt-16 pt-10 border-t border-stone-200 dark:border-ink-800">
            <h2 id="faq-heading" className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-ink-50 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {post.faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-stone-200 dark:border-ink-800 bg-stone-50/60 dark:bg-ink-950/50 p-5 md:p-6">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display text-lg font-semibold text-stone-900 dark:text-ink-50">
                    {faq.q}
                    <svg aria-hidden="true" className="flex-shrink-0 transition-transform duration-300 group-open:rotate-45 text-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </summary>
                  <p className="font-body text-stone-600 dark:text-ink-300 leading-relaxed mt-4">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Cross-links / CTA */}
        <section className="mt-16 rounded-xl border border-stone-200 dark:border-ink-800 bg-stone-50 dark:bg-ink-950/60 p-8">
          <p className="font-body text-stone-600 dark:text-ink-300 mb-5">
            I build exactly this kind of work for clients. See{" "}
            <Link href="/projects" className="text-accent hover:text-accent-light underline underline-offset-4 decoration-accent/40">my projects</Link>{" "}
            or the{" "}
            <Link href="/services" className="text-accent hover:text-accent-light underline underline-offset-4 decoration-accent/40">services I offer</Link>, then{" "}
            <Link href="/contact" className="text-accent hover:text-accent-light underline underline-offset-4 decoration-accent/40">let&apos;s talk</Link>.
          </p>

          {related.length > 0 && (
            <div className="mt-6 pt-6 border-t border-stone-200 dark:border-ink-800">
              <h2 className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Keep reading</h2>
              <ul className="space-y-2" role="list">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="font-body text-stone-700 dark:text-ink-200 hover:text-accent transition-colors">
                      → {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </article>
    </PageFrame>
  );
}
