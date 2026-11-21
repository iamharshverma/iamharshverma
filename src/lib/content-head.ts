import { canonical, SITE_URL } from "./seo";
const ARTICLE_TYPES = new Set(["Article", "TechArticle", "ScholarlyArticle"]);
const COLLECTION_NAMES: Record<string, string> = {
  publications: "Publications", insights: "Insights", research: "Research",
  engineering: "Engineering", talks: "Speaking", media: "Media", books: "Books",
};

/** Summaries stay readable; the full content remains in the page and its schema. */
export function searchExcerpt(text: string, limit = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const clipped = clean.slice(0, limit - 1);
  const boundary = clipped.lastIndexOf(" ");
  return (boundary > limit / 2 ? clipped.slice(0, boundary) : clipped).replace(/[\s,;:–—-]+$/, "") + "…";
}
export const contentHead = (
  path: string,
  title: string,
  description: string,
  type = "CollectionPage",
  image?: string,
) => {
  const summary = searchExcerpt(description);
  const article = ARTICLE_TYPES.has(type);
  const segments = path.split("/").filter(Boolean);
  const collection = segments.length > 1 ? COLLECTION_NAMES[segments[0] ?? ""] : undefined;
  const parentPath = segments[0] === "talks" ? "/speaking" : `/${segments[0] ?? ""}`;
  return ({
  links: canonical(path).links,
  meta: [
    { title: `${title} | Harsh Verma` },
    { name: "description", content: summary },
    { property: "og:title", content: `${title} | Harsh Verma` },
    { property: "og:description", content: summary },
    { property: "og:type", content: article ? "article" : "website" },
    { name: "twitter:title", content: `${title} | Harsh Verma` },
    { name: "twitter:description", content: summary },
    { name: "twitter:card", content: "summary_large_image" },
    canonical(path).url,
    ...(image?.startsWith("https://")
      ? [
          { property: "og:image", content: image },
          { name: "twitter:image", content: image },
        ]
      : []),
  ],
  scripts: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": type,
            "@id": SITE_URL + path + "#content",
            name: title,
            ...(article ? { headline: title, mainEntityOfPage: SITE_URL + path } : {}),
            description,
            url: SITE_URL + path,
            author: { "@id": SITE_URL + "/#person" },
            about: { "@id": SITE_URL + "/#person" },
            isPartOf: { "@id": SITE_URL + "/#website" },
            inLanguage: "en",
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
              ...(collection ? [{ "@type": "ListItem", position: 2, name: collection, item: SITE_URL + parentPath }] : []),
              { "@type": "ListItem", position: collection ? 3 : 2, name: title, item: SITE_URL + path },
            ],
          },
        ],
      }),
    },
  ],
});
};
