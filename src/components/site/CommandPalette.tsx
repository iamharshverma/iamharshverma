import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { nav } from "./nav";
import { knowledge, filterKnowledge } from "@/data/knowledge";
import { KnowledgeLink } from "./KnowledgeCards";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, setOpen]);
  const filtered = filterKnowledge(knowledge, { q }).slice(0, 8);
  const pages = nav
    .filter((n) => n.label.toLowerCase().includes(q.toLowerCase()))
    .slice(0, q ? 3 : 6);
  const close = () => {
    setOpen(false);
    setQ("");
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setQ("");
      }}
    >
      <DialogContent className="z-[100] max-w-xl">
        <DialogTitle>Search Harsh's work</DialogTitle>
        <DialogDescription className="sr-only">Pages and public resources</DialogDescription>
        <label className="flex items-center gap-3 border-b border-border">
          <Search className="size-4 text-muted-foreground" />
          <span className="sr-only">Search pages and knowledge</span>
          <input
            aria-label="Search pages and knowledge"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Articles, research, talks, books…"
            className="w-full bg-transparent py-4 outline-none"
          />
        </label>
        <ul className="max-h-[55vh] space-y-1 overflow-auto">
          {pages.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                onClick={close}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                {n.label}
              </Link>
            </li>
          ))}
          {filtered.map((item) => (
            <li key={item.id} onClick={close}>
              <KnowledgeLink
                item={item}
                className="flex items-start justify-between gap-4 rounded-md px-3 py-3 text-sm hover:bg-accent"
              >
                <span>{item.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{item.kind}</span>
              </KnowledgeLink>
            </li>
          ))}
          {!filtered.length && !pages.length && (
            <li className="py-6 text-center text-sm text-muted-foreground">No results</li>
          )}
        </ul>
        <Link
          to="/knowledge"
          search={q ? { q } : {}}
          onClick={close}
          className="border-t border-border pt-4 text-sm text-brand"
        >
          Open the full Knowledge Hub →
        </Link>
      </DialogContent>
    </Dialog>
  );
}
