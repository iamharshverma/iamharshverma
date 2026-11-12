import portraitAsset from "@/assets/harsh-verma-portrait.jpg.asset.json";
import executiveAsset from "@/assets/harsh-verma-executive.jpg.asset.json";
import speakerAsset from "@/assets/harsh-verma-speaker.jpg.asset.json";
import authorAsset from "@/assets/harsh-verma-author.jpg.asset.json";
import profileAsset from "@/assets/harsh-verma-professional-profile.jpg.asset.json";

export const rolePortraits: Record<string, { src: string; caption: string }> = {
  "Principal AI Engineer": { src: executiveAsset.url, caption: "Agentic AI & AI Security · Palo Alto Networks" },
  Speaker: { src: speakerAsset.url, caption: "Keynotes on agentic AI & AI security" },
  Investor: { src: executiveAsset.url, caption: "Backing founders building with AI" },
  Author: { src: authorAsset.url, caption: "Two books · Coming January 2027" },
  Advisor: { src: executiveAsset.url, caption: "Startup AI strategy & governance" },
  Researcher: { src: portraitAsset.url, caption: "27+ papers · 6 patents" },
};
export const portraitGallery = [
  { src: executiveAsset.url, label: "The Engineer", note: "Architecting autonomous agent systems and AI security at enterprise scale." },
  { src: speakerAsset.url, label: "The Speaker", note: "Bringing research to stages, panels and boardrooms around the world." },
  { src: authorAsset.url, label: "The Author", note: "Writing the playbooks for the agentic AI era — two books in January 2027." },
];
export const IMG = "https://www.harshverma.me/images";
export const orbitPortraits = [
  { src: executiveAsset.url, label: "Engineer", to: "/harsh-verma-ai-speaker" },
  { src: speakerAsset.url, label: "Speaker", to: "/speaking" },
  { src: authorAsset.url, label: "Author", to: "/books" },
  { src: portraitAsset.url, label: "Researcher", to: "/research" },
  { src: profileAsset.url, label: "Advisor", to: "/advisory" },
] as const;

export const profile = {
  name: "Harsh Verma",
  title: "Principal Software Engineer in AI",
  company: "Palo Alto Networks",
  email: "harshverma59@gmail.com",
  location: "San Francisco Bay Area, California",
  portrait: portraitAsset.url,
  stagePhoto: `${IMG}/harsh/Harsh_portfolio_pic.png`,
  stanfordPhoto: `${IMG}/harsh_stanford.jpg`,
  roles: ["Principal AI Engineer", "Speaker", "Investor", "Author", "Advisor", "Researcher"],
  tagline:
    "Architecting next-generation enterprise autonomous agent systems, AI security governance, and scalable intelligence.",
  quote: "Future belongs to those who see possibilities before they become obvious.",
  bio: "Harsh Verma is a Principal Software Engineer in AI at Palo Alto Networks, focused on advancing autonomous agent systems and intelligent AI strategies. A Forbes Technology Council member, speaker, mentor, and advisor, he brings both technical depth and strategic guidance to leaders adopting next-generation AI. He drives responsible, scalable AI adoption — shaping how enterprises innovate, secure, and operationalize intelligent systems.",
  philosophy: [
    { p: "Passion", d: "Researcher by passion — curiosity is the engine of every system worth building." },
    { p: "Persistence", d: "12+ years of turning hard problems into production systems at scale." },
    { p: "People", d: "Learning, growing and solving problems mutually with teams and founders." },
  ],
};

export const stats = [
  { value: 12, suffix: "+", label: "Years AI / Tech impact" },
  { value: 27, suffix: "+", label: "Peer-reviewed papers" },
  { value: 6, suffix: "", label: "Enterprise patents" },
  { value: 44, suffix: "+", label: "Global press features" },
];

export const aboutBackground = [
  "Based in the San Francisco Bay Area, Harsh brings an engineering mindset to the intersection of artificial intelligence, cybersecurity and enterprise strategy. His work spans machine learning, distributed systems and autonomous agents, with a focus on making intelligent systems responsible, secure and practical at scale.",
  "His academic journey began with a B.Tech (Hons.) in Computer Science and Engineering at Uttarakhand Technical University, where he ranked third in the university. He went on to study Computer Science and Data Science at The University of Texas at Dallas, then pursued leadership and entrepreneurship through Stanford Graduate School of Business's executive business program.",
  "Before joining Palo Alto Networks in 2020, Harsh worked on computer vision at Hypergiant Sensory Science and real-time object tracking and spatial analytics at Worlds Enterprises. At Palo Alto Networks, his work includes enterprise AI/ML, firewall models, cloud security services and autonomous security-policy recommendations.",
  "Beyond his engineering work, Harsh writes for Forbes Technology Council, delivers keynotes on agentic AI and security, and mentors through communities including UC Berkeley SkyDeck. His two upcoming books, Beyond AI Engineering and AI vs. AI, bring his engineering and security perspectives to the agentic era and are both coming in January 2027.",
];

export const links = {
  linkedin: "https://www.linkedin.com/in/harshverma59/",
  github: "https://github.com/iamharshverma",
  scholar: "https://scholar.google.com/citations?user=zSt9oRMAAAAJ&hl=en",
  forbes: "https://www.forbes.com/councils/forbestechcouncil/people/harshverma/",
  theorg: "https://theorg.com/org/palo-alto-networks/person/harsh-verma",
  bio: "https://harshverma.bio/",
  mastodon: "https://mastodon.social/@harshverma59",
};

export const experience = [
  { period: "Aug 2020 — Present", role: "Principal Software Engineer in AI | ML", org: "Palo Alto Networks", place: "Santa Clara, CA",
    points: ["Pioneering enterprise AI/ML at the intersection of cybersecurity, big data science and distributed systems.", "Architecting firewall ML models and high-throughput cloud security services.", "Building autonomous security-policy improvement and real-time recommendation engines."],
    tech: ["Security", "Machine Learning", "Spark", "Kafka", "GCP"] },
  { period: "Jan 2020 — May 2020", role: "Machine Learning Engineer", org: "Worlds Enterprises Inc.", place: "Dallas, TX",
    points: ["Real-time streaming object tracking, detection and spatial analytics.", "Built an end-to-end MOTA evaluation benchmark pipeline.", "Low-latency vision inference across distributed Spark clusters."],
    tech: ["Python", "TensorFlow", "YOLOv3", "DeepSort"] },
  { period: "Sept 2019 — Jan 2020", role: "Machine Learning Engineer", org: "Hypergiant Sensory Science", place: "Austin, TX",
    points: ["Facial detection and verification modules for vision pipelines.", "Video and image similarity retrieval with FAISS vector embeddings."],
    tech: ["Computer Vision", "FAISS", "Deep Learning"] },
];

export const education = [
  { period: "2021 — 2022", school: "Stanford Graduate School of Business", degree: "Executive Business Program — Leadership & Entrepreneurship", logo: `${IMG}/logos/stanford_logo.jpeg` },
  { period: "2018 — 2020", school: "The University of Texas at Dallas", degree: "M.S. Computer Science — Data Science (AI, NLP, Deep Learning, Big Data)", logo: `${IMG}/logos/utd_education_logo.png` },
  { period: "2011 — 2015", school: "Uttarakhand Technical University", degree: "B.Tech (Hons.) CSE — Ranked 3rd in University, top 0.1%", logo: `${IMG}/logos/utu.png` },
];

export const memberships = [
  { name: "Forbes Technology Council", note: "Official Council Member & Author", href: links.forbes },
  { name: "IEEE Senior Member", note: "Top 10% worldwide", href: "https://ieee-collabratec.ieee.org/app/p/HarshVerma59" },
  { name: "Sigma Xi Honor Society", note: "Elected Full Member · AI Research", href: "https://www.sigmaxi.org/" },
  { name: "UC Berkeley SkyDeck", note: "Global Advisor & Startup Mentor", href: "https://skydeck.berkeley.edu/advisors/" },
  { name: "Royal Society of Arts", note: "Fellow (FRSA) · Ethical AI", href: "https://www.thersa.org/" },
  { name: "Google Developer Expert", note: "GDE · AI & Google Cloud", href: "https://me.developers.google.com/communities/experts?q=harsh%20verma" },
  { name: "BCS Fellow (FBCS)", note: "The Chartered Institute for IT", href: "https://www.bcs.org/find-a-bcs-member/" },
  { name: "IOASD Royal Fellow", note: "FRIOASD-1066-2026", href: "https://ioasd.org/royal-fellows/membership-id-frioasd-1066-2026/" },
  { name: "Raptors.Dev Fellowship", note: "Fellow · Engineering Leadership", href: "https://www.raptors.dev/fellow-membership" },
];

export const expertise = [
  { name: "Agentic AI", x: 50, y: 16, level: 96, since: 2023, role: "Founder lens",
    desc: "Designing autonomous multi-agent systems and enterprise copilots with verified decision loops, authority boundaries and human-in-the-loop guardrails.",
    proof: ["4 pending patents on agentic AI & copilots", "ACM keynote: When Enterprises Become Multi-Agent Systems", "Book: Beyond AI Engineering"], tools: ["LLM orchestration", "Tool use", "Evals", "Guardrails"] },
  { name: "AI Security", x: 82, y: 36, level: 95, since: 2020, role: "Engineer lens",
    desc: "Building the 'AI vs AI' defense paradigm — securing agent supply chains, prompt provenance and runtime safety at Palo Alto Networks scale.",
    proof: ["NVTC Cyber50 Honoree 2026", "SkyDeck keynote: The Era of Agentic Security", "Book: AI vs. AI"], tools: ["Threat modeling", "Zero Trust", "Red-teaming", "Policy ML"] },
  { name: "Machine Learning", x: 20, y: 34, level: 94, since: 2014, role: "Engineer lens",
    desc: "End-to-end ML for production — firewall models, recommendation engines and real-time inference on high-volume telemetry.",
    proof: ["Firewall ML models at Palo Alto Networks", "27+ peer-reviewed papers", "IEEE Senior Member"], tools: ["TensorFlow", "PyTorch", "Spark ML", "MLOps"] },
  { name: "NLP", x: 12, y: 68, level: 88, since: 2018, role: "Researcher lens",
    desc: "Language understanding from classic IR pipelines to LLM-era retrieval, summarization and grounded generation.",
    proof: ["Lexer & inverted-index retrieval pipeline", "UT Dallas M.S. NLP track"], tools: ["Transformers", "RAG", "Embeddings"] },
  { name: "Computer Vision", x: 44, y: 56, level: 87, since: 2018, role: "Researcher lens",
    desc: "Real-time object detection, tracking and similarity search for streaming video.",
    proof: ["MOTA benchmark pipeline at Worlds Enterprises", "FAISS similarity retrieval at Hypergiant", "IEEE CogML 2019"], tools: ["YOLO", "DeepSort", "FAISS", "CNNs"] },
  { name: "Big Data", x: 74, y: 76, level: 92, since: 2015, role: "Engineer lens",
    desc: "Platforms that process massive traffic logs and telemetry streams reliably and cheaply.",
    proof: ["Telemetry platforms at Palo Alto Networks", "Hadoop distributed social network"], tools: ["Spark", "Kafka", "Hadoop", "GCP"] },
  { name: "System Design", x: 38, y: 88, level: 93, since: 2015, role: "Founder lens",
    desc: "Distributed, lock-free and high-throughput systems built for scale and maintainability.",
    proof: ["Lock-free concurrent hash table", "Sub-ms microservice engine", "Granted load-testing patent"], tools: ["Distributed systems", "Concurrency", "APIs"] },
  { name: "Public Speaking", x: 88, y: 60, level: 90, since: 2019, role: "Speaker lens",
    desc: "Keynotes, panels and masterclasses translating deep technical work into clear strategy for leaders and builders.",
    proof: ["43+ engagements", "UC Berkeley SkyDeck & ACM keynotes", "34 judging & mentorship roles"], tools: ["Keynotes", "Panels", "Workshops"] },
];

export type Award = { title: string; org: string; cat: "Leadership" | "Cybersecurity" | "Academic"; badge: string; img: string; desc: string };
export const awards: Award[] = [
  { title: "Forttuna Global 100: The Power List 2026", org: "Forttuna Global Foundation", cat: "Leadership", badge: "Honoree", img: `${IMG}/awards/forttuna_powerlist.svg`, desc: "Visionary leaders shaping the future of business, technology and AI." },
  { title: "2026 NVTC Cyber50 Honoree", org: "Northern Virginia Technology Council", cat: "Cybersecurity", badge: "Honoree", img: `${IMG}/awards/nvtc_cyber50.svg`, desc: "Groundbreaking accomplishments in enterprise defense and secure AI architectures." },
  { title: "TITAN Innovation Awards: AI Innovation", org: "TITAN Innovation Awards · IAA", cat: "Cybersecurity", badge: "Winner", img: `${IMG}/awards/titan_innovation_awards.svg`, desc: "Pioneering agentic AI and an adaptive 'AI vs AI' defense paradigm." },
  { title: "Nobel Technology Awards 2026 — Gold", org: "Globee Winner's Circle", cat: "Cybersecurity", badge: "Gold", img: `${IMG}/awards/nobel_tech_awards.svg`, desc: "Next-generation secure AI and autonomous threat mitigation." },
  { title: "Global Recognition Award: AI Innovator of the Year", org: "Global Recognition Awards™", cat: "Cybersecurity", badge: "Innovator", img: `${IMG}/awards/global_recognition_award.svg`, desc: "Measurable advances in enterprise AI, copilots and security infrastructure." },
  { title: "American Business Awards®: AI Innovator of the Year", org: "Stevie® Awards", cat: "Cybersecurity", badge: "Gold Stevie", img: `${IMG}/awards/stevie_gold.svg`, desc: "Groundbreaking contributions in enterprise generative AI." },
  { title: "Cybersecurity Excellence Awards: Dual Recognition", org: "World's Top Cybersecurity Achievements", cat: "Cybersecurity", badge: "Dual", img: `${IMG}/awards/globee_silver.svg`, desc: "Community Choice and Silver Award in AI & Cybersecurity Innovation." },
  { title: "Stanford GSB LEAD Distinguished Scholar", org: "Stanford GSB", cat: "Academic", badge: "Scholar", img: `${IMG}/awards/stanford_scholar.svg`, desc: "Flagship executive leadership and corporate innovation program." },
  { title: "Forbes Technology Council", org: "Forbes", cat: "Leadership", badge: "Member", img: `${IMG}/awards/forbes_recognition.svg`, desc: "Invite-only council of world-class CIOs, CTOs and tech leaders." },
  { title: "IFGICT Royal Fellowship Award", org: "IFGICT (UN-ITU Partner)", cat: "Leadership", badge: "Royal Fellow", img: `${IMG}/awards/ifgict_fellowship_award.svg`, desc: "Global contributions in sustainable computing and AI standards." },
  { title: "MIT Innovation & Leadership Recognition", org: "MIT", cat: "Academic", badge: "Distinction", img: `${IMG}/awards/mit_bootcamp.svg`, desc: "Innovation & Technology Entrepreneurship program." },
  { title: "International AI Data Scientist Awards", org: "Association of Data Scientists", cat: "Academic", badge: "Innovator", img: `${IMG}/awards/ais_innovator.svg`, desc: "High-impact contributions to explainable and trustworthy AI." },
];

export type Work = { kind: "Patent" | "Paper" | "Book" | "Project"; title: string; meta: string; year: number; desc: string; href?: string; img?: string };
export const research: Work[] = [
  { kind: "Book", title: "AI vs. AI — Engineering the Cybersecurity Counteroffensive", meta: "Coming late Oct 2026", year: 2026, img: `${IMG}/books/ai_vs_ai_cover.jpg`, desc: "Building autonomous, real-time AI counteroffensive architectures against weaponized AI." },
  { kind: "Book", title: "Beyond AI Engineering — From Creator to Curator", meta: "Coming 2026", year: 2026, img: `${IMG}/books/beyond_ai_engineering_cover.jpg`, desc: "Becoming a Super Engineer and leading the AI agent revolution." },
  { kind: "Patent", title: "Agentic AI, Enterprise Copilot Systems & Copilot Navigation", meta: "4 pending · Assignee: Palo Alto Networks", year: 2025, desc: "Foundational IP in autonomous agent orchestration and copilot reasoning loops." },
  { kind: "Patent", title: "Load Testing of a Social Networking Application", meta: "Granted · Patent No. 555747 · IP India", year: 2024, desc: "Distributed multi-tenant simulation and real-time performance analytics." },
  { kind: "Patent", title: "COVID Preventive Automated Entry Point (COPAEP)", meta: "Granted · Patent No. 606481 · IP India", year: 2022, desc: "Integrated non-contact thermal scanning and sanitization system." },
  { kind: "Paper", title: "IEEE CogML 2019 — Secure real-time streaming with deep learning", meta: "IEEE Conference", year: 2019, img: `${IMG}/blog/IEEE_cogML.png`, href: links.scholar, desc: "Research on secure real-time data management with AI and computer vision." },
  { kind: "Paper", title: "27+ peer-reviewed publications", meta: "Google Scholar", year: 2025, href: links.scholar, desc: "Full citation list across AI security, vision, NLP and distributed systems." },
  { kind: "Project", title: "Lock-Free Concurrent Hash Table", meta: "Systems · Atomic CAS", year: 2019, href: "https://github.com/iamharshverma/JavaHashTableCustomImplementation", desc: "Lock-free concurrent map using compare-and-swap with Robin Hood hashing." },
  { kind: "Project", title: "Hadoop Distributed Social Network", meta: "Distributed · MapReduce", year: 2019, href: "https://github.com/iamharshverma/BigData-Hadoop_SocialNetwork", desc: "Multi-terabyte social graph processing on HDFS." },
  { kind: "Project", title: "Lexer & Inverted Index Pipeline", meta: "IR · NLP", year: 2019, href: "https://github.com/iamharshverma/TokanizeAndStemming", desc: "Porter stemming and inverted index for fast full-text retrieval." },
  { kind: "Project", title: "SkipList Probabilistic Index", meta: "Algorithms · O(log N)", year: 2018, href: "https://github.com/iamharshverma/SkipLists", desc: "Layered probabilistic index without tree rebalancing." },
];

export const communities = ["Palo Alto Networks", "Forbes Tech Council", "IEEE", "Stanford GSB", "UC Berkeley SkyDeck", "Sigma Xi", "BCS", "ODSC", "HackUTD", "Hackmakers", "SIIM", "Google Developer Experts"];

export const speaking = [
  { title: "Agentic AI in the Enterprise", type: "Keynote", desc: "How autonomous agents move from demos to governed, production-grade systems." },
  { title: "AI vs AI: The Security Counteroffensive", type: "Keynote", desc: "Defending against adversaries who wield AI — architectures and case studies." },
  { title: "Responsible & Scalable AI Adoption", type: "Panel", desc: "Strategy for leaders operationalizing AI safely across the organization." },
  { title: "Hackathon Judge & Mentor", type: "Judging", desc: "HackUTD, Hackmakers global AI challenges, ODSC and SIIM communities." },
];

export const advisory = [
  { title: "Enterprise AI Strategy", desc: "Helping enterprise and founding teams scope, build and scale agentic AI products — from model choice to go-to-market.", org: "UC Berkeley SkyDeck",
    outcomes: ["AI opportunity map ranked by value and risk", "Build vs. buy vs. partner decisions", "90-day agentic AI roadmap"], forWho: "CTOs, product leaders and founders" },
  { title: "Executive Thought Leadership", desc: "Published insights for CIOs and CTOs on autonomous agentic systems.", org: "Forbes Technology Council",
    outcomes: ["Board-ready AI briefings", "Executive workshops on agentic AI", "Narrative for customers and investors"], forWho: "CIOs, CTOs and leadership teams" },
  { title: "Mentoring Engineers", desc: "Guiding engineers to become Super Engineers across product, architecture and leadership.", org: "Raptors.Dev & communities",
    outcomes: ["Architecture and design reviews", "Career growth to staff and principal", "AI engineering best practices"], forWho: "Engineers and tech leads" },
  { title: "AI Security Governance", desc: "Advising on secure AI architecture, threat modeling and governance for enterprises.", org: "Industry advisory",
    outcomes: ["Threat model for LLM and agent systems", "Guardrails, evaluation and audit trails", "Responsible AI governance framework"], forWho: "Security, risk and platform teams" },
];

export const advisoryProcess = [
  { step: "Discover", desc: "A focused call to understand your goals, constraints and where AI can create real value." },
  { step: "Diagnose", desc: "Review of architecture, data, security posture and team readiness." },
  { step: "Design", desc: "A clear roadmap with priorities, trust guardrails and success metrics." },
  { step: "Deliver", desc: "Ongoing reviews and sprints so agents reach production safely." },
];

export const advisoryFaq = [
  { q: "What does an advisory engagement look like?", a: "Typically monthly architecture reviews and strategy sessions, plus async support. Scope is tailored to your stage and goals." },
  { q: "Do you work with enterprises or startups?", a: "Both. The focus is enterprise-grade agentic AI — secure, governed and scalable — whether you are a global company or an ambitious founding team." },
  { q: "Can you advise on AI security specifically?", a: "Yes. AI security, threat modeling for LLM and agent systems, and governance are core areas of expertise." },
  { q: "How do I get started?", a: "Send a short brief through the booking page with your goals and timeline. You will hear back to schedule a discovery call." },
];
