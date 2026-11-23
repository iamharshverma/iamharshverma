import { Link } from "@tanstack/react-router";
import { ArrowRight, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { radarSectors } from "@/data/radar-sectors";
import { radarEntries } from "@/data/knowledge-impact";
import { radarGuideImage } from "@/data/radar-guide";
import { RadarSummaryHeading } from "./RadarSummaryHeading";

export function RadarOverview() {
  return <div className="impact-radar-panel">
    <RadarSummaryHeading eyebrow="Engineering perspectives" title="AI Engineering Radar" artwork={{ url: radarGuideImage, alt: "Connected agent, security, enterprise, engineering and oversight architecture", width: 1672, height: 941 }}>
      <p className="mt-3 font-mono text-xs text-stat-number">{radarSectors.length} topics · {radarEntries.length} technologies</p>
    </RadarSummaryHeading>
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">A connected view of agentic systems, AI security, enterprise adoption, engineering foundations and responsible AI. Explore the engineering implications, security considerations, opportunities and challenges behind every technology.</p>
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