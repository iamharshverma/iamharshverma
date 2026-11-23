import type { ReactNode } from "react";

export function RadarSummaryHeading({ eyebrow, title, artwork, children }: {
  eyebrow: string;
  title: string;
  artwork: { url: string; alt: string; width: number; height: number } | undefined;
  children: ReactNode;
}) {
  return <div className="radar-summary-heading">
    <div className="min-w-0">
      <p className="impact-kicker">{eyebrow}</p>
      <h3 className="mt-3 font-display text-2xl font-semibold">{title}</h3>
      {children}
    </div>
    {artwork && <img className="radar-summary-art" src={artwork.url} alt={artwork.alt} width={artwork.width} height={artwork.height} loading="lazy" decoding="async" />}
  </div>;
}