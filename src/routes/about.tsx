import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { profile, experience, education, memberships, portraitGallery } from "@/data/profile";
import { Reveal, PageHero } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    links: canonical("/about").links,
    meta: [
      canonical("/about").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About Harsh Verma — AI Engineer, Founder & Stanford Alumnus" },
      { name: "description", content: "Biography, career timeline at Palo Alto Networks, education at Stanford GSB and UT Dallas, and fellowships of Harsh Verma." },
      { property: "og:title", content: "About Harsh Verma" },
      { property: "og:description", content: "Researcher by passion, entrepreneur at heart." },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "ProfilePage",
      url: "https://www.iamharshverma.com/about",
      mainEntity: { "@id": "https://www.iamharshverma.com/#person" },
    }) }],
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

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
function span(s: Stop): [number, number] {
  const parts = s.period.split("—").map((p) => p.trim().toLowerCase());
  const conv = (p: string | undefined, end: boolean) => {
    if (!p || p.startsWith("present")) return new Date().getFullYear() + new Date().getMonth() / 12;
    const y = parseInt(p.match(/\d{4}/)?.[0] ?? "0"); const m = MONTHS.findIndex((x) => p.startsWith(x));
    return y + (m >= 0 ? m / 12 : end ? 0.9 : 0);
  };
  return [conv(parts[0], false), conv(parts[1], true)];
}
function duration(s: Stop) {
  const [a, b] = span(s); const mo = Math.max(1, Math.round((b - a) * 12));
  return mo >= 12 ? `${Math.round(mo / 12 * 10) / 10} yrs` : `${mo} mo`;
}

function Journey() {
  const [filter, setFilter] = useState<"work" | "edu">("work");
  const list = stops.filter((s) => s.kind === filter);
  const pick = (s: Stop) => { const l = stops.filter((x) => x.kind === s.kind); setFilter(s.kind as "work" | "edu"); setSel(l.indexOf(s)); };
  const [sel, setSel] = useState(0);
  const cur = list[Math.min(sel, list.length - 1)];
  const min = Math.min(...stops.map((s) => span(s)[0])), max = new Date().getFullYear() + 1;
  const idx = list.indexOf(cur as Stop);
  const go = (d: number) => setSel((idx + d + list.length) % list.length);
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal><p className="eyebrow">Journey</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">From code to boardroom</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">Pick a milestone to explore the work, the place and the tools behind it.</p></Reveal>
        <div className="flex rounded-full border border-border bg-card p-1 shadow-sm">
          {([["work", "Experience", Briefcase], ["edu", "Education", GraduationCap]] as const).map(([k, l, I]) => (
            <button key={k} onClick={() => { setFilter(k); setSel(0); }} className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${filter === k ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {filter === k && <motion.span layoutId="journey-tab" className="absolute inset-0 rounded-full bg-brand-gradient shadow-glow" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <I className="relative h-4 w-4" /><span className="relative">{l}</span>
              <span className={`relative rounded-full px-1.5 font-mono text-[10px] ${filter === k ? "bg-background/25" : "bg-muted"}`}>{stops.filter((x) => x.kind === k).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 hidden rounded-2xl border border-border bg-card p-5 md:block">
        {(["work", "edu"] as const).map((k) => (
          <div key={k} className={`flex items-center gap-4 py-2 transition-opacity ${filter === k ? "opacity-100" : "opacity-50 hover:opacity-80"}`}>
            <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{k === "work" ? "Industry" : "Academia"}</span>
            <div className="relative h-9 flex-1 rounded-lg bg-muted/60">
              {stops.map((s) => {
                if (s.kind !== k) return null;
                const [st, en] = span(s);
                const active = s === cur;
                return (
                  <button key={s.org + s.title} onClick={() => pick(s)} title={`${s.org} · ${s.period}`}
                    style={{ left: `${((st - min) / (max - min)) * 100}%`, width: `${Math.max(((en - st) / (max - min)) * 100, 2.5)}%` }}
                    className={`absolute inset-y-1 overflow-hidden rounded-md px-2 text-left text-[11px] font-medium whitespace-nowrap transition ${active ? "bg-brand-gradient text-primary-foreground shadow-glow" : "bg-brand/15 text-foreground hover:bg-brand/30"}`}>
                    {s.org}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <div className="relative ml-28 h-4 font-mono text-[10px] text-muted-foreground">
          {Array.from({ length: Math.floor((max - min) / 3) + 1 }, (_, i) => Math.ceil(min) + i * 3).filter((y) => y < max).map((y) => <span key={y} className="absolute -translate-x-1/2" style={{ left: `${((y - min) / (max - min)) * 100}%` }}>{y}</span>)}
        </div>
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
                    <span className="block font-display text-base font-semibold leading-snug md:text-lg">{s.org}</span></span>
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
                    <p className="font-mono text-xs text-signal">{String(idx + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")} · {cur.kind === "work" ? "Experience" : "Education"} · {cur.period} · {duration(cur)}</p>
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
                <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  <button onClick={() => go(-1)} className="rounded-full border border-border px-4 py-1.5 text-sm transition hover:border-brand hover:text-brand">← Previous</button>
                  <div className="flex gap-1.5">{list.map((_, j) => <button key={j} onClick={() => setSel(j)} aria-label={`Milestone ${j + 1}`} className={`h-1.5 rounded-full transition-all ${j === idx ? "w-6 bg-brand" : "w-1.5 bg-muted-foreground/40"}`} />)}</div>
                  <button onClick={() => go(1)} className="rounded-full border border-border px-4 py-1.5 text-sm transition hover:border-brand hover:text-brand">Next →</button>
                </div>
                {cur.tech.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{cur.tech.map((t) => <span key={t} className="rounded-full border border-border bg-background/40 px-3 py-1 font-mono text-xs">{t}</span>)}</div>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
