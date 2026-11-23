import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { radarEntries, impactTopicTags } from "@/data/knowledge-impact";
import { radarRelatedWork } from "@/routes/radar.$slug";
import { getRadarSector, radarSectors } from "@/data/radar-sectors";

describe("radar technology pages", () => {
  it("Agentic Systems includes all five technologies in its arc", () => {
    expect(getRadarSector("agentic-systems")?.entries.map((entry) => entry.title)).toEqual([
      "Multi-Agent Orchestration", "Agent Communication", "Agent Memory", "Tool-Using Agents", "Agent Evaluation",
    ]);
  });

  it("all five arc topics include their entire technology inventory and details exactly once", () => {
    expect(radarSectors.map((sector) => sector.title)).toEqual(["Agentic Systems", "AI Security", "Enterprise AI", "AI Engineering", "Responsible AI"]);
    expect(radarSectors.flatMap((sector) => sector.entries.map((entry) => entry.id)).sort()).toEqual(radarEntries.map((entry) => entry.id).sort());
    for (const sector of radarSectors) {
      expect(sector.entries.map((entry) => entry.id)).toEqual(radarEntries.filter((entry) => entry.sector === sector.title).map((entry) => entry.id));
      for (const entry of sector.entries) {
        for (const detail of [entry.rationale, entry.implication, entry.security, entry.opportunity, entry.challenge]) expect(detail.length, entry.id).toBeGreaterThan(0);
      }
    }
    expect(getRadarSector("unknown-topic")).toBeUndefined();
  });

  it("every radar arc topic page is in the sitemap", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    for (const sector of radarSectors) expect(sitemap).toContain(`https://www.iamharshverma.com/radar/topics/${sector.id}`);
  });
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
