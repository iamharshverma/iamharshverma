import { createFileRoute } from "@tanstack/react-router";
import { canonical, SITE_URL } from "@/lib/seo";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { profile, links } from "@/data/profile";
import { Reveal, PageHero } from "@/components/site/Reveal";
import contactImage from "@/assets/harsh-verma-contact.jpg.asset.json";

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
      { property: "og:image", content: `${SITE_URL}${contactImage.url}` },
      { name: "twitter:image", content: `${SITE_URL}${contactImage.url}` },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="// contact" title={<>Let's build the <span className="text-brand-gradient">Future of AI.</span></>} />
      <section className="mx-auto max-w-6xl px-6 pt-8 md:pt-12" aria-label="Harsh Verma professional profile">
        <Reveal>
          <img src={contactImage.url} alt="Harsh Verma — principal AI engineer, speaker and advisor; Forbes Technology Council and Forttuna member" width={1400} height={349} className="h-auto w-full rounded-lg border border-border" />
        </Reveal>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-16 md:py-14">
        <Reveal>
          <div className="min-w-0 space-y-6">
            <p className="eyebrow">Get in touch</p>
            <a href={`mailto:${profile.email}`} className="flex items-start gap-3 break-all hover:text-brand"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" />{profile.email}</a>
            <p className="flex items-start gap-3 text-muted-foreground"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />{profile.location}</p>
            <div className="border-t border-border pt-6">
              <p className="eyebrow">Verified profiles</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
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
