import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";

type Props = {
  heading: string;
  paragraphs: string[];
  links: { to: string; label: string }[];
  children?: ReactNode;
  headingIcon?: ReactNode;
  /** Optional panel shown in the page's left gutter, outside the text column. */
  sideRail?: ReactNode;
  sideMedia?: ReactNode;
  /** Render the related-links nav below the side media instead of inside the text column. */
  linksBelowMedia?: boolean;
};

export function SeoSummary({ heading, paragraphs, links, children, headingIcon, sideRail, sideMedia, linksBelowMedia }: Props) {
  return (
        <div className="relative">
      <section className={`mx-auto px-6 pt-16${sideMedia ? ` grid max-w-6xl items-center gap-8 md:grid-cols-[1.5fr_1fr] md:gap-12 ${linksBelowMedia ? "pb-0" : "pb-12"}` : " max-w-4xl"}${sideRail ? " pb-20" : ""}`}>
        <div className="min-w-0">
        {headingIcon && <div aria-hidden="true" className="mb-4 flex size-10 items-center justify-center">{headingIcon}</div>}
        <Reveal><h2 className="font-display text-3xl font-bold tracking-tight">{heading}</h2></Reveal>
        {paragraphs.map((p, i) => <Reveal key={i} delay={0.1 + i * 0.1}><p className="mt-4 leading-relaxed text-muted-foreground">{p}</p></Reveal>)}
        {!linksBelowMedia && (
          <Reveal delay={0.2 + paragraphs.length * 0.1}>
            <nav aria-label="Related pages" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {links.map((l) => <Link key={l.to} to={l.to} className="text-brand hover:underline">{l.label} →</Link>)}
            </nav>
          </Reveal>
        )}
        {children}
        </div>
        {sideMedia}
      </section>
      {linksBelowMedia && (
        <Reveal delay={0.2 + paragraphs.length * 0.1}>
          <nav aria-label="Related pages" className="mx-auto -mt-3 grid max-w-6xl items-center gap-3 px-6 pb-12 md:grid-cols-[1.5fr_1fr] md:gap-12">
            <div className="flex">
              {links[0] && (
                <Link to={links[0].to} className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-colors">{links[0].label} →</Link>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {links.slice(1).map((l) => (
                <Link key={l.to} to={l.to} className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand">{l.label} →</Link>
              ))}
            </div>
          </nav>
        </Reveal>
      )}
      {sideRail && (
        <div className="research-side-gutter absolute inset-y-0 left-2 hidden w-16 lg:flex">
          {sideRail}
        </div>
      )}
    </div>
  );
}
