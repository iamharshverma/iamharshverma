import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Download, Mic, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Reveal";
import { profile, experience, speaking, links } from "@/data/profile";
import professionalPortrait from "@/assets/harsh-verma-professional-profile.jpg.asset.json";
import { keynotes } from "@/data/media";
import { canonical, SITE_URL, ALT_PORTFOLIO_URL } from "@/lib/seo";

const path = "/harsh-verma-ai-speaker";
const title = "Harsh Verma — AI Speaker & Principal AI Engineer";
const description = "Meet Harsh Verma, Principal AI Engineer at Palo Alto Networks and AI speaker on agentic AI, cybersecurity and enterprise AI. Explore his experience, talks and speaker bio.";

export const Route = createFileRoute("/harsh-verma-ai-speaker")({
  head: () => ({
    links: canonical(path).links,
    meta: [
      canonical(path).url,
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE_URL}${path}#profile`,
        url: `${SITE_URL}${path}`,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: profile.name,
          jobTitle: profile.title,
          worksFor: { "@type": "Organization", name: profile.company },
          description: profile.bio,
          sameAs: [ALT_PORTFOLIO_URL, ...Object.values(links)],
          knowsAbout: ["Agentic AI", "AI security", "Enterprise AI", "Machine learning", "Distributed systems"],
        },
      }),
    }],
  }),
  component: ProfessionalProfile,
});

function ProfessionalProfile() {
  const currentRole = experience[0];
  return <>
    <PageHero eyebrow="// engineering · speaking · enterprise AI" title="Harsh Verma" intro="Principal AI Engineer at Palo Alto Networks · AI speaker on agentic AI, security and trustworthy autonomous systems." />
    <section className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-16 md:grid-cols-[0.8fr_1.2fr]">
      <img src={professionalPortrait.url} alt="Harsh Verma, Principal AI Engineer and AI speaker" className="w-full rounded-lg" />
      <div className="min-w-0">
        <p className="eyebrow">San Francisco Bay Area</p>
        <h2 className="mt-4 font-display text-3xl font-bold">Principal AI Engineer. Enterprise perspective.</h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">{profile.bio}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">Harsh’s professional role is {profile.title} at {profile.company}. His engineering work and public talks connect autonomous agents, production machine learning and cybersecurity with the practical requirements of enterprise teams.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild><Link to="/booking" search={{ topic: "Keynote" }}><Mic className="size-4" />Invite Harsh to speak</Link></Button>
          <Button asChild variant="outline"><Link to="/about"><Cpu className="size-4" />Experience & education</Link></Button>
        </div>
      </div>
    </section>
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="eyebrow">Engineering experience</p>
        <h2 className="mt-4 font-display text-3xl font-bold">From machine learning to secure agentic AI</h2>
        {currentRole && <div className="mt-6 max-w-3xl">
          <p className="font-semibold">{currentRole.role} · {currentRole.org}</p>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-muted-foreground">{currentRole.points.map(point => <li key={point}>{point}</li>)}</ul>
        </div>}
        <div className="mt-7 flex flex-wrap gap-5">
          <Link to="/research" className="text-brand underline underline-offset-4">Research & patents</Link>
          <a href={links.theorg} target="_blank" rel="noreferrer" className="text-brand underline underline-offset-4">Professional profile at The Org</a>
          <a href={links.forbes} target="_blank" rel="noreferrer" className="text-brand underline underline-offset-4">Forbes Technology Council profile</a>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Harsh Verma · AI speaker</p>
      <h2 className="mt-4 font-display text-3xl font-bold">Talks for leaders and builders</h2>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {speaking.filter(talk => talk.type !== "Judging").map(talk => <article key={talk.title} className="rounded-lg border border-border bg-card p-6">
          <Mic className="size-5 text-brand" />
          <h3 className="mt-4 font-display text-xl font-semibold">{talk.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{talk.desc}</p>
        </article>)}
      </div>
      <h3 className="mt-10 font-display text-2xl font-semibold">Past talks & recordings</h3>
      <ul className="mt-4 divide-y divide-border">
        {keynotes.slice(0, 2).map(talk => <li key={talk.href} className="py-5">
          <a href={talk.href} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 font-medium text-brand">{talk.title}<ArrowUpRight className="mt-1 size-4 shrink-0" /></a>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{talk.desc}</p>
        </li>)}
      </ul>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button asChild><Link to="/speaking">All keynotes & past events<ArrowUpRight className="size-4" /></Link></Button>
        <Button asChild variant="outline"><Link to="/speaker-bio">Full speaker bio</Link></Button>
        <Button asChild variant="outline"><a href="/downloads/harsh-verma-speaker-bio.pdf" download><Download className="size-4" />Speaker bio PDF</a></Button>
      </div>
    </section>
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="font-display text-3xl font-bold">Enterprise AI, in practice</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Explore Harsh’s writing on agentic AI, secure architecture and AI governance, or discuss an enterprise advisory engagement.</p>
        <div className="mt-6 flex flex-wrap gap-5">
          <Link to="/insights" className="text-brand underline underline-offset-4">Articles & insights</Link>
          <Link to="/agentic-ai" className="text-brand underline underline-offset-4">Agentic AI topics</Link>
          <Link to="/advisory" className="text-brand underline underline-offset-4">Enterprise AI advisory</Link>
        </div>
      </div>
    </section>
  </>;
}