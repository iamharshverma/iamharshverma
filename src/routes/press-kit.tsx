import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Reveal";
import { profile, links } from "@/data/profile";
import { pressKit } from "@/data/press-kit";

export const Route = createFileRoute("/press-kit")({
  head: () => ({ meta: [
    { title: "Harsh Verma — Press Kit & Speaker Resources" },
    { name: "description", content: "Official biography, portrait, speaking topics and downloadable press kit for Harsh Verma." },
    { property: "og:title", content: "Harsh Verma — Press Kit" },
    { property: "og:description", content: "Biography, photography and speaker resources for editors and event organizers." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: PressKit,
});
function PressKit() {
  return <><PageHero eyebrow="// editorial · speaker resources" title={<>Harsh Verma <span className="text-brand-gradient">Press Kit.</span></>} intro="Principal AI engineer. Author. Speaker. Advisor." />
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[0.8fr_1.2fr]">
      <div className="min-w-0"><img src={profile.portrait} alt="Official portrait of Harsh Verma" className="aspect-[4/5] w-full max-w-sm rounded-lg object-cover object-top" /><p className="mt-3 text-sm text-muted-foreground">Harsh Verma · Official portfolio portrait</p><Button asChild variant="outline" className="mt-4"><a href={profile.portrait} download="harsh-verma-portrait.jpg"><Download />Download portrait</a></Button></div>
      <div className="min-w-0"><p className="eyebrow">Biography</p><h2 className="mt-3 font-display text-3xl">Short introduction</h2><p className="mt-5 text-lg leading-relaxed text-muted-foreground">{pressKit.shortBio}</p><h2 className="mt-9 font-display text-2xl">Full biography</h2><p className="mt-4 leading-relaxed text-muted-foreground">{pressKit.fullBio}</p><Button asChild className="mt-8 h-12"><a href={pressKit.pdf} download="harsh-verma-press-kit.pdf"><Download />Download press kit PDF</a></Button><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href={links.forbes} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand">Forbes profile<ArrowUpRight className="size-4" /></a><Link to="/media" className="text-brand">Media coverage</Link><Link to="/booking" className="text-brand">Booking enquiries</Link></div></div>
    </section>
    <section className="border-y border-border bg-muted/40 py-16"><div className="mx-auto max-w-6xl px-6"><p className="eyebrow">Speaking topics</p><div className="mt-8 grid gap-8 md:grid-cols-3">{pressKit.topics.map(t => <div key={t.title} className="border-t border-border pt-6"><p className="text-xs text-signal">{t.type}</p><h2 className="mt-3 font-display text-2xl">{t.title}</h2><p className="mt-4 text-muted-foreground">{t.desc}</p></div>)}</div></div></section>
    <section className="mx-auto max-w-6xl px-6 py-16"><p className="eyebrow">Keynote dates</p><ul className="mt-6 divide-y divide-border">{pressKit.keynoteDates.map(k => <li key={k.title} className="grid gap-1 py-4 sm:grid-cols-[5rem_1fr]"><span className="font-mono text-signal">{k.year}</span><span><span className="font-medium">{k.title}</span><span className="block text-sm text-muted-foreground">{k.outlet} · {k.format}</span></span></li>)}</ul></section>
    <section className="mx-auto max-w-6xl px-6 pb-16"><h2 className="font-display text-3xl">Media & event enquiries</h2><a href={`mailto:${profile.email}`} className="mt-4 inline-block break-all text-brand">{profile.email}</a></section>
  </>;
}