import { describe, expect, it } from "vitest";
import { knowledge } from "@/data/knowledge";
import { publications } from "@/data/publications";
import { publicationRelatedWork } from "@/data/knowledge-network";

describe("publication graph connections", () => {
  it.each(publications.map(p => [p.slug]))("connects every topic-matched article, paper and research record for %s", slug => {
    const id = `publication:${slug}`;
    const source = knowledge.find(k => k.id === id);
    expect(source).toBeDefined();
    if (!source) return;
    const expected = knowledge.filter(k => k.id !== id && ["Article", "Publication", "Research"].includes(k.kind) && k.topics.some(t => source.topics.includes(t)));
    const actual = publicationRelatedWork(id).map(c => c.item);
    expect(actual.map(k => k.id).sort()).toEqual(expected.map(k => k.id).sort());
    for (const kind of ["Article", "Publication", "Research"]) expect(actual.some(k => k.kind === kind)).toBe(true);
  });
});