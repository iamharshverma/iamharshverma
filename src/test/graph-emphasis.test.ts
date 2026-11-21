import { describe, it, expect } from "vitest";
import { knowledge } from "@/data/knowledge";
import { networkTopics, networkResources } from "@/data/knowledge-network";
import { illustrativeGraphWeights, graphVisualWeight } from "@/data/graph-emphasis";
import { impactCardDimensions } from "@/lib/knowledge-detail-view";
import { workImpact } from "@/data/work-impact";

describe("Illustrative graph emphasis", () => {
  it("highlights at least three real entries in every topic", () => {
    for (const topic of networkTopics) {
      const entries = networkResources(topic.id);
      expect(entries.filter(item => graphVisualWeight(item.id) > 0).length).toBeGreaterThanOrEqual(Math.min(3, entries.length));
    }
  });
  it("keeps visual weights stable across reloads and inventory ordering", () => {
    expect(illustrativeGraphWeights([...knowledge].reverse())).toEqual(illustrativeGraphWeights());
  });
  it("uses the same visual weight to enlarge cards without fabricating impact", () => {
    for (const [id, weight] of illustrativeGraphWeights()) {
      expect([50, 70, 90]).toContain(weight);
      expect(impactCardDimensions(weight).width).toBeGreaterThan(230);
      expect(workImpact(id).score).toBeNull();
    }
  });
});