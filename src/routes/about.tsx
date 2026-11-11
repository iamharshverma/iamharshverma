import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { profile, experience, education, memberships, portraitGallery } from "@/data/profile";
import { Reveal, PageHero } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About Harsh Verma — Career, Education & Fellowships" },
      { name: "description", content: "Biography, career timeline at Palo Alto Networks, education at Stanford GSB and UT Dallas, and fellowships of Harsh Verma." },
      { property: "og:title", content: "About Harsh Verma" },
      { property: "og:description", content: "Researcher by passion, entrepreneur at heart." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="// about" title={<>Researcher by passion,<br /><span className="text-brand-gradient">entrepreneur at heart.</span></>} intro={profile.bio} />
      <section className="mx-auto max-w-6xl px-6 pt-20">
        <Reveal><p className="eyebrow">Many rooms, one mission</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Engineer. Speaker. Author.</h2></Reveal>
        <div className="mt-10 grid gap-4 md:h-[520px] md:grid-cols-3 md:gap-0 md:[&:hover>*]:flex-1">
          {portraitGallery.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.08} className="h-[420px] md:h-full">
              <figure className="group relative h-full overflow-hidden rounded-2xl border border-border md:mx-2">
                <img src={g.src} alt={`Harsh Verma — ${g.label}`} loading="lazy" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
                <figcaption className="glass absolute inset-x-4 bottom-4 rounded-xl p-4 transition duration-500 md:translate-y-2 md:group-hover:translate-y-0">
                  <p className="font-mono text-xs text-signal">0{i + 1}</p>
                  <p className="font-display text-2xl font-semibold">{g.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{g.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">
        {profile.philosophy.map((p, i) => (
          <Reveal key={p.p} delay={i * 0.1}>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <p className="font-display text-6xl text-brand-gradient">P{i + 1}</p>
              <h3 className="mt-4 font-display text-3xl">{p.p}</h3>
              <p className="mt-3 text-muted-foreground">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </section>
      <Journey />
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <Reveal><p className="eyebrow">Invited associations</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Fellowships & memberships</h2></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {memberships.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.04}>
              <a href={m.href} target="_blank" rel="noreferrer" className="group flex h-full items-start justify-between rounded-2xl border border-border bg-card p-6 transition hover:border-brand/50">
                <div><h3 className="font-display text-2xl">{m.name}</h3><p className="mt-1 text-sm text-muted-foreground">{m.note}</p></div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-brand" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

type Stop = { kind: "work" | "edu"; period: string; title: string; org: string; place?: string; points: string[]; tech: string[]; logo?: string };
const stops: Stop[] = [
  ...experience.map((e) => ({ kind: "work" as const, period: e.period, title: e.role, org: e.org, place: e.place, points: e.points, tech: e.tech })),
  ...education.map((e) => ({ kind: "edu" as const, period: e.period, title: e.degree.split(" — ")[0] ?? e.degree, org: e.school, points: e.degree.split(" — ").slice(1), tech: [], logo: e.logo })),
].sort((x, y) => parseInt(y.period.match(/\d{4}/)?.[0] ?? "0") - parseInt(x.period.match(/\d{4}/)?.[0] ?? "0"));

function Journey() {
  const [filter, setFilter] = useState<"all" | "work" | "edu">("all");
  const list = stops.filter((s) => filter === "all" || s.kind === filter);
  const [sel, setSel] = useState(0);
  const cur = list[Math.min(sel, list.length - 1)];
  const years = stops.map((s) => parseInt(s.period.match(/\d{4}/)?.[0] ?? "0"));
  const min = Math.min(...years), max = new Date().getFullYear();
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal><p className="eyebrow">Journey</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">From code to boardroom</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">Pick a milestone to explore the work, the place and the tools behind it.</p></Reveal>
        <div className="flex rounded-full border border-border bg-card p-1">
          {([["all", "All"], ["work", "Experience"], ["edu", "Education"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => { setFilter(k); setSel(0); }} className={`rounded-full px-4 py-2 text-sm transition ${filter === k ? "bg-brand-gradient text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="relative mt-12 hidden h-14 md:block">
        <div className="absolute inset-x-0 top-6 h-px bg-border" />
        {list.map((s, i) => {
          const y = parseInt(s.period.match(/\d{4}/)?.[0] ?? "0");
          const left = ((y - min) / (max - min)) * 92 + 4;
          const active = s === cur;
          return (
            <button key={s.org + s.title} onClick={() => setSel(i)} style={{ left: `${left}%` }} aria-label={`${s.org} ${s.period}`}
              className="group absolute top-0 -translate-x-1/2 text-center">
              <span className={`mx-auto mt-[18px] block rounded-full border-2 border-background transition ${active ? "h-4 w-4 bg-brand shadow-glow" : "h-3 w-3 bg-muted-foreground/50 group-hover:bg-brand"}`} />
              <span className={`mt-1 block font-mono text-[11px] ${active ? "text-brand" : "text-muted-foreground"}`}>{y}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <ol className="space-y-2">
          {list.map((s, i) => {
            const active = s === cur; const Icon = s.kind === "work" ? Briefcase : GraduationCap;
            return (
              <li key={s.org + s.title}>
                <button onClick={() => setSel(i)} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${active ? "border-brand/50 bg-card shadow-glow" : "border-transparent hover:border-border hover:bg-card/60"}`}>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${active ? "bg-brand-gradient text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Icon className="h-4 w-4" /></span>
                  <span className="min-w-0"><span className="block font-mono text-[11px] text-muted-foreground">{s.period}</span>
                    <span className="block truncate font-display text-lg font-semibold">{s.org}</span></span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-border bg-card p-8">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
          <AnimatePresence mode="wait">
            {cur && (
              <motion.div key={cur.org + cur.title + filter} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="relative">
                <div className="flex items-start gap-4">
                  {cur.logo && <img src={cur.logo} alt="" className="h-14 w-14 rounded-xl bg-logo-tile object-contain p-1" />}
                  <div>
                    <p className="font-mono text-xs text-signal">{cur.kind === "work" ? "Experience" : "Education"} · {cur.period}</p>
                    <h3 className="mt-2 font-display text-3xl font-bold leading-tight">{cur.title}</h3>
                    <p className="mt-1 text-brand">{cur.org}</p>
                    {cur.place && <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{cur.place}</p>}
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {cur.points.map((p, j) => (
                    <motion.li key={p} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + j * 0.08 }} className="flex gap-3 text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{p}
                    </motion.li>
                  ))}
                </ul>
                {cur.tech.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{cur.tech.map((t) => <span key={t} className="rounded-full border border-border bg-background/40 px-3 py-1 font-mono text-xs">{t}</span>)}</div>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
