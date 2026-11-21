import { describe, expect, it } from "vitest";
import { detailPresentation, impactCardDimensions, paneFocusNodeIds } from "@/lib/knowledge-detail-view";

describe("Detail View presentations", () => {
  it("keeps unscored cards at base size and enlarges measured impact cards", () => {
    expect(impactCardDimensions(null)).toEqual({ width: 230, height: 82 });
    expect(impactCardDimensions(100)).toEqual({ width: 290, height: 104 });
    expect(impactCardDimensions(50)).toEqual({ width: 260, height: 93 });
  });
  it("opens node details exclusively inside the selected node", () => {
    expect(detailPresentation("nodes", true, true)).toEqual({ inline: false, popup: true });
  });
  it("opens Card View details exclusively in the popup", () => {
    expect(detailPresentation("cards", true, true)).toEqual({ inline: false, popup: true });
  });
  it("closing an entry or clearing selection hides both presentations", () => {
    for (const view of ["nodes", "cards"] as const) {
      expect(detailPresentation(view, true, false)).toEqual({ inline: false, popup: false });
      expect(detailPresentation(view, false, true)).toEqual({ inline: false, popup: false });
    }
  });
});

describe("Empty-space camera refocus", () => {
  const resourceIds = ["paper-1", "talk-2", "paper-1"];
  const categoryIds = new Set(["paper-1"]);

  it("re-centres on the focused topic and its own work, not the whole network", () => {
    expect(paneFocusNodeIds({ selected: "Agent trust", category: "", resourceIds, categoryIds })).toEqual(["Agent trust", "paper-1", "talk-2"]);
  });
  it("keeps the selected topic alongside a narrowed category", () => {
    expect(paneFocusNodeIds({ selected: "Agent trust", category: "publications", resourceIds, categoryIds })).toEqual(["paper-1", "Agent trust"]);
  });
  it("fits the whole graph only on the unfiltered home view", () => {
    expect(paneFocusNodeIds({ selected: "", category: "", resourceIds, categoryIds })).toBeNull();
  });
});