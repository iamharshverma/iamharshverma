import { useState } from "react";
import { keynotes } from "@/data/media";

const ytId = (u: string) => u.match(/[?&]v=([\w-]{11})/)?.[1];
// Short clip: the opening 90 seconds of each YouTube keynote.
const clips = keynotes.map(k => ({ ...k, id: ytId(k.href) })).filter((k): k is typeof k & { id: string } => !!k.id).slice(0, 6);

export function KeynoteClips() {
  const [i, setI] = useState(0);
  const c = clips[i]!;
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <p className="eyebrow">Short clips</p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Keynote highlights in 90 seconds</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="aspect-video">
            <iframe key={c.id} className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${c.id}?start=0&end=90&rel=0`} title={c.title} loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <div className="p-5"><h3 className="font-display text-lg font-semibold">{c.title}</h3><p className="text-sm text-muted-foreground">{c.venue}</p></div>
        </div>
        <div className="grid gap-3">
          {clips.map((k, n) => (
            <button key={k.id} onClick={() => { setI(n); (window as any).__lovableEvents?.track?.("keynote_play", { title: k.title }); }}
              className={`flex items-center gap-3 rounded-xl border p-2 text-left transition ${n === i ? "border-brand bg-secondary" : "border-border bg-card hover:border-brand/50"}`}>
              <img src={k.img} alt="" className="h-14 w-24 shrink-0 rounded-md object-cover" loading="lazy" />
              <span className="min-w-0 text-sm font-medium leading-snug">{k.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
