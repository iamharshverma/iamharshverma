import agents from "@/assets/knowledge-domain-agents.asset.json";
import security from "@/assets/knowledge-domain-security.asset.json";
import trust from "@/assets/knowledge-domain-trust.asset.json";
import defense from "@/assets/knowledge-domain-defense.asset.json";
import distributed from "@/assets/knowledge-domain-distributed.asset.json";
import evaluation from "@/assets/knowledge-domain-evaluation.asset.json";
import enterprise from "@/assets/knowledge-domain-enterprise.asset.json";
import responsible from "@/assets/knowledge-domain-responsible.asset.json";

/** Domain-only artwork, never reused as resource covers or inspector thumbnails. */
export const knowledgeDomainArt: Record<string, string> = {
  agents: agents.url,
  security: security.url,
  trust: trust.url,
  defense: defense.url,
  distributed: distributed.url,
  evaluation: evaluation.url,
  enterprise: enterprise.url,
  responsible: responsible.url,
};