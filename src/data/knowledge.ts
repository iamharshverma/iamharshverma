import { insights, slugify } from "./insights";
import { keynotes, media } from "./media";
import { books } from "./books";
import { research } from "./profile";
import { researchPillars } from "./research-pillars";
import { caseStudies } from "./case-studies";
import { contentImage } from "./content-images";
import { resourceImages } from "./resource-images";
import { publications } from "./publications";
import { knowledgeImages } from "./knowledge-images";

export const knowledgeTopics = [
  "Agentic AI",
  "AI security",
  "Agent trust",
  "Autonomous defense",
  "Distributed systems",
  "AI engineering",
] as const;
export type KnowledgeItem = {
  id: string;
  slug: string;
  kind: string;
  title: string;
  summary: string;
  topics: string[];
  technology: string[];
  publisher: string;
  year: number | null;
  source: string;
  image?: string;
};
export const topicsFor = (text: string): string[] => {
  const t = text.toLowerCase();
  const rules: [string, RegExp][] = [
    ["Agentic AI", /agent|orchestrat|autonom/],
    ["AI security", /secur|govern|permission|identity|cyber/],
    ["Agent trust", /trust|reputation|evidence|accountab/],
    ["Autonomous defense", /defen|counteroff|incident|threat|self-healing/],
    ["Distributed systems", /distribut|hash|concurr|data orchestrat|hadoop/],
    ["AI engineering", /engineer|evaluation|machine learning|token|stem|vision|physical ai|production gap|reliab/],
  ];
  return rules.filter(([, pattern]) => pattern.test(t)).map(([topic]) => topic);
};
export const resources = [
  {
    slug: "professional-biographies",
    image: resourceImages["professional-biographies"],
    title: "Professional biographies",
    summary: "50-, 100- and 250-word biographies for conference organizers and media.",
    href: "/downloads/harsh-verma-biographies.txt",
    format: "Text",
    topic: "AI engineering",
  },
  {
    slug: "press-kit",
    image: resourceImages["press-kit"],
    title: "Press kit",
    summary: "Professional biography, speaking themes and official contact details.",
    href: "/downloads/harsh-verma-press-kit.pdf",
    format: "PDF",
    topic: "AI engineering",
  },
  {
    slug: "media-kit",
    image: resourceImages["media-kit"],
    title: "Media kit",
    summary: "Biography variants and interview topics for journalists and podcast hosts.",
    href: "/downloads/harsh-verma-media-kit.pdf",
    format: "PDF",
    topic: "AI engineering",
  },
  {
    slug: "speaker-bio",
    image: resourceImages["speaker-bio"],
    title: "Speaker biography",
    summary: "Speaker introduction and professional background for event organizers.",
    href: "/downloads/harsh-verma-speaker-bio.pdf",
    format: "PDF",
    topic: "Agentic AI",
  },
];
export const knowledge: KnowledgeItem[] = [
  ...insights.map((a) => ({
    id: `article:${a.slug}`,
    slug: a.slug,
    kind: "Article",
    title: a.title,
    summary: a.excerpt,
    publisher: a.pub,
    year: Number(a.date.match(/20\d{2}/)?.[0]) || null,
    source: a.href,
    image: a.img,
    topics: topicsFor(a.title + " " + a.topic + " " + a.excerpt),
    technology: [],
  })),
  ...researchPillars.map((p) => ({
    id: `research:${p.slug}`,
    slug: p.slug,
    kind: "Research",
    title: p.title,
    summary: p.summary,
    image: p.image,
    topics: topicsFor(p.title + p.summary),
    technology: [],
    publisher: "Personal technical perspective",
    year: null,
    source: "",
  })),
  ...caseStudies.map((c) => ({
    id: `case:${c.slug}`,
    slug: c.slug,
    kind: "Case study",
    title: c.title,
    summary: c.summary,
    image: c.image,
    topics: topicsFor(c.title + c.topic),
    technology: [c.technology],
    publisher: c.reviewBasis === "portfolio" ? "Public portfolio project" : "Public source review",
    year: c.year,
    source: c.source,
  })),
  ...books.map((b) => ({
    id: `book:${b.slug}`,
    slug: b.slug,
    kind: "Book",
    title: b.title,
    summary: b.pitch,
    topics: topicsFor(b.title + b.pitch),
    technology: [],
    publisher: "Harsh Verma",
    year: 2027,
    source: b.site,
    image: b.cover,
  })),
  ...keynotes.map((k) => ({
    id: `talk:${slugify(k.title)}`,
    slug: slugify(k.title),
    kind: "Keynote",
    title: k.title,
    summary: k.desc,
    topics: topicsFor(k.title + k.desc),
    technology: [],
    publisher: k.venue,
    year: null,
    source: k.href,
    image: k.img,
  })),
  ...media
    .filter((m) => m.href && m.group !== "Keynotes & Talks")
    .map((m) => ({
      id: `media:${slugify(m.title)}`,
      slug: slugify(m.title),
      kind: "Media",
      title: m.title,
      summary: m.quote,
      topics: topicsFor(m.title + m.quote),
      technology: [],
      publisher: m.outlet,
      year: m.year,
      source: m.href ?? "",
      image: m.img,
    })),
  ...research
    .filter((r) => r.kind !== "Book")
    .map((r, i) => ({
      id: `work:${i}`,
      slug: slugify(r.title),
      kind:
        r.kind === "Paper"
          ? r.title === "Publication bibliography"
            ? "Resource"
            : "Publication"
          : r.kind,
      title: r.title,
      summary: r.desc + " " + r.meta,
      topics: topicsFor(r.title + r.desc),
      technology: [],
      publisher: r.meta,
      year: r.year,
      source: r.href ?? "",
    })).filter(item => item.title !== "IEEE CogML 2019 — Secure real-time streaming with deep learning"),
  ...publications.map(p => ({ id: `publication:${p.slug}`, slug: p.slug, kind: "Publication", title: p.title, summary: `${p.status} · ${p.abstract}`, topics: p.topics, technology: [], publisher: p.publisher, year: p.year, source: p.source, image: p.image })),
  ...resources.map((r) => ({
    id: `resource:${r.slug}`,
    slug: r.slug,
    kind: "Download",
    title: r.title,
    summary: r.summary,
    image: r.image,
    topics: [r.topic],
    technology: [],
    publisher: "Harsh Verma",
    year: null,
    source: r.href,
  })),
].map((item) => ({ ...item, image: knowledgeImages[item.title] ?? contentImage(item.title, item.kind, "image" in item ? item.image : undefined) }));
export type KnowledgeFilters = {
  resource?: string;
  q?: string;
  kind?: string;
  topic?: string;
  publisher?: string;
  technology?: string;
  year?: string;
};
export function filterKnowledge(items: KnowledgeItem[], filters: KnowledgeFilters) {
  const words = (filters.q ?? "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  return items.filter(
    (item) =>
      words.every((word) =>
        [item.title, item.summary, item.publisher, ...item.topics, ...item.technology]
          .join(" ")
          .toLowerCase()
          .includes(word),
      ) &&
      (!filters.kind || item.kind === filters.kind) &&
      (!filters.topic || item.topics.includes(filters.topic)) &&
      (!filters.publisher || item.publisher === filters.publisher) &&
      (!filters.technology || item.technology.includes(filters.technology)) &&
      (!filters.year || String(item.year) === filters.year),
  );
}
export function relatedKnowledge(topics: string[], excludedId = "", limit = 6) {
  const ranked = knowledge
    .filter((item) => item.id !== excludedId && item.topics.some((topic) => topics.includes(topic)))
    .map((item) => ({ item, score: item.topics.filter((topic) => topics.includes(topic)).length }))
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
  const selected: KnowledgeItem[] = [];
  const kinds = new Set<string>();
  for (const item of ranked)
    if (!kinds.has(item.kind)) {
      selected.push(item);
      kinds.add(item.kind);
    }
  return [...selected, ...ranked.filter((item) => !selected.includes(item))].slice(0, limit);
}
