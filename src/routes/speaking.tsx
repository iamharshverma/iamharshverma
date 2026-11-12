import { SeoSummary } from "@/components/site/SeoSummary";
import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Clock, Play, Gavel } from "lucide-react";
import { profile } from "@/data/profile";
import { keynotes, judging } from "@/data/media";
import { Reveal, PageHero, Counter } from "@/components/site/Reveal";
import { TiltCard, Modal, Magnetic } from "@/components/site/Interactive";
import { StageMap } from "@/components/site/StageMap";
import { ReelWall } from "@/components/site/ReelWall";
import { speakerGuide } from "@/data/press-kit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/speaking")({
  head: () => ({
    links: canonical("/speaking").links,
    meta: [
      canonical("/speaking").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Harsh Verma | AI Keynote Speaker on Agentic AI & Security" },
      { name: "description", content: "Explore AI speaker Harsh Verma's keynotes on agentic AI and enterprise security. Watch ACM and Berkeley SkyDeck talks, explore topics and enquire about your event." },
      { property: "og:title", content: "Harsh Verma | AI Keynote Speaker on Agentic AI & Security" },
      { property: "og:description", content: "AI keynotes for enterprise, engineering and security audiences, with recordings, speaking topics and event enquiries." },
      { name: "twitter:title", content: "Harsh Verma | AI Keynote Speaker on Agentic AI & Security" },
      { name: "twitter:description", content: "Explore agentic AI and enterprise security keynotes, recordings and event enquiries." },
      { property: "og:image", content: profile.stagePhoto },
      { name: "twitter:image", content: profile.stagePhoto },
    ],
  }),
  component: Speaking,
});

const stats = [{ v: 43, l: "Total engagements" }, { v: 10, l: "Featured keynotes" }, { v: 21, l: "Judging & mentorship" }, { v: 6, l: "Panels" }];
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
      <PageHero eyebrow="// keynotes · panels · judging" title={<>Harsh Verma · <span className="text-brand-gradient">AI keynote speaker.</span></>}
        intro="Agentic AI, enterprise security and responsible adoption — grounded in engineering practice, with keynote recordings from ACM and UC Berkeley SkyDeck." />
      <SeoSummary heading="Book Harsh Verma as an AI keynote speaker" paragraphs={[
        "Harsh Verma speaks on agentic AI, AI security and responsible enterprise adoption. As a Principal AI Engineer at Palo Alto Networks, he brings real production experience to every keynote, panel and fireside chat, with talks delivered at ACM and UC Berkeley SkyDeck.",
        "Event organisers book Harsh for engineering conferences, executive summits, university programmes and hackathon judging. Talks are tailored for technical, leadership and security audiences, in person or online.",
      ]} links={[{ to: "/speaker-bio", label: "Speaker bio & PDF" }, { to: "/booking", label: "Book a keynote" }, { to: "/about", label: "About Harsh" }]} />
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.l} className={`px-6 py-8 ${i ? "md:border-l" : ""} border-border`}>
              <p className="font-display text-4xl font-bold text-signal md:text-5xl"><Counter to={s.v} suffix="+" /></p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14">
        <h2 className="font-display text-3xl font-bold">AI keynotes for leaders and builders</h2>
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
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal><p className="eyebrow">Now on stage · <Link to="/speaker-bio" className="text-brand">Full speaker bio &amp; PDF →</Link></p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Keynote theater</h2></Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div key={stage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button onClick={() => { window.__lovableEvents?.track?.("project.keynote_played", { keynote: k.title, source: "speaking" }); if (id) setPlay(id); else window.open(k.href, "_blank"); }} className="group relative block aspect-video w-full">
                <img src={k.img} alt={k.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
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
      <section className="mx-auto max-w-6xl px-6 pb-20"><Reveal><p className="eyebrow">Reels</p><h2 className="mb-8 mt-4 font-display text-5xl font-bold tracking-tight">Backstage in 60 seconds</h2></Reveal><ReelWall /></section>
      <section className="mx-auto max-w-6xl px-6 pb-20"><Reveal><p className="eyebrow">On stage</p><h2 className="mb-8 mt-4 font-display text-5xl font-bold tracking-tight">Where Harsh has spoken</h2></Reveal><StageMap /></section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-end justify-between gap-4">
          <Reveal><p className="eyebrow">Judging & mentorship</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Shaping the next builders</h2></Reveal>
          <p className="hidden font-mono text-xs text-muted-foreground md:block">{judging.length} roles</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(more ? judging : judging.slice(0, 9)).map((j, i) => (
            <Reveal key={j.title} delay={(i % 9) * 0.03}>
              <TiltCard>
                <div className="aspect-[16/9] overflow-hidden bg-muted"><img src={j.img} alt="" loading="lazy" className="h-full w-full object-contain transition duration-500 group-hover:scale-105" /></div>
                <div className="p-5">
                  <p className="flex items-center gap-1.5 font-mono text-[11px] text-signal"><Gavel className="h-3 w-3" />{j.role}</p>
                  <h3 className="mt-2 font-display text-lg leading-snug font-semibold">{j.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{j.org}</p>
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
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight">Keynote, panel, or executive masterclass.</h2>
            <p className="mt-4 text-muted-foreground">Tailored to enterprise or technical audiences, with Smart Slides and pre-event promotion included.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4"><Magnetic><Link to="/contact" className="inline-flex rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">Book a keynote</Link></Magnetic><Link to="/speaker-bio" className="inline-flex rounded-full border border-border px-6 py-3 font-medium hover:border-brand">Speaker bio &amp; PDF</Link></div>
          </div>
        </div>
      </section>

      <Modal open={!!play} onClose={() => setPlay(null)}>
        {play && <div className="aspect-video"><iframe className="h-full w-full" src={`https://www.youtube.com/embed/${play}?autoplay=1`} title="Keynote video" allow="autoplay; encrypted-media; fullscreen" allowFullScreen /></div>}
      </Modal>
    </>
  );
}
