import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote, Search } from "lucide-react";
import { media, type MediaItem } from "@/data/media";
import { pressLogos } from "@/data/collaborate";
import { Reveal, PageHero, Counter } from "@/components/site/Reveal";
import { TiltCard, Modal, LogoTile } from "@/components/site/Interactive";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Media & Press — Harsh Verma in Business Insider, USA Today, HackerNoon" },
      { name: "description", content: "44+ media features: Times Square NYC broadcast, Business Insider, USA Today, Yahoo Finance, HackerNoon interviews, podcasts and keynotes." },
      { property: "og:title", content: "Media & Press — Harsh Verma" },
      { property: "og:description", content: "Press, podcasts, keynotes and interviews on enterprise AI and cybersecurity." },
    ],
  }),
  component: MediaPage,
});

const groups = ["All", "Press", "Podcasts & Interviews", "Keynotes & Talks", "Awards & Honors", "Institutional"] as const;
const impact = [
  { v: 44, s: "+", l: "Media features" }, { v: 3.75, s: "B+", l: "Syndicated views", d: 2 },
  { v: 14, s: "+", l: "Podcasts & keynotes" }, { v: 100, s: "M+", l: "Est. global reach" },
];

function MediaPage() {
  const featured = media.filter((m) => m.featured);
  const [slide, setSlide] = useState(0);
  const [g, setG] = useState<(typeof groups)[number]>("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<MediaItem | null>(null);
  const list = useMemo(() => media.filter((m) => (g === "All" || m.group === g) && (m.title + m.outlet + m.quote).toLowerCase().includes(q.toLowerCase())), [g, q]);
  const f = featured[slide % featured.length] ?? media[0]!;
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) return;
    const t = setTimeout(() => {
      window.__lovableEvents?.track?.("project.media_searched", { group: g, result_count: list.length });
    }, 1000);
    return () => clearTimeout(t);
  }, [q, g, list.length]);

  return (
    <>
      <PageHero eyebrow="// press · podcasts · broadcast" title={<>In the <span className="text-brand-gradient">headlines.</span></>}
        intro="International press, executive podcasts, Times Square NYC broadcasts and technical interviews shaping the conversation on enterprise AI and cybersecurity." />
      <div className="mx-auto -mt-6 flex max-w-6xl flex-wrap gap-3 px-6 pb-8"><Button asChild><Link to="/media-kit"><Download />Media kit</Link></Button><Button asChild variant="outline"><Link to="/press-kit">Press kit</Link></Button></div>

      <section className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {impact.map((s, i) => (
            <div key={s.l} className={`px-6 py-8 ${i ? "md:border-l" : ""} border-border`}>
              <p className="font-display text-4xl font-bold text-signal md:text-5xl"><Counter to={s.v} suffix={s.s} decimals={s.d} /></p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <p className="eyebrow text-center">As seen on</p>
        <div className="mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee gap-4">
            {[...pressLogos, ...pressLogos].map((b, i) => <LogoTile key={i} src={b.logo} name={b.name} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal><p className="eyebrow">Featured spotlight</p></Reveal>
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <AnimatePresence mode="wait">
            <motion.div key={slide} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}
              className="grid gap-8 p-8 md:grid-cols-[1fr_1.4fr] md:p-12">
              <div className="overflow-hidden rounded-xl"><img src={f.img} alt="" className="h-full w-full object-cover" /></div>
              <div className="flex flex-col justify-center">
                <p className="font-mono text-xs text-signal">{f.cat} · {f.year} · {f.outlet}</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">{f.title}</h2>
                <p className="mt-5 flex gap-3 text-muted-foreground"><Quote className="h-5 w-5 shrink-0 text-brand" />{f.quote}</p>
                {f.href && <a href={f.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground">{f.cta ?? "Read"} <ArrowUpRight className="h-4 w-4" /></a>}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between border-t border-border px-6 py-3">
            <div className="flex gap-1.5">{featured.map((_, i) => <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => setSlide(i)} className={`h-1.5 rounded-full transition-all ${i === slide % featured.length ? "w-8 bg-brand" : "w-3 bg-muted-foreground/40"}`} />)}</div>
            <div className="flex gap-2">
              <button aria-label="Previous" onClick={() => setSlide((s) => (s - 1 + featured.length) % featured.length)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-brand hover:text-brand"><ChevronLeft className="h-4 w-4" /></button>
              <button aria-label="Next" onClick={() => setSlide((s) => (s + 1) % featured.length)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-brand hover:text-brand"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal><p className="eyebrow">Press wall</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Every feature</h2></Reveal>
          <p className="font-mono text-xs text-muted-foreground">Showing {list.length} of {media.length}</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {groups.map((x) => (
            <button key={x} onClick={() => setG(x)} className={`rounded-full border px-4 py-2 text-sm transition ${g === x ? "border-brand bg-brand-gradient text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {x} <span className="ml-1 opacity-60">{x === "All" ? media.length : media.filter((m) => m.group === x).length}</span>
            </button>
          ))}
          <label className="relative ml-auto w-full sm:w-64">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search outlets, topics…" className="w-full rounded-full border border-input bg-transparent py-2 pr-4 pl-9 text-sm outline-none focus:border-brand" />
          </label>
        </div>
        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {list.map((m) => (
              <motion.button layout key={m.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={() => setOpen(m)} className="text-left">
                <TiltCard>
                  <div className="aspect-[600/340] overflow-hidden"><img src={m.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                  <div className="p-5">
                    <p className="font-mono text-[11px] text-signal">{m.group} · {m.year}</p>
                    <h3 className="mt-2 line-clamp-3 font-display text-lg leading-snug font-semibold">{m.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">{m.outlet}</p>
                  </div>
                </TiltCard>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        {!list.length && <p className="mt-8 text-muted-foreground">No features match that search.</p>}
      </section>

      <Modal open={!!open} onClose={() => setOpen(null)}>
        {open && (
          <div>
            <img src={open.img} alt="" className="aspect-[600/340] w-full object-cover" />
            <div className="p-8">
              <p className="font-mono text-xs text-signal">{open.cat} · {open.year} · {open.outlet}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{open.title}</h3>
              <p className="mt-4 flex gap-3 text-muted-foreground"><Quote className="h-5 w-5 shrink-0 text-brand" />{open.quote}</p>
              {open.href && <a href={open.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground">{open.cta ?? "Read article"} <ArrowUpRight className="h-4 w-4" /></a>}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
