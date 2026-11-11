export const books = [
  {
    slug: "beyond-ai-engineering",
    title: "Beyond AI Engineering",
    subtitle: "From Creator to Curator — The Engineering After Code",
    status: "Coming January 2027",
    site: "https://beyondaiengineering.com/",
    cover: "https://www.beyondaiengineering.com/assets/images/book_hardcover_mockup_1793842329740.jpg",
    pitch: "AI can increasingly write the implementation. Your advantage moves to judgment. A career operating system for the agentic AI era — moving from Creator to Architect to Orchestrator.",
    stats: [["11", "Chapters"], ["15", "Infographics"], ["9", "Career artifacts"]],
  },
  {
    slug: "ai-vs-ai",
    title: "AI vs. AI",
    subtitle: "Engineering the Cybersecurity Counteroffensive",
    status: "Coming January 2027",
    site: "https://www.beyondaivsai.com/",
    cover: "https://www.harshverma.me/images/books/ai_vs_ai_cover.jpg",
    pitch: "A technical deep dive with empirical case studies on building autonomous, real-time AI counteroffensive architectures to defend against adversaries wielding weaponized AI.",
    stats: [["AI", "Agentic defense"], ["Real-time", "Counteroffensive"], ["Case", "Studies"]],
  },
] as const;

export const caoStages = [
  { key: "Creator", tag: "Stage 01 · Build", line: "Turns ideas into working systems.", role: "Individual Contributor / Builder",
    caps: ["Implementation", "Experimentation", "Prototyping", "Technical depth", "Evaluation"],
    question: "How do I make this work, fast and correctly?", risk: "Becoming a syntax generator that AI can replace." },
  { key: "Architect", tag: "Stage 02 · Design", line: "Decides what should be built and how the system should work.", role: "Staff Engineer / Systems Architect",
    caps: ["Systems thinking", "Trade-offs", "AI product sense", "Risk mitigation", "Business context"],
    question: "What should be built, and what invariant boundaries protect it?", risk: "Over-engineering without customer validation." },
  { key: "Orchestrator", tag: "Stage 03 · Lead", line: "Coordinates AI, humans, systems, permissions and outcomes.", role: "Principal AI Engineer / CTO / Founder",
    caps: ["AI agents & swarms", "Human-AI collaboration", "Authority boundaries", "Trust stewardship", "Responsible automation"],
    question: "Who — human or agent — is accountable for each decision?", risk: "Delegating authority without verification loops." },
] as const;

const IG = "https://www.beyondaiengineering.com/assets/aistudio";
export const infographics = [
  { ch: "Orientation", title: "From Creator to Curator", note: "The C.A.O. framework", img: `${IG}/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png` },
  { ch: "Chapter 1", title: "The New Age of Engineering", note: "Simon Willison & Knight Capital", img: `${IG}/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png` },
  { ch: "Chapter 2", title: "From HOW to WHAT", note: "swyx & Zillow Offers", img: `${IG}/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png` },
  { ch: "Chapter 7", title: "From Stagnation to Innovation", note: "Anti-LeetCode manifesto", img: `${IG}/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png` },
];

export const artifacts = ["C.A.O. Career Map", "Human Advantage Inventory", "AI Workflow Experiment", "Ethical AI Audit", "Professional Positioning", "War Story Narrative", "Digital Paper Trail", "Micro-Community Map", "30/60/90-Day Plan"];

export const audiences = [
  ["The Working Engineer", "You already know how to build. Learn where your value moves when AI handles implementation."],
  ["The AI / ML Professional", "Move beyond models toward production systems, orchestration, evaluation and trust."],
  ["The Technical Leader", "Treat people, AI agents, authority, risk and accountability as one operating system."],
  ["The Student", "Enter engineering with an AI-native mindset and build evidence of judgment."],
] as const;

export const aiSecurityThemes = [
  { title: "The adversarial AI shift", description: "What changes when adversaries use AI to accelerate reconnaissance, adapt attacks and scale their operations." },
  { title: "Autonomous defense architectures", description: "Connecting agent telemetry, real-time detection and response into a coordinated security system." },
  { title: "Trust before autonomy", description: "Verification, permission boundaries and human accountability for systems that act at machine speed." },
  { title: "Evidence over promises", description: "An empirical, case-study lens on the trade-offs of AI-powered counteroffensive systems." },
] as const;
export const aiSecurityAudiences = ["Security engineers & architects", "AI / ML practitioners", "CISOs & technical leaders", "Researchers in autonomous defense"] as const;
