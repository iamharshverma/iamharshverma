const B = "https://www.harshverma.me/images/media/brands";

export const socialStats = [
  { value: 18.1, suffix: "K+", decimals: 1, label: "LinkedIn tech network" },
  { value: 94, suffix: "/100", decimals: 0, label: "Favikon creator score" },
  { value: 3.75, suffix: "B+", decimals: 2, label: "Aggregate media reach" },
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
  { tag: "Brand & Creator", badge: "High reach", title: "Brand Collaborations & Sponsored Content",
    desc: "Co-branded technical breakdowns, sponsored LinkedIn articles, video features and authentic product launches reaching tech decision-makers.",
    points: ["Dedicated LinkedIn feature (18.1K+ network)", "5.8% average engagement", "Authentic developer & executive framing", "Cross-amplification on Instagram (@aiwithharsh)"] },
  { tag: "Keynote & Events", badge: "Most requested", title: "Keynote Speaking & Moderation",
    desc: "Authoritative keynotes on Autonomous AI Systems, Zero-Trust Architecture, Agentic Cybersecurity and Engineering Culture.",
    points: ["Smart Slide deck included (16+ slides)", "Tailored to enterprise or technical audiences", "Fireside chats & panel moderation", "Pre-event promotion & press syndication"] },
  { tag: "Strategic Advisory", badge: "Executive", title: "Executive & Technical Board Advisory",
    desc: "Ongoing guidance for venture-backed startups (Seed to Series C) and enterprise boards on AI governance, roadmaps and go-to-market.",
    points: ["Monthly architecture reviews & strategy sprints", "Enterprise customer & investor intros", "Production AI risk mitigation", "Board observer & technical advisory seat"] },
  { tag: "Education & Labs", badge: "Hands-on", title: "Corporate Masterclasses & Workshops",
    desc: "Immersive training for engineering teams and tech leaders on building production-grade agentic AI systems.",
    points: ["Custom engineering curriculum", "Multi-agent orchestration architectures", "Security red-teaming exercises", "Reference architecture toolkit"] },
  { tag: "Media & Podcasts", badge: "Syndicated", title: "Podcast & Media Guest Appearances",
    desc: "Conversations on enterprise AI breakthroughs, career journeys and frontier tech — Spotify, YouTube, TrueML, Silicon Zombies.",
    points: ["Studio-grade audio & 4K video ready", "12+ years of Silicon Valley insight", "Post-release social promotion", "Press syndication to tier-1 wires"] },
  { tag: "Mentorship", badge: "Top 1% global", title: "1:1 Executive Mentorship",
    desc: "High-impact sessions for engineers, tech leads and founders navigating architecture and principal-level milestones.",
    points: ["1,500+ mentoring minutes delivered", "100% recommended on ADPList (5.0★)", "Architecture & career deep-dives", "Book on ADPList or retainer"] },
];

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
  { v: "5.8%", l: "Verified engagement", d: "3.2× the B2B tech average" },
];

export const creatorBadges = [
  { name: "The 70's", tier: "Gold Tier" }, { name: "LinkedIn Rising Star", tier: "70+ Score" },
  { name: "Category Champ", tier: "Top 10% Tech" }, { name: "Niche Ninja", tier: "AI & Cybersecurity" },
];

export const formats = [
  { name: "LinkedIn post", reach: 9000 }, { name: "Article / newsletter", reach: 14000 },
  { name: "Video feature", reach: 22000 }, { name: "Keynote + recap", reach: 40000 },
];
