import { describe, expect, it } from "vitest";
import { forbesArticles, hackerNoonArticles } from "@/data/publisher-articles";
import { findInsight } from "@/data/insights";
import { rsacArticles } from "@/data/rsac";
import { publisherCollectionJsonLd, SITE_URL } from "@/lib/seo";

describe("Publisher article collections", () => {
  it.each([
    { path: "/forbes", name: "Forbes", articles: forbesArticles, count: 7 },
    { path: "/hackernoon", name: "HackerNoon", articles: hackerNoonArticles, count: 12 },
    { path: "/rsac", name: "RSAC", articles: rsacArticles, count: 4 },
  ])("describes the real $name articles with local URLs and original sources", ({ path, name, articles, count }) => {
    const schema = publisherCollectionJsonLd(path, name, "AI and cybersecurity articles", articles);
    expect(schema.url).toBe(`${SITE_URL}${path}`);
    expect(schema.mainEntity.numberOfItems).toBe(count);
    expect(schema.mainEntity.itemListElement).toHaveLength(count);
    for (const [index, entry] of schema.mainEntity.itemListElement.entries()) {
      const article = articles[index];
      if (!article) throw new Error("Missing source article");
      expect(entry.position).toBe(index + 1);
      expect(entry.item.url).toBe(`${SITE_URL}/insights/${article.slug}`);
      expect(entry.item.sameAs).toBe(article.href);
      expect(entry.item.author["@id"]).toBe(`${SITE_URL}/#person`);
    }
  });

  it("includes all seven existing Forbes articles and no other publishers", () => {
    expect(forbesArticles).toHaveLength(7);
    for (const article of forbesArticles) {
      expect(article.pub).toBe("Forbes Council");
      expect(new URL(article.href).hostname).toBe("www.forbes.com");
      expect(findInsight(article.slug)).toBe(article);
    }
    expect(forbesArticles[0]?.title).toBe("Physical AI Is Coming: When AI Stops Generating Content And Starts Acting On The World");
  });

  it("includes all twelve existing HackerNoon articles and interview", () => {
    expect(hackerNoonArticles).toHaveLength(12);
    for (const article of hackerNoonArticles) {
      expect(article.pub).toBe("HackerNoon");
      expect(new URL(article.href).hostname).toBe("hackernoon.com");
      expect(findInsight(article.slug)).toBe(article);
    }
    expect(hackerNoonArticles.some(article => article.href.endsWith("the-production-gap-your-ai-model-isnt-as-reliable-as-you-think-interview"))).toBe(true);
  });
});
