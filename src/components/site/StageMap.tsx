import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Gavel, Globe2, MapPin, Mic, Pause, Play, Users, Presentation } from "lucide-react";
import { stages, onlineEvents, type StageEvent } from "@/data/stages";
import { LAND } from "@/data/world-land";

const proj = (lat: number, lng: number) => ({ x: 500 + (lng * 1000) / 360, y: 250 - (lat * 1000) / 360 });
// Crop to populated latitudes (~75N to ~-55S)
const VB = { x: 20, y: 45, w: 940, h: 300 };
const icon = (k: StageEvent["kind"]) => (k === "Judge" ? Gavel : k === "Mentor" ? Users : k === "Keynote" ? Mic : Presentation);
const ONLINE = -1;

export function StageMap() {
  const [sel, setSel] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => { if (!auto) return; const t = setInterval(() => setSel((s) => (s + 1 >= stages.length ? ONLINE : s === ONLINE ? 0 : s + 1)), 4000); return () => clearInterval(t); }, [auto]);
  const choose = (i: number) => { setSel(i); setAuto(false); };
  const cur = sel === ONLINE ? null : stages[sel] ?? stages[0]!;
  const total = stages.reduce((n, s) => n + s.events.length, 0) + onlineEvents.length;
  const home = proj(37.77, -122.42);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-glow">
        <div className="flex items-center justify-between px-5 pt-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Global stage map · {total}+ engagements</p>
          <button onClick={() => setAuto((a) => !a)} className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-brand hover:text-brand">
            {auto ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}{auto ? "Touring" : "Tour"}
          </button>
        </div>
        <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} className="block w-full" role="img" aria-label="World map of speaking venues">
          <defs>
            <linearGradient id="sm-arc" x1="0" x2="1"><stop offset="0" stopColor="var(--brand)" /><stop offset="1" stopColor="var(--signal)" /></linearGradient>
            <pattern id="sm-dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.1" fill="var(--brand)" opacity="0.45" /></pattern>
          </defs>
          <path d={LAND} fill="url(#sm-dots)" />
          <path d={LAND} fill="none" stroke="var(--brand)" strokeOpacity="0.15" strokeWidth="0.6" />
          {stages.map((s, i) => {
            const p = proj(s.lat, s.lng);
            if (Math.hypot(p.x - home.x, p.y - home.y) < 5) return null;
            const mx = (home.x + p.x) / 2, my = Math.min(home.y, p.y) - Math.abs(p.x - home.x) * 0.22;
            return <motion.path key={s.city} d={`M${home.x},${home.y} Q${mx},${my} ${p.x},${p.y}`} fill="none" stroke="url(#sm-arc)" strokeWidth={sel === i ? 2 : 1} strokeOpacity={sel === i ? 1 : 0.5} strokeDasharray="5 4"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: i * 0.2 }} />;
          })}
          {stages.map((s, i) => {
            const p = proj(s.lat, s.lng); const active = i === sel; const bay = ["San Francisco", "Berkeley", "Sacramento"].includes(s.city);
            const off = s.city === "Berkeley" ? { x: 3, y: -2 } : s.city === "Sacramento" ? { x: 5, y: -6 } : { x: 0, y: 0 };
            return (
              <g key={s.city} transform={`translate(${p.x + off.x},${p.y + off.y})`} onClick={() => choose(i)} className="cursor-pointer">
                <title>{`${s.city} · ${s.events.length} events`}</title>
                {active && <motion.circle fill="var(--brand)" initial={{ r: 4, opacity: 0.6 }} animate={{ r: 20, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity }} />}
                <circle r={active ? 5.5 : 3.5 + Math.min(s.events.length, 6) * 0.3} fill={active ? "var(--brand)" : "var(--card)"} stroke="var(--brand)" strokeWidth="1.6" />
                {(active || !bay) && <text x="8" y="3" fontSize="11" className="fill-foreground font-mono">{s.city}</text>}
              </g>
            );
          })}
        </svg>
        <div className="flex gap-2 overflow-x-auto border-t border-border p-3">
          {stages.map((s, i) => (
            <button key={s.city} onClick={() => choose(i)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs transition ${i === sel ? "bg-brand-gradient text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>
              {s.city}<span className={`rounded-full px-1.5 font-mono text-[10px] ${i === sel ? "bg-background/25" : "bg-muted"}`}>{s.events.length}</span>
            </button>
          ))}
          <button onClick={() => choose(ONLINE)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs transition ${sel === ONLINE ? "bg-brand-gradient text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>
            <Globe2 className="h-3 w-3" />Online & global<span className={`rounded-full px-1.5 font-mono text-[10px] ${sel === ONLINE ? "bg-background/25" : "bg-muted"}`}>{onlineEvents.length}</span>
          </button>
        </div>
      </div>

      <div className="relative max-h-[480px] overflow-y-auto rounded-3xl border border-border bg-card p-7">
        <AnimatePresence mode="wait">
          <motion.div key={cur?.city ?? "online"} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <p className="flex items-center gap-2 font-mono text-xs text-signal">{cur ? <MapPin className="h-3.5 w-3.5" /> : <Globe2 className="h-3.5 w-3.5" />}{cur ? `${cur.city}, ${cur.region}` : "Virtual & international"}</p>
            <h3 className="mt-2 font-display text-3xl font-bold">{cur ? `${cur.events.length} ${cur.events.length === 1 ? "engagement" : "engagements"}` : "Reaching audiences worldwide"}</h3>
            <ul className="mt-5 space-y-3">
              {cur ? cur.events.map((e, j) => { const I = icon(e.kind); return (
                <motion.li key={e.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.05 }} className="flex gap-3 rounded-xl border border-border bg-background/40 p-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand"><I className="h-4 w-4" /></span>
                  <span className="min-w-0"><span className="block text-sm font-medium leading-snug">{e.title}</span><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{e.kind}</span>
                    {e.href && <a href={e.href} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-0.5 text-xs text-brand">Watch<ArrowUpRight className="h-3 w-3" /></a>}</span>
                </motion.li>); })
              : onlineEvents.map((e, j) => (
                <motion.li key={e} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.04 }} className="flex gap-3 text-sm"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{e}</motion.li>))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
