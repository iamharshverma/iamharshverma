// True only in the GitHub Pages static build (set by deploy.config.json via the Pages workflow).
// Static hosting has no server, so server-powered features fall back to email or are hidden.
export const STATIC_SITE = import.meta.env["VITE_STATIC_SITE"] === "1";
export const CONTACT_EMAIL = "harshverma59@gmail.com";
export function openMailto(subject: string, body: string) {
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
