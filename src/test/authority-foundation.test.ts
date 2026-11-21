import { describe, expect, it } from "vitest";
import { professionalIdentity } from "@/data/identity";
import { ownerReportedMetrics, ownerReportedSpeakingMetrics } from "@/data/metrics";
import { research } from "@/data/profile";
import { knowledge, filterKnowledge, relatedKnowledge } from "@/data/knowledge";
import { enquirySchema } from "@/lib/enquiry-schema";
import { renderToStaticMarkup } from "react-dom/server";
import { Counter } from "@/components/site/Reveal";
import { createElement } from "react";

describe("Authority platform rules", () => {
  it("renders the provided number before client animation or JavaScript", () => expect(renderToStaticMarkup(createElement(Counter, { to: 27, suffix: "+" }))).toContain("27"));
  it("uses the approved principal software engineering positioning", () =>
    expect(professionalIdentity.positioning).toBe(
      "Principal Software Engineer at Palo Alto Networks | AI, Cybersecurity & Agentic Systems",
    ));
  it("provides a 50-word short biography", () =>
    expect(professionalIdentity.biographies.short.trim().split(/\s+/)).toHaveLength(50));
  it("provides a 100-word standard biography", () =>
    expect(professionalIdentity.biographies.standard.trim().split(/\s+/)).toHaveLength(100));
  it("provides a 250-word extended biography", () =>
    expect(professionalIdentity.biographies.extended.trim().split(/\s+/)).toHaveLength(250));
  it("retains the owner-provided research figures with distinct patent status", () => {
    expect(ownerReportedMetrics.map((m) => m.value)).toEqual([12, 27, 6, 45]);
    expect(ownerReportedMetrics.find((m) => m.value === 6)?.label).toBe(
      "Granted & pending patents",
    );
  });
  it("retains the existing owner-provided speaking totals", () =>
    expect(ownerReportedSpeakingMetrics.map((metric) => metric.v)).toEqual([43, 10, 21, 6]));
  it("uses January 2027 for both research archive books", () =>
    expect(research.filter((r) => r.kind === "Book").map((r) => r.meta)).toEqual([
      "Coming January 2027",
      "Coming January 2027",
    ]));
  it("searches agent trust and combines content/topic filters", () => {
    const results = filterKnowledge(knowledge, {
      q: "agent trust",
      kind: "Research",
      topic: "Agent trust",
    });
    expect(results.some((r) => r.slug === "agent-trust-reputation")).toBe(true);
    expect(results.every((r) => r.kind === "Research" && r.topics.includes("Agent trust"))).toBe(
      true,
    );
  });
  it("does not return unrelated content for an unknown query", () =>
    expect(filterKnowledge(knowledge, { q: "definitely-no-such-research-6789" })).toHaveLength(0));
  it("relates topics across content types without returning the current item", () => {
    const related = relatedKnowledge(
      ["Agentic AI", "AI security"],
      "research:ai-security-governance",
      6,
    );
    expect(related.some((r) => r.id === "research:ai-security-governance")).toBe(false);
    expect(new Set(related.map((r) => r.kind)).size).toBeGreaterThan(2);
  });
  it("keeps every content record ID unique", () =>
    expect(new Set(knowledge.map((r) => r.id)).size).toBe(knowledge.length));
  it("includes event name, website, audience and size in the validated saved brief", () => {
    const parsed = enquirySchema.parse({
      kind: "booking",
      topic: "Keynote",
      name: "Organizer",
      email: "organizer@example.com",
      event_name: "Agents for Impact",
      event_url: "https://cloud.google.com/events/agents-for-impact-svl",
      audience: "AI engineers",
      audience_size: "250",
      message: "Architecture keynote",
    });
    expect(parsed.message).toContain("Event: Agents for Impact");
    expect(parsed.message).toContain("Expected audience size: 250");
    expect(parsed.message).toContain("Audience: AI engineers");
    expect(parsed.message).toContain("https://cloud.google.com/events/agents-for-impact-svl");
  });
  it("rejects non-http event websites", () =>
    expect(
      enquirySchema.safeParse({
        kind: "booking",
        topic: "Keynote",
        name: "Organizer",
        email: "organizer@example.com",
        event_url: "javascript:alert(1)",
        message: "Brief",
      }).success,
    ).toBe(false));
});
