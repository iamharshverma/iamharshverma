import overview from "@/assets/radar-engineering-overview.webp.asset.json";
import { knowledgeDomainArt } from "./knowledge-domain-art";

export const radarGuideImage = overview.url;
export type RadarGuideTopic = {
  image: string;
  imageAlt: string;
  headline: string;
  paragraphs: string[];
  scenario: string;
  question: string;
  stages: { title: string; detail: string }[];
};

/** Educational design examples, not deployment claims or maturity assessments. */
export const radarGuideTopics: Record<string, RadarGuideTopic> = {
  "agentic-systems": {
    image: knowledgeDomainArt["agents"] ?? "",
    imageAlt: "Agentic intelligence domain artwork with connected orchestration nodes",
    headline: "From a generated answer to a bounded action.",
    paragraphs: [
      "An agentic system combines a model with tools, memory and a control loop. The engineering problem is not simply choosing a capable model: it is defining what the system may do, when it must stop, and how an outcome is verified independently of its own explanation.",
      "Multiple agents can separate planning, execution and review, but delegation also adds coordination costs and new failure paths. Shared task state, explicit message contracts and a finite execution budget help prevent circular delegation, stale memory and repeated actions.",
    ],
    scenario: "A support agent proposes a change, a scoped tool checks the account, and an independent read-back verifies the result. A high-impact change waits for human approval rather than treating a plausible plan as permission.",
    question: "Can the system prove the action completed, and stop safely when it cannot?",
    stages: [
      { title: "Define intent", detail: "Translate the request into a bounded task with an explicit completion condition, permitted tools and a finite budget." },
      { title: "Delegate", detail: "Assign distinct responsibilities with structured messages; keep authoritative task state outside model-generated memory." },
      { title: "Execute", detail: "Validate tool arguments and caller permissions before each action. Use idempotency for operations that may be retried." },
      { title: "Verify", detail: "Read the resulting state through an independent check. Escalate uncertainty instead of letting an agent certify its own success." },
    ],
  },
  "ai-security": {
    image: knowledgeDomainArt["security"] ?? "",
    imageAlt: "AI security domain artwork showing protected connected systems",
    headline: "Keep model instructions separate from authority.",
    paragraphs: [
      "AI security spans the model, retrieved context, identities and the systems a tool can reach. Prompt injection is especially consequential when untrusted text can influence a workflow with real permissions. A model instruction must never become a substitute for an authorization decision.",
      "Security controls belong at enforceable boundaries: retrieval permissions, tool gateways, secret handling and action validation. Testing should include hostile documents, unexpected tool arguments and partial failures, not just successful conversations.",
    ],
    scenario: "A retrieved document asks an assistant to export private records. The document is treated as evidence, not authority; a separate policy check rejects the export regardless of how convincingly the model repeats the request.",
    question: "Which independent control blocks an unsafe action even if the model asks for it?",
    stages: [
      { title: "Identify", detail: "Bind the request to a verified caller and the specific resource they are authorized to access." },
      { title: "Isolate", detail: "Keep untrusted content distinct from policy, credentials and tool instructions. Minimize sensitive context." },
      { title: "Enforce", detail: "Validate action, target and arguments outside the model. Scope tool credentials to the smallest required capability." },
      { title: "Investigate", detail: "Retain privacy-aware traces of denied and completed actions so failures can be reproduced and controls improved." },
    ],
  },
  "enterprise-ai": {
    image: knowledgeDomainArt["enterprise"] ?? "",
    imageAlt: "Enterprise AI domain artwork with connected context and execution infrastructure",
    headline: "Context is useful only when it stays connected to reality.",
    paragraphs: [
      "Enterprise AI connects models to changing business data and operational systems. Retrieval-augmented generation can improve grounding, but the answer is only as trustworthy as the freshness, provenance and access rules of the retrieved context.",
      "Production workflows need durable state, observable execution and recovery paths. Model routing and context engineering should be evaluated against the task's constraints; a cheaper or faster response is not an improvement if it cannot be checked or safely committed.",
    ],
    scenario: "An internal assistant retrieves a policy and drafts a service request. Before submission, it rechecks the current policy version and caller access, records a trace ID, and verifies that a retry did not create a duplicate request.",
    question: "Is the answer grounded in current, authorized data and connected to a verifiable outcome?",
    stages: [
      { title: "Ground", detail: "Retrieve permitted, relevant context with provenance and freshness checks rather than treating all indexed data as equally reliable." },
      { title: "Route", detail: "Choose the model and tools according to task constraints, keeping policy and authoritative records outside the prompt." },
      { title: "Persist", detail: "Store workflow checkpoints and idempotency keys so interruptions and retries do not duplicate external side effects." },
      { title: "Observe", detail: "Link retrieval, model calls and tool execution through traces; validate outcomes against the operational system." },
    ],
  },
  "ai-engineering": {
    image: knowledgeDomainArt["evaluation"] ?? "",
    imageAlt: "AI engineering and evaluation domain artwork illustrating connected reliability checks",
    headline: "Reliability is an end-to-end systems property.",
    paragraphs: [
      "AI engineering brings evaluation, deployment and distributed-systems discipline to probabilistic behavior. A working prototype is the beginning: representative tests must cover ambiguous inputs, retrieval misses, tool failures and the cost of recovery.",
      "Versioned prompts, models and datasets make changes reviewable. Capacity planning, latency budgets and rollback boundaries matter alongside output quality. Evaluation should test the whole workflow and its state transitions rather than only judging a final sentence.",
    ],
    scenario: "A model upgrade passes answer-quality checks but repeats an external action after a timeout. A replayable workflow test catches the duplicate before rollout; a versioned release allows the previous configuration to be restored.",
    question: "What evidence would justify a release, and what signal would trigger a rollback?",
    stages: [
      { title: "Baseline", detail: "Define representative tasks and concrete failure cases, keeping test data separate from training and tuning inputs." },
      { title: "Instrument", detail: "Observe quality, latency, resource use and tool outcomes across the complete execution path." },
      { title: "Release", detail: "Version model, prompt and workflow configuration together. Bound rollout and retain a tested rollback path." },
      { title: "Re-evaluate", detail: "Review changed inputs, regressions and incident cases. Add reproducible failures to the evaluation set." },
    ],
  },
  "responsible-ai": {
    image: knowledgeDomainArt["responsible"] ?? "",
    imageAlt: "Responsible AI domain artwork representing oversight and accountable decisions",
    headline: "Make accountability part of the workflow.",
    paragraphs: [
      "Responsible AI connects technical choices to the people affected by them. Ownership, privacy and meaningful human oversight are operational requirements, not a statement appended after deployment. The appropriate level of automation depends on the consequence and reversibility of an action.",
      "Review must bind to a concrete decision with enough evidence to challenge it. Risk assessments and governance records should be updated as a system's tools, data and users change; an automated judgment is not independent proof of fairness or safety.",
    ],
    scenario: "An assistant prepares a consequential recommendation with source evidence and uncertainty. An accountable reviewer approves the exact action, while affected users retain a path to review and correction.",
    question: "Who owns the decision, who can challenge it, and what evidence will they receive?",
    stages: [
      { title: "Assign ownership", detail: "Name an accountable owner and identify affected people, decision boundaries and escalation responsibilities." },
      { title: "Assess risk", detail: "Consider privacy, error consequences and reversibility before setting the system's permitted level of autonomy." },
      { title: "Approve", detail: "Require informed review for consequential actions, binding approval to the exact target and operation." },
      { title: "Review evidence", detail: "Preserve appropriate evidence with privacy limits, and provide a practical route for correction and appeal." },
    ],
  },
};