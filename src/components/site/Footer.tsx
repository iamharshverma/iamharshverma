import { Link } from "@tanstack/react-router";
import { links, profile } from "@/data/profile";
import { Subscribe } from "./Subscribe";

export function Footer() {
  return (
    <footer className="border-t border-border pb-20 md:pb-0">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-display text-4xl font-bold tracking-tight md:text-6xl">Let's talk <span className="text-brand-gradient">AI.</span></p>
        <a href={`mailto:${profile.email}`} className="mt-4 inline-block text-muted-foreground hover:text-brand">{profile.email}</a>
        <div className="mt-8 max-w-md"><p className="mb-3 text-sm font-medium">Newsletter — new essays on agentic AI & security</p><Subscribe list="newsletter" /></div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
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
