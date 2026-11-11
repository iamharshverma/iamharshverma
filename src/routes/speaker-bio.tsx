import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Mic, MapPin, Globe2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Reveal";
import { canonical } from "@/lib/seo";
import { profile, speaking } from "@/data/profile";
import { keynotes } from "@/data/media";
import { stages, onlineEvents } from "@/data/stages";
import { pressKit, speakerGuide } from "@/data/press-kit";

const PDF = "/downloads/harsh-verma-speaker-bio.pdf";

export const Route = createFileRoute("/speaker-bio")({
  head: () => ({
    links: canonical("/speaker-bio").links,
    meta: [
      canonical("/speaker-bio").url,
      { title: "Harsh Verma AI Speaker | AI Keynote Speaker Bio & Talks" },
      { name: "description", content: "Harsh Verma, AI keynote speaker on agentic AI and enterprise security. Explore ACM and UC Berkeley SkyDeck talks, past events and a downloadable speaker bio PDF." },
      { property: "og:title", content: "Harsh Verma AI Speaker | AI Keynote Speaker Bio & Talks" },
      { property: "og:description", content: "Meet Harsh Verma, AI keynote speaker on agentic AI and enterprise security. Explore his speaking history, keynote recordings and speaker bio PDF." },
      { name: "twitter:title", content: "Harsh Verma AI Speaker | AI Keynote Speaker Bio & Talks" },
      { name: "twitter:description", content: "Agentic AI and enterprise security keynotes by Harsh Verma, with past events, recordings and a downloadable speaker bio PDF." },
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
    <PageHero eyebrow="// speaker bio · for organizers" title={<>Harsh Verma · <span className="text-brand-gradient">AI speaker bio.</span></>} intro="AI keynote speaker on agentic AI, enterprise cybersecurity and trustworthy autonomous systems. Biography, past events and resources for conference organizers." />
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
      <h2 className="font-display text-3xl font-bold">Event-ready speaker introduction</h2>
      <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{speakerGuide.organizerBio}</p>
      <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">His engineering perspective connects the architecture of autonomous agents with the security and governance questions leaders face when adopting AI. For a preview of his approach, explore the recorded keynotes below or <Link to="/speaking" className="text-brand underline underline-offset-4">watch the AI keynote recordings</Link>.</p>
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
          <div className="min-w-0"><h3 className="font-medium">{k.title}</h3><p className="text-sm text-muted-foreground">{k.venue}</p><p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{k.desc}</p></div>
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
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="font-display text-3xl font-bold">Planning an AI keynote?</h2>
      <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{speakerGuide.briefing}</p>
      <div className="mt-7 flex flex-wrap gap-3"><Button asChild><Link to="/booking" search={{ topic: "Keynote" }}>Enquire about an AI keynote</Link></Button><Button asChild variant="outline"><Link to="/speaking">Watch Harsh speak</Link></Button></div>
    </section>
  </>;
}
