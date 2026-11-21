import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Copy, FileText, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicationCitation, type Publication } from "@/data/publications";
import { publicationPresentation } from '@/lib/publication-presentation';

export function PublicationDetails({ publication: p, page = false }: { publication: Publication; page?: boolean }) {
  const [copied, setCopied] = useState(false);
  const Heading = page ? "h1" : "h2";
  const presentation = publicationPresentation(p);
  return <div className="publication-detail">
    <p className="font-mono text-xs text-brand">{p.status} · {p.date}</p>
    <Heading className="mt-3 font-display text-xl font-semibold leading-snug sm:text-2xl">{p.title}</Heading>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.venue.replaceAll('**', '')}</p>
    <p className="mt-2 text-xs text-muted-foreground">Author listed by source: Harsh Verma</p>
    {page && <div className="publication-paper-overview"><figure><img src={p.image} alt={`${p.title} — editorial research artwork`} className="publication-paper-art"/><figcaption>Editorial research artwork · Paper {String(p.number).padStart(2, '0')}</figcaption></figure><dl className="publication-paper-facts">{[['Publisher', p.publisher], ['Research area', p.category], ['Publication date', p.date], ['Status', p.status], ['DOI', p.doi ?? 'Not assigned in source'], ['Manuscript', p.manuscript ?? 'Not applicable']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>}
    <section className="publication-abstract mt-8" aria-label="Publication abstract">
      <div className="publication-abstract-head">
        <h2 className={page ? 'font-display text-2xl font-semibold' : 'eyebrow'}>Abstract</h2>
        <span className="publication-abstract-source">{p.abstractSource === 'publisher' ? 'Publisher abstract' : 'Archive abstract'}</span>
      </div>
      <p className="publication-abstract-text">{p.abstract}</p>
      <p className="publication-abstract-note">{p.abstractSource === 'publisher' ? 'Full abstract reproduced from the publisher record.' : 'Full abstract as listed in the author’s publication archive.'} <a className="text-brand" href={p.source} target="_blank" rel="noopener noreferrer">Original record ↗</a></p>
    </section>
    {p.status !== "Published" && <p className="mt-4 text-sm text-signal">{p.status === "Forthcoming" ? "Listed as forthcoming. The conference portal is not a published full-text paper." : `Under peer review · Manuscript ${p.manuscript ?? "submitted"}. The journal homepage is not a published article.`}</p>}
    {p.citationNote && <p className="mt-4 border-l-2 border-signal pl-3 text-xs leading-relaxed text-muted-foreground">{p.citationNote}</p>}
    <div className="mt-5 flex flex-wrap gap-2">
      <Button asChild size="sm"><a href={p.source} target="_blank" rel="noreferrer"><ArrowUpRight />{p.status === "Published" ? "Publisher page" : "Official portal"}</a></Button>
      <Button asChild variant="outline" size="sm"><a href={presentation.publisherUrl} target="_blank" rel="noopener noreferrer">Publisher website <ArrowUpRight /></a></Button>
      {p.doi && !p.citationNote && <Button asChild variant="outline" size="sm"><a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">DOI <ArrowUpRight /></a></Button>}
      {p.pdf && <Button asChild variant="outline" size="sm"><a href={p.pdf} target="_blank" rel="noreferrer"><FileText />Full-text PDF</a></Button>}
      {p.researchGate && <Button asChild variant="outline" size="sm"><a href={p.researchGate} target="_blank" rel="noreferrer">ResearchGate <ArrowUpRight /></a></Button>}
      <Button asChild variant="outline" size="sm"><Link to="/knowledge" search={{ resource: `publication:${p.slug}` }}><Network />Connections</Link></Button>
    </div>
    <div className="mt-6"><div className="flex items-center justify-between gap-3"><p className="eyebrow">Citation</p><Button variant="ghost" size="sm" onClick={async () => { try { await navigator.clipboard.writeText(publicationCitation(p)); setCopied(true); } catch { setCopied(false); } }}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy citation"}</Button></div><p className="mt-3 break-words text-xs leading-relaxed text-muted-foreground select-text">{publicationCitation(p)}</p><span role="status" className="sr-only">{copied ? "Citation copied" : ""}</span></div>
  </div>;
}