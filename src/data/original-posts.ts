import securityImage from "@/assets/enterprise-agent-security.jpg";
import trustImage from "@/assets/agentic-ai-trust.jpg";
import type { Blog } from "./media";

export type OriginalPost = Blog & { body: { h?: string; p: string[]; checklist?: string[] }[]; sources?: { title: string; href: string }[] };

// Essays published first on this site. href is empty: the page itself is the original.
export const originalPosts: OriginalPost[] = [
  {
    title: "Enterprise Agent Security Checklist: Tool Permissions and Human Approvals",
    img: securityImage,
    pub: "iamharshverma.com",
    topic: "Enterprise Security",
    date: "November 12, 2026",
    read: "8 min read",
    href: "",
    excerpt: "A practical enterprise AI agent security checklist covering least-privilege tools, action-bound approvals, prompt injection, audit trails and runtime containment.",
    sources: [{ title: "Reddit discussion: How do we Secure Internal Enterprise Agents?", href: "https://www.reddit.com/r/AI_Agents/comments/1u5jzhv/how_do_we_secure_internal_enterprise_agents/" }, { title: "OWASP: Excessive Agency", href: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" }],
    body: [
      { p: ["A valid token does not make an agent's next action safe. Enterprise teams need to control what an agent can do, which actions need approval, and how execution is observed and stopped. Secure the execution path, not just the conversation.", "This checklist develops themes from a Reddit discussion on internal enterprise agents: per-agent tool scopes, destructive-action approvals, audit events and runtime monitoring. Our November 12 review found the original post deleted; the discussion is qualitative context, not a security standard or evidence of enterprise adoption. The implementation recommendations below are an editorial synthesis, not quotations or an endorsement of products in the thread."] },
      { h: "1. Define the agent's authority before connecting tools", p: ["Record the workflow, data classifications, accountable owner and maximum acceptable impact. Separate recommendations from execution. A customer-support agent that reads tickets should not inherit permission to export every customer record."], checklist: ["Assign each agent a distinct workload identity and owner; avoid shared employee credentials.", "Allow only required tools, operations and resource scopes; default-deny everything else outside the model.", "Use short-lived, task-scoped credentials; isolate development, testing and production identities.", "Document prohibited actions, sensitive datasets and a review date for every permission grant."] },
      { h: "2. Make approvals specific, enforceable and short-lived", p: ["A chat response saying 'approved' is not authorization. The execution service must verify a decision from an authenticated, authorized reviewer. Display the exact target, arguments, data exposure and expected consequence before the reviewer decides. Avoid approving an entire open-ended plan."], checklist: ["Require explicit approval for destructive writes, payments, external messages, sensitive exports and privilege changes.", "Bind approval to an immutable action payload, target resource, requester and expiry; changed arguments require new approval.", "Enforce single-use approvals and recheck current permissions immediately before execution; reject expired or replayed approvals.", "Fail closed when the approval service is unavailable, and use separation of duties for high-impact actions."] },
      { h: "3. Treat retrieved content and tool output as untrusted", p: ["Webpages, email, documents and tool responses can carry prompt injection. Instructions inside them must never expand permissions or authorize another tool. Prompt-level warnings help, but they are not a security boundary."], checklist: ["Validate tool arguments against schemas and explicit resource policies outside the model; reject arbitrary commands and URLs.", "Restrict outbound destinations and apply network-level egress controls, including protection against internal-address access.", "Keep secrets out of prompts, retrieved context and tool output; retrieve credentials only within the execution service.", "Preserve tenant and user access boundaries in retrieval, caches, memory and multi-agent handoffs."] },
      { h: "4. Observe behavior, not just successful logins", p: ["An agent can remain within its nominal scope while producing dangerous volumes or sequences of actions. Monitor exports, repeated failed writes, permission changes and unexpected resource access. Limit what can happen before an alert reaches a person."], checklist: ["Log identity, initiating user, tool, redacted arguments, policy decision, approval reference, result and correlation ID.", "Protect audit integrity and define retention and restricted access; never log raw credentials or unnecessary personal data.", "Set workflow-specific budgets for actions, data volume, runtime and spend; stop execution when a limit is reached.", "Alert on unusual action sequences and repeated failures, with a named responder and escalation path."] },
      { h: "5. Design containment and recovery before launch", p: ["Stopping the model is not enough if jobs are already queued. Containment needs to revoke credentials and stop pending execution as well. Treat retries as a security and reliability concern: a repeated payment or destructive write can be worse than a failed task."], checklist: ["Test an emergency stop that revokes agent access and cancels queued or scheduled actions.", "Use idempotency controls for side-effecting operations; require review after ambiguous outcomes instead of blindly retrying.", "Provide rollback or compensating actions where possible, and document irreversible operations explicitly.", "Prepare an incident runbook covering evidence preservation, containment, affected-user notification and safe restart."] },
      { h: "6. Prove the controls under adversarial conditions", p: ["A successful demonstration is not a release gate. Test the exact tools and approval paths used in production. Repeat tests when models, prompts, connectors or policies change; a change in one layer can invalidate assumptions elsewhere."], checklist: ["Test injected instructions in documents and tool output, cross-tenant requests and attempts to invoke denied tools.", "Test approval bypass, altered payloads, expired approvals, replay, revoked permissions and service outages.", "Record concrete evidence of denied actions, audit events and emergency-stop behavior; assign owners to failures.", "Start in read-only or approval-required mode, and expand autonomy only after a documented risk review."] },
      { h: "Release decision: evidence before autonomy", p: ["Use the checked items as a review aid, not a certification or a security score. If you cannot demonstrate enforcement, approval binding, auditability and containment on the real execution path, keep the agent read-only or approval-required. Security, platform and business owners should agree on the residual risk before production release.", "For a practical review, bring an agent's tool inventory, permission policy, approval payload and one redacted execution trace. Those artifacts make the conversation about enforceable controls rather than the model's intentions."] },
    ],
  },
  {
    title: "The Founder's Guide to Agentic AI: Build Trust Before Autonomy",
    img: trustImage,
    pub: "iamharshverma.com",
    topic: "Founders",
    date: "November 11, 2026",
    read: "7 min read",
    href: "",
    excerpt: "Most AI startups don't fail because their models are weak. They fail because customers can't trust what the agent will do next. A practical playbook for founders shipping agentic AI into real businesses.",
    body: [
      { p: [
        "Every founder pitch I hear in 2026 has the word \"agent\" in it. Agents that book, buy, triage, negotiate and remediate. The demos are impressive. Yet when I sit on selection committees and judge pitch nights, the question that separates fundable companies from the rest is rarely about the model. It is this: why would a customer let your agent act on their behalf?",
        "Autonomy is the product you want to sell. Trust is the product your customer is actually buying. Founders who design for trust first ship autonomy faster.",
      ] },
      { h: "1. Treat your first agent as an experiment, not a product", p: [
        "Your first agent should run in a narrow lane with a clear owner, a measurable outcome and an easy off switch. Pick one workflow where a mistake is cheap and reversible, instrument it heavily, and let real usage tell you where the agent is reliable. Breadth comes later; credibility comes first.",
      ] },
      { h: "2. Earn permissions over time", p: [
        "Humans get promoted by demonstrating judgment. Agents should too. Start in suggest-only mode, graduate to act-with-approval, and only then move to act-and-report. Tie each step to evidence: accuracy on real tasks, escalation rates, and how often humans override the agent. This is the simplest way to turn a scary demo into a purchase order.",
      ] },
      { h: "3. Identity and intent are your new security perimeter", p: [
        "An agent with credentials is a new kind of employee. Give every agent its own identity, scope its access to the task, and log the intent behind each action, not just the action itself. Enterprise buyers will ask how you prevent an agent from being manipulated through prompts, tools or poisoned data. Having a crisp answer is a competitive advantage, not a compliance chore.",
      ] },
      { h: "4. Your moat is orchestration, not the model", p: [
        "Frontier models are getting cheaper and more interchangeable every quarter. What compounds is the system around them: clean proprietary data flows, evaluation pipelines, feedback loops from real users, and the workflow know-how embedded in your product. Investors increasingly look for intelligence per dollar, meaning how much reliable work you deliver for every unit of compute you spend.",
      ] },
      { h: "5. Make reliability visible", p: [
        "Customers trust what they can see. Ship dashboards that show what the agent did, why, and with what confidence. Publish your evaluation results. Make rollback a single click. Observability is not an engineering afterthought; it is part of the sales motion.",
      ] },
      { h: "A simple checklist before you scale", p: [
        "Can a customer explain in one sentence what your agent is allowed to do? Can you show the evidence that it does that reliably? Can anyone stop it instantly? Do you know who is accountable when it is wrong? If the answer to all four is yes, you are ready to expand autonomy. If not, that is your roadmap.",
        "The founders who win the agentic era will not be the ones with the boldest demos. They will be the ones whose customers sleep well at night.",
      ] },
    ],
  },
];
