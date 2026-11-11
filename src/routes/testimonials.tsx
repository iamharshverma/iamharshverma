import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { Quote, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/Reveal";
import { testimonials, editorialMentions } from "@/data/testimonials";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    links: canonical("/testimonials").links, meta: [
      canonical("/testimonials").url,
    { title: "Harsh Verma — Professional Recommendations" },
    { name: "description", content: "Read sourced professional recommendations for Harsh Verma from managers and collaborators." },
    { property: "og:title", content: "Harsh Verma — Testimonials" },
    { property: "og:description", content: "Professional recommendations with links to the original sources." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Testimonials,
});
function Testimonials() {
  return <><PageHero eyebrow="// professional recommendations" title={<>Trust, in <span className="text-brand-gradient">their words.</span></>} intro="Perspectives from the people who have worked alongside Harsh." />
    <section className="mx-auto max-w-6xl px-6 py-16"><div className="grid gap-x-12 gap-y-10 md:grid-cols-2">{testimonials.map(t => <figure key={t.name} className="min-w-0 border-t border-border pt-7"><Quote className="size-7 text-signal" /><blockquote className="mt-5 font-display text-xl leading-relaxed">“{t.quote}”</blockquote><figcaption className="mt-6"><p className="font-semibold">{t.name}</p><p className="mt-1 text-sm text-muted-foreground">{t.role}</p><p className="mt-2 font-mono text-xs text-muted-foreground">{t.relationship}</p><a href={t.source} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm text-brand">Original recommendation<ArrowUpRight className="size-4" /></a></figcaption></figure>)}</div></section>
    <section className="border-t border-border bg-muted/40 py-16"><div className="mx-auto max-w-6xl px-6"><p className="eyebrow">In the media</p>{editorialMentions.map(m => <figure key={m.outlet} className="mt-7 max-w-3xl"><blockquote className="font-display text-2xl leading-relaxed">“{m.quote}”</blockquote><figcaption className="mt-5"><p className="font-semibold">{m.outlet}</p><p className="mt-1 text-sm text-muted-foreground">{m.label}</p><a href={m.source} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-brand">Read the original feature<ArrowUpRight className="size-4" /></a></figcaption></figure>)}</div></section>
    <section className="border-t border-border py-12"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-6"><h2 className="font-display text-2xl">Explore the wider conversation</h2><div className="flex gap-6"><Link to="/media" className="text-brand">Media coverage</Link><Link to="/collaborate" className="text-brand">Work with Harsh</Link></div></div></section>
  </>;
}