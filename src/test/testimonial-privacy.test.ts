import { describe, expect, it } from "vitest";
import type { TextStreamPart } from "ai";
import { buildInstructions } from "@/lib/ai/knowledge.server";
import { createTestimonialPrivacyTransform, redactTestimonialNames } from "@/lib/ai/testimonial-privacy";

describe("Testimonial author privacy", () => {
  it("excludes all four personal names from assistant knowledge but keeps their roles", () => {
    const instructions = buildInstructions();
    for (const name of ["Debdoot Mukherjee", "Manjeet Singh", "Siva subramanian", "Nitin Saini"]) {
      expect(instructions.toLowerCase()).not.toContain(name.toLowerCase());
    }
    for (const role of ["Vice President, AI, ShareChat", "Engineering at Hike Messenger", "Senior Engineering Manager at Swiggy", "Supply Chain Planning Analyst at PrimeSource Building Products"]) {
      expect(instructions).toContain(role);
    }
    expect(instructions).not.toContain("/images/client/recom");
  });

  it("redacts full names, individual names, and formatted names in generated replies", () => {
    expect(redactTestimonialNames("Debdoot Mukherjee, MANJEET SINGH, Siva subramanian, Nitin Saini"))
      .toBe("the recommender, the recommender, the recommender, the recommender");
    expect(redactTestimonialNames("Debdoot and Nitin; Manjeet **Singh**"))
      .toBe("the recommender and the recommender; the recommender**");
  });

  it("withholds names split across streamed chunks and excludes reasoning", async () => {
    const chunks: TextStreamPart<{}>[] = [
      { type: "text-start", id: "reply" },
      { type: "text-delta", id: "reply", text: "Deb" },
      { type: "reasoning-delta", id: "reason", text: "Debdoot Mukherjee" },
      { type: "text-delta", id: "reply", text: "doot Mukherjee recommends Harsh." },
      { type: "text-end", id: "reply" },
    ];
    const stream = new ReadableStream<TextStreamPart<{}>>({ start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    } }).pipeThrough(createTestimonialPrivacyTransform());
    const reader = stream.getReader();
    const output: TextStreamPart<{}>[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      output.push(value);
    }
    expect(output).toEqual([
      { type: "text-start", id: "reply" },
      { type: "text-delta", id: "reply", text: "the recommender recommends Harsh." },
      { type: "text-end", id: "reply" },
    ]);
  });
});