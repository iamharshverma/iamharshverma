import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Reveal";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { contentHead } from "@/lib/content-head";
import { radarEntries, getImpactTopic, impactTopicTags } from "@/data/knowledge-impact";
import { knowledge, type KnowledgeItem } from "@/data/knowledge";

const RELATED_KINDS = new Set(["Article", "Publication", "Research", "Keynote"]);

/** Papers, articles and research sharing the technology's portfolio domains. */
export function radarRelatedWork(entryId: string, limit = 6): KnowledgeItem[] {
  const entry = radarEntries.find((r) => r.id === entryId);
  if (!entry) return [];
  const tags = new Set(
    [entry.topic, ...entry.relatedTopics].flatMap((id) => impactTopicTags[id] ?? []),
  );
  return knowledge
    .filter(
      (item) => RELATED_KINDS.has(item.kind) && item.topics.some((topic) => tags.has(topic)),
    )
    .slice(0, limit);
}

export const Route = createFileRoute("/radar/$slug")({
  loader: ({ params }) => {
    const entry = radarEntries.find((r) => r.id === params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData }) =>
    contentHead(
      `/radar/${loaderData?.id ?? ""}`,
      loaderData ? `${loaderData.title} — AI Engineering Radar` : "Technology unavailable",
      loaderData
        ? `${loaderData.title} on Harsh Verma's AI Engineering Radar: ${loaderData.implication}`
        : "Technologies and patterns connected to Harsh Verma's technical perspectives.",
      "TechArticle",
    ),
  component: RadarTechnology,
});

function RadarTechnology() {
  const entry = Route.useLoaderData();
  const domain = getImpactTopic(entry.topic);
  const related = radarRelatedWork(entry.id);
  const siblings = radarEntries.filter((r) => r.sector === entry.sector && r.id !== entry.id);
  const details = [
    ["Engineering implication", entry.implication],
    ["Security consideration", entry.security],
    ["Opportunity", entry.opportunity],
    ["Challenge", entry.challenge],
  ] as const;
  return (
    <>
      <PageHero
        eyebrow={`// engineering radar · ${entry.sector}`}
        title={entry.title}
        intro={entry.rationale}
      />
      <section className="knowledge-refined mx-auto max-w-5xl px-6 py-12">
        <Button asChild variant="ghost" size="sm" className="px-0 text-brand">
          <Link to="/knowledge-impact" search={{ mode: "radar", topic: entry.topic }}>
            <ArrowLeft />
            Back to the Engineering Radar
          </Link>
        </Button>
        <dl className="mt-8 grid gap-5 border-y border-border py-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">Radar sector</dt>
            <dd className="mt-2 font-semibold">{entry.sector}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Research domain</dt>
            <dd className="mt-2 font-semibold">{domain?.title ?? entry.topic}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Adoption position</dt>
            <dd className="mt-2 font-mono text-stat-number">Unassessed</dd>
          </div>
        </dl>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <article
              key={label}
              className="rounded-xl border border-border bg-card p-6 transition-shadow duration-300 motion-safe:hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg"
            >
              <h2 className="font-display text-base font-semibold">{label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value}</p>
            </article>
          ))}
        </div>
        {related.length > 0 && (
          <>
            <h2 className="mt-14 font-display text-3xl font-semibold">
              Related papers, articles & research
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Portfolio work sharing this technology’s domains. Shared subjects indicate editorial
              relationships, not citations.
            </p>
            <div className="mt-8">
              <KnowledgeCards items={related} />
            </div>
          </>
        )}
        {siblings.length > 0 && (
          <div className="mt-14 border-t border-border pt-8">
            <h2 className="font-display text-xl font-semibold">
              More in {entry.sector}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {siblings.map((r) => (
                <Button key={r.id} asChild variant="outline" size="sm" className="rounded-full">
                  <Link to="/radar/$slug" params={{ slug: r.id }}>
                    {r.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-8">
          <Button asChild size="sm">
            <Link to="/knowledge-impact" search={{ mode: "radar", topic: entry.topic }}>
              <Radar />
              Explore on the radar
            </Link>
          </Button>
          {domain && (
            <Button asChild variant="outline" size="sm">
              <Link to="/knowledge" search={{ topic: impactTopicTags[entry.topic]?.[0] ?? "" }}>
                {domain.title} in the Knowledge Hub
                <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
