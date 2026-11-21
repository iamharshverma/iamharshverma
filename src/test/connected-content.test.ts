import { describe, expect, it } from "vitest";
import { researchPillars } from "@/data/research-pillars";
import { caseStudies } from "@/data/case-studies";
import { knowledge, resources } from "@/data/knowledge";
import { research, researchFocus } from "@/data/profile";
import { ownerReportedSpeakingMetrics } from "@/data/metrics";

describe("Connected portfolio content", () => {
  it("adds a plus to every retained Speaking career counter", () => {
    expect(ownerReportedSpeakingMetrics.map(m => `${m.v}${m.suffix}`)).toEqual(["43+", "10+", "21+", "6+"]);
  });
  it("provides six distinct topic illustrations and distinct archive covers", () => {
    expect(researchFocus).toHaveLength(6);
    expect(new Set(researchFocus.map(f => f.image)).size).toBe(6);
    const otherResearchImages = new Set([...research.map(r => r.img), ...researchPillars.map(p => p.image), ...knowledge.filter(k => k.kind === "Article").map(k => k.image)]);
    expect(researchFocus.some(f => otherResearchImages.has(f.image))).toBe(false);
    expect(new Set(research.map(r => r.img)).size).toBe(research.length);
  });
  it("provides six distinct, populated research destinations", () => {
    expect(researchPillars).toHaveLength(6);
    expect(new Set(researchPillars.map(p => p.image)).size).toBe(6);
    for (const p of researchPillars) {
      expect(knowledge.find(k => k.id === `research:${p.slug}`)?.image).toBe(p.image);
      expect(p.concepts.length).toBeGreaterThanOrEqual(3);
      expect(p.scenarios.length).toBeGreaterThanOrEqual(2);
      expect(p.sources.length).toBeGreaterThan(0);
    }
  });
  it("includes all thirteen portfolio projects without duplicating existing source reviews", () => {
    expect(caseStudies).toHaveLength(13);
    expect(new Set(caseStudies.map(p => p.slug)).size).toBe(13);
    expect(new Set(caseStudies.map(p => p.image)).size).toBe(13);
    expect(caseStudies.find(p => p.slug === "java-hash-table")?.title).toBe("A Custom Java Hash Table");
    expect(caseStudies.find(p => p.slug === "tokenization-porter-stemming")?.sections.some(s => s.text.includes("does not implement an inverted index"))).toBe(true);
  });
  it("distinguishes owner-described projects from verified source reviews", () => {
    expect(caseStudies.filter(p => p.reviewBasis === "portfolio")).toHaveLength(11);
    expect(caseStudies.filter(p => p.reviewBasis === "portfolio").every(p => p.year === null)).toBe(true);
    expect(knowledge.find(k => k.slug === "cnn-image-classifier")?.publisher).toBe("Public portfolio project");
  });
  it("gives each downloadable resource its own artwork", () => {
    expect(resources).toHaveLength(4);
    expect(new Set(resources.map(r => r.image)).size).toBe(4);
    for (const r of resources) expect(knowledge.find(k => k.id === `resource:${r.slug}`)?.image).toBe(r.image);
  });
});