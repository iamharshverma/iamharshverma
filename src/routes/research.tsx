import { SeoSummary } from "@/components/site/SeoSummary";
import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { research, links } from "@/data/profile";
import { blogs } from "@/data/media";
import { TiltCard } from "@/components/site/Interactive";
import { Reveal, PageHero } from "@/components/site/Reveal";

export const Route = createFileRoute("/research")({
  head: () => ({
    links: canonical("/research").links,
    meta: [
      canonical("/research").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Harsh Verma Research | AI Patents, Papers & Agentic AI" },
      { name: "description", content: "Explore Harsh Verma’s research: enterprise patents in agentic AI and copilots, 27+ peer-reviewed papers on AI security, open-source systems work and two upcoming books." },
      { property: "og:title", content: "Harsh Verma Research | AI Patents, Papers & Agentic AI" },
      { property: "og:description", content: "Enterprise patents, 27+ peer-reviewed papers and open-source work in agentic AI and AI security." },
      { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Research,
});

const kinds = ["All", "Patent", "Paper", "Book", "Project"] as const;

function Research() {
  const [k, setK] = useState<(typeof kinds)[number]>("All");
  const list = research.filter((r) => k === "All" || r.kind === k);
  return (
    <>
      <PageHero eyebrow="// research · patents · writing" title={<>Ideas, <span className="text-brand-gradient">patented and published.</span></>}
        intro="Six enterprise patents, 27+ peer-reviewed papers, two books and a body of open-source systems work." />
      <SeoSummary heading="Research in agentic AI and AI security" paragraphs={[
        "Harsh Verma’s research focuses on making AI agents safe, reliable and useful in the enterprise. His work spans six enterprise patents in agentic AI and copilots, more than 27 peer-reviewed papers, and open-source systems projects.",
        "Below you’ll find his latest technical writing, patents, publications and books, including Beyond AI Engineering and AI vs AI, coming in January 2027.",
      ]} links={[{ to: "/insights", label: "Insights articles" }, { to: "/agentic-ai", label: "Agentic AI hub" }, { to: "/books", label: "Books" }]} />
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal><p className="eyebrow">Articles & thought leadership</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Latest writing</h2></Reveal>
          <div className="flex gap-4 text-sm"><a href={links.forbes} target="_blank" rel="noreferrer" className="text-brand">Forbes column ↗</a><a href="https://hackernoon.com/u/harshverma59" target="_blank" rel="noreferrer" className="text-brand">HackerNoon ↗</a></div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {blogs.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.04}>
              <a href={b.href} target="_blank" rel="noreferrer" className="block h-full">
                <TiltCard>
                  <div className="aspect-[16/10] overflow-hidden"><img src={b.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                  <div className="p-5">
                    <p className="font-mono text-[11px] text-signal">{b.pub} · {b.read}</p>
                    <h3 className="mt-2 line-clamp-3 font-display text-lg leading-snug font-semibold">{b.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">{b.date}</p>
                  </div>
                </TiltCard>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal><p className="eyebrow">Patents · papers · books · code</p><h2 className="mb-8 mt-4 font-display text-5xl font-bold tracking-tight">Research archive</h2></Reveal>
        <div className="flex flex-wrap gap-2">
          {kinds.map((x) => (
            <button key={x} onClick={() => setK(x)} className={`rounded-full border px-4 py-2 text-sm transition ${k === x ? "border-brand bg-brand-gradient text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{x}</button>
          ))}
          <a href={links.scholar} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-sm text-brand">Google Scholar <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {list.map((r, i) => {
            const Inner = (
              <div className="group flex h-full gap-5 rounded-2xl border border-border bg-card p-6 transition hover:border-brand/50">
                {r.img && <img src={r.img} alt="" className="h-24 w-20 shrink-0 rounded-lg object-cover" loading="lazy" />}
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs"><span className="text-brand">{r.kind}</span><span className="text-muted-foreground">{r.year}</span></div>
                  <h3 className="mt-2 font-display text-2xl leading-tight">{r.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{r.meta}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </div>
            );
            return <Reveal key={r.title} delay={i * 0.03}>{r.href ? <a href={r.href} target="_blank" rel="noreferrer">{Inner}</a> : Inner}</Reveal>;
          })}
        </div>
      </section>
    </>
  );
}
