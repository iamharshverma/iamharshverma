import { describe, expect, it } from "vitest";
import { radarMarkerState } from "@/components/impact/radar-selection";
import { radarEntries } from "@/data/knowledge-impact";

describe("radar visual selection", () => {
  it("defaults to all 29 nodes blinking without a selected arc or technology", () => {
    expect(radarEntries).toHaveLength(29);
    for (const entry of radarEntries) expect(radarMarkerState("", "", entry)).toEqual({ active:false, focused:false, blinking:true, radius:7 });
  });
  it("enlarges and blinks only the technologies of a selected arc", () => {
    for (const entry of radarEntries) {
      const state = radarMarkerState("AI Security", "", entry);
      expect(state.blinking).toBe(entry.sector === "AI Security");
      expect(state.radius).toBe(entry.sector === "AI Security" ? 11 : 7);
    }
  });
  it("enlarges and blinks only the selected technology", () => {
    const entry = radarEntries[0];
    if (!entry) throw new Error("Technology inventory missing");
    for (const candidate of radarEntries) {
      const state = radarMarkerState(entry.sector, entry.id, candidate);
      expect(state.blinking).toBe(candidate.id === entry.id);
      expect(state.radius).toBe(candidate.id === entry.id ? 14 : 7);
    }
  });
});