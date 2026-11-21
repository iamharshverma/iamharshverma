import type { Publication } from "@/data/publications";
import { contentHead } from "./content-head";
import { SITE_URL, sourcePublicationDate } from "./seo";

/** Source records are not upgraded into verified bibliographic claims. */
export function publicationJsonLd(p: Publication) {
  const url = `${SITE_URL}/publications/${p.slug}`;
  const published = p.status === "Published";
  const date = published ? sourcePublicationDate(p.date) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": published ? "ScholarlyArticle" : "CreativeWork",
    "@id": url + "#content",
    url,
    name: p.title,
    headline: p.title,
    abstract: p.abstract,
    description: `${p.status}. ${p.abstract}`,
    creativeWorkStatus: p.status,
    author: { "@type": "Person", "@id": SITE_URL + "/#person", name: "Harsh Verma" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en",
    keywords: p.topics.join(", "),
    about: p.topics.map(name => ({ "@type": "Thing", name })),
    ...(published ? {
      sameAs: p.source,
      publisher: { "@type": "Organization", name: p.publisher },
      isPartOf: { "@type": "CreativeWork", name: p.venue, url: p.source },
    } : { isPartOf: { "@id": SITE_URL + "/#website" } }),
    ...(published && p.doi && !p.citationNote ? {
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: p.doi },
    } : {}),
    // Only explicit full source dates qualify; year/month-only records stay undated.
    ...(date ? { datePublished: date } : {}),
  };
}

export function publicationHead(p: Publication) {
  const head = contentHead(`/publications/${p.slug}`, p.title,
    `${p.status} research by Harsh Verma in ${p.venue}. ${p.abstract}`,
    p.status === "Published" ? "ScholarlyArticle" : "CreativeWork");
  if (p.status === "Published") {
    head.meta.push(
      { name: "citation_title", content: p.title },
      { name: "citation_author", content: "Harsh Verma" },
      { name: "citation_publication_date", content: String(p.year) },
      { name: "citation_journal_title", content: p.venue },
      ...(p.doi && !p.citationNote ? [{ name: "citation_doi", content: p.doi }] : []),
      ...(p.pdf ? [{ name: "citation_pdf_url", content: p.pdf }] : []),
    );
  }
  const breadcrumb = JSON.parse(head.scripts[0]?.children ?? "{}")["@graph"];
  return {
    ...head,
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [publicationJsonLd(p), ...(Array.isArray(breadcrumb) ? breadcrumb.slice(1) : [])],
    }) }],
  };
}