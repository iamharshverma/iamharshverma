import { keynotes, media, type MediaItem } from "./media";
import { mediaImages } from "./media-images";
import { mediaVideos } from "./media-videos";
export const MEDIA_ARCHIVE_PAGE_SIZE = 6;

export const mediaCategories = ["Editorial & Commentary", "Interviews & Podcasts", "Video & Broadcast", "Institutional Features", "Press Releases & Syndicated", "Recognition Coverage", "Others Recognized"] as const;
export type MediaCategory = (typeof mediaCategories)[number];
export type Coverage = {
  id: string; title: string; publisher: string; year: number; date: string;
  category: MediaCategory; contentType: string; topic: string; summary: string;
  image: string; url: string | null; action: string; review: boolean;
  distributions: { publisher: string; url: string }[];
  video: { url: string; title: string } | null; sourceUnavailable: boolean;
};

// Preserve source titles/URLs; host names and explicit source types take precedence over legacy "Tier 1" labels.
export function classifyMedia(item: MediaItem): { category: MediaCategory; contentType: string; review: boolean } {
  const source = `${item.outlet} ${item.cat} ${item.href ?? ""}`;
  if (/press-release|press_release|pr_news|marketersmedia|newsfile|markets\.businessinsider|streetinsider|barchart|newsbreak|finance\.yahoo|global syndicate/i.test(source))
    return { category: "Press Releases & Syndicated", contentType: "Press Release / Syndicated Distribution", review: false };
  if (item.group === "Institutional") return { category: "Institutional Features", contentType: /newsletter/i.test(item.title) ? "Newsletter mention" : /directory|listing/i.test(item.title) ? "Professional directory listing" : "Institutional profile", review: false };
  if (item.group === "Podcasts & Interviews") return { category: "Interviews & Podcasts", contentType: /magazine|hackernoon/i.test(item.outlet) ? "Written interview" : /youtu|xraised/i.test(item.href ?? "") ? "Video interview" : /lifepage/i.test(item.href ?? "") ? "Career interview" : "Podcast / conversation", review: false };
  if (item.group === "Keynotes & Talks") return { category: "Video & Broadcast", contentType: /youtu/i.test(item.href ?? "") ? "Event recording" : "Speaker / event listing", review: !/youtu/i.test(item.href ?? "") };
  if (item.group === "Awards & Honors") return { category: "Recognition Coverage", contentType: /candidate/i.test(item.title) ? "Award candidate listing" : /nominat/i.test(item.title) ? "Nomination announcement" : /directory|winners|honorees/i.test(item.href ?? "") ? "Award organization listing" : "Recognition-related feature", review: false };
  if (item.group === "Press") return { category: "Editorial & Commentary", contentType: "Editorial feature", review: !/editorial|magazine|technical editorial|global profile/i.test(item.cat) };
  return { category: "Others Recognized", contentType: "Other recognized feature", review: true };
}

function sourceImage(item: MediaItem): string {
  const cover = item.href ? mediaImages.get(item.href) : undefined;
  if (cover) return cover;
  const recording = keynotes.find(k => k.href === item.href || (item.href?.includes("youtu") && new URL(k.href).hostname.includes("youtube") && item.href.includes(new URL(k.href).searchParams.get("v") ?? "unmatched")));
  return recording?.img ?? item.img;
}

const legacyCoverage: Coverage[] = media.map((item, index) => ({
  id: `media-${index}`, title: item.title, publisher: item.outlet, year: item.year,
  date: `${item.year}`, ...classifyMedia(item), topic: /security|cyber|identity|defen/i.test(item.title) ? "Cybersecurity & AI Security" : /career|engineer|leadership/i.test(item.title) ? "Engineering & Leadership" : "Artificial Intelligence & Agentic Systems",
  summary: item.quote, image: sourceImage(item), url: item.href,
  action: item.cta ?? "View original source", distributions: [],
  video: item.href ? mediaVideos.get(item.href) ?? null : null,
  sourceUnavailable: item.href === "https://xraised-agent-production.up.railway.app/news/principal-ai-engineer-harsh-verma-expands-peer-reviewed-publication-programme",
}));

/** One archive record per source URL. Explicit variants of the same wire announcement are grouped, not deleted. */
export function groupCoverage(records: readonly Coverage[]): Coverage[] {
  const result: Coverage[] = [];
  for (const record of records) {
    const duplicate = result.find(r => record.url && r.url === record.url);
    if (duplicate) continue;
    const headline = record.title.replace(/^[^:]+:\s*/, "").trim().toLowerCase();
    const announcement = record.category === "Press Releases & Syndicated" ? result.find(r => r.category === record.category && r.title.replace(/^[^:]+:\s*/, "").trim().toLowerCase() === headline) : undefined;
    if (announcement && record.url) {
      announcement.distributions.push({ publisher: record.publisher, url: record.url });
      continue;
    }
    result.push({ ...record, distributions: [...record.distributions] });
  }
  return result;
}

// The live /media archive is the source of truth: do not automatically add Insights articles here.
export const mediaCoverage = groupCoverage(legacyCoverage);
export const featuredCoverage = media.filter(item => item.featured).flatMap(source => mediaCoverage.filter(item => item.url === source.href));
export const mediaYears = [...new Set(mediaCoverage.map(item => item.year))].sort((a, b) => b - a);

export function filterCoverage(records: readonly Coverage[], options: { query: string; category: string; year: string; topic: string; sort: string }) {
  const query = options.query.trim().toLowerCase();
  return records.filter(item => (!options.category || item.category === options.category) && (!options.year || `${item.year}` === options.year) && (!options.topic || item.topic === options.topic) && `${item.title} ${item.publisher} ${item.topic} ${item.summary}`.toLowerCase().includes(query))
    .sort((a, b) => options.sort === "title" ? a.title.localeCompare(b.title) : (options.sort === "oldest" ? 1 : -1) * (a.year - b.year || (Date.parse(a.date) - Date.parse(b.date))));
}

export const mediaImpact = [{ v: 45, s: "+", l: "Media features", d: 0 }, { v: 3.75, s: "B+", l: "Reported syndicated reach", d: 2 }, { v: 14, s: "+", l: "Podcasts & keynotes", d: 0 }, { v: 100, s: "M+", l: "Reported global reach", d: 0 }];