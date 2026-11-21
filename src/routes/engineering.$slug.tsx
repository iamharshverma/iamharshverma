import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { caseStudies } from "@/data/case-studies";
import { contentHead } from "@/lib/content-head";
import { PageHero } from "@/components/site/Reveal";
import { ArchitectureFlow } from "@/components/site/ArchitectureFlow";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { relatedKnowledge, topicsFor } from "@/data/knowledge";
export const Route = createFileRoute("/engineering/$slug")({
  loader: ({ params }) => {
    const study = caseStudies.find((s) => s.slug === params.slug);
    if (!study) throw notFound();
    return study;
  },
  head: ({ loaderData }) =>
    contentHead(
      `/engineering/${loaderData?.slug ?? ""}`,
      loaderData?.title ?? "Case study unavailable",
      loaderData?.summary ?? "Public engineering reviews by Harsh Verma.",
      "TechArticle",
    ),
  component: CaseStudy,
});
function CaseStudy() {
  const study = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow={study.reviewBasis === "portfolio" ? "// public portfolio · independent project" : "// public source review · independent educational project"}
        title={study.title}
        intro={study.summary}
      />
      <article className="mx-auto max-w-5xl px-6 py-12">
        <Link to="/engineering" className="text-sm text-brand">
          ← Engineering & Architecture
        </Link>
        <img src={study.image} alt={`${study.title} — project illustration`} className="mt-8 aspect-[16/9] w-full rounded-lg object-cover" />
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {study.technology} · Repository reference · Not a measured production result
        </p>
        <ArchitectureFlow
          steps={study.flow}
          caption={study.reviewBasis === "portfolio" ? "Conceptual reading guide based on the owner’s public project description." : "Source-based component and data-flow overview."}
        />
        <div className="space-y-10">
          {study.sections.map((s) => (
            <section key={s.title} className="border-t border-border pt-8">
              <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
            </section>
          ))}
        </div>
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-2xl font-semibold">Source and reproducibility</h2>
          <a
            className="mt-5 inline-block break-all text-brand underline underline-offset-4"
            href={study.source}
            target="_blank"
            rel="noreferrer"
          >
            {study.reviewBasis === "portfolio" ? "Explore the public repository reference ↗" : "Inspect the public implementation ↗"}
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            {study.reviewBasis === "portfolio" ? "Listed on the author’s public portfolio. Architecture descriptions and original thumbnails are owner-provided; implementation details and performance are not independently verified." : "Reviewed November 21, 2026. HEAD follows the repository's current version; subsequent code changes may differ from this review."}
          </p>
        </section>
        <h2 className="mt-14 font-display text-3xl font-semibold">Related perspectives</h2>
        <div className="mt-8">
          <KnowledgeCards
            items={relatedKnowledge(topicsFor(study.title + study.topic), `case:${study.slug}`, 3)}
          />
        </div>
      </article>
    </>
  );
}
