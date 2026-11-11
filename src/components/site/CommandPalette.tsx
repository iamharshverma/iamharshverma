import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { nav } from "./nav";
import { research, awards, links } from "@/data/profile";
import { media, keynotes } from "@/data/media";

type Item = { label: string; hint: string; go: () => void };

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(!open); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open, setOpen]);
  const items: Item[] = useMemo(() => [
    ...nav.map((n) => ({ label: n.label, hint: "Page", go: () => navigate({ to: n.to }) })),
    ...research.map((r) => ({ label: r.title, hint: r.kind, go: () => navigate({ to: "/research" }) })),
    ...awards.map((a) => ({ label: a.title, hint: "Award", go: () => navigate({ to: "/recognition" }) })),
    ...keynotes.map((k) => ({ label: k.title, hint: "Keynote", go: () => navigate({ to: "/speaking" }) })),
    ...media.map((m) => ({ label: m.title, hint: "Media", go: () => navigate({ to: "/media" }) })),
    { label: "Google Scholar", hint: "Link", go: () => window.open(links.scholar, "_blank") },
    { label: "LinkedIn", hint: "Link", go: () => window.open(links.linkedin, "_blank") },
  ], [navigate]);
  const filtered = items.filter((x) => x.label.toLowerCase().includes(q.toLowerCase())).slice(0, 9);
  if (!open) return null;
  const pick = (x?: Item) => { if (!x) return; x.go(); setOpen(false); setQ(""); };
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-background/70 p-4 pt-[15vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover shadow-glow" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} placeholder="Search pages, research, awards…"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") setI((v) => Math.min(v + 1, filtered.length - 1));
              if (e.key === "ArrowUp") setI((v) => Math.max(v - 1, 0));
              if (e.key === "Enter") pick(filtered[i]);
            }}
            className="w-full bg-transparent py-4 outline-none placeholder:text-muted-foreground" />
        </div>
        <ul className="max-h-80 overflow-auto p-2">
          {filtered.map((x, idx) => (
            <li key={x.hint + x.label}>
              <button onMouseEnter={() => setI(idx)} onClick={() => pick(x)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${idx === i ? "bg-accent text-brand" : ""}`}>
                <span className="truncate">{x.label}</span><span className="ml-3 shrink-0 font-mono text-xs text-muted-foreground">{x.hint}</span>
              </button>
            </li>
          ))}
          {!filtered.length && <li className="px-3 py-6 text-center text-sm text-muted-foreground">No results</li>}
        </ul>
      </div>
    </div>
  );
}
