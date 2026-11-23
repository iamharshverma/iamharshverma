import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { radarEntries, impactTopicTags } from "@/data/knowledge-impact";
import { radarRelatedWork } from "@/routes/radar.$slug";

describe("radar technology pages", () => {
  it("every radar entry has a unique page slug", () => {
    const ids = radarEntries.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it("every radar entry maps to at least one portfolio knowledge topic", () => {
    for (const entry of radarEntries) {
      const tags = [entry.topic, ...entry.relatedTopics].flatMap(
        (id) => impactTopicTags[id] ?? [],
      );
      expect(tags.length, entry.id).toBeGreaterThan(0);
    }
  });

  it("every radar entry has related papers, articles or research for its page", () => {
    for (const entry of radarEntries) {
      expect(radarRelatedWork(entry.id).length, entry.id).toBeGreaterThan(0);
    }
  });

  it("every radar entry page is in the sitemap", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    for (const entry of radarEntries) {
      expect(sitemap, entry.id).toContain(
        `https://www.iamharshverma.com/radar/${entry.id}`,
      );
    }
  });
});
