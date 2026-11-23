import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, GitCompareArrows, Radar, X } from "lucide-react";
import { ZoomableDiagram } from "./ZoomableDiagram";
import { Button } from "@/components/ui/button";
import { KnowledgeLink } from "@/components/site/KnowledgeCards";
import { radarEntries, getImpactTopic, type RadarRing } from "@/data/knowledge-impact";
import { radarSectors } from "@/data/radar-sectors";
import { RadarSectorContent } from "./RadarSectorContent";
import { RadarOverview } from "./RadarOverview";
import { radarMarkerState, radarSweepDelay } from "./radar-selection";
import { LogoMark } from "@/components/site/Logo";

const rings: RadarRing[] = ["ADOPT", "EXPERIMENT", "ASSESS", "WATCH", "UNASSESSED"];
const sectors = [...new Set(radarEntries.map((r) => r.sector))];
export default function EngineeringRadar({
  topic,
  onTopic,
  onGraph,
}: {
  topic: string;
  onTopic: (id: string) => void;
  onGraph: () => void;
}) {
  const [sector, setSector] = useState("");
  const [sectorOverview, setSectorOverview] = useState(false);
  const [selected, setSelected] = useState("");
  const [resetVersion, setResetVersion] = useState(0);
  const [motionActive, setMotionActive] = useState(false);
  const radarRef = useRef<HTMLDivElement>(null);
  const inspectorRef = useRef<HTMLElement>(null);
  const arc = sectorOverview ? radarSectors.find((item) => item.title === sector) : undefined;
  const openSector = (title: string) => {
    setSector(title);
    setSelected("");
    setSectorOverview(Boolean(title));
    if (title && window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => inspectorRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }));
    }
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const element = radarRef.current;
    if (!element) return;
    let visible = false;
    const update = () => setMotionActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = Boolean(entry?.isIntersecting); update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  const reset = () => { openSector(""); setCompare([]); setResetVersion(value => value + 1); };
  const [compare, setCompare] = useState<string[]>([]);
  const list = useMemo(
    () => radarEntries.filter((r) => !sector || r.sector === sector),
    [sector],
  );
  const active = radarEntries.find((r) => r.id === selected);
  const activeId = arc ? "" : active?.id ?? "";
  const select = (id: string) => {
    setSectorOverview(false);
    setSelected(id);
    const r = radarEntries.find((e) => e.id === id);
    if (r) setSector(r.sector);
    if (r && !r.relatedTopics.includes(topic)) onTopic(r.topic);
  };
  return (
    <div ref={radarRef} data-motion-active={motionActive} className="impact-radar p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="impact-kicker">01 / Foresight</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">
            AI Engineering Radar.
          </h2>
        </div>
        <Radar className="size-8 text-brand" />
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Technologies and patterns connected to the portfolio’s technical perspectives. All entries
        are unassessed until a documented adoption position is published; no scores, review dates or
        historical movement are invented.
      </p>
      {mounted && (
        <div className="impact-toolbar mt-6 px-0">
          <select
            aria-label="Radar sector"
            className="impact-input sm:max-w-48"
            value={sector}
            onChange={(e) => openSector(e.target.value)}
          >
            <option value="">All sectors</option>
            {sectors.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {sector && <Button variant="ghost" size="sm" onClick={() => openSector("")}><X />Clear filters</Button>}
        </div>
      )}
      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <ZoomableDiagram key={resetVersion} label="engineering radar">
          <svg
            viewBox="0 0 660 660"
            className="w-full"
            role="group"
            aria-label="Five-sector radar; technologies in the unassessed outer band"
          >
            <defs>
              <radialGradient id="impact-radar-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--impact-accent)" stopOpacity="0.14" />
                <stop offset="55%" stopColor="var(--impact-accent)" stopOpacity="0.05" />
                <stop offset="100%" stopColor="var(--impact-accent)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="impact-radar-sweep-fill" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--impact-accent)" stopOpacity="0" />
                <stop offset="100%" stopColor="var(--impact-accent)" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <circle cx="330" cy="330" r="303" fill="url(#impact-radar-glow)" aria-hidden="true" />
            {sectors.map((s, i) => {
              const start = (i * Math.PI * 2) / 5 - Math.PI / 2;
              const end = ((i + 1) * Math.PI * 2) / 5 - Math.PI / 2;
              return (
                <path
                  key={s}
                  role="button" tabIndex={0} aria-label={`Open radar topic ${s}`} aria-pressed={sector === s}
                  onClick={() => openSector(s)}
                  onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openSector(s); } }}
                  className={`impact-radar-wedge impact-sector-${i} impact-tone-${i} ${sector === s ? "is-selected" : sector ? "is-faded" : ""}`}
                  d={`M 330 330 L ${330 + Math.cos(start) * 303} ${330 + Math.sin(start) * 303} A 303 303 0 0 1 ${330 + Math.cos(end) * 303} ${330 + Math.sin(end) * 303} Z`}
                />
              );
            })}
            {[90, 145, 200, 255, 303].map((radius, i) => (
              <g key={radius}>
                <circle
                  cx="330"
                  cy="330"
                  r={radius}
                  className={`impact-radar-ring ${i === 4 ? "unassessed" : ""}`}
                />
                <text x="340" y={330 - radius + 17} className="impact-svg-label">
                  {rings[i]}
                </text>
              </g>
            ))}
            {sectors.map((s, i) => {
              const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
              return (
                <g key={s}>
                  <line
                    x1="330"
                    y1="330"
                    x2={330 + Math.cos(a) * 303}
                    y2={330 + Math.sin(a) * 303}
                    className="impact-radar-spoke"
                  />
                  <text
                    x={330 + Math.cos(a + 0.5) * 170}
                    y={330 + Math.sin(a + 0.5) * 170}
                    textAnchor="middle"
                    className={`impact-radar-sector impact-tone-${i} ${sector === s ? "is-selected" : ""}`} onClick={() => openSector(s)}
                  >
                    {s}
                  </text>
                </g>
              );
            })}
            <g className="impact-radar-sweep" aria-hidden="true"><path d="M 330 330 L 330 27 A 303 303 0 0 1 508 85 Z" fill="url(#impact-radar-sweep-fill)" /></g>
            <g className={`impact-radar-home ${!sector && !selected ? "is-overview" : ""}`} role="button" tabIndex={0} aria-label="HV logo — reset radar overview" onClick={reset} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); reset(); } }}>
              <title>HV — All topics</title>
              <circle cx="330" cy="330" r="43" className="impact-radar-core-halo" />
              <circle cx="330" cy="330" r="34" className="impact-radar-core" />
              <svg x="306" y="306" width="48" height="48" viewBox="0 0 48 48"><LogoMark className="h-full w-full" /></svg>
            </g>
            {radarEntries.map((r) => {
              const marker = radarMarkerState(sector, selected, r);
              const s = sectors.indexOf(r.sector);
              const group = radarEntries.filter((e) => e.sector === r.sector);
              const i = group.indexOf(r);
              const a = ((s + (i + 1) / (group.length + 1)) * Math.PI * 2) / 5 - Math.PI / 2;
              const x = 330 + Math.cos(a) * 282;
              const y = 330 + Math.sin(a) * 282;
              return (
                <g
                  key={r.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect ${r.title}`}
                  onClick={() => select(r.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select(r.id);
                    }
                  }}
                  style={{ ["--marker-i" as string]: radarEntries.indexOf(r) }} className={`impact-radar-marker impact-tone-${s} ${sector && !marker.focused ? "is-dim" : ""} ${marker.blinking ? "is-blinking" : ""} ${marker.active ? "is-active" : ""}`}
                >
                  <title>{`${r.title} · Unassessed`}</title>
                  <g transform={`translate(${x} ${y})`}>
                  <g className="impact-radar-lit-node" style={{ ["--sweep-delay" as string]: `${radarSweepDelay(a)}s` }}>
                  {marker.blinking && <circle className="impact-radar-ping" cx="0" cy="0" r={marker.radius + 2} />}
                  <circle className="impact-radar-dot" cx="0" cy="0" r={marker.radius} />
                  <text x="0" y="3" textAnchor="middle">
                    {radarEntries.indexOf(r) + 1}
                  </text>
                  </g>
                  </g>
                </g>
              );
            })}
          </svg>
          </ZoomableDiagram>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="font-mono text-xs text-muted-foreground" role="status">
              {list.length} technologies
            </span>
            <span className="text-xs text-muted-foreground">○ Unassessed</span>
          </div>
          <div
            className="mt-3 grid gap-1 sm:grid-cols-2 max-h-72 overflow-y-auto"
            aria-label="Radar technologies"
          >
            {list.map((r) => (
              <Button
                key={r.id}
                variant={r.id === activeId ? "secondary" : "ghost"}
                className={`h-auto min-h-10 justify-start whitespace-normal text-left text-xs ${r.id === activeId ? "is-active-tech" : ""}`}
                onClick={() => select(r.id)}
              >
                <span className="font-mono text-stat-number">
                  {String(radarEntries.indexOf(r) + 1).padStart(2, "0")}
                </span>
                {r.title}
              </Button>
            ))}
          </div>
          {!list.length && (
            <div className="py-8">
              <h3 className="font-display font-semibold">No matching technologies.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Clear filters to explore unassessed entries.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                size="sm"
                onClick={() => setSector("")}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
        <aside ref={inspectorRef} aria-label="Radar details" className="impact-radar-inspector min-w-0 scroll-mt-24 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          {arc && <div key={arc.id} className="impact-radar-panel">
            <p className="impact-kicker">Radar topic</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">{arc.title}</h3>
            <Button asChild variant="outline" size="sm" className="radar-topic-action my-5">
              <Link to="/radar/topics/$slug" params={{ slug: arc.id }}>Open topic page<ArrowRight /></Link>
            </Button>
            <RadarSectorContent sector={arc} />
          </div>}
          {!arc && !active && <RadarOverview />}
          {!arc && active && (
            <div key={active.id} className="impact-radar-panel">
              {sector && <Button variant="ghost" size="sm" className="mb-4 px-0 text-brand" onClick={() => openSector(sector)}>Back to {sector}</Button>}
              <p className="impact-kicker">{active.sector}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">{active.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {active.rationale}
              </p>
              {(
                [
                  ["Engineering implication", active.implication],
                  ["Security consideration", active.security],
                  ["Opportunity", active.opportunity],
                  ["Challenge", active.challenge],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="mt-5">
                  <h4 className="text-sm font-semibold">{label}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value}</p>
                </div>
              ))}
              <Button asChild variant="outline" size="sm" className="mt-6">
                <Link to="/radar/$slug" params={{ slug: active.id }}>
                  Open technology page
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="mt-6 ml-2"
                disabled={compare.length >= 2 && !compare.includes(active.id)}
                onClick={() =>
                  setCompare((ids) =>
                    ids.includes(active.id)
                      ? ids.filter((id) => id !== active.id)
                      : [...ids, active.id],
                  )
                }
              >
                <GitCompareArrows />
                {compare.includes(active.id) ? "Remove comparison" : "Compare technology"}
              </Button>
              <div className="mt-6 border-t border-border pt-5">
                <p className="impact-kicker">Related perspective</p>
                {getImpactTopic(active.topic)
                  ?.resources.slice(0, 3)
                  .map((r) => (
                    <KnowledgeLink
                      key={r.id}
                      item={r}
                      className="mt-3 block text-sm font-semibold hover:text-brand"
                    >
                      {r.title} ↗
                    </KnowledgeLink>
                  ))}
                <Button variant="link" size="sm" className="mt-3 px-0" onClick={onGraph}>
                  Explore in the research graph
                  <ArrowRight />
                </Button>
              </div>
            </div>
          )}
        </aside>
      </div>
      {compare.length > 0 && (
        <section className="mt-8 border-t border-border pt-6" aria-label="Technology comparison">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">Compare perspectives</h3>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Clear comparison"
              title="Clear comparison"
              onClick={() => setCompare([])}
            >
              <X />
            </Button>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {compare.map((id) => {
              const r = radarEntries.find((e) => e.id === id);
              return r ? (
                <div key={id} className="border-l-2 border-brand pl-4">
                  <div className="flex items-start justify-between gap-2"><h4 className="font-semibold">{r.title}</h4><Button variant="ghost" size="icon-xs" title={`Remove ${r.title} from comparison`} aria-label={`Remove ${r.title} from comparison`} onClick={() => setCompare(ids => ids.filter(value => value !== id))}><X /></Button></div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {r.sector} · {r.ring}
                  </p>
                  {([["Engineering", r.implication], ["Security", r.security], ["Opportunity", r.opportunity], ["Challenge", r.challenge]] as const).map(([label, value]) => <div key={label} className="mt-4 border-t border-border pt-3"><p className="impact-kicker">{label}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value}</p></div>)}
                </div>
              ) : null;
            })}
            {compare.length === 1 && (
              <p className="text-sm text-muted-foreground">
                Select a second technology to compare engineering and security considerations.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
