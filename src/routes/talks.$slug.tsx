import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { knowledge, relatedKnowledge } from "@/data/knowledge";
import { contentHead } from "@/lib/content-head";
import { PageHero } from "@/components/site/Reveal";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { Button } from "@/components/ui/button";
import { KnowledgeGraphEntry } from "@/components/site/KnowledgeGraphEntry";
export const Route = createFileRoute("/talks/$slug")({
  loader: ({ params }) => {
    const item = knowledge.find((i) => i.kind === "Keynote" && i.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    contentHead(
      `/talks/${loaderData?.slug ?? ""}`,
      loaderData?.title ?? "Talk unavailable",
      loaderData?.summary ?? "Recorded talks by Harsh Verma.",
      "CreativeWork",
      loaderData?.image,
    ),
  component: TalkDetail,
});
function TalkDetail() {
  const i = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow={`// recorded keynote · ${i.publisher}`}
        title={i.title}
        intro={i.summary}
      />
      <section className="mx-auto max-w-5xl px-6 py-12">
        {i.image && (
          <a href={i.source} target="_blank" rel="noreferrer">
            <img
              src={i.image}
              alt={i.title}
              className="aspect-video w-full rounded-lg object-cover"
            />
          </a>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href={i.source} target="_blank" rel="noreferrer">
              Watch original recording ↗
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/booking" search={{ topic: "Keynote" }}>
              Invite Harsh to speak
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/speaking">All talks</Link>
          </Button>
        </div>
        <h2 className="mt-14 font-display text-3xl font-semibold">Connected perspectives</h2>
        <KnowledgeGraphEntry id={i.id} />
        <div className="mt-8">
          <KnowledgeCards items={relatedKnowledge(i.topics, i.id, 6)} />
        </div>
      </section>
    </>
  );
}
