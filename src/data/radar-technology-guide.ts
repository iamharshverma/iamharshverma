import agenticArt from "@/assets/radar-agentic-systems-framed.webp.asset.json";
import securityArt from "@/assets/radar-ai-security-framed.webp.asset.json";
import enterpriseArt from "@/assets/radar-enterprise-ai-framed.webp.asset.json";
import engineeringArt from "@/assets/radar-ai-engineering-framed.webp.asset.json";
import responsibleArt from "@/assets/radar-responsible-ai-framed.webp.asset.json";
import { radarEntries } from "./knowledge-impact";

export const radarTopicArtwork: Record<string, { url: string; alt: string; width: number; height: number }> = {
  "agentic-systems": { url: agenticArt.url, width: 390, height: 519, alt: "Modular agent processors linked through an orchestration network" },
  "ai-security": { url: securityArt.url, width: 316, height: 447, alt: "A protected processor behind an identity and authorization gateway" },
  "enterprise-ai": { url: enterpriseArt.url, width: 397, height: 410, alt: "Enterprise data layers connected to a central workflow server" },
  "ai-engineering": { url: engineeringArt.url, width: 366, height: 546, alt: "An AI processor on a test bench with evaluation and deployment infrastructure" },
  "responsible-ai": { url: responsibleArt.url, width: 397, height: 569, alt: "Human oversight connected to decision gates and a privacy boundary" },
};

type TechnologyBrief = {
  definition: string;
  scenario: string;
  failure: string;
  stages: [string, string, string];
  checks: [string, string, string];
  related: string[];
};

/** Independent educational examples, not employer architecture or adoption advice. */
export const radarTechnologyGuides: Record<string, TechnologyBrief> = {
  "multi-agent-orchestration": {
    definition: "Multi-agent orchestration coordinates specialized agents around a shared task. A coordinator controls delegation, dependencies and completion; authoritative workflow state should outlive any individual model conversation. Add agents only when the separation of responsibility is worth the coordination overhead.",
    scenario: "A research assistant delegates source discovery and evidence review to different workers. The coordinator merges only validated findings and stops after a bounded number of rounds.",
    failure: "Circular delegation or repeated retries can consume the execution budget without producing a verified outcome.",
    stages: ["Bound the task", "Delegate work", "Verify completion"],
    checks: ["Assign an owner and completion condition to every task.", "Cap delegation depth, time and tool usage.", "Replay interrupted work without duplicating side effects."],
    related: ["agent-communication", "deterministic-control", "agent-evaluation"],
  },
  "agent-communication": {
    definition: "Agent communication defines the contracts used to pass requests, evidence and results between agents. Structured envelopes separate a message's author, intent and payload from the authority required to act on it. A message from another agent is not inherently a trusted instruction.",
    scenario: "A planning worker sends a typed task containing a trace identifier, deadline and permitted operation. The receiving worker validates the contract before accepting it.",
    failure: "Ambiguous messages, stale task versions and duplicated deliveries can cause agents to disagree about what has been completed.",
    stages: ["Define a contract", "Validate the message", "Acknowledge the result"],
    checks: ["Version message schemas and reject unknown operations.", "Carry task identifiers, deadlines and initiating identity.", "Test delayed, duplicated and out-of-order deliveries."],
    related: ["multi-agent-orchestration", "agent-identity", "reliability-engineering"],
  },
  "agent-memory": {
    definition: "Agent memory retains information across turns or tasks. Working context, semantic recall and durable business records serve different purposes and need different retention rules. Retrieved memories should carry provenance and scope; they should never silently replace current operational truth.",
    scenario: "An assistant remembers a user's preferred report format while retrieving current account permissions from the system of record for every new request.",
    failure: "A stale or cross-user memory can produce an incorrect answer or reveal information outside the current user's access.",
    stages: ["Scope the memory", "Retrieve with provenance", "Refresh or expire"],
    checks: ["Separate personal context from authoritative workflow state.", "Apply tenant and user permissions before recall.", "Support expiry, deletion and correction of stored memories."],
    related: ["context-engineering", "privacy-engineering", "rag"],
  },
  "tool-using-agents": {
    definition: "Tool-using agents translate model proposals into calls to external systems. The model selects a candidate operation, but a separate executor must validate arguments, authorization and side-effect boundaries. Tool schemas improve consistency; they do not by themselves make an action safe.",
    scenario: "An assistant drafts a service-ticket update. A scoped executor checks the ticket, validates the exact fields and reads the saved ticket back after writing.",
    failure: "A plausible tool call can target the wrong resource, exceed permissions or repeat a destructive action after a timeout.",
    stages: ["Propose an action", "Authorize execution", "Read back the result"],
    checks: ["Use allowlisted operations and validated arguments.", "Require scoped credentials and action-specific approval.", "Protect writes with idempotency and independent read-back."],
    related: ["runtime-security", "agent-identity", "human-in-the-loop"],
  },
  "agent-evaluation": {
    definition: "Agent evaluation tests a complete trajectory: planning, retrieval, tool use and final state. A polished response is not proof that a task succeeded. Evaluation should inspect state changes, policy compliance and recovery behavior alongside the quality of the final answer.",
    scenario: "A test agent must resolve a synthetic support task. The test reads the resulting ticket state and checks that no unauthorized fields changed.",
    failure: "Judging only the final response misses hidden tool failures, invalid intermediate actions and fabricated completion claims.",
    stages: ["Define task evidence", "Replay trajectories", "Check resulting state"],
    checks: ["Use representative tasks and explicit failure cases.", "Verify outcomes independently of the agent's explanation.", "Version fixtures and retain privacy-safe execution traces."],
    related: ["evaluation-frameworks", "ai-observability", "deterministic-control"],
  },
  "agent-identity": {
    definition: "Agent identity binds automated work to an identifiable actor and an initiating caller. Delegated identity needs provenance, a finite lifetime and a specific capability scope. Authentication answers who is acting; authorization still decides whether this exact action is permitted.",
    scenario: "An employee delegates a report task to an agent. Each downstream tool call preserves the employee's scope and records the acting agent without granting broader access.",
    failure: "Delegation can become privilege escalation if the executor substitutes a broadly privileged service account for the caller.",
    stages: ["Bind the caller", "Delegate a scope", "Audit each action"],
    checks: ["Carry initiating identity across delegation.", "Expire and revoke delegated capabilities.", "Authorize target and operation at the execution boundary."],
    related: ["non-human-identity", "tool-using-agents", "accountability"],
  },
  "non-human-identity": {
    definition: "Non-human identities represent services, workloads and automation rather than individual people. Each needs an accountable owner and a narrow permission set. Short-lived credentials and a maintained identity inventory reduce the risks of forgotten access and long-lived secrets.",
    scenario: "A retrieval service receives a short-lived workload credential limited to a permitted index instead of sharing a permanent administrative key.",
    failure: "Orphaned identities and copied secrets can preserve access long after the original workflow has been retired.",
    stages: ["Inventory workloads", "Issue scoped access", "Rotate and revoke"],
    checks: ["Record an owner and purpose for every workload identity.", "Prefer short-lived credentials over embedded secrets.", "Review unused permissions and test revocation."],
    related: ["agent-identity", "runtime-security", "ai-security-governance"],
  },
  "runtime-security": {
    definition: "Runtime security enforces policy while an AI workflow is executing. It covers tool requests, data access, outbound connections and resource consumption. Monitoring can surface suspicious behavior, but blocking must occur at a boundary the model cannot bypass.",
    scenario: "A tool gateway blocks an unexpected export destination and records the denied operation while allowing permitted read-only requests to continue.",
    failure: "A detection-only layer can report a violation after sensitive data has already left the system.",
    stages: ["Observe the request", "Enforce the boundary", "Record the outcome"],
    checks: ["Validate tool targets and outbound destinations.", "Use least privilege and isolation for execution.", "Test fail-closed behavior when policy checks are unavailable."],
    related: ["prompt-injection-defense", "ai-observability", "tool-using-agents"],
  },
  "prompt-injection-defense": {
    definition: "Prompt injection exploits the influence of untrusted content on a model's behavior. Documents, web pages and tool responses may contain instructions that conflict with the legitimate task. Defense requires both careful context handling and independent permission enforcement, not a claim that a prompt can eliminate the threat.",
    scenario: "A retrieved page tells an agent to send credentials elsewhere. The executor rejects the destination and never exposes credentials to retrieved content.",
    failure: "Content screening alone may miss an indirect instruction or a novel attack, especially when the model has broad tool access.",
    stages: ["Mark untrusted input", "Restrict capabilities", "Challenge with attacks"],
    checks: ["Separate evidence from system policy and credentials.", "Enforce permissions outside model-generated reasoning.", "Test hostile documents, tool responses and multilingual attacks."],
    related: ["runtime-security", "context-engineering", "rag"],
  },
  "behavioral-trust": {
    definition: "Behavioral trust uses observed activity to inform risk decisions in a particular context. Evidence can help trigger additional review, but historical behavior is not permission to access a resource. Trust signals need freshness, provenance and a clear response to uncertainty.",
    scenario: "An unusual tool sequence triggers a review step even though the agent has completed similar tasks previously. Explicit access rules still apply.",
    failure: "A reputation score can hide a changed capability, compromised credential or new high-risk context.",
    stages: ["Collect scoped evidence", "Detect context change", "Require a control"],
    checks: ["Bind observations to identity, capability and time.", "Treat missing evidence as uncertainty, not trust.", "Never let behavioral signals override authorization."],
    related: ["agent-identity", "risk-management", "ai-observability"],
  },
  "ai-security-governance": {
    definition: "AI security governance connects system ownership, threat modeling and enforceable security controls. It defines who can approve new tools or data sources, how exceptions are reviewed and how incidents change the control baseline. Documentation matters only when it maps to operational responsibilities.",
    scenario: "Before enabling a write-capable tool, a team reviews its data access, abuse cases, owner and rollback plan, then schedules a control review after changes.",
    failure: "A static checklist becomes outdated when new models, data connectors or agent capabilities are introduced.",
    stages: ["Map the system", "Approve controls", "Review changes"],
    checks: ["Assign owners to risks, controls and exceptions.", "Review new data sources and tool capabilities.", "Link incidents to remediation and evidence of closure."],
    related: ["ai-governance", "risk-management", "runtime-security"],
  },
  "context-engineering": {
    definition: "Context engineering assembles the information a model needs for a specific task. Selection, ordering, provenance and token budgets influence what the model can reason about. Good context is relevant, current and permitted; simply increasing the amount of text can bury critical evidence.",
    scenario: "An assistant receives the latest permitted policy, the current request state and only the supporting passages needed for a decision.",
    failure: "Stale, contradictory or excessive context can overwhelm the relevant evidence and introduce untrusted instructions.",
    stages: ["Select relevant evidence", "Preserve provenance", "Budget the context"],
    checks: ["Retain source identity and freshness information.", "Keep instructions separate from retrieved evidence.", "Test missing, conflicting and oversized context."],
    related: ["rag", "agent-memory", "prompt-injection-defense"],
  },
  "rag": {
    definition: "Retrieval-augmented generation grounds model responses in retrieved material. Indexing, retrieval and answer generation are distinct stages with distinct failure modes. A relevant passage can support an answer only if the caller may access it and the final claim is actually supported by the cited source.",
    scenario: "An internal policy assistant retrieves permitted passages, reports their versions and declines to answer when no reliable source supports the requested claim.",
    failure: "A fluent answer may cite an irrelevant, outdated or inaccessible source while appearing well grounded.",
    stages: ["Retrieve permitted sources", "Check supporting evidence", "Answer with provenance"],
    checks: ["Enforce access filtering before returning passages.", "Evaluate retrieval and answer grounding separately.", "Revalidate freshness and support an abstention path."],
    related: ["context-engineering", "data-orchestration", "evaluation-frameworks"],
  },
  "data-orchestration": {
    definition: "Data orchestration coordinates ingestion, transformation and delivery across dependent systems. AI pipelines add embeddings, retrieval indexes and evaluation datasets to conventional data workflows. Lineage and checkpoints make it possible to understand which version of data influenced a result.",
    scenario: "A policy update triggers validation, indexing and a retrieval check before the new version becomes available to assistants.",
    failure: "Partial refreshes can leave an index inconsistent with the source while downstream systems continue using obsolete information.",
    stages: ["Validate inputs", "Coordinate dependencies", "Publish a version"],
    checks: ["Track lineage and the freshness of derived data.", "Make retries safe and recover from partial failure.", "Propagate deletion and permission changes to indexes."],
    related: ["rag", "ai-observability", "privacy-engineering"],
  },
  "model-routing": {
    definition: "Model routing selects an execution path based on task requirements, model capabilities and operating constraints. Routing may consider latency, cost, input sensitivity or structured-output requirements. A fallback is useful only if it preserves the task's security and quality boundaries.",
    scenario: "A router sends a constrained extraction task to one model and a complex analysis task to another, with an explicit approved fallback for outages.",
    failure: "An automatic fallback can silently move sensitive data to an unapproved endpoint or reduce output reliability.",
    stages: ["Classify task constraints", "Choose an allowed route", "Validate the response"],
    checks: ["Define data-handling rules for every provider path.", "Evaluate routing decisions on representative tasks.", "Observe fallback behavior and retain a safe stop path."],
    related: ["cost-optimization", "evaluation-frameworks", "distributed-inference"],
  },
  "enterprise-copilots": {
    definition: "Enterprise copilots assist users within business workflows and organizational permissions. Their value depends on reliable context and a clear boundary between a suggestion and an executed operation. Integrations must honor the user's access rather than exposing everything the connector can reach.",
    scenario: "A copilot drafts a customer response from permitted records and asks the user to approve the exact message before sending it.",
    failure: "Broad connector access or an unclear send action can reveal private records or turn a draft into an unintended commitment.",
    stages: ["Ground in user context", "Prepare a proposal", "Confirm the action"],
    checks: ["Apply user-level permissions to connected data.", "Separate drafting from consequential execution.", "Verify the committed result and offer a recovery path."],
    related: ["rag", "human-in-the-loop", "tool-using-agents"],
  },
  "ai-observability": {
    definition: "AI observability links retrieval, model calls, tool execution and resulting state into an inspectable trajectory. Quality signals and operational traces complement each other. Observability should expose failure paths without turning logs into a new store of secrets or sensitive conversation data.",
    scenario: "A shared trace ID connects a retrieval miss, a model response and a rejected tool request, allowing the team to reproduce the failure with sanitized fixtures.",
    failure: "Disconnected spans obscure the cause of failure, while indiscriminate prompt logging can leak sensitive information.",
    stages: ["Correlate the workflow", "Capture safe evidence", "Investigate failures"],
    checks: ["Link retrieval, model and tool spans with trace identifiers.", "Redact credentials and apply retention limits.", "Compare proposed outcomes with actual system state."],
    related: ["agent-evaluation", "runtime-security", "reliability-engineering"],
  },
  "evaluation-frameworks": {
    definition: "Evaluation frameworks organize datasets, checks and repeatable comparisons of AI behavior. They combine deterministic assertions with carefully scoped human or model-assisted judgment. The framework is useful when its tests represent real task constraints rather than optimizing a single convenient benchmark.",
    scenario: "A release candidate runs against held-out retrieval questions, adversarial prompts and tool-failure fixtures before a reviewer considers rollout.",
    failure: "Test contamination or an uncalibrated automated judge can make an apparent improvement unreliable.",
    stages: ["Version representative cases", "Run independent checks", "Review release evidence"],
    checks: ["Separate tuning data from held-out evaluation cases.", "Calibrate subjective judgments against human review.", "Retain reproducible regressions and configuration versions."],
    related: ["agent-evaluation", "explainability", "reliability-engineering"],
  },
  "deterministic-control": {
    definition: "Deterministic control places explicit rules around probabilistic model proposals. State machines, validated schemas and bounded transitions make execution predictable even when a model produces an unexpected answer. A controlled workflow can stop or escalate rather than inventing a next step.",
    scenario: "A request can move from draft to approved to committed only through validated transitions; model-generated text cannot skip the approval state.",
    failure: "A hidden transition or unbounded retry loop can bypass the intended policy despite a well-defined prompt.",
    stages: ["Define allowed states", "Validate transitions", "Stop on uncertainty"],
    checks: ["Keep workflow state outside model-generated memory.", "Bound retries and reject invalid transitions.", "Test interruption and resumption at every action boundary."],
    related: ["multi-agent-orchestration", "human-in-the-loop", "reliability-engineering"],
  },
  "distributed-inference": {
    definition: "Distributed inference serves model workloads across multiple processes or devices. Scheduling, communication and resource contention become part of response reliability. Engineering choices depend on model size and workload characteristics; distribution does not automatically improve latency or efficiency.",
    scenario: "An inference service propagates a request deadline across workers and cancels unnecessary work when the caller disconnects.",
    failure: "Unbounded concurrency, slow workers or communication bottlenecks can exhaust capacity and amplify tail latency.",
    stages: ["Schedule within capacity", "Propagate deadlines", "Recover from worker failure"],
    checks: ["Bound queues and enforce tenant resource limits.", "Measure end-to-end latency including communication.", "Test cancellation, worker loss and degraded capacity."],
    related: ["ai-infrastructure", "model-routing", "cost-optimization"],
  },
  "ai-infrastructure": {
    definition: "AI infrastructure provides the compute, storage, networking and release mechanisms supporting intelligent workflows. It includes model artifacts, retrieval services and tool execution environments. Reproducible environments and clear isolation boundaries help make changes reviewable and failures recoverable.",
    scenario: "A team deploys a versioned model and retrieval configuration together, tests a bounded rollout and retains the previous artifacts for rollback.",
    failure: "Configuration drift or shared resource contention can make a tested workflow behave differently after deployment.",
    stages: ["Version the environment", "Isolate workloads", "Deploy with rollback"],
    checks: ["Track models, dependencies and configuration together.", "Plan capacity and protect tenant boundaries.", "Exercise backup, rollback and degraded-service paths."],
    related: ["distributed-inference", "reliability-engineering", "ai-observability"],
  },
  "cost-optimization": {
    definition: "Cost optimization controls the resources needed to achieve a verified task outcome. Token usage, retries, retrieval and tool operations all contribute to total cost. Caching or cheaper routes should be assessed against freshness, privacy and task correctness, not only the price of a model call.",
    scenario: "A workflow uses a bounded context and scoped cache for repeatable read-only questions, while retaining full validation for consequential actions.",
    failure: "Budget exhaustion can cause incomplete verification, and an incorrectly scoped cache can return another user's data.",
    stages: ["Measure complete task cost", "Bound resource usage", "Recheck quality and safety"],
    checks: ["Include failed attempts and retries in cost analysis.", "Scope caches by permissions and freshness.", "Never remove required authorization or verification to save cost."],
    related: ["model-routing", "context-engineering", "ai-infrastructure"],
  },
  "reliability-engineering": {
    definition: "Reliability engineering anticipates failure across the full AI execution path. Timeouts, retries, idempotency and recovery matter alongside answer quality. A reliable system reports incomplete work honestly and validates committed state rather than interpreting a successful model response as a successful workflow.",
    scenario: "After a tool times out, a workflow checks whether the write already completed before deciding whether a retry is safe.",
    failure: "A retry without state inspection can duplicate a write; a silent partial failure can leave users believing the task is complete.",
    stages: ["Define failure boundaries", "Recover safely", "Verify the final state"],
    checks: ["Use deadlines, bounded retries and idempotency keys.", "Exercise dependency failure and partial completion.", "Retain rollback and explicit escalation paths."],
    related: ["deterministic-control", "ai-observability", "evaluation-frameworks"],
  },
  "human-in-the-loop": {
    definition: "Human-in-the-loop systems place informed review at consequential decision boundaries. A reviewer needs the exact proposed action, its evidence and a meaningful ability to reject or change it. Approval should bind to an immutable operation rather than a general conversation.",
    scenario: "An agent proposes a payment adjustment with the target, amount and evidence. Any change to those fields invalidates the approval and requests review again.",
    failure: "Vague approvals or overwhelming review queues can reduce oversight to a rubber stamp.",
    stages: ["Present the exact proposal", "Obtain informed approval", "Bind and verify execution"],
    checks: ["Choose review points according to consequence and reversibility.", "Invalidate approval when important arguments change.", "Provide rejection, escalation and correction paths."],
    related: ["deterministic-control", "enterprise-copilots", "accountability"],
  },
  "ai-governance": {
    definition: "AI governance defines ownership, permitted uses and lifecycle review for AI systems. It coordinates technical controls with organizational responsibilities and affected-user needs. A living system inventory helps teams understand how changes in models, data or capabilities alter the risk profile.",
    scenario: "A team records an assistant's purpose, owner, data dependencies and review requirements, then revisits the assessment when write access is added.",
    failure: "A policy without operational owners or change triggers may remain disconnected from the systems it is meant to govern.",
    stages: ["Inventory purpose and ownership", "Set operating boundaries", "Review lifecycle changes"],
    checks: ["Assign accountable owners and documented permitted uses.", "Map policies to enforceable controls and review evidence.", "Reassess risk after material capability or data changes."],
    related: ["ai-security-governance", "risk-management", "accountability"],
  },
  "explainability": {
    definition: "Explainability makes a system's outputs and decision process understandable to the intended audience. Source provenance, decision records and uncertainty can be more useful than a fluent generated explanation. A model's narrative should not be treated as a faithful record of the computations that produced its answer.",
    scenario: "A recommendation includes the actual supporting records, the applied decision rule and a way to challenge missing or incorrect evidence.",
    failure: "A convincing post-hoc explanation can misrepresent the source evidence or hide important limitations.",
    stages: ["Identify the audience", "Expose relevant evidence", "Enable challenge"],
    checks: ["Distinguish source evidence from generated interpretation.", "Match explanation detail to the decision's consequences.", "Test whether users can identify errors and request correction."],
    related: ["evaluation-frameworks", "human-in-the-loop", "accountability"],
  },
  "privacy-engineering": {
    definition: "Privacy engineering controls how personal information is collected, used, retained and deleted across AI workflows. Sensitive content can spread through prompts, embeddings, memories and logs. Data minimization and scoped access should apply to every derived representation, not just the original database.",
    scenario: "A user requests deletion, and the system removes or updates associated records, retrieval indexes and retained agent context according to its retention policy.",
    failure: "Deleting a source record alone may leave personal data in derived indexes, caches or traces.",
    stages: ["Minimize collected data", "Constrain every use", "Propagate retention and deletion"],
    checks: ["Map personal data across prompts, indexes and logs.", "Apply access boundaries and retention limits to derived data.", "Test deletion and correction through the entire pipeline."],
    related: ["agent-memory", "data-orchestration", "ai-governance"],
  },
  "risk-management": {
    definition: "AI risk management identifies potential harms, assesses their context and assigns controls and owners. Consequence, likelihood and reversibility guide how much autonomy is appropriate. Risk remains uncertain; an assessment should document assumptions and residual concerns instead of implying a system is universally safe.",
    scenario: "A read-only assistant receives different controls from an agent that can change financial records, with review requirements tied to the action's consequences.",
    failure: "A one-time generic rating can miss new capabilities, changed users or a shift in the impact of an error.",
    stages: ["Map affected outcomes", "Choose proportional controls", "Review residual risk"],
    checks: ["Document assumptions, affected users and plausible harms.", "Assign owners to controls and unresolved risks.", "Reassess after incidents and material system changes."],
    related: ["ai-governance", "behavioral-trust", "human-in-the-loop"],
  },
  "accountability": {
    definition: "Accountability ensures that consequential AI-assisted decisions have identifiable owners and inspectable evidence. Logs can support investigation, but an accountable process also needs correction, escalation and a response to affected people. Responsibility cannot be delegated to a model or explained away by automation.",
    scenario: "A disputed automated action is traced to its initiating request, delegated identity, approval and resulting state, with a named owner responsible for correction.",
    failure: "A technically detailed trace is insufficient when no person or team owns the decision and its remediation.",
    stages: ["Assign decision ownership", "Preserve appropriate evidence", "Correct and learn"],
    checks: ["Identify owners for decisions and escalation.", "Retain privacy-aware provenance and approval records.", "Offer a practical route for appeal and remediation."],
    related: ["agent-identity", "ai-governance", "explainability"],
  },
};

export function relatedRadarTechnologies(id: string) {
  const related = radarTechnologyGuides[id]?.related ?? [];
  return related.flatMap(key => {
    const entry = radarEntries.find(item => item.id === key);
    return entry ? [entry] : [];
  });
}