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
};

export function SeoSummary({ heading, paragraphs, links, children, headingIcon, sideRail }: Props) {
  return (
    <div className="relative">
      <section className={`mx-auto max-w-4xl px-6 pt-16${sideRail ? " pb-20" : ""}`}>
        {headingIcon && <div aria-hidden="true" className="mb-4 flex size-10 items-center justify-center">{headingIcon}</div>}
        <Reveal><h2 className="font-display text-3xl font-bold tracking-tight">{heading}</h2></Reveal>
        {paragraphs.map((p, i) => <Reveal key={i} delay={0.1 + i * 0.1}><p className="mt-4 leading-relaxed text-muted-foreground">{p}</p></Reveal>)}
        <Reveal delay={0.2 + paragraphs.length * 0.1}>
          <nav aria-label="Related pages" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            {links.map((l) => <Link key={l.to} to={l.to} className="text-brand hover:underline">{l.label} →</Link>)}
          </nav>
        </Reveal>
        {children}
      </section>
      {sideRail && (
        <div className="research-side-gutter absolute inset-y-0 left-2 hidden w-16 lg:flex">
          {sideRail}
        </div>
      )}
    </div>
  );
}
