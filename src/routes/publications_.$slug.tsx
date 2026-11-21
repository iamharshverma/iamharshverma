import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { publications } from "@/data/publications";
import { contentHead } from "@/lib/content-head";
import { PublicationDetails } from "@/components/site/PublicationDetails";
import { KnowledgeGraphEntry } from "@/components/site/KnowledgeGraphEntry";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { relatedKnowledge } from "@/data/knowledge";

export const Route = createFileRoute("/publications_/$slug")({
  loader: ({ params }) => { const p = publications.find(record => record.slug === params.slug); if (!p) throw notFound(); return p; },
  head: ({ loaderData: p }) => contentHead(`/publications/${p?.slug ?? ""}`, p?.title ?? "Publication unavailable", p ? `${p.status} research record by Harsh Verma. ${p.abstract.slice(0, 180)}` : "Source-linked research by Harsh Verma.", p?.status === "Published" ? "ScholarlyArticle" : "CreativeWork"),
  component: PublicationPage,
});
function PublicationPage() {
  const p = Route.useLoaderData();
  return <article className="mx-auto max-w-5xl px-6 pb-14 pt-28 sm:pt-36"><Link to="/publications" className="text-sm text-brand">← Publications index</Link><div className="mt-7 grid gap-8 md:grid-cols-[minmax(0,1fr)_200px]"><PublicationDetails publication={p} page /><img src={p.image} alt={`${p.title} — editorial research diagram`} className="aspect-square w-full rounded-md object-cover" /></div><KnowledgeGraphEntry id={`publication:${p.slug}`} /><h2 className="mt-10 mb-6 font-display text-2xl font-semibold">Connected research & perspectives</h2><KnowledgeCards items={relatedKnowledge(p.topics, `publication:${p.slug}`, 6)} /></article>;
}