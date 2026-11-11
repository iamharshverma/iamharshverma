import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle } from "lucide-react";
import { canonical, SITE_URL } from "@/lib/seo";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { insights } from "@/data/insights";
import { keynotes } from "@/data/media";
import { books } from "@/data/books";

const OG = "https://www.iamharshverma.com/og-image.jpg";
const isAgentic = (t: string) => /agent|autonom|orchestrat/i.test(t);
const articles = insights.filter((i) => isAgentic(i.title + " " + i.excerpt));
const talks = keynotes.filter((k) => isAgentic(k.title + " " + k.desc)).slice(0, 6);

export const Route = createFileRoute("/agentic-ai")({
  head: () => ({
    links: canonical("/agentic-ai").links,
    meta: [
      canonical("/agentic-ai").url,
      { title: "Agentic AI — Articles, Keynotes & Books by Harsh Verma" },
      { name: "description", content: "Everything Harsh Verma has written and said about agentic AI: essays on AI agents, trust and security, keynotes, and upcoming books for founders and engineers." },
      { property: "og:title", content: "Agentic AI — Harsh Verma" },
      { property: "og:description", content: "Essays, keynotes and books on building agentic AI that people can trust." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG },
      { name: "twitter:image", content: OG },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "CollectionPage", name: "Agentic AI by Harsh Verma", url: `${SITE_URL}/agentic-ai`,
      about: { "@type": "Thing", name: "Agentic AI" }, author: { "@id": `${SITE_URL}/#person` },
      hasPart: articles.slice(0, 20).map((a) => ({ "@type": "Article", headline: a.title, url: `${SITE_URL}/insights/${a.slug}` })),
    }) }],
  }),
  component: AgenticAI,
});

function AgenticAI() {
  return (
    <>
      <PageHero eyebrow="// topic hub" title={<>Agentic AI, <span className="text-brand-gradient">built to be trusted.</span></>} intro="Essays, keynotes and books on how AI agents work, where they fail, and how founders and engineers can ship them safely." />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Reveal><p className="eyebrow">{articles.length} essays</p><h2 className="mt-2 font-display text-3xl font-bold">Writing on AI agents</h2></Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} to="/insights/$slug" params={{ slug: a.slug }} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:border-brand">
              <img src={a.img} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="flex-1 p-5"><p className="font-mono text-[11px] text-signal">{a.pub} · {a.read}</p><h3 className="mt-2 font-display text-lg font-semibold leading-snug group-hover:text-brand">{a.title}</h3></div>
            </Link>
          ))}
        </div>
      </section>
      {talks.length > 0 && <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-3xl font-bold">Keynotes on agentic AI</h2>
        <ul className="mt-6 divide-y divide-border">{talks.map((k) => <li key={k.title}><a href={k.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 py-4 hover:text-brand" onClick={() => window.__lovableEvents?.track?.("project.keynote_played", { keynote: k.title, source: "agentic-ai" })}><PlayCircle className="h-6 w-6 shrink-0 text-brand" /><span className="flex-1 font-display text-lg">{k.title}</span><span className="font-mono text-xs text-muted-foreground">{k.dur}</span></a></li>)}</ul>
      </section>}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-3xl font-bold">Books</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">{books.map((b) => <Link key={b.slug} to="/books" className="flex gap-5 rounded-xl border border-border bg-card p-5 hover:border-brand"><img src={b.cover} alt={b.title} loading="lazy" className="w-24 shrink-0 rounded-md object-cover" /><div><p className="font-mono text-[11px] text-signal">{b.status}</p><h3 className="mt-1 font-display text-xl font-semibold">{b.title}</h3><p className="mt-1 text-sm text-muted-foreground">{b.subtitle}</p></div></Link>)}</div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pt-6 pb-24">
        <div className="rounded-2xl border border-border bg-card p-8 md:flex md:items-center md:justify-between"><div><h2 className="font-display text-2xl font-bold">Building agentic AI at your startup?</h2><p className="mt-2 text-muted-foreground">Get AI advisory on strategy, architecture and trust.</p></div><Link to="/booking" search={{ topic: "Advisory" }} className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow md:mt-0">Book an advisory call <ArrowRight className="h-4 w-4" /></Link></div>
      </section>
    </>
  );
}
