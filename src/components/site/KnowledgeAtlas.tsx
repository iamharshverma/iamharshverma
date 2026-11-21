import { useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ChevronRight, Layers, ZoomIn, ZoomOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KnowledgeLink } from "./KnowledgeCards";
import { LogoMark } from "./Logo";
import { useExplorerFullscreen, ExplorerFullscreenButton } from "./ExplorerFullscreen";
import { knowledge, type KnowledgeItem } from "@/data/knowledge";
import { networkTopics, networkResources, groupKnowledge, connectedWork } from "@/data/knowledge-network";

/** Drill-down path: topic (L2) -> content kind (L3) -> entry (L4) -> entry detail (L5). */
export type AtlasPath = { view?: "topic" | "category" | undefined; paper?: string | undefined; topic?: string | undefined; kind?: string | undefined; id?: string | undefined; deep?: boolean | undefined };
type Satellite = { key: string; label: string; meta: string; color: string; go: AtlasPath; item?: KnowledgeItem; weight?: number };

const kindColor: Record<string, number> = { Article: 0, Research: 1, Keynote: 2, Book: 3, Media: 4, Publication: 5, Patent: 6, "Case study": 7, Project: 1, Download: 3, Resource: 4 };
const topicTone = (id: string) => `var(--atlas-t${networkTopics.find(t => t.id === id)?.tone ?? 6})`;
const kindTone = (kind: string) => `var(--atlas-k${kindColor[kind] ?? 7})`;

export function atlasLayer(path: AtlasPath) {
  if (path.view === "category") return path.deep ? 5 : path.id ? 4 : path.topic ? 3 : path.kind ? 2 : 1;
  return path.deep ? 5 : path.id ? 4 : path.kind ? 3 : path.topic ? 2 : 1;
}
export function atlasParent(path: AtlasPath): AtlasPath {
  if (path.view === "category") {
    if (path.deep) return { ...path, deep: false };
    if (path.id) return { view: "category", kind: path.kind, topic: path.topic };
    if (path.topic) return { view: "category", kind: path.kind };
    return { view: "category" };
  }
  if (path.paper && !path.topic) return { paper: undefined };
  if (path.deep) return { ...path, deep: false };
  const keep = path.paper ? { paper: path.paper } : {};
  if (path.id) return { ...keep, ...(path.topic ? { topic: path.topic } : {}), ...(path.kind ? { kind: path.kind } : {}) };
  if (path.kind) return path.topic ? { ...keep, topic: path.topic } : keep;
  return keep;
}

function ring(count: number, index: number) {
  const perRing = count > 18 ? Math.ceil(count / 2) : count;
  const outer = index >= perRing;
  const i = outer ? index - perRing : index;
  const n = outer ? count - perRing : perRing;
  const angle = (i / Math.max(n, 1)) * Math.PI * 2 - Math.PI / 2 + (outer ? Math.PI / Math.max(n, 1) : 0);
  const r = count > 18 ? (outer ? 43 : 28) : count > 8 ? 36 : count <= 6 ? 39 : 32;
  return { x: 50 + Math.cos(angle) * r, y: 50 + Math.sin(angle) * r * 0.86 };
}

export function KnowledgeAtlas({ path, onPath, title = "Layered knowledge atlas", papers, embedded = false }: { path: AtlasPath; onPath: (p: AtlasPath) => void; title?: string; papers?: KnowledgeItem[] | undefined; embedded?: boolean }) {
  const reduced = useReducedMotion();
  const explorer = useExplorerFullscreen();
  const [dir, setDir] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState<number | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState(false);
  const [page, setPage] = useState(0);
  useEffect(() => { const m = window.matchMedia("(max-width: 640px)"); const f = () => setNarrow(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  useEffect(() => setPage(0), [path.paper, path.topic, path.kind, path.id, path.deep]);
  const wheel = useRef(0);
  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>({});
  const drag = useRef<{ key: string; moved: boolean; sx: number; sy: number } | null>(null);
  const dragged = useRef(false);
  useEffect(() => setPos({}), [path.paper, path.topic, path.kind, path.id, path.deep, path.view, page]);
  const startDrag = (key: string) => (e: RPointerEvent<HTMLButtonElement>) => {
    drag.current = { key, moved: false, sx: e.clientX, sy: e.clientY };
    dragged.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const moveDrag = (e: RPointerEvent<HTMLButtonElement>) => {
    const d = drag.current; const el = stage.current;
    if (!d || !el) return;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 5) return;
    d.moved = true; dragged.current = true;
    const r = el.getBoundingClientRect();
    const x = Math.min(96, Math.max(4, ((e.clientX - r.left) / r.width) * 100));
    const y = Math.min(94, Math.max(8, ((e.clientY - r.top) / r.height) * 100));
    setPos(p => ({ ...p, [d.key]: { x, y } }));
  };
  const endDrag = () => { drag.current = null; };
  const paperMode = !!papers;
  const offset = paperMode ? 1 : 0;
  const base = atlasLayer(path);
  const layer = base + (paperMode && path.paper ? 1 : 0);
  const paper = path.paper ? knowledge.find(k => k.id === path.paper) : undefined;
  const item = path.id ? knowledge.find(k => k.id === path.id) : undefined;
  const topicTitle = networkTopics.find(t => t.id === path.topic)?.title ?? path.topic ?? "";

  const catMode = !paperMode && path.view === "category";
  const go = (next: AtlasPath, at = { x: 50, y: 50 }) => {
    let merged = paperMode && !("paper" in next) && path.paper ? { ...next, paper: path.paper } : next;
    if (catMode && !("view" in next)) merged = { ...merged, view: "category" };
    setDir(atlasLayer(merged) + (paperMode && merged.paper ? 1 : 0) >= layer ? 1 : -1);
    setOrigin(at);
    setHover(null);
    onPath(merged);
  };

  const scene = useMemo(() => {
    let center: { label: string; meta: string; color: string };
    let sats: Satellite[] = [];
    if (paperMode && !path.paper) {
      center = { label: "HV", meta: `${papers?.length ?? 0} papers`, color: kindTone("Publication") };
      sats = (papers ?? []).map(k => ({ key: k.id, label: k.title, meta: k.year ? String(k.year) : k.publisher, color: kindTone("Publication"), go: { paper: k.id }, item: k }));
    } else if (paperMode && !path.topic) {
      center = { label: paper?.title ?? "", meta: "Paper · its topics", color: kindTone("Publication") };
      sats = networkTopics.filter(t => networkResources(t.id).some(r => r.id === path.paper)).map(t => ({ key: t.id, label: t.title, meta: `${networkResources(t.id).length} works`, color: topicTone(t.id), go: { topic: t.id }, weight: networkResources(t.id).length }));
    } else if (catMode && base === 1) {
      center = { label: "HV", meta: "Every category", color: "var(--primary)" };
      sats = groupKnowledge(knowledge).map(g => ({ key: g.kind, label: g.title, meta: `${g.items.length} works`, color: kindTone(g.kind), go: { view: "category", kind: g.kind }, weight: g.items.length }));
    } else if (catMode && base === 2) {
      const items = knowledge.filter(k => k.kind === path.kind);
      center = { label: groupKnowledge(items)[0]?.title ?? path.kind!, meta: "Category · its topics", color: kindTone(path.kind!) };
      sats = networkTopics.map(t => ({ t, n: networkResources(t.id).filter(k => k.kind === path.kind).length })).filter(x => x.n > 0)
        .map(({ t, n }) => ({ key: t.id, label: t.title, meta: `${n}`, color: topicTone(t.id), go: { view: "category" as const, kind: path.kind, topic: t.id }, weight: n }));
    } else if (base === 1) {
      center = { label: "HV", meta: "Harsh Verma", color: "var(--primary)" };
      sats = networkTopics.map(t => ({ key: t.id, label: t.title, meta: `${networkResources(t.id).length} works`, color: topicTone(t.id), go: { topic: t.id }, weight: networkResources(t.id).length }));
    } else if (base === 2) {
      center = { label: topicTitle, meta: "Topic", color: topicTone(path.topic!) };
      sats = groupKnowledge(networkResources(path.topic!)).map(g => ({ key: g.kind, label: g.title, meta: `${g.items.length}`, color: kindTone(g.kind), go: { topic: path.topic, kind: g.kind }, weight: g.items.length }));
    } else if (base === 3) {
      const items = networkResources(path.topic!).filter(k => k.kind === path.kind);
      center = { label: groupKnowledge(items)[0]?.title ?? path.kind!, meta: topicTitle, color: kindTone(path.kind!) };
      sats = items.map(k => ({ key: k.id, label: k.title, meta: k.year ? String(k.year) : k.publisher, color: kindTone(k.kind), go: { ...(catMode ? { view: "category" as const } : {}), topic: path.topic, kind: path.kind, id: k.id }, item: k }));
    } else {
      center = { label: item?.title ?? "", meta: item?.kind ?? "", color: kindTone(item?.kind ?? "") };
      sats = connectedWork(path.id!).slice(0, base === 5 ? 14 : 8).map(c => ({ key: c.item.id, label: c.item.title, meta: c.item.kind, color: kindTone(c.item.kind), go: { topic: path.topic, kind: c.item.kind, id: c.item.id }, item: c.item }));
    }
    const per = narrow ? 6 : 36;
    const pages = Math.max(1, Math.ceil(sats.length / per));
    // The three busiest collections in this layer read as the biggest nodes, so they blink.
    const top = new Set(sats.filter(s => (s.weight ?? 0) > 0).sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0)).slice(0, 3).map(s => s.key));
    return { center, sats: sats.slice((page % pages) * per, (page % pages) * per + per), pages, total: sats.length, top };
  }, [catMode, narrow, page, layer, base, paperMode, papers, paper, path.paper, path.topic, path.kind, path.id, topicTitle, item]);

  // Ctrl/pinch zoom (or plain wheel in full screen) drills in on the hovered node, like a map.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey && !explorer.fullscreen) return;
      e.preventDefault();
      wheel.current += e.deltaY;
      if (Math.abs(wheel.current) < 120) return;
      const zoomIn = wheel.current < 0;
      wheel.current = 0;
      if (!zoomIn) { if (layer > 1) go(atlasParent(path)); return; }
      if (base === 4) { go({ ...path, deep: true }); return; }
      const target = hover !== null ? scene.sats[hover] : scene.sats[0];
      if (target && base < 4) go(target.go, ring(scene.sats.length, hover ?? 0));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  const crumbs: { label: string; p: AtlasPath }[] = paperMode ? [{ label: "Papers", p: { paper: undefined } }] : catMode ? [{ label: "Categories", p: { view: "category" } }] : [{ label: "Topics", p: {} }];
  const kindLabel = groupKnowledge(knowledge.filter(k => k.kind === path.kind))[0]?.title ?? path.kind ?? "";
  if (paper) crumbs.push({ label: paper.title, p: { paper: paper.id } });
  if (catMode) {
    if (path.kind) crumbs.push({ label: kindLabel, p: { view: "category", kind: path.kind } });
    if (path.topic) crumbs.push({ label: topicTitle, p: { view: "category", kind: path.kind, topic: path.topic } });
  } else if (path.topic) crumbs.push({ label: topicTitle, p: { topic: path.topic } });
  if (path.kind && !catMode) crumbs.push({ label: groupKnowledge(knowledge.filter(k => k.kind === path.kind))[0]?.title ?? path.kind, p: { topic: path.topic, kind: path.kind } });
  if (item) crumbs.push({ label: item.title, p: { ...(catMode ? { view: "category" as const } : {}), topic: path.topic, kind: path.kind, id: item.id } });
  if (path.deep) crumbs.push({ label: "Detail", p: path });

  const variants = {
    enter: (d: number) => ({ scale: reduced ? 1 : d > 0 ? 0.35 : 2.4, opacity: 0, filter: reduced ? "none" : "blur(6px)" }),
    center: { scale: 1, opacity: 1, filter: "blur(0px)" },
    exit: (d: number) => ({ scale: reduced ? 1 : d > 0 ? 2.6 : 0.4, opacity: 0, filter: reduced ? "none" : "blur(6px)" }),
  };
  const layerNames = paperMode ? ["Papers", "Topics", "Categories", "Entries", "Entry", "Detail"] : catMode ? ["Categories", "Topics", "Entries", "Entry", "Detail"] : ["Topics", "Categories", "Entries", "Entry", "Detail"];

  return (
    <div ref={explorer.ref} className={`atlas ${explorer.fullscreen ? "explorer-fullscreen atlas-full" : ""}`} aria-label={title} role="region">
      {!paperMode && (
        <div className="mb-3 flex flex-wrap items-center gap-2" role="group" aria-label="Explorer view">
          {([["topic", "Topic view", "HV → topics → categories"], ["category", "Category view", "HV → categories → topics"]] as const).map(([v, label, hint]) => {
            const on = (path.view ?? "topic") === v;
            return <Button key={v} variant="ghost" size="sm" aria-pressed={on} onClick={() => { if (!on) { setDir(-1); setOrigin({ x: 50, y: 50 }); onPath(v === "category" ? { view: "category" } : {}); } }}
              className="knowledge-subview">
              {label} <span className="hidden text-muted-foreground sm:inline">· {hint}</span></Button>;
          })}
        </div>
      )}
      <div className="atlas-bar">
        <div className="flex min-w-0 items-center gap-2">
          {!embedded && <Button variant="ghost" size="icon-sm" aria-label="Home: return to HV" title="Home: return to HV" onClick={() => go({ ...(catMode ? { view: "category" as const } : {}), paper: undefined })}><Home /></Button>}
          <Button variant="outline" size="sm" onClick={() => go(atlasParent(path))} disabled={layer === 1} aria-label="Zoom out one layer"><ArrowLeft /></Button>
          <nav aria-label="Atlas layers" className="atlas-crumbs">
            {crumbs.map((c, i) => (
              <span key={i} className="flex min-w-0 items-center gap-1">
                {i > 0 && <ChevronRight className="size-3 shrink-0 text-muted-foreground" aria-hidden />}
                <button type="button" onClick={() => go(c.p)} aria-current={i === crumbs.length - 1 ? "step" : undefined} className="atlas-crumb">{i === 0 ? <Home className="size-3" aria-hidden /> : null}{c.label}</button>
              </span>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ol className="atlas-depth" aria-label={`Layer ${layer} of ${layerNames.length}`}>
            {layerNames.map((n, i) => <li key={n} className={`${i + 1 <= layer ? "is-on" : ""} ${i + 1 === layer ? "is-now" : ""}`}>
              <button type="button" disabled={i + 1 >= layer || !crumbs[i]} onClick={() => crumbs[i] && go(crumbs[i]!.p)} title={`Layer ${i + 1}: ${n}`} aria-label={`Layer ${i + 1}: ${n}`}><span className="atlas-depth-n">{i + 1}</span><span className="atlas-depth-name">{n}</span></button>
            </li>)}
          </ol>
          <Button variant="outline" size="sm" aria-label="Zoom in" disabled={base === 5 || (base < 4 && !scene.sats.length)}
            onClick={() => base === 4 ? go({ ...path, deep: true }) : scene.sats[hover ?? 0] && go(scene.sats[hover ?? 0]!.go, ring(scene.sats.length, hover ?? 0))}><ZoomIn /></Button>
          <Button variant="outline" size="sm" aria-label="Zoom out" disabled={layer === 1} onClick={() => go(atlasParent(path))}><ZoomOut /></Button>
          {!embedded && <ExplorerFullscreenButton fullscreen={explorer.fullscreen} toggle={explorer.toggle} />}
        </div>
      </div>
      <div ref={stage} className="atlas-stage" onKeyDown={e => { if ((e.key === "Backspace" || e.key === "-") && layer > 1) { e.preventDefault(); go(atlasParent(path)); } }}>
        <p className="atlas-layer-tag"><Layers className="size-3.5" aria-hidden /> Layer {layer} · {layerNames[layer - 1]}</p>
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div key={JSON.stringify(path)} className={`atlas-scene ${layer === 1 ? "is-root" : ""} ${base >= 4 ? "is-detail" : ""}`} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
            transition={{ duration: reduced ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}>
            <svg className="atlas-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {scene.sats.map((s, i) => {
                const p = pos[s.key] ?? ring(scene.sats.length, i);
                const mx = (50 + p.x) / 2, my = (50 + p.y) / 2;
                const cx = mx + (p.y - 50) * 0.18, cy = my - (p.x - 50) * 0.18;
                const d = `M50 50 Q${cx} ${cy} ${p.x} ${p.y}`;
                return <g key={s.key} className={hover === i ? "is-hot" : ""} style={{ ["--c" as string]: s.color }}>
                  <path d={d} className="atlas-edge-glow" style={{ stroke: s.color }} />
                  <path d={d} className="atlas-edge" style={{ stroke: s.color }} />
                </g>;
              })}
            </svg>
            {base >= 4 && item ? (
              <article className={`atlas-entry ${base === 5 ? "is-deep" : ""}`} style={{ ["--c" as string]: scene.center.color }}>
                <span className="atlas-entry-kind">{item.kind}{item.year ? ` · ${item.year}` : ""}</span>
                <h3>{item.title}</h3>
                <p className={base === 5 ? "" : "line-clamp-3"}>{item.summary}</p>
                {base === 5 && (
                  <dl className="atlas-facts">
                    {item.publisher && <><dt>Source</dt><dd>{item.publisher}</dd></>}
                    {item.topics.length > 0 && <><dt>Topics</dt><dd>{item.topics.join(" · ")}</dd></>}
                    {item.technology.length > 0 && <><dt>Technology</dt><dd>{item.technology.slice(0, 6).join(" · ")}</dd></>}
                  </dl>
                )}
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <button type="button" className="atlas-open is-ghost" onClick={() => go(atlasParent(path))} aria-label="Zoom out one layer"><ArrowLeft className="size-3.5" aria-hidden />{base === 5 ? "" : "Out"}</button>
                  <KnowledgeLink item={item} className="atlas-open">Open <ArrowUpRight className="size-3.5" aria-hidden /></KnowledgeLink>
                  {base === 4 && <button type="button" className="atlas-open is-ghost" onClick={() => go({ ...path, deep: true })}>Zoom into detail <ZoomIn className="size-3.5" aria-hidden /></button>}
                </div>
              </article>
            ) : (
              <div className={`atlas-core ${layer === 1 ? "is-hv" : ""}`} style={{ ["--c" as string]: scene.center.color }} role="group" aria-label={scene.center.label}>
                {layer === 1 ? <LogoMark className="atlas-core-logo" /> : <strong>{scene.center.label}</strong>}<span>{scene.center.meta}</span>
                {layer === 1 && <em className="atlas-core-hint">Select a node to navigate</em>}
                <div className="atlas-core-nav">
                  {layer > 1 && <button type="button" onClick={() => go(atlasParent(path))} aria-label="Zoom out one layer"><ArrowLeft className="size-3" aria-hidden />Out</button>}
                  {scene.sats.length > 0 && <button type="button" className={layer === 1 ? "is-select" : ""} onClick={() => scene.sats[hover ?? 0] && go(scene.sats[hover ?? 0]!.go, ring(scene.sats.length, hover ?? 0))} aria-label="Zoom in one layer">{layer === 1 ? `Select ${paperMode ? "a paper" : catMode ? "a category" : "a topic"}` : "In"}<ChevronRight className="size-3" aria-hidden /></button>}
                </div>
              </div>
            )}
            {scene.sats.map((s, i) => {
              const p = pos[s.key] ?? ring(scene.sats.length, i);
              return (
                <motion.button key={s.key} type="button" className={`atlas-sat ${base >= 3 || (paperMode && !path.paper) ? "is-entry" : ""} ${scene.top.has(s.key) ? "is-top" : ""}`}
                  initial={reduced ? false : { opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} style={{ left: `${p.x}%`, top: `${p.y}%`, ["--c" as string]: s.color, ["--i" as string]: i }} transition={{ delay: reduced ? 0 : 0.25 + i * 0.025, type: "spring", stiffness: 260, damping: 22 }}
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)}
                  onPointerDown={startDrag(s.key)} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}
                  onClick={() => { if (dragged.current) { dragged.current = false; return; } go(s.go, p); }} aria-label={`${s.label}, ${s.meta}. Zoom in`}>
                  <span className="atlas-sat-dot" />
                  <span className="atlas-sat-label">{s.label}</span>
                  <span className="atlas-sat-meta">{s.meta}</span>
                </motion.button>
              );
            })}
            {base >= 4 && <div className="atlas-mobile-related" aria-label="Connected work in this layer">
              {scene.sats.map(s => <Button key={s.key} variant="ghost" size="sm" onClick={() => go(s.go)} className="h-auto whitespace-normal text-left"><span className="line-clamp-2">{s.label}</span><ChevronRight className="size-3 shrink-0" /></Button>)}
            </div>}
          </motion.div>
        </AnimatePresence>
        {scene.pages > 1 && <button type="button" className="atlas-more" onClick={() => { setHover(null); setPage(p => p + 1); }}>Next {scene.sats.length} of {scene.total} <ChevronRight className="size-3" aria-hidden /></button>}
        <div className="atlas-step" role="group" aria-label="Move between layers">
          <button type="button" onClick={() => go(atlasParent(path))} disabled={layer === 1} aria-label="Back: zoom out one layer"><ArrowLeft className="size-3" aria-hidden /><span>Out</span></button>
          <span className="atlas-step-n">L{layer}</span>
          <button type="button" disabled={layer === layerNames.length || (base < 4 && !scene.sats.length)} onClick={() => base === 4 ? go({ ...path, deep: true }) : scene.sats[hover ?? 0] && go(scene.sats[hover ?? 0]!.go, ring(scene.sats.length, hover ?? 0))} aria-label="Forward: zoom in one layer"><span>In</span><ChevronRight className="size-3" aria-hidden /></button>
        </div>
        <p className="atlas-hint">Drag nodes to rearrange · click to zoom in · {explorer.fullscreen ? "scroll" : "pinch or Ctrl + scroll"} to zoom · Backspace to zoom out</p>
      </div>
    </div>
  );
}
