import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { books, audiences, aiSecurityAudiences, aiSecurityThemes } from "@/data/books";
import { contentHead } from "@/lib/content-head";
import { PageHero } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { KnowledgeCards } from "@/components/site/KnowledgeCards";
import { relatedKnowledge, topicsFor } from "@/data/knowledge";
import { KnowledgeGraphEntry } from "@/components/site/KnowledgeGraphEntry";
export const Route = createFileRoute("/books_/$slug")({
  loader: ({ params }) => {
    const book = books.find((b) => b.slug === params.slug);
    if (!book) throw notFound();
    return book;
  },
  head: ({ loaderData }) => {
    const head = contentHead(
      `/books/${loaderData?.slug ?? ""}`,
      loaderData?.title ?? "Book unavailable",
      loaderData?.pitch ?? "Books by Harsh Verma.",
      "Book",
    );
    if (loaderData?.cover.startsWith("https://"))
      head.meta.push(
        { property: "og:image", content: loaderData.cover },
        { name: "twitter:image", content: loaderData.cover },
      );
    return head;
  },
  component: BookDetail,
});
function BookDetail() {
  const b = Route.useLoaderData();
  const beyond = b.slug === "beyond-ai-engineering";
  return (
    <>
      <PageHero eyebrow={`// author · ${b.status}`} title={b.title} intro={b.subtitle} />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Link to="/books" className="text-sm text-brand">
          ← Both books
        </Link>
        <div className="mt-8 grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <img src={b.cover} alt={b.title} className="w-full max-w-md rounded-lg" />
          <div>
            <p className="font-mono text-xs text-stat-number">{b.status}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold">About the Book</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{b.pitch}</p>
            <h2 className="mt-10 font-display text-2xl font-semibold">Author's Perspective</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {beyond
                ? "The central perspective is a shift from generating implementation to exercising judgment: deciding what to build, designing boundaries and orchestrating human and AI work responsibly."
                : "The central perspective is that autonomous security requires engineered trust: evidence, permission boundaries, human accountability and bounded defensive action."}
            </p>
            <h2 className="mt-10 font-display text-2xl font-semibold">Intended Readers</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              {(beyond ? audiences.map((a) => a[0]) : aiSecurityAudiences).map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={b.site}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    window.__lovableEvents?.track?.("project.book_visited", { book: b.slug })
                  }
                >
                  Official book website ↗
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/resources">Reader resources</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/booking" search={{ topic: "Keynote" }}>
                  Speaking enquiries
                </Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Availability is planned for January 2027. No verified purchase link or downloadable
              sample chapter is available here yet.
            </p>
          </div>
        </div>
        <section className="mt-14 border-t border-border pt-8">
          <h2 className="font-display text-3xl font-semibold">Core Topics</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {(beyond
              ? [
                  {
                    title: "Engineering judgment",
                    description:
                      "From creator to architect and orchestrator: shifting from implementation output to decisions, evaluation and responsibility.",
                  },
                  {
                    title: "Human–AI collaboration",
                    description:
                      "Professional development, workflows and evidence of human judgment in an AI-assisted engineering career.",
                  },
                ]
              : aiSecurityThemes
            ).map((t) => (
              <div key={t.title}>
                <h3 className="font-display text-xl font-semibold">{t.title}</h3>
                <p className="mt-3 text-muted-foreground">{t.description}</p>
              </div>
            ))}
          </div>
        </section>
        <h2 className="mt-14 font-display text-3xl font-semibold">Related Writing & Talks</h2>
        <KnowledgeGraphEntry id={`book:${b.slug}`} />
        <div className="mt-8">
          <KnowledgeCards
            items={relatedKnowledge(topicsFor(b.title + b.pitch), `book:${b.slug}`, 3)}
          />
        </div>
      </section>
    </>
  );
}
