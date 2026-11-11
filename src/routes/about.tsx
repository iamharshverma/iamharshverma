import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile, experience, education, memberships } from "@/data/profile";
import { Reveal, PageHero } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About Harsh Verma — Career, Education & Fellowships" },
      { name: "description", content: "Biography, career timeline at Palo Alto Networks, education at Stanford GSB and UT Dallas, and fellowships of Harsh Verma." },
      { property: "og:title", content: "About Harsh Verma" },
      { property: "og:description", content: "Researcher by passion, entrepreneur at heart." },
    ],
  }),
  component: About,
});

function About() {
  const [tab, setTab] = useState<"work" | "edu">("work");
  return (
    <>
      <PageHero eyebrow="// about" title={<>Researcher by passion,<br /><span className="text-brand-gradient">entrepreneur at heart.</span></>} intro={profile.bio} />
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">
        {profile.philosophy.map((p, i) => (
          <Reveal key={p.p} delay={i * 0.1}>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <p className="font-display text-6xl text-brand-gradient">P{i + 1}</p>
              <h3 className="mt-4 font-display text-3xl">{p.p}</h3>
              <p className="mt-3 text-muted-foreground">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal><p className="eyebrow">Journey</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Timeline</h2></Reveal>
          <div className="flex rounded-full border border-border p-1">
            {(["work", "edu"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-full px-5 py-2 text-sm transition ${tab === t ? "bg-brand-gradient text-primary-foreground" : "text-muted-foreground"}`}>
                {t === "work" ? "Experience" : "Education"}
              </button>
            ))}
          </div>
        </div>
        <ol className="relative mt-12 border-l border-border pl-8">
          {tab === "work" ? experience.map((e) => (
            <Reveal key={e.role + e.org}>
              <li className="relative mb-12">
                <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-brand shadow-glow" />
                <p className="font-mono text-xs text-brand">{e.period} · {e.place}</p>
                <h3 className="mt-2 font-display text-3xl">{e.role}</h3>
                <p className="text-muted-foreground">{e.org}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">{e.points.map((p) => <li key={p}>— {p}</li>)}</ul>
                <div className="mt-4 flex flex-wrap gap-2">{e.tech.map((t) => <span key={t} className="rounded-full border border-border px-3 py-1 font-mono text-xs">{t}</span>)}</div>
              </li>
            </Reveal>
          )) : education.map((e) => (
            <Reveal key={e.school}>
              <li className="relative mb-12 flex gap-5">
                <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-brand shadow-glow" />
                <img src={e.logo} alt="" className="h-14 w-14 rounded-xl bg-foreground object-contain p-1" loading="lazy" />
                <div><p className="font-mono text-xs text-brand">{e.period}</p><h3 className="mt-1 font-display text-3xl">{e.school}</h3><p className="mt-1 text-muted-foreground">{e.degree}</p></div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <Reveal><p className="eyebrow">Invited associations</p><h2 className="mt-4 font-display text-5xl font-bold tracking-tight">Fellowships & memberships</h2></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {memberships.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.04}>
              <a href={m.href} target="_blank" rel="noreferrer" className="group flex h-full items-start justify-between rounded-2xl border border-border bg-card p-6 transition hover:border-brand/50">
                <div><h3 className="font-display text-2xl">{m.name}</h3><p className="mt-1 text-sm text-muted-foreground">{m.note}</p></div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-brand" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
