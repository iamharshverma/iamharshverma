import { describe, expect, it } from "vitest";
import { defaultParameters, simulateScenario } from "@/lib/impact-simulation";
import {
  impactTopics,
  impactRelationships,
  radarEntries,
  ideaJourneys,
  impactTopicTags,
} from "@/data/knowledge-impact";
import { knowledge } from "@/data/knowledge";

describe("Knowledge Impact integrity", () => {
  it("connects all subject-associated portal records without excluding media or downloads", () => {
    for (const topic of impactTopics) {
      const expected = knowledge.filter((item) =>
        item.topics.some((tag) => impactTopicTags[topic.id]?.includes(tag)),
      );
      for (const item of expected) expect(topic.resources).toContain(item);
      expect(new Set(topic.resources.map((item) => item.id)).size).toBe(topic.resources.length);
    }
    expect(
      impactTopics.some((topic) => topic.resources.some((item) => item.kind === "Media")),
    ).toBe(true);
    expect(
      impactTopics.some((topic) => topic.resources.some((item) => item.kind === "Download")),
    ).toBe(true);
  });
  it("reuses eight domains and original resource records rather than duplicating publications", () => {
    expect(impactTopics).toHaveLength(8);
    for (const topic of impactTopics)
      for (const resource of topic.resources) expect(knowledge).toContain(resource);
    for (const edge of impactRelationships) {
      expect(impactTopics.some((t) => t.id === edge.source)).toBe(true);
      expect(impactTopics.some((t) => t.id === edge.target)).toBe(true);
      expect(edge.explanation.length).toBeGreaterThan(30);
    }
  });
  it("never invents radar adoption classifications or historical review dates", () => {
    expect(radarEntries).toHaveLength(29);
    for (const entry of radarEntries) {
      expect(entry.assessed).toBe(false);
      expect(entry.ring).toBe("UNASSESSED");
    }
  });
  it("connects each journey through documented relationships and preserves every radar topic", () => {
    for (const path of Object.values(ideaJourneys))
      for (let i = 1; i < path.length; i++) {
        expect(
          impactRelationships.some(
            (r) =>
              (r.source === path[i - 1] && r.target === path[i]) ||
              (r.target === path[i - 1] && r.source === path[i]),
          ),
        ).toBe(true);
      }
    for (const t of impactTopics)
      expect(radarEntries.some((r) => r.relatedTopics.includes(t.id))).toBe(true);
  });
});
describe("Four deterministic educational scenarios", () => {
  it("completes the approved research lifecycle", () => {
    const events = simulateScenario("research", defaultParameters);
    expect(events.some((e) => e.title === "Outcome verified")).toBe(true);
    expect(events.at(-1)?.title).toBe("Evidence preserved");
  });
  it("rejects unauthorized tool access regardless of high trust and human approval", () => {
    const events = simulateScenario("unauthorized", {
      ...defaultParameters,
      trust: 100,
      approved: true,
    });
    expect(events.some((e) => e.title === "Access denied")).toBe(true);
    expect(events.some((e) => e.component === "gateway")).toBe(false);
  });
  it("removing permission blocks an otherwise successful workflow", () => {
    const events = simulateScenario("research", { ...defaultParameters, permission: false });
    expect(events.some((e) => e.decision === "blocked")).toBe(true);
    expect(events.some((e) => e.component === "gateway")).toBe(false);
  });
  it("isolates prompt injection without executing the requested private-data export", () => {
    const events = simulateScenario("injection", { ...defaultParameters, injection: true });
    expect(
      events.some((e) => e.title === "Untrusted instruction isolated" && e.decision === "blocked"),
    ).toBe(true);
    expect(events.filter((e) => e.component === "gateway").map((e) => e.tool)).toEqual([
      "read(public-research)",
    ]);
    expect(
      simulateScenario("injection", { ...defaultParameters, injection: false }).some(
        (e) => e.title === "Untrusted instruction isolated",
      ),
    ).toBe(false);
  });
  it("high risk remains pending until exact-action approval is granted", () => {
    const pending = simulateScenario("defense", {
      ...defaultParameters,
      risk: "high",
      approved: false,
    });
    expect(pending.some((e) => e.title === "Awaiting approval")).toBe(true);
    expect(pending.some((e) => e.component === "gateway")).toBe(false);
    const approved = simulateScenario("defense", {
      ...defaultParameters,
      risk: "high",
      approved: true,
    });
    expect(approved.some((e) => e.title === "Reversible containment executed")).toBe(true);
    expect(approved.some((e) => e.title === "Recovery verified")).toBe(true);
  });
  it("the explicit approval control changes the outcome of low-risk research", () => {
    expect(
      simulateScenario("research", { ...defaultParameters, requireApproval: true }).at(-1)
        ?.decision,
    ).toBe("approval");
    expect(
      simulateScenario("research", {
        ...defaultParameters,
        requireApproval: true,
        approved: true,
      }).at(-1)?.decision,
    ).toBe("allowed");
  });
  it("low illustrative trust adds review rather than overriding permission rules", () => {
    expect(
      simulateScenario("research", { ...defaultParameters, trust: 20 }).some(
        (e) => e.title === "Awaiting approval",
      ),
    ).toBe(true);
  });
});
