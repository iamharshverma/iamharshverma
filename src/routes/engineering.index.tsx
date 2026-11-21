import { createFileRoute } from "@tanstack/react-router";
import { contentHead } from "@/lib/content-head";
import { PageHero } from "@/components/site/Reveal";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { knowledge } from "@/data/knowledge";
export const Route = createFileRoute("/engineering/")({
  head: () =>
    contentHead(
      "/engineering",
      "Engineering & Architecture",
      "Explore Harsh Verma’s public AI, NLP, computer vision, distributed systems and data-structure projects, with repository links and source-based engineering reviews.",
    ),
  component: Engineering,
});
function Engineering() {
  return (
    <>
      <PageHero
        eyebrow="// engineering & architecture"
        title={
          <>
            Engineering & <span className="text-brand-gradient">Architecture.</span>
          </>
        }
        intro="AI, language, vision and distributed systems: public projects, architecture perspectives and engineering lessons behind the code."
      />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="mb-8 max-w-3xl leading-relaxed text-muted-foreground">
          Independent educational projects. These reviews do not disclose Palo Alto Networks
          systems, proprietary code, customer information or private inventions. Proposed
          improvements are distinguished from implemented behavior. Portfolio descriptions are distinguished from independently reviewed source code.
        </p>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5"><h2 className="font-display text-2xl font-semibold">Public Project Collection</h2><a href="https://www.harshverma.me/page-portfolio" target="_blank" rel="noreferrer" className="text-sm text-brand underline underline-offset-4">Original portfolio ↗</a></div>
        <KnowledgeCards items={knowledge.filter((i) => i.kind === "Case study")} />
      </section>
    </>
  );
}
