import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { useState } from "react";
import { awards } from "@/data/profile";
import { Reveal, PageHero } from "@/components/site/Reveal";
import { magazineFeatures } from "@/data/recognition";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/recognition")({
  head: () => ({
    links: canonical("/recognition").links,
    meta: [
      canonical("/recognition").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Honors, Awards & Press — Harsh Verma" },
      { name: "description", content: "Stevie Gold, NVTC Cyber50, TITAN Innovation, Forttuna Global 100 and more global honors for Harsh Verma." },
      { property: "og:title", content: "Honors, Awards & Press — Harsh Verma" },
      { property: "og:description", content: "Global recognition for enterprise AI and autonomous security." },
      { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Recognition,
});

const cats = ["All", "Leadership", "Cybersecurity", "Academic"] as const;

function Recognition() {
  const [c, setC] = useState<(typeof cats)[number]>("All");
  const [q, setQ] = useState("");
  const list = awards.filter((a) => (c === "All" || a.cat === c) && (a.title + a.org).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHero eyebrow="// honors · awards" title={<>Recognized <span className="text-brand-gradient">Worldwide.</span></>}
        intro="Honored by premier technology councils, engineering bodies and business foundations for advances in enterprise AI and autonomous security." />
      <section aria-labelledby="magazine-features-heading" className="border-t border-border bg-card/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="eyebrow">In the spotlight</p>
            <h2 id="magazine-features-heading" className="mt-4 font-display text-3xl font-bold md:text-5xl">Magazine Features & Interviews</h2>
          </Reveal>
          <div className="mt-10 divide-y divide-border">
            {magazineFeatures.map((feature) => {
              const featured = feature.featured === true;
              const content = featured ? (
                <>
                  <span className="relative block w-full max-w-64 justify-self-center md:max-w-80">
                    <img src={feature.cover} alt={`${feature.name} — ${feature.outlet}`} loading="lazy" decoding="async" className="h-auto w-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-2" />
                    <span className="mt-3 block font-mono text-[10px] uppercase text-muted-foreground">Passion Vista / 2026</span>
                  </span>
                  <span className="block min-w-0">
                    <span className="inline-flex items-center gap-3 font-mono text-xs uppercase text-signal"><span className="h-px w-10 bg-signal" />Featured recognition</span>
                    <span className="mt-5 block font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{feature.title}</span>
                    <span className="mt-5 block font-display text-xl font-normal text-brand md:text-2xl">{feature.name}</span>
                    <span className="mt-5 block max-w-xl text-base font-normal leading-relaxed text-muted-foreground md:text-lg">{feature.headline}</span>
                    <span className="mt-8 flex items-center gap-4 border-t border-border pt-5"><span className="font-mono text-xs uppercase text-muted-foreground">{feature.outlet} · {feature.kind}</span><ArrowUpRight className="ml-auto size-7 text-brand motion-safe:transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" /></span>
                  </span>
                </>
              ) : (
                <>
                  <img src={feature.cover} alt={`${feature.name} — ${feature.outlet}`} loading="lazy" decoding="async" className="h-28 w-20 rounded-sm bg-muted object-cover md:h-36 md:w-28" />
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase text-signal md:text-xs">{feature.outlet} · {feature.kind}</span>
                    <span className="mt-2 block font-display text-lg font-bold leading-snug md:text-2xl">{feature.title}</span>
                    <span className="mt-2 block text-xs font-normal text-brand md:text-sm">{feature.name}</span>
                    <span className="mt-3 block max-w-3xl text-sm font-normal leading-relaxed text-muted-foreground md:text-base">{feature.headline}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-brand" />
                </>
              );
              const rowClass = featured
                ? "group grid h-auto w-full grid-cols-1 items-center gap-8 whitespace-normal rounded-none border-t-2 border-signal px-0 py-8 text-left hover:bg-transparent md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14 md:py-12"
                : "grid h-auto w-full grid-cols-[80px_minmax(0,1fr)_16px] items-center gap-3 whitespace-normal rounded-none px-0 py-6 text-left hover:bg-muted/30 md:grid-cols-[112px_minmax(0,1fr)_24px] md:gap-7 md:py-8";
              if (!feature.documents.length) {
                return <article key={feature.title} aria-label={feature.title}><Reveal><Button asChild variant="ghost" className={rowClass}><a href={feature.storyUrl} target="_blank" rel="noreferrer">{content}</a></Button></Reveal></article>;
              }
              return (
              <article key={feature.title} aria-label={feature.title}>
              <Dialog>
                <Reveal><DialogTrigger asChild><Button variant="ghost" className={rowClass}>{content}</Button></DialogTrigger></Reveal>
                <DialogContent className="z-[100] max-h-[90svh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-lg p-4 sm:p-6">
                  <DialogHeader className="pr-6 text-left">
                    <DialogTitle className="font-display text-xl leading-tight">{feature.title}</DialogTitle>
                    <DialogDescription>{feature.outlet} · {feature.name}</DialogDescription>
                  </DialogHeader>
                  <Button asChild variant="link" className="h-auto justify-start whitespace-normal px-0">
                    <a href={feature.storyUrl} target="_blank" rel="noreferrer">Read the {feature.outlet} story<ArrowUpRight /></a>
                  </Button>
                  <Tabs defaultValue="magazine" className="min-w-0">
                    <TabsList className="h-auto w-full flex-wrap justify-start">
                      {feature.documents.map((doc) => <TabsTrigger key={doc.id} value={doc.id}>{doc.label}</TabsTrigger>)}
                    </TabsList>
                    {feature.documents.map((doc) => (
                      <TabsContent key={doc.id} value={doc.id}>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs text-muted-foreground">{doc.pages.length} {doc.pages.length === 1 ? "page" : "pages"}</p>
                          <Button asChild variant="outline" size="sm"><a href={doc.url} target="_blank" rel="noreferrer"><Download />Open original PDF</a></Button>
                        </div>
                        <div className="space-y-4">
                          {doc.pages.map((page, index) => <img key={page} src={page} alt={`${feature.outlet} ${doc.label} — ${feature.name}, page ${index + 1}`} loading="lazy" decoding="async" className="h-auto w-full rounded-sm border border-border" />)}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </DialogContent>
              </Dialog>
              </article>
              );
            })}
          </div>
        </div>
      </section>
      <section aria-labelledby="awards-heading" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <p className="eyebrow">Recognition & achievement</p>
          <h2 id="awards-heading" className="mb-8 mt-4 font-display text-3xl font-bold md:text-5xl">Awards & Honors</h2>
        </Reveal>
        <div className="flex flex-wrap items-center gap-2">
          {cats.map((x) => (
            <button key={x} onClick={() => setC(x)} className={`rounded-full border px-4 py-2 text-sm transition ${c === x ? "border-brand bg-brand-gradient text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{x}</button>
          ))}
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search honors…" className="ml-auto w-full rounded-full border border-input bg-transparent px-4 py-2 text-sm outline-none focus:border-brand sm:w-64" />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.03}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-brand/50">
                <div className="aspect-[5/3] overflow-hidden"><img src={a.img} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /></div>
                <div className="p-6"><div className="flex items-start justify-between">
                  <span className="rounded-full border border-signal/40 px-3 py-1 font-mono text-xs text-signal">{a.badge}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl leading-tight">{a.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{a.org}</p>
                <p className="mt-3 text-sm text-muted-foreground">{a.desc}</p>
              </div></div>
            </Reveal>
          ))}
          {!list.length && <p className="text-muted-foreground">No honors match.</p>}
        </div>
      </section>
    </>
  );
}
