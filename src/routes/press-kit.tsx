import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { Download, ArrowUpRight, FileText, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Reveal";
import { profile, links } from "@/data/profile";
import { pressKit, pressPhotos, pressQuotes, bioText } from "@/data/press-kit";

export const Route = createFileRoute("/press-kit")({
  head: () => ({
    links: canonical("/press-kit").links, meta: [
      canonical("/press-kit").url,
    { title: "Harsh Verma Press Kit — Photos, Bio & Press Quotes" },
    { name: "description", content: "High-resolution photos, press quotes, downloadable bio and press kit PDF for media covering AI engineer and founder Harsh Verma." },
    { property: "og:title", content: "Harsh Verma — Press Kit" },
    { property: "og:description", content: "Biography, photography and speaker resources for editors and event organizers." },
    { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
    { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: PressKit,
});
function PressKit() {
  return <><PageHero eyebrow="// editorial · speaker resources" title={<>Harsh Verma <span className="text-brand-gradient">Press Kit.</span></>} intro="Principal AI engineer. Author. Speaker. Advisor." />
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[0.8fr_1.2fr]">
      <div className="min-w-0"><img src={profile.portrait} alt="Official portrait of Harsh Verma" className="aspect-[4/5] w-full max-w-sm rounded-lg object-cover object-top" /><p className="mt-3 text-sm text-muted-foreground">Harsh Verma · Official portfolio portrait</p><Button asChild variant="outline" className="mt-4"><a href={profile.portrait} download="harsh-verma-portrait.jpg"><Download />Download portrait</a></Button></div>
      <div className="min-w-0"><p className="eyebrow">Biography</p><h2 className="mt-3 font-display text-3xl">Short introduction</h2><p className="mt-5 text-lg leading-relaxed text-muted-foreground">{pressKit.shortBio}</p><h2 className="mt-9 font-display text-2xl">Full biography</h2><p className="mt-4 leading-relaxed text-muted-foreground">{pressKit.fullBio}</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild className="h-12"><a href={pressKit.pdf} download="harsh-verma-press-kit.pdf"><Download />Download press kit PDF</a></Button><Button asChild variant="outline" className="h-12"><a href={`data:text/plain;charset=utf-8,${encodeURIComponent(bioText())}`} download="harsh-verma-bio.txt"><FileText />Download bio (text)</a></Button></div><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href={links.forbes} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand">Forbes profile<ArrowUpRight className="size-4" /></a><Link to="/media" className="text-brand">Media coverage</Link><Link to="/booking" className="text-brand">Booking enquiries</Link></div></div>
    </section>
    <section className="border-t border-border py-16"><div className="mx-auto max-w-6xl px-6"><p className="eyebrow">High-resolution photos</p><h2 className="mt-3 font-display text-3xl">Approved photography</h2><p className="mt-3 text-muted-foreground">Free for editorial use with credit "Harsh Verma".</p><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{pressPhotos.map(p => <figure key={p.file} className="group overflow-hidden rounded-xl border border-border bg-card"><div className="aspect-[4/5] overflow-hidden"><img src={p.src} alt={`Harsh Verma — ${p.label} photo`} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" /></div><figcaption className="p-4"><p className="font-display text-lg">{p.label}</p><p className="text-sm text-muted-foreground">{p.use}</p><a href={p.src} download={p.file} className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand"><Download className="size-4" />Download full size</a></figcaption></figure>)}</div></div></section>
    <section className="border-t border-border bg-muted/40 py-16"><div className="mx-auto max-w-6xl px-6"><p className="eyebrow">Press quotes</p><h2 className="mt-3 font-display text-3xl">In their words</h2><div className="mt-8 grid gap-6 md:grid-cols-2">{pressQuotes.map(q => <blockquote key={q.quote} className="rounded-xl border border-border bg-card p-6"><Quote className="size-6 text-signal" /><p className="mt-3 leading-relaxed">“{q.quote}”</p><footer className="mt-4 text-sm"><span className="font-medium">{q.by}</span><span className="block text-muted-foreground">{q.context}</span>{q.href && <a href={q.href} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-brand">Source<ArrowUpRight className="size-3.5" /></a>}</footer></blockquote>)}</div></div></section>
    <section className="border-y border-border bg-muted/40 py-16"><div className="mx-auto max-w-6xl px-6"><p className="eyebrow">Speaking topics</p><div className="mt-8 grid gap-8 md:grid-cols-3">{pressKit.topics.map(t => <div key={t.title} className="border-t border-border pt-6"><p className="text-xs text-signal">{t.type}</p><h2 className="mt-3 font-display text-2xl">{t.title}</h2><p className="mt-4 text-muted-foreground">{t.desc}</p></div>)}</div></div></section>
    <section className="mx-auto max-w-6xl px-6 py-16"><p className="eyebrow">Keynote dates</p><ul className="mt-6 divide-y divide-border">{pressKit.keynoteDates.map(k => <li key={k.title} className="grid gap-1 py-4 sm:grid-cols-[5rem_1fr]"><span className="font-mono text-signal">{k.year}</span><span><span className="font-medium">{k.title}</span><span className="block text-sm text-muted-foreground">{k.outlet} · {k.format}</span></span></li>)}</ul></section>
    <section className="mx-auto max-w-6xl px-6 pb-16"><h2 className="font-display text-3xl">Media & event enquiries</h2><a href={`mailto:${profile.email}`} className="mt-4 inline-block break-all text-brand">{profile.email}</a></section>
  </>;
}