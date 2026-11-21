import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { knowledge, relatedKnowledge } from "@/data/knowledge";
import { contentHead } from "@/lib/content-head";
import { PageHero } from "@/components/site/Reveal";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { Button } from "@/components/ui/button";
import { KnowledgeGraphEntry } from "@/components/site/KnowledgeGraphEntry";
export const Route = createFileRoute("/media_/$slug")({
  loader: ({ params }) => {
    const item = knowledge.find((i) => i.kind === "Media" && i.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    contentHead(
      `/media/${loaderData?.slug ?? ""}`,
      loaderData?.title ?? "Media unavailable",
      loaderData?.summary ?? "Interviews and public coverage of Harsh Verma.",
      "CollectionPage",
      loaderData?.image,
    ),
  component: MediaDetail,
});
function MediaDetail() {
  const i = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow={`// ${i.publisher} · ${i.year ?? "media"}`}
        title={i.title}
        intro={i.summary}
      />
      <section className="mx-auto max-w-5xl px-6 py-12">
        {i.image && (
          <img
            src={i.image}
            alt={i.title}
            className="max-h-[560px] w-full rounded-lg object-contain"
          />
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href={i.source} target="_blank" rel="noreferrer">
              Original coverage ↗
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Media enquiry</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/media-kit">Media kit</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          This entry references the original publisher. It does not reproduce the full article or
          imply an independent editorial classification that has not been verified.
        </p>
        <h2 className="mt-14 font-display text-3xl font-semibold">Related work</h2>
        <KnowledgeGraphEntry id={i.id} />
        <div className="mt-8">
          <KnowledgeCards items={relatedKnowledge(i.topics, i.id, 3)} />
        </div>
      </section>
    </>
  );
}
