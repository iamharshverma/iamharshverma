import { describe, expect, it } from "vitest";
import { ideaQuotes } from "@/data/ideas";
import { pickIdeaQuote } from "@/lib/idea-quotes";

describe("idea bulb quotes", () => {
  it("every entry carries a line, an author and a theme", () => {
    expect(ideaQuotes.length).toBeGreaterThan(4);
    for (const q of ideaQuotes) {
      expect(q.quote.trim().length).toBeGreaterThan(10);
      expect(q.author.trim().length).toBeGreaterThan(1);
      expect(q.topic.trim().length).toBeGreaterThan(1);
    }
  });

  it("returns an index that exists in the list", () => {
    for (let i = 0; i < 50; i++) {
      const n = pickIdeaQuote();
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThan(ideaQuotes.length);
    }
  });

  it("never repeats the quote just shown", () => {
    for (let i = 0; i < 50; i++) {
      expect(pickIdeaQuote(3, 12)).not.toBe(3);
    }
  });

  it("still answers when only one quote exists", () => {
    expect(pickIdeaQuote(0, 1)).toBe(0);
  });
});
