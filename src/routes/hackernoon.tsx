import { createFileRoute } from "@tanstack/react-router";
import { canonical, publisherCollectionJsonLd } from "@/lib/seo";
import { hackerNoonArticles } from "@/data/publisher-articles";
import { PublisherArticles } from "@/components/site/PublisherArticles";

const title = "Harsh Verma HackerNoon Articles | AI Agents & Security";
const description = "Explore Harsh Verma’s HackerNoon articles and interview on AI agents, cybersecurity, governance, observability and trustworthy production AI.";

export const Route = createFileRoute("/hackernoon")({
  head: () => ({
    links: canonical("/hackernoon").links,
    meta: [
      canonical("/hackernoon").url,
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(publisherCollectionJsonLd("/hackernoon", title, description, hackerNoonArticles)) }],
  }),
  component: HackerNoonCollection,
});

function HackerNoonCollection() {
  return <PublisherArticles name="HackerNoon" publisher="HackerNoon" intro="Technical perspectives on AI agents, cybersecurity and building reliable, trustworthy systems in production." articles={hackerNoonArticles} />;
}
