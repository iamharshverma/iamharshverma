import { canonical, SITE_URL } from "./seo";
export const contentHead = (
  path: string,
  title: string,
  description: string,
  type = "CollectionPage",
  image?: string,
) => ({
  links: canonical(path).links,
  meta: [
    { title: `${title} | Harsh Verma` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | Harsh Verma` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
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
            name: title,
            description,
            url: SITE_URL + path,
            author: { "@id": SITE_URL + "/#person" },
            about: { "@id": SITE_URL + "/#person" },
            isPartOf: { "@id": SITE_URL + "/#website" },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
              { "@type": "ListItem", position: 2, name: title, item: SITE_URL + path },
            ],
          },
        ],
      }),
    },
  ],
});
