import { useEffect, useState } from "react";
import { Instagram, Play, LoaderCircle, RotateCcw } from "lucide-react";
import { reels } from "@/data/media";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export function ReelWall() {
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"poster" | "loading" | "ready" | "unavailable">("poster");
  useEffect(() => {
    if (status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("unavailable"), 12000);
    return () => window.clearTimeout(timeout);
  }, [status]);
  const r = reels[active];
  if (!r) return null;
  const start = () => {
    setStatus("loading");
    window.__lovableEvents?.track?.("project.keynote_played", { keynote: `reel:${r.id}`, source: "speaking-reels" });
  };
  return (
    <div className="reel-wall grid items-center gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <Reveal>
        <div className="mx-auto w-full max-w-[22rem] rounded-[2.5rem] border border-border bg-card p-3 shadow-glow">
          <div className="mx-auto mb-2 h-1.5 w-20 rounded-full bg-muted" />
          <div className="relative h-[36rem] overflow-hidden rounded-[2rem] bg-background">
            <img key={r.id} src={r.thumbnail} alt={`${r.label} reel thumbnail`} width={608} height={1080} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            {(status === "loading" || status === "ready") && <iframe key={r.id} title={`Instagram reel: ${r.label}`} src={`https://www.instagram.com/p/${r.id}/embed/`}
              onLoad={() => setStatus(current => current === "loading" ? "ready" : current)} onError={() => setStatus("unavailable")}
              className={`absolute inset-0 h-full w-full border-0 ${status === "ready" ? "opacity-100" : "opacity-0"}`} allow="encrypted-media; picture-in-picture" />}
            {status === "poster" && <Button variant="ghost" size="icon" onClick={start} aria-label={`Play ${r.label} reel`} title={`Play ${r.label}`} className="reel-play-overlay absolute top-1/2 left-1/2 z-10 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform hover:scale-105 [&_svg]:size-10"><Play className="ml-1 fill-current" /></Button>}
            {status !== "ready" && <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-background/95 px-5 py-6 text-center">
              <p className="font-display text-xl font-semibold">{r.label}</p>
              <p className="font-mono text-xs text-muted-foreground">@{r.account}</p>
              {status === "loading" && <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" />Loading Instagram…</p>}
              {status === "unavailable" && <Button onClick={start} className="gap-2"><RotateCcw />Try again</Button>}
              {status === "unavailable" && <p role="status" className="text-sm text-muted-foreground">Instagram is taking longer than expected.</p>}
            </div>}
          </div>
          <Button asChild variant="link" className="mt-2 h-auto w-full whitespace-normal text-xs"><a href={`https://www.instagram.com/p/${r.id}/`} target="_blank" rel="noopener noreferrer"><Instagram className="size-4" />Watch on Instagram</a></Button>
        </div>
      </Reveal>
      <div>
        <p className="text-muted-foreground">Short clips from stages, awards and the <span className="text-brand">@aiwithharsh</span> channel. Pick a reel to play it.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {reels.map((x, i) => (
            <Button variant="outline" key={x.id} onClick={() => { setActive(i); setStatus("poster"); }} aria-pressed={i === active}
              className={`h-auto justify-start whitespace-normal gap-3 rounded-2xl border p-4 text-left transition ${i === active ? "border-brand bg-card shadow-glow" : "border-border bg-card/50 hover:border-brand/50"}`}>
              <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                <img src={x.thumbnail} alt="" width={48} height={64} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute bottom-1 right-1 flex size-5 items-center justify-center rounded-full bg-background/90 text-foreground"><Play className="size-3" /></span>
              </span>
              <span className="min-w-0"><span className="block font-display">{x.label}</span><span className="block truncate font-mono text-xs text-muted-foreground">@{x.account}</span></span>
            </Button>
          ))}
        </div>
        <a href="https://www.instagram.com/aiwithharsh/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium hover:border-brand">
          <Instagram className="h-4 w-4" /> Follow @aiwithharsh
        </a>
      </div>
    </div>
  );
}
