import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { featuredCoverage } from "@/data/media-center";

export function MediaSpotlight() {
  const [slide, setSlide] = useState(0);
  const reduced = useReducedMotion();
  const item = featuredCoverage[slide];
  if (!item) return null;
  return <section id="featured" className="scroll-mt-28 border-b border-border pb-16">
    <div className="mx-auto max-w-6xl px-6">
      <Reveal><h2 className="eyebrow">Featured spotlight</h2></Reveal>
      <div className="relative mt-6 overflow-hidden rounded-lg border border-border bg-card" aria-roledescription="carousel" aria-label="Featured media spotlight">
        <AnimatePresence mode="wait">
          <motion.div key={item.id} initial={reduced ? false : { opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? { opacity: 1 } : { opacity: 0, x: -40 }} transition={{ duration: reduced ? 0 : 0.4 }} className="grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-8 md:p-10">
            <div className="flex items-center justify-center overflow-hidden rounded-md bg-muted/20"><img src={item.image} alt={`${item.publisher} — ${item.title}`} className="aspect-[4/3] max-h-80 w-full object-contain" /></div>
            <div className="flex min-w-0 flex-col justify-center">
              <p className="font-mono text-xs leading-relaxed text-signal">{item.contentType} · {item.year} · {item.publisher}</p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-snug md:text-3xl">{item.title}</h3>
              <p className="mt-5 flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"><Quote className="size-5 shrink-0 text-brand" />{item.summary}</p>
              {item.url && <Button asChild className="mt-6 h-auto w-fit max-w-full whitespace-normal py-2.5"><a href={item.url} target="_blank" rel="noreferrer">{item.action}<ArrowUpRight /></a></Button>}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
          <div className="flex flex-wrap gap-1" role="group" aria-label="Choose featured story">{featuredCoverage.map((story, index) => <Button key={story.id} size="icon-xs" variant="ghost" aria-label={`Show featured story ${index + 1}`} aria-pressed={index === slide} title={story.title} onClick={() => setSlide(index)}><span className={`h-1.5 rounded-full transition-all ${index === slide ? "w-5 bg-brand" : "w-2 bg-muted-foreground/40"}`} /></Button>)}</div>
          <div className="flex shrink-0 gap-2"><Button size="icon-sm" variant="outline" aria-label="Previous featured story" onClick={() => setSlide(value => (value - 1 + featuredCoverage.length) % featuredCoverage.length)}><ChevronLeft /></Button><Button size="icon-sm" variant="outline" aria-label="Next featured story" onClick={() => setSlide(value => (value + 1) % featuredCoverage.length)}><ChevronRight /></Button></div>
        </div>
      </div>
    </div>
  </section>;
}