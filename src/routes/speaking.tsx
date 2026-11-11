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

export const Route = createFileRoute("/speaking")({
  head: () => ({
    links: canonical("/speaking").links,
    meta: [
      canonical("/speaking").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Keynotes & Speaking — Harsh Verma" },
      { name: "description", content: "Watch Harsh Verma's keynotes at ACM, UC Berkeley SkyDeck, SF Tech Week and more, plus 30+ judging and mentorship roles." },
      { property: "og:title", content: "Keynotes & Speaking — Harsh Verma" },
      { property: "og:description", content: "Keynotes on agentic AI, secure multi-agent systems and the AI-vs-AI counteroffensive." },
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
  const k = keynotes[stage]!;
  const id = ytId(k.href);
  return (
    <>
      <PageHero eyebrow="// keynotes · panels · judging" title={<>Talks that turn AI <span className="text-brand-gradient">into action.</span></>}
        intro="Keynotes across ACM, UC Berkeley SkyDeck, SF Tech Week and global summits — plus judging and mentoring at Techstars, Mayfield and the world's leading hackathons." />
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

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal><p className="eyebrow">Now on stage</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Keynote theater</h2></Reveal>
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
            <div className="mt-6"><Magnetic><Link to="/contact" className="inline-flex rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">Book a keynote</Link></Magnetic></div>
          </div>
        </div>
      </section>

      <Modal open={!!play} onClose={() => setPlay(null)}>
        {play && <div className="aspect-video"><iframe className="h-full w-full" src={`https://www.youtube.com/embed/${play}?autoplay=1`} title="Keynote video" allow="autoplay; encrypted-media; fullscreen" allowFullScreen /></div>}
      </Modal>
    </>
  );
}
