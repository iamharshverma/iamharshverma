import { education, links, profile } from "@/data/profile";

export const SITE_URL = "https://www.iamharshverma.com";

/** Never turn a year or a month into an invented publication day. */
export function sourcePublicationDate(value: string): string | undefined {
  if (!/^(?:[A-Z][a-z]+ \d{1,2}, \d{4}|\d{4}-\d{2}-\d{2})$/.test(value)) return undefined;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? undefined : new Date(timestamp).toISOString().slice(0, 10);
}

/** Harsh's other portfolio — same person, declared for search engines only. */
export const ALT_PORTFOLIO_URL = "https://www.harshverma.me/";

export const canonical = (path: string) => {
  const href = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    links: [{ rel: "canonical", href }],
    url: { property: "og:url", content: href },
  };
};

/** Describe only the articles visibly listed on a publisher collection page. */
export const publisherCollectionJsonLd = (
  path: string,
  name: string,
  description: string,
  articles: readonly { title: string; slug: string; href: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}${path}#collection`,
  url: `${SITE_URL}${path}`,
  name,
  description,
  about: { "@id": `${SITE_URL}/#person` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: articles.length,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        headline: article.title,
        url: `${SITE_URL}/insights/${article.slug}`,
        sameAs: article.href,
        author: { "@id": `${SITE_URL}/#person` },
      },
    })),
  },
});

export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Harsh Verma",
      url: SITE_URL,
      image: new URL(profile.portrait, SITE_URL).href,
      email: `mailto:${profile.email}`,
      jobTitle: profile.title,
      worksFor: { "@type": "Organization", name: "Palo Alto Networks", url: "https://www.paloaltonetworks.com" },
      address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US", addressLocality: "San Francisco Bay Area" },
      alumniOf: education.map(item => ({ "@type": "CollegeOrUniversity", name: item.school })),
      knowsAbout: ["Artificial Intelligence", "Agentic AI", "AI Security", "Machine Learning", "Cybersecurity", "Autonomous Agents", "Distributed Systems", "AI Governance"],
      memberOf: { "@type": "Organization", name: "Forbes Technology Council" },
      sameAs: Array.from(new Set([ALT_PORTFOLIO_URL, ...Object.values(links)])),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Harsh Verma",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};
