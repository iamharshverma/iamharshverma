import { describe, expect, it } from "vitest";
import { radarEntries } from "@/data/knowledge-impact";
import { radarSectors } from "@/data/radar-sectors";
import { radarTechnologyGuides, radarTopicArtwork, relatedRadarTechnologies } from "@/data/radar-technology-guide";
import { radarTechnologyArtwork } from "@/data/radar-technology-artwork";
import { radarGuideImage } from "@/data/radar-guide";

describe("complete educational radar guides", () => {
  it("covers all 29 technologies without inventing inventory entries", () => {
    expect(radarEntries).toHaveLength(29);
    expect(Object.keys(radarTechnologyGuides).sort()).toEqual(radarEntries.map(entry => entry.id).sort());
    expect(new Set(Object.values(radarTechnologyGuides).map(brief => brief.definition)).size).toBe(29);
    for (const entry of radarEntries) {
      const brief = radarTechnologyGuides[entry.id];
      expect(brief, entry.id).toBeDefined();
      if (!brief) throw new Error(`Missing ${entry.id}`);
      expect(brief.stages).toHaveLength(3);
      expect(brief.checks).toHaveLength(3);
      expect(relatedRadarTechnologies(entry.id)).toHaveLength(3);
      expect(relatedRadarTechnologies(entry.id).every(item => item.id !== entry.id)).toBe(true);
    }
  });

  it("gives each of the five topics a separate illustration", () => {
    expect(Object.keys(radarTopicArtwork).sort()).toEqual(radarSectors.map(sector => sector.id).sort());
    expect(new Set(Object.values(radarTopicArtwork).map(art => art.url)).size).toBe(5);
  });
  it("gives all 29 technologies unique artwork distinct from topics and the overview", () => {
    expect(Object.keys(radarTechnologyArtwork).sort()).toEqual(radarEntries.map(entry => entry.id).sort());
    const urls = [...Object.values(radarTechnologyArtwork), ...Object.values(radarTopicArtwork)].map(art => art.url);
    expect(new Set([...urls, radarGuideImage]).size).toBe(35);
  });

  it("educational enrichment does not assign an adoption rating", () => {
    for (const entry of radarEntries) {
      expect(entry.assessed).toBe(false);
      expect(entry.ring).toBe("UNASSESSED");
    }
  });
});