import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Mic2, Newspaper } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const paths = [
  { icon: Mic2, label: "Keynote", title: "Book a keynote", text: "Agentic AI, AI security and trustworthy autonomy, for conferences, companies and universities.", to: "/booking" as const, topic: "Keynote" as const },
  { icon: Compass, label: "Founder advisory", title: "AI advisory for founders", text: "Strategy, architecture and trust for startups shipping agentic AI, from first agent to scale.", to: "/booking" as const, topic: "Advisory" as const },
  { icon: Newspaper, label: "Media & press", title: "Interviews & press", text: "Bio, photos, topics and a downloadable press kit for journalists and podcast hosts.", to: "/press-kit" as const },
];

export function WorkWithMe() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal><p className="eyebrow">// work with me</p><h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">How we can work together</h2></Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {paths.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.06}>
            <CardLink p={p} className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-brand hover:shadow-glow">
              <p.icon className="h-7 w-7 text-brand" />
              <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-signal">{p.label}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{p.title}</h3>
              <p className="mt-3 flex-1 text-muted-foreground">{p.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand">Get started <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </CardLink>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

type P = (typeof paths)[number];
function CardLink({ p, className, children }: { p: P; className: string; children: React.ReactNode }) {
  return "topic" in p && p.topic
    ? <Link to="/booking" search={{ topic: p.topic }} className={className}>{children}</Link>
    : <Link to="/press-kit" className={className}>{children}</Link>;
}
