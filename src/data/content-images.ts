import trustArtwork from "@/assets/agentic-ai-trust.jpg";
import securityArtwork from "@/assets/enterprise-agent-security.jpg";
import defenseArtwork from "@/assets/harsh-verma-rsac-security-without-humans.jpg.asset.json";
import professionalPortrait from "@/assets/harsh-verma-professional-profile.jpg.asset.json";
import speakerPortrait from "@/assets/harsh-verma-speaker.jpg.asset.json";
import authorPortrait from "@/assets/harsh-verma-author.jpg.asset.json";

/** Shared editorial covers for records without an original source thumbnail. */
export function contentImage(title: string, kind = "", original?: string): string {
  if (original) return original;
  const subject = `${title} ${kind}`.toLowerCase();
  if (/speaker|keynote/.test(subject)) return speakerPortrait.url;
  if (/biograph|press kit|media kit/.test(subject)) return professionalPortrait.url;
  if (/publication|bibliography|paper/.test(subject)) return authorPortrait.url;
  if (/defen|counteroff|incident|self-healing/.test(subject)) return defenseArtwork.url;
  if (/secur|govern|cyber|thermal|copaep/.test(subject)) return securityArtwork;
  return trustArtwork;
}