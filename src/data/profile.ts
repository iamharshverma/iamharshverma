import portraitAsset from "@/assets/harsh-verma-portrait.jpg.asset.json";
export const IMG = "https://www.harshverma.me/images";

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
  { title: "Startup AI Strategy", desc: "Helping founders scope, build and scale AI products — from model choice to go-to-market.", org: "UC Berkeley SkyDeck" },
  { title: "Executive Thought Leadership", desc: "Published insights for CIOs and CTOs on autonomous agentic systems.", org: "Forbes Technology Council" },
  { title: "Mentoring Engineers", desc: "Guiding engineers to become Super Engineers across product, architecture and leadership.", org: "Raptors.Dev & communities" },
  { title: "AI Security Governance", desc: "Advising on secure AI architecture, threat modeling and governance for enterprises.", org: "Industry advisory" },
];
