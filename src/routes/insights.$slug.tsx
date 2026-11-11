import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { canonical, SITE_URL } from "@/lib/seo";
import { findInsight, insights } from "@/data/insights";
import { Subscribe } from "@/components/site/Subscribe";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => { const a = findInsight(params.slug); if (!a) throw notFound(); return a; },
  head: ({ params, loaderData: a }) => {
    if (!a) return { meta: [{ title: "Article not found — Harsh Verma" }, { name: "robots", content: "noindex" }] };
    const c = canonical(`/insights/${params.slug}`);
    return {
      links: c.links,
      meta: [
        c.url,
        { title: `${a.title} — Harsh Verma` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: a.img },
        { name: "twitter:image", content: a.img },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.excerpt, image: a.img,
        datePublished: new Date(a.date).toISOString().slice(0, 10), url: `${SITE_URL}/insights/${params.slug}`,
        author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Harsh Verma" },
        publisher: { "@type": "Organization", name: a.pub }, sameAs: a.href,
      }) }],
    };
  },
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-32"><h1 className="font-display text-4xl">Article not found</h1><Link to="/insights" className="mt-6 inline-block text-brand">Browse all insights</Link></div>,
  component: Article,
});

function Article() {
  const a = Route.useLoaderData();
  const more = insights.filter((i) => i.slug !== a.slug && i.topic === a.topic).slice(0, 3);
  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand"><ArrowLeft className="h-4 w-4" />All insights</Link>
      <p className="mt-8 font-mono text-xs text-signal">{a.topic} · {a.pub} · {a.date} · {a.read}</p>
      <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">{a.title}</h1>
      <img src={a.img} alt="" className="mt-8 aspect-[16/9] w-full rounded-2xl border border-border object-cover" />
      <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{a.excerpt}…</p>
      <a href={a.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">Read the full article on {a.pub}<ArrowUpRight className="h-4 w-4" /></a>
      <div className="mt-14 rounded-2xl border border-border bg-card p-6"><p className="font-display text-xl font-bold">Enjoyed this? Get the next one.</p><p className="mt-1 mb-4 text-sm text-muted-foreground">Occasional essays on agentic AI and security.</p><Subscribe list="newsletter" /></div>
      {more.length > 0 && <div className="mt-14"><p className="eyebrow">More on {a.topic}</p><ul className="mt-4 divide-y divide-border">{more.map((m) => <li key={m.slug}><Link to="/insights/$slug" params={{ slug: m.slug }} className="block py-4 font-display text-lg hover:text-brand">{m.title}</Link></li>)}</ul></div>}
    </article>
  );
}
