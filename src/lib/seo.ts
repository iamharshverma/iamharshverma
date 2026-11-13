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
