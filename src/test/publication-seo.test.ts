import { describe, expect, it } from "vitest";
import { publications } from "@/data/publications";
import { publicationJsonLd, publicationHead } from "@/lib/publication-seo";
import { sourcePublicationDate } from "@/lib/seo";

describe("Source-faithful publication discovery", () => {
  it("keeps forthcoming record 23 out of published-paper metadata", () => {
    const p = publications.find(p => p.number === 23);
    if (!p) throw new Error("Missing record 23");
    const data = publicationJsonLd(p);
    expect(data["@type"]).toBe("CreativeWork");
    expect(data.creativeWorkStatus).toBe("Forthcoming");
    expect(data).not.toHaveProperty("datePublished");
    expect(publicationHead(p).meta.some(meta => "name" in meta && meta.name === "citation_doi")).toBe(false);
  });
  it("keeps peer-review record 27 distinct from published work", () => {
    const p = publications.find(p => p.number === 27);
    if (!p) throw new Error("Missing record 27");
    expect(publicationJsonLd(p)["@type"]).toBe("CreativeWork");
    expect(publicationJsonLd(p).creativeWorkStatus).toBe("Under peer review");
  });
  it("never publishes the known conflicting DOI for records 14 and 15", () => {
    for (const number of [14, 15]) {
      const p = publications.find(p => p.number === number);
      if (!p) throw new Error("Missing conflicting DOI record");
      expect(publicationJsonLd(p)).not.toHaveProperty("identifier");
      expect(publicationHead(p).meta.some(meta => "name" in meta && meta.name === "citation_doi")).toBe(false);
      expect(publicationJsonLd(p)).toHaveProperty("sameAs", p.source);
    }
  });
  it("preserves the first paper's DOI and complete source abstract", () => {
    const p = publications.find(p => p.number === 1);
    if (!p) throw new Error("Missing IEEE paper");
    expect(publicationJsonLd(p).identifier?.value).toBe("10.1109/CogML.2019.9014355");
    expect(publicationJsonLd(p).abstract).toBe(p.abstract);
    expect(publicationJsonLd(p)).not.toHaveProperty("datePublished");
  });
  it("does not invent a publication day from year/month-only sources", () => {
    expect(sourcePublicationDate("2019")).toBeUndefined();
    expect(sourcePublicationDate("September 2026")).toBeUndefined();
    expect(sourcePublicationDate("Oct 13, 2026")).toBe("2026-10-13");
    expect(sourcePublicationDate("2026-11-12")).toBe("2026-11-12");
  });
});