import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Check, ZoomIn } from "lucide-react";
import { books, caoStages, infographics, artifacts, audiences, aiSecurityThemes, aiSecurityAudiences } from "@/data/books";
import { Reveal, PageHero } from "@/components/site/Reveal";
import { TiltCard, Modal, Magnetic } from "@/components/site/Interactive";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Books by Harsh Verma — Beyond AI Engineering & AI vs. AI" },
      { name: "description", content: "Beyond AI Engineering: the career operating system for the agentic AI era, and AI vs. AI: engineering the cybersecurity counteroffensive." },
      { property: "og:title", content: "Books by Harsh Verma" },
      { property: "og:description", content: "Beyond AI Engineering and AI vs. AI — two books for the agentic AI era." },
      { property: "og:image", content: books[0].cover },
      { name: "twitter:image", content: books[0].cover },
    ],
  }),
  component: Books,
});

function Books() {
  const [stage, setStage] = useState(1);
  const [mix, setMix] = useState({ Creator: 55, Architect: 30, Orchestrator: 15 });
  const [zoom, setZoom] = useState<string | null>(null);
  const [aud, setAud] = useState(0);
  const total = mix.Creator + mix.Architect + mix.Orchestrator || 1;
  const pct = (k: keyof typeof mix) => Math.round((mix[k] / total) * 100);
  const lead = (Object.keys(mix) as (keyof typeof mix)[]).sort((a, b) => mix[b] - mix[a])[0] ?? "Creator";
  const next = lead === "Creator" ? "Architect" : "Orchestrator";
  const st = caoStages[stage] ?? caoStages[0];
  const [bae, avs] = books;

  return (
    <>
      <PageHero eyebrow="// author · January 2027 releases" title={<>Books for the <span className="text-brand-gradient">agentic era.</span></>}
        intro="Two books, one thesis: when AI makes output abundant, human judgment and engineered trust become the scarce advantage." />

      {/* Beyond AI Engineering */}
      <section className="mx-auto max-w-6xl overflow-hidden px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
          <Reveal className="relative">
            <div className="absolute -inset-8 rounded-full bg-brand-gradient opacity-20 blur-3xl" />
            <motion.img whileHover={{ rotate: -2, scale: 1.02 }} src={bae.cover} alt={bae.title} className="relative w-full rounded-xl shadow-glow" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-xs text-signal">{bae.status} · Volume I</p>
            <h2 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl">{bae.title}</h2>
            <p className="mt-3 text-xl text-brand">{bae.subtitle}</p>
            <p className="mt-5 text-muted-foreground">{bae.pitch}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {bae.stats.map(([v, l]) => <div key={l} className="rounded-xl border border-border bg-card p-4"><p className="font-display text-3xl font-bold text-signal">{v}</p><p className="text-xs text-muted-foreground">{l}</p></div>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic><a href={bae.site} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">Visit the book site <ArrowUpRight className="h-4 w-4" /></a></Magnetic>
              <a href={`${bae.site}#framework`} target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-border px-6 py-3 hover:border-brand hover:text-brand">Read a free sample</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-card/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><p className="eyebrow">The fundamental shift</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Output is abundant. <span className="text-signal">Judgment is scarce.</span></h2></Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[["Code", "Syntax generation drops to zero marginal cost"], ["Content", "Docs, specs and tests multiply instantly"], ["Models", "Frontier and open models accessible to all"], ["Automation", "Pipelines run continuously"]].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.05}><div className="h-full rounded-xl border border-border bg-background p-5"><p className="font-mono text-xs text-muted-foreground">0{i + 1} · abundant</p><p className="mt-2 font-display text-2xl font-bold">{t} →</p><p className="mt-1 text-sm text-muted-foreground">{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal><p className="eyebrow">The C.A.O. framework</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Creator → Architect → Orchestrator</h2></Reveal>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {caoStages.map((c, i) => (
            <button key={c.key} onClick={() => setStage(i)} className={`rounded-xl border p-6 text-left transition ${stage === i ? "border-brand bg-accent shadow-glow" : "border-border bg-card hover:border-brand/50"}`}>
              <p className="font-mono text-xs text-brand">{c.tag}</p>
              <p className="mt-2 font-display text-3xl font-bold">{c.key}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.line}</p>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={stage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 grid gap-6 rounded-2xl border border-border bg-card p-8 md:grid-cols-3">
            <div><p className="font-mono text-xs text-muted-foreground">GUIDING QUESTION</p><p className="mt-2 font-display text-xl font-semibold">"{st.question}"</p><p className="mt-4 font-mono text-xs text-muted-foreground">TYPICAL ROLE</p><p className="mt-1 text-sm">{st.role}</p></div>
            <div><p className="font-mono text-xs text-muted-foreground">CORE CAPABILITIES</p><ul className="mt-2 space-y-1.5">{st.caps.map((c) => <li key={c} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-brand" />{c}</li>)}</ul></div>
            <div><p className="font-mono text-xs text-muted-foreground">PRIMARY RISK</p><p className="mt-2 text-sm text-muted-foreground">{st.risk}</p></div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 grid gap-6 rounded-2xl border border-border bg-card p-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">Interactive diagnostic</p>
            <h3 className="mt-3 font-display text-3xl font-bold">Where are you today?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Most engineers are a blend. Slide to describe how you spend your week.</p>
            <div className="mt-6 space-y-5">
              {(Object.keys(mix) as (keyof typeof mix)[]).map((k) => (
                <label key={k} className="block text-sm">
                  <span className="flex justify-between"><span>{k}</span><span className="font-mono text-signal">{pct(k)}%</span></span>
                  <input type="range" min={0} max={100} value={mix[k]} onChange={(e) => setMix({ ...mix, [k]: +e.target.value })} className="mt-2 w-full accent-[var(--brand)]" />
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-muted p-6">
            <div className="flex h-3 overflow-hidden rounded-full">
              <div className="bg-brand" style={{ width: `${pct("Creator")}%` }} /><div className="bg-signal" style={{ width: `${pct("Architect")}%` }} /><div className="bg-foreground/70" style={{ width: `${pct("Orchestrator")}%` }} />
            </div>
            <p className="mt-6 font-mono text-xs text-muted-foreground">YOUR CENTER OF GRAVITY</p>
            <p className="mt-1 font-display text-3xl font-bold">{lead}</p>
            <p className="mt-3 text-sm text-muted-foreground">{lead === "Orchestrator" ? "You already operate at the highest altitude — the book's trust and accountability chapters are your next edge." : `Your next breakthrough: grow your ${next} muscles. The book maps the weekly experiments to get there.`}</p>
            <a href={bae.site} target="_blank" rel="noreferrer" className="mt-4 text-sm text-brand">Take the full C.A.O. assessment ↗</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal><p className="eyebrow">15 infographics · 11 chapters</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Visual blueprints</h2></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {infographics.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <button onClick={() => setZoom(g.img)} className="block h-full w-full text-left">
                <TiltCard>
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted"><img src={g.img} alt={g.title} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                    <span className="glass absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full"><ZoomIn className="h-4 w-4 text-brand" /></span></div>
                  <div className="p-4"><p className="font-mono text-[11px] text-signal">{g.ch}</p><p className="mt-1 font-display text-lg font-semibold">{g.title}</p><p className="text-xs text-muted-foreground">{g.note}</p></div>
                </TiltCard>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow">Who it's for</p>
            <div className="mt-4 flex flex-wrap gap-2">{audiences.map(([n], i) => <button key={n} onClick={() => setAud(i)} className={`rounded-full border px-3 py-1.5 text-xs ${aud === i ? "border-brand text-brand" : "border-border text-muted-foreground"}`}>{n}</button>)}</div>
            <AnimatePresence mode="wait"><motion.p key={aud} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 font-display text-2xl font-semibold">{(audiences[aud] ?? audiences[0])[1]}</motion.p></AnimatePresence>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow">Build evidence, not notes</p>
            <h3 className="mt-3 font-display text-2xl font-bold">9 career artifacts you'll create</h3>
            <div className="mt-5 flex flex-wrap gap-2">{artifacts.map((a) => <span key={a} className="rounded-full border border-border px-3 py-1.5 text-xs">{a}</span>)}</div>
          </div>
        </Reveal>
      </section>

      {/* AI vs AI */}
      <section className="relative overflow-hidden border-t border-border py-24">
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="font-mono text-xs text-signal">{avs.status} · Cybersecurity volume</p>
            <h2 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl">{avs.title}</h2>
            <p className="mt-3 text-xl text-brand">{avs.subtitle}</p>
            <p className="mt-5 text-muted-foreground">{avs.pitch}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[["Detect", "Real-time agent telemetry"], ["Decide", "Verified autonomous loops"], ["Defend", "Counteroffensive at machine speed"]].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-border bg-card p-4"><p className="font-display text-xl font-bold text-signal">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>
              ))}
            </div>
            <div className="mt-8"><Magnetic><a href={avs.site} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">Visit beyondaivsai.com <ArrowUpRight className="h-4 w-4" /></a></Magnetic></div>
          </Reveal>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-xs">
            <div className="absolute -inset-8 rounded-full bg-signal/20 blur-3xl" />
            <motion.img whileHover={{ rotate: 2, scale: 1.02 }} src={avs.cover} alt={avs.title} className="relative w-full rounded-xl shadow-glow" />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-card/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><p className="eyebrow">AI vs. AI · inside the counteroffensive</p><h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">When both sides have AI,<br /><span className="text-brand">trust becomes the advantage.</span></h2></Reveal>
          <div className="mt-10 grid gap-x-10 sm:grid-cols-2">{aiSecurityThemes.map((t, i) => <Reveal key={t.title}><div className="border-t border-border py-6"><p className="font-mono text-xs text-signal">0{i + 1}</p><h3 className="mt-3 font-display text-2xl font-semibold">{t.title}</h3><p className="mt-3 text-muted-foreground">{t.description}</p></div></Reveal>)}</div>
          <div className="mt-8 border-t border-border pt-8"><p className="eyebrow">For the people building the defense</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{aiSecurityAudiences.map(a => <p key={a} className="flex items-center gap-2 text-sm"><Check className="size-4 shrink-0 text-brand" />{a}</p>)}</div><p className="mt-8 text-sm text-muted-foreground">Coming January 2027 · Explore the book's dedicated website for updates.</p></div>
        </div>
      </section>

      <Modal open={!!zoom} onClose={() => setZoom(null)}>{zoom && <img src={zoom} alt="Infographic" className="w-full" />}</Modal>
    </>
  );
}
