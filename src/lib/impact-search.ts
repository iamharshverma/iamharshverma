import { impactTopics } from "@/data/knowledge-impact";
import { knowledge } from "@/data/knowledge";
import { networkTopics } from "@/data/knowledge-network";
import { defaultParameters, type ScenarioId, type SimulationParameters } from "./impact-simulation";

export type ImpactMode = "graph" | "landscape" | "playground" | "radar";
export const graphViews = ["Concept", "Research", "Engineering", "Publication", "Full ecosystem"];
export type ImpactSearch = {
  resource?: string;
  networkTopic?: string;
  topic?: string;
  mode?: ImpactMode;
  view?: string;
  graphQuery?: string;
  category?: string;
  expanded?: string[];
  scenario?: ScenarioId;
} & Partial<SimulationParameters>;
export function validateImpactSearch(raw: Record<string, unknown>): ImpactSearch {
  const result: ImpactSearch = {};
  if (typeof raw["resource"] === "string" && knowledge.some(item => item.id === raw["resource"])) result.resource = raw["resource"];
  if (typeof raw["networkTopic"] === "string" && networkTopics.some(topic => topic.id === raw["networkTopic"])) result.networkTopic = raw["networkTopic"];
  const validTopic = (id: unknown): id is string =>
    typeof id === "string" && impactTopics.some((t) => t.id === id);
  if (validTopic(raw["topic"])) result.topic = raw["topic"];
  if (["graph", "landscape", "playground", "radar"].includes(String(raw["mode"])))
    result.mode = raw["mode"] as ImpactMode;
  if (typeof raw["view"] === "string" && graphViews.includes(raw["view"]))
    result.view = raw["view"];
  if (typeof raw["graphQuery"] === "string") result.graphQuery = raw["graphQuery"].slice(0, 200);
  if (validTopic(raw["category"])) result.category = raw["category"];
  if (Array.isArray(raw["expanded"]))
    result.expanded = [...new Set(raw["expanded"].filter(validTopic))];
  if (["research", "unauthorized", "injection", "defense"].includes(String(raw["scenario"])))
    result.scenario = raw["scenario"] as ScenarioId;
  for (const key of ["permission", "injection", "requireApproval", "approved"] as const) {
    if (typeof raw[key] === "boolean") result[key] = raw[key];
    else if (raw[key] === "true" || raw[key] === "false") result[key] = raw[key] === "true";
  }
  if (
    raw["trust"] !== "" &&
    (typeof raw["trust"] === "number" || typeof raw["trust"] === "string")
  ) {
    const value = Number(raw["trust"]);
    if (Number.isFinite(value))
      result.trust = Math.round(Math.max(0, Math.min(100, value)) / 10) * 10;
  }
  if (raw["risk"] === "high" || raw["risk"] === "low") result.risk = raw["risk"];
  return result;
}
export function simulationSettings(search: ImpactSearch): SimulationParameters {
  return {
    permission: search.permission ?? defaultParameters.permission,
    trust: search.trust ?? defaultParameters.trust,
    injection: search.injection ?? defaultParameters.injection,
    requireApproval: search.requireApproval ?? defaultParameters.requireApproval,
    approved: search.approved ?? defaultParameters.approved,
    risk: search.risk ?? defaultParameters.risk,
  };
}
