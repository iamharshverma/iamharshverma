import { links, profile } from "@/data/profile";

export const SITE_URL = "https://www.iamharshverma.com";

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
      image: `${SITE_URL}${profile.portrait}`,
      email: `mailto:${profile.email}`,
      jobTitle: profile.title,
      worksFor: { "@type": "Organization", name: "Palo Alto Networks", url: "https://www.paloaltonetworks.com" },
      address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US", addressLocality: "San Francisco Bay Area" },
      alumniOf: [{ "@type": "CollegeOrUniversity", name: "Stanford University" }],
      knowsAbout: ["Artificial Intelligence", "Agentic AI", "AI Security", "Machine Learning", "Cybersecurity", "Autonomous Agents", "Distributed Systems", "AI Governance"],
      memberOf: { "@type": "Organization", name: "Forbes Technology Council" },
      sameAs: [ALT_PORTFOLIO_URL, ...Object.values(links)],
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
