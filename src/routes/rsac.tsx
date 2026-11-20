import { createFileRoute } from "@tanstack/react-router";
import { canonical, publisherCollectionJsonLd } from "@/lib/seo";
import { rsacArticles } from "@/data/rsac";
import { PublisherArticles } from "@/components/site/PublisherArticles";

const title = "Harsh Verma RSAC Articles | AI Agents & Cybersecurity";
const description = "Explore Harsh Verma’s RSA Conference articles on autonomous defense, AI agent governance, identity security and the clean attack problem.";

export const Route = createFileRoute("/rsac")({
  head: () => ({
    links: canonical("/rsac").links,
    meta: [
      canonical("/rsac").url,
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(publisherCollectionJsonLd("/rsac", title, description, rsacArticles)) }],
  }),
  component: Rsac,
});

function Rsac() {
  return <PublisherArticles name="RSAC" publisher="RSA Conference" intro="Perspectives on AI agents, autonomous defense and the changing foundations of cybersecurity." articles={rsacArticles} />;
}
