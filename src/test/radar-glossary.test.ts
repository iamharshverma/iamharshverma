import { describe, expect, it } from "vitest";
import { radarEntries } from "@/data/knowledge-impact";
import { radarSectors } from "@/data/radar-sectors";
import { filterRadarGlossary, radarGlossary } from "@/data/radar-glossary";

describe("linked radar glossary", () => {
  it("covers every radar technology with valid topic and technology destinations", () => {
    const terms = new Set(radarGlossary.map(term => term.id));
    expect(terms.size).toBe(radarGlossary.length);
    for (const entry of radarEntries) expect(terms.has(entry.id), entry.id).toBe(true);
    for (const term of radarGlossary) {
      expect(radarSectors.some(sector => sector.id === term.sectorId), term.id).toBe(true);
      expect(term.technologyIds.length).toBeGreaterThan(0);
      for (const id of term.technologyIds) expect(radarEntries.some(entry => entry.id === id), id).toBe(true);
    }
  });

  it("filters by topic without losing any of its technology terms", () => {
    const terms = filterRadarGlossary("", "enterprise-ai");
    expect(terms.every(term => term.sectorId === "enterprise-ai")).toBe(true);
    for (const entry of radarEntries.filter(item => item.sector === "Enterprise AI")) {
      expect(terms.some(term => term.id === entry.id), entry.id).toBe(true);
    }
  });

  it("finds the RAG acronym and expanded term and handles an empty result", () => {
    expect(filterRadarGlossary("retrieval-augmented generation", "").some(term => term.id === "rag")).toBe(true);
    expect(filterRadarGlossary("  RAG  ", "enterprise-ai").some(term => term.id === "rag")).toBe(true);
    expect(filterRadarGlossary("no-such-technical-term-xyz", "")).toEqual([]);
    expect(filterRadarGlossary("", "")).toHaveLength(radarGlossary.length);
  });
});