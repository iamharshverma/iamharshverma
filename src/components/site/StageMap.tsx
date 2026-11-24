import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Gavel, Globe2, MapPin, Mic, Pause, Play, Users, Presentation, ZoomIn, ZoomOut, RotateCcw, Flag } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button";
import { stages, onlineEvents, type StageEvent } from "@/data/stages";
import { LAND } from "@/data/world-land";

const proj = (lat: number, lng: number) => ({ x: 500 + (lng * 1000) / 360, y: 250 - (lat * 1000) / 360 });
const icon = (k: StageEvent["kind"]) => (k === "Judge" ? Gavel : k === "Mentor" ? Users : k === "Keynote" ? Mic : Presentation);
const ONLINE = -1;

export function StageMap() {
  const [sel, setSel] = useState(0);
  const [auto, setAuto] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!auto || !inView || !visible || reduced) return;
    const timer = setInterval(() => setSel(s => s === ONLINE ? 0 : s + 1 >= stages.length ? ONLINE : s + 1), 6000);
    return () => clearInterval(timer);
  }, [auto, inView, visible, reduced]);
  const choose = (i: number) => { setSel(i); setAuto(false); };
  const cur = sel === ONLINE ? null : stages[sel] ?? stages[0];
  const total = stages.reduce((n, s) => n + s.events.length, 0) + onlineEvents.length;
  const keynoteCount = stages.reduce((n, s) => n + s.events.filter(e => e.kind === "Keynote").length, 0);
  const regions = new Set(stages.map(s => s.region)).size;
  const home = proj(37.77, -122.42);
  const pins = [
    { city: "California", x: home.x, y: home.y, index: 0, active: sel >= 0 && sel <= 2, labelX: -22, labelY: 42 },
    ...stages.flatMap((stage, index) => index < 3 ? [] : [{ city: stage.city, ...proj(stage.lat, stage.lng), index, active: sel === index, labelX: 14, labelY: -14 }]),
  ];
  const stats = [
    { icon: Globe2, value: `${total}+`, label: "engagements" },
    { icon: MapPin, value: `${stages.length}`, label: "cities" },
    { icon: Flag, value: `${regions}`, label: "regions" },
    { icon: Mic, value: `${keynoteCount}`, label: "keynotes" },
  ];

  return (
    <div ref={ref} className="min-w-0">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-primary-foreground shadow-glow"><Globe2 className="h-5 w-5" /></span>
          <div>
            <p className="font-display text-lg font-semibold leading-tight">Global stage map</p>
            <p className="text-xs text-muted-foreground">Follow the tour or pick a city</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {stats.map(s => (
            <span key={s.label} className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs">
              <s.icon className="h-3.5 w-3.5 text-brand" />
              <span className="font-display font-semibold text-foreground">{s.value}</span>
              <span className="text-muted-foreground">{s.label}</span>
            </span>
          ))}
          <Button variant="ghost" size="sm" aria-pressed={auto} disabled={!!reduced} onClick={() => setAuto(a => !a)} className={`rounded-full border ${auto ? "border-brand bg-brand/10 text-brand" : "border-border text-muted-foreground"}`}>{auto ? <Pause /> : <Play />}{auto ? "Pause tour" : "Start tour"}</Button>
        </div>
      </div>
      <div className="grid min-w-0 gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-8">
        <div className="min-w-0">
          <TransformWrapper minScale={1} maxScale={3} wheel={{ disabled: true }} doubleClick={{ disabled: true }} onPanningStart={() => setAuto(false)}>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-transparent">
                <div className="absolute right-3 top-3 z-10 flex gap-1 rounded-full border border-border bg-background/90 p-1 backdrop-blur">
                  <Button size="icon-sm" variant="ghost" aria-label="Zoom in on stage map" title="Zoom in" onClick={() => zoomIn()}><ZoomIn /></Button>
                  <Button size="icon-sm" variant="ghost" aria-label="Zoom out on stage map" title="Zoom out" onClick={() => zoomOut()}><ZoomOut /></Button>
                  <Button size="icon-sm" variant="ghost" aria-label="Reset stage map" title="Reset map" onClick={() => resetTransform()}><RotateCcw /></Button>
                </div>
                <TransformComponent wrapperStyle={{ width: "100%" }} contentStyle={{ width: "100%" }}>
                  <svg viewBox="0 25 1000 410" preserveAspectRatio="xMidYMid meet" className="block h-[260px] w-full sm:h-[360px] lg:h-[390px]" role="group" aria-label="Interactive map of speaking venues">
                    <title>Speaking venues in California, New York and India</title>
                    {[100, 200, 300, 400].map(y => <path key={y} d={`M0 ${y} H1000`} stroke="var(--brand)" strokeOpacity="0.08" />)}
                    <path d={LAND} fill="var(--brand)" fillOpacity="0.16" stroke="var(--brand)" strokeOpacity="0.5" strokeWidth="0.9" />
                    {pins.slice(1).map(pin => (
                      <motion.path key={pin.city} d={`M${home.x},${home.y} Q${(home.x + pin.x) / 2},${Math.min(home.y, pin.y) - Math.abs(pin.x - home.x) * 0.18} ${pin.x},${pin.y}`} fill="none" stroke={pin.active ? "var(--signal)" : "var(--brand)"} strokeWidth={pin.active ? 2.8 : 1.8} strokeOpacity={sel === ONLINE ? 0.3 : 0.75} strokeDasharray="7 5"
                        animate={pin.active && !reduced && inView && visible ? { strokeDashoffset: [0, -48] } : { strokeDashoffset: 0 }}
                        transition={pin.active ? { duration: 2.4, repeat: Infinity, ease: "linear" } : { duration: 0.3 }} />
                    ))}
                    {pins.map(pin => (
                      <g key={pin.city} transform={`translate(${pin.x},${pin.y})`} role="button" tabIndex={0} aria-label={`Select ${pin.city} speaking venues`} aria-pressed={pin.active} onClick={() => choose(pin.index)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(pin.index); } }} className="cursor-pointer outline-none focus-visible:stroke-foreground">
                        <title>{pin.city}</title>
                        {pin.active && <motion.circle r="18" fill="var(--signal)" fillOpacity="0.2" animate={!reduced && inView && visible ? { r: [12, 25, 12], opacity: [0.45, 0.1, 0.45] } : { r: 18, opacity: 0.3 }} transition={{ duration: 3, repeat: Infinity }} />}
                        <circle r="20" fill="transparent" />
                        <circle r={pin.active ? 8 : 6} fill={pin.active ? "var(--signal)" : "var(--brand)"} stroke="var(--background)" strokeWidth="3" />
                        <text x={pin.labelX} y={pin.labelY} fontSize="20" fontWeight="600" fill="var(--foreground)" stroke="var(--background)" strokeWidth="5" paintOrder="stroke" className="font-display">{pin.city}</text>
                      </g>
                    ))}
                  </svg>
                </TransformComponent>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-background/60 px-4 py-3 text-xs text-muted-foreground backdrop-blur">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-signal" /><span className="font-medium text-foreground">{cur ? `${cur.city}, ${cur.region}` : "Online & global"}</span></span>
                  <span>California · New York · India</span>
                </div>
              </div>
            )}
          </TransformWrapper>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Speaking locations">
            {stages.map((s, i) => (
              <Button key={s.city} variant="ghost" aria-pressed={sel === i} onClick={() => choose(i)} className={`h-11 min-w-0 justify-between rounded-xl border px-3 transition-all ${sel === i ? "border-brand bg-brand/10 text-foreground shadow-glow underline decoration-brand decoration-2 underline-offset-8" : "border-border text-muted-foreground hover:border-brand/50 hover:text-foreground"}`}>
                <span className="flex min-w-0 items-center gap-1.5"><MapPin className="shrink-0 text-brand" /><span className="truncate text-xs">{s.city}</span></span>
                <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${sel === i ? "bg-brand text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s.events.length}</span>
              </Button>
            ))}
            <Button variant="ghost" aria-pressed={sel === ONLINE} onClick={() => choose(ONLINE)} className={`h-11 justify-between rounded-xl border px-3 transition-all ${sel === ONLINE ? "border-brand bg-brand/10 text-foreground shadow-glow underline decoration-brand decoration-2 underline-offset-8" : "border-border text-muted-foreground hover:border-brand/50 hover:text-foreground"}`}>
              <span className="flex items-center gap-1.5 text-xs"><Globe2 className="text-brand" />Online & global</span>
              <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${sel === ONLINE ? "bg-brand text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{onlineEvents.length}</span>
            </Button>
          </div>
        </div>
        <div className="min-w-0 rounded-2xl border border-border bg-card/60 p-5 lg:p-6">
          <div className="mb-5 border-b border-border pb-5">
            <p className="flex items-center gap-2 text-sm font-medium text-brand">{cur ? <MapPin className="h-4 w-4" /> : <Globe2 className="h-4 w-4" />}{cur ? cur.region : "Virtual & international"}</p>
            <h3 className="mt-2 font-display text-3xl font-bold">{cur?.city ?? "Online & global"}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{cur ? cur.events.length : onlineEvents.length} {(cur ? cur.events.length : onlineEvents.length) === 1 ? "engagement" : "engagements"}</p>
          </div>
          <div className="max-h-[380px] overflow-y-auto pr-2 lg:max-h-[400px]" tabIndex={0} role="region" aria-label={`${cur?.city ?? "Online"} engagements`}>
            <ul className="space-y-3">
              {cur ? cur.events.map(e => { const I = icon(e.kind); return (
                <li key={e.title} className="group flex gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-glow">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-primary-foreground"><I className="h-4 w-4" /></span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-relaxed">{e.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{e.kind}</span>
                      {e.href && <a href={e.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-brand underline-offset-4 hover:underline">Watch talk<ArrowUpRight className="h-3 w-3" /></a>}
                    </div>
                  </div>
                </li>
              ); }) : onlineEvents.map(e => (
                <li key={e} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-glow"><Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
