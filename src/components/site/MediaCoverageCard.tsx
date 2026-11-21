import type { Coverage } from "@/data/media-center";
import { ArrowUpRight, Quote, Play, Newspaper, Tag, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function MediaCoverageCard({ item }: { item: Coverage }) {
  const content = <>
    <div className="aspect-[600/340] overflow-hidden bg-muted/30">
      <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
    </div>
    <div className="p-5">
      <p className="font-mono text-[11px] leading-relaxed text-signal">{item.category} · {item.year}</p>
      <h3 className="mt-2 line-clamp-3 font-display text-lg font-semibold leading-snug">{item.title}</h3>
      <p className="mt-2 text-xs text-muted-foreground">{item.publisher}</p>
    </div>
  </>;
  return <article className="h-full"><Dialog>
    <DialogTrigger asChild><Button variant="ghost" className="group block h-full w-full min-w-0 overflow-hidden whitespace-normal rounded-lg border border-border bg-card p-0 text-left font-normal transition-colors hover:border-brand/50 hover:bg-card">{content}</Button></DialogTrigger>
    <DialogContent className="flex max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-3xl flex-col gap-0 overflow-hidden rounded-lg border-border bg-popover p-0 text-popover-foreground sm:max-w-3xl motion-reduce:animate-none [&>button:last-child]:right-3 [&>button:last-child]:top-3 [&>button:last-child]:flex [&>button:last-child]:size-9 [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:rounded-md [&>button:last-child]:border [&>button:last-child]:border-border [&>button:last-child]:bg-secondary [&>button:last-child]:text-secondary-foreground [&>button:last-child]:opacity-100 [&>button:last-child]:hover:bg-accent">
      <div className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-5 pr-16 sm:px-7 sm:pr-16">
        <div className="flex min-w-0 items-center gap-3">
          <Newspaper className="size-4 shrink-0 text-brand" />
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">{item.contentType}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-muted-foreground">{item.year}</span>
      </div>
      <div className="min-h-0 overflow-y-auto overscroll-contain">
        <div className="flex h-52 items-center justify-center border-b border-border bg-background sm:h-72">
          <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
        </div>
        <div className="px-5 py-6 sm:px-8 sm:py-7">
          <p className="flex items-center gap-2 text-xs font-medium text-brand"><span className="h-px w-5 shrink-0 bg-brand" />{item.publisher}</p>
          <DialogTitle className="mt-3 break-words font-display text-xl font-semibold leading-snug tracking-normal sm:text-3xl">{item.title}</DialogTitle>
          <div className="mt-5 border-l-2 border-brand/60 pl-4 sm:pl-5">
            <Quote aria-hidden="true" className="mb-2 size-5 text-brand/70" />
            <DialogDescription className="text-sm leading-7 text-popover-foreground/85 sm:text-base">{item.summary}</DialogDescription>
          </div>
          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><Tag className="mt-0.5 size-3.5 shrink-0" />{item.topic}</p>
        {item.category === "Press Releases & Syndicated" && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Newswire distribution, not independent editorial reporting.</p>}
        {item.video && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">YouTube: {item.video.title}</p>}
        {item.sourceUnavailable && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">The original publisher link is currently unavailable.</p>}
        {item.distributions.length > 0 && <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-4 text-xs text-muted-foreground">{item.distributions.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-foreground hover:underline">{source.publisher}<ArrowUpRight className="size-3" /></a></li>)}</ul>}
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-border bg-background px-5 py-4 sm:px-8">
        {item.url && <Button asChild size="sm" className="h-auto min-h-9 max-w-full whitespace-normal py-2"><a href={item.url} target="_blank" rel="noreferrer">{item.action}<ArrowUpRight /></a></Button>}
        {item.video && !item.url?.startsWith("https://youtu.be/") && <Button asChild size="sm" variant="outline" className="h-auto min-h-9 max-w-full whitespace-normal py-2"><a href={item.video.url} target="_blank" rel="noreferrer"><Play />Watch on YouTube<ArrowUpRight /></a></Button>}
        <span className="ml-auto hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:inline-flex"><ExternalLink className="size-3" />Original source</span>
      </div>
    </DialogContent>
  </Dialog></article>;
}