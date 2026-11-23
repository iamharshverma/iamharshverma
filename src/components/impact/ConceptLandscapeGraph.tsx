import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play, ArrowLeft, ArrowRight, ArrowUpRight, Lightbulb, TriangleAlert, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LogoMark } from "@/components/site/Logo";
import { impactTopics, type ImpactTopic } from "@/data/knowledge-impact";
import { ZoomableDiagram } from "./ZoomableDiagram";
import { landscapeLayout, landscapeSpoke } from "./landscape-layout";

export function ConceptLandscapeGraph({ focused, active, expanded, stage, onFocus, onStage, onBack, onReset }: {
  focused: ImpactTopic | undefined;
  active: ImpactTopic;
  expanded: boolean;
  stage: number;
  onFocus: (id: string) => void;
  onStage: (index: number) => void;
  onBack: () => void;
  onReset: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [detailId, setDetailId] = useState("principle");
  const [popupId, setPopupId] = useState<string | null>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) => setCompact((entry?.contentRect.width ?? 960) < 620));
    let inView = false;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = Boolean(entry?.isIntersecting); update(); });
    resize.observe(element);
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { resize.disconnect(); observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  const details = focused && expanded;
  const items: { id: string; label: string; caption: string; tone: number; description?: string }[] = details
    ? [
      { id: "principle", label: "Engineering principle", caption: "GUIDING PRINCIPLE", tone: impactTopics.indexOf(focused), description: focused.principles[stage % focused.principles.length] ?? focused.why },
      { id: "friction", label: "Engineering friction", caption: "REVIEW & CONSTRAINTS", tone: impactTopics.indexOf(focused), description: focused.challenges[stage % focused.challenges.length] ?? focused.summary },
      { id: "handoff", label: "Stage handoff", caption: "CONNECTED WORKFLOW", tone: impactTopics.indexOf(focused), description: `${stage === 0 ? "Starts this workflow." : `Follows: ${focused.flow[stage - 1]}.`} ${stage === focused.flow.length - 1 ? "Completes this workflow." : `Continues to: ${focused.flow[stage + 1]}.`}` },
    ]
    : focused
    ? focused.flow.map((label, index) => ({ id: `${focused.id}-${index}`, label, caption: `STAGE ${String(index + 1).padStart(2, "0")}`, tone: impactTopics.indexOf(focused) }))
    : impactTopics.map((item, index) => ({ id: item.id, label: item.short, caption: `${item.resources.length} sources`, tone: index }));
  const layout = landscapeLayout(items.length, compact, Boolean(details));
  const nodeWidth = compact ? 168 : 188;
  const nodeHeight = compact ? 104 : 108;
  const selectedDetail = details ? items.find(item => item.id === detailId) ?? items[0] : undefined;
  const popupDetail = details ? items.find(item => item.id === popupId) : undefined;
  return <div ref={ref} className={`impact-landscape-map mt-6 ${visible && !paused ? "is-motion-active" : ""}`}>
    <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        {focused && <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft /> {details ? "Back to stages" : "All topics"}</Button>}
        <span className="font-mono text-xs text-muted-foreground">{focused ? `${focused.short} / ${details ? focused.flow[stage] : `${items.length} stages`}` : `${items.length} intelligence domains`}</span>
      </div>
      <Button variant="ghost" size="icon-sm" title={paused ? "Resume animation" : "Pause animation"} aria-label={paused ? "Resume landscape animation" : "Pause landscape animation"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play /> : <Pause />}</Button>
    </div>
    <ZoomableDiagram key={`${focused?.id ?? "overview"}-${details ? "details" : "stages"}`} label="intelligence landscape" onHome={onReset}>
      <svg viewBox={`0 0 ${layout.width} ${layout.height}`} role="group" aria-label={focused ? details ? `${focused.flow[stage]} stage details` : `${focused.short} connected stages` : "HV connected intelligence domains"}>
        {items.map((item, index) => {
          const position = layout.nodes[index];
          if (!position) return null;
          const path = landscapeSpoke(layout.center, position, nodeWidth, nodeHeight, focused ? 92 : 56, false);
          const selected = details ? selectedDetail?.id === item.id : Boolean(focused) && stage === index;
          return <g key={item.id} className={`impact-tone-${item.tone} landscape-spoke ${selected ? "is-selected" : ""}`}>
            <path d={path} className="landscape-edge" />
            <path d={path} className="landscape-edge-flow" />
            {[0, 1].map(arrow => <path key={arrow} d="M -8 -4 L 0 0 L -8 4" className="landscape-travel-arrow" style={{ offsetPath: `path('${path}')`, animationDelay: `${index * -0.22 - arrow * 1.8}s` } as CSSProperties} />)}
            <foreignObject x={position.x - nodeWidth / 2} y={position.y - nodeHeight / 2} width={nodeWidth} height={nodeHeight}>
              <Button variant="ghost" className={`landscape-topic-button ${selected ? "is-selected" : ""}`} aria-pressed={selected} aria-expanded={details ? selected : focused ? false : undefined} aria-label={details ? `Show ${item.label}` : focused ? `Stage ${index + 1}: ${item.label}` : `Explore landscape ${item.label}`} onClick={() => details ? (setDetailId(item.id), setPopupId(item.id)) : focused ? onStage(index) : onFocus(item.id)}>
                <span className="landscape-node-caption">{item.caption}</span>
                <span className="landscape-node-title">{item.label}</span>
                {!focused && <ArrowUpRight className="landscape-node-arrow" />}
              </Button>
            </foreignObject>
          </g>;
        })}
        <g className={`landscape-hub impact-tone-${focused ? impactTopics.indexOf(focused) : 0}`}>
          <circle cx={layout.center.x} cy={layout.center.y} r={focused ? 99 : 63} className="landscape-hub-ring" />
          <circle cx={layout.center.x} cy={layout.center.y} r={focused ? 92 : 56} className="landscape-hub-disc" />
          <foreignObject x={layout.center.x - (focused ? 92 : 56)} y={layout.center.y - (focused ? 92 : 56)} width={focused ? 184 : 112} height={focused ? 184 : 112}>
            <div className={`landscape-hub-box ${focused ? "is-focused" : ""}`}>
            <Button variant="ghost" className={`landscape-hub-button ${focused ? "is-focused" : ""}`} title={focused ? "Back" : "HV — all topics"} aria-label={focused ? details ? "Back to topic stages" : "Back to all intelligence topics" : "HV — all intelligence topics"} onClick={focused ? onBack : onReset}>
              {focused ? <><span className="landscape-node-caption">{details ? `STAGE ${String(stage + 1).padStart(2, "0")}` : "INTELLIGENCE DOMAIN"}</span><span>{details ? focused.flow[stage] : focused.short}</span><span className="landscape-node-caption">{details ? focused.short : `${focused.resources.length} sources`}</span></> : <LogoMark className="size-16" />}
            </Button>
            <div className="landscape-center-controls">
              <Button variant="ghost" size="icon-sm" title="Out" aria-label="Out — previous landscape level" disabled={!focused} onClick={onBack}><ArrowLeft /></Button>
              <Button variant="ghost" size="icon-sm" title="In" aria-label="In — expand landscape level" disabled={Boolean(details)} onClick={() => focused ? onStage(stage) : onFocus(active.id)}><ArrowRight /></Button>
            </div>
            </div>
          </foreignObject>
        </g>
      </svg>
    </ZoomableDiagram>
    {details && focused && <section className="landscape-insights mt-6" aria-label={`${focused.flow[stage]} stage insights`}>
      <p className="impact-kicker">Stage insights</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {items.map(item => {
          const InsightIcon = item.id === "principle" ? Lightbulb : item.id === "friction" ? TriangleAlert : GitBranch;
          const active = selectedDetail?.id === item.id;
          return <button key={item.id} type="button" aria-pressed={active} onClick={() => setDetailId(item.id)} className={`landscape-insight-card impact-tone-${item.tone} ${active ? "is-selected" : ""}`}>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><InsightIcon className="size-3.5" />{item.caption}</span>
            <span className="mt-2 block font-display text-sm font-semibold">{item.label}</span>
            <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
          </button>;
        })}
      </div>
    </section>}
    <Dialog open={Boolean(popupDetail)} onOpenChange={open => { if (!open) setPopupId(null); }}>
      <DialogContent className="landscape-insight-dialog">
        {popupDetail && focused && <>
          <p className="impact-kicker">{focused.flow[stage]} / {popupDetail.caption}</p>
          <DialogTitle className="mt-2 font-display text-xl font-semibold">{popupDetail.label}</DialogTitle>
          <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">{popupDetail.description}</DialogDescription>
          <div className="mt-5 flex flex-wrap gap-2">
            {items.filter(item => item.id !== popupDetail.id).map(item => <Button key={item.id} variant="outline" size="sm" onClick={() => { setDetailId(item.id); setPopupId(item.id); }}>{item.label}</Button>)}
          </div>
        </>}
      </DialogContent>
    </Dialog>
  </div>;
}