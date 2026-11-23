import { memo, useEffect, useMemo, useState, useRef, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  MiniMap,
  Handle,
  Position,
  useNodesState,
  type Node,
  type NodeProps,
  type Edge,
  type ReactFlowInstance,
} from "@xyflow/react";
import {
  forceSimulation,
  forceManyBody,
  forceCollide,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from "d3-force";
import {
  ArrowUpRight,
  Maximize,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  House as GraphHome,
  Network,
  Pause,
  Play,
  Focus,
  Expand,
  Shrink,
  ArrowDownRight,
  Link2,
  ListTree,
  Search,
  X,
  ArrowLeft,
  Newspaper,
  FlaskConical,
  Mic,
  BookOpen,
  Clapperboard,
  ScrollText,
  Scale,
  Briefcase,
  FolderGit2,
  Download,
  type LucideIcon,
} from "lucide-react";
import { GraphDownloadButton } from "./GraphDownloadButton";
import { KnowledgeFlowEdge } from "./KnowledgeFlowEdge";
import { graphEdgeFlows } from "@/lib/graph-edge-motion";
import { useExplorerFullscreen, useEmbeddedExplorerFullscreen, ExplorerFullscreenButton } from "./ExplorerFullscreen";
import { Button } from "@/components/ui/button";
import { KnowledgeLink } from "./KnowledgeCards";
import { knowledge, type KnowledgeItem } from "@/data/knowledge";
import { workImpact, impactSizeTier, impactMethodology } from "@/data/work-impact";
import { graphVisualWeight } from "@/data/graph-emphasis";
import { useImpactChange } from "@/hooks/use-impact-change";
import { detailPresentation, impactCardDimensions, paneFocusNodeIds, type KnowledgeDetailView } from "@/lib/knowledge-detail-view";
import {
  networkTopics,
  networkMembership,
  networkResources,
  knowledgeNetworkEdges,
  groupKnowledge,
  connectedWork,
  knowledgeResourceEdges,
  focusedNetworkResources,
  focusedNetworkPositions,
} from "@/data/knowledge-network";

/** One recognizable icon per resource kind in the collection browser. */
const kindIcons: Record<string, LucideIcon> = {
  Article: Newspaper,
  Research: FlaskConical,
  Keynote: Mic,
  Book: BookOpen,
  Media: Clapperboard,
  Publication: ScrollText,
  Patent: Scale,
  "Case study": Briefcase,
  Project: FolderGit2,
  Download: Download,
  Resource: Link2,
};

type GraphNode = Node<
  {
    title: string;
    kind: string;
    count: number;
    breakdown: { label: string; count: number }[];
    type: "topic" | "resource" | "identity" | "category";
    tone: number;
    active: boolean;
    detail: boolean;
    inlineDetail: boolean;
    closeDetail: () => void;
    isCurrent: boolean;
    topTopic: boolean;
    goHome: () => void;
    item: KnowledgeItem | undefined;
    impact: ReturnType<typeof workImpact> | undefined;
    visualWeight: number;
  },
  "knowledge"
>;
const KnowledgeNode = memo(function KnowledgeNode({ data }: NodeProps<GraphNode>) {
  const score = data.impact?.score ?? null;
  const displayWeight = score ?? data.visualWeight;
  const cardDimensions = impactCardDimensions(displayWeight);
  const impactChanged = useImpactChange(score);
  return (
    <div
      data-kind={data.kind}
      data-impact-scored={score !== null ? "true" : undefined}
      data-visual-weight={data.type === "resource" ? displayWeight : undefined}
      style={data.type === "resource" ? { "--kn-impact-size": `${11 + displayWeight * .17}px`, "--kn-impact-card-width": `${cardDimensions.width}px`, "--kn-impact-card-height": `${cardDimensions.height}px` } as CSSProperties : undefined}
      className={`kn-node kn-${data.type} kn-tone-${data.tone} ${data.active ? "is-active" : ""} ${data.isCurrent ? "is-current" : ""} ${data.detail ? "kn-readable" : ""} ${data.inlineDetail ? "kn-inline-detail" : ""} ${impactSizeTier(displayWeight) ? `kn-standout kn-standout-${impactSizeTier(displayWeight)}` : ""} ${impactChanged ? "kn-impact-changed" : ""}`}
      title={data.impact ? `${data.title} · ${score === null && displayWeight > 0 ? "Illustrative visual emphasis · " : ""}Impact ${score === null ? "unscored" : `${score}/100`} · ${data.impact.coverage}/3 evidence dimensions` : undefined}
    >
      <Handle type="target" position={Position.Left} />
      {data.type === "resource" ? (
        data.inlineDetail && data.item ? (
          <article className="nodrag nopan nowheel w-full" aria-label="Expanded node details">
            <div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] text-brand">{data.kind}{data.item.year ? ` · ${data.item.year}` : ""}</span><Button variant="ghost" size="icon-sm" aria-label="Close node details" onClick={event => { event.stopPropagation(); data.closeDetail(); }}><X /></Button></div>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{data.title}</h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{data.item.summary}</p>
            <dl className="mt-4 space-y-2 text-xs"><dt className="text-muted-foreground">Source</dt><dd>{data.item.publisher}</dd><dt className="text-muted-foreground">Topics</dt><dd>{data.item.topics.join(" · ") || "Across the portfolio"}</dd>{data.item.technology.length > 0 && <><dt className="text-muted-foreground">Technology</dt><dd>{data.item.technology.join(" · ")}</dd></>}</dl>
            <KnowledgeLink item={data.item} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand">Open original work<ArrowUpRight className="size-4" /></KnowledgeLink>
          </article>
        ) : data.detail && data.item ? (
          <>
            <span className="kn-resource-dot" />
            <div className="min-w-0 flex-1">
              <span className="block font-mono text-[9px] uppercase text-muted-foreground">{data.kind}</span>
              <span className="mt-1 line-clamp-2 text-xs font-semibold leading-snug">{data.title}</span>
            </div>
            <span className="nodrag nopan" title={`Open ${data.title}`}>
              <KnowledgeLink item={data.item} className="kn-open-resource"><ArrowUpRight aria-hidden="true" /><span className="sr-only">Open {data.title}</span></KnowledgeLink>
            </span>
          </>
        ) : <>
          <span className="kn-resource-dot" />
          <span className="kn-node-preview">
            <span>{data.kind}</span>
            {data.title}
            {data.impact && <span>Impact {data.impact.score === null ? "unscored" : `${data.impact.score}/100`} · {data.impact.coverage}/3 evidence dimensions</span>}
          </span>
        </>
      ) : data.type === "category" ? (
        <>
          <span className="kn-topic-dot" />
          <span className="kn-topic-title">{data.title}</span>
          <span className="kn-topic-count">{data.count}<span className="kn-topic-count-label">works</span></span>
        </>
      ) : data.type === "identity" ? (
        <>
          <span className="kn-monogram" title="Show the full knowledge network">HV<Network className="kn-hv-action" aria-hidden="true" /></span>
          <span>Harsh Verma</span>
        </>
      ) : (
        <>
          <span className="kn-topic-dot" />
          <span className="kn-topic-title">{data.title}</span>
          <span className="kn-topic-count" title={`${data.count} linked works`}>{data.count}<span className="kn-topic-count-label">works</span></span>
          <span className="nodrag nopan nowheel"><button type="button" className="kn-topic-home" aria-label={`Back to graph home from ${data.title}`} title="Back to graph home" onClick={event => { event.stopPropagation(); data.goHome(); }}><ArrowLeft aria-hidden="true" /><span className="sr-only">Back to graph home</span></button></span>
          <ArrowUpRight className="kn-topic-arrow" aria-hidden="true" />
          <span className="kn-node-preview kn-topic-preview">
            <span>{data.breakdown.length} collections · {data.count} linked works</span>
            <strong>{data.title}</strong>
            <div className="kn-topic-preview-list">
              {data.breakdown.map((row) => <span key={row.label}>{row.label}<b>{row.count}</b></span>)}
            </div>
          </span>
        </>
      )}
      <Handle type="source" position={Position.Right} />
      {data.type === "resource" && <span className="sr-only" aria-live="polite">{impactChanged ? `Impact updated: ${score === null ? "unscored" : `${score} out of 100`}` : ""}</span>}
    </div>
  );
});
const nodeTypes = { knowledge: KnowledgeNode };
const edgeTypes = { knowledgeFlow: KnowledgeFlowEdge };
export function graphFilterNodes(selected: string, items: KnowledgeItem[], category = "") {
  const resources = networkResources(selected, items);
  const records = category ? groupKnowledge(resources).find(group => group.id === category)?.items ?? [] : resources;
  return new Set(["identity", ...(selected ? [selected] : records.flatMap(networkMembership)), ...records.map(item => item.id)]);
}
const topicPositions = [
  [-350, -240],
  [340, -220],
  [420, 140],
  [140, 380],
  [-300, 320],
  [-470, 35],
  [0, -420],
];
type LayoutPoint = SimulationNodeDatum & { id: string; targetX: number; targetY: number };
let cachedLayout: LayoutPoint[] | undefined;
function layoutNetwork() {
  if (cachedLayout) return cachedLayout;
  const points: LayoutPoint[] = knowledge.map((item, index) => {
    const memberships = networkMembership(item);
    const centers = memberships.map(
      (t) => topicPositions[networkTopics.findIndex((topic) => topic.id === t)] ?? [0, 0],
    );
    const targetX = centers.reduce((sum, p) => sum + (p[0] ?? 0), 0) / centers.length;
    const targetY = centers.reduce((sum, p) => sum + (p[1] ?? 0), 0) / centers.length;
    const angle = index * 2.399963;
    return {
      id: item.id,
      targetX,
      targetY,
      x: targetX + Math.cos(angle) * 110,
      y: targetY + Math.sin(angle) * 110,
    };
  });
  const anchors: LayoutPoint[] = networkTopics.map((topic, index) => {
    const [x = 0, y = 0] = topicPositions[index] ?? [];
    return { id: topic.id, targetX: x, targetY: y, x, y, fx: x, fy: y };
  });
  anchors.push({ id: "identity", targetX: 0, targetY: 0, x: 0, y: 0, fx: 0, fy: 0 });
  const simulation = forceSimulation([...points, ...anchors])
    .stop()
    .force("charge", forceManyBody().strength(-42))
    .force(
      "collision",
      forceCollide<LayoutPoint>().radius((p) => (p.fx == null ? impactSizeTier(workImpact(p.id).score ?? graphVisualWeight(p.id)) ? 64 : 40 : 130)),
    )
    .force("x", forceX<LayoutPoint>((p) => p.targetX).strength(0.09))
    .force("y", forceY<LayoutPoint>((p) => p.targetY).strength(0.09));
  simulation.tick(180);
  cachedLayout = [...points, ...anchors];
  return cachedLayout;
}

export function PersonalKnowledgeGraph({
  selected,
  onSelect,
  items,
  onReset,
  selectedResource = "",
  onResource,
  embedded = false,
  detailList = false,
  collection,
  onCollection,
}: {
  selected: string;
  onSelect: (topic: string, options?: { scroll: boolean }) => void;
  items: KnowledgeItem[];
  onReset: () => void;
  onBrowseKind: (id: string) => void;
  selectedResource?: string;
  onResource?: (id: string) => void;
  embedded?: boolean;
  detailList?: boolean;
  collection?: string;
  onCollection?: (id: string) => void;
}) {
  const explorer = useExplorerFullscreen();
  const embeddedExplorer = useEmbeddedExplorerFullscreen();
  const fullscreenOwner = embeddedExplorer ?? { fullscreen: explorer.fullscreen, toggle: () => void explorer.toggle() };
  const [readable, setReadable] = useState(false);
  const [detailView, setDetailView] = useState<KnowledgeDetailView>("nodes");
  const nodeView = detailList && detailView === "nodes";
  const [entryExpanded, setEntryExpanded] = useState(false);
  const [catMode, setCatMode] = useState(false);
  const [graphSearch, setGraphSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState(0);
  const searchMatches = useMemo(() => {
    const words = graphSearch.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    const topics = networkTopics.filter(topic => words.every(word => `${topic.id} ${topic.title}`.toLowerCase().includes(word))).map(topic => ({ id: topic.id, title: topic.title, type: "topic" as const, detail: `${networkResources(topic.id).length} linked works` }));
    const works = knowledge.filter(item => words.every(word => `${item.title} ${item.kind} ${item.topics.join(" ")}`.toLowerCase().includes(word))).slice(0, 6).map(item => ({ id: item.id, title: item.title, type: "resource" as const, detail: item.kind }));
    return [...topics, ...works].slice(0, 8);
  }, [graphSearch]);
  const [localCategory, setLocalCategory] = useState("");
  const category = collection ?? localCategory;
  const setCategory = (id: string) => { setLocalCategory(id); onCollection?.(id); };
  const [miniMapTarget, setMiniMapTarget] = useState<HTMLDivElement | null>(null);
  const sourceListRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [crossFormat, setCrossFormat] = useState(false);
  const [flow, setFlow] = useState<ReactFlowInstance<GraphNode> | null>(null);
  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    let intersecting = true;
    const syncVisible = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry?.isIntersecting ?? false;
      syncVisible();
    });
    observer.observe(element);
    const visibility = syncVisible;
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (!flow) return;
    let timer = 0;
    const fit = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => void flow.fitView({ padding: 0.12 }), 180);
    };
    window.addEventListener("resize", fit);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", fit);
    };
  }, [flow]);
  useEffect(() => {
    const timer = window.setTimeout(
      () => void flow?.fitView({ padding: 0.12, duration: reducedMotion ? 0 : 500 }),
      200,
    );
    return () => window.clearTimeout(timer);
  }, [expanded, explorer.fullscreen, flow, reducedMotion]);
  const [localResourceId, setLocalResourceId] = useState("");
  const resourceId = onResource ? selectedResource : localResourceId;
  const setResourceId = (id: string) => {
    setLocalResourceId(id);
    onResource?.(id);
  };
  const resetRef = useRef<() => void>(() => {});
  const positions = useMemo(layoutNetwork, []);
  const itemKey = items.map(item => item.id).join("|");
  const stableItems = useMemo(() => {
    const ids = new Set(itemKey.split("|"));
    return knowledge.filter(item => ids.has(item.id));
  }, [itemKey]);
  const matching = useMemo(() => new Set(stableItems.map((item) => item.id)), [stableItems]);
  const resources = useMemo(() => networkResources(selected, stableItems), [selected, stableItems]);
  const grouped = useMemo(() => groupKnowledge(resources), [resources]);
  const shownGroups = category ? grouped.filter(group => group.id === category) : grouped;
  const categoryIds = useMemo(() => new Set(grouped.find(group => group.id === category)?.items.map(item => item.id) ?? []), [grouped, category]);
  useEffect(() => { if (!detailList) setLocalCategory(""); }, [selected, resourceId, detailList]);
  const browseCategory = (id: string) => {
    setCategory(category === id ? "" : id);
    sourceListRef.current?.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  };
  const resource = knowledge.find((item) => item.id === resourceId);
  useEffect(() => setEntryExpanded(detailList && Boolean(resourceId)), [resourceId, detailList, detailView]);
  const presentation = detailPresentation(detailView, Boolean(resource), entryExpanded);
  const relatedWorks = resource ? connectedWork(resource.id) : [];
  const activeTopic = networkTopics.find((topic) => topic.id === selected);
  const focusId = resource?.id || selected;
  const overview = nodeView || (detailList && !readable && !resource);
  const filtering = Boolean(selected || category || items.length !== knowledge.length);
  const overviewIds = useMemo(() => graphFilterNodes(selected, stableItems, category), [selected, stableItems, category]);
  const detailed = !nodeView && Boolean(readable || resource || (!detailList && filtering));
  const scopedResources = useMemo(() => focusedNetworkResources(selected, stableItems, resourceId), [selected, stableItems, resourceId]);
  const scopedIds = useMemo(() => new Set(scopedResources.map(item => item.id)), [scopedResources]);
  const focusedPositions = useMemo(() => new Map(focusedNetworkPositions(scopedResources).map(point => [point.id, { ...point, x: point.x * 1.25, y: point.y * 1.3 }])), [scopedResources]);
  const topicIds = useMemo(() => new Set(scopedResources.flatMap(item => networkMembership(item))), [scopedResources]);
  const connected = useMemo(() => {
    const ids = new Set<string>();
    if (focusId) {
      ids.add(focusId);
      knowledgeNetworkEdges.forEach((edge) => {
        if (edge.source === focusId || edge.target === focusId) {
          ids.add(edge.source);
          ids.add(edge.target);
        }
      });
      if (knowledge.some(item => item.id === focusId)) {
        connectedWork(focusId).forEach(connection => ids.add(connection.item.id));
      }
    }
    return ids;
  }, [focusId]);
  // The three busiest domains read as the largest topics, so they blink and sit wider.
  const topTopicIds = useMemo(
    () => new Set([...networkTopics].sort((a, b) => networkResources(b.id).length - networkResources(a.id).length).slice(0, 3).map((topic) => topic.id)),
    [],
  );
  const baseNodes = useMemo<GraphNode[]>(    () =>
      positions.filter(point => overview ? overviewIds.has(point.id) : !detailed || point.id === "identity" || scopedIds.has(point.id) || topicIds.has(point.id)).map((point) => {
        const item = knowledge.find((r) => r.id === point.id);
        const topic = networkTopics.find((t) => t.id === point.id);
        const tone =
          topic?.tone ??
          networkTopics.find((t) => t.id === networkMembership(item ?? { topics: [] })[0])?.tone ??
          0;
        const type = item ? "resource" : topic ? "topic" : "identity";
        const focusedPosition = focusedPositions.get(point.id);
        const focusedTopics = networkTopics.filter(t => topicIds.has(t.id));
        const topicIndex = focusedTopics.findIndex(t => t.id === point.id);
        return {
          id: point.id,
          type: "knowledge",
          position: detailed
            ? focusedPosition ? { x: focusedPosition.x, y: focusedPosition.y }
              : { x: topic ? (topicIndex % 3) * 260 : -160, y: topic ? -140 - Math.floor(topicIndex / 3) * 65 : -110 }
            : { x: point.x ?? 0, y: point.y ?? 0 },
          data: {
            title: item?.title ?? topic?.title ?? "Harsh Verma",
            kind: item?.kind ?? "",
            count: topic ? networkResources(topic.id).length : knowledge.length,
            breakdown: topic ? groupKnowledge(networkResources(topic.id)).map((group) => ({ label: group.title, count: group.items.length })) : [],
            type,
            tone,
            active: overview && filtering ? point.id !== "identity" : connected.has(point.id),
            detail: detailed && type === "resource",
            inlineDetail: nodeView && presentation.inline && point.id === resourceId,
            closeDetail: () => setEntryExpanded(false),
            isCurrent: type === "topic" && point.id === selected,
            topTopic: type === "topic" && topTopicIds.has(point.id),
            goHome: () => resetRef.current(),
            item,
            impact: item ? workImpact(item.id) : undefined,
            visualWeight: item ? graphVisualWeight(item.id) : 0,
          },
          ariaLabel: item
            ? `${item.kind}: ${item.title}`
            : topic ? `Explore ${topic.title}` : "Show full knowledge network",
          className: `${detailList && resourceId && point.id !== resourceId ? "kn-dim" : ""} ${category && item ? categoryIds.has(item.id) ? "kn-category-match" : "kn-category-muted" : ""} ${!detailed && focusId && !connected.has(point.id) && type !== "identity" ? "kn-dim" : ""} ${!detailed && item && !matching.has(item.id) && !connected.has(item.id) ? "kn-filtered" : ""} ${type === "topic" && topTopicIds.has(point.id) ? "kn-top-topic" : ""}`,
        };
      }),
    [positions, connected, focusId, matching, detailed, scopedIds, focusedPositions, topicIds, category, categoryIds, detailList, resourceId, overview, overviewIds, filtering, nodeView, presentation.inline, selected, topTopicIds],
  );
  const categoryLayer = catMode && nodeView && Boolean(selected);
  useEffect(() => { setCatMode(false); }, [selected]);
  const initial = useMemo<GraphNode[]>(() => {
    if (!categoryLayer) return baseNodes;
    const topicNode = baseNodes.find(node => node.id === selected);
    if (!topicNode) return baseNodes;
    const byId = new Map(baseNodes.map(node => [node.id, node]));
    const out: GraphNode[] = [{ ...topicNode, position: { x: 0, y: 0 }, className: `${topicNode.className ?? ""} kn-layer-in` }];
    grouped.forEach((group, gi) => {
      const angle = (gi / grouped.length) * Math.PI * 2 - Math.PI / 2;
      const cx = Math.cos(angle) * 360, cy = Math.sin(angle) * 300;
      out.push({ ...topicNode, id: `cat:${group.id}`, position: { x: cx, y: cy }, ariaLabel: `Show ${group.title}`,
        style: { ["--kn-delay" as string]: `${gi * 80}ms` },
        className: `kn-layer-in ${category === group.id ? "kn-category-current" : ""}`,
        data: { ...topicNode.data, type: "category", title: group.title, count: group.items.length, tone: (topicNode.data.tone + gi + 1) % 6, isCurrent: category === group.id, topTopic: false } });
      group.items.forEach((item, ii) => {
        const base = byId.get(item.id); if (!base) return;
        const spread = Math.min(1.6, .35 * group.items.length);
        const a = angle + (group.items.length > 1 ? (ii / (group.items.length - 1) - .5) * spread : 0);
        const r = 150 + (ii % 2) * 45;
        out.push({ ...base, position: { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }, style: { ["--kn-delay" as string]: `${200 + gi * 80 + ii * 15}ms` },
          className: `${base.className ?? ""} kn-layer-in ${category && category !== group.id ? "kn-category-muted" : ""}`, data: { ...base.data, tone: (topicNode.data.tone + gi + 1) % 6 } });
      });
    });
    return out;
  }, [categoryLayer, baseNodes, selected, grouped, category]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initial);
  useEffect(() => {
    if (!flow || !selected) return;
    const timer = window.setTimeout(() => void flow.fitView({ padding: 0.12, duration: reducedMotion ? 0 : 700 }), 260);
    return () => window.clearTimeout(timer);
  }, [categoryLayer, flow, reducedMotion, selected]);
  const layoutKey = `${categoryLayer}:${selected}:${resourceId}:${detailed}:${scopedResources.map(item => item.id).join(",")}`;
  const previousLayout = useRef(layoutKey);
  useEffect(() => {
    const preserve = previousLayout.current === layoutKey;
    previousLayout.current = layoutKey;
    setNodes(previous => initial.map(node => preserve ? { ...node, position: previous.find(existing => existing.id === node.id)?.position ?? node.position } : node));
  }, [initial, setNodes, layoutKey]);
  const edges = useMemo<Edge[]>(
    () => {
      const ids = new Set(initial.map(node => node.id));
      const base: Edge[] = [
      ...knowledgeNetworkEdges.map((edge) => ({
        ...edge,
        type: "straight",
        className: `kn-edge kn-tone-${networkTopics.find(topic => topic.id === edge.source)?.tone ?? 0} ${overview && filtering ? "is-active" : category ? categoryIds.has(edge.target) || categoryIds.has(edge.source) ? "is-active" : "is-dim" : focusId && (edge.source === focusId || edge.target === focusId) ? "is-active" : focusId ? "is-dim" : ""}`,
      })),
      ...(crossFormat && !resource ? knowledgeResourceEdges.map(edge => ({
        ...edge,
        type: "straight",
        className: `kn-edge kn-related-edge ${overview && filtering ? "is-active" : ""}`,
      })) : []),
      ...(resource ? connectedWork(resource.id).map(connection => ({
        id: `focus:${resource.id}:${connection.item.id}`,
        source: resource.id,
        target: connection.item.id,
        type: "straight",
        className: "kn-edge kn-related-edge is-active",
      })) : []),
      ...networkTopics.map((topic) => ({
        id: `identity:${topic.id}`,
        source: "identity",
        target: topic.id,
        type: "straight",
        className: `kn-edge kn-spoke kn-tone-${topic.tone} ${overview && filtering || selected === topic.id ? "is-active" : selected || category ? "is-dim" : ""}`,
      })),
    ].filter(edge => ids.has(edge.source) && ids.has(edge.target));
      const output: Edge[] = categoryLayer ? grouped.flatMap((group, gi) => [
        { id: `tc:${group.id}`, source: selected, target: `cat:${group.id}`, type: "straight", className: `kn-edge kn-layer-edge kn-tone-${(gi + 1) % 6} ${!category || category === group.id ? "is-active" : "is-dim"}` },
        ...group.items.filter(item => ids.has(item.id)).map(item => ({ id: `ce:${group.id}:${item.id}`, source: `cat:${group.id}`, target: item.id, type: "straight", className: `kn-edge kn-layer-edge ${category === group.id ? "is-active" : category ? "is-dim" : ""}` })),
      ]) : base;
      return output.map(edge => {
        const target = initial.find(node => node.id === edge.target);
        const highlighted = edge.className?.includes("is-active") === true;
        const standout = target?.data.type === "resource" && impactSizeTier(target.data.impact?.score ?? target.data.visualWeight) > 0;
        const spoke = edge.source === "identity";
        return { ...edge, type: "knowledgeFlow", data: { flowing: !paused && visible && !reducedMotion && graphEdgeFlows({ spoke, dimmed: edge.className?.includes("is-dim") === true, highlighted, standout }) },
          className: `${edge.className ?? ""} kn-directional ${spoke ? "kn-colored-spoke" : ""} ${target ? `kn-tone-${target.data.tone}` : ""}` };
      });
    },
    [categoryLayer, grouped, focusId, resource, crossFormat, initial, category, categoryIds, selected, overview, filtering, paused, visible, reducedMotion],
  );
  const chooseTopic = (topic: string) => {
    setResourceId("");
    setEntryExpanded(false);
    onSelect(topic === selected ? "" : topic, { scroll: false });
  };
  const reset = () => {
    setCatMode(false);
    setReadable(false);
    setCategory("");
    setResourceId("");
    onReset();
    setNodes(initial);
    void flow?.fitView({ padding: 0.12 });
  };
  resetRef.current = reset;
  const moving = !paused && visible && !reducedMotion;
  useEffect(() => {
    if (!flow) return;
    if (detailList && resourceId) return;
    const timer = window.setTimeout(() => {
      if (filtering && !resourceId) {
        const ids = overview ? [...overviewIds] : category ? [...categoryIds, ...(selected ? [selected] : [])] : [selected, ...resources.map((item) => item.id)];
        void flow.fitView({ nodes: ids.map((id) => ({ id })), padding: 0.22, duration: reducedMotion ? 0 : 650, maxZoom: 1.2 });
      } else {
        void flow.fitView({ padding: 0.18, duration: reducedMotion ? 0 : 450, maxZoom: 1.1 });
      }
    }, 900);
    return () => window.clearTimeout(timer);
  }, [flow, selected, resourceId, items.length, readable, reducedMotion, detailList, resources, category, categoryIds, overview, overviewIds, filtering]);
  useEffect(() => {
    if (!detailList || !resourceId || !flow) return;
    const timer = window.setTimeout(() => {
      const node = flow.getNode(resourceId);
      const stage = stageRef.current;
      if (!node || !stage) return;
      if (nodeView && presentation.inline) {
        const zoom = presentation.inline ? Math.min(1.15, (stage.clientWidth - 48) / 340, (stage.clientHeight - 180) / 460) : 1.8;
        void flow.setCenter(node.position.x, node.position.y - 20 / zoom, { zoom: Math.max(.2, zoom), duration: reducedMotion ? 0 : 650 });
        return;
      }
      const zoom = stage.clientWidth < 640 ? 1 : 1.25;
      const centerX = node.position.x;
      const centerY = node.position.y;
      void flow.setCenter(centerX - (stage.clientWidth < 640 ? 0 : stage.clientWidth * .23 / zoom), centerY + (stage.clientWidth < 640 ? stage.clientHeight * .2 / zoom : 0), { zoom, duration: reducedMotion ? 0 : 750 });
    }, 320);
    return () => window.clearTimeout(timer);
  }, [resourceId, flow, detailList, reducedMotion, nodeView, presentation.inline]);
  const prepareDownload = async () => {
    const viewport = flow?.getViewport();
    if (flow) await flow.fitView({ padding: .12, duration: 0 });
    await new Promise(resolve => window.setTimeout(resolve, 120));
    return async () => { if (flow && viewport) await flow.setViewport(viewport, { duration: 0 }); };
  };
  const focusCluster = () => {
    const ids = resource
      ? [resource.id, ...relatedWorks.map(connection => connection.item.id), ...networkMembership(resource)]
      : overview
      ? [...overviewIds]
      : selected
      ? [selected, ...resources.map((item) => item.id)]
      : nodes.map((node) => node.id);
    void flow?.fitView({
      nodes: ids.map((id) => ({ id })),
      padding: 0.25,
      duration: reducedMotion ? 0 : 650,
      maxZoom: 1.3,
    });
  };
  const jumpToMatch = (match: (typeof searchMatches)[number]) => {
    setSearchOpen(false);
    setGraphSearch(match.title);
    setCategory("");
    if (match.type === "topic") { setResourceId(""); onSelect(match.id, { scroll: false }); }
    else setResourceId(match.id);
  };
  const listLayer = entryExpanded && resource ? 5 : resource ? 4 : category ? 3 : selected ? 2 : 1;
  const listBack = () => {
    if (entryExpanded) setEntryExpanded(false);
    else if (resource) setResourceId("");
    else if (category) setCategory("");
    else { setReadable(false); onSelect("", { scroll: false }); }
  };
  const hoverResource = useRef("");
  const hoverTopic = useRef("");
  const wheelAmount = useRef(0);
  const wheelTime = useRef(0);
  const zoomDetailIn = (target?: { resource?: string; topic?: string; topicDistance?: number }) => {
    const topic = target?.topic || hoverTopic.current;
    const resourceHit = target?.resource || hoverResource.current;
    const nearTopic = target?.topicDistance != null && target.topicDistance < 150;
    if (detailList && topic && !resourceId && topic !== selected && (nearTopic || !resourceHit)) {
      setEntryExpanded(false);
      setReadable(true);
      chooseTopic(topic);
      return;
    }
    const id = resourceHit || resourceId;
    if (detailList && id) { setResourceId(id); setEntryExpanded(true); }
    else void flow?.zoomIn({ duration: reducedMotion ? 0 : 350 });
  };
  const zoomDetailOut = () => {
    if (detailList && listLayer > 1) listBack();
    void flow?.zoomOut({ duration: reducedMotion ? 0 : 450 });
  };
  useEffect(() => {
    const element = stageRef.current;
    if (!element || !detailList) return;
    const wheel = (event: WheelEvent) => {
      if (!(event.ctrlKey || event.metaKey || hoverResource.current || hoverTopic.current || entryExpanded || resourceId || selected || category)) return;
      if (event.target instanceof Element && event.target.closest('.kn-entry-detail, .kn-inline-detail') && !(event.ctrlKey || event.metaKey)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1);
      event.preventDefault();
      wheelAmount.current += delta;
      if (Math.abs(wheelAmount.current) < 100 || Date.now() - wheelTime.current < 800) return;
      const inward = wheelAmount.current < 0;
      wheelAmount.current = 0;
      wheelTime.current = Date.now();
      if (inward) {
        const nodeElement = event.target instanceof Element ? event.target.closest('.react-flow__node') : null;
        const targetId = nodeElement?.getAttribute('data-id') ?? "";
        const directTopic = networkTopics.some(t => t.id === targetId) ? targetId : "";
        let topic = "";
        let topicDistance = Infinity;
        if (flow && !directTopic) {
          const point = flow.screenToFlowPosition({ x: event.clientX, y: event.clientY });
          networkTopics.forEach(t => {
            const node = flow.getNode(t.id);
            if (!node) return;
            const distance = Math.hypot(point.x - node.position.x, point.y - node.position.y);
            if (distance < topicDistance) { topicDistance = distance; topic = t.id; }
          });
        }
        zoomDetailIn({
          ...(targetId && knowledge.some(item => item.id === targetId) ? { resource: targetId } : {}),
          ...((directTopic || topic) ? { topic: directTopic || topic, topicDistance: directTopic ? 0 : topicDistance } : {}),
        });
      } else zoomDetailOut();
    };
    element.addEventListener('wheel', wheel, { passive: false });
    return () => element.removeEventListener('wheel', wheel);
  });
  return (
    <ReactFlowProvider>
    <div
      ref={explorer.ref}
      className={`knowledge-network ${explorer.fullscreen ? "explorer-fullscreen kn-fullscreen" : ""} mt-8 overflow-hidden rounded-lg border border-border ${moving ? "kn-motion" : ""} ${expanded ? "kn-expanded" : ""} ${detailed ? "kn-focused" : ""}`}
      aria-labelledby="knowledge-network-heading"
      data-graph-layout={overview ? "connected-dots" : "readable"}
      data-detail-view={detailView}
      onClick={(event) => {
        if (!entryExpanded) return;
        const target = event.target as Element;
        if (target.closest(".kn-entry-detail, button, a, input, .react-flow__node")) return;
        setEntryExpanded(false);
      }}
    >
      <div className="kn-header flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="font-mono text-[10px] text-muted-foreground">
            HARSH VERMA / CONNECTED KNOWLEDGE
          </p>
          <h2 id="knowledge-network-heading" className="mt-1 font-display text-xl font-semibold">
            {detailList ? "Detail View" : "Unified AI Knowledge Graph"}
          </h2>
          <details className="mt-2 max-w-xl text-xs text-muted-foreground"><summary className="cursor-pointer text-foreground">Impact evidence · {knowledge.filter(item => workImpact(item.id).score !== null).length}/{knowledge.length} works scored</summary><p className="mt-2 leading-relaxed">{impactMethodology}</p></details>
          <p className="mt-2 text-xs text-muted-foreground">Illustrative highlights · visual emphasis, not measured impact.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3"><span className="kn-header-inventory font-mono text-xs text-muted-foreground">
          {knowledge.length} resources · {networkTopics.length} domains · {knowledgeResourceEdges.length} cross-format links
        </span>{!embedded && <ExplorerFullscreenButton fullscreen={explorer.fullscreen} toggle={() => void explorer.toggle()} />}</div>
      </div>
      {detailList && <nav className="knowledge-list-layers" aria-label="Detail list layers">
        <Button variant="ghost" size="icon-sm" disabled={listLayer === 1} aria-label="Back one detail layer" onClick={listBack}><ArrowLeft /></Button>
        {["Connected dots", "Topic lists", "Category entries", "Entry focus", "Full detail"].map((label, index) => <Button key={label} variant="ghost" size="sm" aria-current={listLayer === index + 1 ? "step" : undefined} disabled={index + 1 > listLayer} onClick={() => {
          if (index === 0) reset();
          else if (index === 1) { setResourceId(""); setCategory(""); }
          else if (index === 2) setResourceId("");
          else if (index === 3) setEntryExpanded(false);
        }}><span className="font-mono">0{index + 1}</span><span>{label}</span></Button>)}
      </nav>}
      <div className="kn-search-toolbar relative border-b border-border px-5 py-3">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
          <input role="combobox" aria-label="Search graph topics and work" aria-autocomplete="list" aria-expanded={searchOpen && Boolean(graphSearch)} aria-controls="graph-search-results" aria-activedescendant={searchOpen && searchMatches[searchIndex] ? `graph-search-${searchIndex}` : ""} value={graphSearch} placeholder="Jump to a topic, article, talk or publication…" className="impact-input pl-10 pr-10" onFocus={() => setSearchOpen(true)} onBlur={() => setSearchOpen(false)} onChange={event => { setGraphSearch(event.target.value); setSearchOpen(true); setSearchIndex(0); }} onKeyDown={event => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setSearchOpen(true); setSearchIndex(index => Math.max(0, Math.min(searchMatches.length - 1, index + (event.key === "ArrowDown" ? 1 : -1)))); }
            if (event.key === "Enter") { const match = searchMatches[searchIndex]; if (match) { event.preventDefault(); jumpToMatch(match); } }
            if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); setSearchOpen(false); }
          }} />
          {graphSearch && <Button variant="ghost" size="icon-xs" title="Clear graph search" aria-label="Clear graph search" className="absolute right-2 top-2" onClick={() => { setGraphSearch(""); setSearchOpen(false); }}><X /></Button>}
          {searchOpen && graphSearch && <div id="graph-search-results" role="listbox" aria-label="Graph matches" className="kn-search-results absolute inset-x-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground">
            {searchMatches.map((match, index) => <Button key={match.id} id={`graph-search-${index}`} role="option" aria-selected={index === searchIndex} variant={index === searchIndex ? "secondary" : "ghost"} className="h-auto min-h-12 w-full justify-start whitespace-normal py-3 text-left" onMouseDown={event => event.preventDefault()} onClick={() => jumpToMatch(match)}>{match.type === "topic" ? <Network /> : <ArrowUpRight />}<span className="min-w-0"><span className="line-clamp-2 block text-xs font-semibold">{match.title}</span><span className="mt-1 block text-[10px] text-muted-foreground">{match.detail}</span></span></Button>)}
            {!searchMatches.length && <p role="status" className="p-3 text-sm text-muted-foreground">No matching topics or work.</p>}
          </div>}
        </div>
      </div>
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <div ref={stageRef} className={`kn-stage relative ${presentation.popup ? "kn-entry-expanded" : ""}`} aria-label="Personal knowledge network">
            <AnimatePresence>
              {presentation.popup && resource && <motion.article key={resource.id} className="kn-entry-detail" aria-label="Full entry details" initial={reducedMotion ? false : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: .4 }}>
                <div className="flex items-center justify-between gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEntryExpanded(false)}><ArrowLeft />Back to entry</Button>
                  <Button variant="ghost" size="icon-sm" aria-label="Close entry details" title="Close entry details" onClick={() => setEntryExpanded(false)}><X /></Button>
                </div>
                <p className="mt-2 font-mono text-[11px] text-brand">{resource.kind}{resource.year ? ` · ${resource.year}` : ""}</p>
                <h3 className="mt-1 line-clamp-3 font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">{resource.title}</h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{resource.summary}</p>
                <dl className="kn-detail-facts mt-3 text-xs">
                  <dt>Source</dt><dd>{resource.publisher}</dd>
                  <dt>Topics</dt><dd>{resource.topics.join(" · ") || "Across the portfolio"}</dd>
                  {resource.technology.length > 0 && <><dt>Technology</dt><dd>{resource.technology.join(" · ")}</dd></>}
                </dl>
                <KnowledgeLink item={resource} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand">Open original work<ArrowUpRight className="size-3.5" /></KnowledgeLink>
              </motion.article>}
            </AnimatePresence>
            <div className="kn-stage-caption pointer-events-none absolute left-5 top-5 z-10 rounded-xl border border-border bg-background/85 px-3 py-2 backdrop-blur-sm">
              <p className="font-mono text-[9px] uppercase text-muted-foreground">
                {activeTopic || category ? "DOMAIN IN FOCUS" : "THE CONNECTED PORTFOLIO"}
              </p>
              <p className="mt-0.5 text-sm font-semibold">
                {resource ? resource.kind + " / Connected work" : [activeTopic?.title, shownGroups.find(group => group.id === category)?.title].filter(Boolean).join(" / ") || "Ideas without silos."}
              </p>
            </div>
            <div className="absolute right-4 top-4 z-10 flex gap-1 rounded-xl border border-border bg-background p-1">
              <GraphDownloadButton svg getElement={() => stageRef.current} filename={`harsh-verma-detail-graph${selected ? `-${selected}` : ""}`} prepare={prepareDownload} />
              <Button variant="ghost" size="icon-sm" aria-label={fullscreenOwner.fullscreen ? "Exit full screen" : "Enter full screen"} title={fullscreenOwner.fullscreen ? "Exit full screen" : "Enter full screen"} aria-pressed={fullscreenOwner.fullscreen} onClick={() => fullscreenOwner.toggle()}>{fullscreenOwner.fullscreen ? <Minimize2 /> : <Maximize2 />}</Button>
              {!detailList && <Button variant="ghost" size="icon-sm" title="Readable resource map" aria-label="Readable resource map" aria-pressed={readable} onClick={() => setReadable(value => !value)}><ListTree /></Button>}
              <Button variant="ghost" size="icon-sm" title="Cross-format connections" aria-label="Cross-format connections" aria-pressed={crossFormat} onClick={() => setCrossFormat(value => !value)}><Link2 /></Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={expanded ? "Compact graph" : "Expand graph"}
                title={expanded ? "Compact graph" : "Expand graph"}
                onClick={() => setExpanded((value) => !value)}
              >
                {expanded ? <Shrink /> : <Expand />}
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={paused ? "Resume graph animation" : "Pause graph animation"}
                title={paused ? "Resume graph animation" : "Pause graph animation"}
                aria-pressed={paused}
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? <Play /> : <Pause />}
              </Button>
            </div>
            <ReactFlow<GraphNode>
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodesChange={onNodesChange}
              onPaneClick={() => {
                setEntryExpanded(false);
                setResourceId("");
                const focus = paneFocusNodeIds({ selected, category, resourceIds: resources.map((item) => item.id), categoryIds });
                window.setTimeout(() => {
                  const present = new Set((flow?.getNodes() ?? []).map((node) => node.id));
                  const targets = (focus ?? []).filter((id) => present.has(id));
                  if (targets.length) {
                    void flow?.fitView({ nodes: targets.map((id) => ({ id })), padding: 0.22, duration: reducedMotion ? 0 : 650, maxZoom: 1.2 });
                  } else {
                    void flow?.fitView({ padding: 0.18, duration: reducedMotion ? 0 : 500, maxZoom: 1.1 });
                  }
                }, 350);
              }}
              onNodeMouseEnter={(_, node) => {
                hoverResource.current = node.data.type === "resource" ? node.id : "";
                hoverTopic.current = node.data.type === "topic" ? node.id : "";
              }}
              onNodeMouseLeave={() => { hoverResource.current = ""; hoverTopic.current = ""; }}
              onInit={setFlow}
              onNodeClick={(event, node) => {
                if (event.target instanceof Element && event.target.closest("a, button, summary")) return;
                if (node.data.type === "resource") {
                  setResourceId(node.id);
                  if (detailList) setEntryExpanded(true);
                } else if (node.data.type === "identity") reset();
                else if (node.data.type === "category") {
                  setResourceId("");
                  const id = node.id.slice(4);
                  setCategory(category === id ? "" : id);
                } else if (nodeView && node.id === selected) {
                  setResourceId("");
                  setCategory("");
                  setCatMode(value => !value);
                } else {
                  setResourceId("");
                  setEntryExpanded(false);
                  setCategory("");
                  setReadable(true);
                  onSelect(node.id, { scroll: false });
                }
              }}
              nodeOrigin={[0.5, 0.5]}
              fitView
              fitViewOptions={{ padding: 0.12 }}
              minZoom={0.12}
              maxZoom={3}
              nodesConnectable={false}
              deleteKeyCode={null}
              zoomOnScroll={explorer.fullscreen}
              onNodeDoubleClick={(_, node) => {
                void flow?.fitView({ nodes: [{ id: node.id }], padding: 0.6, maxZoom: 1.8, duration: reducedMotion ? 0 : 350 });
              }}
              zoomOnPinch
              panOnDrag
              nodesDraggable
              nodeDragThreshold={6}
              onlyRenderVisibleElements={false}
              preventScrolling={false}
              proOptions={{ hideAttribution: true }}
            >
              <Background gap={28} size={1} />
              {miniMapTarget && createPortal(<MiniMap className="kn-minimap kn-panel-minimap" pannable zoomable ariaLabel="Graph overview" nodeClassName={node => `kn-map-tone-${node.data['tone']}`} />, miniMapTarget)}
            </ReactFlow>
            <div className="absolute bottom-4 right-4 z-30 flex gap-1 rounded-xl border border-border bg-background p-1">
              <Button
                variant="ghost"
                size="icon-sm"
                title="Zoom in"
                aria-label="Zoom in"
                onClick={() => zoomDetailIn()}
              >
                <Plus />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                title="Zoom out"
                aria-label="Zoom out"
                onClick={zoomDetailOut}
              >
                <Minus />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                title="Fit graph"
                aria-label="Fit graph"
                onClick={() => void flow?.fitView({ padding: 0.12 })}
              >
                <Maximize />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                title="Focus selected domain"
                aria-label="Focus selected domain"
                onClick={focusCluster}
              >
                <Focus />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                title="Graph home"
                aria-label="Graph home"
                onClick={reset}
              >
                <GraphHome />
              </Button>
            </div>
            <div className="kn-stage-inventory pointer-events-none absolute bottom-6 right-5 font-mono text-[10px] text-muted-foreground">
              <span className="text-stat-number">{resources.length}</span> resources /{" "}
              <span className="text-stat-number">{grouped.length}</span> collections
            </div>
          </div>
          <div
            className="kn-topic-strip flex flex-wrap gap-1.5 border-t border-border p-4"
            aria-label="Knowledge graph topics"
          >
            {networkTopics.map((topic) => (
              <Button
                key={topic.id}
                variant={selected === topic.id ? "secondary" : "ghost"}
                size="sm"
                aria-pressed={selected === topic.id}
                onClick={() => chooseTopic(topic.id)}
                className={`kn-legend kn-tone-${topic.tone}`}
              >
                <span className="kn-topic-dot" />
                {topic.title}
              </Button>
            ))}
          </div>
          {detailList && <div className="kn-viewbar flex flex-wrap items-center gap-1 px-5 pb-4 pt-1" role="group" aria-label="Detail View presentation">
            {(["nodes", "cards"] as const).map(view => <Button key={view} variant={detailView === view ? "secondary" : "ghost"} size="sm" aria-pressed={detailView === view} onClick={() => { setDetailView(view); setReadable(view === "cards" && Boolean(selected || category || resourceId)); }}>{view === "nodes" ? <Network /> : <ListTree />}{view === "nodes" ? "Node View" : "Card View"}</Button>)}
          </div>}
        </div>
        <aside
          className="kn-details min-w-0 border-t border-border p-5 lg:border-l lg:border-t-0"
          aria-label="Connected knowledge details"
        >
          {resource && !nodeView ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="mb-4 px-0"
                onClick={() => setResourceId("")}
              >
                ← Connected resources
              </Button>
              <p className="font-mono text-[10px] uppercase text-muted-foreground">
                {resource.kind} · {resource.publisher}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">{resource.title}</h3>
              {detailList && <Button variant="outline" size="sm" className="mt-4" onClick={() => setEntryExpanded(true)}><Expand />Full entry details</Button>}
              <div ref={setMiniMapTarget} className="kn-panel-overview mt-4" />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {resource.summary}
              </p>
              <KnowledgeLink
                item={resource}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand"
              >
                {resource.kind === "Download" ? "Download resource" : "Explore resource"}
                <ArrowUpRight className="size-4" />
              </KnowledgeLink>
              <div className="mt-6 flex flex-wrap gap-2">
                {networkMembership(resource).map((topic) => (
                  <Button
                    key={topic}
                    size="sm"
                    variant="outline"
                    className="h-auto whitespace-normal py-2"
                    onClick={() => chooseTopic(topic)}
                  >
                    {networkTopics.find((t) => t.id === topic)?.title}
                  </Button>
                ))}
              </div>
              <div className="mt-7 border-t border-border pt-5" aria-label="Related graph resources">
                <p className="font-mono text-[10px] uppercase text-muted-foreground">Shared-topic connections / {relatedWorks.length}</p>
                <div className="mt-3 space-y-2">
                  {groupKnowledge(relatedWorks.map(connection => connection.item)).map(group => (
                    <div key={group.id} className="border-b border-border pb-3">
                      <p className="mb-2 text-xs font-semibold">{group.title} · {group.items.length}</p>
                      {group.items.map(item => (
                        <KnowledgeLink key={item.id} item={item} className="kn-source-direct flex w-full items-center gap-2 py-2 text-left">
                          <span className="min-w-0"><span className="line-clamp-2 block text-xs">{item.title}</span><span className="mt-1 block text-[10px] text-muted-foreground">{relatedWorks.find(connection => connection.item.id === item.id)?.topics.join(" · ")}</span></span>
                          <ArrowUpRight className="ml-auto shrink-0" />
                        </KnowledgeLink>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground">
                <Network className="size-3.5" />
                {activeTopic ? "Selected domain" : "The full collection"}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                {activeTopic?.title ?? "A Connected Body of Work."}
              </h3>
              <div ref={setMiniMapTarget} className="kn-panel-overview mt-4" />
              <p role="status" className="mt-3 text-sm text-muted-foreground">
                <span className="font-semibold text-stat-number">{resources.length}</span> connected
                resources
              </p>
              <div
                className="kn-category-index mt-5 flex flex-wrap gap-1.5"
                aria-label="Browse connected collections"
              >
                {grouped.map((group) => {
                  const KindIcon = kindIcons[group.kind] ?? Link2;
                  return (
                    <Button
                      key={group.id}
                      variant={category === group.id ? "secondary" : "ghost"}
                      size="sm"
                      aria-pressed={category === group.id}
                      onClick={() => browseCategory(group.id)}
                    >
                      <KindIcon className="size-3.5 shrink-0" aria-hidden />
                      <span>{group.title}</span>
                      <span className="font-mono text-xs text-stat-number">{group.items.length}</span>
                    </Button>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between gap-2"><p role="status" className="font-mono text-[10px] text-muted-foreground">{category ? `${shownGroups[0]?.title} / ${shownGroups[0]?.items.length} entries` : `All categories / ${resources.length} entries`}</p>{category && <Button variant="ghost" size="sm" onClick={() => setCategory("")}>All categories</Button>}</div>
              <div ref={sourceListRef} className="kn-source-list mt-5 space-y-5" aria-label="Category entries">
                {shownGroups.map((group) => (
                  <div key={group.kind} className={category === group.id ? "kn-panel-group is-selected" : "kn-panel-group"}>
                    <p className="mb-2 flex items-center justify-between border-b border-border pb-2 font-mono text-[10px] uppercase text-muted-foreground">
                      <span className="flex items-center gap-1.5 font-bold text-brand">{group.title}{(() => { const KindIcon = kindIcons[group.kind] ?? Link2; return <KindIcon className="size-3.5 shrink-0" aria-hidden />; })()}</span>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label={`Focus ${group.title} entries`}
                        title={`Focus ${group.title} entries`}
                        aria-pressed={category === group.id}
                        onClick={() => browseCategory(group.id)}
                      >
                        <ArrowDownRight />
                      </Button>
                    </p>
                    {group.items.map((item) => (
                      <Button variant="ghost"
                        key={item.id}
                        onClick={() => setResourceId(item.id)}
                        className="kn-source-button h-auto w-full justify-start gap-3 px-0 py-2 text-left"
                      >
                        <span className="kn-record-index shrink-0 font-mono text-[10px] text-muted-foreground">{String(group.items.indexOf(item) + 1).padStart(2, "0")}</span>
                        <span className="line-clamp-2 text-xs leading-relaxed">{item.title}</span>
                        <ArrowUpRight className="ml-auto shrink-0" />
                      </Button>
                    ))}
                  </div>
                ))}
                {!resources.length && (
                  <p className="text-sm text-muted-foreground">
                    No matching resources in this domain.
                  </p>
                )}
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
    </ReactFlowProvider>
  );
}
