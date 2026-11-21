import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { resources } from "@/data/knowledge";
import { books } from "@/data/books";
import { contentHead } from "@/lib/content-head";
export const Route = createFileRoute("/resources")({
  head: () =>
    contentHead(
      "/resources",
      "Reader, Speaker & Press Resources",
      "Download Harsh Verma's professional biographies, speaker and media kits, and find official updates for Beyond AI Engineering and AI vs. AI.",
    ),
  component: Resources,
});
function Resources() {
  return (
    <>
      <PageHero
        eyebrow="// reader · press · speaker resources"
        title={
          <>
            Resources & <span className="text-brand-gradient">Reading.</span>
          </>
        }
        intro="Professional biographies, editorial resources and the official destinations for both books."
      />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Reveal><p className="eyebrow">For organizers & editors</p><h2 className="mt-3 font-display text-3xl font-semibold">Professional Downloads</h2></Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((r, index) => (
            <article
              key={r.slug}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/50"
            >
                <a href={r.href} download aria-label={`Download ${r.title}`} className="block overflow-hidden border-b border-border"><img src={r.image} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" /></a>
                <div className="flex flex-1 flex-col p-4">
                <p className="flex justify-between font-mono text-[11px] text-brand"><span>{r.format}</span><span className="text-stat-number">0{index + 1}</span></p>
                <h3 className="mt-2 font-display text-lg leading-snug font-semibold">{r.title}</h3>
                <p className="mt-2 mb-5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{r.summary}</p>
              <Button asChild variant="outline" size="sm" className="mt-auto w-full rounded-full">
                <a
                  href={r.href}
                  download
                  onClick={() =>
                    window.__lovableEvents?.track?.("project.resource_downloaded", {
                      resource: r.slug,
                    })
                  }
                >
                  <Download className="size-4" />
                  Download
                </a>
              </Button>
              </div>
            </article>
          ))}
        </div>
        <Reveal className="mt-16"><p className="eyebrow">From the author</p><h2 className="mt-3 font-display text-3xl font-semibold">Book Ecosystems</h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {books.map((b) => (
            <article key={b.slug} className="group flex min-w-0 items-center gap-5 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/50">
              <img
                src={b.cover}
                alt={b.title}
                loading="lazy"
                className="h-36 w-24 shrink-0 rounded-xl object-cover shadow-lg transition-transform duration-500 motion-safe:group-hover:-rotate-2 motion-safe:group-hover:scale-105"
              />
              <div className="min-w-0">
                <p className="font-mono text-[11px] text-stat-number">{b.status}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">
                  <Link to="/books/$slug" params={{ slug: b.slug }} className="transition-colors hover:text-brand">
                    {b.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {b.subtitle}
                </p>
                <Button asChild variant="link" className="mt-3 h-auto justify-start p-0 text-brand"><a
                  href={b.site}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book website <ArrowUpRight className="size-4" />
                </a></Button>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 border-l-2 border-brand pl-4 text-sm text-muted-foreground">
          Sample chapters, templates and reading guides will be listed when approved files are
          available; no unpublished manuscript downloads are offered.
        </p>
        <Button asChild variant="outline" className="mt-10">
          <Link to="/knowledge">Explore related articles & research</Link>
        </Button>
      </section>
    </>
  );
}
