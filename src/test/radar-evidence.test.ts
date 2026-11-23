import { describe, expect, it } from "vitest";
import { radarEntries } from "@/data/knowledge-impact";
import { radarSectors } from "@/data/radar-sectors";
import { radarGlossary } from "@/data/radar-glossary";
import { glossaryCitations, radarSources, radarTechnologyEvidence, radarTopicEvidence, technologyCitations, topicCitations } from "@/data/radar-evidence";

describe("primary-source coverage for radar explanations", () => {
  it("provides resolvable citations for every technology, with no invented inventory", () => {
    expect(Object.keys(radarTechnologyEvidence).sort()).toEqual(radarEntries.map(entry => entry.id).sort());
    for (const entry of radarEntries) {
      const citations = technologyCitations(entry.id);
      expect(citations.length, entry.id).toBeGreaterThan(0);
      expect(citations.length).toBe(radarTechnologyEvidence[entry.id]?.length);
      for (const citation of citations) expect(radarSources[citation.source.id]).toBe(citation.source);
    }
  });

  it("covers every topic and supporting glossary term", () => {
    expect(Object.keys(radarTopicEvidence).sort()).toEqual(radarSectors.map(sector => sector.id).sort());
    for (const sector of radarSectors) expect(topicCitations(sector.id).length, sector.id).toBeGreaterThan(0);
    for (const term of radarGlossary) expect(glossaryCitations(term.id).length, term.id).toBeGreaterThan(0);
  });

  it("keeps sources external, unique and on the verified primary-source hosts", () => {
    const allowed = new Set(["www.anthropic.com", "arxiv.org", "a2a-protocol.org", "modelcontextprotocol.io", "spiffe.io", "www.nist.gov", "csrc.nist.gov", "nvlpubs.nist.gov", "genai.owasp.org", "github.com", "sre.google", "www.w3.org", "www.rfc-editor.org", "opentelemetry.io", "airflow.apache.org"]);
    const sources = Object.values(radarSources);
    expect(new Set(sources.map(source => source.url)).size).toBe(sources.length);
    for (const source of sources) {
      const url = new URL(source.url);
      expect(url.protocol).toBe("https:");
      expect(allowed.has(url.hostname), source.url).toBe(true);
    }
    expect(radarSources["agency"]?.url).toBe("https://genai.owasp.org/llmrisk/llm062025-excessive-agency/");
    expect(radarSources["http"]?.url).toBe("https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2");
    expect(technologyCitations("unknown")).toEqual([]);
  });
});