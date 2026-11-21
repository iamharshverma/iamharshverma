import { describe, expect, it } from "vitest";
import { knowledge } from "@/data/knowledge";
import { insights } from "@/data/insights";

describe("Knowledge Hub artwork", () => {
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