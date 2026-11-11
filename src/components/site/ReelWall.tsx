import { useState } from "react";
import { Instagram, Play } from "lucide-react";
import { reels } from "@/data/media";
import { Reveal } from "@/components/site/Reveal";

export function ReelWall() {
  const [active, setActive] = useState(0);
  const r = reels[active]!;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <Reveal>
        <div className="mx-auto w-full max-w-[22rem] rounded-[2.5rem] border border-border bg-card p-3 shadow-glow">
          <div className="mx-auto mb-2 h-1.5 w-20 rounded-full bg-muted" />
          <div className="overflow-hidden rounded-[2rem] bg-background">
            <iframe key={r.id} title={`Instagram reel: ${r.label}`} src={`https://www.instagram.com/p/${r.id}/embed/`}
              className="h-[36rem] w-full border-0" loading="lazy" allow="encrypted-media; picture-in-picture" />
          </div>
        </div>
      </Reveal>
      <div>
        <p className="text-muted-foreground">Short clips from stages, awards and the <span className="text-brand">@aiwithharsh</span> channel. Pick a reel to play it.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {reels.map((x, i) => (
            <button key={x.id} onClick={() => { setActive(i); window.__lovableEvents?.track?.("project.keynote_played", { keynote: `reel:${x.id}`, source: "speaking-reels" }); }} aria-pressed={i === active}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${i === active ? "border-brand bg-card shadow-glow" : "border-border bg-card/50 hover:border-brand/50"}`}>
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${i === active ? "bg-brand-gradient text-primary-foreground" : "bg-muted text-foreground"}`}><Play className="h-4 w-4" /></span>
              <span className="min-w-0"><span className="block font-display">{x.label}</span><span className="block truncate font-mono text-xs text-muted-foreground">@{x.account}</span></span>
            </button>
          ))}
        </div>
        <a href="https://www.instagram.com/aiwithharsh/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium hover:border-brand">
          <Instagram className="h-4 w-4" /> Follow @aiwithharsh
        </a>
      </div>
    </div>
  );
}
