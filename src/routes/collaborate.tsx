import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Award, Check, Plus } from "lucide-react";
import { socialStats, brands, offerings, personas, audienceFacts, creatorBadges, formats } from "@/data/collaborate";
import { Reveal, PageHero, Counter } from "@/components/site/Reveal";
import { TiltCard, LogoTile, Magnetic } from "@/components/site/Interactive";

export const Route = createFileRoute("/collaborate")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Work With Harsh Verma — Keynotes, Advisory, Brand Partnerships" },
      { name: "description", content: "Collaborate with Harsh Verma: keynotes, board advisory, masterclasses, podcasts, brand partnerships and 1:1 mentorship reaching 16.6K+ tech leaders." },
      { property: "og:title", content: "Work With Harsh Verma" },
      { property: "og:description", content: "Keynotes, advisory, masterclasses, brand collaborations and mentorship." },
    ],
  }),
  component: Collaborate,
});

function Collaborate() {
  const [openIdx, setOpenIdx] = useState<number | null>(1);
  const [p, setP] = useState(0);
  const [fmt, setFmt] = useState(0);
  const [posts, setPosts] = useState(3);
  const persona = personas[p]!;
  const reach = formats[fmt]!.reach * posts;
  const engaged = Math.round(reach * 0.058);

  return (
    <>
      <PageHero eyebrow="// partnerships · advisory · creator" title={<>Let's build <span className="text-brand-gradient">together.</span></>}
        intro="From keynote stages to boardrooms to the LinkedIn feed — ways to partner with a principal AI engineer who founders, engineers and executives trust." />

      <section className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {socialStats.map((s, i) => (
            <div key={s.label} className={`px-6 py-8 ${i ? "md:border-l" : ""} border-border`}>
              <p className="font-display text-4xl font-bold text-signal md:text-5xl"><Counter to={s.value} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals} /></p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal><p className="eyebrow">Enterprise & brand trust</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Brands I've worked with</h2></Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {brands.map((b, i) => <Reveal key={b.name} delay={i * 0.02}><LogoTile src={b.logo} name={b.name} className="h-20" /></Reveal>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal><p className="eyebrow">Partnership models</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Ways to work together</h2></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {offerings.map((o, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={o.title} delay={i * 0.04}>
                <button onClick={() => setOpenIdx(open ? null : i)} className={`w-full rounded-xl border p-6 text-left transition ${open ? "border-brand bg-accent shadow-glow" : "border-border bg-card hover:border-brand/50"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-xs text-brand">{o.tag}</p>
                    <span className="rounded-full border border-signal/40 px-2.5 py-0.5 font-mono text-[11px] text-signal">{o.badge}</span>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-bold">{o.title}</h3>
                    <Plus className={`mt-1 h-5 w-5 shrink-0 transition ${open ? "rotate-45 text-brand" : ""}`} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
                  <AnimatePresence>
                    {open && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        {o.points.map((pt) => <li key={pt} className="mt-3 flex gap-2 text-sm"><Check className="h-4 w-4 shrink-0 text-brand" />{pt}</li>)}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal><p className="eyebrow">Audience</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Who you'll reach</h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {audienceFacts.map((f) => (
            <div key={f.l} className="rounded-xl border border-border bg-card p-6"><p className="font-display text-4xl font-bold text-signal">{f.v}</p><p className="mt-2 font-semibold">{f.l}</p><p className="text-sm text-muted-foreground">{f.d}</p></div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-10">
          <div className="flex flex-wrap gap-2">
            {personas.map((x, i) => (
              <button key={x.name} onClick={() => setP(i)} className={`rounded-full border px-4 py-2 text-sm transition ${p === i ? "border-brand bg-brand-gradient text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{x.name} · {x.share}%</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={p} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 grid gap-8 md:grid-cols-2">
              <div><h3 className="font-display text-3xl font-bold">{persona.name}</h3><p className="mt-2 font-mono text-xs text-brand">{persona.who}</p><p className="mt-4 text-muted-foreground">{persona.desc}</p></div>
              <div className="space-y-5">
                {persona.bars.map(([label, v]) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm"><span>{label}</span><span className="font-mono text-signal">{v}%</span></div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 0.8 }} className="h-full bg-brand-gradient" /></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="h-full rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow">Impact estimator</p>
            <h3 className="mt-3 font-display text-3xl font-bold">Estimate your campaign reach</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {formats.map((x, i) => <button key={x.name} onClick={() => setFmt(i)} className={`rounded-full border px-3 py-1.5 text-sm ${fmt === i ? "border-brand text-brand" : "border-border text-muted-foreground"}`}>{x.name}</button>)}
            </div>
            <label className="mt-6 block text-sm">Number of pieces: <span className="font-mono text-brand">{posts}</span>
              <input type="range" min={1} max={12} value={posts} onChange={(e) => setPosts(+e.target.value)} className="mt-3 w-full accent-[var(--brand)]" />
            </label>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-muted p-4"><p className="font-display text-3xl font-bold text-signal">{reach.toLocaleString()}</p><p className="text-xs text-muted-foreground">Estimated impressions</p></div>
              <div className="rounded-xl bg-muted p-4"><p className="font-display text-3xl font-bold text-brand">{engaged.toLocaleString()}</p><p className="text-xs text-muted-foreground">Engaged tech leaders (5.8%)</p></div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Indicative only, based on average past performance.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow">Creator authority</p>
            <h3 className="mt-3 font-display text-3xl font-bold">Favikon badges</h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {creatorBadges.map((b) => (
                <TiltCard key={b.name} className="p-4"><Award className="h-6 w-6 text-signal" /><p className="mt-3 font-semibold">{b.name}</p><p className="font-mono text-xs text-muted-foreground">{b.tier}</p></TiltCard>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28 text-center">
        <Reveal>
          <h2 className="font-display text-5xl font-bold tracking-tight">Have a stage, a startup, or a story?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Magnetic><Link to="/contact" className="inline-flex rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">Send a proposal</Link></Magnetic>
            <a href="https://adplist.org/mentors/harsh-verma" target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-border px-6 py-3 hover:border-brand hover:text-brand">Book mentorship on ADPList</a>
            <Link to="/advisory" className="inline-flex rounded-full border border-border px-6 py-3 hover:border-brand hover:text-brand">Advisory details</Link>
            <Link to="/testimonials" className="inline-flex rounded-full border border-border px-6 py-3 hover:border-brand hover:text-brand">Professional testimonials</Link>
            <Link to="/press-kit" className="inline-flex rounded-full border border-border px-6 py-3 hover:border-brand hover:text-brand">Press kit</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
