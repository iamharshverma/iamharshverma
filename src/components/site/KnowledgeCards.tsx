import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { type ReactNode } from "react";
import { type KnowledgeItem } from "@/data/knowledge";
import { contentImage } from "@/data/content-images";

export function KnowledgeLink({
  item,
  children,
  className,
}: {
  item: KnowledgeItem;
  children: ReactNode;
  className?: string;
}) {
  if (item.kind === "Article")
    return (
      <Link className={className} to="/insights/$slug" params={{ slug: item.slug }}>
        {children}
      </Link>
    );
  if (item.kind === "Research")
    return (
      <Link className={className} to="/research/$pillar" params={{ pillar: item.slug }}>
        {children}
      </Link>
    );
  if (item.kind === "Case study")
    return (
      <Link className={className} to="/engineering/$slug" params={{ slug: item.slug }}>
        {children}
      </Link>
    );
  if (item.kind === "Book")
    return (
      <Link className={className} to="/books/$slug" params={{ slug: item.slug }}>
        {children}
      </Link>
    );
  if (item.kind === "Keynote")
    return (
      <Link className={className} to="/talks/$slug" params={{ slug: item.slug }}>
        {children}
      </Link>
    );
  if (item.kind === "Media")
    return (
      <Link className={className} to="/media/$slug" params={{ slug: item.slug }}>
        {children}
      </Link>
    );
  if (item.id.startsWith("publication:"))
    return <Link className={className} to="/publications/$slug" params={{ slug: item.slug }}>{children}</Link>;
  if (["Patent", "Publication", "Project", "Resource"].includes(item.kind))
    return (
      <Link className={className} to="/research/works/$slug" params={{ slug: item.slug }}>
        {children}
      </Link>
    );
  if (item.kind === "Download")
    return (
      <a
        className={className}
        href={item.source}
        download
        onClick={() =>
          window.__lovableEvents?.track?.("project.resource_downloaded", { resource: item.slug })
        }
      >
        {children}
      </a>
    );
  if (item.source)
    return (
      <a className={className} href={item.source} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  return (
    <Link className={className} to="/research">
      {children}
    </Link>
  );
}
export function KnowledgeCards({ items, variant = "default" }: { items: KnowledgeItem[]; variant?: "default" | "pillars" }) {
  const pillars = variant === "pillars";
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.id}
          className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/50"
        >
          <KnowledgeLink item={item} className="block overflow-hidden">
              <img
                src={contentImage(item.title, item.kind, item.image)}
                alt={item.title}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
              />
          </KnowledgeLink>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-brand">
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate">{item.kind}
                {item.year ? ` · ${item.year}` : ""}
                </span>
                {pillars && <span className="shrink-0 text-stat-number">{String(index + 1).padStart(2, "0")}</span>}
              </span>
              <KnowledgeLink
                item={item}
                className="flex shrink-0 items-center gap-1 text-brand transition-colors hover:text-foreground"
              >
                <span>{item.kind === "Download" ? "Download" : "Explore"}</span>
                <ArrowUpRight className="size-3.5" />
              </KnowledgeLink>
            </div>
            <h3 className="mt-2 line-clamp-2 font-display text-lg leading-snug font-semibold">
              <KnowledgeLink item={item}>{item.title}</KnowledgeLink>
            </h3>
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
            <p className="mt-3 truncate text-[11px] text-muted-foreground" title={item.publisher}>
              {item.publisher}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
