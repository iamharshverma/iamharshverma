import { SeoSummary } from "@/components/site/SeoSummary";
import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical, SITE_URL } from "@/lib/seo";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Clock, Play, Gavel, CalendarDays, MapPin, ArrowUpRight, BadgeCheck } from "lucide-react";
import { profile } from "@/data/profile";
import { keynotes, judging } from "@/data/media";
import { Reveal, PageHero, Counter } from "@/components/site/Reveal";
import { TiltCard, Modal, Magnetic } from "@/components/site/Interactive";
import { StageMap } from "@/components/site/StageMap";
import { ReelWall } from "@/components/site/ReelWall";
import { speakerGuide } from "@/data/press-kit";
import { Button } from "@/components/ui/button";
import { flagshipTalks } from "@/data/flagship-talks";
import { ownerReportedSpeakingMetrics } from "@/data/metrics";
import { upcomingTalks } from "@/data/upcoming-talks";
import { speakerProfiles } from "@/data/speaker-profiles";
import speakerPhoto from "@/assets/harsh-verma-speaker.jpg.asset.json";

export const Route = createFileRoute("/speaking")({
  head: () => ({
    links: canonical("/speaking").links,
    meta: [
      canonical("/speaking").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Harsh Verma - Speaker & Author | AI Keynote Talks" },
      { name: "description", content: "Harsh Verma, AI keynote speaker and author. Watch talks at VLink, ACM and UC Berkeley SkyDeck on agentic AI, cybersecurity and trust, and invite him to speak." },
      { property: "og:title", content: "Harsh Verma - Speaker & Author | AI Keynote Talks" },
      { property: "og:description", content: "Harsh Verma, AI keynote speaker and author. Watch talks at VLink, ACM and UC Berkeley SkyDeck on agentic AI, cybersecurity and trust, and invite him to speak." },
      { name: "twitter:title", content: "Harsh Verma - Speaker & Author | AI Keynote Talks" },
      { name: "twitter:description", content: "Harsh Verma, AI keynote speaker and author. Watch talks at VLink, ACM and UC Berkeley SkyDeck on agentic AI, cybersecurity and trust, and invite him to speak." },
      { property: "og:image", content: profile.stagePhoto },
      { name: "twitter:image", content: profile.stagePhoto },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/speaking#page`,
      name: "AI keynote talks by Harsh Verma",
      url: `${SITE_URL}/speaking`,
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: keynotes.map((keynote, index) => ({
          "@type": "ListItem", position: index + 1,
          item: { "@type": "CreativeWork", name: keynote.title, description: keynote.desc,
            url: keynote.href, author: { "@id": `${SITE_URL}/#person` } },
        })),
      },
    }) }],
  }),
  component: Speaking,
});

const stats = ownerReportedSpeakingMetrics;
const ytId = (u: string) => u.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1];

function Speaking() {
  const [stage, setStage] = useState(0);
  const [play, setPlay] = useState<string | null>(null);
  const [more, setMore] = useState(false);
  const k = keynotes[stage] ?? keynotes[0];
  if (!k) return null;
  const id = ytId(k.href);
  return (
    <>
      <PageHero eyebrow="// keynotes · panels · judging" title={<>Harsh Verma · <span className="text-brand-gradient">AI Keynote Speaker.</span></>}
        intro="Agentic AI, enterprise security and responsible adoption — grounded in engineering practice, with keynote recordings from ACM and UC Berkeley SkyDeck." />
      <SeoSummary linksBelowMedia sideMedia={<img src={profile.stagePhoto} alt="Harsh Verma holding a microphone on stage" className="mx-auto h-72 w-full object-contain object-bottom md:h-80" />} heading="Book Harsh Verma as an AI keynote speaker" paragraphs={[
        `Harsh Verma speaks on agentic AI, AI security and responsible enterprise adoption. As a ${profile.title} at ${profile.company}, he brings an engineering perspective to keynotes, panels and fireside chats, with talks delivered at ACM and UC Berkeley SkyDeck.`,
        "Event organisers book Harsh for engineering conferences, executive summits, university programmes and hackathon judging. Talks are tailored for technical, leadership and security audiences, in person or online.",
      ]} links={[{ to: "/speaker-bio", label: "Speaker Bio" }, { to: "/booking", label: "Book Keynote" }, { to: "/about", label: "About Harsh" }]} />
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.l} className={`px-6 py-8 ${i ? "md:border-l" : ""} border-border`}>
              <p className="font-display text-4xl font-bold text-stat-number md:text-5xl"><Counter to={s.v} suffix={s.suffix} /></p>
              <p className="mt-1 text-sm text-stat-label">{s.l}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto max-w-6xl px-6 pb-5 text-xs text-muted-foreground">Career figures provided by Harsh; the archive below contains {keynotes.length} recordings and {judging.length} judging records.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14">
        <Reveal><p className="eyebrow">Upcoming</p><h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Where Harsh is Speaking next</h2></Reveal>
        <div className="mt-10 grid gap-6">
          {upcomingTalks.map((talk) => (
            <article key={talk.title} className="relative overflow-hidden rounded-2xl border border-border bg-card">
              <div className="absolute inset-y-0 left-0 w-1 bg-brand-gradient" aria-hidden />
              <div className="grid gap-8 p-8 md:grid-cols-[auto_1fr] md:p-10">
                <div className="flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-3 md:border-r md:border-border md:pr-10">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-primary-foreground shadow-glow"><CalendarDays className="h-6 w-6" /></span>
                  <div>
                    <p className="font-display text-2xl font-bold text-stat-number">{talk.date}</p>
                    <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{talk.location}</p>
                  </div>
                </div>
                <div className={`grid min-w-0 gap-5 ${talk.thumbnail ? "lg:grid-cols-[minmax(0,1fr)_208px]" : ""}`}>
                  <div className="min-w-0">
                  <p className="font-mono text-xs text-signal">{talk.role} · {talk.event}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{talk.title}</h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{talk.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2 lg:flex-nowrap">
                    {talk.links.map((link, i) => (
                      <Button key={link.href} asChild size="sm" variant={i === 0 ? "default" : "outline"} className="whitespace-nowrap px-3 text-xs">
                        <a href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight className="ml-1 h-3.5 w-3.5" /></a>
                      </Button>
                    ))}
                  </div>
                  </div>
                  {talk.thumbnail && <a href={talk.thumbnail.href} target="_blank" rel="noreferrer" className="block w-52 max-w-full self-stretch justify-self-end overflow-hidden rounded-lg border border-border transition-colors hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`View ${talk.event} on Luma`}><img src={talk.thumbnail.src} alt={talk.thumbnail.alt} loading="lazy" className="h-full w-full object-cover" /></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14">
        <h2 className="font-display text-3xl font-bold">AI Keynotes for Leaders and Builders</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{speakerGuide.introduction}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {speakerGuide.audiences.map(a => <div key={a.title} className="border-l-2 border-brand pl-5"><h3 className="font-display text-xl font-semibold">{a.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{a.detail}</p></div>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild><Link to="/booking" search={{ topic: "Keynote" }}>Discuss your AI keynote</Link></Button>
          <Button asChild variant="outline"><Link to="/speaker-bio">Speaker bio &amp; event history</Link></Button>
          <Button asChild variant="outline"><Link to="/insights/$slug" params={{ slug: "enterprise-agent-security-checklist-tool-permissions-and-human-approvals" }}>Enterprise agent security checklist</Link></Button>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pt-14"><h2 className="font-display text-3xl font-semibold">Flagship Speaking Themes</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{flagshipTalks.map(t => <article key={t.title} className="flex flex-col rounded-lg border border-border bg-card p-6"><h3 className="font-display text-2xl font-semibold">{t.title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.summary}</p><p className="mt-4 text-sm"><span className="font-semibold">Audience: </span>{t.audience}</p><ul className="mt-5 list-disc space-y-3 pl-4 text-sm text-muted-foreground">{t.takeaways.map(k => <li key={k}>{k}</li>)}</ul><p className="mt-5 text-xs text-muted-foreground">Proposed formats: keynote, panel or workshop; 30–60 minutes by agreement.</p><div className="mt-auto flex flex-wrap gap-2 pt-6"><Button asChild size="sm"><Link to="/booking" search={{ topic: "Keynote" }}>Discuss this theme</Link></Button></div></article>)}</div></section>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal><p className="eyebrow">Now on stage · <Link to="/speaker-bio" className="text-brand">Full speaker bio &amp; PDF →</Link></p><h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Keynote Theater</h2></Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div key={stage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button onClick={() => { window.__lovableEvents?.track?.("project.keynote_played", { keynote: k.title, source: "speaking" }); if (id) setPlay(id); else window.open(k.href, "_blank"); }} className="group relative block aspect-video w-full">
                <img src={k.img} alt={k.title} className="h-full w-full object-cover" />
                <span className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-gradient text-primary-foreground shadow-glow transition group-hover:scale-110"><Play className="ml-1 h-6 w-6" /></span>
                <span className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 font-mono text-xs"><Clock className="h-3 w-3" />{k.dur}</span>
              </button>
              <div className="p-6">
                <p className="font-mono text-xs text-signal">{k.venue}</p>
                <h3 className="mt-2 font-display text-2xl font-bold">{k.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{k.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <ul className="max-h-[640px] space-y-2 overflow-auto pr-1">
            {keynotes.map((x, i) => (
              <li key={x.title}>
                <button onClick={() => setStage(i)} className={`flex w-full gap-3 rounded-xl border p-2 text-left transition ${i === stage ? "border-brand bg-accent" : "border-transparent hover:bg-card"}`}>
                  <img src={x.img} alt="" loading="lazy" className="aspect-video w-28 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0"><p className="line-clamp-2 text-sm font-semibold">{x.title}</p><p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">{x.venue}</p></div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20"><Reveal><p className="eyebrow">Reels</p><h2 className="mb-8 mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Backstage in 60 Seconds</h2></Reveal><ReelWall /></section>
      <section className="mx-auto max-w-6xl px-6 pb-20" aria-labelledby="speaker-listings-heading">
        <Reveal><p className="eyebrow">Featured speaker profiles</p><h2 id="speaker-listings-heading" className="mt-4 font-display text-3xl font-bold md:text-4xl">Listed on Leading Speaker Platforms</h2></Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
          <img src={speakerPhoto.url} alt="Harsh Verma speaking on stage" loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover object-top sm:max-h-96 lg:h-full lg:max-h-none" />
          <div className="grid gap-4 sm:grid-cols-2">
            {speakerProfiles.map((listing) => (
              <article key={listing.href} className="group flex min-w-0 flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-brand">
                <div className="flex flex-wrap items-center justify-between gap-3"><span className="grid h-14 w-28 shrink-0 place-items-center rounded-md bg-primary-foreground p-2"><img src={listing.logo} alt={`${listing.name} logo`} loading="lazy" className="max-h-full w-full object-contain" /></span><p className="text-xs text-muted-foreground">{listing.label}</p></div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{listing.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{listing.description}</p>
                <div className="mt-auto pt-6"><Button asChild variant="outline" size="sm" className="border-brand/40 text-brand"><a href={listing.href} target="_blank" rel="noopener noreferrer" aria-label={`View Harsh Verma’s profile on ${listing.name}`}>View speaker profile<ArrowUpRight className="h-4 w-4" /></a></Button><p className="mt-3 break-all text-xs text-muted-foreground">{listing.domain}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20"><Reveal><p className="eyebrow">On stage</p><h2 className="mb-8 mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Where Harsh has Spoken</h2></Reveal><StageMap /></section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-end justify-between gap-4">
          <Reveal><p className="eyebrow">Judging & mentorship</p><h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Shaping the Next Builders</h2></Reveal>
          <p className="hidden font-mono text-xs text-muted-foreground md:block">{judging.length} roles</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(more ? judging : judging.slice(0, 9)).map((j, i) => (
            <Reveal key={j.title} delay={(i % 9) * 0.03}>
              <TiltCard>
                <div className="aspect-[16/9] overflow-hidden bg-muted"><img src={j.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="p-5">
                  <p className="flex items-center gap-1.5 font-mono text-[11px] text-signal"><Gavel className="h-3 w-3" />{j.role}</p>
                  <h3 className="mt-2 font-display text-lg leading-snug font-semibold">{j.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{j.org}</p>
                  {(j.href || j.verifiedHref) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {j.href && <a href={j.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-brand/40 px-3 py-1 font-mono text-[10px] text-brand transition hover:bg-accent">Judge profile<ArrowUpRight className="h-3 w-3" /></a>}
                      {j.verifiedHref && <a href={j.verifiedHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-signal/40 px-3 py-1 font-mono text-[10px] text-signal transition hover:bg-accent"><BadgeCheck className="h-3 w-3" />Verified judge</a>}
                    </div>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        {judging.length > 9 && <div className="mt-8 text-center"><button onClick={() => setMore(!more)} className="rounded-full border border-border px-6 py-2.5 text-sm hover:border-brand hover:text-brand">{more ? "Show fewer" : `Show all ${judging.length}`}</button></div>}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid items-center gap-10 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
          <img src={profile.stagePhoto} alt="Harsh Verma speaking on stage" loading="lazy" className="h-full max-h-[460px] w-full object-cover object-top" />
          <div className="p-8">
            <p className="eyebrow">Invite Harsh</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight">Keynote, Panel, or Executive Masterclass.</h2>
            <p className="mt-4 text-muted-foreground">Tailored to enterprise or technical audiences, with Smart Slides and pre-event promotion included.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4"><Magnetic><Link to="/booking" search={{ topic: "Keynote" }} className="inline-flex rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">Book a keynote</Link></Magnetic><Link to="/speaker-bio" className="inline-flex rounded-full border border-border px-6 py-3 font-medium hover:border-brand">Speaker bio &amp; PDF</Link></div>
          </div>
        </div>
      </section>

      <Modal open={!!play} onClose={() => setPlay(null)}>
        {play && <div className="aspect-video"><iframe className="h-full w-full" src={`https://www.youtube.com/embed/${play}?autoplay=1`} title="Keynote video" allow="autoplay; encrypted-media; fullscreen" allowFullScreen /></div>}
      </Modal>
    </>
  );
}
