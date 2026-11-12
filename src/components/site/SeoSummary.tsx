import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = { heading: string; paragraphs: string[]; links: { to: string; label: string }[]; children?: ReactNode };

export function SeoSummary({ heading, paragraphs, links, children }: Props) {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-16">
      <h2 className="font-display text-3xl font-bold tracking-tight">{heading}</h2>
      {paragraphs.map((p, i) => <p key={i} className="mt-4 leading-relaxed text-muted-foreground">{p}</p>)}
      <nav aria-label="Related pages" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
        {links.map((l) => <Link key={l.to} to={l.to} className="text-brand hover:underline">{l.label} →</Link>)}
      </nav>
      {children}
    </section>
  );
}
