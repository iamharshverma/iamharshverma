import { describe, expect, it } from "vitest";
import { insights } from "@/data/insights";
import { articleSeoDescription, articleSeoImage, articleSeoTitle } from "@/lib/article-seo";

describe("blog post SEO", () => {
  it("every title fits 60 chars and names Harsh Verma", () => {
    for (const a of insights) { const t = articleSeoTitle(a); expect(t.length).toBeLessThanOrEqual(60); expect(t).toContain("Harsh Verma"); }
  });
  it("every description fits 160 chars", () => {
    for (const a of insights) expect(articleSeoDescription(a).length).toBeLessThanOrEqual(160);
  });
  it("every share image is absolute https", () => {
    for (const a of insights) expect(articleSeoImage(a)).toMatch(/^https:\/\//);
  });
  it("security posts carry the AI Security keyword", () => {
    const a = insights.find((i) => i.title.startsWith("Security Without Humans"))!;
    expect(articleSeoTitle(a)).toContain("AI Security");
  });
});
