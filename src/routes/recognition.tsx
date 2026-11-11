import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { awards } from "@/data/profile";
import { Reveal, PageHero } from "@/components/site/Reveal";

export const Route = createFileRoute("/recognition")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Honors, Awards & Press — Harsh Verma" },
      { name: "description", content: "Stevie Gold, NVTC Cyber50, TITAN Innovation, Forttuna Global 100 and more global honors for Harsh Verma." },
      { property: "og:title", content: "Honors, Awards & Press — Harsh Verma" },
      { property: "og:description", content: "Global recognition for enterprise AI and autonomous security." },
    ],
  }),
  component: Recognition,
});

const cats = ["All", "Leadership", "Cybersecurity", "Academic"] as const;

function Recognition() {
  const [c, setC] = useState<(typeof cats)[number]>("All");
  const [q, setQ] = useState("");
  const list = awards.filter((a) => (c === "All" || a.cat === c) && (a.title + a.org).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHero eyebrow="// honors · awards" title={<>Recognized <span className="text-brand-gradient">worldwide.</span></>}
        intro="Honored by premier technology councils, engineering bodies and business foundations for advances in enterprise AI and autonomous security." />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-center gap-2">
          {cats.map((x) => (
            <button key={x} onClick={() => setC(x)} className={`rounded-full border px-4 py-2 text-sm transition ${c === x ? "border-brand bg-brand-gradient text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{x}</button>
          ))}
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search honors…" className="ml-auto w-full rounded-full border border-input bg-transparent px-4 py-2 text-sm outline-none focus:border-brand sm:w-64" />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.03}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-brand/50">
                <div className="aspect-[5/3] overflow-hidden"><img src={a.img} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /></div>
                <div className="p-6"><div className="flex items-start justify-between">
                  <span className="rounded-full border border-signal/40 px-3 py-1 font-mono text-xs text-signal">{a.badge}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl leading-tight">{a.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{a.org}</p>
                <p className="mt-3 text-sm text-muted-foreground">{a.desc}</p>
              </div></div>
            </Reveal>
          ))}
          {!list.length && <p className="text-muted-foreground">No honors match.</p>}
        </div>
      </section>
    </>
  );
}
