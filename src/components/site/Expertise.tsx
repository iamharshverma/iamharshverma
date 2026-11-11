import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { expertise } from "@/data/profile";
import { Reveal } from "./Reveal";

const lenses = ["All", "Founder lens", "Engineer lens", "Researcher lens", "Speaker lens"] as const;

export function Expertise() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [lens, setLens] = useState<(typeof lenses)[number]>("All");
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive((a) => (a + 1) % expertise.length), 3800);
    return () => clearInterval(t);
  }, [auto]);
  const pick = (i: number) => { setActive(i); setAuto(false); };
  const s = expertise[active]!;
  const dim = (role: string) => lens !== "All" && role !== lens;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="eyebrow">Expertise</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight">A constellation of disciplines.</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">Twelve years connecting research, engineering and the stage. Pick a star, or filter by lens.</p>
        </Reveal>
        <div className="flex flex-wrap gap-2">
          {lenses.map((l) => (
            <button key={l} onClick={() => setLens(l)} className={`rounded-full border px-3 py-1.5 text-xs transition ${lens === l ? "border-brand bg-brand-gradient text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{l.replace(" lens", "")}</button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card/60">
          <div aria-hidden className="absolute inset-0 bg-grid" />
          <motion.div aria-hidden className="absolute rounded-full bg-brand/20 blur-3xl" animate={{ left: `${s.x - 15}%`, top: `${s.y - 15}%` }} transition={{ type: "spring", stiffness: 60 }} style={{ width: "30%", height: "30%" }} />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {expertise.map((a, i) => expertise.slice(i + 1).map((b) => Math.hypot(a.x - b.x, a.y - b.y) < 42 && (
              <line key={a.name + b.name} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--brand)"
                strokeOpacity={a.name === s.name || b.name === s.name ? 0.8 : 0.12} strokeWidth={a.name === s.name || b.name === s.name ? 0.45 : 0.25} />
            )))}
          </svg>
          {expertise.map((e, i) => {
            const on = i === active;
            return (
              <button key={e.name} onClick={() => pick(i)} onMouseEnter={() => pick(i)} aria-pressed={on}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity ${dim(e.role) ? "opacity-25" : "opacity-100"}`} style={{ left: `${e.x}%`, top: `${e.y}%` }}>
                <span className="relative grid place-items-center">
                  {on && <motion.span layoutId="ring" className="absolute h-9 w-9 rounded-full border border-brand" />}
                  <span className={`block rounded-full transition-all ${on ? "h-4 w-4 bg-signal shadow-glow" : "h-2.5 w-2.5 bg-brand"}`} />
                </span>
                <span className={`absolute mt-2 whitespace-nowrap font-mono text-[10px] sm:text-[11px] ${e.x > 75 ? "right-0" : e.x < 25 ? "left-0" : "left-1/2 -translate-x-1/2"} ${on ? "text-foreground" : "text-muted-foreground"}`}>{e.name}</span>
              </button>
            );
          })}
          <button onClick={() => setAuto(!auto)} aria-label={auto ? "Pause tour" : "Play tour"} className="glass absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full text-brand">
            {auto ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </Reveal>

        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div key={s.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
              className="flex-1 rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-brand">// {s.role}</p>
                <p className="font-mono text-xs text-muted-foreground">since {s.since}</p>
              </div>
              <h3 className="mt-3 font-display text-4xl font-bold">{s.name}</h3>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
              <div className="mt-6">
                <div className="flex justify-between text-sm"><span>Depth</span><span className="font-mono text-signal">{s.level}%</span></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><motion.div key={s.name} initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 0.9 }} className="h-full bg-brand-gradient" /></div>
              </div>
              <p className="mt-6 font-mono text-xs text-muted-foreground">PROOF POINTS</p>
              <ul className="mt-2 space-y-2">{s.proof.map((p) => <li key={p} className="flex gap-2 text-sm"><span className="text-signal">▸</span>{p}</li>)}</ul>
              <div className="mt-6 flex flex-wrap gap-2">{s.tools.map((t) => <span key={t} className="rounded-full border border-border px-3 py-1 font-mono text-xs">{t}</span>)}</div>
            </motion.div>
          </AnimatePresence>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {expertise.map((e, i) => (
              <button key={e.name} onClick={() => pick(i)} aria-label={e.name} className={`h-1.5 rounded-full transition ${i === active ? "bg-brand" : "bg-muted hover:bg-muted-foreground/40"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
