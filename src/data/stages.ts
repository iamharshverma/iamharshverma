// Pins only for venues whose city is stated in the event data. Everything else is listed as online / global.
export type StageEvent = { title: string; kind: "Keynote" | "Judge" | "Mentor" | "Panel" | "Chair"; href?: string };
export type Stage = { city: string; region: string; lat: number; lng: number; events: StageEvent[] };

export const stages: Stage[] = [
  { city: "San Francisco", region: "CA, USA", lat: 37.77, lng: -122.42, events: [
    { title: "AI × Security — Securing the AI Supply Chain (SF Tech Week)", kind: "Panel" },
    { title: "Health Tech Week: AI & Cybersecurity in Healthcare", kind: "Panel" },
    { title: "Demos & Dim Sum — #SFTechWeek", kind: "Judge" },
    { title: "GenLabX AI Engineer World's Fair Hackathon", kind: "Judge" },
    { title: "LoveHackathon 2025 Main Final", kind: "Judge" },
    { title: "Techstars San Francisco Startup Weekend", kind: "Mentor" },
  ] },
  { city: "Berkeley", region: "CA, USA", lat: 37.87, lng: -122.27, events: [
    { title: "UC Berkeley SkyDeck Keynote — The Era of Agentic Security", kind: "Keynote", href: "https://www.youtube.com/watch?v=IZvHxEtMMnw" },
    { title: "UC Berkeley SkyDeck Selection Committee (Pad-21 & Pad-22)", kind: "Judge" },
    { title: "Mayfield AI Garage Selection Committee", kind: "Judge" },
    { title: "UC Berkeley SkyDeck Mentor & Advisor", kind: "Mentor" },
  ] },
  { city: "Sacramento", region: "CA, USA", lat: 38.58, lng: -121.49, events: [
    { title: "ACM Distinguished Keynote — When Enterprises Become Multi-Agent Systems", kind: "Keynote", href: "https://www.youtube.com/watch?v=RS_BKcbeV3o" },
  ] },
  { city: "New York", region: "NY, USA", lat: 40.71, lng: -74.0, events: [
    { title: "Techstars New York City Accelerator", kind: "Mentor" },
  ] },
  { city: "Dehradun", region: "India", lat: 30.32, lng: 78.03, events: [
    { title: "UPES & IEEE ICACSDF 2026 — Keynote & Technical Session Chair", kind: "Chair" },
  ] },
];

export const onlineEvents = [
  "ICIoTCAA-2026 Keynote: AI-Enhanced Enterprise Security",
  "Global Test Alliance #ATAGTR International Conference",
  "The Agentic AI Summit 2026: People & Leadership in Agentic AI",
  "AI Trust, Safety & Reliability Executive Panel (The Agentic)",
  "AI Engineering Salon series (Founders' Creative)",
  "Agentic AI Summit: Advancing Responsible AI",
  "Future of Work Pitch Nights & Mixers",
  "TechPioneer Hackathon 2.0 · VC-Conf Global · #BuildwithAI Global Hack",
  "Silicon Zombies Ep. 179 — Quantum & Cyber Security",
];
