import { describe, expect, it } from "vitest";
import { graphEdgeFlows } from "@/lib/graph-edge-motion";

describe("Directional graph connections", () => {
  it("animates highlighted bigger entries, not ordinary or unselected entries", () => {
    expect(graphEdgeFlows({ spoke: false, dimmed: false, highlighted: true, standout: true })).toBe(true);
    expect(graphEdgeFlows({ spoke: false, dimmed: false, highlighted: true, standout: false })).toBe(false);
    expect(graphEdgeFlows({ spoke: false, dimmed: false, highlighted: false, standout: true })).toBe(false);
  });
  it("animates HV topic connections but never dimmed connections", () => {
    expect(graphEdgeFlows({ spoke: true, dimmed: false, highlighted: false, standout: false })).toBe(true);
    expect(graphEdgeFlows({ spoke: true, dimmed: true, highlighted: true, standout: true })).toBe(false);
  });
});