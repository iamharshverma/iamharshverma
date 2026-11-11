import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Reveal";
import { profile } from "@/data/profile";
import { pressKit, mediaKit } from "@/data/press-kit";

export const Route = createFileRoute("/media-kit")({
  head: () => ({
    links: canonical("/media-kit").links, meta: [
      canonical("/media-kit").url,
    { title: "Harsh Verma — Media Kit for Journalists & Hosts" },
    { name: "description", content: "Bio, portrait, interview topics and downloadable media kit PDF for journalists, podcast hosts and broadcasters." },
    { property: "og:title", content: "Harsh Verma — Media Kit" },
    { property: "og:description", content: "Everything editors and podcast hosts need to feature Harsh Verma." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: MediaKit,
});

function MediaKit() {
  return <><PageHero eyebrow="// journalists · podcasts · broadcast" title={<>Harsh Verma <span className="text-brand-gradient">Media Kit.</span></>} intro="Ready-to-use bio, photo and interview topics for press, podcasts and broadcast." />
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[0.8fr_1.2fr]">
      <div className="min-w-0"><img src={profile.portrait} alt="Portrait of Harsh Verma" className="aspect-[4/5] w-full max-w-sm rounded-lg object-cover object-top" /><Button asChild variant="outline" className="mt-4"><a href={profile.portrait} download="harsh-verma-portrait.jpg"><Download />Download photo</a></Button></div>
      <div className="min-w-0"><p className="eyebrow">Bio</p><p className="mt-4 text-lg leading-relaxed text-muted-foreground">{pressKit.shortBio}</p><p className="mt-4 leading-relaxed text-muted-foreground">{pressKit.fullBio}</p>
        <Button asChild className="mt-8 h-12"><a href={mediaKit.pdf} download="harsh-verma-media-kit.pdf"><Download />Download media kit PDF</a></Button>
        <div className="mt-6 flex flex-wrap gap-5 text-sm"><Link to="/press-kit" className="text-brand">Press kit</Link><Link to="/media" className="text-brand">All coverage</Link><Link to="/contact" className="text-brand">Interview requests</Link></div></div>
    </section>
    <section className="border-y border-border bg-muted/40 py-16"><div className="mx-auto max-w-6xl px-6"><p className="eyebrow">Interview topics</p><div className="mt-8 grid gap-8 md:grid-cols-3">{pressKit.topics.map(t => <div key={t.title} className="border-t border-border pt-6"><h2 className="font-display text-2xl">{t.title}</h2><p className="mt-3 text-muted-foreground">{t.desc}</p></div>)}</div></div></section>
    <section className="mx-auto max-w-6xl px-6 py-16"><p className="eyebrow">As featured in</p><div className="mt-6 flex flex-wrap gap-2">{mediaKit.outlets.map(o => <span key={o} className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground">{o}</span>)}</div></section>
  </>;
}
