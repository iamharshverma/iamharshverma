import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Network, LayoutGrid, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Reveal";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { KnowledgeGraph } from "@/components/site/KnowledgeGraph";
import {
  knowledge,
  knowledgeTopics,
  filterKnowledge,
  type KnowledgeFilters,
} from "@/data/knowledge";
import { contentHead } from "@/lib/content-head";

export const Route = createFileRoute("/knowledge")({
  validateSearch: (raw: Record<string, unknown>): KnowledgeFilters =>
    Object.fromEntries(
      ["q", "kind", "topic", "publisher", "technology", "year"].flatMap((key) =>
        typeof raw[key] === "string" && raw[key] ? [[key, String(raw[key]).slice(0, 200)]] : [],
      ),
    ),
  head: () =>
    contentHead(
      "/knowledge",
      "Knowledge Hub — AI, Cybersecurity & Engineering",
      "Explore Harsh Verma's articles, research perspectives, public engineering projects, books, talks and media through one connected topic library.",
    ),
  component: KnowledgeHub,
});
function KnowledgeHub() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const [graph, setGraph] = useState(false);
  const set = (key: keyof KnowledgeFilters, value: string) => {
    const next = { ...filters };
    if (value) next[key] = value;
    else delete next[key];
    void navigate({ search: next, replace: true });
  };
  const list = filterKnowledge(knowledge, filters);
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
      />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="relative w-full max-w-xl">
            <Search aria-hidden className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
            <span className="sr-only">Search the knowledge library</span>
            <input
              type="search"
              value={filters.q ?? ""}
              onChange={(e) => set("q", e.target.value)}
              placeholder="Search agent trust, AI security, architecture…"
              className={`${input} pl-10`}
            />
          </label>
          <div className="flex gap-2">
            <Button
              variant={graph ? "outline" : "default"}
              onClick={() => setGraph(false)}
              aria-pressed={!graph}
            >
              <LayoutGrid className="size-4" />
              Library
            </Button>
            <Button
              variant={graph ? "default" : "outline"}
              onClick={() => setGraph(true)}
              aria-pressed={graph}
            >
              <Network className="size-4" />
              Topics
            </Button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {(
            [
              ["kind", "Content type", [...new Set(knowledge.map((i) => i.kind))].sort()],
              ["topic", "Research theme", [...knowledgeTopics]],
              ["publisher", "Publication", [...new Set(knowledge.map((i) => i.publisher))].sort()],
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
                onChange={(e) => set(key, e.target.value)}
              >
                <option value="">All</option>
                {values.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
        {graph && (
          <KnowledgeGraph
            selected={filters.topic ?? ""}
            onSelect={(topic) => set("topic", filters.topic === topic ? "" : topic)}
          />
        )}
        <div className="my-8 flex items-center justify-between border-y border-border py-4">
          <p role="status" className="text-sm text-muted-foreground">
            <span className="font-mono font-semibold text-stat-number">{list.length}</span>{" "}
            resources
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate({ search: {}, replace: true })}
          >
            <RotateCcw className="size-4" />
            Clear filters
          </Button>
        </div>
        {list.length ? (
          <KnowledgeCards items={list} />
        ) : (
          <div className="py-12 text-center">
            <h2 className="font-display text-2xl">No matching resources</h2>
            <p className="mt-3 text-muted-foreground">Try a broader topic or clear the filters.</p>
          </div>
        )}
        <div className="mt-12 flex flex-wrap gap-5 border-t border-border pt-8 text-sm text-brand">
          <Link to="/research">Research & Expertise →</Link>
          <Link to="/engineering">Engineering & Architecture →</Link>
          <Link to="/resources">Reader & press resources →</Link>
        </div>
      </section>
    </>
  );
}
