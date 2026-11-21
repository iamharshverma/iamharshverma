import { describe, it, expect } from "vitest";
import { knowledge, topicsFor } from "@/data/knowledge";
import {
  knowledgeNetworkEdges,
  networkTopics,
  networkMembership,
  networkResources,
  groupKnowledge,
  knowledgeResourceEdges,
  connectedWork,
  focusedNetworkResources,
  focusedNetworkPositions,
} from "@/data/knowledge-network";

describe("Personal Knowledge Hub graph", () => {
  it("topic focus exposes the same real articles, talks and books as the collections", () => {
    for (const topic of networkTopics) {
      expect(focusedNetworkResources(topic.id, knowledge)).toEqual(networkResources(topic.id));
    }
    const defense = focusedNetworkResources("Autonomous defense", knowledge);
    expect(defense.some(item => item.kind === "Book")).toBe(true);
    const security = focusedNetworkResources("AI security", knowledge);
    expect(security.some(item => item.kind === "Article")).toBe(true);
    expect(security.some(item => item.kind === "Keynote")).toBe(true);
  });
  it("keeps topic filters and places each focused work in a distinct readable position", () => {
    const articles = knowledge.filter(item => item.kind === "Article");
    const focused = focusedNetworkResources("Distributed systems", articles);
    expect(focused).toEqual(networkResources("Distributed systems", articles));
    const positions = focusedNetworkPositions(focused);
    expect(positions).toHaveLength(focused.length);
    expect(new Set(positions.map(p => `${p.x}:${p.y}`)).size).toBe(focused.length);
  });
  it("classifies physical AI and production reliability as engineering rather than leaving articles isolated", () => {
    expect(topicsFor("Physical AI Is Coming")).toContain("AI engineering");
    expect(topicsFor("The Production Gap: Your AI Model Isn’t as Reliable as You Think")).toContain("AI engineering");
  });
  it("connects talks, articles, books and patents through real shared subjects", () => {
    for (const kind of ["Keynote", "Article", "Book", "Patent"]) {
      const records = knowledge.filter(item => item.kind === kind);
      expect(records.length).toBeGreaterThan(0);
      for (const record of records) {
        const connections = connectedWork(record.id);
        expect(connections.length).toBeGreaterThan(0);
        for (const connection of connections) {
          expect(connection.item.id).not.toBe(record.id);
          expect(connection.item.kind).not.toBe(record.kind);
          expect(connection.topics.length).toBeGreaterThan(0);
          for (const topic of connection.topics) {
            expect(record.topics).toContain(topic);
            expect(connection.item.topics).toContain(topic);
          }
        }
      }
    }
  });
  it("deduplicates cross-format edges with valid endpoints and explained subjects", () => {
    expect(knowledgeResourceEdges.length).toBeGreaterThan(0);
    expect(new Set(knowledgeResourceEdges.map(edge => edge.id)).size).toBe(knowledgeResourceEdges.length);
    for (const edge of knowledgeResourceEdges) {
      const source = knowledge.find(item => item.id === edge.source);
      const target = knowledge.find(item => item.id === edge.target);
      expect(source).toBeDefined();
      expect(target).toBeDefined();
      expect(source?.kind).not.toBe(target?.kind);
      for (const topic of edge.topics) {
        expect(source?.topics).toContain(topic);
        expect(target?.topics).toContain(topic);
      }
    }
    expect(connectedWork("not-a-resource")).toEqual([]);
  });
  it("connects every existing library record, including untagged records", () => {
    expect(new Set(knowledgeNetworkEdges.map((edge) => edge.target)).size).toBe(knowledge.length);
    expect(new Set(knowledgeNetworkEdges.map((edge) => edge.id)).size).toBe(
      knowledgeNetworkEdges.length,
    );
    for (const edge of knowledgeNetworkEdges) {
      expect(networkTopics.some((topic) => topic.id === edge.source)).toBe(true);
      expect(knowledge.some((item) => item.id === edge.target)).toBe(true);
    }
    expect(networkMembership({ topics: [] })).toEqual(["Across the portfolio"]);
  });
  it("Agentic Security surfaces related research, interviews, talks and resources from the library", () => {
    const security = networkTopics.find((topic) => topic.title === "Agentic Security");
    expect(security?.id).toBe("AI security");
    const related = networkResources(security?.id ?? "missing");
    for (const kind of ["Research", "Media", "Keynote", "Article", "Publication"]) {
      expect(related.some((item) => item.kind === kind)).toBe(true);
    }
    expect(related.every((item) => item.topics.includes("AI security"))).toBe(true);
  });
  it("preserves search and content filters within topic exploration", () => {
    const articles = knowledge.filter((item) => item.kind === "Article");
    expect(networkResources("AI security", articles)).toEqual(
      articles.filter((item) => item.topics.includes("AI security")),
    );
    expect(networkResources("", knowledge)).toBe(knowledge);
  });
  it("classifies every selected domain record exactly once below the graph", () => {
    for (const topic of networkTopics) {
      const records = networkResources(topic.id);
      const groups = groupKnowledge(records);
      const grouped = groups.flatMap((group) => group.items);
      expect(grouped).toHaveLength(records.length);
      expect(new Set(grouped.map((item) => item.id)).size).toBe(records.length);
      for (const group of groups)
        expect(group.items.every((item) => item.kind === group.kind)).toBe(true);
    }
    const trust = groupKnowledge(networkResources("Agent trust"));
    expect(trust.map((group) => [group.kind, group.items.length])).toEqual([
      ["Article", 6],
      ["Research", 3],
      ["Keynote", 2],
      ["Media", 3],
      ["Publication", 14],
    ]);
  });
});

import { atlasLayer, atlasParent } from "@/components/site/KnowledgeAtlas";
import { graphFilterNodes } from "@/components/site/PersonalKnowledgeGraph";
describe("Detail View graph-local filtering", () => {
  it("shows only Autonomous Defense works, its topic and HV", () => {
    const records = networkResources("Autonomous defense");
    const ids = graphFilterNodes("Autonomous defense", knowledge);
    expect(ids).toEqual(new Set(["identity", "Autonomous defense", ...records.map(item => item.id)]));
    expect(ids.has("AI security")).toBe(false);
  });
  it("combines the topic and Book category without unrelated entries", () => {
    const books = networkResources("Autonomous defense").filter(item => item.kind === "Book");
    const category = groupKnowledge(books)[0];
    expect(category).toBeDefined();
    if (!category) throw new Error("Missing Book category");
    expect(graphFilterNodes("Autonomous defense", knowledge, category.id)).toEqual(new Set(["identity", "Autonomous defense", ...books.map(item => item.id)]));
  });
  it("applies content filters at the graph home and restores all nodes when cleared", () => {
    const books = knowledge.filter(item => item.kind === "Book");
    const ids = graphFilterNodes("", books);
    expect([...ids].filter(id => knowledge.some(item => item.id === id))).toEqual(books.map(item => item.id));
    expect(graphFilterNodes("", knowledge).size).toBe(knowledge.length + networkTopics.length + 1);
  });
});
describe("atlas category view", () => {
  it("returns the paper layer to the HV root without preserving a paper selection", () => {
    expect(atlasParent({ paper: "publication:example" })).toEqual({ paper: undefined });
  });
  it("backs out through every topic layer without skipping categories or entries", () => {
    const detail = { topic: "AI security", kind: "Article", id: "article:example", deep: true };
    expect(atlasLayer(detail)).toBe(5);
    const entry = atlasParent(detail);
    expect(atlasLayer(entry)).toBe(4);
    const entries = atlasParent(entry);
    expect(entries).toEqual({ topic: "AI security", kind: "Article" });
    const categories = atlasParent(entries);
    expect(categories).toEqual({ topic: "AI security" });
    expect(atlasParent(categories)).toEqual({});
  });
  it("drills category -> topic -> entry and back", () => {
    expect(atlasLayer({ view: "category", kind: "Article" })).toBe(2);
    expect(atlasLayer({ view: "category", kind: "Article", topic: "x" })).toBe(3);
    expect(atlasParent({ view: "category", kind: "Article", topic: "x" })).toEqual({ view: "category", kind: "Article" });
  });
});
