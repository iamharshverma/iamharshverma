import { useState } from "react";
import { MapPin, Globe2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stages, onlineEvents, type StageEvent } from "@/data/stages";
import { LAND } from "@/data/world-land";

const project = (lat: number, lng: number) => ({ x: 500 + lng * 1000 / 360, y: 250 - lat * 1000 / 360 });
const kinds: StageEvent["kind"][] = ["Keynote", "Panel", "Judge", "Mentor", "Chair"];

export function SpeakerEvents() {
  const [city, setCity] = useState<string>(stages[0]?.city ?? "Online & global");
  const selected = stages.find(s => s.city === city);
  const [graphMode, setGraphMode] = useState<"city" | "format">("city");
  const plotted = stages.map(s => ({ ...s, ...project(s.lat, s.lng) }));
  const bars = graphMode === "city"
    ? stages.map(s => ({ label: s.city, value: s.events.length }))
    : kinds.map(kind => ({ label: kind, value: stages.reduce((sum, s) => sum + s.events.filter(e => e.kind === kind).length, 0) }));
  const max = Math.max(1, ...bars.map(b => b.value));
  const listed = stages.reduce((sum, s) => sum + s.events.length, 0);
  return (
    <div className="mt-8 space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4"><h3 className="font-display text-xl font-semibold">Event Atlas</h3><p className="font-mono text-xs text-muted-foreground"><span className="text-stat-number">{stages.length}</span> cities · <span className="text-stat-number">{listed}</span> listed engagements</p></div>
          <svg viewBox="20 40 950 335" className="mt-5 block w-full" role="img" aria-label="World map showing listed events in San Francisco, Berkeley, Sacramento, New York and Dehradun">
            <path d={LAND} fill="var(--muted)" stroke="var(--border)" strokeWidth="1" />
            {plotted.map(s => {
              const active = s.city === city;
              const offset = s.city === "Berkeley" ? -8 : s.city === "Sacramento" ? -17 : 0;
              return <g key={s.city}>
                <circle cx={s.x} cy={s.y} r={active ? 14 : 9} fill="var(--brand)" opacity={active ? 0.25 : 0.12} />
                <circle cx={s.x + (offset ? 10 : 0)} cy={s.y + offset} r={active ? 5 : 3.5} fill={active ? "var(--stat-number)" : "var(--brand)"} stroke="var(--background)" strokeWidth="1.5" aria-label={`${s.city}: ${s.events.length} listed events`} />
                {(!["Berkeley", "Sacramento"].includes(s.city)) && <text x={s.x + 12} y={s.y + 4} className="fill-foreground font-mono" fontSize="12">{s.city === "San Francisco" ? "SF Bay Area" : s.city}</text>}
              </g>;
            })}
          </svg>
          <div role="group" aria-label="Choose event city" className="flex flex-wrap gap-2 border-t border-border pt-4">
            {stages.map(s => <Button key={s.city} size="sm" variant={city === s.city ? "secondary" : "outline"} aria-pressed={city === s.city} onClick={() => setCity(s.city)}>{s.city}<span className="text-stat-number">{s.events.length}</span></Button>)}
            <Button size="sm" variant={selected ? "outline" : "secondary"} aria-pressed={!selected} onClick={() => setCity("Online & global")}><Globe2 className="size-3" />Online & global<span className="text-stat-number">{onlineEvents.length}</span></Button>
          </div>
        </div>
        <section aria-label="Selected city events" className="min-w-0 border-l-2 border-brand pl-5">
          <p className="flex items-center gap-2 font-mono text-xs text-brand">{selected ? <MapPin className="size-4" /> : <Globe2 className="size-4" />}{selected?.region ?? "Virtual & international"}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold">{city}</h3>
          <ul className="mt-5 max-h-96 space-y-5 overflow-y-auto pr-3">
            {selected ? selected.events.map(e => <li key={e.title}><p className="mb-1 font-mono text-xs text-muted-foreground">{e.kind}</p>{e.href ? <a href={e.href} target="_blank" rel="noreferrer" className="text-sm leading-relaxed hover:text-brand">{e.title}<ArrowUpRight className="ml-1 inline size-3" /></a> : <p className="text-sm leading-relaxed">{e.title}</p>}</li>) : onlineEvents.map(e => <li key={e} className="text-sm leading-relaxed">{e}</li>)}
          </ul>
        </section>
      </div>
      <section aria-labelledby="event-graph-heading" className="border-t border-border pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><h3 id="event-graph-heading" className="font-display text-xl font-semibold">Engagements at a Glance</h3><p className="mt-2 text-sm text-muted-foreground">Counts from the listed city records—not lifetime speaking totals.</p></div><div role="group" aria-label="Event graph view" className="flex gap-1"><Button size="sm" variant={graphMode === "city" ? "secondary" : "ghost"} aria-pressed={graphMode === "city"} onClick={() => setGraphMode("city")}>By city</Button><Button size="sm" variant={graphMode === "format" ? "secondary" : "ghost"} aria-pressed={graphMode === "format"} onClick={() => setGraphMode("format")}>By format</Button></div></div>
        <div className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2" role="img" aria-label={`Listed events by ${graphMode}: ${bars.map(b => `${b.label} ${b.value}`).join(", ")}`}>
          {bars.map((b, i) => <div key={b.label}><div className="mb-2 flex justify-between gap-4 text-sm"><span>{b.label}</span><span className="font-mono text-stat-number">{b.value}</span></div><svg viewBox="0 0 100 3" className="h-3 w-full" preserveAspectRatio="none" aria-hidden="true"><rect width="100" height="3" fill="var(--muted)" /><rect width={b.value / max * 100} height="3" fill={i % 2 ? "var(--signal)" : "var(--brand)"} /></svg></div>)}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Online & global entries are listed separately because their venue locations and event formats are not consistently specified.</p>
      </section>
    </div>
  );
}