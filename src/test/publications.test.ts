import { describe, expect, it } from "vitest";
import { publications, filterPublications, publicationCitation } from "@/data/publications";
import { knowledge } from "@/data/knowledge";
import { impactTopics } from "@/data/knowledge-impact";
import { connectedWork } from "@/data/knowledge-network";

describe("Source-linked publication archive", () => {
  it("retains all 27 numbered source records and their original links", () => {
    expect(publications).toHaveLength(27);
    expect(publications.map(p => p.number)).toEqual(Array.from({ length: 27 }, (_, index) => index + 1));
    expect(new Set(publications.map(p => p.slug)).size).toBe(27);
    expect(publications.find(p => p.number === 1)?.source).toBe("https://ieeexplore.ieee.org/document/9014355");
    expect(publications.find(p => p.number === 26)?.pdf).toBe("https://proceedings.raptors.dev/pdf/verma-trusted-ai-autonomous-agents.pdf");
  });
  it("keeps the two in-progress records separate from published papers", () => {
    expect(filterPublications("", "", "Published")).toHaveLength(25);
    expect(filterPublications("", "", "Forthcoming").map(p => p.number)).toEqual([23]);
    expect(filterPublications("", "", "Under peer review").map(p => p.number)).toEqual([27]);
    expect(publications.find(p => p.number === 27)?.manuscript).toBe("Access-2026-52653");
  });
  it("connects every publication to the Hub, Impact and cross-format work", () => {
    for (const p of publications) {
      const record = knowledge.find(item => item.id === `publication:${p.slug}`);
      expect(record?.kind).toBe("Publication");
      expect(record?.source).toBe(p.source);
      expect(impactTopics.some(topic => topic.resources.some(item => item.id === record?.id))).toBe(true);
      expect(connectedWork(`publication:${p.slug}`).length).toBeGreaterThan(0);
    }
    expect(knowledge.filter(item => item.kind === "Publication")).toHaveLength(27);
  });
  it("flags the repeated source DOI and omits it from generated citations", () => {
    const records = publications.filter(p => p.doi === "10.18535/ijsrm/v14i06.ec3");
    expect(records.map(p => p.number)).toEqual([14, 15]);
    for (const p of records) {
      expect(p.citationNote).toBeTruthy();
      expect(publicationCitation(p)).toContain(p.source);
      expect(publicationCitation(p)).not.toContain("https://doi.org/10.18535/ijsrm/v14i06.ec3");
    }
  });
  it("combines title, DOI, year and subject filters", () => {
    expect(filterPublications("10.1109/CogML.2019.9014355").map(p => p.number)).toEqual([1]);
    expect(filterPublications("trust graphs", "AI Security & Trust", "Published", "2026").map(p => p.number)).toEqual([12]);
  });
});