import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Radar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Reveal";
import { RadarSectorContent } from "@/components/impact/RadarSectorContent";
import { getRadarSector, radarSectors } from "@/data/radar-sectors";
import { contentHead } from "@/lib/content-head";
import { RadarTopicIntroduction, RadarRelationshipGraph } from "@/components/impact/RadarDossier";
import { radarTopicArtwork } from "@/data/radar-technology-guide";

export const Route = createFileRoute("/radar/topics/$slug")({
  loader: ({ params }) => {
    const sector = getRadarSector(params.slug);
    if (!sector) throw notFound();
    return sector;
  },
  head: ({ loaderData }) => contentHead(
    `/radar/topics/${loaderData?.id ?? ""}`,
    loaderData ? `${loaderData.title} — Engineering Radar Technologies` : "Radar topic unavailable",
    loaderData ? `Explore ${loaderData.title} with Harsh Verma: ${loaderData.entries.length} technologies, engineering implications, security considerations and related work. ${loaderData.summary}` : "Explore the topics on Harsh Verma’s AI Engineering Radar.",
    "CollectionPage",
    radarTopicArtwork[loaderData?.id ?? ""]?.url,
  ),
  component: RadarTopicPage,
});

function RadarTopicPage() {
  const sector = Route.useLoaderData();
  return <>
    <PageHero eyebrow="// engineering radar · topic" title={sector.title} intro={sector.summary} />
    <section className={`knowledge-impact knowledge-refined impact-tone-${radarSectors.findIndex(item => item.id === sector.id)} mx-auto max-w-5xl px-6 py-12`}>
      <Button asChild variant="ghost" size="sm" className="mb-8 px-0 text-brand">
        <Link to="/knowledge-impact" search={{ mode: "radar", topic: sector.topic }}><ArrowLeft />Back to the Engineering Radar</Link>
      </Button>
      <Button asChild variant="outline" size="sm" className="mb-8 ml-3"><Link to="/glossary" search={{ sector: sector.id }}><BookOpen />Topic glossary</Link></Button>
      <RadarTopicIntroduction sector={sector} />
      <RadarRelationshipGraph sector={sector} />
      <RadarSectorContent key={sector.id} sector={sector} enriched />
      <nav aria-label="Other radar topics" className="mt-10 border-t border-border pt-6">
        <h2 className="font-display text-xl font-semibold">More radar topics</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="radar-current-pill h-auto whitespace-normal py-2" aria-current="page" title={`${sector.title} — you are here`}>
            <Radar />{sector.title}
          </Button>
          {radarSectors.filter((item) => item.id !== sector.id).map((item) => <Button key={item.id} asChild variant="outline" size="sm" className="h-auto whitespace-normal py-2">
            <Link to="/radar/topics/$slug" params={{ slug: item.id }}><Radar />{item.title}</Link>
          </Button>)}
        </div>
      </nav>
    </section>
  </>;
}