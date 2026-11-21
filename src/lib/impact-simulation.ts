export type ScenarioId = "research" | "unauthorized" | "injection" | "defense";
export type SimulationParameters = {
  permission: boolean;
  trust: number;
  injection: boolean;
  requireApproval: boolean;
  approved: boolean;
  risk: "low" | "high";
};
export type SimulationEvent = {
  component: string;
  title: string;
  detail: string;
  decision: "info" | "allowed" | "blocked" | "approval";
  tool?: string;
};
export const defaultParameters: SimulationParameters = {
  permission: true,
  trust: 80,
  injection: true,
  requireApproval: false,
  approved: false,
  risk: "low",
};
export const scenarios: { id: ScenarioId; title: string; task: string; topic: string }[] = [
  {
    id: "research",
    title: "Secure Research Workflow",
    task: "Summarize approved research on agent trust.",
    topic: "trust",
  },
  {
    id: "unauthorized",
    title: "Unauthorized Tool Access",
    task: "Attempt an export outside the agent’s authorized tool scope.",
    topic: "security",
  },
  {
    id: "injection",
    title: "Prompt Injection",
    task: "Retrieve a document that may contain hostile instructions.",
    topic: "security",
  },
  {
    id: "defense",
    title: "Autonomous Cyber Defense",
    task: "Investigate suspicious activity and request bounded containment.",
    topic: "defense",
  },
];
export const architectureComponents = [
  {
    id: "human",
    title: "Human / User",
    purpose: "Defines the goal and grants action-bound approval.",
    input: "Business intent and scope",
    output: "Task and explicit approval",
    failure: "Ambiguous scope or approval for a different target",
    security: "Bind approval to immutable action arguments.",
  },
  {
    id: "orchestrator",
    title: "Orchestrator",
    purpose: "Coordinates task ownership, budget and deadlines.",
    input: "Scoped user goal",
    output: "Bounded agent assignments",
    failure: "Recursive delegation or exceeded budget",
    security: "Retain the originating identity across handoffs.",
  },
  {
    id: "planner",
    title: "Planner Agent",
    purpose: "Produces a constrained plan, not authorization.",
    input: "Goal and allowed capabilities",
    output: "Proposed steps and tool arguments",
    failure: "An invalid or unsupported action plan",
    security: "Validate messages and distinguish data from instructions.",
  },
  {
    id: "research",
    title: "Research Agent",
    purpose: "Retrieves information with provenance.",
    input: "Query and approved sources",
    output: "Evidence and citations",
    failure: "Stale, conflicting or malicious retrieved content",
    security: "Keep untrusted content outside the policy channel.",
  },
  {
    id: "execution",
    title: "Execution Agent",
    purpose: "Requests scoped tool actions.",
    input: "Validated plan",
    output: "Action request and result",
    failure: "Duplicate side effects after a retry",
    security: "Use idempotency and confirm execution state.",
  },
  {
    id: "policy",
    title: "Security & Policy",
    purpose: "Validates identity, permissions, context and action risk.",
    input: "Identity, action, scope and approval",
    output: "Allow, deny or require approval",
    failure: "Confused-deputy authorization or stale approval",
    security: "Never delegate authorization to model output.",
  },
  {
    id: "gateway",
    title: "Tool Gateway",
    purpose: "Enforces approved action scope at the tool boundary.",
    input: "Authorized request",
    output: "Bounded tool call",
    failure: "Unsupported target or out-of-scope API",
    security: "Separate read and write authority.",
  },
  {
    id: "systems",
    title: "Enterprise Systems",
    purpose: "Illustrates a target data source or containment service.",
    input: "Scoped, idempotent command",
    output: "Read-back state",
    failure: "Timeout or partial execution",
    security: "This lab does not connect to actual enterprise systems.",
  },
  {
    id: "evaluation",
    title: "Evaluation Agent",
    purpose: "Checks final outcomes and intermediate actions.",
    input: "Execution trace and read-back state",
    output: "Verified completion or unresolved status",
    failure: "Claimed success without evidence",
    security: "Use independent checks rather than model self-assessment.",
  },
  {
    id: "audit",
    title: "Audit & Observability",
    purpose: "Preserves the decision path for review.",
    input: "Correlation IDs and decision events",
    output: "Trace with allowed and blocked actions",
    failure: "Missing provenance or exposed sensitive content",
    security: "Redact secrets and private data from logs.",
  },
];
export function simulateScenario(id: ScenarioId, p: SimulationParameters): SimulationEvent[] {
  const scenario = scenarios.find((s) => s.id === id);
  const events: SimulationEvent[] = [
    { component: "human", title: "Task received", detail: scenario?.task ?? "", decision: "info" },
    {
      component: "orchestrator",
      title: "Identity verified",
      detail: "Illustrative identity: lab-agent. Originating caller and scope preserved.",
      decision: "allowed",
    },
    {
      component: "planner",
      title: "Plan proposed",
      detail:
        id === "defense"
          ? "Detect → correlate → assess → contain → verify → recover."
          : "Retrieve → validate provenance → authorize → execute → verify.",
      decision: "info",
    },
  ];
  if (id === "injection")
    events.push({
      component: "research",
      title: p.injection ? "Untrusted instruction isolated" : "Clean source retrieved",
      detail: p.injection
        ? "Retrieved text asks for a private-data export. It is treated as data, not authority; the export is rejected."
        : "Source contains task-relevant evidence only.",
      decision: p.injection ? "blocked" : "allowed",
      tool: "retrieve(document)",
    });
  else
    events.push({
      component: "research",
      title: id === "defense" ? "Suspicious activity correlated" : "Approved evidence retrieved",
      detail:
        id === "defense"
          ? "Illustrative telemetry indicates an unusual access sequence. This is not a real security assessment."
          : "Public source provenance retained; read access does not grant export rights.",
      decision: "info",
      tool: "retrieve(approved-source)",
    });
  if (id === "unauthorized" || !p.permission) {
    events.push({
      component: "policy",
      title: "Access denied",
      detail:
        id === "unauthorized"
          ? "Export API is outside the assigned tool scope. High trust cannot override this hard policy boundary."
          : "Required permission was removed. No tool call is executed.",
      decision: "blocked",
      tool: id === "unauthorized" ? "export(private-records) — denied" : "scoped-action — denied",
    });
    events.push({
      component: "audit",
      title: "Denial recorded",
      detail: "Rejected action, identity and scope recorded. Execution stops safely.",
      decision: "blocked",
    });
    return events;
  }
  const approvalNeeded = p.requireApproval || p.risk === "high" || p.trust < 50;
  if (approvalNeeded) {
    events.push({
      component: "policy",
      title: "Human approval required",
      detail:
        p.trust < 50
          ? "Illustrative trust below 50 triggers additional review; the threshold is a lab rule only."
          : "Policy requires approval for the exact action and target.",
      decision: "approval",
    });
    events.push({
      component: "human",
      title: p.approved ? "Action-bound approval granted" : "Awaiting approval",
      detail: p.approved
        ? "Approval is bound to this action, target and scope only."
        : "No side effect occurs. Grant approval and run again to compare the outcome.",
      decision: p.approved ? "allowed" : "approval",
    });
    if (!p.approved) {
      events.push({
        component: "audit",
        title: "Pending decision recorded",
        detail: "Execution remains pending, not completed.",
        decision: "approval",
      });
      return events;
    }
  }
  events.push(
    {
      component: "policy",
      title: "Scoped action authorized",
      detail: "Permission, action risk and approval requirements satisfied.",
      decision: "allowed",
    },
    {
      component: "execution",
      title: "Bounded request prepared",
      detail: "Action has an operation ID, deadline and fixed target.",
      decision: "info",
    },
    {
      component: "gateway",
      title: id === "defense" ? "Reversible containment executed" : "Approved tool call executed",
      detail:
        "Illustrative execution only. No external tools, private data or systems are accessed.",
      decision: "allowed",
      tool: id === "defense" ? "contain(lab-host, duration=5m)" : "read(public-research)",
    },
    {
      component: "systems",
      title: "Result read back",
      detail: "Simulated target state matches the scoped action.",
      decision: "allowed",
    },
    {
      component: "evaluation",
      title: "Outcome verified",
      detail:
        "Independent deterministic check confirms scope and result; unsafe intermediate actions are not accepted.",
      decision: "allowed",
    },
  );
  if (id === "defense")
    events.push({
      component: "systems",
      title: "Recovery verified",
      detail: "The illustrative containment is reversed after review and the lab host is restored.",
      decision: "allowed",
    });
  events.push({
    component: "audit",
    title: "Evidence preserved",
    detail:
      "Trace complete. Recorded decisions distinguish blocked instructions from successful scoped execution.",
    decision: "allowed",
  });
  return events;
}
