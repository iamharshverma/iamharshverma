import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useMemo } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { KnowledgeHeroIcons } from "@/components/site/KnowledgeHeroIcons";
import { GroupedKnowledgeResults } from "@/components/site/GroupedKnowledgeResults";
import { KnowledgeExplorer } from "@/components/site/KnowledgeExplorer";
import {
  knowledge,
  knowledgeTopics,
  filterKnowledge,
  type KnowledgeFilters,
} from "@/data/knowledge";
import { networkResources, networkTopics } from "@/data/knowledge-network";
import { contentHead } from "@/lib/content-head";

export const Route = createFileRoute("/knowledge")({
  validateSearch: (raw: Record<string, unknown>): KnowledgeFilters =>
    Object.fromEntries(
      ["q", "kind", "topic", "publisher", "technology", "year", "resource"].flatMap((key) =>
        typeof raw[key] === "string" && raw[key] ? [[key, String(raw[key]).slice(0, 200)]] : [],
      ),
    ),
  head: () =>
    contentHead(
      "/knowledge",
      "Unified AI Knowledge Graph — Talks, Articles, Books & Patents",
      "Explore Harsh Verma's personal AI knowledge graph connecting Agentic Security, research, patents, publications, articles, interviews, talks, books and resources.",
    ),
  component: KnowledgeHub,
});
function KnowledgeHub() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const graphRef = useRef<HTMLDivElement>(null);
  const scrollToGraph = () => {
    window.requestAnimationFrame(() => graphRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    }));
  };
  const chooseTopic = (topic: string) => {
    void navigate({ search: previous => ({ ...previous, topic, resource: "" }), replace: true, resetScroll: false });
  };
  const set = (key: keyof KnowledgeFilters, value: string) => {
    void navigate({ search: previous => {
      const next = { ...previous };
      if (key !== "resource") delete next.resource;
      if (value) next[key] = value;
      else delete next[key];
      return next;
    }, replace: true, resetScroll: false });
  };
  const list = useMemo(() =>
    filters.topic === "Across the portfolio"
      ? networkResources(filters.topic, filterKnowledge(knowledge, { ...filters, topic: "" }))
      : filterKnowledge(knowledge, filters), [filters]);
  const input =
    "h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <>
      <PageHero
        eyebrow="// interconnected work"
        title={
          <>
            Knowledge <span className="text-brand-gradient">Hub.</span>
          </>
        }
        intro="Research perspectives, technical writing, public engineering projects and conversations on AI and cybersecurity."
        sideImage={<KnowledgeHeroIcons variant="hub" />}
      />
      <section className="knowledge-hub-content knowledge-refined mx-auto max-w-7xl px-5 pb-12 pt-6 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="relative w-full max-w-xl">
              <Search
                aria-hidden
                className="absolute left-3 top-3.5 size-4 text-muted-foreground"
              />
              <span className="sr-only">Search the knowledge library</span>
              <input
                type="search"
                value={filters.q ?? ""}
                onChange={(e) => set("q", e.target.value)}
                placeholder="Search agent trust, AI security, architecture…"
                className={`${input} pl-10`}
              />
            </label>
          </div>
          <div className="knowledge-filter-bar mt-6 grid gap-4 border-y border-border py-5 sm:grid-cols-2 lg:grid-cols-5">
            {(
              [
                ["kind", "Content type", [...new Set(knowledge.map((i) => i.kind))].sort()],
                ["topic", "Research theme", [...knowledgeTopics, "Across the portfolio"]],
                [
                  "publisher",
                  "Publication",
                  [...new Set(knowledge.map((i) => i.publisher))].sort(),
                ],
                [
                  "technology",
                  "Technology",
                  [...new Set(knowledge.flatMap((i) => i.technology))].sort(),
                ],
                [
                  "year",
                  "Year",
                  [...new Set(knowledge.flatMap((i) => (i.year ? [String(i.year)] : [])))]
                    .sort()
                    .reverse(),
                ],
              ] as [keyof KnowledgeFilters, string, string[]][]
            ).map(([key, label, values]) => (
              <label key={key} className="min-w-0 text-xs text-muted-foreground">
                {label}
                <select
                  aria-label={label}
                  className={`${input} mt-2`}
                  value={filters[key] ?? ""}
                  onChange={(e) => {
                    if (key === "topic") chooseTopic(e.target.value);
                    else set(key, e.target.value);
                    scrollToGraph();
                  }}
                >
                  <option value="">All</option>
                  {values.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </Reveal>
        <nav aria-label="Explore topics" className="mt-5 flex flex-wrap gap-2">
          {networkTopics.map(topic => (
            <Button key={topic.id} asChild variant={filters.topic === topic.id ? "secondary" : "outline"} size="sm">
              <Link to="/knowledge" search={previous => ({ ...previous, topic: topic.id, resource: "" })} resetScroll={false}
                onClick={(event) => {
                  if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) scrollToGraph();
                }}>
                {topic.title}
                <span className="font-mono text-[10px] text-stat-number">{networkResources(topic.id).length}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div ref={graphRef} className="mt-6 scroll-mt-24">
            <KnowledgeExplorer
              selected={filters.topic ?? ""}
              selectedResource={filters.resource ?? ""}
              onResource={(resource) => set("resource", resource)}
              onSelect={chooseTopic}
              items={list}
              onReset={() => void navigate({ search: {}, replace: true, resetScroll: false })}
            />
        </div>
        <div id="knowledge-results" className="scroll-mt-24">
        <div className="my-8 flex items-center justify-between border-y border-border py-4">
          <p role="status" className="text-sm text-muted-foreground">
            <span className="font-mono font-semibold text-stat-number">{list.length}</span>{" "}
            resources
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate({ search: {}, replace: true, resetScroll: false })}
          >
            <RotateCcw className="size-4" />
            Clear filters
          </Button>
        </div>
        {list.length ? (
          <GroupedKnowledgeResults items={list} topic={filters.topic ?? ""} />
        ) : (
          <div className="py-12 text-center">
            <h2 className="font-display text-2xl">No matching resources</h2>
            <p className="mt-3 text-muted-foreground">Try a broader topic or clear the filters.</p>
          </div>
        )}
        </div>
        <div className="mt-12 flex flex-wrap gap-5 border-t border-border pt-8 text-sm text-brand">
          <Link to="/research">Research & Expertise →</Link>
          <Link to="/engineering">Engineering & Architecture →</Link>
          <Link to="/resources">Reader & press resources →</Link>
        </div>
      </section>
    </>
  );
}

