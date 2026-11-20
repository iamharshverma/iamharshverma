import { describe, expect, it } from "vitest";
import { researchScrollZoom } from "@/lib/research-motion";

describe("Research scroll-driven fabric zoom", () => {
  it("starts as a compact bubble before scrolling", () => {
    expect(researchScrollZoom(-100, 360)).toBe(.62);
    expect(researchScrollZoom(0, 360)).toBe(.62);
  });
  it("zooms proportionally as the visitor scrolls through the section", () => {
    expect(researchScrollZoom(180, 360)).toBe(1.26);
    expect(researchScrollZoom(140, 280)).toBe(1.26);
  });
  it("caps zoom and handles a section not yet measured", () => {
    expect(researchScrollZoom(360, 360)).toBeCloseTo(1.9);
    expect(researchScrollZoom(5000, 360)).toBeCloseTo(1.9);
    expect(researchScrollZoom(100, 0)).toBe(.62);
  });
});