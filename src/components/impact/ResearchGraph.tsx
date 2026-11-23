import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ReactFlow,
  useNodesState,
  type Node,
  type Edge,
  type ReactFlowInstance,
  Background,
  BackgroundVariant,
  Position,
} from "@xyflow/react";
import {
  Search,
  Plus,
  Minus,
  Maximize,
  RotateCcw,
  Waypoints,
  Layers,
  ArrowRight,
  ChevronRight,
  Network,
  Pause,
  Play,
  Focus,
  Expand,
  Shrink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { KnowledgeLink } from "@/components/site/KnowledgeCards";
import {
  impactTopics,
  impactRelationships,
  ideaJourneys,
  getImpactTopic,
} from "@/data/knowledge-impact";
import { knowledge, filterKnowledge, type KnowledgeItem } from "@/data/knowledge";
import { networkTopics, knowledgeClassifiers } from "@/data/knowledge-network";
import { impactTopicTags } from "@/data/knowledge-impact";
import { PersonalKnowledgeGraph } from "@/components/site/PersonalKnowledgeGraph";
import { graphViews, type ImpactSearch } from "@/lib/impact-search";

type Props = {
  topic: string;
  onTopic: (id: string) => void;
  onExplore: () => void;
  settings: ImpactSearch;
  onSettings: (patch: Partial<ImpactSearch>) => void;
};
const positions = Array.from({ length: 8 }, (_, index) => {
  const angle = index * Math.PI / 4 - Math.PI / 2;
  return [480 + Math.cos(angle) * 420, 360 + Math.sin(angle) * 330];
});
const emptyIds: string[] = [];
const matchesView = (item: KnowledgeItem, view: string) =>
  view === "Full ecosystem" ||
  (view === "Research" && ["Research", "Patent", "Publication"].includes(item.kind)) ||
  (view === "Engineering" && ["Case study", "Project"].includes(item.kind)) ||
  (view === "Publication" && ["Article", "Book", "Keynote"].includes(item.kind));
function ConceptResearchGraph({ topic, onTopic, onExplore, settings, onSettings }: Props) {
  const query = settings.graphQuery ?? "";
  const category = settings.category ?? "";
  const view = settings.view ?? "Concept";
  const expanded = settings.expanded ?? emptyIds;
  const [resource, setResource] = useState<KnowledgeItem | null>(null);
  const [flow, setFlow] = useState<ReactFlowInstance | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [enlarged, setEnlarged] = useState(false);
  const [moving, setMoving] = useState(false);
  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intersecting = true;
    const sync = () => setMoving(intersecting && !document.hidden && !preference.matches && !paused);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry?.isIntersecting ?? false; sync(); });
    observer.observe(element);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); preference.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [paused]);
  const [journey, setJourney] = useState(-1);
  const active = getImpactTopic(topic);
  const path = ideaJourneys[topic] ?? emptyIds;
  const candidates = useMemo(
    () =>
      impactTopics.filter(
        (t) =>
          (!category || t.id === category || t.id === topic) &&
          `${t.title} ${t.summary} ${t.concepts.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, topic, query],
  );
  const initial = useMemo<Node[]>(
    () =>
      candidates.flatMap((t) => {
        const i = impactTopics.indexOf(t);
        const position = positions[i] ?? [0, 0];
        const concept: Node = {
          id: t.id,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          position: { x: position[0] ?? 0, y: position[1] ?? 0 },
          data: {
            label: (
              <>
                <span className="impact-node-type">{String(i + 1).padStart(2, "0")} / CONCEPT</span>
                <span className="impact-node-title">{t.title}</span>
                <span className="impact-node-count">{t.resources.length} sources <Network className="size-3" /></span>
              </>
            ),
          },
          className: `impact-graph-node impact-tone-${i} ${t.id === topic ? "is-active" : ""}`,
        };
        const showResources = expanded.includes(t.id) || (view !== "Concept" && t.id === topic);
        const clusterIndex = candidates.filter(
          (candidate) =>
            impactTopics.indexOf(candidate) < i &&
            (expanded.includes(candidate.id) || (view !== "Concept" && candidate.id === topic)),
        ).length;
        const children: Node[] = showResources
          ? t.resources
              .filter((r) => matchesView(r, view === "Concept" ? "Full ecosystem" : view))
              .map((r, j) => ({
                id: `${t.id}:${r.id}`,
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
                position: {
                  x: 1100 + (j % 4) * 235,
                  y: clusterIndex * 2400 + Math.floor(j / 4) * 115,
                },
                data: {
                  label: (
                    <>
                      <span className="impact-node-type">{r.kind}</span>
                      <span>{r.title}</span>
                    </>
                  ),
                  resource: r,
                },
                className: `impact-graph-node impact-resource-node impact-tone-${i}`,
              }))
          : [];
        return [concept, ...children];
      }),
    [candidates, topic, view, expanded],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initial);
  useEffect(() => {
    setNodes(initial);
    const timer = window.setTimeout(() => void flow?.fitView({ padding: 0.18, duration: moving ? 500 : 0, maxZoom: 1 }), 100);
    return () => window.clearTimeout(timer);
  }, [initial, setNodes, flow, enlarged]);
  const edges = useMemo<Edge[]>(() => {
    const ids = new Set(initial.map((n) => n.id));
    return [
      ...impactRelationships
        .filter((r) => ids.has(r.source) && ids.has(r.target))
        .map((r, i) => ({
          id: `relationship-${i}`,
          source: r.source,
          target: r.target,
          type: "straight",
          label: r.source === topic || r.target === topic ? r.verb : "",
          className: `impact-graph-edge ${r.source === topic || r.target === topic ? "is-active" : ""}`,
          animated: moving && journey >= 0 && path.includes(r.source) && path.includes(r.target),
        })),
      ...initial
        .filter((n) => n.data["resource"])
        .map((n) => ({
          id: `resource-edge-${n.id}`,
          source: n.id.split(":")[0] ?? "",
          target: n.id,
          type: "straight",
          className: "impact-graph-edge is-active",
        })),
    ];
  }, [initial, topic, journey, path, moving]);
  useEffect(() => {
    if (!moving || journey < 0 || journey >= path.length - 1) return;
    const timer = window.setTimeout(() => setJourney((j) => j + 1), 1800);
    return () => window.clearTimeout(timer);
  }, [journey, path.length, moving]);
  const reset = () => {
    onSettings({ graphQuery: "", category: "", expanded: [], view: "Concept" });
    setJourney(-1);
    setResource(null);
    setNodes(initial);
    void flow?.fitView({ duration: 300, padding: 0.12 });
  };
  const select = (id: string) => {
    onTopic(id);
    setResource(null);
    setJourney(-1);
  };
  return (
    <div className={`impact-research-graph ${moving ? "impact-graph-moving" : ""} ${enlarged ? "impact-graph-expanded" : ""}`}>
      <div className="impact-section-heading flex flex-wrap items-center justify-between gap-3 px-5 pt-6 sm:px-8">
        <div>
          <p className="impact-kicker">04 / Connections</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">
            Trace the Architecture of an Idea.
          </h2>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          8 domains · 12 editorial relationships
        </span>
      </div>
      <div className="impact-toolbar">
        <label className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <span className="sr-only">Search graph topics</span>
          <input
            className="impact-input pl-10"
            placeholder="Find an idea…"
            value={query}
            onChange={(e) => onSettings({ graphQuery: e.target.value })}
            type="search"
          />
        </label>
        <label>
          <span className="sr-only">Graph view</span>
          <select
            className="impact-input"
            aria-label="Graph view"
            value={view}
            onChange={(e) => onSettings({ view: e.target.value })}
          >
            {graphViews.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Graph category</span>
          <select
            className="impact-input max-w-48"
            aria-label="Graph category"
            value={category}
            onChange={(e) => onSettings({ category: e.target.value })}
          >
            <option value="">All domains</option>
            {impactTopics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 border-b border-border lg:border-b-0 lg:border-r">
          <div ref={stageRef} className="impact-graph-stage relative" aria-label="Interactive research graph">
            <div className="absolute right-4 top-4 z-10 flex gap-1 rounded-xl border border-border bg-background p-1">
              <Button variant="ghost" size="icon-sm" title={enlarged ? "Compact graph" : "Expand graph"} aria-label={enlarged ? "Compact graph" : "Expand graph"} onClick={() => setEnlarged(value => !value)}>{enlarged ? <Shrink /> : <Expand />}</Button>
              <Button variant="ghost" size="icon-sm" title={paused ? "Resume graph animation" : "Pause graph animation"} aria-label={paused ? "Resume graph animation" : "Pause graph animation"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play /> : <Pause />}</Button>
            </div>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onInit={setFlow}
              onNodeClick={(_event, node) => {
                const r = node.data["resource"];
                if (r && typeof r === "object" && "title" in r) setResource(r as KnowledgeItem);
                else select(node.id);
              }}
              fitView
              fitViewOptions={{ padding: 0.18 }}
              minZoom={0.08}
              maxZoom={1.7}
              nodesConnectable={false}
              deleteKeyCode={null}
              zoomOnScroll={false}
              preventScrolling={false}
              proOptions={{ hideAttribution: true }}
            >
              <Background variant={BackgroundVariant.Dots} gap={26} size={1} />
            </ReactFlow>
            <div className="absolute bottom-4 left-4 flex gap-1 rounded-xl border border-border bg-background p-1">
              <Button
                variant="ghost"
                size="icon-sm"
                title="Zoom in"
                aria-label="Zoom in"
                onClick={() => void flow?.zoomIn()}
              >
                <Plus />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                title="Zoom out"
                aria-label="Zoom out"
                onClick={() => void flow?.zoomOut()}
              >
                <Minus />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                title="Fit graph"
                aria-label="Fit graph"
                onClick={() => void flow?.fitView({ duration: 300, padding: 0.12 })}
              >
                <Maximize />
              </Button>
              <Button variant="ghost" size="icon-sm" title="Focus selected idea" aria-label="Focus selected idea" onClick={() => void flow?.fitView({ nodes: nodes.filter(node => node.id === topic || node.id.startsWith(`${topic}:`)), padding: 0.3, maxZoom: 1, duration: moving ? 500 : 0 })}><Focus /></Button>
              <Button
                variant="ghost"
                size="icon-sm"
                title="Reset graph"
                aria-label="Reset graph"
                onClick={reset}
              >
                <RotateCcw />
              </Button>
            </div>
            <span className="absolute bottom-6 right-5 hidden font-mono text-[9px] text-muted-foreground sm:block">
              EDITORIAL RELATIONSHIPS · NOT MEASURED WEIGHTS
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 p-4" aria-label="Choose a graph topic">
            {candidates.map((t) => (
              <Button
                key={t.id}
                variant={topic === t.id ? "secondary" : "ghost"}
                size="sm"
                className="max-w-full whitespace-normal text-left"
                aria-pressed={topic === t.id}
                onClick={() => select(t.id)}
              >
                {t.short}
              </Button>
            ))}
            {!candidates.length && (
              <p className="text-sm text-muted-foreground">
                No matching ideas. Try a broader search.
              </p>
            )}
          </div>
          {view !== "Concept" && active && !active.resources.some((r) => matchesView(r, view)) && (
            <p className="px-5 pb-5 text-sm text-muted-foreground">
              No directly associated {view.toLowerCase()} records are documented for this idea.
              Choose another domain or explore its source perspective.
            </p>
          )}
        </div>
        <aside className="min-w-0 p-5 sm:p-6" aria-label="Selected idea details">
          <p className="impact-kicker">{resource ? resource.kind : "Selected idea"}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">
            {resource?.title ?? active?.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {resource?.summary ?? active?.why}
          </p>
          {resource ? (
            <KnowledgeLink
              item={resource}
              className="mt-5 inline-flex items-center gap-2 text-sm text-brand"
            >
              Open source material <ArrowRight className="size-4" />
            </KnowledgeLink>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="mt-5"
                onClick={() =>
                  onSettings({
                    expanded: expanded.includes(topic)
                      ? expanded.filter((id) => id !== topic)
                      : [...expanded, topic],
                  })
                }
              >
                <Layers />
                {expanded.includes(topic) ? "Collapse cluster" : "Expand cluster"}
              </Button>
              <div className="mt-6 border-t border-border pt-4">
                <p className="impact-kicker">Connected thinking</p>
                {impactRelationships
                  .filter((r) => r.source === topic || r.target === topic)
                  .slice(0, 3)
                  .map((r) => {
                    const related = getImpactTopic(r.source === topic ? r.target : r.source);
                    return (
                      <div className="mt-4" key={`${r.source}-${r.target}`}>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto px-0 whitespace-normal text-left justify-start"
                          onClick={() => select(related?.id ?? topic)}
                        >
                          {related?.title}
                          <ChevronRight />
                        </Button>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {r.explanation}
                        </p>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <p className="impact-kicker">Connected sources</p>
                {active?.resources.slice(0, 3).map((r) => (
                  <KnowledgeLink
                    key={r.id}
                    item={r}
                    className="mt-3 block text-xs leading-relaxed hover:text-brand"
                  >
                    <span className="text-muted-foreground">{r.kind} / </span>
                    {r.title} ↗
                  </KnowledgeLink>
                ))}
              </div>
              <Button size="sm" className="mt-6" onClick={onExplore}>
                Explore this concept <ArrowRight />
              </Button>
            </>
          )}
        </aside>
      </div>
      <div className="border-t border-border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-display font-semibold">
            <Waypoints className="size-4 text-brand" />
            Follow the Idea
          </p>
          <Button variant="outline" size="sm" onClick={() => setJourney((j) => (j >= 0 ? -1 : 0))}>
            {journey >= 0 ? "Stop journey" : "Follow this idea"}
            <ArrowRight />
          </Button>
        </div>
        <ol className="mt-4 flex flex-wrap gap-2">
          {path.map((id, i) => (
            <li key={id} className="flex items-center gap-2">
              <Button
                variant={journey === i ? "secondary" : "ghost"}
                size="sm"
                onClick={() => select(id)}
              >
                {getImpactTopic(id)?.short}
              </Button>
              {i < path.length - 1 && <ArrowRight className="size-3 text-muted-foreground" />}
            </li>
          ))}
        </ol>
        {journey >= 0 && (
          <p className="mt-3 text-sm text-muted-foreground" role="status">
            {getImpactTopic(path[journey] ?? topic)?.why}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ResearchGraph(props: Props) {
  const { settings, onSettings } = props;
  const navigate = useNavigate();
  const view = settings.view ?? "Full ecosystem";
  if (view !== "Full ecosystem") return <ConceptResearchGraph {...props} />;
  const selected = settings.networkTopic ?? impactTopicTags[props.topic]?.[0] ?? "";
  const items = filterKnowledge(knowledge, { q: settings.graphQuery ?? "" });
  return (
    <div className="px-4 pb-5 sm:px-5" aria-label="Unified portfolio exploration">
      <div className="impact-toolbar mt-3 px-0">
        <label className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <span className="sr-only">Search unified graph</span>
          <input type="search" className="impact-input pl-10" placeholder="Search talks, articles, books, patents…" value={settings.graphQuery ?? ""} onChange={event => onSettings({ graphQuery: event.target.value })} />
        </label>
        <label><span className="sr-only">Graph view</span><select aria-label="Graph view" className="impact-input" value={view} onChange={event => onSettings({ view: event.target.value })}>{graphViews.map(value => <option key={value}>{value}</option>)}</select></label>
        <label><span className="sr-only">Unified graph domain</span><select aria-label="Unified graph domain" className="impact-input" value={selected} onChange={event => onSettings({ networkTopic: event.target.value, resource: "" })}><option value="">Entire portfolio</option>{networkTopics.map(domain => <option key={domain.id} value={domain.id}>{domain.title}</option>)}</select></label>
      </div>
      <PersonalKnowledgeGraph
        selected={selected}
        selectedResource={settings.resource ?? ""}
        onResource={resource => onSettings({ resource })}
        onSelect={networkTopic => {
          const impact = impactTopics.find(domain => impactTopicTags[domain.id]?.[0] === networkTopic);
          if (impact) onSettings({ networkTopic, resource: "", topic: impact.id });
          else onSettings({ networkTopic, resource: "" });
        }}
        items={items}
        onReset={() => onSettings({ networkTopic: "", resource: "", graphQuery: "", category: "" })}
        onBrowseKind={id => {
          const kind = knowledgeClassifiers.find(group => group.id === id)?.kind ?? "";
          void navigate({ to: "/knowledge", search: { kind, topic: selected } });
        }}
      />
      <p className="mt-4 font-mono text-[10px] text-muted-foreground">SUBJECT ASSOCIATIONS · NOT CITATIONS OR MEASURED INFLUENCE</p>
    </div>
  );
}
