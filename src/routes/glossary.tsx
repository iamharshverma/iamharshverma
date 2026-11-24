import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/site/Reveal";
import { RadarTermDiagram } from "@/components/impact/RadarTermDiagram";
import { RadarReferences } from "@/components/impact/RadarReferences";
import { glossaryCitations } from "@/data/radar-evidence";
import { filterRadarGlossary, radarGlossary } from "@/data/radar-glossary";
import { radarEntries } from "@/data/knowledge-impact";
import { radarSectors } from "@/data/radar-sectors";
import { contentHead } from "@/lib/content-head";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/glossary")({
  validateSearch: (raw: Record<string, unknown>): { q?: string; sector?: string } => ({
    ...(typeof raw["q"] === "string" && raw["q"] ? { q: raw["q"].slice(0, 200) } : {}),
    ...(typeof raw["sector"] === "string" && raw["sector"] ? { sector: raw["sector"] } : {}),
  }),
  head: () => {
    const head = contentHead("/glossary", "AI Engineering Glossary — Definitions & Diagrams", "Explore AI engineering terms with definitions, conceptual diagrams and primary sources, linked to Harsh Verma’s radar topics and technology guides.", "DefinedTermSet");
    return { ...head, scripts: [...head.scripts, { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "DefinedTermSet", "@id": `${SITE_URL}/glossary#terms`, name: "AI Engineering Glossary", url: `${SITE_URL}/glossary`, hasDefinedTerm: radarGlossary.map(term => ({ "@type": "DefinedTerm", name: term.title, description: term.definition, url: `${SITE_URL}/glossary#${term.id}`, inDefinedTermSet: `${SITE_URL}/glossary#terms` })) }) }] };
  },
  component: GlossaryPage,
});

function GlossaryPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const query = search.q ?? "";
  const sectorId = radarSectors.some(sector => sector.id === search.sector) ? search.sector ?? "" : "";
  const terms = filterRadarGlossary(query, sectorId);
  const update = (q: string, sector: string) => void navigate({ search: { ...(q ? { q } : {}), ...(sector ? { sector } : {}) }, replace: true, resetScroll: false });

  return <>
    <PageHero eyebrow="// engineering · reference desk" title="AI Engineering Glossary" intro="The language behind agentic systems, secure execution and accountable AI — with definitions, conceptual diagrams and links back to the radar." />
    <section className="knowledge-impact knowledge-refined mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm" className="px-0 text-brand"><Link to="/ai-engineering-radar"><ArrowLeft />AI Engineering Radar guide</Link></Button>
        <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground"><BookOpen className="size-4 text-brand" />{radarGlossary.length} connected terms</span>
      </div>
      <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground">Definitions are paraphrased from the cited sources with independent engineering interpretation. Diagrams and implementation sequences are illustrative, not measured architectures or reported study results.</p>
      <div className="my-8 border-y border-border py-6">
        <div className="relative max-w-xl"><Search aria-hidden="true" className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input type="search" aria-label="Search glossary" placeholder="Search a term or definition…" value={query} onChange={event => update(event.target.value, sectorId)} className="h-10 pl-10" /></div>
        <div className="radar-glossary-filters mt-4 flex flex-wrap gap-2" aria-label="Glossary topics">
          <Button variant="outline" size="sm" aria-pressed={!sectorId} onClick={() => update(query, "")}>All topics</Button>
          {radarSectors.map(sector => <Button key={sector.id} variant="outline" size="sm" aria-pressed={sectorId === sector.id} onClick={() => update(query, sector.id)}>{sector.title}</Button>)}
          {(query || sectorId) && <Button variant="ghost" size="sm" onClick={() => update("", "")}><X />Clear filters</Button>}
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground" aria-live="polite">{terms.length} {terms.length === 1 ? "term" : "terms"}</p>
      </div>
      {terms.length > 0 ? <div className="grid items-start gap-6 lg:grid-cols-2">
        {terms.map(term => {
          const sector = radarSectors.find(item => item.id === term.sectorId);
          return <article key={term.id} id={term.id} className="radar-glossary-card min-w-0 rounded-lg border border-border bg-card p-5 sm:p-6">
            <p className="impact-kicker">{sector?.title}</p>
            <h2 className="mt-2 font-display text-xl font-semibold">{term.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{term.definition}</p>
            <RadarTermDiagram term={term} />
            <RadarReferences citations={glossaryCitations(term.id)} compact />
            <nav aria-label={`${term.title} related guides`} className="mt-5 flex flex-wrap gap-2">
              {sector && <Button asChild variant="outline" size="sm" className="h-auto whitespace-normal py-2"><Link to="/radar/topics/$slug" params={{ slug: sector.id }}>{sector.title}<ArrowRight /></Link></Button>}
              {term.technologyIds.map(id => {
                const entry = radarEntries.find(item => item.id === id);
                return entry ? <Button key={id} asChild variant="ghost" size="sm" className="h-auto whitespace-normal py-2"><Link to="/radar/$slug" params={{ slug: id }}>{entry.title}<ArrowRight /></Link></Button> : null;
              })}
            </nav>
          </article>;
        })}
      </div> : <div className="border-b border-border py-12 text-center"><h2 className="font-display text-xl font-semibold">No Matching Terms</h2><Button variant="outline" className="mt-4" onClick={() => update("", "")}>Show all terms</Button></div>}
    </section>
  </>;
}