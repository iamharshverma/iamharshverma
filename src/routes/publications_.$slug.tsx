import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { publications } from "@/data/publications";
import { contentHead } from "@/lib/content-head";
import { publicationHead } from "@/lib/publication-seo";
import { PublicationDetails } from "@/components/site/PublicationDetails";
import { KnowledgeGraphEntry } from "@/components/site/KnowledgeGraphEntry";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { relatedKnowledge } from "@/data/knowledge";
import { PublicationTopicDiagram } from '@/components/site/PublicationTopicDiagram';
import { publicationPresentation } from '@/lib/publication-presentation';

export const Route = createFileRoute("/publications_/$slug")({
  loader: ({ params }) => { const p = publications.find(record => record.slug === params.slug); if (!p) throw notFound(); return p; },
  head: ({ loaderData: p }) => p ? publicationHead(p) : contentHead("/publications", "Publication unavailable", "Source-linked research by Harsh Verma."),
  component: PublicationPage,
});
function PublicationPage() {
  const p = Route.useLoaderData();
  return <article className="publication-dossier mx-auto max-w-5xl px-6 pb-14 pt-28 sm:pt-36" style={{ ['--paper-tone' as string]: publicationPresentation(p).color }}><Link to="/publications" className="text-sm text-brand">← Publications index</Link><div className="mt-7"><PublicationDetails publication={p} page /></div><PublicationTopicDiagram publication={p}/><KnowledgeGraphEntry id={`publication:${p.slug}`} /><h2 className="mt-10 mb-6 font-display text-2xl font-semibold">Connected Research & Perspectives</h2><KnowledgeCards items={relatedKnowledge(p.topics, `publication:${p.slug}`, 6)} /></article>;
}