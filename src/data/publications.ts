export type Publication = {
 number: number; slug: string; title: string; source: string; venue: string; publisher: string; date: string; year: number; status: "Published" | "Forthcoming" | "Under peer review"; category: string; abstract: string; topics: string[]; image: string; doi?: string; citationNote?: string; manuscript?: string; pdf?: string; researchGate?: string;
};
export const publicationSource = "https://www.harshverma.me/page-publications";
export const publications: Publication[] = [
  {
    "number": 1,
    "slug": "secure-real-time-heterogeneous-data-management-tool",
    "title": "Secure Real Time Heterogeneous Data Management Tool",
    "source": "https://ieeexplore.ieee.org/document/9014355",
    "venue": "IEEE International Conference on Cognitive Machine Learning (CogML) (2019)",
    "publisher": "IEEE Xplore",
    "date": "2019",
    "year": 2019,
    "status": "Published",
    "category": "IoT & Performance",
    "abstract": "Presents a novel architecture addressing the complexity of ingesting, validating, and managing real-time streaming data from heterogeneous IoT devices in parallel. Formulates a secure, low-latency edge-computing ingestion pipeline capable of sub-millisecond dispatch and tamper-evident stream verification.",
    "topics": [
      "AI engineering",
      "Distributed systems"
    ],
    "image": "/artwork/publications/paper-01.svg",
    "doi": "10.1109/CogML.2019.9014355"
  },
  {
    "number": 2,
    "slug": "real-time-analytics-performance-load-simulation-and-scaling",
    "title": "Real Time Analytics Performance Load Simulation and Scaling",
    "source": "https://www.ijcaonline.org/archives/volume176/number2/28523-2017915532/",
    "venue": "International Journal of Computer Applications (IJCA) • Vol. 176, No. 2 (2017)",
    "publisher": "IJCA Online",
    "date": "2017",
    "year": 2017,
    "status": "Published",
    "category": "IoT & Performance",
    "abstract": "Investigates performance benchmarking, simulated multi-tenant load characteristics, and horizontal auto-scaling algorithms for real-time analytics engines handling millions of concurrent metric streams with sustained throughput guarantees.",
    "topics": [
      "AI engineering",
      "Distributed systems"
    ],
    "image": "/artwork/publications/paper-02.svg",
    "doi": "10.5120/ijca2017915532"
  },
  {
    "number": 3,
    "slug": "explainable-ai-xai-for-software-engineering-decision-making",
    "title": "Explainable AI (XAI) for Software Engineering Decision-Making",
    "source": "https://www.ijircce.com/article/explainable-ai-xai-for-software-engineering-decision-making-18479",
    "venue": "International Journal of Innovative Research in Computer and Communication Engineering (IJIRCCE) (2024)",
    "publisher": "IJIRCCE / ResearchGate",
    "date": "2024",
    "year": 2024,
    "status": "Published",
    "category": "Software Engineering & Ethics",
    "abstract": "Explores interpretable machine learning frameworks integrated into DevOps, automated CI/CD code reviewing, and architecture decision-making, providing engineering leadership with actionable rationale and trust mechanisms behind automated AI recommendations.",
    "topics": [
      "AI engineering",
      "Agent trust"
    ],
    "image": "/artwork/publications/paper-03.svg",
    "doi": "10.15680/IJIRCCE.2024.1205018",
    "researchGate": "https://www.researchgate.net/publication/401693316_Explainable_AI_XAI_for_Software_Engineering_Decision-Making"
  },
  {
    "number": 4,
    "slug": "ethical-challenges-and-bias-mitigation-in-artificial-intelligence-systems",
    "title": "Ethical Challenges and Bias Mitigation in Artificial Intelligence Systems",
    "source": "https://wjarr.com/content/ethical-challenges-and-bias-mitigation-artificial-intelligence-systems",
    "venue": "World Journal of Advanced Research and Reviews (WJARR) • Vol. 28, No. 3 (2025)",
    "publisher": "WJARR",
    "date": "2025",
    "year": 2025,
    "status": "Published",
    "category": "Software Engineering & Ethics",
    "abstract": "Examines systemic algorithmic bias, training dataset imbalances, and demographic disparities in enterprise machine learning pipelines, proposing a mathematical governance framework for continuous fairness verification and bias mitigation at scale.",
    "topics": [
      "AI engineering",
      "Agent trust",
      "AI security"
    ],
    "image": "/artwork/publications/paper-04.svg",
    "doi": "10.30574/wjarr.2025.28.3.3904"
  },
  {
    "number": 5,
    "slug": "cloud-based-ai-systems-for-scalable-and-intelligent-software-applications",
    "title": "Cloud-Based AI Systems for Scalable and Intelligent Software Applications",
    "source": "https://wjarr.com/content/cloud-based-ai-systems-scalable-and-intelligent-software-applications",
    "venue": "World Journal of Advanced Research and Reviews (WJARR) • Vol. 29, No. 1 (2026)",
    "publisher": "WJARR",
    "date": "2026",
    "year": 2026,
    "status": "Published",
    "category": "Cloud & Infrastructure",
    "abstract": "Proposes unified architectural patterns for deploying foundation models and deep learning inference workloads across distributed multi-region cloud infrastructures with sub-second response times and elastic compute orchestration.",
    "topics": [
      "AI engineering",
      "Distributed systems"
    ],
    "image": "/artwork/publications/paper-05.svg",
    "doi": "10.30574/wjarr.2026.29.1.0077"
  },
  {
    "number": 6,
    "slug": "ai-driven-cybersecurity-in-software-engineering",
    "title": "AI-Driven Cybersecurity in Software Engineering",
    "source": "https://wjarr.com/content/ai-driven-cybersecurity-software-engineering",
    "venue": "World Journal of Advanced Research and Reviews (WJARR) • Vol. 27, No. 3 (2025)",
    "publisher": "WJARR",
    "date": "2025",
    "year": 2025,
    "status": "Published",
    "category": "AI Security & Trust",
    "abstract": "Analyzes the synergy between deep neural network anomaly detection and automated security pipelines in SDLC, demonstrating automated zero-day detection, code vulnerability identification, and intelligent threat remediation.",
    "topics": [
      "AI engineering",
      "AI security",
      "Agent trust",
      "Autonomous defense"
    ],
    "image": "/artwork/publications/paper-06.svg",
    "doi": "10.30574/wjarr.2025.27.3.3347"
  },
  {
    "number": 7,
    "slug": "future-trends-in-ai-machine-learning-and-big-data-implications-for-technical-leadership",
    "title": "Future Trends in AI, Machine Learning, and Big Data: Implications for Technical Leadership",
    "source": "https://www.ijeetr.com/index.php/ijeetr/article/view/925",
    "venue": "International Journal of Engineering & Extended Technologies Research (IJEETR) • Vol. 7, No. 4 (2025)",
    "publisher": "IJEETR",
    "date": "2025",
    "year": 2025,
    "status": "Published",
    "category": "Software Engineering & Ethics",
    "abstract": "Provides a strategic roadmap for engineering executives and CTOs on navigating technological shifts in generative foundation models, high-volume streaming data architectures, and organizational multi-agent team transformations.",
    "topics": [
      "AI engineering"
    ],
    "image": "/artwork/publications/paper-07.svg",
    "doi": "10.15662/IJEETR.2025.0704017"
  },
  {
    "number": 8,
    "slug": "agentic-workflows-for-end-to-end-software-engineering-automation",
    "title": "Agentic Workflows for End-to-End Software Engineering Automation",
    "source": "https://wjarr.com/content/agentic-workflows-end-end-software-engineering-automation",
    "venue": "World Journal of Advanced Research and Reviews (WJARR) • Vol. 25, No. 3 (2025)",
    "publisher": "WJARR",
    "date": "2025",
    "year": 2025,
    "status": "Published",
    "category": "AI Agentic Systems",
    "abstract": "Presents an end-to-end framework leveraging autonomous multi-agent systems to execute requirements engineering, architecture drafting, test-driven synthesis, and production deployment cycles without human-in-the-loop bottlenecks.",
    "topics": [
      "AI engineering",
      "Agentic AI"
    ],
    "image": "/artwork/publications/paper-08.svg",
    "doi": "10.30574/wjarr.2025.25.3.0887"
  },
  {
    "number": 9,
    "slug": "economic-impact-and-productivity-modeling-of-ai-agents",
    "title": "Economic Impact and Productivity Modeling of AI Agents",
    "source": "https://wjarr.com/content/economic-impact-and-productivity-modeling-ai-agents",
    "venue": "World Journal of Advanced Research and Reviews (WJARR) • Vol. 26, No. 3 (2025)",
    "publisher": "WJARR",
    "date": "2025",
    "year": 2025,
    "status": "Published",
    "category": "AI Agentic Systems",
    "abstract": "Develops a quantitative econometric productivity model mapping the integration of autonomous AI agents across modern software enterprises, measuring developer velocity multipliers and total cost of ownership reductions.",
    "topics": [
      "AI engineering",
      "Agentic AI"
    ],
    "image": "/artwork/publications/paper-09.svg",
    "doi": "10.30574/wjarr.2025.26.3.2304"
  },
  {
    "number": 10,
    "slug": "ai-agentic-architectures-for-autonomous-data-engineering-pipelines",
    "title": "AI Agentic Architectures for Autonomous Data Engineering Pipelines",
    "source": "https://ijrai.org/index.php/ijrai/article/view/589",
    "venue": "International Journal of Research and Applied Innovations (IJRAI) • Vol. 7, No. 6 (2024)",
    "publisher": "IJRAI",
    "date": "2024",
    "year": 2024,
    "status": "Published",
    "category": "AI Agentic Systems",
    "abstract": "Details dynamic autonomous agent configurations that automatically synthesize ETL/ELT pipelines, validate real-time schema drifts, reconcile corrupted data partitions, and optimize query workloads in cloud data lakes.",
    "topics": [
      "AI engineering",
      "Agentic AI",
      "Distributed systems"
    ],
    "image": "/artwork/publications/paper-10.svg",
    "doi": "10.15662/IJRAI.2024.0706041"
  },
  {
    "number": 11,
    "slug": "autonomous-multi-agent-systems-for-enterprise-decision-making",
    "title": "Autonomous Multi-Agent Systems for Enterprise Decision-Making",
    "source": "https://ijeetr.com/index.php/ijeetr/article/view/958/895",
    "venue": "International Journal of Engineering & Extended Technologies Research (IJEETR) • Vol. 6, No. 5 (2024)",
    "publisher": "IJEETR",
    "date": "2024",
    "year": 2024,
    "status": "Published",
    "category": "AI Agentic Systems",
    "abstract": "Introduces a collaborative multi-agent voting and deliberation hierarchy designed for high-consequence enterprise decision scenarios, ensuring consensus formation, verification, and auditability across heterogeneous models.",
    "topics": [
      "AI engineering",
      "Agentic AI",
      "Distributed systems",
      "Agent trust"
    ],
    "image": "/artwork/publications/paper-11.svg",
    "doi": "10.15662/IJEETR.2024.0605021"
  },
  {
    "number": 12,
    "slug": "security-in-multi-agent-ai-systems-modeling-emergent-vulnerabilities-via-trust-graphs",
    "title": "Security in Multi-Agent AI Systems: Modeling Emergent Vulnerabilities via Trust Graphs",
    "source": "https://ijsrm.net/index.php/ijsrm/article/view/6666",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 14, No. 4 (2026)",
    "publisher": "IJSRM",
    "date": "2026",
    "year": 2026,
    "status": "Published",
    "category": "AI Security & Trust",
    "abstract": "Constructs dynamic trust graph formalisms to evaluate privilege escalation, lateral prompt injection, and cascading failure propagation across distributed multi-agent collaborative networks.",
    "topics": [
      "AI engineering",
      "AI security",
      "Agent trust",
      "Agentic AI"
    ],
    "image": "/artwork/publications/paper-12.svg",
    "doi": "10.18535/ijsrm/v14i04.ec04"
  },
  {
    "number": 13,
    "slug": "clean-attacks-formalizing-semantically-valid-adversarial-behavior-in-autonomous-ai-agent-systems",
    "title": "Clean Attacks: Formalizing Semantically Valid Adversarial Behavior in Autonomous AI Agent Systems",
    "source": "https://ijsrm.net/index.php/ijsrm/article/view/6755",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 13, No. 10 (2025)",
    "publisher": "IJSRM",
    "date": "2025",
    "year": 2025,
    "status": "Published",
    "category": "AI Security & Trust",
    "abstract": "Defines and categorizes 'Clean Attacks'—adversarial inputs that bypass syntactical and semantic guardrails by strictly obeying schema and policy specifications while manipulating agent objective functions.",
    "topics": [
      "AI engineering",
      "AI security",
      "Agent trust",
      "Agentic AI"
    ],
    "image": "/artwork/publications/paper-13.svg",
    "doi": "10.18535/ijsrm/v13i10.ec03"
  },
  {
    "number": 14,
    "slug": "designing-self-healing-ai-agentic-systems-a-framework-for-autonomous-detection-and-response",
    "title": "Designing Self-Healing AI Agentic Systems: A Framework for Autonomous Detection and Response",
    "source": "https://ijsrm.net/index.php/ijsrm/article/view/6868",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 14, No. 6 (2026)",
    "publisher": "IJSRM",
    "date": "2026",
    "year": 2026,
    "status": "Published",
    "category": "AI Agentic Systems",
    "abstract": "Develops closed-loop supervisory controller architectures allowing agent swarms to monitor runtime drift, self-quarantine compromised agents, and synthesize remediation routines dynamically.",
    "topics": [
      "AI engineering",
      "Agentic AI",
      "Autonomous defense"
    ],
    "image": "/artwork/publications/paper-14.svg",
    "doi": "10.18535/ijsrm/v14i06.ec3",
    "citationNote": "The source archive lists the same DOI for two different papers. Confirm the identifier with the publisher before citing."
  },
  {
    "number": 15,
    "slug": "intent-based-security-replacing-identity-centric-trust-in-autonomous-ai-agentic-systems",
    "title": "Intent-Based Security: Replacing Identity-Centric Trust in Autonomous AI Agentic Systems",
    "source": "https://ijsrm.net/index.php/ijsrm/article/view/6977",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 14, No. 6 (2026)",
    "publisher": "IJSRM",
    "date": "2026",
    "year": 2026,
    "status": "Published",
    "category": "AI Security & Trust",
    "abstract": "Proves that traditional identity and RBAC paradigms fail under dynamic agent delegation, proposing an intent-based cryptographic capability protocol that evaluates purpose before granting execution privileges.",
    "topics": [
      "AI engineering",
      "AI security",
      "Agent trust",
      "Agentic AI"
    ],
    "image": "/artwork/publications/paper-15.svg",
    "doi": "10.18535/ijsrm/v14i06.ec3",
    "citationNote": "The source archive lists the same DOI for two different papers. Confirm the identifier with the publisher before citing."
  },
  {
    "number": 16,
    "slug": "policy-drift-in-learning-ai-agents-a-dynamical-systems-perspective-on-security-degradation",
    "title": "Policy Drift in Learning AI Agents: A Dynamical Systems Perspective on Security Degradation",
    "source": "https://ijsrm.net/index.php/ijsrm/article/view/6710",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 13, No. 7 (2025)",
    "publisher": "IJSRM",
    "date": "2025",
    "year": 2025,
    "status": "Published",
    "category": "AI Security & Trust",
    "abstract": "Models online reinforcement learning agents through the lens of non-linear dynamical systems, quantifying how incremental reward exploitation leads to safety policy erosion and boundary violations over time.",
    "topics": [
      "AI engineering",
      "AI security",
      "Agent trust",
      "Agentic AI"
    ],
    "image": "/artwork/publications/paper-16.svg",
    "doi": "10.18535/ijsrm/v13i07.ec08"
  },
  {
    "number": 17,
    "slug": "toward-a-unified-security-systems-theory-for-autonomous-ai-systems",
    "title": "Toward a Unified Security Systems Theory for Autonomous AI Systems",
    "source": "https://ijsrm.net/index.php/ijsrm/article/view/7251",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 14, No. 6 (2026)",
    "publisher": "IJSRM",
    "date": "2026",
    "year": 2026,
    "status": "Published",
    "category": "AI Security & Trust",
    "abstract": "Synthesizes control theory, cybernetics, and computer security into a holistic mathematical foundation for evaluating invariants, failure bounds, and safety margins across autonomous AI software systems.",
    "topics": [
      "AI engineering",
      "AI security",
      "Agent trust",
      "Agentic AI"
    ],
    "image": "/artwork/publications/paper-17.svg",
    "doi": "10.18535/ijsrm/v14i06.ec4"
  },
  {
    "number": 18,
    "slug": "ai-powered-anomaly-detection-in-cloud-based-applications",
    "title": "AI-Powered Anomaly Detection in Cloud-Based Applications",
    "source": "https://ijsrm.net/index.php/ijsrm/article/view/4774",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 12, No. 1 (2024)",
    "publisher": "IJSRM",
    "date": "2024",
    "year": 2024,
    "status": "Published",
    "category": "Cloud & Infrastructure",
    "abstract": "Presents real-time unsupervised clustering algorithms applied to high-throughput cloud telemetry, achieving over 99.4% precision in catching infrastructure latency anomalies and resource contention.",
    "topics": [
      "AI engineering",
      "Distributed systems"
    ],
    "image": "/artwork/publications/paper-18.svg",
    "doi": "10.18535/ijsrm/v12i01.ec07"
  },
  {
    "number": 19,
    "slug": "secure-ai-systems-protecting-machine-learning-models-from-emerging-cyber-threats",
    "title": "Secure AI Systems: Protecting Machine Learning Models from Emerging Cyber Threats",
    "source": "https://www.ijsrm.net/index.php/ijsrm/article/view/6677",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 13, No. 10 (2025)",
    "publisher": "IJSRM",
    "date": "2025",
    "year": 2025,
    "status": "Published",
    "category": "AI Security & Trust",
    "abstract": "Examines model extraction, membership inference, and training pipeline data poisoning vectors, formulating cryptographic watermarking and differential privacy bounds to preserve proprietary model integrity.",
    "topics": [
      "AI engineering",
      "AI security",
      "Agent trust"
    ],
    "image": "/artwork/publications/paper-19.svg",
    "doi": "10.18535/ijsrm/v13i10.ec04"
  },
  {
    "number": 20,
    "slug": "adversarial-machine-learning-security-risks-and-defense-strategies-in-ai-driven-applications",
    "title": "Adversarial Machine Learning: Security Risks and Defense Strategies in AI-Driven Applications",
    "source": "https://www.ijsrm.net/index.php/ijsrm/article/view/7002",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 14, No. 2 (2026)",
    "publisher": "IJSRM",
    "date": "2026",
    "year": 2026,
    "status": "Published",
    "category": "AI Security & Trust",
    "abstract": "Comprehensive analysis of perturbation-based evasion attacks against vision, NLP, and tabular classifiers, detailing certified robust optimization and randomized smoothing defenses.",
    "topics": [
      "AI engineering",
      "AI security",
      "Agent trust",
      "Autonomous defense"
    ],
    "image": "/artwork/publications/paper-20.svg",
    "doi": "10.18535/ijsrm/v14i02.ec04"
  },
  {
    "number": 21,
    "slug": "blockchain-enabled-artificial-intelligence-and-ai-agents-for-secure-data-sharing-and-cybersecurity-applications",
    "title": "Blockchain-Enabled Artificial Intelligence and AI Agents for Secure Data Sharing and Cybersecurity Applications",
    "source": "https://ijsrm.net/index.php/ijsrm/article/view/7958",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 14, No. 8 (2026)",
    "publisher": "IJSRM",
    "date": "2026",
    "year": 2026,
    "status": "Published",
    "category": "AI Security & Trust",
    "abstract": "Combines decentralized ledger smart contracts with autonomous AI agents to construct zero-knowledge verifiable audit trails and secure cross-organizational data federation networks.",
    "topics": [
      "AI engineering",
      "AI security",
      "Agent trust",
      "Agentic AI",
      "Distributed systems"
    ],
    "image": "/artwork/publications/paper-21.svg",
    "doi": "10.18535/ijsrm/v14i08.ec03"
  },
  {
    "number": 22,
    "slug": "automated-vulnerability-patching-in-legacy-code-using-llms-and-multi-ai-agents",
    "title": "Automated Vulnerability Patching in Legacy Code Using LLMs and Multi-AI Agents",
    "source": "https://ijsrm.net/index.php/ijsrm/article/view/7194",
    "venue": "International Journal of Scientific Research and Management (IJSRM) • Vol. 14, No. 4 (2026)",
    "publisher": "IJSRM",
    "date": "2026",
    "year": 2026,
    "status": "Published",
    "category": "AI Agentic Systems",
    "abstract": "Introduces an autonomous agentic refactoring engine that parses legacy codebases, pinpoints security vulnerabilities, synthesizes semantic patches using LLMs, and verifies regression-free builds with automated fuzzing suites.",
    "topics": [
      "AI engineering",
      "Agentic AI",
      "Autonomous defense"
    ],
    "image": "/artwork/publications/paper-22.svg",
    "doi": "10.18535/ijsrm/v14i04.ec05"
  },
  {
    "number": 23,
    "slug": "multi-agent-differential-evolution-based-trajectory-planning-ma-debtp-for-delay-sensitive-data-collection-in-intermittently-connected-delay-tolerant-wireless-sensor-networks",
    "title": "Multi-Agent Differential Evolution-Based Trajectory Planning (MA-DEBTP) for Delay-Sensitive Data Collection in Intermittently Connected Delay Tolerant Wireless Sensor Networks",
    "source": "https://www.icaccm.in/index.php",
    "venue": "International Conference on Advances in Computing, Communication and Materials (ICACCM) 2026 • Conference Proceedings (Nov 2026)",
    "publisher": "ICACCM 2026",
    "date": "Nov 2026",
    "year": 2026,
    "status": "Forthcoming",
    "category": "IoT & Performance",
    "abstract": "Proposes a Multi-Agent Differential Evolution-Based Trajectory Planning (MA-DEBTP) framework for mobile data collectors (MDCs) operating in intermittently connected, delay-tolerant wireless sensor networks (DT-WSNs). The architecture leverages decentralized multi-agent coordination coupled with differential evolution optimization to compute energy-efficient, latency-bounded trajectories. By dynamically adapting to intermittent connectivity, non-uniform node distribution, and strict buffer deadlines, the MA-DEBTP framework minimizes packet drop ratios while maximizing data gathering throughput across dispersed sensor fields.",
    "topics": [
      "AI engineering",
      "Agentic AI",
      "Distributed systems"
    ],
    "image": "/artwork/publications/paper-23.svg"
  },
  {
    "number": 24,
    "slug": "data-quality-feature-engineering-and-model-reliability-in-large-scale-ai-multi-agentic-systems",
    "title": "Data Quality, Feature Engineering, and Model Reliability in Large-Scale AI Multi-Agentic Systems",
    "source": "https://eajournals.org/ejcsit/vol-9-issue-4-2021/data-quality-feature-engineering-and-model-reliability-in-large-scale-ai-multi-agentic-systems/",
    "venue": "European Journal of Computer Science and Information Technology (EJCSIT) • Vol. 9, Issue 4, pp. 91-110 (2021)",
    "publisher": "European Centre for Research Training and Development UK (ECRTD)",
    "date": "May 30, 2021",
    "year": 2021,
    "status": "Published",
    "category": "AI Agentic Systems",
    "abstract": "Investigates the foundational interplay between input data quality, automated feature engineering pipelines, and runtime model reliability across large-scale artificial intelligence multi-agentic systems. Formulates rigorous statistical validation heuristics, drift-detection boundaries, and fault-tolerant orchestration protocols that prevent cascading hallucination, epistemic uncertainty amplification, and consensus degradation in distributed enterprise agent ecosystems.",
    "topics": [
      "AI engineering",
      "Agentic AI",
      "Distributed systems",
      "Agent trust"
    ],
    "image": "/artwork/publications/paper-24.svg",
    "doi": "10.37745/ejcsit.2013/vol9n491110"
  },
  {
    "number": 25,
    "slug": "scalable-real-time-data-pipelines-for-ai-and-machine-learning-driven-enterprise-systems",
    "title": "Scalable Real-Time Data Pipelines for AI and Machine Learning–Driven Enterprise Systems",
    "source": "https://eajournals.org/ejcsit/vol-8-issue-5-november-2020/scalable-real-time-data-pipelines-for-ai-and-machine-learning-driven-enterprise-systems/",
    "venue": "European Journal of Computer Science and Information Technology (EJCSIT) • Vol. 8, Issue 5, pp. 69-86 (2020)",
    "publisher": "European Centre for Research Training and Development UK (ECRTD)",
    "date": "December 30, 2020",
    "year": 2020,
    "status": "Published",
    "category": "Cloud & Infrastructure",
    "abstract": "The growth of enterprise data volumes across the 2000s and 2010s pushed traditional batch-oriented data processing infrastructures past their practical limits, motivating a sustained shift toward distributed, stream-based architectures capable of supporting real-time analytics and machine learning (ML). This article synthesizes foundational and applied research on distributed batch processing, distributed structured and key-value storage, early continuous query engines, in-memory cluster computing, micro-batch and internet-scale stream processing, log-based messaging, and unified batch/streaming programming models, to examine how scalable real-time data pipelines can be designed to support artificial intelligence (AI) and ML-driven enterprise systems. Proposes a five-layer architectural framework—ingestion, stream processing, batch/model training, durable storage, and analytics/serving—and evaluates quantitative performance, scalability mechanisms, fault-tolerance strategies, and enterprise implementation challenges across modern AI infrastructure.",
    "topics": [
      "AI engineering",
      "Distributed systems"
    ],
    "image": "/artwork/publications/paper-25.svg",
    "doi": "10.37745/ejcsit.2013/vol8n56986"
  },
  {
    "number": 26,
    "slug": "beyond-models-building-trusted-ai-in-the-age-of-autonomous-agents",
    "title": "Beyond Models: Building Trusted AI in the Age of Autonomous Agents",
    "source": "https://proceedings.raptors.dev/verma-trusted-ai-autonomous-agents/",
    "venue": "Proceedings of the Raptors Conference (Raptors Conference 2026) • Vol. 1 (2026)",
    "publisher": "Hackathon Raptors (Raptors.Dev)",
    "date": "Sep 2026",
    "year": 2026,
    "status": "Published",
    "category": "AI Security & Trust",
    "abstract": "Introduces the emerging paradigm of multi-agentic AI in cybersecurity, where systems evolve from passive tools to autonomous decision-making entities. Explores the rise of agentic AI and its transformative impact on modern cybersecurity. As AI systems evolve from assistive tools into autonomous agents capable of independent decision-making and action, they introduce a new class of dynamic, fast-moving, and highly adaptive threats. Examines the architecture and behavior of these agents, highlighting critical vulnerabilities that emerge from autonomy, orchestration, and trust dependencies, presenting the concept of a 'lethal trifecta' of risks that redefine traditional security boundaries. Outlines a defense-first approach grounded in observability, governance, and secure infrastructure design, emphasizing a shift toward 'secure-by-design' principles and actionable frameworks to design resilient, trustworthy agentic systems.",
    "topics": [
      "AI engineering",
      "AI security",
      "Agent trust",
      "Agentic AI",
      "Autonomous defense"
    ],
    "image": "/artwork/publications/paper-26.svg",
    "doi": "10.68495/rc.2026.C025",
    "pdf": "https://proceedings.raptors.dev/pdf/verma-trusted-ai-autonomous-agents.pdf"
  },
  {
    "number": 27,
    "slug": "deica-ml-a-multi-layer-differential-evolution-based-improved-clustering-algorithm-for-iot-based-heterogeneous-wireless-sensor-networks",
    "title": "DEICA-ML: A Multi-Layer Differential Evolution-Based Improved Clustering Algorithm for IoT-Based Heterogeneous Wireless Sensor Networks",
    "source": "https://ieeeaccess.ieee.org/",
    "venue": "IEEE Access • Manuscript ID: **Access-2026-52653** (Submitted: October 13, 2026)",
    "publisher": "IEEE",
    "date": "Oct 13, 2026",
    "year": 2026,
    "status": "Under peer review",
    "category": "IoT & Performance",
    "abstract": "Proposes DEICA-ML, a novel multi-layer differential evolution-based improved clustering algorithm engineered for IoT-based heterogeneous wireless sensor networks (HWSNs). Formulates an adaptive cluster-head selection and energy-efficient data transmission architecture optimizing network longevity, throughput, and cross-tier load balancing under non-uniform sensor deployment.",
    "topics": [
      "AI engineering",
      "Distributed systems"
    ],
    "image": "/artwork/publications/paper-27.svg",
    "manuscript": "Access-2026-52653"
  }
];
export const publicationCategories = [...new Set(publications.map(p => p.category))];
export function filterPublications(query: string, category = "", status = "", year = "") {
 const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 return publications.filter(p => (!category || p.category === category) && (!status || p.status === status) && (!year || String(p.year) === year) && words.every(word => [p.title, p.abstract, p.publisher, p.doi ?? "", ...p.topics].join(" ").toLowerCase().includes(word)));
}
export function publicationCitation(p: Publication) { return `Verma, H. (${p.year}). ${p.title}. ${p.venue}. ${p.doi && !p.citationNote ? `https://doi.org/${p.doi}` : p.source}${p.status !== "Published" ? ` [${p.status}]` : ""}`; }
