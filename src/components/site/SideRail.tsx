import { useEffect, useRef, useState, type ReactNode } from "react";
import { ideaQuotes } from "@/data/ideas";
import { pickIdeaQuote } from "@/lib/idea-quotes";

type RailLink = { label: string; href: string; external?: boolean };

type Props = {
  icon: ReactNode;
  label: string;
  navLabel: string;
  links: RailLink[];
};

/**
 * Vertical panel parked in the page's left gutter: its own animated icon,
 * a rotated label and short section links. Reads bottom-to-top like a book spine.
 * Tapping the icon surfaces a random theme idea quote.
 */
export function SideRail({ icon, label, navLabel, links }: Props) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const cycle = () => {
    setIdx((prev) => pickIdeaQuote(prev));
    setOpen(true);
  };

  const shown = idx === null ? null : ideaQuotes[idx];

  return (
    <div className="research-side-rail flex h-full min-h-0 flex-col items-center justify-between py-3">
      <div ref={wrap} className="relative shrink-0">
        <button
          type="button"
          onClick={cycle}
          aria-expanded={open}
          aria-label="Show a random theme idea quote"
          title="Show a random theme idea quote"
          className="research-side-token cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {icon}
        </button>
        {open && shown && (
          <div
            role="status"
            aria-live="polite"
            className="research-side-quote absolute left-full top-0 z-30 ml-3 w-60 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-md"
          >
            <p className="font-mono text-[10px] tracking-[0.22em] text-signal uppercase">{shown.topic}</p>
            <p className="mt-2 text-sm font-semibold italic leading-relaxed text-card-foreground">“{shown.quote}”</p>
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">— {shown.author}</p>
            <p className="mt-3 border-t border-border pt-2 font-mono text-[10px] text-muted-foreground">Tap the bulb for another</p>
          </div>
        )}
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-hidden">
        <span className="research-side-line research-side-line-top" />
        <span className="research-side-label font-mono text-[10px] tracking-[0.28em] text-muted-foreground uppercase">{label}</span>
        <span className="research-side-line research-side-line-bottom" />
      </div>
      <nav aria-label={navLabel} className="flex shrink-0 flex-col items-center gap-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="research-side-link font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-brand"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
