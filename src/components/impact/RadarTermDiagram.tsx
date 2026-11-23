import { ArrowDown, ArrowRight, GitBranch } from "lucide-react";
import type { RadarGlossaryTerm } from "@/data/radar-glossary";

export function RadarTermDiagram({ term }: { term: RadarGlossaryTerm }) {
  return <figure className="my-5 border-y border-border py-4" aria-label={`${term.title} conceptual diagram`}>
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      {term.diagram.map((stage, index) => <div key={stage} className="contents">
        {index > 0 && <><ArrowRight aria-hidden="true" className="hidden size-4 shrink-0 text-brand sm:block" /><ArrowDown aria-hidden="true" className="mx-auto size-4 shrink-0 text-brand sm:hidden" /></>}
        <div className="flex min-h-16 min-w-0 flex-1 items-center gap-2 rounded-lg border border-border px-3 py-3"><span className="font-mono text-xs text-brand">{index + 1}</span><span className="text-xs font-semibold leading-relaxed">{stage}</span></div>
      </div>)}
    </div>
    <figcaption className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><GitBranch className="size-3" />Conceptual sequence · not a measured architecture</figcaption>
  </figure>;
}