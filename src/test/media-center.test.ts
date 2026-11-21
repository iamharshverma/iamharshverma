import { describe, expect, it } from "vitest";
import { media } from "@/data/media";
import { classifyMedia, filterCoverage, groupCoverage, mediaCoverage, mediaImpact, featuredCoverage, mediaCategories, MEDIA_ARCHIVE_PAGE_SIZE } from "@/data/media-center";
import { mediaEnquirySchema, interviewFormats } from "@/lib/media-enquiry";

describe("Media source organization", () => {
  it("shows archive entries in batches of six", () => {
    expect(MEDIA_ARCHIVE_PAGE_SIZE).toBe(6);
    expect(mediaCoverage.slice(0, MEDIA_ARCHIVE_PAGE_SIZE)).toHaveLength(6);
  });
  it("contains only the 45 entries on the latest live Media page", () => {
    expect(mediaCoverage).toHaveLength(45);
    expect(new Set(mediaCoverage.map(item => item.title))).toEqual(new Set(media.map(item => item.title)));
    expect(mediaCoverage.some(item => item.title === "Security Without Humans: Designing Systems that Defend Themselves")).toBe(false);
  });
  it("retains the original six spotlight selections with BCS first", () => {
    expect(featuredCoverage).toHaveLength(6);
    expect(featuredCoverage[0]?.publisher).toBe("BCS, The Chartered Institute for IT");
    expect(featuredCoverage.map(item => item.url)).toEqual(media.filter(item => item.featured).map(item => item.href));
  });
  it("assigns all 45 entries to exactly one classified section", () => {
    const distributed = mediaCategories.flatMap(category => mediaCoverage.filter(item => item.category === category));
    expect(distributed).toHaveLength(45);
    expect(new Set(distributed.map(item => item.id)).size).toBe(45);
    expect(distributed.map(item => item.id).sort()).toEqual(mediaCoverage.map(item => item.id).sort());
  });
  it("uses Others Recognized when no source category fits", () => {
    const source = media[0];
    if (!source) throw new Error("Missing source");
    expect(classifyMedia({ ...source, group: "Other", cat: "Community feature", outlet: "Community", href: "https://example.com/feature" }).category).toBe("Others Recognized");
  });
  it("gives each of the 45 entries a distinct thumbnail", () => {
    expect(new Set(mediaCoverage.map(item => item.image)).size).toBe(45);
  });
  it("retains every original media URL", () => {
    const urls = new Set(mediaCoverage.flatMap(item => [item.url, ...item.distributions.map(source => source.url)]));
    for (const source of media) expect(urls.has(source.href)).toBe(true);
  });
  it("provides valid direct YouTube destinations for all six original video links", () => {
    const videos = mediaCoverage.filter(item => item.url?.startsWith("https://youtu.be/"));
    expect(videos).toHaveLength(6);
    for (const item of videos) {
      const original = new URL(item.url ?? "https://example.com").pathname.slice(1);
      expect(item.video?.url).toBe(`https://www.youtube.com/watch?v=${original}`);
    }
    expect(mediaCoverage.find(item => item.publisher.startsWith("VLink"))?.video?.url).toBe("https://www.youtube.com/watch?v=nIgJ99Bihsw");
    expect(mediaCoverage.find(item => item.publisher.startsWith("WeAreTwill"))?.video?.url).toBe("https://www.youtube.com/watch?v=yXy_zYlhnfc");
  });
  it("preserves all four counter values, labels and suffixes", () => {
    expect(mediaImpact).toEqual([{ v: 45, s: "+", l: "Media features", d: 0 }, { v: 3.75, s: "B+", l: "Reported syndicated reach", d: 2 }, { v: 14, s: "+", l: "Podcasts & keynotes", d: 0 }, { v: 100, s: "M+", l: "Reported global reach", d: 0 }]);
  });
  it("does not label USA Today press releases as independent editorial coverage", () => {
    const source = media.find(item => item.outlet === "USA Today");
    if (!source) throw new Error("Missing USA Today source");
    expect(classifyMedia(source).category).toBe("Press Releases & Syndicated");
  });
  it("distinguishes written interviews and institutional directories", () => {
    const interview = media.find(item => item.title.startsWith("HackerNoon:"));
    const directory = media.find(item => item.title.startsWith("Google Developer Experts:"));
    if (!interview || !directory) throw new Error("Missing source records");
    expect(classifyMedia(interview).contentType).toBe("Written interview");
    expect(classifyMedia(directory).contentType).toBe("Professional directory listing");
  });
  it("uses one record per source URL", () => {
    const item = mediaCoverage[0];
    if (!item) throw new Error("Empty archive");
    expect(groupCoverage([item, item])).toHaveLength(1);
  });
  it("groups the same wire headline while retaining every distribution URL", () => {
    const item = mediaCoverage.find(record => record.category === "Press Releases & Syndicated");
    if (!item) throw new Error("Missing announcement");
    const grouped = groupCoverage([{ ...item, title: "Newsfile: Original announcement" }, { ...item, id: "other-wire", title: "Yahoo: Original announcement", publisher: "Yahoo Finance", url: "https://example.com/distribution" }]);
    expect(grouped).toHaveLength(1);
    expect(grouped[0]?.distributions).toEqual([{ publisher: "Yahoo Finance", url: "https://example.com/distribution" }]);
  });
  it("filters by publisher, category, topic and year", () => {
    const result = filterCoverage(mediaCoverage, { query: "HackerNoon", category: "Interviews & Podcasts", topic: "Artificial Intelligence & Agentic Systems", year: "2026", sort: "newest" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(item => item.publisher.includes("HackerNoon") && item.year === 2026)).toBe(true);
  });
  it("sorts the archive oldest first", () => {
    const result = filterCoverage(mediaCoverage, { query: "", category: "", topic: "", year: "", sort: "oldest" });
    expect(result[0]?.year).toBe(2018);
  });
});

const request = { name: "Media QA", email: "media-qa@example.com", organization: "Test publication", publication_url: "https://example.com", interview_topic: "Agentic AI security", interview_format: "Podcast", preferred_date: "", message: "A discussion about safe agent deployment.", website: "" };
describe("Interview request validation", () => {
  it("supports the seven requested interview formats", () => {
    expect(interviewFormats).toHaveLength(7);
    for (const interview_format of interviewFormats) expect(mediaEnquirySchema.parse({ ...request, interview_format }).message).toContain(`Interview format: ${interview_format}`);
  });
  it("preserves the brief in the shared contact payload", () => {
    const parsed = mediaEnquirySchema.parse(request);
    expect(parsed.topic).toBe("Media");
    expect(parsed.kind).toBe("contact");
    expect(parsed.message).toContain("Publication website: https://example.com");
    expect(parsed.message).toContain("Interview topic: Agentic AI security");
  });
  it("rejects invalid email and non-web publication URLs", () => {
    expect(mediaEnquirySchema.safeParse({ ...request, email: "invalid" }).success).toBe(false);
    expect(mediaEnquirySchema.safeParse({ ...request, publication_url: "javascript:alert(1)" }).success).toBe(false);
  });
  it("rejects filled spam traps", () => {
    expect(mediaEnquirySchema.safeParse({ ...request, website: "spam" }).success).toBe(false);
  });
});