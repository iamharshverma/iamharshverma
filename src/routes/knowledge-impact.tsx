import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Network,
  GitMerge,
  Workflow,
  Radar,
  ArrowRight,
  RotateCcw,
  Compass,
  X,
  Share2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { contentHead } from "@/lib/content-head";
import { impactTopics, getImpactTopic, impactTopicTags } from "@/data/knowledge-impact";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { KnowledgeHeroIcons } from "@/components/site/KnowledgeHeroIcons";
import { useExplorerFullscreen, ExplorerFullscreenButton } from "@/components/site/ExplorerFullscreen";
import ConceptLandscape from "@/components/impact/ConceptLandscape";
import AgentPlayground from "@/components/impact/AgentPlayground";
import EngineeringRadar from "@/components/impact/EngineeringRadar";
import SourceConnections from "@/components/impact/SourceConnections";
import { KnowledgeExplorer } from "@/components/site/KnowledgeExplorer";
import { knowledge } from "@/data/knowledge";
import { knowledgeDomainArt } from "@/data/knowledge-domain-art";
import {
  validateImpactSearch,
  simulationSettings,
  type ImpactMode,
  type ImpactSearch,
} from "@/lib/impact-search";

export const Route = createFileRoute("/knowledge-impact")({
  validateSearch: validateImpactSearch,
  head: () =>
    contentHead(
      "/knowledge-impact",
      "Knowledge Impact — AI Research, Agentic Systems & Engineering",
      "Explore Harsh Verma’s unified AI knowledge graph connecting talks, articles, books, patents and research across the portfolio, alongside interactive agentic AI explorations.",
      "WebPage",
    ),
  component: KnowledgeImpact,
});
function KnowledgeImpact() {
  const explorer = useExplorerFullscreen();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const mode = search.mode ?? "graph";
  const topic = search.topic ?? "trust";
  const active = getImpactTopic(topic);
  const [guide, setGuide] = useState(false);
  const [sharedUrl, setSharedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const setSettings = (patch: Partial<ImpactSearch>) => {
    void navigate({
      search: (previous) => ({ ...previous, ...patch }),
      replace: true,
      resetScroll: false,
    });
    setCopied(false);
    setSharedUrl("");
  };
  const setTopic = (id: string) => {
    void navigate({
      search: (previous) => ({ ...previous, topic: id, networkTopic: impactTopicTags[id]?.[0] ?? "", resource: "" }),
      replace: true,
      resetScroll: false,
    });
  };
  const setMode = (next: ImpactMode) => {
    void navigate({
      search: (previous) => ({ ...previous, topic, mode: next }),
      replace: true,
      resetScroll: false,
    });
  };
  const modes = [
    { id: "graph", title: "Research Graph", short: "Explore", icon: Network },
    { id: "landscape", title: "Intelligence Landscape", short: "Understand", icon: GitMerge },
    { id: "playground", title: "Agentic Playground", short: "Experiment", icon: Workflow },
    { id: "radar", title: "Engineering Radar", short: "Anticipate", icon: Radar },
  ] as const;
  return (
    <div className="knowledge-impact knowledge-refined pb-10">
      <PageHero
        eyebrow="// intelligence observatory"
        title={<>Knowledge <span className="text-brand-gradient">Impact.</span></>}
        intro="Explore the connections between ideas, put autonomy under a microscope, and trace the engineering decisions that turn research into impact."
        sideImage={<KnowledgeHeroIcons variant="impact" />}
      />
      <header className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="impact-overview mt-6 flex flex-wrap gap-x-7 gap-y-3">
                {[
                  [knowledge.length, "Connected resources"],
                  [impactTopics.length, "Research domains"],
                  [4, "Exploration lenses"],
                ].map(([number, label]) => (
                  <div key={label}>
                    <span className="font-mono text-lg font-semibold text-stat-number">
                      {number}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGuide((g) => !g)}
              aria-expanded={guide}
            >
              <Compass />
              Follow a guided journey
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const url = new URL(window.location.href);
                const resolved = {
                  ...search,
                  topic,
                  mode,
                  view: search.view ?? "Full ecosystem",
                  scenario:
                    search.scenario ??
                    (topic === "defense"
                      ? "defense"
                      : topic === "security"
                        ? "injection"
                        : "research"),
                  ...simulationSettings(search),
                };
                for (const [key, value] of Object.entries(resolved))
                  url.searchParams.set(
                    key,
                    typeof value === "string" ? value : JSON.stringify(value),
                  );
                try {
                  await navigator.clipboard.writeText(url.toString());
                  setCopied(true);
                  setSharedUrl("");
                } catch {
                  setSharedUrl(url.toString());
                  setCopied(false);
                }
              }}
            >
              {copied ? <Check /> : <Share2 />}
              {copied ? "Link copied" : "Share exploration"}
            </Button>
            {sharedUrl && (
              <label className="w-full text-xs text-muted-foreground">
                Exploration link
                <input
                  readOnly
                  aria-label="Exploration link"
                  value={sharedUrl}
                  onFocus={(event) => event.target.select()}
                  className="impact-input mt-2"
                />
              </label>
            )}
            <span role="status" className="sr-only">
              {copied ? "Exploration link copied to clipboard." : ""}
            </span>
          </div>
        </Reveal>
      </header>
      <section className="mx-auto max-w-7xl px-5 sm:px-8" aria-label="Knowledge Impact observatory">
        <div
          ref={explorer.ref}
          className={`impact-workspace impact-mode-${mode} ${explorer.fullscreen ? "explorer-fullscreen impact-fullscreen" : ""}`}
        >
          <div className="impact-workspace-heading flex items-center justify-between gap-3 border-t border-border py-3 px-3">
            <p className="impact-kicker">Observatory / {modes.find(m => m.id === mode)?.title}</p>
            <ExplorerFullscreenButton fullscreen={explorer.fullscreen} toggle={() => void explorer.toggle()} />
          </div>
          <div
            className="impact-experience-tabs grid grid-cols-2 border-y border-border sm:grid-cols-4"
            role="tablist"
            aria-label="Exploration experiences"
          >
            {modes.map((m, i) => (
              <Button
                key={m.id}
                role="tab"
                id={`tab-${m.id}`}
                aria-label={m.title}
                tabIndex={mode === m.id ? 0 : -1}
                aria-controls={`panel-${m.id}`}
                aria-selected={mode === m.id}
                variant="ghost"
                className={`impact-tab h-auto min-h-20 flex-col gap-1 rounded-none whitespace-normal px-2 py-4 sm:flex-row sm:gap-3 ${mode === m.id ? "is-active" : ""}`}
                onClick={() => setMode(m.id)}
                onKeyDown={(e) => {
                  if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                    e.preventDefault();
                    const next = modes[e.key === "Home" ? 0 : e.key === "End" ? 3 : (i + (e.key === "ArrowRight" ? 1 : 3)) % 4];
                    if (next) {
                      setMode(next.id);
                      document.getElementById(`tab-${next.id}`)?.focus();
                    }
                  }
                }}
              >
                <m.icon className="size-5" />
                <span className="text-center sm:text-left">
                  <span className="block font-mono text-[9px] uppercase text-muted-foreground">
                    0{i + 1} / {m.short}
                  </span>
                  <span className="block text-xs font-semibold sm:text-sm">{m.title}</span>
                </span>
              </Button>
            ))}
          </div>
          <nav aria-label="Impact domains" className="impact-domain-nav flex flex-wrap gap-2 border-b border-border py-4">
            {impactTopics.map(domain => (
              <Button key={domain.id} asChild variant={topic === domain.id ? "secondary" : "ghost"} size="sm">
                <Link to="/knowledge-impact" search={previous => ({ ...previous, topic: domain.id, networkTopic: impactTopicTags[domain.id]?.[0] ?? "", resource: "" })} resetScroll={false}>
                  {domain.short}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="impact-domain-banner flex min-w-0 items-center gap-5 border-b border-border px-5 py-5 sm:px-8">
            <div className="impact-domain-symbol shrink-0" aria-hidden="true"><Network className="size-8" /></div>
            <div className="min-w-0 flex-1">
              <p className="impact-kicker">
                {modes.find((m) => m.id === mode)?.short} / {active?.resources.length} connected
                sources
              </p>
              <h2 className="mt-2 font-display text-lg font-semibold sm:text-2xl">
                {active?.title}
              </h2>
              <p className="mt-2 hidden max-w-2xl text-xs leading-relaxed text-muted-foreground sm:block">
                {active?.summary}
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <Link to="/knowledge" search={{ topic: impactTopicTags[topic]?.[0] ?? "" }}><span className="hidden sm:inline">Related work</span><ArrowRight /><span className="sr-only sm:hidden">Related work</span></Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
            <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="impact-context-dot" />
              Exploration context
              <span className="font-semibold text-foreground">{active?.title}</span>
            </p>
            <div className="flex items-center gap-2">
              <label>
                <span className="sr-only">Change exploration topic</span>
                <select
                  aria-label="Change exploration topic"
                  className="max-w-44 rounded-md border border-input bg-background px-2 py-1.5 text-xs"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  {impactTopics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.short}
                    </option>
                  ))}
                </select>
              </label>
              <Button
                variant="ghost"
                size="icon-xs"
                title="Reset exploration"
                aria-label="Reset exploration"
                onClick={() => void navigate({ search: {}, replace: true, resetScroll: false })}
              >
                <RotateCcw />
              </Button>
            </div>
          </div>
          {guide && (
            <div className="flex items-start justify-between gap-3 border-b border-border bg-muted px-5 py-4">
              <div>
                <p className="font-display font-semibold">
                  Agent Trust → Policy → Experiment → Perspective
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Identity and evidence inform trust; explicit policy still controls execution.
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 px-0"
                  onClick={() => {
                    setSettings({ topic: "trust", networkTopic: "Agent trust", resource: "", mode: "landscape" });
                  }}
                >
                  Begin with Agent Trust
                  <ArrowRight />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Close guided journey"
                title="Close guided journey"
                onClick={() => setGuide(false)}
              >
                <X />
              </Button>
            </div>
          )}
          <div
            id={`panel-${mode}`}
            role="tabpanel"
            aria-labelledby={`tab-${mode}`}
            className="impact-panel"
          >
            {mode === "graph" && (
              <KnowledgeExplorer
                selected={search.networkTopic ?? ""}
                selectedResource={search.resource ?? ""}
                onSelect={networkTopic => {
                  const domain = impactTopics.find(value => impactTopicTags[value.id]?.[0] === networkTopic);
                  setSettings({ networkTopic, resource: "", ...(domain ? { topic: domain.id } : {}) });
                }}
                onResource={resource => setSettings({ resource })}
                onReset={() => setSettings({ networkTopic: "", resource: "", graphQuery: "", category: "" })}
              />
            )}
            {mode === "landscape" && (
              <ConceptLandscape
                topic={topic}
                onTopic={setTopic}
                onPlay={() => setMode("playground")}
              />
            )}
            {mode === "playground" && (
              <AgentPlayground
                topic={topic}
                onRadar={() => setMode("radar")}
                settings={search}
                onSettings={setSettings}
              />
            )}
            {mode === "radar" && (
              <EngineeringRadar topic={topic} onTopic={setTopic} onGraph={() => setMode("graph")} />
            )}
          </div>
          <SourceConnections key={topic} topic={topic} />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="impact-kicker">The knowledge behind the experience</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              Eight Domains. One Connected Perspective.
            </h2>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/knowledge">
              Complete library
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-7 grid gap-x-6 gap-y-7 md:grid-cols-2 lg:grid-cols-4">
          {impactTopics.map((t) => (
            <article key={t.id} className="impact-domain-entry group min-w-0">
              <div className="relative overflow-hidden rounded-md">
                {knowledgeDomainArt[t.id] && (
                  <img
                    src={knowledgeDomainArt[t.id]}
                    alt={t.title}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  />
                )}
                <span className="absolute bottom-2 left-2 rounded bg-background px-2 py-1 font-mono text-[10px] text-muted-foreground">
                  {t.resources.length} connected resources
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{t.title}</h3>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {t.summary}
              </p>
              <Button
                variant="link"
                size="sm"
                className="mt-2 px-0"
                onClick={() => {
                  setSettings({ topic: t.id, mode: "landscape", networkTopic: impactTopicTags[t.id]?.[0] ?? "", resource: "" });
                  document
                    .querySelector('[aria-label="Knowledge Impact observatory"]')
                    ?.scrollIntoView({
                      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "instant"
                        : "smooth",
                    });
                }}
              >
                Explore idea
                <ArrowRight />
              </Button>
            </article>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="impact-kicker">Sources & editorial integrity</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The six research pillars are personal technical perspectives. Enterprise AI and
            Responsible AI are cross-cutting interpretations of that work. Graph connections are
            explained editorial relationships, not measured strengths. All playground activity is a
            deterministic educational simulation.
          </p>
          <div className="mt-4 flex flex-wrap gap-5 text-sm text-brand">
            <Link to="/research">Research foundations ↗</Link>
            <Link to="/knowledge">Complete Knowledge Hub ↗</Link>
            <a
              href="https://www.nist.gov/itl/ai-risk-management-framework"
              target="_blank"
              rel="noreferrer"
            >
              NIST AI RMF ↗
            </a>
            <a href="https://genai.owasp.org/" target="_blank" rel="noreferrer">
              OWASP GenAI ↗
            </a>
          </div>
        </div>
      </section>
      <section className="impact-closing border-y border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <p className="impact-kicker">
            Research → Exploration → Experimentation → Engineering → Impact
          </p>
          <h2 className="mt-5 max-w-4xl font-display text-3xl sm:text-4xl font-semibold leading-tight">
            From Ideas to Intelligence.
            <br />
            From Intelligence to Impact.
          </h2>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link to="/research">
                Explore Research
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/knowledge" search={{ kind: "Publication" }}>
                Discover Publications
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/contact">
                Connect with Harsh
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
