import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { Mic2, Compass } from "lucide-react";
import { PageHero } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/booking")({
  validateSearch: (s: Record<string, unknown>): { topic?: "Keynote" | "Advisory" } => (s["topic"] === "Keynote" || s["topic"] === "Advisory" ? { topic: s["topic"] } : {}),
  head: () => ({
    links: canonical("/booking").links, meta: [
      canonical("/booking").url,
    { title: "Book Harsh Verma — Keynotes & Advisory" },
    { name: "description", content: "Request Harsh Verma for an AI keynote or advisory engagement. Share your preferred date, audience and goals." },
    { property: "og:title", content: "Book Harsh Verma — Keynotes & Advisory" },
    { property: "og:description", content: "Start a keynote or advisory engagement with Harsh Verma." },
    { property: "og:image", content: "https://www.iamharshverma.com/og-image.jpg" },
    { name: "twitter:image", content: "https://www.iamharshverma.com/og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Booking,
});

function Booking() {
  const { topic } = Route.useSearch();
  return <><PageHero eyebrow="// keynote · advisory" title={<>Book <span className="text-brand-gradient">Harsh Verma.</span></>} intro="A conversation that moves your audience forward. A partnership that turns AI ambition into engineered outcomes." />
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.25fr]">
      <div className="min-w-0"><img src={profile.stagePhoto} alt="Harsh Verma speaking on stage" className="h-auto w-full rounded-lg" />
        <div className="mt-8 divide-y divide-border"><div className="py-5"><Mic2 className="size-6 text-brand" /><h2 className="mt-3 font-display text-2xl">Keynotes & conversations</h2><p className="mt-2 text-muted-foreground">Agentic AI, AI security, trustworthy autonomous systems, and the future of engineering.</p></div><div className="py-5"><Compass className="size-6 text-brand" /><h2 className="mt-3 font-display text-2xl">Advisory & strategic roles</h2><p className="mt-2 text-muted-foreground">AI strategy, architecture, responsible adoption, and guidance for founders and technical leaders.</p></div></div>
      </div><div className="min-w-0"><p className="eyebrow">Your engagement brief</p><h2 className="mt-3 mb-8 font-display text-3xl">Start the conversation</h2><EnquiryForm booking initialTopic={topic} /></div>
    </section></>;
}