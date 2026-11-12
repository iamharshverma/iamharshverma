import { Link } from "@tanstack/react-router";
import { links, profile } from "@/data/profile";
import { Subscribe } from "./Subscribe";
import { Instagram, Linkedin, Twitter, Globe, ArrowUpRight, Newspaper, ShieldCheck, Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border pb-20 md:pb-0">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-display text-4xl font-bold tracking-tight md:text-6xl">Let's talk <span className="text-brand-gradient">AI.</span></p>
        <a href={`mailto:${profile.email}`} className="mt-4 inline-block text-muted-foreground hover:text-brand">{profile.email}</a>
        <div className="mt-8 max-w-md"><p className="mb-3 text-sm font-medium">Newsletter — new essays on agentic AI & security</p><Subscribe list="newsletter" /></div>
        <section aria-label="Social media" className="pt-6">
          <p className="eyebrow text-center">Stay connected</p>
          <div className="mt-2 overflow-hidden">
            <div className="py-1">
              <div className="flex w-max animate-marquee gap-2 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
                {[0, 1, 2, 3].flatMap((copy) => [
                  { name: "Instagram", href: links.instagram, Icon: Instagram },
                  { name: "LinkedIn", href: links.linkedin, Icon: Linkedin },
                  { name: "Twitter", href: links.twitter, Icon: Twitter },
                  { name: "Portfolio", href: links.portfolio, Icon: Globe },
                  { name: "Forbes", href: links.forbes, Icon: Newspaper },
                  { name: "RSAC", href: links.rsac, Icon: ShieldCheck },
                  { name: "HackerNoon", href: links.hackernoon, Icon: Code },
                ].map(({ name, href, Icon }) => (
                  <a key={`${copy}-${name}`} href={href} target="_blank" rel="noopener noreferrer" tabIndex={copy === 0 ? 0 : -1} aria-hidden={copy > 0 ? true : undefined} className="press-card-shadow flex h-9 w-28 shrink-0 items-center justify-center gap-1.5 rounded-md border border-border bg-card px-2 text-xs font-semibold text-foreground transition hover:border-shine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                    <Icon aria-hidden="true" className="size-3.5 shrink-0 text-brand" />{name}<ArrowUpRight aria-hidden="true" className="size-3 shrink-0 text-muted-foreground" />
                  </a>
                )))}
              </div>
            </div>
          </div>
        </section>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-2 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Harsh Verma · {profile.location}</p>
          <div className="flex flex-wrap gap-4">
            {Object.entries({ LinkedIn: links.linkedin, GitHub: links.github, Scholar: links.scholar, Forbes: links.forbes }).map(([k, v]) => (
              <a key={k} href={v} target="_blank" rel="noreferrer" className="hover:text-brand">{k}</a>
            ))}
            <Link to="/contact" className="hover:text-brand">Contact</Link>
            <Link to="/press-kit" className="hover:text-brand">Press kit</Link>
            <Link to="/agentic-ai" className="hover:text-brand">Agentic AI</Link>
            <Link to="/harsh-verma-ai-speaker" className="hover:text-brand">AI speaker & engineer</Link>
            <Link to="/testimonials" className="hover:text-brand">Testimonials</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
