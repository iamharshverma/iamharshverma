import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { researchPillars } from "@/data/research-pillars";
import { relatedKnowledge, topicsFor } from "@/data/knowledge";
import { contentHead } from "@/lib/content-head";
import { PageHero } from "@/components/site/Reveal";
import { ArchitectureFlow } from "@/components/site/ArchitectureFlow";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/research_/$pillar")({
  loader: ({ params }) => {
    const pillar = researchPillars.find((p) => p.slug === params.pillar);
    if (!pillar) throw notFound();
    return pillar;
  },
  head: ({ loaderData }) =>
    contentHead(
      `/research/${loaderData?.slug ?? ""}`,
      loaderData?.title ?? "Research unavailable",
      loaderData?.summary ?? "Explore Harsh Verma's public research perspectives.",
      "TechArticle",
    ),
  component: Pillar,
});
function Pillar() {
  const p = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="// research & expertise · personal technical perspective"
        title={p.title}
        intro={p.summary}
      />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex flex-wrap gap-2 text-sm text-muted-foreground"
        >
          <Link to="/research" className="text-brand">
            Research
          </Link>
          <span>/</span>
          <span>{p.title}</span>
        </nav>
        <img src={p.image} alt={`${p.title} — editorial illustration`} className="mb-10 aspect-[16/9] w-full rounded-lg object-cover" />
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Research thesis</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-snug">{p.thesis}</h2>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">The problem</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{p.problem}</p>
            <p className="mt-5 border-l-2 border-brand pl-4 text-sm text-muted-foreground">
              These are personal technical perspectives and proposed design patterns, not
              employer-endorsed architecture or claims of experimentally validated findings.
            </p>
          </div>
        </div>
        <ArchitectureFlow
          steps={p.flow}
          caption="Conceptual architecture; each handoff requires an explicit trust boundary."
        />
        <h2 className="mt-12 font-display text-3xl font-semibold">Core technical concepts</h2>
        <div className="mt-8 grid gap-x-10 md:grid-cols-2">
          {p.concepts.map((c) => (
            <div key={c.title} className="border-t border-border py-6">
              <h3 className="font-display text-xl font-semibold">{c.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-12 font-display text-3xl font-semibold">Threat & failure scenarios</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {p.scenarios.map((s) => (
            <article key={s.title} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
        <h2 className="mt-12 font-display text-3xl font-semibold">Engineering principles</h2>
        <ul className="mt-6 space-y-4">
          {p.principles.map((s) => (
            <li key={s} className="border-l-2 border-brand pl-4 leading-relaxed">
              {s}
            </li>
          ))}
        </ul>
        <h2 className="mt-16 font-display text-3xl font-semibold">Connected work</h2>
        <div className="mt-8">
          <KnowledgeCards
            items={relatedKnowledge(topicsFor(p.title + p.summary), `research:${p.slug}`, 6)}
          />
        </div>
        <h2 className="mt-14 font-display text-2xl font-semibold">Further reading</h2>
        <ul className="mt-5 space-y-3">
          {p.sources.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-brand underline underline-offset-4"
              >
                {s.title} ↗
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/knowledge" search={{ topic: topicsFor(p.title)[0] ?? "Agentic AI" }}>
              Explore this topic
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/engineering">Public engineering case studies</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
