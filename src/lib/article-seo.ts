import { SITE_URL } from "@/lib/seo";

type SeoInput = { title: string; topic: string; excerpt: string; img: string; pub: string };

const TOPIC_KEYWORDS: Record<string, string[]> = {
  Cybersecurity: ["AI cybersecurity", "AI agent security", "identity security", "zero trust", "threat detection"],
  "Enterprise Security": ["enterprise AI security", "AI agent security", "tool permissions", "human in the loop", "zero trust"],
  "AI Research": ["artificial intelligence", "agentic AI", "AI agents", "AI reliability", "AI governance"],
  Engineering: ["AI engineering", "AI architecture", "multi-agent systems", "software engineering", "AI/ML"],
  Founders: ["agentic AI for founders", "AI strategy", "AI agents", "AI advisory", "AI trust"],
  Interviews: ["AI and cybersecurity", "AI engineer interview", "principal AI engineer", "AI leadership"],
};
const SECURITY_HINT = /secur|attack|identity|threat|authenticat|insider|trust|privacy|perimeter|defend/i;

export const articleKeywords = (a: SeoInput) => {
  const base = TOPIC_KEYWORDS[a.topic] ?? TOPIC_KEYWORDS["AI Research"]!;
  const extra = SECURITY_HINT.test(a.title) && a.topic !== "Cybersecurity" ? ["AI cybersecurity"] : [];
  return [...new Set([...base, ...extra, "Harsh Verma"])];
};

const clip = (s: string, n: number) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)).replace(/[\s,:;–—-]+$/, "") + "…");

/** Search title kept within ~60 chars: main headline + primary keyword + name. */
export const articleSeoTitle = (a: SeoInput) => {
  const head = (a.title.split(/[:(\[]/)[0] ?? a.title).trim();
  const kw = SECURITY_HINT.test(a.title) || /secur/i.test(a.topic) ? "AI Security" : a.topic === "Engineering" ? "AI Engineering" : "AI";
  const suffix = ` | ${kw} — Harsh Verma`;
  return clip(head, 60 - suffix.length) + suffix;
};

/** Meta description kept within 160 chars, naming the topic keyword and author. */
export const articleSeoDescription = (a: SeoInput) => {
  const k = articleKeywords(a)[0] ?? "AI";
  const lead = `${k.charAt(0).toUpperCase()}${k.slice(1)} insight by Harsh Verma: `;
  return clip(lead + a.excerpt.replace(/\s+/g, " ").trim(), 160);
};

/** Absolute share image; bundled/mirrored paths are resolved against the site URL. */
export const articleSeoImage = (a: SeoInput) => (a.img.startsWith("http") ? a.img : `${SITE_URL}${a.img.startsWith("/") ? "" : "/"}${a.img}`);
