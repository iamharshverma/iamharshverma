import { createFileRoute } from "@tanstack/react-router";
import { canonical, publisherCollectionJsonLd } from "@/lib/seo";
import { forbesArticles } from "@/data/publisher-articles";
import { PublisherArticles } from "@/components/site/PublisherArticles";

const title = "Harsh Verma Forbes Articles | AI Engineering & Leadership";
const description = "Read Harsh Verma’s Forbes Technology Council articles on AI engineering, physical AI, data orchestration, privacy and enterprise AI leadership.";

export const Route = createFileRoute("/forbes")({
  head: () => ({
    links: canonical("/forbes").links,
    meta: [
      canonical("/forbes").url,
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(publisherCollectionJsonLd("/forbes", title, description, forbesArticles)) }],
  }),
  component: ForbesCollection,
});

function ForbesCollection() {
  return <PublisherArticles name="Forbes" publisher="Forbes Technology Council" intro="Perspectives on AI engineering, enterprise architecture and the decisions shaping technology leadership." articles={forbesArticles} />;
}
