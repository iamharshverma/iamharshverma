import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { KnowledgeLink } from "@/components/site/KnowledgeCards";
import { getImpactTopic } from "@/data/knowledge-impact";
import type { RadarSector } from "@/data/radar-sectors";
import { RadarTechnologyBrief } from "./RadarDossier";
import { RadarReferences } from "./RadarReferences";
import { technologyCitations } from "@/data/radar-evidence";
import { GlossaryText } from "./GlossaryText";

export function RadarSectorContent({ sector, enriched = false }: { sector: RadarSector; enriched?: boolean }) {
  const [expanded, setExpanded] = useState<string[]>([]);
  return (
    <div>
      <p className="text-sm leading-relaxed text-muted-foreground"><GlossaryText text={sector.summary} /></p>
      <p className="mt-3 text-sm leading-relaxed"><GlossaryText text={sector.why} /></p>
      <h4 className="mt-6 font-display font-semibold">Technologies</h4>
      <p className="mt-1 font-mono text-xs text-muted-foreground">{sector.entries.length} technologies · Unassessed</p>
      <Accordion key={sector.id} type="multiple" value={expanded} onValueChange={setExpanded} data-radar-technologies className="radar-technology-accordion mt-4 space-y-3">
        {sector.entries.map((entry, index) => (
          <AccordionItem key={entry.id} value={entry.id} className="rounded-lg border border-border px-4 data-[state=open]:border-brand">
            <AccordionTrigger className="gap-3 font-semibold hover:no-underline" title={expanded.includes(entry.id) ? `Close ${entry.title}` : `Expand ${entry.title}`}>
              <span className="flex min-w-0 items-baseline gap-3">
                <span className="font-mono text-xs text-stat-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{entry.title}</span>
              </span>
              {expanded.includes(entry.id) && <span className="radar-technology-open-label ml-auto flex shrink-0 items-center gap-1.5 text-xs"><X className="size-3" />Close</span>}
            </AccordionTrigger>
            <AccordionContent>
              {enriched ? <RadarTechnologyBrief key={entry.id} entry={entry} compact /> : <p className="text-xs leading-relaxed text-muted-foreground">{entry.rationale}</p>}
              {!enriched && <RadarReferences citations={technologyCitations(entry.id)} compact />}
              <p className="mt-4 text-xs text-muted-foreground">Illustrative implementation perspectives, not findings reported by the cited sources.</p>
              <dl className="mt-4 space-y-4">
                {([
                  ["Engineering implication", entry.implication],
                  ["Security consideration", entry.security],
                  ["Opportunity", entry.opportunity],
                  ["Challenge", entry.challenge],
                ] as const).map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-sm font-semibold">{label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted-foreground"><GlossaryText text={value} /></dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 border-t border-border pt-4">
                <p className="impact-kicker">Related work</p>
                {getImpactTopic(entry.topic)?.resources.slice(0, 3).map((resource) => (
                  <KnowledgeLink key={resource.id} item={resource} className="mt-3 block text-sm font-semibold hover:text-brand">
                    {resource.title} ↗
                  </KnowledgeLink>
                ))}
              </div>
              <Button asChild variant="outline" size="sm" className="mt-5">
                <Link to="/radar/$slug" params={{ slug: entry.id }}>Open technology page<ArrowRight /></Link>
              </Button>
              <Button variant="ghost" size="sm" className="mt-5 ml-2" onClick={() => setExpanded(values => values.filter(value => value !== entry.id))} aria-label={`Close ${entry.title}`}><X />Close details</Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-7 border-t border-border pt-5">
        <h4 className="font-display font-semibold">Engineering principles</h4>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {sector.principles.map((principle) => <li key={principle}>{principle}</li>)}
        </ul>
        {sector.sources.length > 0 && <div className="mt-5">
          <p className="impact-kicker">Source references</p>
          {sector.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm font-semibold hover:text-brand">{source.title} ↗</a>)}
        </div>}
      </div>
    </div>
  );
}