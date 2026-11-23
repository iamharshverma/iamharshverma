import { researchPillars } from "./research-pillars";
import { knowledge, type KnowledgeItem } from "./knowledge";

export type ImpactTopic = {
  id: string;
  title: string;
  short: string;
  summary: string;
  why: string;
  challenges: string[];
  principles: string[];
  flow: string[];
  concepts: string[];
  sources: { title: string; href: string }[];
  resources: KnowledgeItem[];
};
const identities = [
  ["agents", "Agentic Intelligence", "Agentic AI Architecture"],
  ["security", "AI Security & Governance", "AI Security & Governance"],
  ["trust", "Agent Trust & Reputation", "Agent Trust & Reputation"],
  ["defense", "Autonomous Cyber Defense", "Autonomous Cyber Defense"],
  ["distributed", "Distributed Intelligence", "Distributed AI Systems"],
  ["evaluation", "Evaluation & Reliability", "AI Evaluation & Reliability"],
] as const;
export const impactTopicTags: Record<string, string[]> = {
  agents: ["Agentic AI"],
  security: ["AI security"],
  trust: ["Agent trust"],
  defense: ["Autonomous defense"],
  distributed: ["Distributed systems"],
  evaluation: ["AI engineering"],
  enterprise: ["Agentic AI", "Distributed systems"],
  responsible: ["AI security", "Agent trust"],
};
const selectResources = (id: string, title: string) => {
  const direct = knowledge.filter((r) => r.title === title);
  const tagged = knowledge.filter(
    (r) => r.topics.some((t) => impactTopicTags[id]?.includes(t)) && r.title !== title,
  );
  const kinds = new Set(direct.map((r) => r.kind));
  const diverse = tagged.filter((r) => {
    if (kinds.has(r.kind)) return false;
    kinds.add(r.kind);
    return true;
  });
  return [...direct, ...diverse, ...tagged.filter((r) => !diverse.includes(r))];
};
export const impactTopics: ImpactTopic[] = identities.flatMap(([id, title, original]) => {
  const pillar = researchPillars.find((p) => p.title === original);
  if (!pillar) return [];
  return [
    {
      id,
      title,
      short: title.split(" & ")[0] ?? title,
      summary: pillar.summary,
      why: pillar.thesis,
      challenges: [pillar.problem, ...pillar.scenarios.map((s) => `${s.title}: ${s.text}`)],
      principles: pillar.principles,
      flow: pillar.flow,
      concepts: pillar.concepts.map((c) => c.title),
      sources: pillar.sources,
      resources: selectResources(id, original),
    },
  ];
});
const architecture = researchPillars.find((p) => p.slug === "agentic-ai-architecture");
const security = researchPillars.find((p) => p.slug === "ai-security-governance");
impactTopics.push(
  {
    id: "enterprise",
    title: "Enterprise AI Architecture",
    short: "Enterprise AI",
    summary: "Context, orchestration and observable execution across enterprise systems.",
    why: "Model capability becomes operational value only when grounded in fresh data, bounded tools and durable state.",
    challenges: [
      "Stale retrieval can invalidate a decision even when the answer sounds plausible.",
      "A retry must not duplicate an external side effect.",
    ],
    principles: [
      "Separate model context from authoritative state.",
      "Propagate trace IDs across retrieval and execution.",
      "Revalidate critical data before committing an action.",
    ],
    flow: [
      "Grounded context",
      "Model routing",
      "Scoped tools",
      "Durable state",
      "Outcome verification",
    ],
    concepts: [
      "Context engineering",
      "Retrieval-augmented generation",
      "Observability",
      "Versioned state",
    ],
    sources: architecture?.sources ?? [],
    resources: selectResources("enterprise", "Agentic AI Architecture"),
  },
  {
    id: "responsible",
    title: "Responsible AI",
    short: "Responsible AI",
    summary: "Human oversight, evidence and accountable boundaries for automated decisions.",
    why: "Responsibility is an operating model: clear ownership, bounded authority and evidence that a decision can be reviewed.",
    challenges: [
      "A model-generated assessment is not independent verification.",
      "Approval must bind to the exact action, not a vague intent.",
    ],
    principles: [
      "Assign an accountable owner.",
      "Require approval for high-impact irreversible actions.",
      "Protect private data and preserve appropriate evidence.",
    ],
    flow: [
      "Accountable owner",
      "Risk assessment",
      "Action-bound approval",
      "Audit evidence",
      "Human review",
    ],
    concepts: ["Human oversight", "Privacy", "Accountability", "Action-bound approval"],
    sources: security?.sources ?? [],
    resources: selectResources("responsible", "AI Security & Governance"),
  },
);
export const getImpactTopic = (id: string) =>
  impactTopics.find((t) => t.id === id) ?? impactTopics[0];
export type StageChecklistItem = { task: string; watch: string; owner: string };
export const stageChecklist = (topic: ImpactTopic, stage: number): StageChecklistItem[] => {
  const current = topic.flow[stage] ?? topic.short;
  const previous = topic.flow[stage - 1];
  const next = topic.flow[stage + 1];
  const principle = topic.principles[stage % topic.principles.length] ?? topic.why;
  const challenge = topic.challenges[stage % topic.challenges.length] ?? topic.summary;
  return [
    {
      task: `Apply the guiding principle: ${principle}`,
      watch: challenge,
      owner: "Engineering lead",
    },
    {
      task: `Complete "${current}" and record its evidence before moving on.`,
      watch: previous
        ? `Unverified output from "${previous}" can carry errors forward.`
        : "Starting without a defined scope hides assumptions.",
      owner: "Stage owner",
    },
    {
      task: next ? `Prepare the handoff to "${next}".` : "Close out the workflow and archive the outcome.",
      watch: next
        ? `Handing off without trace context forces "${next}" to re-derive state.`
        : "Closing without archived evidence blocks later review.",
      owner: next ? "Next stage owner" : "Accountable owner",
    },
  ];
};
export type ImpactRelationship = {
  source: string;
  target: string;
  verb: string;
  explanation: string;
};
export const impactRelationships: ImpactRelationship[] = [
  {
    source: "agents",
    target: "security",
    verb: "is secured by",
    explanation:
      "Tool-using agents need authorization enforced independently of model instructions.",
  },
  {
    source: "security",
    target: "trust",
    verb: "evaluates",
    explanation:
      "Identity and behavioral evidence inform review, but cannot override explicit access policy.",
  },
  {
    source: "trust",
    target: "responsible",
    verb: "supports",
    explanation: "Evidence provenance and accountable review make trust decisions contestable.",
  },
  {
    source: "agents",
    target: "distributed",
    verb: "depends on",
    explanation:
      "Delegating agents share state and face partial failures, duplicate delivery and concurrency.",
  },
  {
    source: "distributed",
    target: "enterprise",
    verb: "grounds",
    explanation:
      "Durable checkpoints, bounded workers and versioned results support enterprise execution.",
  },
  {
    source: "enterprise",
    target: "evaluation",
    verb: "is validated by",
    explanation:
      "Read-back checks verify actions, recovery and completion beyond plausible responses.",
  },
  {
    source: "evaluation",
    target: "agents",
    verb: "tests",
    explanation: "Representative scenarios test delegation, ambiguous inputs and tool failures.",
  },
  {
    source: "security",
    target: "defense",
    verb: "bounds",
    explanation:
      "Response authority and blast-radius limits keep automated containment proportionate.",
  },
  {
    source: "defense",
    target: "evaluation",
    verb: "requires",
    explanation: "Containment and recovery must be checked against operational state.",
  },
  {
    source: "responsible",
    target: "defense",
    verb: "governs",
    explanation: "High-impact responses need an accountable owner and action-bound approval.",
  },
  {
    source: "trust",
    target: "agents",
    verb: "informs",
    explanation: "Task-specific evidence can change review requirements during delegation.",
  },
  {
    source: "enterprise",
    target: "security",
    verb: "enforces",
    explanation:
      "Enterprise tool gateways validate identity, target resource and current caller authority.",
  },
];
export const ideaJourneys: Record<string, string[]> = {
  trust: ["trust", "responsible", "defense", "security"],
  agents: ["agents", "distributed", "enterprise", "evaluation"],
  security: ["security", "trust", "responsible", "defense"],
  defense: ["defense", "security", "agents", "evaluation"],
  enterprise: ["enterprise", "distributed", "agents", "evaluation"],
  evaluation: ["evaluation", "agents", "security", "defense"],
  responsible: ["responsible", "trust", "security", "defense"],
  distributed: ["distributed", "agents", "evaluation", "enterprise"],
};
export function conceptIntersection(a: string, b: string) {
  return impactRelationships.filter(
    (r) => (r.source === a && r.target === b) || (r.source === b && r.target === a),
  );
}
export type RadarRing = "ADOPT" | "EXPERIMENT" | "ASSESS" | "WATCH" | "UNASSESSED";
export type RadarEntry = {
  id: string;
  title: string;
  sector: string;
  topic: string;
  relatedTopics: string[];
  ring: RadarRing;
  assessed: boolean;
  rationale: string;
  implication: string;
  security: string;
  opportunity: string;
  challenge: string;
};
const radarGroups: [string, string, string[]][] = [
  [
    "Agentic Systems",
    "agents",
    [
      "Multi-Agent Orchestration",
      "Agent Communication",
      "Agent Memory",
      "Tool-Using Agents",
      "Agent Evaluation",
    ],
  ],
  [
    "AI Security",
    "security",
    [
      "Agent Identity",
      "Non-Human Identity",
      "Runtime Security",
      "Prompt Injection Defense",
      "Behavioral Trust",
      "AI Security Governance",
    ],
  ],
  [
    "Enterprise AI",
    "enterprise",
    [
      "Context Engineering",
      "RAG",
      "Data Orchestration",
      "Model Routing",
      "Enterprise Copilots",
      "AI Observability",
    ],
  ],
  [
    "AI Engineering",
    "evaluation",
    [
      "Evaluation Frameworks",
      "Deterministic Control",
      "Distributed Inference",
      "AI Infrastructure",
      "Cost Optimization",
      "Reliability Engineering",
    ],
  ],
  [
    "Responsible AI",
    "responsible",
    [
      "Human-in-the-Loop",
      "AI Governance",
      "Explainability",
      "Privacy Engineering",
      "Risk Management",
      "Accountability",
    ],
  ],
];
const radarNotes: Record<string, [string, string]> = {
  "Agent Identity": [
    "Preserve initiating identity throughout delegation.",
    "Do not mistake authentication for action authorization.",
  ],
  "Prompt Injection Defense": [
    "Separate retrieved data from system policy.",
    "Enforce permissions at the tool boundary even if the model follows an injection.",
  ],
  "Agent Memory": [
    "Separate contextual memory from durable business state.",
    "Constrain retention and prevent cross-user context leakage.",
  ],
  RAG: [
    "Preserve source provenance and revalidate freshness.",
    "Treat retrieved content as untrusted input.",
  ],
  "AI Observability": [
    "Join model, retrieval and tool traces with a shared correlation ID.",
    "Redact secrets and private content from execution traces.",
  ],
  "Distributed Inference": [
    "Bound concurrency and propagate deadlines across workers.",
    "Isolate tenants and guard against resource exhaustion.",
  ],
  "Human-in-the-Loop": [
    "Bind review to exact actions and important arguments.",
    "Invalidate approval when the action changes.",
  ],
  "Behavioral Trust": [
    "Scope evidence to the capability and current context.",
    "Never let reputation override explicit access policy.",
  ],
  "Cost Optimization": [
    "Enforce resource budgets around model and tool calls.",
    "Keep budget exhaustion from bypassing required validation.",
  ],
};
const radarConnections: Record<string, string[]> = {
  "Agent Identity": ["trust"],
  "Behavioral Trust": ["trust"],
  "Runtime Security": ["defense"],
  "AI Observability": ["evaluation", "defense", "distributed"],
  "Multi-Agent Orchestration": ["distributed"],
  "Distributed Inference": ["distributed"],
  "Human-in-the-Loop": ["trust", "defense"],
  "Agent Evaluation": ["evaluation"],
};
export const radarEntries: RadarEntry[] = radarGroups.flatMap(([sector, topic, titles]) =>
  titles.map((title) => {
    const domain = getImpactTopic(topic);
    return {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      sector,
      topic,
      relatedTopics: [topic, ...(radarConnections[title] ?? [])],
      ring: "UNASSESSED",
      assessed: false,
      rationale:
        "No published adoption classification has been supplied. Listed for exploration, not as an adoption recommendation.",
      implication:
        radarNotes[title]?.[0] ?? domain?.principles[0] ?? "Define explicit operating boundaries.",
      security:
        radarNotes[title]?.[1] ??
        domain?.principles[1] ??
        "Validate each proposed action independently.",
      opportunity: domain?.summary ?? "",
      challenge: domain?.challenges[0] ?? "",
    };
  }),
);
