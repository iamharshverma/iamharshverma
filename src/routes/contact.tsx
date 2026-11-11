import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { profile, links } from "@/data/profile";
import { Reveal, PageHero } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    links: canonical("/contact").links,
    meta: [
      canonical("/contact").url,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact Harsh Verma — Keynotes, Advisory & Media" },
      { name: "description", content: "Reach Harsh Verma for keynote bookings, startup advisory, media interviews and collaborations." },
      { property: "og:title", content: "Contact Harsh Verma" },
      { property: "og:description", content: "Keynotes, advisory, media and collaborations." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="// contact" title={<>Let's build the <span className="text-brand-gradient">future of AI.</span></>} />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="space-y-6">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-brand"><Mail className="h-5 w-5 text-brand" />{profile.email}</a>
            <p className="flex items-center gap-3 text-muted-foreground"><MapPin className="h-5 w-5 text-brand" />{profile.location}</p>
            <div className="border-t border-border pt-6">
              <p className="eyebrow">Verified profiles</p>
              <ul className="mt-4 space-y-2">
                {Object.entries({ LinkedIn: links.linkedin, "Forbes Council": links.forbes, "Google Scholar": links.scholar, GitHub: links.github, "The Org": links.theorg, "HarshVerma.bio": links.bio, Mastodon: links.mastodon }).map(([k, v]) => (
                  <li key={k}><a href={v} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-muted-foreground hover:text-brand">{k}<ArrowUpRight className="h-4 w-4" /></a></li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <EnquiryForm />
        </Reveal>
      </section>
    </>
  );
}
