import { SeoSummary } from "@/components/site/SeoSummary";
import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { useState } from "react";
import { ArrowUpRight, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { research, researchFocus, links } from "@/data/profile";
import { blogs } from "@/data/media";
import { TiltCard } from "@/components/site/Interactive";
import { Reveal } from "@/components/site/Reveal";
import { ResearchIntro } from "@/components/site/ResearchIntro";
import { SideRail } from "@/components/site/SideRail";
import { knowledge } from "@/data/knowledge";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { contentImage } from "@/data/content-images";

export const Route = createFileRoute("/research")({
  head: () => ({
    links: canonical("/research").links,
    meta: [
      canonical("/research").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Harsh Verma | Agentic AI Research, Patents & Papers" },
      { name: "description", content: "Explore Harsh Verma’s agentic AI and AI security research, public patent references, publications, open-source projects and upcoming books." },
      { property: "og:title", content: "Harsh Verma | Agentic AI Research, Patents & Papers" },
      { property: "og:description", content: "Explore Harsh Verma’s agentic AI and AI security research, public patent references, publications, open-source projects and upcoming books." },
      { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
    ],
  }),
  component: Research,
});

const kinds = ["All", "Patent", "Paper", "Book", "Project"] as const;

function Research() {
  const [k, setK] = useState<(typeof kinds)[number]>("All");
  const [showAllFocus, setShowAllFocus] = useState(false);
  const [showAllArchive, setShowAllArchive] = useState(false);
  const list = research.filter((r) => k === "All" || r.kind === k);
  const visible = showAllArchive ? list : list.slice(0, 6);
  return (
    <>
      <ResearchIntro />
      <SeoSummary sideRail={<SideRail
        navLabel="Research sections"
        label="Agentic AI"
        icon={<Lightbulb className="research-idea-icon size-6 text-brand" strokeWidth={1.5} />}
        links={[
          { label: "Writing", href: "#writing" },
          { label: "Topics", href: "#focus" },
          { label: "Archive", href: "#archive" },
          { label: "Scholar", href: links.scholar, external: true },
        ]}
      />} heading="Research in Agentic AI and AI Security" paragraphs={[
        "Harsh Verma’s research interests focus on making AI agents safe, reliable and useful in the enterprise. The archive distinguishes granted patents, pending inventions, publication references and public systems projects.",
        "Below you’ll find his latest technical writing, patents, publications and books, including Beyond AI Engineering and AI vs AI, coming in January 2027.",
      ]} links={[{ to: "/insights", label: "Insights articles" }, { to: "/agentic-ai", label: "Agentic AI hub" }, { to: "/books", label: "Books" }]} />
      <section aria-labelledby="research-pillars-heading" className="mx-auto max-w-6xl px-6 pt-12">
        <Reveal><p className="eyebrow">Research & Expertise</p><h2 id="research-pillars-heading" className="mt-4 font-display text-3xl font-semibold md:text-5xl">Six Research Pillars</h2></Reveal>
        <div className="mt-8"><KnowledgeCards variant="pillars" items={knowledge.filter(item => item.kind === "Research")} /></div>
        <div className="mt-8 flex flex-wrap gap-5 text-sm text-brand"><Link to="/publications">Research Publications →</Link><Link to="/engineering">Engineering & Architecture →</Link><Link to="/knowledge">Explore the Knowledge Hub →</Link></div>
      </section>
      <section id="writing" className="mx-auto max-w-6xl px-6 pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal><p className="eyebrow">Articles & thought leadership</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Latest Writing</h2></Reveal>
          <div className="flex flex-wrap gap-4 text-sm"><Link to="/forbes" className="text-brand">Forbes articles →</Link><Link to="/hackernoon" className="text-brand">HackerNoon articles →</Link><Link to="/rsac" className="text-brand">RSAC articles →</Link></div>
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
      <section id="focus" className="mx-auto max-w-6xl px-6 pt-16">
        <Reveal><p className="eyebrow">Research topics · questions · findings</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">What I Research</h2></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {researchFocus.slice(0, showAllFocus ? 6 : 3).map((f, i) => (
            <Reveal key={f.area} delay={i * 0.04} className="h-full">
              <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-brand/50">
                <div className="aspect-video w-full overflow-hidden border-b border-border">
                  <img src={f.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-start justify-between gap-3 font-mono text-xs leading-relaxed text-brand"><span>{f.area}</span><span className="shrink-0 text-stat-number">{String(i + 1).padStart(2, "0")}</span></p>
                  <h3 className="mt-3 font-display text-xl leading-snug font-semibold">{f.question}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground"><span className="font-medium text-foreground">Work: </span>{f.work}</p>
                  <div className="mt-auto pt-5"><p className="border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground"><span className="mb-2 block font-mono text-xs text-signal">Finding →</span>{f.finding}</p></div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex justify-center"><Button variant="outline" size="sm" aria-expanded={showAllFocus} onClick={() => setShowAllFocus(!showAllFocus)}>{showAllFocus ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}{showAllFocus ? "Show Less" : "Show More"}</Button></div>
      </section>
      <section id="archive" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal><p className="eyebrow">Patents · papers · books · code</p><h2 className="mb-8 mt-4 font-display text-3xl font-bold sm:text-5xl">Research Archive</h2></Reveal>
        <div className="flex flex-wrap gap-2">
          {kinds.map((x) => (
            <Button key={x} variant={k === x ? "default" : "outline"} className="rounded-full px-4 shadow-none" aria-pressed={k === x} onClick={() => { setK(x); setShowAllArchive(false); }}>{x}</Button>
          ))}
          <a href={links.scholar} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-sm text-brand">Google Scholar <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2">
          {visible.map((r, i) => {
            const Inner = (
              <article className="group flex h-full min-w-0 items-start gap-3 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-brand/50 sm:gap-4 sm:p-4">
                <img src={contentImage(r.title, r.kind, r.img)} alt={r.kind === "Book" ? `${r.title} — official book cover` : `${r.title} — research artwork`} className="h-20 w-14 shrink-0 rounded-lg object-contain sm:w-16" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]"><span className="text-brand">{r.kind}</span><span className="text-muted-foreground">{r.year}</span>{r.href && <ArrowUpRight aria-hidden="true" className="ml-auto size-4 text-muted-foreground transition-colors group-hover:text-brand" />}</div>
                  <h3 className="mt-1.5 line-clamp-2 break-words font-display text-base leading-snug font-semibold sm:text-lg">{r.title}</h3>
                  <p className="mt-1 line-clamp-1 text-[11px] leading-relaxed text-muted-foreground">{r.meta}</p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{r.desc}</p>
                </div>
              </article>
            );
            return <Reveal key={r.title} delay={i * 0.03} className="h-full">{r.href ? <a href={r.href} target="_blank" rel="noreferrer" className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">{Inner}</a> : Inner}</Reveal>;
          })}
        </div>
        {list.length > 6 && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="sm" aria-expanded={showAllArchive} onClick={() => setShowAllArchive(!showAllArchive)}>
              {showAllArchive ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              {showAllArchive ? "Show Less" : `Explore All ${list.length}`}
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
