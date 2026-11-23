import { radarEntries } from "./knowledge-impact";
import { radarSectors } from "./radar-sectors";
import { radarTechnologyGuides } from "./radar-technology-guide";

export type RadarGlossaryTerm = {
  id: string;
  title: string;
  aliases: string[];
  definition: string;
  diagram: string[];
  sectorId: string;
  technologyIds: string[];
};

const supportingTerms: RadarGlossaryTerm[] = [
  { id: "provenance", title: "Provenance", aliases: ["provenance"], definition: "Information about the entities, activities and people involved in producing data. Provenance helps a reader assess where evidence came from and how it changed; it does not by itself establish that a claim is true.", diagram: ["Source record", "Transformation", "Attributed result"], sectorId: "enterprise-ai", technologyIds: ["rag", "data-orchestration", "explainability"] },
  { id: "idempotency", title: "Idempotency", aliases: ["idempotency", "idempotent"], definition: "An operation is idempotent when repeating the same request has the same intended effect as making it once. For consequential writes, a stable request identifier and stored outcome can prevent a retry from creating a duplicate action.", diagram: ["Request + key", "Stored outcome check", "One intended effect"], sectorId: "ai-engineering", technologyIds: ["reliability-engineering", "tool-using-agents", "deterministic-control"] },
  { id: "least-privilege", title: "Least privilege", aliases: ["least privilege"], definition: "Give an actor only the permissions necessary to perform its authorized task. A model's suggestion does not expand these permissions; access must still be checked by the system executing the action.", diagram: ["Actor + task", "Minimum permissions", "Permitted action"], sectorId: "ai-security", technologyIds: ["runtime-security", "agent-identity", "non-human-identity"] },
  { id: "authentication", title: "Authentication", aliases: ["authentication"], definition: "Verification of a claimed identity. Establishing who an actor is differs from deciding which resource or operation that actor may access.", diagram: ["Identity claim", "Credential verification", "Authenticated actor"], sectorId: "ai-security", technologyIds: ["agent-identity", "non-human-identity"] },
  { id: "authorization", title: "Authorization", aliases: ["authorization", "permissions"], definition: "The decision to permit or deny a requested operation on a resource under an access policy. An authenticated identity may still lack authorization for a particular action.", diagram: ["Actor + resource", "Policy decision", "Allow or deny"], sectorId: "ai-security", technologyIds: ["agent-identity", "runtime-security", "tool-using-agents"] },
  { id: "grounding", title: "Grounding", aliases: ["grounding", "grounded"], definition: "Connecting a generated response to supporting information. In retrieval-based workflows, retrieved passages provide candidate evidence; their presence alone does not guarantee that the response faithfully uses them.", diagram: ["Retrieved evidence", "Generated claim", "Support check"], sectorId: "enterprise-ai", technologyIds: ["rag", "enterprise-copilots", "evaluation-frameworks"] },
  { id: "embedding", title: "Embedding", aliases: ["embeddings", "embedding"], definition: "A numeric vector representation of an input. Dense retrieval compares query and document representations to find candidate passages; similarity is not proof of factual correctness or permission to access a document.", diagram: ["Text input", "Vector representation", "Similarity retrieval"], sectorId: "enterprise-ai", technologyIds: ["rag", "data-orchestration", "agent-memory"] },
  { id: "inference", title: "Inference", aliases: ["inference"], definition: "Running a trained model on an input to produce an output. Serving inference also involves scheduling, memory and compute resources; producing an output is distinct from training or validating its correctness.", diagram: ["Input + model", "Model execution", "Output"], sectorId: "ai-engineering", technologyIds: ["distributed-inference", "ai-infrastructure", "model-routing"] },
  { id: "trace", title: "Trace", aliases: ["trace ID", "trace identifier", "traces"], definition: "A record of an operation's path, composed of related spans. Correlating retrieval, model and tool operations helps locate failures, but traces should not become an unrestricted archive of sensitive prompts or credentials.", diagram: ["Request span", "Model / tool spans", "Correlated trace"], sectorId: "enterprise-ai", technologyIds: ["ai-observability", "agent-evaluation", "reliability-engineering"] },
  { id: "prompt-injection", title: "Prompt injection", aliases: ["prompt injection"], definition: "An attack in which crafted input influences a model to follow instructions that conflict with its intended task. Indirect injection can arrive through documents or tool output; independent capability restrictions are still necessary.", diagram: ["Untrusted instruction", "Model / tool boundary", "Policy enforcement"], sectorId: "ai-security", technologyIds: ["prompt-injection-defense", "runtime-security", "context-engineering"] },
  { id: "data-minimization", title: "Data minimization", aliases: ["data minimization"], definition: "Limiting the collection and processing of personal information to what is needed for a specified purpose. Prompts, logs, indexes and caches need consideration alongside the original source records.", diagram: ["Defined purpose", "Necessary data only", "Bounded retention"], sectorId: "responsible-ai", technologyIds: ["privacy-engineering", "agent-memory", "ai-governance"] },
  { id: "state-machine", title: "State machine", aliases: ["state machines", "state machine"], definition: "A model of a process as states and permitted transitions. An explicit state machine can constrain a probabilistic assistant's execution without making the assistant's generated text deterministic.", diagram: ["Draft state", "Approval transition", "Committed state"], sectorId: "ai-engineering", technologyIds: ["deterministic-control", "multi-agent-orchestration", "human-in-the-loop"] },
];

export const radarGlossary: RadarGlossaryTerm[] = [
  ...radarEntries.flatMap(entry => {
    const brief = radarTechnologyGuides[entry.id];
    const sector = radarSectors.find(item => item.title === entry.sector);
    if (!brief || !sector) return [];
    return [{ id: entry.id, title: entry.title, aliases: entry.id === "rag" ? ["RAG", "retrieval-augmented generation"] : [entry.title], definition: brief.definition, diagram: brief.stages, sectorId: sector.id, technologyIds: [entry.id] }];
  }),
  ...supportingTerms,
].sort((a, b) => a.title.localeCompare(b.title));

export function filterRadarGlossary(query: string, sectorId: string) {
  const needle = query.trim().toLowerCase();
  return radarGlossary.filter(term => (!sectorId || term.sectorId === sectorId) && (!needle || [term.title, term.definition, ...term.aliases].some(value => value.toLowerCase().includes(needle))));
}