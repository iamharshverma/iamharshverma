import { profile, speaking } from "./profile";
import { media } from "./media";

const talks = media.filter(m => m.group === "Keynotes & Talks").sort((a, b) => b.year - a.year);

export const pressKit = {
  shortBio: "Harsh Verma is a Principal Software Engineer in AI at Palo Alto Networks, a Forbes Technology Council member, keynote speaker, author and advisor focused on agentic AI, enterprise security and trustworthy autonomous systems.",
  fullBio: profile.bio,
  topics: speaking.filter(topic => topic.type !== "Judging"),
  keynoteDates: talks.map(t => ({ year: t.year, title: t.title, outlet: t.outlet, format: t.cat })),
  pdf: "/downloads/harsh-verma-press-kit.pdf",
};

export const mediaKit = {
  pdf: "/downloads/harsh-verma-media-kit.pdf",
  highlights: media.filter(m => m.featured && m.group !== "Keynotes & Talks").slice(0, 6),
  outlets: Array.from(new Set(media.map(m => m.outlet))).slice(0, 14),
};

export const speakerGuide = {
  introduction: "Harsh Verma is an AI speaker and Principal Software Engineer in AI at Palo Alto Networks. His keynotes connect agentic AI, cybersecurity and production engineering: how autonomous systems make decisions, where trust can break down, and what enterprises need to govern them responsibly.",
  audiences: [
    { title: "Enterprise leaders", detail: "AI adoption beyond the pilot: connect autonomous agents to business priorities, accountability and governance." },
    { title: "Engineering teams", detail: "Explore multi-agent architectures, evaluation, human oversight and the transition from demos to production-grade systems." },
    { title: "Security leaders", detail: "Examine AI-driven threats, agent security boundaries and the AI-vs-AI approach to enterprise defense." },
  ],
  organizerBio: "Harsh Verma is a Principal Software Engineer in AI at Palo Alto Networks and a Forbes Technology Council member. His work focuses on autonomous agent systems, machine learning and enterprise cybersecurity. As an AI keynote speaker, he translates technical research into conversations about agentic AI, responsible adoption and secure systems. His speaking history includes ACM Sacramento and UC Berkeley SkyDeck; recordings and event references are available on his portfolio.",
  briefing: "To discuss an AI keynote, share your event date, location or online format, audience, and the decisions you want the session to inform. Include whether you need a keynote, panel contribution or executive masterclass; scope and availability are confirmed through the booking enquiry.",
};

import portraitAsset from "@/assets/harsh-verma-portrait.jpg.asset.json";
import executiveAsset from "@/assets/harsh-verma-executive.jpg.asset.json";
import speakerAsset from "@/assets/harsh-verma-speaker.jpg.asset.json";
import authorAsset from "@/assets/harsh-verma-author.jpg.asset.json";
import { editorialMentions } from "./testimonials";

export const pressPhotos = [
  { src: executiveAsset.url, file: "harsh-verma-executive.jpg", label: "Executive", use: "Profiles, business features" },
  { src: speakerAsset.url, file: "harsh-verma-on-stage.jpg", label: "On stage", use: "Event programs, keynote promos" },
  { src: authorAsset.url, file: "harsh-verma-author.jpg", label: "Author", use: "Book coverage, interviews" },
  { src: portraitAsset.url, file: "harsh-verma-portrait.jpg", label: "Portrait", use: "Bylines, podcasts" },
];

export const pressQuotes = [
  ...media.filter(m => m.featured && m.quote).slice(0, 3).map(m => ({ quote: m.quote, by: m.outlet, context: m.title, href: m.href })),
  ...editorialMentions.map(e => ({ quote: e.quote, by: e.outlet, context: e.label, href: e.source })),
];

export const bioText = () => [
  "HARSH VERMA — OFFICIAL BIOGRAPHY", "",
  "Short bio (50 words)", pressKit.shortBio, "",
  "Full bio", pressKit.fullBio, "",
  `Media enquiries: ${profile.email}`, "Website: https://www.iamharshverma.com",
].join("\n");
