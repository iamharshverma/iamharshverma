import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { advisory } from "@/data/profile";
import { Reveal, PageHero } from "@/components/site/Reveal";

export const Route = createFileRoute("/advisory")({
  head: () => ({
    links: canonical("/advisory").links,
    meta: [
      canonical("/advisory").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "AI Advisory for Founders & Mentoring — Harsh Verma" },
      { name: "description", content: "AI advisory for founders: agentic AI strategy, architecture and trust for startups and enterprises, plus UC Berkeley SkyDeck mentoring and Forbes Technology Council leadership." },
      { property: "og:title", content: "AI Advisory for Founders & Mentoring — Harsh Verma" },
      { property: "og:description", content: "Strategic AI guidance for founders and enterprise leaders." },
      { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Advisory,
});

function Advisory() {
  return (
    <>
      <PageHero eyebrow="// advisory · mentoring" title={<>Guidance for builders of <span className="text-brand-gradient">what's next.</span></>}
        intro="Advising startups on AI strategy, mentoring aspiring entrepreneurs and helping leaders adopt AI responsibly and at scale." />
      <section className="mx-auto grid max-w-6xl gap-4 px-6 py-20 md:grid-cols-2">
        {advisory.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-card p-8 transition hover:border-brand/50">
              <p className="font-display text-5xl font-bold tracking-tight text-brand-gradient">0{i + 1}</p>
              <h3 className="mt-4 font-display text-3xl">{a.title}</h3>
              <p className="mt-2 font-mono text-xs text-brand">{a.org}</p>
              <p className="mt-4 text-muted-foreground">{a.desc}</p>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-28 text-center">
        <Reveal><h2 className="font-display text-5xl font-bold tracking-tight">Building with AI?</h2><Link to="/contact" className="mt-8 inline-flex rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground shadow-glow">Start a conversation</Link></Reveal>
      </section>
    </>
  );
}
