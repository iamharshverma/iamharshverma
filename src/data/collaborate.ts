const B = "https://www.harshverma.me/images/media/brands";

export const socialStats = [
  { value: 18.1, suffix: "K+", decimals: 1, label: "LinkedIn tech network" },
  { value: 94, suffix: "/100", decimals: 0, label: "Favikon creator score" },
  { value: 3.75, suffix: "B+", decimals: 2, label: "Reported aggregate media reach" },
  { value: 1, prefix: "Top ", suffix: "%", decimals: 0, label: "ADPList global mentor" },
];

export const brands = [
  ["Palo Alto Networks", "palo_alto_networks_logo"], ["Stanford GSB", "stanford_gsb_logo"], ["Forbes Technology Council", "forbes_tech_council_logo"],
  ["IEEE", "ieee_logo"], ["BCS", "bcs_logo"], ["UC Berkeley SkyDeck", "berkeley_skydeck_logo"], ["Business Insider", "business_insider_logo"],
  ["USA Today", "usatoday_logo"], ["Yahoo Finance", "yahoo_finance_logo"], ["HackerNoon", "hackernoon_logo"], ["The Economic Times", "economic_times_logo"],
  ["The Telegraph", "the_telegraph_logo"], ["Gadgets 360", "gadgets360_logo"], ["DNA India", "dna_india_logo"], ["Healthcare Executive", "healthcare_executive_logo"],
  ["Forttuna Global 100", "forttuna_global100_logo"],
].map(([name, f]) => ({ name: name as string, logo: `${B}/${f}.svg` }));

export const pressLogos = brands.slice(6);

export const offerings = [
  { tag: "Brand & Creator", badge: "Partnerships", title: "Brand Collaborations & Sponsored Content", topic: "Other",
    desc: "Co-branded technical breakdowns, LinkedIn articles, video features and relevant product conversations for technology decision-makers.",
    points: ["Discuss the product, audience and editorial fit", "Agree disclosure, format and timing", "Confirm scope and professional policies before collaboration"] },
  { tag: "Keynote & Events", badge: "Speaking", title: "Keynote Speaking & Moderation", topic: "Keynote",
    desc: "Keynotes on autonomous AI, zero-trust architecture, agentic cybersecurity and engineering culture, alongside fireside chats and panel moderation.",
    points: ["Tailor the session to enterprise or technical audiences", "Discuss slides, duration and event format", "Agree any pre-event promotion and organizer resources"] },
  { tag: "Strategic Advisory", badge: "Executive", title: "Executive & Technical Board Advisory", topic: "Advisory",
    desc: "AI governance, architecture, roadmaps and go-to-market perspectives for founders and enterprise leaders, subject to professional and employer policies.",
    points: ["Share a non-confidential strategic brief", "Discuss responsible adoption and architecture trade-offs", "Confirm scope and conflicts before any engagement"] },
  { tag: "Education & Labs", badge: "Hands-on", title: "Corporate Masterclasses & Workshops", topic: "Other",
    desc: "Focused learning for engineering teams and technology leaders on agentic AI architecture, evaluation and secure system design.",
    points: ["Define team experience and learning goals", "Explore practical scenarios and discussion topics", "Agree the format, materials and availability"] },
  { tag: "Media & Podcasts", badge: "Interviews", title: "Podcast & Media Guest Appearances", topic: "Media",
    desc: "Conversations on enterprise AI, cybersecurity, engineering careers and frontier technology for podcasts, publications and video interviews.",
    points: ["Provide the publication and intended audience", "Describe interview topics and timing", "Access shared biographies and official photography"] },
  { tag: "Mentorship", badge: "1:1", title: "1:1 Executive Mentorship", topic: "Other",
    desc: "Engineering judgment, architecture and career-development conversations for engineers, technology leads and founders.",
    points: ["Describe your learning goals and current challenges", "Discuss engineering judgment and principal-level growth", "Confirm availability and the appropriate format"] },
] as const;

export const personas = [
  { name: "Enterprise Tech Leadership", share: 42, who: "VPs of Engineering, CTOs, Enterprise Architects & Directors",
    desc: "Technical executives evaluating enterprise AI frameworks, Zero-Trust compliance and autonomous agent architectures at $50M–$10B+ companies.",
    bars: [["C-Suite & VPs", 48], ["Directors", 32], ["Principal / Staff", 20]] },
  { name: "AI Engineers & Builders", share: 36, who: "Principal Engineers, LLM Architects & ML Researchers",
    desc: "Hands-on builders shipping LLM systems, evaluation pipelines and agent infrastructure in production.",
    bars: [["Principal / Staff", 44], ["Senior Engineers", 38], ["Researchers", 18]] },
  { name: "Founders & Investors", share: 22, who: "Seed-to-Growth Founders, VCs & Tech Strategists",
    desc: "Founders and investors looking for signal on where AI and security markets are heading next.",
    bars: [["Founders", 55], ["VCs & LPs", 28], ["Strategists", 17]] },
];

export const audienceFacts = [
  { v: "86%", l: "Decision authority", d: "C-Suite, VPs, Directors & Principal Engineers" },
  { v: "52%", l: "North America core", d: "SF Bay Area, New York, Seattle, Austin, Boston" },
  { v: "5.8%", l: "Reported engagement", d: "Owner-provided audience figure" },
];

export const creatorBadges = [
  { name: "The 70's", tier: "Gold Tier" }, { name: "LinkedIn Rising Star", tier: "70+ Score" },
  { name: "Category Champ", tier: "Top 10% Tech" }, { name: "Niche Ninja", tier: "AI & Cybersecurity" },
];

export const formats = [
  { name: "LinkedIn post", reach: 9000 }, { name: "Article / newsletter", reach: 14000 },
  { name: "Video feature", reach: 22000 }, { name: "Keynote + recap", reach: 40000 },
];
