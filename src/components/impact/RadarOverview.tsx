import { Link } from "@tanstack/react-router";
import { ArrowRight, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { radarSectors } from "@/data/radar-sectors";
import { radarEntries } from "@/data/knowledge-impact";

export function RadarOverview() {
  return <div className="impact-radar-panel">
    <p className="impact-kicker">Engineering perspectives</p>
    <h3 className="mt-3 font-display text-2xl font-semibold">AI Engineering Radar</h3>
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">A connected view of agentic systems, AI security, enterprise adoption, engineering foundations and responsible AI. Explore the engineering implications, security considerations, opportunities and challenges behind every technology.</p>
    <p className="mt-4 font-mono text-xs text-stat-number">{radarSectors.length} topics · {radarEntries.length} technologies</p>
    <Button asChild variant="outline" size="sm" className="my-5 h-auto whitespace-normal py-2">
      <Link to="/ai-engineering-radar"><Radar />Open AI Engineering Radar<ArrowRight /></Link>
    </Button>
    <div className="divide-y divide-border">
      {radarSectors.map((sector, index) => <div key={sector.id} className={`impact-tone-${index} py-4`}>
        <Link to="/radar/topics/$slug" params={{ slug: sector.id }} className="radar-overview-title inline-flex items-center gap-2 font-display font-semibold">{sector.title}<ArrowRight className="size-4" /></Link>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{sector.summary}</p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">{sector.entries.length} technologies</p>
      </div>)}
    </div>
  </div>;
}