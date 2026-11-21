import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Mic, PlayCircle, Copy, Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { canonical } from "@/lib/seo";
import { speaking } from "@/data/profile";
import { keynotes } from "@/data/media";
import { pressKit, speakerGuide, pressPhotos } from "@/data/press-kit";
import { researchPillars } from "@/data/research-pillars";
import { professionalIdentity } from "@/data/identity";
import speakerPhoto from "@/assets/harsh-verma-speaker.jpg.asset.json";
import { SpeakerEvents } from "@/components/site/SpeakerEvents";

const PDF = "/downloads/harsh-verma-speaker-bio.pdf";

export const Route = createFileRoute("/speaker-bio")({
  head: () => ({
    links: canonical("/speaker-bio").links,
    meta: [
      canonical("/speaker-bio").url,
      { title: "Harsh Verma Speaker Bio | AI Keynotes & Event Resources" },
      { name: "description", content: "Get Harsh Verma’s speaker biography, signature AI talks, past events and downloadable bio PDF for conference organizers planning an AI keynote." },
      { property: "og:title", content: "Harsh Verma Speaker Bio | AI Keynotes & Event Resources" },
      { property: "og:description", content: "Get Harsh Verma’s speaker biography, signature AI talks, past events and downloadable bio PDF for conference organizers planning an AI keynote." },
      { name: "twitter:title", content: "Harsh Verma Speaker Bio | AI Keynotes & Event Resources" },
      { name: "twitter:description", content: "Get Harsh Verma’s speaker biography, signature AI talks, past events and downloadable bio PDF for conference organizers planning an AI keynote." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpeakerBio,
});

function SpeakerBio() {
  const [bioLength, setBioLength] = useState<"short" | "standard" | "extended">("standard");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const bio = professionalIdentity.biographies[bioLength];
  const copyBiography = async () => {
    try {
      await navigator.clipboard.writeText(bio);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  return <>
    <PageHero eyebrow="// speaker bio · for organizers" title={<>Harsh Verma · <span className="text-brand-gradient">AI Speaker Bio.</span></>} intro="Agentic AI, enterprise cybersecurity and trustworthy autonomous systems—from technical architecture to the decisions leaders make next." />
    <nav aria-label="Speaker resources" className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-3 border-b border-border px-6 py-5 text-sm text-muted-foreground">
      <a href="#introduction" className="hover:text-brand">Introduction</a><a href="#biography" className="hover:text-brand">Biography</a><a href="#signature-talks" className="hover:text-brand">Talks</a><a href="#recordings" className="hover:text-brand">Recordings</a><a href="#past-events" className="hover:text-brand">Past events</a><a href="#organizer-resources" className="hover:text-brand">Downloads</a>
    </nav>
    <section id="introduction" className="mx-auto grid max-w-6xl scroll-mt-28 items-center gap-10 px-6 py-14 md:grid-cols-[0.8fr_1.2fr]">
      <Reveal><figure><img src={speakerPhoto.url} alt="Harsh Verma speaking on stage" className="aspect-[4/5] w-full rounded-lg object-cover" /><figcaption className="mt-3 font-mono text-xs text-muted-foreground">Engineer · Author · Keynote Speaker</figcaption></figure></Reveal>
      <Reveal className="min-w-0">
        <p className="eyebrow">The speaker</p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight">Technical depth.<br />Strategic perspective.</h2>
        <p className="mt-5 border-l-2 border-brand pl-4 text-sm text-foreground">{professionalIdentity.positioning}</p>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{pressKit.shortBio}</p>
        <div className="mt-7 space-y-5">{speakerGuide.audiences.map(a => <div key={a.title} className="border-t border-border pt-4"><h3 className="font-semibold">{a.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.detail}</p></div>)}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild><Link to="/booking" search={{ topic: "Keynote" }}><Mic className="size-4" />Enquire about a keynote</Link></Button>
          <Button asChild variant="outline"><a href={PDF} download="harsh-verma-speaker-bio.pdf" onClick={() => window.__lovableEvents?.track?.("project.resource_downloaded", { resource: "speaker-bio" })}><Download className="size-4" />Speaker bio PDF</a></Button>
        </div>
      </Reveal>
    </section>
    <section id="biography" className="scroll-mt-28 border-y border-border bg-card/40 py-14">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_2fr]">
        <Reveal><p className="eyebrow">For your event program</p><h2 className="mt-3 font-display text-3xl font-semibold">Event-ready Biography</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Official short, standard and extended introductions.</p></Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Biography length" className="flex flex-wrap gap-1">{([['short', '50 words'], ['standard', '100 words'], ['extended', '250 words']] as const).map(([length, label]) => <Button key={length} variant={bioLength === length ? "secondary" : "ghost"} size="sm" aria-pressed={bioLength === length} onClick={() => { setBioLength(length); setCopied(false); setCopyError(false); }}>{label}</Button>)}</div>
            <Button variant="outline" size="sm" onClick={copyBiography}>{copied ? <Check className="size-4" /> : <Copy className="size-4" />}{copied ? "Copied" : "Copy bio"}</Button>
          </div>
          <p className="mt-6 select-text leading-relaxed text-muted-foreground">{bio}</p>
          {copyError && <p role="status" className="mt-3 text-sm text-muted-foreground">Copy is unavailable in this browser. You can select the biography above.</p>}
        </Reveal>
      </div>
    </section>
    <section id="signature-talks" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-14">
      <Reveal><p className="eyebrow">The conversation</p><h2 className="mt-3 font-display text-3xl font-semibold">Signature Talks</h2></Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {speaking.filter(s => s.type !== "Judging").map((s, i) => <article key={s.title} className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card"><img src={researchPillars[i]?.image ?? speakerPhoto.url} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" /><div className="flex flex-1 flex-col p-6"><p className="flex justify-between font-mono text-xs text-muted-foreground"><span>{s.type}</span><Mic className="size-4 text-brand" /></p><h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3><p className="mt-3 mb-6 text-sm leading-relaxed text-muted-foreground">{s.desc}</p><Button asChild variant="outline" className="mt-auto"><Link to="/contact" search={{ topic: s.type === "Keynote" ? "Keynote" : "Other" }}><ArrowUpRight className="size-4" />Discuss this session</Link></Button></div></article>)}
      </div>
    </section>
    <section id="recordings" className="mx-auto max-w-6xl scroll-mt-28 px-6 pb-14">
      <Reveal><p className="eyebrow">On the stage</p><h2 className="mt-3 font-display text-3xl font-semibold">Featured Keynotes</h2></Reveal>
      <ol className="mt-8 divide-y divide-border border-y border-border">
        {keynotes.map(k => <li key={k.href} className="grid gap-5 py-6 sm:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[200px_minmax(0,1fr)_auto] lg:items-center">
          <a href={k.href} target="_blank" rel="noreferrer" aria-label={`Watch ${k.title}`} className="group relative block overflow-hidden rounded-md"><img src={k.img} alt={k.title} loading="lazy" className="aspect-[16/9] w-full object-cover" /><span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded bg-background/90 px-2 py-1 text-xs text-foreground"><PlayCircle className="size-4 text-brand" />{k.dur}</span></a>
          <div className="min-w-0"><p className="font-mono text-xs text-brand">{k.venue}</p><h3 className="mt-2 font-display text-xl font-semibold">{k.title}</h3><p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{k.desc}</p></div>
          <Button asChild variant="outline" className="justify-self-start sm:col-start-2 lg:col-start-auto"><a href={k.href} target="_blank" rel="noreferrer"><PlayCircle className="size-4" />Watch keynote</a></Button>
        </li>)}
      </ol>
    </section>
    <section id="past-events" className="scroll-mt-28 border-y border-border bg-card/30 py-14">
      <div className="mx-auto max-w-6xl px-6"><Reveal><p className="eyebrow">Across communities</p><h2 className="mt-3 font-display text-3xl font-semibold">Past Events by City</h2></Reveal>
      <SpeakerEvents />
      </div>
    </section>
    <section id="organizer-resources" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-14">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div><p className="eyebrow">Ready for your program</p><h2 className="mt-3 font-display text-3xl font-semibold">Organizer Resources</h2></div>
        <Button asChild variant="outline" size="sm"><a href={PDF} download><Download className="size-4" />Speaker bio PDF</a></Button>
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pressPhotos.map((photo, index) => <Reveal key={photo.file} delay={index * 0.06}>
          <article className="h-full min-w-0 overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-brand/50">
            <a href={photo.src} target="_blank" rel="noreferrer" aria-label={`View full ${photo.label} photo`} className="group relative block border-b border-border bg-muted/20 focus-visible:outline-2 focus-visible:outline-ring">
              <img src={photo.src} alt={`Harsh Verma — ${photo.label}`} loading="lazy" className="aspect-[4/5] w-full object-contain" />
              <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-md border border-border bg-background/90 text-foreground transition-colors group-hover:text-brand" aria-hidden="true"><ArrowUpRight className="size-4" /></span>
            </a>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3"><h3 className="font-display text-lg font-semibold">{photo.label}</h3><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span></div>
              <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted-foreground">{photo.use}</p>
              <Button asChild variant="outline" size="sm" className="mt-4"><a href={photo.src} download={photo.file}><Download className="size-4" />Download photo</a></Button>
            </div>
          </article>
        </Reveal>)}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5"><p className="text-sm text-muted-foreground">Official portraits · Event photography · Speaker biography</p><Button asChild variant="ghost" size="sm"><Link to="/resources">All press resources<ArrowUpRight className="size-4" /></Link></Button></div>
    </section>
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6"><Reveal><p className="eyebrow">Start the conversation</p><h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Planning an AI Keynote?</h2></Reveal>
      <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{speakerGuide.briefing}</p>
      <div className="mt-7 flex flex-wrap gap-3"><Button asChild><Link to="/booking" search={{ topic: "Keynote" }}><Mic className="size-4" />Enquire about an AI keynote</Link></Button><Button asChild variant="outline"><Link to="/speaking"><PlayCircle className="size-4" />Watch Harsh speak</Link></Button></div></div>
    </section>
  </>;
}
