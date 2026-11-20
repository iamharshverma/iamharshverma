import type { TextStreamPart } from "ai";
import { testimonials } from "@/data/testimonials";

const privateNames = [...new Set(testimonials.flatMap(({ name }) => {
  const personalName = name.replace(/\s*\(.*\)$/, "");
  return [personalName, ...personalName.split(/\s+/)];
}))].sort((a, b) => b.length - a.length);

/** Also removes individual name parts and common markdown separators. */
export function redactTestimonialNames(text: string) {
  return privateNames.reduce((result, name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = escaped.replace(/\s+/g, "[\\s*_`]+");
    return result.replace(new RegExp(`\\b${pattern}\\b`, "gi"), "the recommender");
  }, text);
}

/** Buffer each text block so a name split across chunks never leaks. */
export function createTestimonialPrivacyTransform() {
  const pending = new Map<string, string>();
  return new TransformStream<TextStreamPart<{}>, TextStreamPart<{}>>({
    transform(chunk, controller) {
      if (chunk.type === "text-delta") {
        pending.set(chunk.id, (pending.get(chunk.id) ?? "") + chunk.text);
        return;
      }
      if (chunk.type === "text-end") {
        const text = pending.get(chunk.id);
        if (text) controller.enqueue({ type: "text-delta", id: chunk.id, text: redactTestimonialNames(text) });
        pending.delete(chunk.id);
      }
      // Internal reasoning is neither needed nor safe for visitor disclosure.
      if (chunk.type.startsWith("reasoning-")) return;
      controller.enqueue(chunk);
    },
  });
}