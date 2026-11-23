import { useEffect, useMemo, useState } from "react";
import { Network, ListTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KnowledgeAtlas, type AtlasPath } from "./KnowledgeAtlas";
import { PersonalKnowledgeGraph } from "./PersonalKnowledgeGraph";
import { useExplorerFullscreen, ExplorerFullscreenProvider } from "./ExplorerFullscreen";
import { knowledge, type KnowledgeItem } from "@/data/knowledge";
import { groupKnowledge } from "@/data/knowledge-network";

/** One selection and full-screen boundary for both presentations of the shared library. */
export function KnowledgeExplorer({ selected = "", selectedResource = "", items = knowledge, onSelect, onResource, onReset }: {
  selected?: string;
  selectedResource?: string;
  items?: KnowledgeItem[];
  onSelect: (topic: string) => void;
  onResource: (id: string) => void;
  onReset: () => void;
}) {
  const explorer = useExplorerFullscreen();
  const fullscreenOwner = useMemo(() => ({ fullscreen: explorer.fullscreen, toggle: () => void explorer.toggle() }), [explorer.fullscreen, explorer.toggle]);
  const [presentation, setPresentation] = useState<"graph" | "list">("graph");
  const [path, setPath] = useState<AtlasPath>(() => ({
    ...(selected ? { topic: selected } : {}),
    ...(selectedResource ? { id: selectedResource, kind: knowledge.find(item => item.id === selectedResource)?.kind } : {}),
  }));
  const [category, setCategory] = useState("");
  useEffect(() => {
    setPath(previous => {
      if ((previous.topic ?? "") === selected && (previous.id ?? "") === selectedResource) return previous;
      return { view: previous.view, ...(selected ? { topic: selected } : {}),
        ...(selectedResource ? { id: selectedResource, kind: knowledge.find(item => item.id === selectedResource)?.kind } : {}) };
    });
  }, [selected, selectedResource]);
  const choosePath = (next: AtlasPath) => {
    setPath(next);
    setCategory(groupKnowledge(knowledge).find(group => group.kind === next.kind)?.id ?? "");
    if ((next.topic ?? "") !== selected) onSelect(next.topic ?? "");
    if ((next.id ?? "") !== selectedResource) onResource(next.id ?? "");
  };
  const chooseCategory = (id: string) => {
    setCategory(id);
    setPath(previous => ({ ...previous, kind: groupKnowledge(knowledge).find(group => group.id === id)?.kind, id: undefined, deep: false }));
  };
  const chooseResource = (id: string) => {
    setPath(previous => ({ ...previous, id: id || undefined,
      ...(id ? { kind: knowledge.find(item => item.id === id)?.kind } : {}), deep: false }));
    onResource(id);
  };
  return (
    <div ref={explorer.ref} className={`knowledge-explorer ${explorer.fullscreen ? "explorer-fullscreen" : ""}`} aria-label="Unified knowledge explorer">
      <header className="knowledge-explorer-header">
        <div>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">Harsh Verma / Connected knowledge</p>
          <h2 className="mt-1 font-display text-xl font-semibold text-foreground">One portfolio. Connected perspectives.</h2>
        </div>
      </header>
      <ExplorerFullscreenProvider value={fullscreenOwner}>
      <div className="knowledge-explorer-body">
        {presentation === "graph" ? (
          <KnowledgeAtlas path={path} onPath={choosePath} embedded title="Graph View" onHome={() => { setPath({}); setCategory(""); setPresentation("graph"); onReset(); }} />
        ) : (
          <PersonalKnowledgeGraph embedded detailList selected={selected} selectedResource={selectedResource} items={items}
            collection={category} onCollection={chooseCategory} onResource={chooseResource}
            onSelect={topic => { setPath(previous => ({ view: previous.view, ...(topic ? { topic } : {}) })); setCategory(""); onSelect(topic); onResource(""); }}
            onReset={() => { setPath({}); setCategory(""); onReset(); }} onBrowseKind={() => {}} />
        )}
      </div>
      </ExplorerFullscreenProvider>
      <div className="knowledge-view-switch" role="group" aria-label="Knowledge presentation">
        <Button variant="ghost" aria-pressed={presentation === "graph"} onClick={() => setPresentation("graph")}><Network />Graph View</Button>
        <Button variant="ghost" aria-pressed={presentation === "list"} onClick={() => setPresentation("list")}><ListTree />Detail View</Button>
      </div>
    </div>
  );
}