import { useState } from "react";
import { ArrowRight, ArrowLeft, GitMerge, ShieldCheck } from "lucide-react";
import { ConceptLandscapeGraph } from "./ConceptLandscapeGraph";
import { Button } from "@/components/ui/button";
import { KnowledgeLink } from "@/components/site/KnowledgeCards";
import { impactTopics, getImpactTopic, conceptIntersection } from "@/data/knowledge-impact";

export default function ConceptLandscape({
  topic,
  onTopic,
  onPlay,
}: {
  topic: string;
  onTopic: (id: string) => void;
  onPlay: () => void;
}) {
  const [other, setOther] = useState("security");
  const [stage, setStage] = useState(0);
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const active = getImpactTopic(topic);
  const comparison = getImpactTopic(other === topic ? "distributed" : other);
  const intersections = conceptIntersection(topic, comparison?.id ?? "");
  if (!active) return null;
  return (
    <div className="p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="impact-kicker">02 / Understanding</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">
            Explore the Intelligence Landscape.
          </h2>
        </div>
        <GitMerge className="size-8 text-brand" />
      </div>
      <ConceptLandscapeGraph focused={focused ? active : undefined} active={active} expanded={expanded} stage={stage} onFocus={id => { onTopic(id); setFocused(true); setExpanded(false); setStage(0); }} onStage={index => { setStage(index); setExpanded(true); }} onBack={() => { if (expanded) setExpanded(false); else { setFocused(false); setStage(0); } }} onReset={() => { setFocused(false); setExpanded(false); setStage(0); }} />
      {focused && <><div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <p className="max-w-2xl text-lg leading-relaxed">{active.why}</p>
          <div className="impact-principle mt-5" aria-live="polite">
            <div className="mb-4 flex items-center justify-between gap-3"><span className="font-mono text-xs text-muted-foreground">STAGE {stage + 1} / {active.flow.length}</span><div className="flex gap-1"><Button variant="ghost" size="icon-sm" title="Previous concept stage" aria-label="Previous concept stage" disabled={stage === 0} onClick={() => setStage(s => Math.max(0, s - 1))}><ArrowLeft /></Button><Button variant="ghost" size="icon-sm" title="Next concept stage" aria-label="Next concept stage" disabled={stage >= active.flow.length - 1} onClick={() => setStage(s => Math.min(active.flow.length - 1, s + 1))}><ArrowRight /></Button></div></div>
            <p className="impact-kicker">{active.flow[stage]}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {active.principles[stage % active.principles.length]}
            </p>
          </div>
          <div className="mt-7">
            <h3 className="font-display text-lg font-semibold">Engineering friction</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {active.challenges[stage % active.challenges.length]}
            </p>
          </div>
        </div>
        <aside className="min-w-0 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
            <GitMerge className="size-5 text-brand" />
            Concept Explorer
          </h3>
          <label className="mt-5 block text-xs text-muted-foreground">
            Intersect {active.short} with
            <select
              className="impact-input mt-2"
              aria-label="Compare knowledge domain"
              value={comparison?.id ?? ""}
              onChange={(e) => setOther(e.target.value)}
            >
              {impactTopics
                .filter((t) => t.id !== topic)
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
            </select>
          </label>
          <div className="impact-intersection mt-5 border-l-2 border-expertise-node pl-4">
            <p className="font-display font-semibold">
              {active.short} × {comparison?.short}
            </p>
            {intersections.length ? (
              intersections.map((r) => (
                <p
                  key={`${r.source}-${r.target}`}
                  className="mt-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {r.explanation}
                </p>
              ))
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                No direct editorial relationship is documented for this pair. Explore each domain’s
                principles without assuming an established connection.
              </p>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">{active.concepts.map(concept => <span key={concept} className="impact-concept-tag">{concept}</span>)}</div>
          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4" />
            Personal technical perspectives, not employer architecture.
          </p>
          <Button size="sm" className="mt-5" onClick={onPlay}>
            Experiment with this idea <ArrowRight />
          </Button>
        </aside>
      </div>
      <div className="mt-8 border-t border-border pt-6">
        <p className="impact-kicker">Source anchors</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {active.resources.slice(0, 3).map((r) => (
            <div key={r.id} className="border-l border-border pl-4">
              <span className="text-xs text-muted-foreground">
                {r.kind} · {r.publisher}
              </span>
              <KnowledgeLink
                item={r}
                className="mt-2 block text-sm font-semibold leading-relaxed hover:text-brand"
              >
                {r.title} ↗
              </KnowledgeLink>
            </div>
          ))}
        </div>
      </div></>}
    </div>
  );
}
