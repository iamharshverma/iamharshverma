import { profile, experience, education, memberships, awards, research, speaking, advisory, links } from "@/data/profile";
import { media, keynotes, blogs, judging } from "@/data/media";
import { offerings } from "@/data/collaborate";
import { books } from "@/data/books";
import { testimonials, editorialMentions } from "@/data/testimonials";

/** Compact knowledge base the assistant may answer from. */
export function buildInstructions() {
  const lines: string[] = [];
  lines.push(`You are "Ask Harsh", the AI guide on Harsh Verma's portfolio website. Answer visitor questions about Harsh's experience, research, patents, books, articles, media, speaking topics, awards and ways to collaborate.`);
  lines.push(`Rules: Use ONLY the facts below. If something is not covered, say you don't have that detail and suggest the Contact page or emailing ${profile.email}. Speak about Harsh in the third person. Be concise (2-6 sentences or a short list), warm and professional. Include relevant links from the facts as markdown links. Never invent numbers, employers, dates or quotes.`);
  lines.push(`\n## Profile\n${profile.name} — ${profile.title} at ${profile.company}, ${profile.location}. ${profile.bio} Tagline: ${profile.tagline}`);
  lines.push(`Stats: 12+ years in AI/tech, 27+ peer-reviewed papers, 6 enterprise patents, 44+ global press features. Links: LinkedIn ${links.linkedin}, Scholar ${links.scholar}, GitHub ${links.github}, Forbes ${links.forbes}.`);
  lines.push(`\n## Experience\n` + experience.map((e) => `- ${e.period}: ${e.role}, ${e.org} (${e.place}). ${e.points.join(" ")} Tech: ${e.tech.join(", ")}`).join("\n"));
  lines.push(`\n## Education\n` + education.map((e) => `- ${e.period}: ${e.school} — ${e.degree}`).join("\n"));
  lines.push(`\n## Memberships\n` + memberships.map((m) => `- ${m.name}: ${m.note}`).join("\n"));
  lines.push(`\n## Awards\n` + awards.map((a) => `- ${a.title} (${a.org}): ${a.desc}`).join("\n"));
  lines.push(`\n## Research, patents, projects\n` + research.map((r) => `- [${r.kind}] ${r.title} — ${r.meta}. ${r.desc}${r.href ? ` ${r.href}` : ""}`).join("\n"));
  lines.push(`\n## Books\n` + books.map((b) => `- ${b.title}: ${b.subtitle}. ${b.status}. ${b.pitch} Site: ${b.site}`).join("\n"));
  lines.push(`\n## Articles\n` + blogs.map((b) => `- ${b.title} (${b.pub}, ${b.date}): ${b.excerpt} ${b.href}`).join("\n"));
  lines.push(`\n## Keynotes\n` + keynotes.map((k) => `- ${k.title} — ${k.venue} (${k.dur}). ${k.desc} ${k.href}`).join("\n"));
  lines.push(`Speaking topics: ` + speaking.map((s) => `${s.title} (${s.type})`).join("; "));
  lines.push(`\n## Judging & mentorship\n` + judging.map((j) => `- ${j.title} — ${j.org}, ${j.role}`).join("\n"));
  lines.push(`\n## Media coverage\n` + media.map((m) => `- ${m.title} (${m.outlet}, ${m.year})${m.href ? ` ${m.href}` : ""}`).join("\n"));
  lines.push(`\n## Advisory & collaboration\n` + advisory.map((a) => `- ${a.title} (${a.org}): ${a.desc}`).join("\n") + "\n" + offerings.map((o) => `- ${o.title}: ${o.desc}`).join("\n"));
  lines.push(`Contact: ${profile.email}, or the site's Contact page (/contact). Keynote and advisory booking requests: /booking. Requests require Harsh's confirmation; no availability or fees are published. Mentorship: https://adplist.org/mentors/harsh-verma`);
  lines.push(`Press kit: /press-kit (bio, photo, speaking topics and PDF). Professional recommendations: /testimonials. ` + testimonials.map(t => `${t.name}, ${t.relationship}: "${t.quote}" Source: ${t.source}`).join("\n") + editorialMentions.map(m => `Editorial introduction (not a client endorsement): ${m.outlet}: "${m.quote}" ${m.source}`).join("\n"));
  return lines.join("\n");
}
