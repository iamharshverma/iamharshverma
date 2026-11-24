import { Link } from '@tanstack/react-router';
import { Network, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Publication } from '@/data/publications';
import { networkTopics, networkResources } from '@/data/knowledge-network';

export function PublicationTopicDiagram({ publication: p }: { publication: Publication }) {
  const topics = networkTopics.filter(t => networkResources(t.id).some(k => k.id === `publication:${p.slug}`));
  return <section className="publication-concept-map" aria-labelledby="paper-topic-map">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Subject relationships</p><h2 id="paper-topic-map" className="mt-2 font-display text-2xl font-semibold">Inside the Research.</h2></div><p className="max-w-md text-xs text-muted-foreground">An editorial topic map from this paper’s portfolio tags, not a diagram reproduced from the paper.</p></div>
    <div className="publication-map-layout">
      <div className="publication-map-origin"><Network className="size-7"/><strong>{p.title}</strong><span>{p.category}</span></div>
      <svg className="publication-map-lines" viewBox={`0 0 100 ${topics.length * 100}`} preserveAspectRatio="none" aria-hidden>{topics.map((t,i) => <path key={t.id} d={`M 0 ${topics.length * 50} C 50 ${topics.length * 50}, 50 ${i * 100 + 50}, 100 ${i * 100 + 50}`} />)}</svg>
      <div className="publication-map-topics">{topics.map(t => <Button key={t.id} asChild variant="ghost" className="publication-map-topic"><Link to="/knowledge" search={{ topic: t.id }}><span><strong>{t.title}</strong><small>{networkResources(t.id).length} connected works</small></span><ArrowUpRight className="size-4 shrink-0"/></Link></Button>)}</div>
    </div>
  </section>;
}