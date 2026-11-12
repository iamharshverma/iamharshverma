import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, Command, FlaskConical, Home, Menu, MessagesSquare, Mic, Newspaper, Sparkles, Trophy, UserRound, UsersRound, X } from "lucide-react";
import { nav } from "./nav";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const menuDetails = {
  "/": { icon: Home, detail: "The portfolio", group: "Explore" },
  "/about": { icon: UserRound, detail: "Story & experience", group: "Explore" },
  "/research": { icon: FlaskConical, detail: "Ideas & intellectual property", group: "Explore" },
  "/books": { icon: BookOpen, detail: "Beyond AI Engineering · AI vs. AI", group: "Explore" },
  "/recognition": { icon: Trophy, detail: "Honors & recognition", group: "Explore" },
  "/insights": { icon: Sparkles, detail: "Essays & practical perspectives", group: "Explore" },
  "/speaking": { icon: Mic, detail: "Keynotes & event history", group: "Connect" },
  "/media": { icon: Newspaper, detail: "Interviews & press coverage", group: "Connect" },
  "/collaborate": { icon: UsersRound, detail: "Advisory & collaboration", group: "Connect" },
  "/contact": { icon: MessagesSquare, detail: "Start a conversation", group: "Connect" },
};

export function Header({ onPalette }: { onPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); menuButtonRef.current?.focus(); }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <header ref={headerRef} className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass py-3" : "py-5"}`}>
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
          <Button ref={menuButtonRef} variant={open ? "secondary" : "ghost"} size="icon" onClick={() => setOpen(!open)} aria-label="Menu" title={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="site-menu">{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav ref={menuRef} id="site-menu" aria-label="Portfolio navigation" className="ml-auto mt-3 max-h-[calc(100dvh-110px)] w-full max-w-xl overflow-y-auto rounded-lg border border-border bg-popover text-popover-foreground shadow-glow">
            <div className="flex items-center justify-between border-b border-border px-5 py-4"><p className="font-display text-lg font-semibold">Harsh Verma</p><span className="font-mono text-[10px] uppercase text-muted-foreground">Engineer · Author · Speaker</span></div>
            <div className="grid gap-5 p-4 sm:grid-cols-2 sm:gap-4">
              {["Explore", "Connect"].map(group => <div key={group}><p className="mb-2 px-3 font-mono text-[10px] uppercase text-signal">{group}</p><ul className="space-y-1">{nav.filter(n => menuDetails[n.to].group === group).map(n => {
                const { icon: Icon, detail } = menuDetails[n.to];
                return <li key={n.to}><Link to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }} className="group flex min-h-16 items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" activeProps={{ className: "bg-accent text-brand", "aria-current": "page" }}><Icon className="h-5 w-5 shrink-0 text-brand" /><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{n.label}</span><span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{detail}</span></span><ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" /></Link></li>;
              })}</ul></div>)}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
