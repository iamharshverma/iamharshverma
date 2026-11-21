import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, LibraryBig, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KnowledgeLink } from "@/components/site/KnowledgeCards";
import { getImpactTopic, impactTopicTags } from "@/data/knowledge-impact";

export default function SourceConnections({ topic }: { topic: string }) {
  const active = getImpactTopic(topic);
  const [kind, setKind] = useState("");
  const [all, setAll] = useState(false);
  if (!active) return null;
  const resources = active.resources;
  const kinds = [...new Set(resources.map((item) => item.kind))];
  const filtered = resources.filter((item) => !kind || item.kind === kind);
  return (
    <section
      className="impact-sources border-t border-border px-5 py-6 sm:px-8"
      aria-label="Connected portal resources"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="impact-kicker">IDEA → EVIDENCE → EXPLORATION</p>
          <h2 className="mt-2 flex items-center gap-2 font-display text-xl font-semibold">
            <LibraryBig className="size-5 text-expertise-node" />
            The Work Behind {active.short}
          </h2>
          <p className="mt-2 text-xs text-muted-foreground">
            {resources.length} related records from the portfolio
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/knowledge" search={{ topic: impactTopicTags[topic]?.[0] ?? "" }}>
            Open in Knowledge Hub
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
      <div className="mt-5 flex flex-wrap gap-1" aria-label="Connected resource types">
        {["", ...kinds].map((value) => (
          <Button
            key={value}
            size="sm"
            variant={kind === value ? "secondary" : "ghost"}
            aria-pressed={kind === value}
            onClick={() => {
              setKind(value);
              setAll(false);
            }}
          >
            {value === "Media" ? "Interviews & Media" : value || "All"}
            <span className="font-mono text-[10px] text-muted-foreground">
              {value ? resources.filter((r) => r.kind === value).length : resources.length}
            </span>
          </Button>
        ))}
      </div>
      <div
        className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Source records"
      >
        {filtered.slice(0, all ? filtered.length : 6).map((item) => (
          <KnowledgeLink
            key={item.id}
            item={item}
            className="impact-source-row group relative flex min-w-0 flex-col items-start overflow-hidden rounded-lg border border-border bg-card"
          >
            {item.image && (
              <img
                src={item.image}
                loading="lazy"
                alt=""
                className="aspect-[16/9] w-full object-cover"
              />
            )}
            <span className="min-w-0 flex-1 p-4 pr-8">
              <span className="block font-mono text-[9px] uppercase text-muted-foreground">
                {item.kind} {item.year ? ` / ${item.year}` : ""}
              </span>
              <span className="mt-1 line-clamp-2 block text-xs font-semibold leading-relaxed group-hover:text-brand">
                {item.title}
              </span>
            </span>
            <ArrowUpRight className="absolute bottom-5 right-3 size-3.5 text-brand" />
          </KnowledgeLink>
        ))}
      </div>
      {filtered.length > 6 && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-4"
          aria-expanded={all}
          onClick={() => setAll((value) => !value)}
        >
          {all ? "Show Less" : `Explore All ${filtered.length}`}
          <ChevronDown className={all ? "rotate-180" : ""} />
        </Button>
      )}
    </section>
  );
}
