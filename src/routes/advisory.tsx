import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ArrowRight } from "lucide-react";
import { canonical } from "@/lib/seo";
import { advisory, advisoryProcess, advisoryFaq } from "@/data/profile";
import { Reveal, PageHero } from "@/components/site/Reveal";

const TITLE = "AI Advisory for Enterprises & Mentoring — Harsh Verma";
const DESC = "Agentic AI advisory for enterprises: strategy, secure architecture and governance, plus executive briefings and engineer mentoring from Principal AI Engineer Harsh Verma.";

export const Route = createFileRoute("/advisory")({
  head: () => ({
    links: canonical("/advisory").links,
    meta: [
      canonical("/advisory").url,
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Service", name: "AI Advisory", serviceType: "Agentic AI advisory", provider: { "@type": "Person", name: "Harsh Verma", url: "https://www.iamharshverma.com" }, areaServed: "Worldwide",
          hasOfferCatalog: { "@type": "OfferCatalog", name: "Advisory services", itemListElement: advisory.map((a) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: a.title, description: a.desc } })) } },
        { "@type": "FAQPage", mainEntity: advisoryFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ],
    }) }],
  }),
  component: Advisory,
});

function Advisory() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const a = advisory[active]!;
  return (
    <>
      <PageHero eyebrow="// advisory · mentoring" title={<>Guidance for builders of <span className="text-brand-gradient">what's next.</span></>}
        intro="Helping enterprises build agentic AI that customers trust — strategy, secure architecture, governance and the people who ship it." />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal><p className="eyebrow">Choose a focus</p><h2 className="mt-3 font-display text-4xl font-bold tracking-tight">How I can help</h2></Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div role="tablist" aria-label="Advisory services" className="grid gap-3">
            {advisory.map((s, i) => (
              <button key={s.title} role="tab" aria-selected={i === active} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition ${i === active ? "border-brand bg-card shadow-glow" : "border-border bg-card/50 hover:border-brand/50"}`}>
                <span className="font-display text-3xl font-bold text-brand-gradient">0{i + 1}</span>
                <span className="min-w-0 flex-1"><span className="block font-display text-xl">{s.title}</span><span className="block font-mono text-xs text-brand">{s.org}</span></span>
                <ArrowRight className={`h-5 w-5 shrink-0 transition ${i === active ? "translate-x-1 text-brand" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <div className="relative min-h-[22rem] overflow-hidden rounded-3xl border border-border bg-card p-8">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <p className="font-mono text-xs uppercase tracking-widest text-brand">For {a.forWho}</p>
                <h3 className="mt-3 font-display text-3xl">{a.title}</h3>
                <p className="mt-3 text-muted-foreground">{a.desc}</p>
                <p className="mt-6 text-sm font-medium">What you get</p>
                <ul className="mt-3 grid gap-3">
                  {a.outcomes.map((o) => (<li key={o} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" /><span>{o}</span></li>))}
                </ul>
                <Link to="/booking" search={{ topic: "Advisory" }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">
                  Discuss {a.title} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal><p className="eyebrow">The process</p><h2 className="mt-3 font-display text-4xl font-bold tracking-tight">From idea to trusted production</h2></Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {advisoryProcess.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <li className="relative h-full rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-brand/50">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-display font-bold text-primary-foreground">{i + 1}</span>
                <h3 className="mt-4 font-display text-xl">{p.step}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal><p className="eyebrow">Questions</p><h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Advisory FAQ</h2></Reveal>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
          {advisoryFaq.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium">
                {f.q}<ChevronDown className={`h-5 w-5 shrink-0 transition ${open === i ? "rotate-180 text-brand" : "text-muted-foreground"}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 text-muted-foreground">
                    <span className="block pb-5">{f.a}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28 pt-8">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-glow md:p-14">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Building with AI?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Share a short brief and let's map where agentic AI can create trusted value for your organisation.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/booking" search={{ topic: "Advisory" }} className="inline-flex rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">Book an advisory call</Link>
              <Link to="/agentic-ai" className="inline-flex rounded-full border border-border px-6 py-3 font-medium hover:border-brand">Explore agentic AI insights</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
