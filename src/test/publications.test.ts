import { describe, expect, it } from "vitest";
import { publications, filterPublications, publicationCitation } from "@/data/publications";
import { knowledge } from "@/data/knowledge";
import { impactTopics } from "@/data/knowledge-impact";
import { connectedWork } from "@/data/knowledge-network";
import { publicationByNode, publicationPresentation } from '@/lib/publication-presentation';

describe("Source-linked publication archive", () => {
  it('provides the selected paper and publisher URLs without using the conflicting DOI', () => {
    const p = publicationByNode('publication:designing-self-healing-ai-agentic-systems-a-framework-for-autonomous-detection-and-response');
    if (!p) throw new Error('Missing selected paper');
    expect(publicationPresentation(p).publisherUrl).toBe('https://ijsrm.net');
    expect(publicationPresentation(p).paperUrl).toBe('https://ijsrm.net/index.php/ijsrm/article/view/6868');
  });
  it('keeps unavailable evidence unknown, and does not link unpublished work as a published paper', () => {
    for (const p of publications) {
      const display = publicationPresentation(p);
      expect(display.citations).toBeNull();
      expect(display.factor).toBeNull();
      expect(display.emphasis).toBe('unknown');
      expect(display.paperUrl).toBe(p.status === 'Published' ? p.source : null);
    }
  });
  it('uses sourced citations and journal factors for emphasis while retaining journal identity', () => {
    const p = publications.find(p => p.number === 14);
    if (!p) throw new Error('Missing paper');
    const measured = publicationPresentation(p, { citations: { value: 100, source: 'https://openalex.org', checked: '2026-11-21' } });
    expect(measured.emphasis).toBe('high');
    expect(measured.citations?.value).toBe(100);
    expect(measured.color).toBe(publicationPresentation(p).color);
    expect(publicationPresentation(p, { journalImpactFactor: { value: 5, year: 2025, source: 'https://clarivate.com' } }).emphasis).toBe('high');
  });
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