import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { nav } from "./nav";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";

export function Header({ onPalette }: { onPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass py-3" : "py-5"}`}>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-6 xl:flex xl:justify-between">
        <Link to="/" aria-label="Harsh Verma home"><Logo /></Link>
        <nav className="hidden items-center gap-0.5 xl:flex">
          {nav.slice(1, -1).map((n) => (
            <Link key={n.to} to={n.to} className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-brand" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Open AI assistant" title="Open AI assistant" onClick={() => window.dispatchEvent(new Event("open-harsh-assistant"))}><MessagesSquare /></Button>
          <button onClick={onPalette} className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition hover:border-brand hover:text-brand md:flex" aria-label="Open search">
            <Command className="h-3.5 w-3.5" /> K
          </button>
          <Link to="/contact" className="hidden rounded-full bg-brand-gradient px-4 py-1.5 text-sm font-medium text-primary-foreground xl:inline-flex">Contact</Link>
          <button className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <div className="glass mx-4 mt-3 max-h-[80vh] overflow-auto rounded-2xl p-4 xl:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2 font-display text-2xl">{n.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
