import { ExternalLink, BookOpen } from "lucide-react";
import type { RadarCitation } from "@/data/radar-citations";

export function RadarReferences({ citations, compact = false }: { citations: RadarCitation[]; compact?: boolean }) {
  if (!citations.length) return null;
  return <section className="mt-6 border-t border-border pt-5" aria-label="Sources and evidence">
    <h3 className="flex items-center gap-2 font-display text-base font-semibold"><BookOpen className="size-4 text-brand" />Sources &amp; evidence</h3>
    <ol className="mt-4 space-y-4">
      {citations.map(({ source, claim }, index) => <li key={source.id} className="flex gap-3">
        <span className="mt-0.5 shrink-0 font-mono text-xs text-brand">[{index + 1}]</span>
        <div className="min-w-0">
          <p className="text-sm leading-relaxed">{claim} <a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Read reference ${index + 1}: ${source.title}`} className="font-semibold text-brand underline underline-offset-4">[{index + 1}]</a></p>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-start gap-2 text-sm font-semibold leading-relaxed hover:text-brand"><span>{source.title}</span><ExternalLink className="mt-1 size-3 shrink-0 text-brand" /></a>
          <p className="mt-1 text-xs text-muted-foreground">{source.publisher} · {source.kind}</p>
        </div>
      </li>)}
    </ol>
    {!compact && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">References support the specific statements above. Definitions are paraphrased synthesis; scenarios, diagrams, implementation checks and portfolio connections are independent educational examples, not results reported by these sources.</p>}
  </section>;
}