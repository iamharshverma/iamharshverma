import { workImpact, impactMethodology } from "@/data/work-impact";

export function WorkImpactFacts({ id }: { id: string }) {
  const impact = workImpact(id);
  return <div className="mt-5 border-t border-border pt-4 text-sm text-foreground" aria-label="Work impact evidence">
    <p className="font-semibold">Impact {impact.score === null ? "unscored" : `${impact.score}/100`} <span className="font-normal text-muted-foreground">· {impact.coverage}/3 evidence dimensions</span></p>
    {impact.metrics.length === 0 && <p className="mt-2 text-xs text-muted-foreground">No verified per-work measurements available.</p>}
    {impact.metrics.map(metric => <p key={metric.key} className="mt-2 text-xs"><a href={metric.source} target="_blank" rel="noreferrer" className="text-brand underline">{metric.label}: {metric.value.toLocaleString("en-US")}</a><span className="text-muted-foreground"> · {metric.observedAt}</span></p>)}
    <details className="mt-3 text-xs text-muted-foreground"><summary className="cursor-pointer text-foreground">Scoring methodology</summary><p className="mt-2 leading-relaxed">{impactMethodology}</p></details>
  </div>;
}