import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { stages } from "@/data/stages";

// Zoomed blueprint of Northern California (lng -123.2..-120.6, lat 37.3..39.1)
const B = { x0: -123.2, x1: -120.6, y0: 39.1, y1: 37.3 };
const pos = (lat: number, lng: number) => ({ left: `${((lng - B.x0) / (B.x1 - B.x0)) * 100}%`, top: `${((lat - B.y0) / (B.y1 - B.y0)) * 100}%` });

export function StageMap() {
  const [sel, setSel] = useState(0);
  const cur = stages[sel] ?? stages[0]!;
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />
        <p className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Bay Area · stage map</p>
        {stages.map((s, i) => (
          <button key={s.city} onClick={() => setSel(i)} style={pos(s.lat, s.lng)} aria-label={s.city} className="absolute -translate-x-1/2 -translate-y-1/2">
            <span className={`absolute inset-0 -m-3 rounded-full bg-brand/30 ${i === sel ? "animate-ping" : ""}`} />
            <span className={`relative grid h-5 w-5 place-items-center rounded-full ${i === sel ? "bg-brand-gradient shadow-glow" : "bg-brand/60"}`}><span className="h-1.5 w-1.5 rounded-full bg-background" /></span>
            <span className="absolute left-6 top-0 whitespace-nowrap font-mono text-[11px] text-foreground">{s.city.split(",")[0]}</span>
          </button>
        ))}
      </div>
      <motion.div key={cur.city} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6">
        <p className="flex items-center gap-2 font-mono text-xs text-signal"><MapPin className="h-3.5 w-3.5" />{cur.city}</p>
        <ul className="mt-4 space-y-3">{cur.events.map((e) => <li key={e} className="font-display text-lg leading-snug">{e}</li>)}</ul>
        <p className="mt-6 text-sm text-muted-foreground">Plus podcasts, virtual keynotes and masterclasses reaching audiences worldwide.</p>
      </motion.div>
    </div>
  );
}
