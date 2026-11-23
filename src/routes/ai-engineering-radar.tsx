import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Compass, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Reveal";
import { RadarSectorContent } from "@/components/impact/RadarSectorContent";
import { radarSectors } from "@/data/radar-sectors";
import { contentHead } from "@/lib/content-head";
import { radarGuideImage, radarGuideTopics } from "@/data/radar-guide";
import { RadarGuideMap, RadarTopicWorkflow } from "@/components/impact/RadarGuideVisuals";
import { GlossaryText } from "@/components/impact/GlossaryText";
import { RadarReferences } from "@/components/impact/RadarReferences";
import { topicCitations } from "@/data/radar-evidence";

export const Route = createFileRoute("/ai-engineering-radar")({
  head: () => contentHead("/ai-engineering-radar", "AI Engineering Radar — Topics & Technology Guide", "Explore Harsh Verma’s AI Engineering Radar: five topics and 29 technologies, with architecture diagrams, practical workflows, security considerations and related research.", "CollectionPage", radarGuideImage),
  component: RadarGuide,
});

function RadarGuide() {
  return <>
    <PageHero eyebrow="// engineering · technology perspectives" title="AI Engineering Radar" intro="Agentic systems, AI security, enterprise AI, engineering foundations and responsible AI — a connected guide to the technologies shaping intelligent systems." />
    <section className="knowledge-impact knowledge-refined mx-auto max-w-6xl px-6 py-10">
      <Button asChild variant="ghost" size="sm" className="mb-8 px-0 text-brand"><Link to="/knowledge-impact" search={{ mode: "radar" }}><ArrowLeft />Back to the interactive radar</Link></Button>
      <Button asChild variant="outline" size="sm" className="mb-8 ml-3"><Link to="/glossary"><BookOpen />Engineering glossary</Link></Button>
      <figure>
        <img src={radarGuideImage} alt="Isometric AI architecture connecting agent orchestration, a security gateway, enterprise data pipelines, computing infrastructure and human oversight" width="1672" height="941" className="radar-guide-cover" fetchPriority="high" />
        <figcaption className="mt-3 font-mono text-xs text-muted-foreground">Conceptual architecture · Five connected engineering domains</figcaption>
      </figure>
      <div className="grid gap-6 border-b border-border py-10 md:grid-cols-[1fr_1.2fr]">
        <div><p className="impact-kicker">The engineering perspective</p><h2 className="mt-3 font-display text-3xl font-semibold">Beyond the model.</h2></div>
        <div><p className="text-sm leading-relaxed">An intelligent system must coordinate actions, protect access, use reliable context, survive failure and remain accountable. These five topics frame those concerns as a connected engineering discipline, rather than a list of isolated tools.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">These perspectives connect to Harsh Verma’s existing research and writing. Examples and diagrams are illustrative. All technologies remain unassessed: inclusion is not an adoption recommendation or a claim of deployment.</p></div>
      </div>
      <div className="py-10"><RadarGuideMap /></div>
      <nav aria-label="Radar guide topics" className="flex flex-wrap gap-2 border-t border-border py-6">{radarSectors.map((sector, index) => <Button asChild key={sector.id} variant="outline" size="sm"><a href={`#${sector.id}`}><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>{sector.title}</a></Button>)}</nav>
      {radarSectors.map((sector, index) => {
        const guide = radarGuideTopics[sector.id];
        return <section key={sector.id} id={sector.id} className={`impact-tone-${index} scroll-mt-24 border-t border-border py-12`}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div><p className="impact-kicker">0{index + 1} / {sector.entries.length} technologies</p><h2 className="radar-overview-title mt-2 font-display text-3xl font-semibold">{sector.title}</h2></div>
          <Button asChild variant="ghost" size="sm"><Link to="/radar/topics/$slug" params={{ slug: sector.id }}>Topic page<ArrowRight /></Link></Button>
        </div>
        {guide && <>
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div><h3 className="font-display text-xl font-semibold sm:text-2xl">{guide.headline}</h3>{guide.paragraphs.map(paragraph => <p key={paragraph} className="mt-4 text-sm leading-relaxed text-muted-foreground"><GlossaryText text={paragraph} /></p>)}</div>
            <figure><img src={guide.image} alt={guide.imageAlt} width="800" height="600" loading="lazy" className="radar-guide-topic-art" /><figcaption className="mt-2 font-mono text-xs text-muted-foreground">{sector.title} · Conceptual domain illustration</figcaption></figure>
          </div>
          <RadarReferences citations={topicCitations(sector.id)} />
          <RadarTopicWorkflow sector={sector} guide={guide} />
          <div className="mb-8 grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <div><h3 className="flex items-center gap-2 text-sm font-semibold"><Compass className="size-4 text-brand" />Example in practice</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{guide.scenario}</p></div>
            <div className="border-l-2 border-brand pl-5"><p className="impact-kicker">The review question</p><p className="mt-3 font-display text-lg font-semibold">{guide.question}</p></div>
          </div>
        </>}
        <RadarSectorContent sector={sector} />
      </section>;
      })}
    </section>
  </>;
}