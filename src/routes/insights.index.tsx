import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { canonical } from "@/lib/seo";
import { insights } from "@/data/insights";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { Subscribe } from "@/components/site/Subscribe";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    links: canonical("/insights").links,
    meta: [
      canonical("/insights").url,
      { title: "Harsh Verma Insights | Agentic AI & Cybersecurity Articles" },
      { name: "description", content: "Read Harsh Verma’s articles on agentic AI, cybersecurity and engineering leadership, with enterprise security checklists and insights for founders." },
      { property: "og:title", content: "Harsh Verma Insights | Agentic AI & Cybersecurity Articles" },
      { property: "og:description", content: "Read Harsh Verma’s articles on agentic AI, cybersecurity and engineering leadership, with enterprise security checklists and insights for founders." },
      { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Insights,
});

function Insights() {
  const topics = ["All", ...Array.from(new Set(insights.map((i) => i.topic)))];
  const [topic, setTopic] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => insights.filter((i) => (topic === "All" || i.topic === topic) && (i.title + i.excerpt).toLowerCase().includes(q.toLowerCase())), [topic, q]);
  return (
    <>
      <PageHero eyebrow="// writing · research notes" title={<>Insights for the <span className="text-brand-gradient">agentic era.</span></>} intro="Essays on autonomous AI, security and how engineering is changing — published on Forbes and beyond." />
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-60 flex-1"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" className="h-11 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-brand" /></div>
          {topics.map((t) => <button key={t} onClick={() => setTopic(t)} className={`rounded-full border px-4 py-2 text-sm transition ${topic === t ? "border-transparent bg-brand-gradient text-primary-foreground" : "border-border hover:border-brand"}`}>{t}</button>)}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b, i) => (
            <Reveal key={b.slug} delay={(i % 6) * 0.04}>
              <Link to="/insights/$slug" params={{ slug: b.slug }} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-brand/50 hover:shadow-glow">
                <div className="aspect-[16/9] overflow-hidden bg-muted"><img src={b.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[11px] text-signal">{b.pub} · {b.read}</p>
                  <h2 className="mt-2 font-display text-lg font-semibold leading-snug">{b.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{b.excerpt}</p>
                  <p className="mt-auto pt-4 text-xs text-muted-foreground">{b.date}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {list.length === 0 && <p className="mt-10 text-muted-foreground">No articles match.</p>}
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24"><div className="rounded-2xl border border-border bg-card p-8"><h2 className="font-display text-2xl font-bold">Get new essays in your inbox</h2><p className="mt-2 mb-5 text-muted-foreground">Occasional notes on agentic AI and security. No spam.</p><Subscribe list="newsletter" /></div></section>
    </>
  );
}
