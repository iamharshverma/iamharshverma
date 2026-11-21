import { describe, it, expect } from "vitest";
import { validateImpactSearch, simulationSettings } from "@/lib/impact-search";
import { simulateScenario } from "@/lib/impact-simulation";
import { knowledge } from "@/data/knowledge";

describe("Shareable Knowledge Impact state", () => {
  it("restores a unified graph resource and subject without allowing unknown nodes", () => {
    const book = knowledge.find(item => item.kind === "Book");
    if (!book) throw new Error("Book inventory is missing");
    const settings = { resource: book.id, networkTopic: "Agentic AI", view: "Full ecosystem" };
    expect(validateImpactSearch(JSON.parse(JSON.stringify(settings)))).toEqual(settings);
    expect(validateImpactSearch({ resource: "missing", networkTopic: "missing" })).toEqual({});
  });
  it("preserves selected concept and graph view with graph filters and clusters", () => {
    const input = {
      topic: "security",
      mode: "graph",
      view: "Full ecosystem",
      graphQuery: "trust",
      category: "agents",
      expanded: ["security", "agents"],
    };
    expect(validateImpactSearch(JSON.parse(JSON.stringify(input)))).toEqual(input);
  });
  it("preserves all six simulation settings including false and zero values", () => {
    const input = {
      topic: "defense",
      mode: "playground",
      scenario: "defense",
      permission: false,
      trust: 0,
      injection: false,
      requireApproval: true,
      approved: false,
      risk: "high",
    };
    const restored = validateImpactSearch(JSON.parse(JSON.stringify(input)));
    expect(restored).toEqual(input);
    expect(simulationSettings(restored)).toEqual({
      permission: false,
      trust: 0,
      injection: false,
      requireApproval: true,
      approved: false,
      risk: "high",
    });
    expect(
      simulateScenario("defense", simulationSettings(restored)).some(
        (event) => event.decision === "blocked",
      ),
    ).toBe(true);
  });
  it("bounds malformed settings and ignores unknown topics, views and scenarios", () => {
    expect(
      validateImpactSearch({
        topic: "invalid",
        view: "invalid",
        scenario: "invalid",
        trust: 999,
        expanded: ["trust", "bad", "trust"],
        permission: "false",
      }),
    ).toEqual({ trust: 100, expanded: ["trust"], permission: false });
    expect(
      validateImpactSearch({ trust: "not-a-number", approved: "invalid", risk: "critical" }),
    ).toEqual({});
  });
});
