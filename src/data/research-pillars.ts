import architectureImage from "@/assets/research-pillar-architecture.webp.asset.json";
import securityImage from "@/assets/research-pillar-security.webp.asset.json";
import trustImage from "@/assets/research-pillar-trust.webp.asset.json";
import defenseImage from "@/assets/research-pillar-defense.webp.asset.json";
import distributedImage from "@/assets/research-pillar-distributed.webp.asset.json";
import evaluationImage from "@/assets/research-pillar-evaluation.webp.asset.json";

export type ResearchPillar = {
  slug: string;
  image: string;
  title: string;
  summary: string;
  thesis: string;
  problem: string;
  terms: string[];
  concepts: { title: string; text: string }[];
  flow: string[];
  scenarios: { title: string; text: string }[];
  principles: string[];
  sources: { title: string; href: string }[];
};
export const researchPillars: ResearchPillar[] = [
  {
    slug: "agentic-ai-architecture",
    image: architectureImage.url,
    title: "Agentic AI Architecture",
    summary: "Orchestration, coordination and evaluation for systems that plan, use tools and act.",
    thesis:
      "Autonomy is a systems property. Useful agents need explicit authority, shared contracts and observable execution—not merely a reasoning model.",
    problem:
      "A successful single-agent demonstration says little about what happens when agents share state, retry side effects, disagree or delegate across services. Enterprise workflows need predictable failure semantics around probabilistic decisions.",
    terms: ["agent", "orchestration", "multi-agent", "distributed", "workflow", "evaluation"],
    flow: ["User goal", "Scoped planner", "Policy gate", "Tool executor", "Evidence & evaluation"],
    concepts: [
      {
        title: "Contracts before delegation",
        text: "Define task inputs, output schemas, deadlines, budget and permitted tools. Validate messages at every handoff. A receiving agent treats another agent's output as data, not higher-priority instructions.",
      },
      {
        title: "Coordination and state",
        text: "Use explicit task ownership and versioned state. A durable workflow can checkpoint completed work while keeping model context separate from authoritative business state. Conflicting updates require resolution, not silent last-writer wins.",
      },
      {
        title: "Execution semantics",
        text: "Design tool calls for idempotency, bounded retries and cancellation. An orchestration layer must distinguish planning failure from a completed external side effect before attempting a retry.",
      },
      {
        title: "Evaluation as a release gate",
        text: "Evaluate task success, unauthorized actions, cost and failure recovery with representative scenarios. Include tool outages, stale retrieval, ambiguous instructions and contradictory evidence—not only happy-path prompts.",
      },
    ],
    scenarios: [
      {
        title: "Duplicate actions after retry",
        text: "An agent times out after submitting an external request. Retrying blindly may repeat the action. Use an idempotency key and reconcile execution status before resubmitting.",
      },
      {
        title: "Unbounded delegation",
        text: "Agents recursively delegate without a stopping rule. Enforce a task graph, depth and resource limits, and an owner responsible for termination.",
      },
    ],
    principles: [
      "Keep model context separate from authoritative state.",
      "Bound execution time, cost and delegation depth.",
      "Make actions replayable in a test environment and traceable in production.",
      "Require explicit human approval for high-impact, irreversible actions.",
    ],
    sources: [
      {
        title: "Google Agent Development Kit documentation",
        href: "https://google.github.io/adk-docs/",
      },
      {
        title: "NIST AI Risk Management Framework",
        href: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
    ],
  },
  {
    slug: "ai-security-governance",
    image: securityImage.url,
    title: "AI Security & Governance",
    summary:
      "Identity, least privilege and runtime controls for agents operating across enterprise boundaries.",
    thesis:
      "Securing an agent means controlling what it can do at runtime. Authentication identifies an actor; authorization must still evaluate each proposed action.",
    problem:
      "An authenticated agent can execute a harmful action using legitimate tools. Prompt injection, excessive permissions and confused-deputy behavior make model-level filtering insufficient as the sole security control.",
    terms: ["security", "governance", "identity", "permission", "prompt", "authorization"],
    flow: [
      "Agent identity",
      "Action request",
      "Contextual policy",
      "Bound approval",
      "Audited tool execution",
    ],
    concepts: [
      {
        title: "Least privilege at the tool boundary",
        text: "Issue short-lived, scoped credentials and separate read from write authority. A tool gateway checks the target resource, action and current user context independently of what the model claims.",
      },
      {
        title: "Untrusted inputs",
        text: "Retrieved documents, websites and tool responses can contain malicious instructions. Preserve provenance and separate data from system policy. Sanitize rendering, constrain tools and do not rely on the model to maintain trust boundaries alone.",
      },
      {
        title: "Action-bound approval",
        text: "Approval should bind to the exact action and important arguments. If the agent changes the recipient, resource or amount after approval, the original approval must not authorize the modified action.",
      },
      {
        title: "Governance as operational evidence",
        text: "Assign an accountable owner, retain appropriate action records and test incident recovery. Document which decisions may be automated, which require review and who can suspend a deployment.",
      },
    ],
    scenarios: [
      {
        title: "Injected instruction in a retrieved document",
        text: "A document asks the agent to export customer data. Treat it as untrusted content; a policy gateway should deny export even if the planner attempts the tool call.",
      },
      {
        title: "Approval reused for a different target",
        text: "An approved change is redirected to another resource. Bind approval to immutable action details and expire it after use.",
      },
    ],
    principles: [
      "Authorize actions outside the model.",
      "Separate retrieval permissions from execution permissions.",
      "Protect secrets from prompts, logs and tool outputs.",
      "Test refusal, containment and credential revocation.",
    ],
    sources: [
      { title: "OWASP GenAI Security Project", href: "https://genai.owasp.org/" },
      {
        title: "NIST AI Risk Management Framework",
        href: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
    ],
  },
  {
    slug: "agent-trust-reputation",
    image: trustImage.url,
    title: "Agent Trust & Reputation",
    summary:
      "Evidence-based trust, contextual reputation and risk-aware permissions between autonomous agents.",
    thesis:
      "Trust should be contextual and revisable. A successful history informs risk evaluation; it does not grant an agent unrestricted authority.",
    problem:
      "Stable identity does not prove safe intent, and a scalar reputation score can conceal task-specific weaknesses. Multi-agent systems need evidence provenance, accountability and protection against collusion or reputation laundering.",
    terms: ["trust", "reputation", "evidence", "identity", "risk", "accountability"],
    flow: ["Identity", "Behavior", "Evidence", "Reputation", "Risk evaluation", "Authorization"],
    concepts: [
      {
        title: "Proposed conceptual framework",
        text: "Identity → Behavior → Evidence → Reputation → Risk Evaluation → Authorization is a personal research model for discussion. It is not presented as a validated standard, published experimental result or employer architecture.",
      },
      {
        title: "Evidence and provenance",
        text: "Record who observed a behavior, under what task conditions and with which verification. Evidence should distinguish a claimed success from an independently checked outcome and preserve uncertainty.",
      },
      {
        title: "Contextual reputation",
        text: "Evaluate an agent for a specific capability and risk class. Retrieval accuracy does not establish safe payment execution. Decay outdated evidence and reconsider trust after model, tool or policy changes.",
      },
      {
        title: "Risk-aware authorization",
        text: "Combine current action risk with policy, identity and evidence. Reputation may influence the level of review but must not override hard security constraints or authorize access the caller does not possess.",
      },
    ],
    scenarios: [
      {
        title: "Reputation laundering",
        text: "A low-trust agent delegates through a trusted agent. Preserve the initiating identity and delegation chain so the tool gateway evaluates the original authority, not just the final caller.",
      },
      {
        title: "Good history, high-impact action",
        text: "An agent with reliable read-only performance requests a destructive operation. Require a new risk assessment and appropriate approval rather than treating accumulated success as universal permission.",
      },
    ],
    principles: [
      "Never let reputation override explicit access policy.",
      "Keep evidence scoped to capability and context.",
      "Distinguish proposed models from measured findings.",
      "Test collusion, stale evidence and compromised identities.",
    ],
    sources: [
      {
        title: "NIST Zero Trust Architecture (SP 800-207)",
        href: "https://csrc.nist.gov/pubs/sp/800/207/final",
      },
      { title: "OWASP GenAI Security Project", href: "https://genai.owasp.org/" },
    ],
  },
  {
    slug: "autonomous-cyber-defense",
    image: defenseImage.url,
    title: "Autonomous Cyber Defense",
    summary: "Detection, response and recovery with bounded autonomy and accountable oversight.",
    thesis:
      "Machine-speed response needs a machine-verifiable safety envelope. Detection confidence, response authority and operational impact must be evaluated together.",
    problem:
      "Attackers can automate at a pace that exceeds manual response, but unconstrained defensive automation can interrupt legitimate services. An agentic SOC needs containment that is fast, proportionate and reversible where possible.",
    terms: [
      "defense",
      "cybersecurity",
      "threat",
      "response",
      "self-healing",
      "soc",
      "security without",
    ],
    flow: [
      "Telemetry",
      "Correlated evidence",
      "Risk & policy",
      "Scoped response",
      "Recovery & review",
    ],
    concepts: [
      {
        title: "Detection with provenance",
        text: "Join alerts with trustworthy telemetry and asset context. Preserve the difference between an anomaly, a suspicious sequence and a confirmed incident. Model confidence alone is not sufficient evidence for a disruptive action.",
      },
      {
        title: "A bounded response ladder",
        text: "Start with observation, then reversible containment, then actions requiring human approval. Limit blast radius by resource, duration and action class; maintain a clear emergency stop.",
      },
      {
        title: "Recovery and self-healing",
        text: "Verify system state after a response and ensure restoration does not reintroduce the threat. Self-healing is a controlled recovery workflow, not a guarantee that systems repair themselves without supervision.",
      },
      {
        title: "Adversarial evaluation",
        text: "Exercise evasion, fabricated telemetry, poisoned context and tool outages. Test the impact of false positives as well as missed detections. Measure operational disruption and recovery alongside detection quality.",
      },
    ],
    scenarios: [
      {
        title: "False positive triggers service shutdown",
        text: "A suspicious login causes an agent to disable a critical account. Require asset criticality checks and choose a narrower reversible action before escalating.",
      },
      {
        title: "Response tool unavailable",
        text: "Detection succeeds but containment fails. Record the failed action, avoid claiming resolution and escalate to an accountable responder.",
      },
    ],
    principles: [
      "Separate detection from response authority.",
      "Prioritize reversible containment with explicit scope.",
      "Verify recovery rather than inferring it from tool success.",
      "Keep people accountable for policies and high-impact actions.",
    ],
    sources: [
      { title: "MITRE ATT&CK knowledge base", href: "https://attack.mitre.org/" },
      {
        title: "NIST Computer Security Incident Handling resources",
        href: "https://csrc.nist.gov/projects/incident-response",
      },
    ],
  },
  {
    slug: "distributed-ai-systems",
    image: distributedImage.url,
    title: "Distributed AI Systems",
    summary: "Resilient data pipelines, shared state and scalable infrastructure for enterprise intelligence.",
    thesis: "Intelligent workflows are only as reliable as the distributed systems beneath them.",
    problem: "AI workflows cross queues, storage layers and independent services. Partial failures, stale state and duplicate delivery can undermine an otherwise capable model. These personal design perspectives connect distributed-systems fundamentals to dependable AI execution.",
    terms: ["distributed", "data", "streaming", "consistency", "resilience"],
    flow: ["Event ingestion", "Validated data", "Durable queue", "Scoped workers", "Versioned results"],
    concepts: [
      { title: "Durable state", text: "Store workflow checkpoints outside model context. Version writes and identify the authoritative owner of each record so retries and parallel workers do not silently overwrite decisions." },
      { title: "Delivery and idempotency", text: "Assume messages may be delivered more than once. Use operation identifiers, deduplication windows and reconciliation before repeating externally visible actions." },
      { title: "Backpressure and isolation", text: "Bound queue lengths and worker concurrency. Isolate tenants and workloads so a slow model or failing tool cannot exhaust every shared resource." },
      { title: "Observability across services", text: "Propagate trace identifiers through retrieval, inference and tool execution. Inspect queue delay, stale inputs and failed writes alongside model outputs." },
    ],
    scenarios: [
      { title: "Duplicate event delivery", text: "A worker completes a task but its acknowledgment is lost. A second worker should detect the completed operation rather than repeat its side effects." },
      { title: "Stale context during a decision", text: "An agent acts on an outdated record. Revalidate critical resource versions before committing a change and restart planning when assumptions no longer hold." },
    ],
    principles: ["Separate durable state from model memory.", "Design for partial failure and duplicate delivery.", "Bound concurrency and isolate resource budgets.", "Validate data freshness before irreversible actions."],
    sources: [{ title: "Apache Spark documentation", href: "https://spark.apache.org/docs/latest/" }, { title: "Apache Kafka documentation", href: "https://kafka.apache.org/documentation/" }],
  },
  {
    slug: "ai-evaluation-reliability",
    image: evaluationImage.url,
    title: "AI Evaluation & Reliability",
    summary: "Scenario-based testing, traceable evidence and failure recovery for AI systems beyond the demo.",
    thesis: "Trustworthy AI needs repeatable evaluation of decisions, actions and recovery—not convincing demonstrations alone.",
    problem: "A plausible response can conceal incorrect reasoning, unsafe tool use or brittle recovery. These personal technical perspectives examine how representative tests and operational evidence can support release decisions without claiming unmeasured results.",
    terms: ["evaluation", "reliability", "evidence", "testing", "recovery"],
    flow: ["Representative scenarios", "Controlled execution", "Action traces", "Independent checks", "Release review"],
    concepts: [
      { title: "Scenario coverage", text: "Build evaluation sets from concrete tasks and failure modes. Include ambiguous requests, conflicting evidence, inaccessible tools and hostile retrieved content rather than only straightforward prompts." },
      { title: "Evaluate actions, not just answers", text: "Check whether the system used permitted tools and respected approval boundaries. A correct final answer does not excuse an unauthorized intermediate action." },
      { title: "Independent outcome checks", text: "Compare claimed completion with read-back state or deterministic validators. Separate model-generated assessments from independently verified evidence." },
      { title: "Regression and recovery", text: "Repeat representative scenarios after model, prompt, tool or policy changes. Test cancellation, escalation and restoration so failure handling is part of release review." },
    ],
    scenarios: [
      { title: "Correct answer, unsafe action", text: "An agent returns the requested result after accessing an unauthorized resource. Treat the action trace as a failed security evaluation despite the apparently successful answer." },
      { title: "Tool failure presented as success", text: "A tool request fails but the assistant reports completion. Validate external state and require an explicit unresolved status when evidence is missing." },
    ],
    principles: ["Keep evaluation evidence reproducible.", "Check intermediate actions and final outcomes.", "Separate proposed metrics from measured results.", "Test failure recovery before deployment."],
    sources: [{ title: "NIST AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework" }, { title: "Google ADK evaluation documentation", href: "https://google.github.io/adk-docs/evaluate/" }],
  },
];
