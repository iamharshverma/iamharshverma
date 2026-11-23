import type { RadarCitation, RadarSource } from "./radar-citations";

/** Primary sources verified November 23, 2026. No source endorses the portfolio. */
export const radarSources: Record<string, RadarSource> = Object.fromEntries(([
  ["agents", "Building effective agents", "Anthropic", "https://www.anthropic.com/research/building-effective-agents", "Engineering guidance"],
  ["context", "Effective context engineering for AI agents", "Anthropic", "https://www.anthropic.com/research/effective-context-engineering-for-ai-agents", "Engineering guidance"],
  ["evals", "Demystifying evals for AI agents", "Anthropic", "https://www.anthropic.com/research/demystifying-evals-for-ai-agents", "Engineering guidance"],
  ["react", "ReAct: Synergizing Reasoning and Acting in Language Models", "Yao et al. · arXiv", "https://arxiv.org/abs/2210.03629", "Paper"],
  ["rag", "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", "Lewis et al. · arXiv", "https://arxiv.org/html/2005.11401", "Paper"],
  ["memgpt", "MemGPT: Towards LLMs as Operating Systems", "Packer et al. · arXiv", "https://arxiv.org/abs/2310.08560", "Paper"],
  ["routing", "RouteLLM: Learning to Route LLMs with Preference Data", "Ong et al. · arXiv", "https://arxiv.org/abs/2406.18665", "Paper"],
  ["vllm", "Efficient Memory Management for Large Language Model Serving with PagedAttention", "Kwon et al. · SOSP / arXiv", "https://arxiv.org/html/2309.06180", "Paper"],
  ["a2a", "Overview — A2A Protocol", "A2A project", "https://a2a-protocol.org/latest/specification/", "Documentation"],
  ["mcp", "Security Best Practices", "Model Context Protocol project", "https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices", "Documentation"],
  ["spiffe", "SPIFFE Overview", "SPIFFE project", "https://spiffe.io/docs/latest/spiffe-about/overview/", "Documentation"],
  ["rmf", "Artificial Intelligence Risk Management Framework (AI RMF 1.0)", "NIST", "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10", "Standard"],
  ["zero-trust", "Zero Trust Architecture · SP 800-207", "NIST", "https://csrc.nist.gov/pubs/sp/800/207/final", "Standard"],
  ["privacy", "NIST Privacy Framework: A Tool for Improving Privacy Through Enterprise Risk Management, Version 1.0", "NIST", "https://www.nist.gov/publications/nist-privacy-framework-tool-improving-privacy-through-enterprise-risk-management", "Standard"],
  ["explain", "Four Principles of Explainable Artificial Intelligence · NISTIR 8312", "NIST", "https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8312.pdf", "Standard"],
  ["injection", "LLM01:2025 Prompt Injection", "OWASP", "https://genai.owasp.org/llmrisk/llm01-prompt-injection/", "Engineering guidance"],
  ["agency", "LLM06:2025 Excessive Agency", "OWASP", "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/", "Engineering guidance"],
  ["genai-traces", "Semantic conventions for generative AI systems", "OpenTelemetry · development-stage conventions", "https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md", "Documentation"],
  ["overload", "Handling Overload", "Google · Site Reliability Engineering", "https://sre.google/sre-book/handling-overload/", "Engineering guidance"],
  ["retries", "Addressing Cascading Failures", "Google · Site Reliability Engineering", "https://sre.google/sre-book/addressing-cascading-failures/", "Engineering guidance"],
  ["release", "Release Engineering", "Google · Site Reliability Engineering", "https://sre.google/sre-book/release-engineering/", "Engineering guidance"],
  ["prov", "PROV-Overview: An Overview of the PROV Family of Documents", "W3C", "https://www.w3.org/TR/prov-overview/", "Standard"],
  ["http", "RFC 9110: HTTP Semantics · §9.2.2 Idempotent Methods", "IETF", "https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2", "Standard"],
  ["traces", "Traces", "OpenTelemetry", "https://opentelemetry.io/docs/concepts/signals/traces/", "Documentation"],
  ["least-privilege", "Least privilege — CSRC Glossary", "NIST", "https://csrc.nist.gov/glossary/term/least_privilege", "Standard"],
  ["authentication", "Authentication — CSRC Glossary", "NIST", "https://csrc.nist.gov/glossary/term/authentication", "Standard"],
  ["authorization", "Authorization — CSRC Glossary", "NIST", "https://csrc.nist.gov/glossary/term/authorization", "Standard"],
  ["airflow", "Architecture Overview", "Apache Airflow", "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/overview.html", "Documentation"],
  ["scxml", "State Chart XML (SCXML): State Machine Notation for Control Abstraction", "W3C", "https://www.w3.org/TR/scxml/", "Standard"],
] satisfies [string, string, string, string, RadarSource["kind"]][]).map(([id, title, publisher, url, kind]) => [id, { id, title, publisher, url, kind }]));

type Evidence = [sourceId: string, supportedClaim: string][];
export const radarTechnologyEvidence: Record<string, Evidence> = {
  "multi-agent-orchestration": [["agents", "Anthropic describes an orchestrator–workers pattern that delegates tasks and notes that architectural complexity brings trade-offs."], ["a2a", "A2A defines task and message operations for coordinating independent agents."]],
  "agent-communication": [["a2a", "The A2A specification defines structured messages and a task lifecycle for agent interactions."], ["agency", "OWASP identifies compromised peer agents and overly broad downstream capabilities as sources of excessive-agency risk."]],
  "agent-memory": [["memgpt", "MemGPT explores hierarchical memory and virtual context management to extend limited model context."], ["privacy", "The NIST Privacy Framework addresses privacy risks introduced by data processing, including retained information."]],
  "tool-using-agents": [["react", "ReAct interleaves reasoning with actions that interact with external environments."], ["agency", "OWASP recommends limiting tool functionality, permissions and autonomy to reduce excessive agency."]],
  "agent-evaluation": [["evals", "Anthropic distinguishes an agent's transcript from the outcome in the environment and describes evaluations using trajectories, graders and harnesses."]],
  "agent-identity": [["spiffe", "SPIFFE provides cryptographic workload identities for authenticating automated services; this does not itself preserve a human caller's delegated authorization."], ["agency", "OWASP warns that generic privileged identities can let an agent act beyond the intended user's permissions."]],
  "non-human-identity": [["spiffe", "SPIFFE supports short-lived identity documents for workloads rather than relying solely on shared permanent secrets."], ["zero-trust", "NIST zero trust rejects implicit access trust based on network location or asset ownership."]],
  "runtime-security": [["zero-trust", "NIST describes policy enforcement and access decisions around protected resources."], ["agency", "OWASP recommends constraining downstream capabilities and enforcing permissions independently of model output."]],
  "prompt-injection-defense": [["injection", "OWASP describes direct and indirect prompt injection and notes that retrieval-based designs do not eliminate the vulnerability."], ["agency", "Limiting functionality, permissions and autonomy reduces the potential consequences of unwanted model actions."]],
  "behavioral-trust": [["zero-trust", "NIST allows contextual information to inform access policy while rejecting implicit trust. Behavioral trust here is an editorial label, not a standardized score."], ["rmf", "The AI RMF calls for contextual assessment of risk rather than a context-free safety judgment."]],
  "ai-security-governance": [["rmf", "The AI RMF connects organizational roles and governance to risks across the AI lifecycle."], ["mcp", "MCP security guidance identifies integration risks including token passthrough, confused-deputy behavior and SSRF."]],
  "context-engineering": [["context", "Anthropic describes curating relevant context under token constraints, including strategies for long-running agents."], ["prov", "W3C PROV represents the entities, activities and people involved in producing information."]],
  "rag": [["rag", "The original RAG paper combines a parametric generator with retrieved non-parametric information for knowledge-intensive tasks."], ["injection", "OWASP notes that externally retrieved content can carry indirect prompt injection; retrieval is not an authority boundary."]],
  "data-orchestration": [["airflow", "Airflow models workflows as tasks with explicit dependencies in a directed acyclic graph."], ["prov", "W3C PROV captures data-producing activities and relationships that can support lineage inspection."]],
  "model-routing": [["routing", "RouteLLM studies learned routing between models to balance response quality and inference cost on evaluated tasks."], ["privacy", "The NIST Privacy Framework addresses privacy risks associated with processing choices; the provider safeguards here are independent recommendations."]],
  "enterprise-copilots": [["rag", "Retrieval-augmented generation supplies external information to the generation process."], ["agency", "OWASP identifies excessive permissions and autonomy as risks when model outputs can trigger business-system actions."]],
  "ai-observability": [["genai-traces", "OpenTelemetry's development-stage GenAI conventions describe telemetry for inference, retrieval, tool execution and agents; the conventions may change."], ["traces", "OpenTelemetry traces correlate an operation's constituent spans through trace and parent identifiers."]],
  "evaluation-frameworks": [["evals", "Anthropic describes evaluation harnesses, trajectories and graders, including calibration and checks of outcomes beyond a fluent final response."]],
  "deterministic-control": [["scxml", "SCXML formally represents states and transitions. Deterministic control here is an editorial application of explicit workflow constraints, not a standardized AI technology."], ["agents", "Anthropic distinguishes predefined workflows from agents that dynamically direct their own process and tool use."]],
  "distributed-inference": [["vllm", "The PagedAttention paper studies KV-cache memory management and batching in LLM serving; it does not validate the entire recovery example on this page."], ["overload", "Google SRE explains capacity constraints, load shedding and graceful degradation when serving systems are overloaded."]],
  "ai-infrastructure": [["vllm", "The vLLM paper demonstrates that specialized memory management matters to LLM-serving infrastructure."], ["release", "Google SRE describes reproducible release processes, staged deployments and rollback practices."]],
  "cost-optimization": [["routing", "RouteLLM evaluates quality–cost trade-offs from routing requests between models; its results are benchmark-specific, not a saving promised here."], ["vllm", "PagedAttention addresses inefficient KV-cache management to improve LLM-serving throughput under evaluated workloads."]],
  "reliability-engineering": [["retries", "Google SRE explains how retries amplify failures and recommends bounded retry budgets and backoff."], ["http", "RFC 9110 defines idempotency by whether repeated identical requests have the same intended server effect as a single request."]],
  "human-in-the-loop": [["agency", "OWASP identifies insufficient verification and approval of high-impact actions as excessive-autonomy risks."], ["rmf", "The AI RMF calls for clearly defined human oversight and organizational responsibilities."]],
  "ai-governance": [["rmf", "The AI RMF's Govern function addresses organizational policies, responsibilities and processes throughout the AI lifecycle."]],
  "explainability": [["explain", "NIST's four principles distinguish explanation, meaningfulness, explanation accuracy and knowledge limits."], ["prov", "W3C provenance records can expose production history; provenance alone does not guarantee truth or a faithful explanation."]],
  "privacy-engineering": [["privacy", "The NIST Privacy Framework addresses privacy risk across data processing rather than only at initial collection."], ["memgpt", "MemGPT's memory hierarchy illustrates additional storage tiers that a privacy review may need to consider; deletion mechanisms here are independent design guidance."]],
  "risk-management": [["rmf", "The AI RMF organizes contextual risk work through Govern, Map, Measure and Manage. It is voluntary guidance, not a universal safety certification."]],
  "accountability": [["rmf", "The AI RMF links accountable and transparent AI to organizational responsibilities and governance."], ["prov", "Provenance supports investigation of how information was produced; a record alone does not assign responsibility or provide remediation."]],
};

export const radarTopicEvidence: Record<string, Evidence> = {
  "agentic-systems": [["agents", "Anthropic distinguishes agents from predefined workflows and describes delegation patterns and their complexity trade-offs."], ["evals", "Agent evaluation can inspect the resulting environment rather than accepting a completion narrative as proof."]],
  "ai-security": [["injection", "Untrusted documents and tool output can carry indirect prompt injection, including in retrieval-based workflows."], ["agency", "OWASP recommends independent limits on tool permissions, functionality and autonomy."]],
  "enterprise-ai": [["rag", "The RAG paper describes using retrieved external information to condition generated responses."], ["zero-trust", "NIST emphasizes resource-specific access policy rather than implicit trust in a connected environment."]],
  "ai-engineering": [["evals", "Repeatable agent evaluations combine task trajectories, graders and outcome evidence."], ["retries", "Google SRE explains retry amplification and bounded retries as reliability concerns in interconnected systems."]],
  "responsible-ai": [["rmf", "The AI RMF connects lifecycle governance, organizational accountability and contextual risk management."], ["privacy", "The NIST Privacy Framework connects data-processing decisions to enterprise privacy risk."]],
};

const supportingEvidence: Record<string, Evidence> = {
  "provenance": [["prov", "W3C defines provenance as information about the entities, activities and people involved in producing data or a thing."]],
  "idempotency": [["http", "RFC 9110 §9.2.2 defines an idempotent method by its repeated requests' intended effect; the request-key diagram is an illustrative implementation pattern."]],
  "least-privilege": [["least-privilege", "NIST defines least privilege in terms of the minimum authorizations and resources needed for a function."]],
  "authentication": [["authentication", "NIST's glossary describes verifying an identity or a claimed identity."]],
  "authorization": [["authorization", "NIST distinguishes granting access privileges from establishing identity."]],
  "grounding": [["rag", "RAG conditions generation on retrieved passages. Grounding here summarizes the connection to evidence, not a correctness guarantee."]],
  "embedding": [["rag", "The RAG architecture uses dense query and document representations for passage retrieval."]],
  "inference": [["routing", "RouteLLM studies routing requests between trained models at inference time, trading off output quality and cost."]],
  "trace": [["traces", "OpenTelemetry describes traces as related spans that capture an operation's path through a system."]],
  "prompt-injection": [["injection", "OWASP distinguishes direct injection from indirect instructions arriving through external content."]],
  "data-minimization": [["privacy", "The NIST Privacy Framework includes data minimization and managing data-processing and retention risks."]],
  "state-machine": [["scxml", "SCXML provides state, transition, initial and final constructs for representing state-machine behavior."]],
};

function resolveEvidence(evidence: Evidence): RadarCitation[] {
  return evidence.flatMap(([id, claim]) => {
    const source = radarSources[id];
    return source ? [{ source, claim }] : [];
  });
}
export const technologyCitations = (id: string) => resolveEvidence(radarTechnologyEvidence[id] ?? []);
export const topicCitations = (id: string) => resolveEvidence(radarTopicEvidence[id] ?? []);
export const glossaryCitations = (id: string) => resolveEvidence(radarTechnologyEvidence[id] ?? supportingEvidence[id] ?? []);