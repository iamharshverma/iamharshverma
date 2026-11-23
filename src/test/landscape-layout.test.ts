import { describe, expect, it } from "vitest";
import { landscapeLayout, landscapeSpoke } from "@/components/impact/landscape-layout";
import { impactTopics } from "@/data/knowledge-impact";

describe("intelligence landscape geometry", () => {
  it("includes all eight topic nodes around the HV center", () => {
    const graph = landscapeLayout(impactTopics.length, false);
    expect(graph.nodes).toHaveLength(8);
    expect(graph.center).toEqual({ x: 480, y: 260 });
  });
  it("fits every topic and its label within the phone canvas", () => {
    const graph = landscapeLayout(8, true);
    for (const node of graph.nodes) {
      expect(node.x - 78).toBeGreaterThanOrEqual(0);
      expect(node.x + 78).toBeLessThanOrEqual(graph.width);
      expect(node.y - 78).toBeGreaterThanOrEqual(0);
      expect(node.y + 78).toBeLessThanOrEqual(graph.height);
    }
  });
  it("uses all five Responsible AI stages as focused nodes", () => {
    const responsible = impactTopics.find(topic => topic.id === "responsible");
    expect(landscapeLayout(responsible?.flow.length ?? 0, true).nodes).toHaveLength(5);
  });
  it("runs arrows outwards from the hub to the node border", () => {
    expect(landscapeSpoke({ x: 200, y: 350 }, { x: 200, y: 210 }, 176, 68)).toBe("M 200 286 L 200 244");
  });
  it("keeps the three expanded detail nodes and center controls separate on phones", () => {
    const graph = landscapeLayout(3, true, true);
    expect(graph.nodes).toHaveLength(3);
    for (const node of graph.nodes) {
      expect(node.x - 78).toBeGreaterThanOrEqual(0);
      expect(node.x + 78).toBeLessThanOrEqual(graph.width);
      expect(node.y - 78).toBeGreaterThanOrEqual(0);
      expect(node.y + 78).toBeLessThanOrEqual(graph.height);
      expect(Math.abs(node.y - graph.center.y)).toBeGreaterThanOrEqual(220);
    }
  });
  it("connects a circular stage hub to the circular detail border", () => {
    expect(landscapeSpoke({ x: 200, y: 350 }, { x: 200, y: 600 }, 156, 156, 92, true)).toBe("M 200 442 L 200 522");
  });
});