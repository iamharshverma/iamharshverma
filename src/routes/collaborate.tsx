import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Award, Check, Plus, ArrowUpRight } from "lucide-react";
import { socialStats, brands, offerings, personas, audienceFacts, creatorBadges, formats } from "@/data/collaborate";
import { Reveal, PageHero, Counter } from "@/components/site/Reveal";
import { TiltCard, Magnetic } from "@/components/site/Interactive";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/collaborate")({
  head: () => ({
    links: canonical("/collaborate").links,
    meta: [
      canonical("/collaborate").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Work With Harsh Verma — Keynotes, Advisory, Brand Partnerships" },
      { name: "description", content: "Collaborate with Harsh Verma: keynotes, board advisory, masterclasses, podcasts, brand partnerships and 1:1 mentorship reaching 18.1K+ tech leaders." },
      { property: "og:title", content: "Work With Harsh Verma" },
      { property: "og:description", content: "Keynotes, advisory, masterclasses, brand collaborations and mentorship." },
      { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
    ],
  }),
  component: Collaborate,
});

function Collaborate() {
  const [openIdx, setOpenIdx] = useState<number | null>(1);
  const [p, setP] = useState(0);
  const [fmt, setFmt] = useState(0);
  const [posts, setPosts] = useState(3);
  const persona = personas[p] ?? personas[0];
  const format = formats[fmt] ?? formats[0];
  if (!persona || !format) return null;
  const reach = format.reach * posts;
  const engaged = Math.round(reach * 0.058);

  return (
    <>
      <PageHero eyebrow="// partnerships · advisory · creator" title={<>Let's Build <span className="text-brand-gradient">Together.</span></>}
        intro="From keynote stages to boardrooms to the LinkedIn feed — ways to partner with a principal AI engineer who founders, engineers and executives trust." />

      <section className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {socialStats.map((s, i) => (
            <div key={s.label} className={`px-6 py-8 ${i ? "md:border-l" : ""} border-border`}>
              <p className="font-display text-4xl font-bold text-stat-number md:text-5xl"><Counter to={s.value} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals} /></p>
              <p className="mt-1 text-sm text-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="partnership-heading" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal><p className="eyebrow">Partnership models</p><h2 id="partnership-heading" className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Ways to Work Together</h2></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {offerings.map((o, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={o.title} delay={i * 0.04}>
                <article onClick={(event) => { if (event.target instanceof Element && event.target.closest("a, button")) return; setOpenIdx(open ? null : i); }} className={`cursor-pointer rounded-lg border p-5 transition sm:p-6 ${open ? "border-brand bg-accent" : "border-border bg-card hover:border-brand/50"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3"><p className="font-mono text-xs text-brand">{o.tag}</p><span className="font-mono text-xs text-signal">{o.badge}</span></div>
                  <div className="mt-3 flex items-start justify-between gap-4"><h3 className="min-w-0 font-display text-xl font-bold sm:text-2xl">{o.title}</h3><Button variant="ghost" size="icon" className="size-8 shrink-0" aria-label={`${open ? "Hide" : "Show"} details for ${o.title}`} aria-expanded={open} aria-controls={`offering-details-${i}`} onClick={() => setOpenIdx(open ? null : i)}><Plus className={`size-4 transition-transform ${open ? "rotate-45 text-brand" : ""}`} /></Button></div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.desc}</p>
                  <AnimatePresence>
                    {open && (
                      <motion.ul id={`offering-details-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        {o.points.map((pt) => <li key={pt} className="mt-3 flex gap-2 text-sm"><Check className="h-4 w-4 shrink-0 text-brand" />{pt}</li>)}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  <div className="mt-5"><Button asChild size="sm" variant="outline" className="h-8 px-3 text-xs">{o.topic === "Keynote" || o.topic === "Advisory" ? <Link to="/booking" search={{ topic: o.topic }}>Discuss <ArrowUpRight className="size-3" /></Link> : <Link to="/contact" search={{ topic: o.topic }}>Discuss <ArrowUpRight className="size-3" /></Link>}</Button></div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal><p className="eyebrow">Audience</p><h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Who You'll Reach</h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {audienceFacts.map((f) => (
            <div key={f.l} className="rounded-xl border border-border bg-card p-6"><p className="font-display text-4xl font-bold text-stat-number">{f.v}</p><p className="mt-2 font-semibold">{f.l}</p><p className="text-sm text-muted-foreground">{f.d}</p></div>
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
            <h3 className="mt-3 font-display text-3xl font-bold">Estimate Your Campaign Reach</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {formats.map((x, i) => <button key={x.name} onClick={() => setFmt(i)} className={`rounded-full border px-3 py-1.5 text-sm ${fmt === i ? "border-brand text-brand" : "border-border text-muted-foreground"}`}>{x.name}</button>)}
            </div>
            <label className="mt-6 block text-sm">Number of pieces: <span className="font-mono text-brand">{posts}</span>
              <input type="range" min={1} max={12} value={posts} onChange={(e) => setPosts(+e.target.value)} className="mt-3 w-full accent-[var(--brand)]" />
            </label>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-muted p-4"><p className="font-display text-3xl font-bold text-stat-number">{reach.toLocaleString()}</p><p className="text-xs text-muted-foreground">Estimated impressions</p></div>
              <div className="rounded-xl bg-muted p-4"><p className="font-display text-3xl font-bold text-stat-number">{engaged.toLocaleString()}</p><p className="text-xs text-muted-foreground">Engaged tech leaders (5.8%)</p></div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Illustrative estimate using owner-provided planning assumptions; not a guaranteed result.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow">Creator authority</p>
            <h3 className="mt-3 font-display text-3xl font-bold">Favikon Badges</h3>
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
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Have a Stage, a Startup, or a Story?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Magnetic><Link to="/contact" className="inline-flex rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">Send a proposal</Link></Magnetic>
            <a href="https://adplist.org/mentors/harsh-verma" target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-border px-6 py-3 hover:border-brand hover:text-brand">Book mentorship on ADPList</a>
            <Link to="/advisory" className="inline-flex rounded-full border border-border px-6 py-3 hover:border-brand hover:text-brand">Advisory details</Link>
            <Link to="/testimonials" className="inline-flex rounded-full border border-border px-6 py-3 hover:border-brand hover:text-brand">Professional testimonials</Link>
            <Link to="/press-kit" className="inline-flex rounded-full border border-border px-6 py-3 hover:border-brand hover:text-brand">Press kit</Link>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="brand-showcase-heading" className="border-t border-border bg-card/30 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-3"><span aria-hidden className="h-2 w-2 rounded-full bg-signal" />Enterprise & brand trust</p>
              <h2 id="brand-showcase-heading" className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Brands I've<br /><span className="text-brand">worked with.</span></h2>
            </div>
            <div className="flex items-center gap-4 border-l-2 border-signal pl-5">
              <span className="font-display text-5xl font-bold text-stat-number">{String(brands.length).padStart(2, "0")}</span>
              <p className="font-mono text-xs leading-relaxed text-stat-label">BRANDS &<br />INSTITUTIONS</p>
            </div>
          </Reveal>
          <div className="press-strip-depth mt-8 overflow-hidden md:mt-10">
            <div className="press-strip-fade py-3">
              <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] md:gap-4">
                {[...brands, ...brands].map((b, i) => (
                  <div key={`${b.name}-${i}`} className="press-card-shadow flex h-16 w-36 shrink-0 items-center justify-center rounded-lg border border-border bg-logo-tile px-4 sm:h-20 sm:w-44">
                    <img src={b.logo} alt={b.name} title={b.name} loading="lazy" decoding="async" className="max-h-9 w-full max-w-28 object-contain sm:max-h-11 sm:max-w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
