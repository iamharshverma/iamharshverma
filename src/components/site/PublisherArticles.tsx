import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Insight } from "@/data/insights";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export function PublisherArticles({ name, publisher, intro, articles }: {
  name: string;
  publisher: string;
  intro: string;
  articles: Insight[];
}) {
  return <>
    <PageHero eyebrow={`// ${publisher} · Harsh Verma`} title={<>{name} <span className="text-brand-gradient">Articles.</span></>} intro={intro} />
    <section aria-label={`${publisher} articles`} className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article, index) => <Reveal key={article.slug} delay={index * .05}>
          <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
            <Link to="/insights/$slug" params={{ slug: article.slug }} aria-label={`Read ${article.title}`} className="group block aspect-video overflow-hidden bg-muted">
              <img src={article.img} alt={article.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <p className="font-mono text-xs text-signal">{article.topic} · {article.date}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-snug"><Link to="/insights/$slug" params={{ slug: article.slug }}>{article.title}</Link></h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Button asChild size="sm"><Link to="/insights/$slug" params={{ slug: article.slug }}>Read article <ArrowRight /></Link></Button>
                <Button asChild variant="outline" size="sm"><a href={article.href} target="_blank" rel="noreferrer">Original on {name} <ArrowUpRight /></a></Button>
              </div>
            </div>
          </article>
        </Reveal>)}
      </div>
    </section>
  </>;
}
