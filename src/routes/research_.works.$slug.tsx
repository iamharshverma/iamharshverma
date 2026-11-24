import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { publications } from "@/data/publications";
import { knowledge, relatedKnowledge } from "@/data/knowledge";
import { contentHead } from "@/lib/content-head";
import { PageHero } from "@/components/site/Reveal";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { Button } from "@/components/ui/button";
import { KnowledgeGraphEntry } from "@/components/site/KnowledgeGraphEntry";
export const Route = createFileRoute("/research_/works/$slug")({
  loader: ({ params }) => {
    if (params.slug === "ieee-cogml-2019-secure-real-time-streaming-with-deep-learning") {
      const first = publications[0];
      if (first) throw redirect({ to: "/publications/$slug", params: { slug: first.slug }, statusCode: 301 });
    }
    const item = knowledge.find(
      (i) =>
        ["Patent", "Publication", "Project", "Resource"].includes(i.kind) && i.slug === params.slug,
    );
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    contentHead(
      `/research/works/${loaderData?.slug ?? ""}`,
      loaderData?.title ?? "Research reference unavailable",
      loaderData?.summary ?? "Public research references by Harsh Verma.",
      "CreativeWork",
    ),
  component: WorkDetail,
});
function WorkDetail() {
  const i = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={`// research reference · ${i.kind}`} title={i.title} intro={i.summary} />
      <section className="mx-auto max-w-5xl px-6 py-12">
        <Link to="/research" className="text-sm text-brand">
          ← Research archive
        </Link>
        <dl className="mt-8 grid gap-5 border-y border-border py-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">Record type</dt>
            <dd className="mt-2 font-semibold">{i.kind}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Reference</dt>
            <dd className="mt-2 font-semibold">{i.publisher}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Recorded year</dt>
            <dd className="mt-2 font-mono text-stat-number">{i.year}</dd>
          </div>
        </dl>
        <p className="mt-8 leading-relaxed text-muted-foreground">
          {i.kind === "Patent"
            ? "Granted and pending statuses are reported separately in this record. Pending inventions are not represented as granted patents. No unpublished specification, employer architecture or confidential implementation is disclosed here."
            : i.kind === "Resource"
              ? "This is a link to an externally maintained bibliography, not an individual peer-reviewed publication. Consult the original source for citation details and publication status."
              : "This entry summarizes a public portfolio reference. Consult the original source for code or publication details; no additional measured outcome is asserted."}
        </p>
        {i.source && (
          <Button asChild className="mt-6">
            <a href={i.source} target="_blank" rel="noreferrer">
              Open original source ↗
            </a>
          </Button>
        )}
        <h2 className="mt-14 font-display text-3xl font-semibold">Related Research & Writing</h2>
        <KnowledgeGraphEntry id={i.id} />
        <div className="mt-8">
          <KnowledgeCards items={relatedKnowledge(i.topics, i.id, 6)} />
        </div>
      </section>
    </>
  );
}
