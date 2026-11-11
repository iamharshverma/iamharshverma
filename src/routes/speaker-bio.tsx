import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Mic, MapPin, Globe2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Reveal";
import { canonical } from "@/lib/seo";
import { profile, speaking } from "@/data/profile";
import { keynotes } from "@/data/media";
import { stages, onlineEvents } from "@/data/stages";
import { pressKit } from "@/data/press-kit";

const PDF = "/downloads/harsh-verma-speaker-bio.pdf";

export const Route = createFileRoute("/speaker-bio")({
  head: () => ({
    links: canonical("/speaker-bio").links,
    meta: [
      canonical("/speaker-bio").url,
      { title: "Harsh Verma Speaker Bio — Keynotes, Speaking History & Events" },
      { name: "description", content: "Official speaker bio for Harsh Verma: agentic AI and AI security keynotes at ACM, UC Berkeley SkyDeck, SF Tech Week and IEEE, with a downloadable PDF." },
      { property: "og:title", content: "Harsh Verma — Speaker Bio" },
      { property: "og:description", content: "Speaking history, past events and a one-page speaker bio PDF for event organizers." },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpeakerBio,
});

function SpeakerBio() {
  return <>
    <PageHero eyebrow="// speaker bio · for organizers" title={<>Harsh Verma, <span className="text-brand-gradient">on stage.</span></>} intro="Keynotes on agentic AI, enterprise security and trustworthy autonomous systems." />
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[0.8fr_1.2fr]">
      <img src={profile.stagePhoto} alt="Harsh Verma speaking on stage" className="w-full rounded-2xl border border-border object-cover" />
      <div className="min-w-0">
        <p className="eyebrow">Introduction</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{pressKit.shortBio}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">{profile.bio}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="h-12"><a href={PDF} download="harsh-verma-speaker-bio.pdf"><Download />Download speaker bio PDF</a></Button>
          <Button asChild variant="outline" className="h-12"><Link to="/booking" search={{ topic: "Keynote" }}>Book a keynote</Link></Button>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 pb-14">
      <h2 className="font-display text-3xl font-bold">Signature talks</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {speaking.filter(s => s.type !== "Judging").map(s => <div key={s.title} className="rounded-2xl border border-border bg-card p-6"><Mic className="size-5 text-brand" /><p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{s.type}</p><h3 className="mt-1 font-display text-lg font-semibold">{s.title}</h3><p className="mt-2 text-sm text-muted-foreground">{s.desc}</p></div>)}
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 pb-14">
      <h2 className="font-display text-3xl font-bold">Featured keynotes</h2>
      <ol className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
        {keynotes.map(k => <li key={k.href} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0"><p className="font-medium">{k.title}</p><p className="text-sm text-muted-foreground">{k.venue}</p></div>
          <a href={k.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 text-sm text-brand"><PlayCircle className="size-4" />Watch</a>
        </li>)}
      </ol>
    </section>
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="font-display text-3xl font-bold">Past events by city</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stages.map(s => <div key={s.city} className="rounded-2xl border border-border bg-card p-6">
          <p className="flex items-center gap-2 font-display text-lg font-semibold"><MapPin className="size-4 text-brand" />{s.city}<span className="text-sm font-normal text-muted-foreground">{s.region}</span></p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{s.events.map(e => <li key={e.title}><span className="mr-2 rounded bg-secondary px-1.5 py-0.5 text-xs text-foreground">{e.kind}</span>{e.title}</li>)}</ul>
        </div>)}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="flex items-center gap-2 font-display text-lg font-semibold"><Globe2 className="size-4 text-brand" />Online & global</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{onlineEvents.map(e => <li key={e}>{e}</li>)}</ul>
        </div>
      </div>
    </section>
  </>;
}
