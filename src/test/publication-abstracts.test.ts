import { describe, expect, it } from "vitest";
import { publications } from "@/data/publications";
import { connectedWork } from "@/data/knowledge-network";

describe("publication abstracts and linked work", () => {
  it("gives every record a full abstract with a disclosed source", () => {
    expect(publications).toHaveLength(27);
    for (const p of publications) {
      expect(p.abstract.length).toBeGreaterThan(150);
      expect(["publisher", "archive"]).toContain(p.abstractSource);
    }
  });

  it("carries the 18 abstracts recovered from publisher records", () => {
    expect(publications.filter(p => p.abstractSource === "publisher")).toHaveLength(18);
  });

  it("keeps topic tags and at least one linked work for every paper", () => {
    for (const p of publications) {
      expect(p.topics.length).toBeGreaterThan(0);
      expect(connectedWork(`publication:${p.slug}`).length).toBeGreaterThan(0);
    }
  });
});
