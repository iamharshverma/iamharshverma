import biographies from "@/assets/resource-biographies.webp.asset.json";
import press from "@/assets/resource-press.webp.asset.json";
import media from "@/assets/resource-media.webp.asset.json";
import speaker from "@/assets/resource-speaker.webp.asset.json";

export const resourceImages = {
  "professional-biographies": biographies.url,
  "press-kit": press.url,
  "media-kit": media.url,
  "speaker-bio": speaker.url,
} as const;