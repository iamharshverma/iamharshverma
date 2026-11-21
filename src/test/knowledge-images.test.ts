import { describe, expect, it } from "vitest";
import { knowledge } from "@/data/knowledge";
import { insights } from "@/data/insights";
import { knowledgeDomainArt } from "@/data/knowledge-domain-art";
import { impactTopics } from "@/data/knowledge-impact";

describe("Knowledge Hub artwork", () => {
  it("gives all eight Impact domains distinct artwork, separate from resource thumbnails", () => {
    const images = impactTopics.map(topic => knowledgeDomainArt[topic.id]);
    expect(images).toHaveLength(8);
    expect(images.every(Boolean)).toBe(true);
    expect(new Set(images).size).toBe(8);
    const resourceImages = new Set(knowledge.map(item => item.image));
    for (const image of images) expect(resourceImages.has(image)).toBe(false);
  });
  it("gives every entry its own distinct thumbnail", () => {
    expect(knowledge.every(item => Boolean(item.image))).toBe(true);
    expect(new Set(knowledge.map(item => item.image)).size).toBe(knowledge.length);
  });

  it("retains the actual Google Agents for Impact event cover", () => {
    const article = insights.find(item => item.title.includes("Judging Google Cloud"));
    expect(article).toBeDefined();
    const card = knowledge.find(item => item.id === `article:${article?.slug}`);
    expect(card?.image).toBe(article?.img);
  });
});