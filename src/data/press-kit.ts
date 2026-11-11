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
