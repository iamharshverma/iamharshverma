import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/site/Logo";
import { radarSectors, type RadarSector } from "@/data/radar-sectors";
import { radarGuideTopics, type RadarGuideTopic } from "@/data/radar-guide";

const positions = [[375, 48], [605, 146], [520, 310], [230, 310], [145, 146]];

export function RadarGuideMap() {
  const [selected, setSelected] = useState("agentic-systems");
  const sector = radarSectors.find(item => item.id === selected);
  const detail = radarGuideTopics[selected];
  return <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
    <div className="min-w-0">
      <p className="impact-kicker">Connected engineering concerns</p>
      <svg viewBox="0 0 750 380" className="radar-guide-map mt-4 w-full" role="group" aria-label="Connected AI engineering topics">
        {radarSectors.map((item, index) => {
          const position = positions[index];
          if (!position) return null;
          const [x = 375, y = 185] = position;
          return <g key={item.id} className={`impact-tone-${index} ${item.id === selected ? "is-selected" : ""}`}>
            <path d={`M 375 185 Q ${x} 185 ${x} ${y}`} className="radar-guide-map-edge" />
            <g role="button" tabIndex={0} aria-label={`Explore ${item.title}`} aria-pressed={item.id === selected} className="radar-guide-map-node" onClick={() => setSelected(item.id)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(item.id); } }}>
              <rect x={x - 98} y={y - 30} width="196" height="60" rx="8" />
              <text x={x} y={y - 2} textAnchor="middle">{item.title}</text>
              <text x={x} y={y + 17} textAnchor="middle" className="radar-guide-map-count">{item.entries.length} technologies</text>
            </g>
          </g>;
        })}
        <circle cx="375" cy="185" r="39" className="radar-guide-map-core" />
        <svg x="351" y="161" width="48" height="48" viewBox="0 0 48 48"><LogoMark className="size-full" /></svg>
      </svg>
      {sector && detail && <div className="border-l-2 border-brand pl-4" aria-live="polite">
        <h3 className="font-display text-lg font-semibold">{sector.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail.question}</p>
        <Button asChild variant="link" size="sm" className="mt-2 px-0"><a href={`#${sector.id}`}>Explore this topic<ArrowRight /></a></Button>
      </div>}
    </div>
    <div>
      <p className="impact-kicker">Technology inventory / by topic</p>
      <h3 className="mt-3 font-display text-2xl font-semibold">Five lenses. One system.</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">The bars count technologies in this guide, not maturity, adoption or performance. Each topic contributes a different constraint to the same engineering workflow.</p>
      <div className="mt-6 space-y-5" aria-label="Technology counts by topic">
        {radarSectors.map((item, index) => <a key={item.id} href={`#${item.id}`} className={`impact-tone-${index} radar-guide-inventory block`}>
          <span className="flex items-center justify-between gap-3 text-sm font-semibold"><span>{item.title}</span><span className="font-mono">{item.entries.length}</span></span>
          <svg viewBox="0 0 290 9" className="mt-2 h-2 w-full" role="img" aria-label={`${item.title}: ${item.entries.length} technologies`}><rect width="290" height="9" rx="4" className="radar-guide-bar-track" /><rect width={290 * item.entries.length / Math.max(...radarSectors.map(s => s.entries.length))} height="9" rx="4" className="radar-guide-bar" /></svg>
        </a>)}
      </div>
      <p className="mt-6 border-t border-border pt-4 font-mono text-xs text-muted-foreground">{radarSectors.reduce((sum, item) => sum + item.entries.length, 0)} technologies · All unassessed</p>
    </div>
  </div>;
}

export function RadarTopicWorkflow({ sector, guide }: { sector: RadarSector; guide: RadarGuideTopic }) {
  const [step, setStep] = useState(0);
  const active = guide.stages[step];
  return <div className="radar-guide-workflow my-8 border-y border-border py-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h3 className="flex items-center gap-2 font-display font-semibold"><CheckCircle2 className="size-4 text-brand" />A practical engineering loop</h3>
      <span className="impact-kicker">Illustrative workflow</span>
    </div>
    <div className="radar-guide-stages mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label={`${sector.title} workflow stages`}>
      {guide.stages.map((stage, index) => <Button key={stage.title} variant="ghost" aria-pressed={step === index} className="relative h-auto min-h-20 flex-col items-start justify-start gap-2 whitespace-normal rounded-lg border border-border p-4 text-left" onClick={() => setStep(index)}>
        <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span><span>{stage.title}</span><ArrowRight className="absolute right-3 top-4 size-3 text-muted-foreground" />
      </Button>)}
    </div>
    <div className="mt-4 min-h-24 border-l-2 border-brand pl-4" aria-live="polite">
      <h4 className="text-sm font-semibold">{active?.title}</h4>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{active?.detail}</p>
    </div>
  </div>;
}