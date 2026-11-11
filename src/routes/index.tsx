import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile, stats, awards, rolePortraits } from "@/data/profile";
import { Reveal, Counter } from "@/components/site/Reveal";
import { NeuralField } from "@/components/site/NeuralField";
import { Expertise } from "@/components/site/Expertise";
import { books } from "@/data/books";
import { Magnetic, TiltCard, LogoTile } from "@/components/site/Interactive";
import { keynotes, media } from "@/data/media";
import { pressLogos } from "@/data/collaborate";
import { Faq } from "@/components/site/Faq";
import { WorkWithMe } from "@/components/site/WorkWithMe";

export const Route = createFileRoute("/")({
  head: () => ({
    links: canonical("/").links,
    meta: [
      canonical("/").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Harsh Verma — Agentic AI & AI Advisory for Founders | Principal AI Engineer" },
      { name: "description", content: "AI advisory for founders: Harsh Verma helps startups design, secure and ship trustworthy agentic AI. Principal AI Engineer at Palo Alto Networks, startup advisor, author and keynote speaker." },
      { property: "og:title", content: "Harsh Verma — Agentic AI & AI Advisory for Founders" },
      { property: "og:description", content: "Helping founders ship agentic AI that customers trust — engineer, advisor, investor and speaker." },
      { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function RotatingRole({ i }: { i: number }) {
  return (
    <span className="relative block h-[2.3em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span key={i} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.45 }}
          className="block max-w-[10ch] leading-[1.15] text-brand-gradient">{profile.roles[i]}</motion.span>
      </AnimatePresence>
    </span>
  );
}

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600); return () => clearInterval(t); }, []);
  const role = profile.roles[i] ?? "";
  const shot = rolePortraits[role] ?? { src: profile.portrait, caption: "Agentic AI & AI Security · Palo Alto Networks" };
  return (
    <>
      <section className="relative min-h-screen overflow-hidden grain">
        <div className="absolute inset-0 bg-grid" />
        <NeuralField />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-36 pb-20 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:pt-44">
          <div>
            <Reveal><p className="eyebrow">// founder · engineer · speaker</p></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl">Harsh Verma<br /><span className="text-5xl md:text-7xl"><RotatingRole i={i} /></span></h1>
            </Reveal>
            <Reveal delay={0.2}><p className="mt-6 font-display text-xl font-medium md:text-2xl">Founder mindset. Engineer's precision. Speaker's voice.</p><p className="mt-3 max-w-xl text-base text-foreground/80">AI advisory for enterprises: I help enterprises build agentic AI that customers trust — from first agent to global scale.</p><p className="mt-4 max-w-xl text-lg text-muted-foreground">{profile.tagline}</p></Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Magnetic><Link to="/booking" className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow transition hover:scale-[1.03]">
                  Book a keynote or advisory <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link></Magnetic>
                <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 transition hover:border-brand hover:text-brand">Read the story</Link>
              </div>
              <p className="mt-5 font-mono text-xs text-muted-foreground">RSA Conference · ACM keynotes · UC Berkeley SkyDeck · Forbes Technology Council</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="relative mx-auto w-full max-w-sm shrink-0">
            <div className="absolute -inset-10 rounded-full bg-brand-gradient opacity-25 blur-3xl" />
            <div className="absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-signal/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-[4/5] w-full">
                <AnimatePresence initial={false}>
                  <motion.img key={shot.src} src={shot.src} alt={`Harsh Verma — ${role}`} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}
                    className="absolute inset-0 h-full w-full object-cover object-top" />
                </AnimatePresence>
              </div>
              <div className="glass absolute inset-x-4 bottom-4 rounded-xl p-4">
                <p className="font-mono text-xs text-muted-foreground">{role}</p>
                <p className="text-sm">{shot.caption}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <WorkWithMe />

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-6 py-10 ${i ? "md:border-l" : ""} border-border`}>
              <p className="font-display text-5xl font-bold tracking-tight font-bold text-signal md:text-6xl"><Counter to={s.value} suffix={s.suffix} /></p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <p className="eyebrow text-center">As seen on</p>
        <div className="mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee gap-4">
            {[...pressLogos, ...pressLogos].map((b, i) => <LogoTile key={i} src={b.logo} name={b.name} />)}
          </div>
        </div>
      </section>

      <Expertise />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between">
          <Reveal><p className="eyebrow">Highlights</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Recent recognition</h2></Reveal>
          <Link to="/recognition" className="hidden items-center gap-1 text-sm text-brand md:flex">All honors <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {awards.slice(0, 6).map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <TiltCard>
                <div className="aspect-[5/3] overflow-hidden"><img src={a.img} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /></div>
                <div className="p-6">
                <p className="font-mono text-xs text-signal">{a.badge}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.org}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between">
          <Reveal><p className="eyebrow">On stage</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Featured keynotes</h2></Reveal>
          <Link to="/speaking" className="hidden items-center gap-1 text-sm text-brand md:flex">Keynote theater <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {keynotes.slice(0, 3).map((k, i) => (
            <Reveal key={k.title} delay={i * 0.06}>
              <a href={k.href} target="_blank" rel="noreferrer" className="block h-full" onClick={() => window.__lovableEvents?.track?.("project.keynote_played", { keynote: k.title, source: "home" })}>
                <TiltCard>
                  <div className="relative aspect-video overflow-hidden"><img src={k.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute right-3 bottom-3 rounded-full bg-background/80 px-2.5 py-0.5 font-mono text-[11px]">{k.dur}</span></div>
                  <div className="p-5"><p className="font-mono text-[11px] text-signal">{k.venue}</p><h3 className="mt-2 font-display text-lg leading-snug font-semibold">{k.title}</h3></div>
                </TiltCard>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between">
          <Reveal><p className="eyebrow">In the press</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Recent headlines</h2></Reveal>
          <Link to="/media" className="hidden items-center gap-1 text-sm text-brand md:flex">All {media.length} features <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {media.filter((m) => m.group === "Press").slice(0, 5).map((m) => (
            <a key={m.title} href={m.href ?? "#"} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-5 transition hover:pl-3">
              <div><p className="font-mono text-[11px] text-signal">{m.outlet} · {m.year}</p><p className="mt-1 font-display text-xl font-semibold group-hover:text-brand">{m.title}</p></div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-brand" />
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-10 flex items-end justify-between">
          <Reveal><p className="eyebrow">Coming January 2027</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Authored books</h2></Reveal>
          <Link to="/books" className="hidden items-center gap-1 text-sm text-brand md:flex">Explore the books <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {books.map((b) => (
            <Reveal key={b.slug}>
              <Link to="/books" className="block h-full">
                <TiltCard className="flex flex-col gap-4 p-5 sm:flex-row sm:gap-6 sm:p-6">
                  <img src={b.cover} alt={b.title} className="w-28 shrink-0 rounded-lg object-cover shadow-glow" loading="lazy" />
                  <div><p className="font-mono text-xs text-signal">{b.status}</p><h3 className="mt-2 font-display text-2xl font-bold">{b.title}</h3><p className="mt-1 text-sm text-brand">{b.subtitle}</p><p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{b.pitch}</p></div>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Faq />
    </>
  );
}
