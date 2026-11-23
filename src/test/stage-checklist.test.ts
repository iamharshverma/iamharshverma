import { describe, expect, it } from "vitest";
import { impactTopics, stageChecklist } from "@/data/knowledge-impact";

describe("stageChecklist", () => {
  it("returns three items with task, watch and owner for every topic and stage", () => {
    for (const topic of impactTopics) {
      topic.flow.forEach((_, stage) => {
        const items = stageChecklist(topic, stage);
        expect(items).toHaveLength(3);
        for (const item of items) {
          expect(item.task.length).toBeGreaterThan(0);
          expect(item.watch.length).toBeGreaterThan(0);
          expect(item.owner.length).toBeGreaterThan(0);
        }
      });
    }
  });

  it("names the current stage in the completion task", () => {
    const topic = impactTopics[0]!;
    const items = stageChecklist(topic, 1);
    expect(items[1]!.task).toContain(topic.flow[1]!);
  });

  it("assigns the next stage owner when a following stage exists", () => {
    const topic = impactTopics[0]!;
    const items = stageChecklist(topic, 0);
    expect(items[2]!.owner).toBe("Next stage owner");
    expect(items[2]!.task).toContain(topic.flow[1]!);
  });

  it("assigns the accountable owner on the final stage", () => {
    const topic = impactTopics[0]!;
    const items = stageChecklist(topic, topic.flow.length - 1);
    expect(items[2]!.owner).toBe("Accountable owner");
  });
});
