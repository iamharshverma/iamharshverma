import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Compass, GitBranch, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadarTopicWorkflow } from "./RadarGuideVisuals";
import { radarGuideTopics } from "@/data/radar-guide";
import { radarTopicArtwork, radarTechnologyGuides, relatedRadarTechnologies } from "@/data/radar-technology-guide";
import { type RadarEntry } from "@/data/knowledge-impact";
import { type RadarSector } from "@/data/radar-sectors";
import { GlossaryText } from "./GlossaryText";
import { RadarReferences } from "./RadarReferences";
import { technologyCitations, topicCitations } from "@/data/radar-evidence";

export function RadarTopicIntroduction({ sector }: { sector: RadarSector }) {
  const guide = radarGuideTopics[sector.id];
  const art = radarTopicArtwork[sector.id];
  if (!guide) return null;
  return <div className="border-t border-border pt-8">
    <div className="radar-dossier-layout">
      <div>
        <p className="impact-kicker">The topic in context</p>
        <h2 className="mt-3 font-display text-2xl font-semibold">{guide.headline}</h2>
        {guide.paragraphs.map(paragraph => <p key={paragraph} className="mt-4 text-sm leading-relaxed text-muted-foreground"><GlossaryText text={paragraph} /></p>)}
      </div>
      {art && <figure className="radar-dossier-figure"><img src={art.url} alt={art.alt} width={art.width} height={art.height} className="radar-dossier-art" fetchPriority="high" /><figcaption className="mt-3 font-mono text-xs text-muted-foreground">{sector.title} · Conceptual illustration</figcaption></figure>}
    </div>
    <RadarReferences citations={topicCitations(sector.id)} />
    <RadarTopicWorkflow sector={sector} guide={guide} />
    <div className="grid gap-6 pb-8 md:grid-cols-[1.4fr_1fr]">
      <div><h3 className="flex items-center gap-2 font-semibold"><Compass className="size-4 text-brand" />Example in practice</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{guide.scenario}</p></div>
      <div className="border-l-2 border-brand pl-5"><p className="impact-kicker">The review question</p><p className="mt-3 font-display text-lg font-semibold">{guide.question}</p></div>
    </div>
    <p className="border-t border-border py-4 text-xs leading-relaxed text-muted-foreground">Independent educational perspectives grounded in the references above. Examples, workflows and connections are illustrative, not reported study results, deployment claims or adoption recommendations. All technologies remain unassessed.</p>
  </div>;
}

export function RadarTechnologyBrief({ entry, compact = false, artwork }: { entry: RadarEntry; compact?: boolean; artwork?: { url: string; alt: string; width: number; height: number } }) {
  const brief = radarTechnologyGuides[entry.id];
  const [step, setStep] = useState<number | null>(0);
  if (!brief) return null;
  return <div data-technology-brief={entry.id}>
    <div className={artwork ? "radar-dossier-layout" : ""}>
      <div><h2 className={`font-display font-semibold ${compact ? "text-base" : "text-2xl"}`}>How {entry.title} works</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground"><GlossaryText text={brief.definition} /></p></div>
      {artwork && <figure className="radar-dossier-figure"><img src={artwork.url} alt={artwork.alt} width={artwork.width} height={artwork.height} fetchPriority="high" className="radar-dossier-art" /><figcaption className="mt-3 font-mono text-xs text-muted-foreground">{entry.title} · Conceptual illustration</figcaption></figure>}
    </div>
    <RadarReferences citations={technologyCitations(entry.id)} compact={compact} />
    <div className="radar-technology-loop my-6 border-y border-border py-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="flex items-center gap-2 text-sm font-semibold"><GitBranch className="size-4 text-brand" />From design to verification</h3><span className="impact-kicker">Illustrative workflow</span></div>
      <div className="radar-guide-stages mt-4 grid gap-3 sm:grid-cols-3" aria-label={`${entry.title} engineering workflow`}>
        {brief.stages.map((stage, index) => <Button key={stage} variant="ghost" aria-pressed={step === index} aria-expanded={step === index} aria-controls={`radar-step-${entry.id}`} onClick={() => setStep(value => value === index ? null : index)} title={step === index ? `Close ${stage}` : `Explore ${stage}`} className="relative h-auto min-h-20 items-start justify-start gap-3 whitespace-normal rounded-lg border border-border p-4 text-left">
          <span className="font-mono text-xs">0{index + 1}</span><span className="min-w-0 flex-1">{stage}</span>{step === index ? <X className="size-4 shrink-0 text-brand" /> : <ArrowRight className="size-4 shrink-0 text-muted-foreground" />}
        </Button>)}
      </div>
      <div id={`radar-step-${entry.id}`} className="mt-4 min-h-20" aria-live="polite">
        {step !== null && <div className="flex items-start justify-between gap-3 border-l-2 border-brand pl-4"><div><h4 className="text-sm font-semibold">{brief.stages[step]}</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{brief.checks[step]}</p></div><Button variant="ghost" size="icon" className="shrink-0" aria-label={`Close ${entry.title} workflow details`} title="Close workflow details" onClick={() => setStep(null)}><X /></Button></div>}
      </div>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <div><h3 className="flex items-center gap-2 text-sm font-semibold"><Compass className="size-4 text-brand" />Example in practice</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{brief.scenario}</p></div>
      <div className="border-l-2 border-brand pl-4"><h3 className="flex items-center gap-2 text-sm font-semibold"><ShieldAlert className="size-4 text-brand" />The failure to design for</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{brief.failure}</p></div>
    </div>
    <div className="mt-7">
      <h3 className="text-sm font-semibold">Implementation Review</h3>
      <ul className="mt-3 space-y-3">{brief.checks.map(check => <li key={check} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" /><span>{check}</span></li>)}</ul>
    </div>
  </div>;
}

/** Conceptual links are explicit editorial relationships, not measured strengths. */
export function RadarRelationshipGraph({ sector, entry }: { sector: RadarSector; entry?: RadarEntry }) {
  const targets = entry ? relatedRadarTechnologies(entry.id) : sector.entries;
  const origin = entry?.title ?? sector.title;
  if (!targets.length) return null;
  const count = targets.length;
  const height = count * 76;
  return <section className="my-10 border-y border-border py-8" aria-label={`${origin} technology connections`}>
    <p className="impact-kicker">{entry ? "Connected engineering concerns" : "The topic at a glance"}</p>
    <h2 className="mt-3 font-display text-2xl font-semibold">{entry ? "Where it connects" : "One topic, connected technologies"}</h2>
    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{entry ? "These technologies address adjacent design constraints. Connections express conceptual relationships, not citations or measured dependencies." : `All ${count} technologies in ${sector.title}, connected to their individual guides. Inclusion does not imply maturity or deployment.`}</p>
    <div className="radar-dossier-graph mt-7">
      <div className="radar-dossier-origin"><GitBranch className="size-6 text-brand" /><strong className="font-display text-lg">{origin}</strong><span className="text-xs text-muted-foreground">{entry ? sector.title : `${count} technologies · Unassessed`}</span></div>
      <svg viewBox={`0 0 120 ${height}`} preserveAspectRatio="none" className="radar-dossier-lines" aria-hidden="true">
        {targets.map((target, index) => <path key={target.id} d={`M 0 ${height / 2} C 55 ${height / 2}, 65 ${index * 76 + 38}, 118 ${index * 76 + 38}`} />)}
      </svg>
      <div className="grid gap-3">{targets.map(target => <Button asChild key={target.id} variant="ghost" className="radar-dossier-target h-auto min-h-16 justify-between gap-3 whitespace-normal rounded-lg border border-border px-4 py-3 text-left"><Link to="/radar/$slug" params={{ slug: target.id }}><span className="min-w-0"><strong className="block text-sm">{target.title}</strong><span className="mt-1 block text-xs text-muted-foreground">{target.sector}</span></span><ArrowRight className="size-4 shrink-0 text-brand" /></Link></Button>)}</div>
    </div>
  </section>;
}