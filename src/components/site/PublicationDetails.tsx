import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Copy, FileText, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicationCitation, type Publication } from "@/data/publications";

export function PublicationDetails({ publication: p, page = false }: { publication: Publication; page?: boolean }) {
  const [copied, setCopied] = useState(false);
  const Heading = page ? "h1" : "h2";
  return <div className="publication-detail">
    <p className="font-mono text-xs text-brand">{p.status} · {p.date}</p>
    <Heading className="mt-3 font-display text-xl font-semibold leading-snug sm:text-2xl">{p.title}</Heading>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.venue}</p>
    <p className="mt-2 text-xs text-muted-foreground">Author listed by source: Harsh Verma</p>
    <div className="mt-6 border-y border-border py-5"><p className="eyebrow">Source abstract</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.abstract}</p></div>
    {p.status !== "Published" && <p className="mt-4 text-sm text-signal">{p.status === "Forthcoming" ? "Listed as forthcoming. The conference portal is not a published full-text paper." : `Under peer review · Manuscript ${p.manuscript ?? "submitted"}. The journal homepage is not a published article.`}</p>}
    {p.citationNote && <p className="mt-4 border-l-2 border-signal pl-3 text-xs leading-relaxed text-muted-foreground">{p.citationNote}</p>}
    <div className="mt-5 flex flex-wrap gap-2">
      <Button asChild size="sm"><a href={p.source} target="_blank" rel="noreferrer"><ArrowUpRight />{p.status === "Published" ? "Publisher page" : "Official portal"}</a></Button>
      {p.doi && <Button asChild variant="outline" size="sm"><a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">DOI <ArrowUpRight /></a></Button>}
      {p.pdf && <Button asChild variant="outline" size="sm"><a href={p.pdf} target="_blank" rel="noreferrer"><FileText />Full-text PDF</a></Button>}
      {p.researchGate && <Button asChild variant="outline" size="sm"><a href={p.researchGate} target="_blank" rel="noreferrer">ResearchGate <ArrowUpRight /></a></Button>}
      <Button asChild variant="outline" size="sm"><Link to="/knowledge" search={{ resource: `publication:${p.slug}` }}><Network />Connections</Link></Button>
    </div>
    <div className="mt-6"><div className="flex items-center justify-between gap-3"><p className="eyebrow">Citation</p><Button variant="ghost" size="sm" onClick={async () => { try { await navigator.clipboard.writeText(publicationCitation(p)); setCopied(true); } catch { setCopied(false); } }}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy citation"}</Button></div><p className="mt-3 break-words text-xs leading-relaxed text-muted-foreground select-text">{publicationCitation(p)}</p><span role="status" className="sr-only">{copied ? "Citation copied" : ""}</span></div>
  </div>;
}