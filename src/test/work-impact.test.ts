import { describe, it, expect } from "vitest";
import { scoreWorkImpact, workImpact, impactSizeTier, type ImpactMetric } from "@/data/work-impact";
import { knowledge } from "@/data/knowledge";

// Synthetic fixtures only, never published as portfolio measurements.
const metric = (value: number): ImpactMetric => ({ value, source: "https://example.org/evidence", observedAt: "2026-11-21" });
describe("Combined evidence impact", () => {
  it("combines all three verified dimensions equally at disclosed benchmarks", () => {
    expect(scoreWorkImpact({ citations: metric(100), audience: metric(10000), adoption: metric(10) })).toMatchObject({ score: 100, coverage: 3 });
  });
  it("does not inflate partial evidence into a complete score", () => {
    expect(scoreWorkImpact({ citations: metric(100) })).toMatchObject({ score: 33, coverage: 1 });
  });
  it("leaves missing evidence unscored rather than zero", () => {
    expect(scoreWorkImpact()).toMatchObject({ score: null, coverage: 0 });
    expect(knowledge.every(item => workImpact(item.id).score === null)).toBe(true);
  });
  it("distinguishes measured zero from unknown", () => {
    expect(scoreWorkImpact({ audience: metric(0) })).toMatchObject({ score: 0, coverage: 1 });
  });
  it("rejects invalid or unsourced counts", () => {
    for (const value of [-1, Infinity, 1.5, NaN]) expect(scoreWorkImpact({ citations: metric(value) }).score).toBeNull();
    expect(scoreWorkImpact({ audience: { ...metric(1000), source: "" } }).score).toBeNull();
    expect(scoreWorkImpact({ adoption: { ...metric(1), observedAt: "" } }).score).toBeNull();
  });
  it("sizes nodes by score instead of connections", () => {
    expect([null, 0, 33, 34, 66, 67, 100].map(impactSizeTier)).toEqual([0, 0, 3, 2, 2, 1, 1]);
  });
});