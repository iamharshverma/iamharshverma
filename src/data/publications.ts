export type Publication = {
 number: number; slug: string; title: string; source: string; venue: string; publisher: string; date: string; year: number; status: "Published" | "Forthcoming" | "Under peer review"; category: string; abstract: string; abstractSource?: "publisher" | "archive"; topics: string[]; image: string; doi?: string; citationNote?: string; manuscript?: string; pdf?: string; researchGate?: string;
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
    abstract: "Presents a novel architecture addressing the complexity of ingesting, validating, and managing real-time streaming data from heterogeneous IoT devices in parallel. Formulates a secure, low-latency edge-computing ingestion pipeline capable of sub-millisecond dispatch and tamper-evident stream verification.",
    "abstractSource": "archive",
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
    abstract: "Any application developed for millions of users requires being tested for its performance, scale, UI and backend aspects. Some of the existing load test tools like JMeter, Tsung, MQTT Malaria do not provide a generic interface to mimic all real-time scenarios. The existing tools can help in achieving a high scale load but do not help in following a user journey of an application at a vast scale where user journey refers to follow actual action path user perform while using the application in real time. The solution to this is the analytic approach used to perform user journey in the application, which helps in identifying bottleneck and stress point easily. In this paper, the focus is on an analytical load testing tool and approach used for load testing various services supporting any protocol. The tool approach comprises robust modular design pattern, scalable for incorporating any new test plan for a load test. A dynamically synchronize report shows graphical stats generated after every load test execution which can be analyzed to detect endpoints. The proposed approach helps to stress the backend/DB/Caches both vertically & horizontally supporting any protocol. The work demonstrates architectural design pattern, generation and execution of test plan and load simulation by analytic Load Runner tool. The framework can mimic the real-time user scenarios and generate specific load.",
    "abstractSource": "publisher",
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
    abstract: "Explores interpretable machine learning frameworks integrated into DevOps, automated CI/CD code reviewing, and architecture decision-making, providing engineering leadership with actionable rationale and trust mechanisms behind automated AI recommendations.",
    "abstractSource": "archive",
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
    abstract: "Artificial Intelligence (AI) has rapidly become central to decision‑making in healthcare, finance, governance, and education. Yet this progress has introduced serious ethical challenges, particularly bias, fairness, transparency, and accountability. Recent empirical studies confirm that algorithmic bias remains a persistent issue. Facial recognition systems, for instance, continue to misclassify women and people of color at rates up to 30% higher than white men (Buolamwini & Gebru, 2018; Raji et al., 2024). In healthcare, diagnostic AI models trained on skewed datasets underperform for minority populations, raising concerns about equitable access to care (Chen et al., 2023). This paper provides a critical evaluation of these ethical issues and explores mitigation measures through a systematic literature review of peer‑reviewed articles, conference papers, and policy reports. Findings indicate that AI bias is primarily influenced by disparities in training data, algorithm design, and embedded social inequalities. These prejudices often lead to discriminatory outcomes that reinforce existing inequities. Other significant ethical concerns include the lack of transparency, breaches of privacy, and unclear accountability due to the “black box” nature of many AI systems. Recent developments highlight promising directions, such as explainable AI, fairness‑conscious algorithms, and regulatory frameworks like the EU AI Act (European Commission, 2024) and the NIST AI Risk Management Framework (NIST, 2023). While these initiatives represent meaningful progress, gaps remain in standardizing fairness measures and ensuring global governance. The paper concludes that future research should prioritize interdisciplinary collaboration, robust regulatory frameworks, and continuous monitoring to promote the ethical use of AI.",
    "abstractSource": "publisher",
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
    abstract: "The speed of cloud computing and artificial intelligence, which have transformed the way software applications are designed and deployed. The cloud-based AI systems provide a scalable, adaptable, and cost-efficient solution to build intelligent systems capable of processing large amounts of data and running complicated computations in real-time. The paper is intended to address the design, deployment, and performance of cloud-based AI systems, especially scalability, system intelligence, and efficiency. It talks about the architecture, implementation, and integration of machine learning algorithms in the cloud. The effectiveness of cloud-based AI systems, in this study, was determined using a mixed-method approach, which included the analysis of system design, experimentation, and performance benchmarking. these systems significantly provide the scaling effect due to the dynamically allocated resources, enhance system intelligence due to the learning algorithms, and lessen infrastructure and operating expenses due to the services-based business models. Moreover, user experiences and faster decisions can be achieved with the assistance of real-time processing. The study paper also indicates the challenges, such as latency problems in distributed computing systems, data privacy and security, and resource allocation, in addition to the advantages. the need to use robust system architecture and better management techniques.",
    "abstractSource": "publisher",
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
    abstract: "The rise in complexity of software systems and the rise in sophistication of cyber threats have led to cybersecurity becoming a key issue in software engineering. The conventional security systems are usually unable to capture and react to the current attacks in real time, especially in a large-scale and dynamic environment. The development of Artificial Intelligence (AI) has become a revolutionary solution due to its ability to detect threats intelligently, evaluate vulnerabilities automatically, perform predictive analytics, detect anomalies, and implement adaptive defense mechanisms. This paper will discuss AI-driven cybersecurity in the software engineering field, where machine learning, deep learning, natural language processing, and reinforcement learning can be applied throughout the software development lifecycle to provide increased security. The study assesses the efficacy of AI-powered technologies in secure coding, threat modeling, penetration testing, reviewing code, malware detection, and responding to an incident. It also examines issues like adversarial attacks, data privacy issues, bias in algorithms, explainability, and integration issues in current development pipelines. Based on a systematic review and comparative framework, the paper shows that AI-based cybersecurity can greatly enhance the ability to proactively defend against threats, decrease reaction time, and increase resilience in the face of new threats. The results highlight the importance of ethical governance, human control, and ongoing updates of models to maximize the advantages of AI in safe software engineering activities. The work can be regarded as a valuable roadmap to researchers and developers, as well as organizations aiming to deploy intelligent cybersecurity approaches to the contemporary software environment.",
    "abstractSource": "publisher",
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
    abstract: "There's no denying that Artificial Intelligence (AI), Machine Learning (ML), and Big Data technologies are profoundly changing the face of software engineering and organizational leadership. As these technologies keep evolving, the design, deployment, and management of software systems are undergoing unprecedented changes. This study discusses the recent developments in Artificial Intelligence, Machine Learning, and Big Data, and their implications for the Technical Leadership in modern business houses. It uses a qualitative analysis approach, drawing on the latest literature, industry reports, and technological trends, to establish the major trends and developments, including autonomous systems, explainable AI, edge computing, data-centric architectures, and AI-driven DevOps. Results indicate that technical leaders are no longer just managers, but must also be strategic innovators able to coordinate and apply intelligent systems, data systems, and teams of interdisciplinary experts. Further, issues like ethical concerns, data privacy, algorithmic bias, and skill gaps are emphasized as essential factors for future leadership. The study finds that the technical leader must be prepared to constantly learn, adapt, and understand the technological and human factors to be effective in the AI era. The findings of this research prove informative for software engineers, IT managers, and organizational leaders seeking to cope with the intricacies of transforming using AI",
    "abstractSource": "publisher",
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
    abstract: "With the rise of large language models (LLMs) and independent AI systems, software engineering is undergoing a transformational shift. This conceptual paper theorizes agentic workflows systems, where an AI agent or agents proactively perceive, plan, act and reflect throughout the entire software development lifecycle (SDLC); its implications for end to end software engineering automation are also discussed. This paper constructs a theory for agentic SE systems viewed from four different angles: architectural configuration, reasoning capability, SDLC coverage, and evaluation validity, referring to 30 basic and contemporary papers from the past 25 years since 2000. It is then supported with quantitative evidence from benchmark studies: top agentic systems can now solve up to 43% of real-world GitHub issues on SWE-bench Lite, with 85.9% Pass@1 on Human-Eval and 55.8% less time spent on completing a developer task in controlled experiments. There are, however, significant theoretical tensions that are not resolved: autonomy and oversight, benchmark performance and validity in the real world, and the capability of the system and ethical responsibility. Finally, the paper outlines a research agenda that focuses on the specification level of agentic SE systems, on their self-verification, and on their governance.",
    "abstractSource": "publisher",
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
    abstract: "The spread of artificial intelligence (AI) agents in the economy inevitably asks questions about productivity and the shifts in the labour market and long-run macroeconomic growth. This paper, using a mixed-methods approach, pools microeconomic experimental evidence and macroeconomic modelling, for a thorough assessment of the economic impact of AI agents. The paper reports on four pioneering RCTs that randomized 6,478 workers in writing, coding, customer-service, and management-consulting domains showing a strong skill-levelling effect: Across various industries, overall productivity gains from AI agents range from 14% to 56%, with the majority of these gains occurring at the bottom of the talent distribution and only small or negative effects at the top. The modelling and simulation indicate that macroeconomic benefits will be achieved using a J-curve path and will result from a downward trend in the short term, followed by a long upward trend provided complementary investment is made. Based on macroeconomic forecasts from various organizations, the range of potential potential impacts of the EV transition is wide from +0.5% cumulative GDP growth (Acemoglu, 2024) to +7% cumulative GDP growth over a decade (Goldman Sachs) and +$25.6 trillion value added across industries (McKinsey, 2023). Analysis of the distribution of the labour supply shows that around 19% to 47% of workers are potentially highly affected in terms of the disruption of their tasks, including the relatively high exposure for high-education workers in routine cognitive occupations. The paper provides a comprehensive analytical tool to make sense of micro and macro evidence, unpacks scenarios when AI agents will drive inclusive productivity growth, and outlines a policy roadmap focused on complementary investments, incentives for task-redesign, and workforce transition support measures.",
    "abstractSource": "publisher",
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
    abstract: "Tremendous advances have been made in big data technologies, cloud computing, and artificial intelligence, which have dramatically changed the way engineers work today. The limitations of traditional data engineering pipelines are manual dependency, static workflow orchestration, and rule-based monitoring mechanisms, restricting scalability, flexibility, and efficiency in dynamic computing environments. With the processing of large amounts of structured and unstructured data, there is a growing need for intelligent and autonomous data processing systems that require minimal human involvement in data pipeline management. This study delves into the notion of AI agentic architectures for autonomous data engineering pipelines and investigates the potential benefits of intelligent agents in enhancing automation, resilience, and decision-making processes in contemporary data ecosystems The research is focused on the design and evaluation of an Agent-based architecture that could be capable of performing critical data engineering tasks (data ingestion, data validation, data orchestration, data monitoring, data optimization, and fault recovery) autonomously. The study is conducted with a hybrid method combining architectural modeling, comparison, and evaluation through simulation with current AI and cloud technologies. The suggested framework incorporates autonomous AI agents, machine learning algorithms, and intelligent orchestration mechanisms to facilitate adaptive and self-healing operations of pipelines",
    "abstractSource": "publisher",
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
    abstract: "Introduces a collaborative multi-agent voting and deliberation hierarchy designed for high-consequence enterprise decision scenarios, ensuring consensus formation, verification, and auditability across heterogeneous models.",
    "abstractSource": "archive",
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
    abstract: "Autonomous multi-agent artificial intelligence (AI) systems have emerged as a rapidly evolving field that revolutionizes the way autonomous systems can make decisions together, collaborate on tasks, and learn, thereby opening new paradigms for distributed decision-making, task execution, and adaptive learning. The complexity of these systems, however, brings in several serious security issues due to the dependency of the autonomous agents. In contrast, vulnerabilities in multi-agent systems are no longer bound to their individual agents, but are spread across the system through their trust-based interactions, leading to systemic risks that can't be adequately identified or protected using traditional security methods. These emerging risks underscore the importance of a structured approach that can account for trust as a fluid and security-sensitive factor in interdependent AI systems. In order to tackle this challenge, this paper proposes a novel graph-based approach to the representation of trust relationships and vulnerability propagation in multi-agent AI systems, called the Emergent Trust Vulnerability Graph (ETVG). Furthermore, the study introduces an Agentic Trust Dynamics Theory (ATDT) as a conceptual theory to model the evolution, loss, and impact of trust on emerging security vulnerabilities in an autonomous agent network. These contributions form a framework for structuring the analysis of systemic risks that emerge from interactions between agents, and not from the failure of individual agents. Methodologically, the proposed framework utilizes the most commonly used graph modeling techniques in which an agent is modeled as a node and trust is modeled as a weight on the edges. The influence and compromise propagation through connected agents is simulated using trust propagation analysis. Controlled simulation experiments are conducted, utilizing multi-agent coordination environments with different degrees of adversarial interference and trust manipulation scenarios, in order to validate the model. The experimental results show that the ETVG framework achieves a high accuracy in vulnerability detection and mitigates the cascading effect of compromise across agent networks. In addition, the proposed model improves the capability of trust-risk prediction, which is able to discover high-risk nodes in complex interaction structures effectively. The framework exhibits better performance in maintaining the stability of the system under attack, as compared with conventional baseline approaches. This work is important for the understanding of the fundamental problems of security in autonomous AI environments. This study offers new means to design a resilient multi-agent system that is able to resist emergent threats by formalizing trust as a dynamic security vector. The results also point to promising avenues for future research in developing secure, adaptive, and self-regulating infrastructures for AI agents",
    "abstractSource": "publisher",
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
    abstract: "Defines and categorizes 'Clean Attacks'—adversarial inputs that bypass syntactical and semantic guardrails by strictly obeying schema and policy specifications while manipulating agent objective functions.",
    "abstractSource": "archive",
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
    abstract: "Develops closed-loop supervisory controller architectures allowing agent swarms to monitor runtime drift, self-quarantine compromised agents, and synthesize remediation routines dynamically.",
    "abstractSource": "archive",
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
    abstract: "Proves that traditional identity and RBAC paradigms fail under dynamic agent delegation, proposing an intent-based cryptographic capability protocol that evaluates purpose before granting execution privileges.",
    "abstractSource": "archive",
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
    abstract: "Paper 1 of this series introduced clean attacks adversarial inputs that satisfy all observable policy constraints yet redirect autonomous agent behavior away from operator intent. Still, uncertainty remains about how such shifts unfold across extended usage. Even though immediate effects suggest weakened breaches cause less impact (58.1%) compared to full goal swaps (64.8%), real-world cases often describe worsening divergence after multiple cycles, hinting at gradual breakdowns needing deeper modeling. Here, deviation over time emerges as slow but compounding movement of an agent’s actual choices beyond intended boundaries Π₀ due to recurring subtle assaults. This shift follows complex patterns - not linear decay, rather like systems building hidden strain until sudden collapse occurs past threshold t, then veering sharply into attacker-influenced regimes Π without return. Beyond tipping point λ in frequency of these disguised interventions, recovery fades; alignment dissolves not by force, but through accumulation. This study offers four core advances. Right away, policy drift takes shape through a nonlinear differential equation - framed within the policy state space - with support from Lyapunov stability concepts alongside bifurcation methods. Instead of vague metrics, the Intent Drift Rate appears: a concrete number per dialogue turn, built as the time-based change in the Behavioral Drift Index first laid out in Paper 1. Following that, Π₀’s resilience gets examined via a two-valley energy model, uncovering how the tipping point labeled λ controls whether systems rebound or shift into Π. Later still, validation arrives through tests on AegisBench-MT - a version expanded to 480 conversations - spanning three types of agents plus four leading large language models, spotting clear shifts near t ≈ 9 steps along with a split triggered around λ ≈ 0.42. Foundational input comes from IDR, shaping core logic across Papers 3 through 5. Trust decisions driven by user purpose rely on it, just as node-level shift tracking within agent networks does. Response mechanisms that activate when deviations occur also build upon this base. Each test applies common reference terms defined earlier in Paper 1 - elements like φ, Π, SVS, and BDI remain consistent throughout.",
    "abstractSource": "publisher",
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
    abstract: "Security in autonomous AI systems is not a property of individual components such as identity verification, static policy configurations, or model-level safeguards. Instead, it is a dynamic system property emerging from three interconnected dimensions: intent, time, and interaction. Intent captures the alignment between an operator’s goals and an agent’s behavior; time reflects the evolution of security states under adversarial pressure; and interaction describes how trust relationships between agents can propagate misalignment. This paper synthesizes the findings of the five-paper AI Agent Security Series into a unified, formal, and falsifiable theory of autonomous agent security. Current AI security approaches focus on component-level controls, including authentication, policy enforcement, and output filtering. However, results from Papers 1–5 show that these mechanisms are individually insufficient and collectively vulnerable to clean attacks semantically valid, policy-compliant adversarial inputs that redirect agent behavior while evading existing detection methods. We argue that such failures are structurally inevitable under component-centric security models. To address this gap, we introduce the Unified Security Function, Φ_security(φ, t, G), a scalar measure in the range [0,1] that combines IntentAlign, TemporalStability, and NetworkIntegrity into a single dynamic assessment of security health. Using this framework, we establish three meta-theorems: the Component Insufficiency Theorem, the Dynamic Necessity Theorem, and the Interaction Irreducibility Theorem. Evaluation on the complete AegisBench benchmark suite (1,560 sessions across Papers 1–5) shows that Φ_security predicts attack success with an AUC of 0.943, outperforming all individual metrics. By defining autonomous agent security as a distinct scientific object, this work provides a foundational framework for future research on secure and adaptive AI systems.",
    "abstractSource": "publisher",
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
    abstract: "The rapid adoption of cloud-based architectures has increased system scalability and flexibility while simultaneously expanding the attack surface and operational complexity of modern applications. Traditional rule-based monitoring systems, which depend on static thresholds and predefined signatures, struggle to detect sophisticated threats and performance irregularities in highly dynamic, elastic, and ephemeral cloud environments where workloads scale up and down continuously and services are frequently redeployed. This paper explores the design and implementation of AI-powered anomaly detection frameworks tailored for cloud-native infrastructures, examining the theoretical foundations, architectural components, and practical deployment considerations of intelligent monitoring systems. By leveraging machine learning techniques such as supervised learning, unsupervised clustering, and deep learning models including recurrent neural networks and autoencoders, artificial intelligence systems can identify deviations from baseline behavior across distributed services, containers, and microservices in real time. The proposed approach integrates telemetry data from logs, metrics, and network traces to establish adaptive behavioral profiles, emphasizing automated feature extraction, continuous model training, and feedback loops that reduce false positives while improving detection accuracy. The framework is explicitly designed to operate across the full lifecycle of anomaly management, from raw data ingestion through model inference to alert generation and remediation. Additionally, this study addresses scalability challenges, data privacy considerations, and integration with DevOps and SecOps workflows. Experimental evaluation, conducted on a dataset exceeding 500,000 records drawn from logs, metrics, and network traffic, demonstrates improved detection rates, faster incident response times, and enhanced system resilience compared to conventional monitoring tools. Five model families were benchmarked side by side, with hybrid ensemble approaches achieving the strongest overall results. The findings suggest that AI-powered anomaly detection significantly strengthens observability and security in cloud-based applications, enabling proactive threat mitigation and operational optimization in increasingly complex distributed environments.",
    "abstractSource": "publisher",
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
    abstract: "The rapid adoption of artificial intelligence and machine learning across critical sectors has introduced cybersecurity challenges that traditional security frameworks were never designed to address. As machine learning models increasingly shape decision-making in finance, healthcare, autonomous systems, and national security, they have become attractive targets for sophisticated adversaries. This paper examines the evolving threat landscape surrounding AI systems, with particular attention to vulnerabilities that arise at each stage of the machine learning lifecycle, including data poisoning, adversarial manipulation, model extraction, and inference-based privacy attacks. It explores how attackers exploit weaknesses in training data, model architectures, and deployment pipelines to manipulate model behavior or exfiltrate sensitive information, and it reviews the defense strategies that have emerged in response, from adversarial training and robust model design to secure deployment practices and privacy-preserving techniques such as differential privacy, federated learning, and homomorphic encryption. The discussion also situates these technical measures within the broader governance frameworks and secure-by-design principles that organizations are beginning to adopt across the AI development lifecycle. By synthesizing current research and practical defense approaches, this paper provides a comprehensive overview of how machine learning systems can be safeguarded against a threat landscape that continues to evolve as quickly as the technology itself. The overarching conclusion is that securing AI systems is not a task any single discipline can accomplish alone; it requires sustained collaboration between machine learning researchers, cybersecurity professionals, and policymakers if AI technologies are to remain reliable, trustworthy, and resilient in adversarial environments.",
    "abstractSource": "publisher",
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
    abstract: "As artificial intelligence becomes woven into critical applications such as healthcare, finance, autonomous systems, and cybersecurity, adversarial threats to machine learning models have grown into one of the most pressing concerns in the field. Adversarial machine learning studies how attackers exploit weaknesses in model architectures and data pipelines, manipulating inputs to trigger misclassification, extract sensitive information, or quietly degrade system performance. This article offers a detailed overview of the security risks associated with adversarial attacks, including evasion attacks carried out at inference time, data poisoning that corrupts the training process, backdoor insertion that hides dormant triggers inside a model, and model inversion that leaks private information back out of a trained system. In response to these threats, the discussion evaluates a wide range of defense strategies designed to strengthen the robustness and reliability of AI systems, including adversarial training, robust optimization, defensive distillation, anomaly detection, and privacy-preserving techniques such as differential privacy and federated learning. Particular emphasis is placed on weaving these defenses into every stage of the AI development lifecycle and on cultivating a threat-aware mindset before models are ever deployed into real-world environments. By drawing together current research, mathematical foundations, and practical implementation experience, this article traces the evolving landscape of adversarial machine learning and offers actionable guidance for developers, researchers, and policymakers who are working to secure AI-driven applications against increasingly sophisticated attacks.",
    "abstractSource": "publisher",
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
    abstract: "Blockchain and artificial intelligence (AI) are converging into a single infrastructural layer for securing data sharing, model integrity, and autonomous decision-making across distributed systems. This paper presents a meta-synthesis that draws together four constituent studies covering adversarial machine learning, AI-powered anomaly detection in cloud environments, automated vulnerability patching by multi-agent large language model (LLM) pipelines, and the broader landscape of securing AI systems across their lifecycle and situates their findings within the emerging literature on blockchain-enabled AI and autonomous AI agents. Each constituent study addresses a distinct point of failure in modern AI-driven security operations: the integrity of training data and model behavior, the reliability of real-time monitoring, and the trustworthiness of automated code remediation. We argue that blockchain's properties of immutability, decentralized consensus, and verifiable provenance directly address a gap common to all three: the difficulty of establishing trust in data, models, and autonomous agents that operate without a central authority. Building on real-world research on blockchain-secured data sharing, federated learning, and multi-agent coordination, we propose a layered reference architecture that couples adversarially hardened models, blockchain-anchored data provenance, AI-driven anomaly detection, and smart-contract-governed multi-agent remediation. We conclude by identifying open problems in scalability, privacy-transparency trade-offs, and the governance of autonomous agents that must be resolved before such integrated systems can be trusted in production-critical environments.",
    "abstractSource": "publisher",
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
    abstract: "This report synthesizes peer-reviewed and archival research published between 2019 and 2024 on the use of large language models and multi-agent architectures for automated vulnerability repair, with a specific focus on how these techniques apply, or fail to apply, to legacy software systems. The review traces a clear methodological progression across this five-year window: from template and heuristic program repair, through neural and transfer-learning models, to fine-tuned transformer-based repair, zero-shot and conversational prompting of general-purpose LLMs, and finally to multi-agent pipelines in which specialized agents divide the work of detecting, localizing, patching, and validating a vulnerability. Two figures accompany the discussion. The first depicts a generalized multi-agent repair pipeline synthesized from the architectures described across the reviewed literature, showing how detection, localization, patch generation, and validation agents typically interact, including the validation feedback loop that distinguishes conversational and agentic systems from earlier single-shot approaches. The second traces the field's methodological evolution chronologically, from 2019's template-based baselines through 2024's agentic systems. A comparative table consolidates fifteen of the most relevant studies discussed in the body of the report, listing the approach, target language, and publication venue for each. The report concludes that while multi-agent LLM pipelines show real promise for legacy code specifically, since their capacity for autonomous context reconstruction and iterative, feedback-driven refinement directly addresses the sparse documentation and thin test coverage that define legacy environments, the literature to date has been validated almost exclusively on actively maintained, comparatively well-organized open-source repositories. The gap between these benchmarks and the scale and disorganization of real enterprise legacy systems has not yet been closed empirically, and closing it, together with building trust and explainability mechanisms suitable for security-critical maintenance work, is identified as the field's most consequential open problem.",
    "abstractSource": "publisher",
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
    abstract: "Proposes a Multi-Agent Differential Evolution-Based Trajectory Planning (MA-DEBTP) framework for mobile data collectors (MDCs) operating in intermittently connected, delay-tolerant wireless sensor networks (DT-WSNs). The architecture leverages decentralized multi-agent coordination coupled with differential evolution optimization to compute energy-efficient, latency-bounded trajectories. By dynamically adapting to intermittent connectivity, non-uniform node distribution, and strict buffer deadlines, the MA-DEBTP framework minimizes packet drop ratios while maximizing data gathering throughput across dispersed sensor fields.",
    "abstractSource": "archive",
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
    abstract: "Investigates the foundational interplay between input data quality, automated feature engineering pipelines, and runtime model reliability across large-scale artificial intelligence multi-agentic systems. Formulates rigorous statistical validation heuristics, drift-detection boundaries, and fault-tolerant orchestration protocols that prevent cascading hallucination, epistemic uncertainty amplification, and consensus degradation in distributed enterprise agent ecosystems.",
    "abstractSource": "archive",
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
    abstract: "Views Downloads Citation Authors Harsh Verma Publication Date December 30, 2020 DOI https://doi.org/10.37745/ejcsit.2013/vol8n56986-1 Abstract Views 119 Downloads [sdc_count id=”” before=”” after=” Downloads”] Citation Verma H. (2020) Scalable Real-Time Data Pipelines for AI and Machine Learning–Driven Enterprise Systems, European Journal of Computer Science and Information Technology , 8 (5), 69-87 Abstract The growth of enterprise data volumes across the 2000s and 2010s pushed traditional batch-oriented data processing infrastructures past their practical limits, motivating a sustained shift toward distributed, stream-based architectures capable of supporting real-time analytics and machine learning (ML). This article synthesizes foundational and applied research published between 2001 and 2019 on distributed batch processing, distributed structured and key-value storage, early continuous query engines, in-memory cluster computing, micro-batch and internet-scale stream processing, log-based messaging, and unified batch/streaming programming models, to examine how scalable real-time data pipelines can be designed to support artificial intelligence (AI) and ML-driven enterprise systems. Ten distinct systems and thirteen primary sources are reviewed in depth. Drawing on this literature, the article proposes a five-layer architectural framework ingestion, stream processing, batch/model training, durable storage, and analytics/serving and evaluates the quantitative performance data, scalability mechanisms, fault-tolerance strategies, and enterprise implementation challenges reported across these sources. Reported figures include Google’s documented execution of roughly 100,000 MapReduce jobs per day, processing more than twenty petabytes of data daily; Amazon’s Dynamo latency service objective of sub-300-millisecond response at the 99.9th percentile; the 0.5-to-2-second target latency of the D-Streams micro-batch model; and the adoption of Storm by more than sixty production organizations by 2014. The review concludes that horizontally scalable, log-based messaging, combined with fault-tolerant, in-memory and micro-batch computation and durable, replicated storage, constituted the technical foundation that made real-time, ML-driven enterprise analytics feasible within this period, and that this layered architecture continues to underpin modern enterprise AI infrastructure",
    "abstractSource": "publisher",
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
    abstract: "This presentation introduces the emerging paradigm of multi-agentic AI in cybersecurity, where systems evolve from passive tools to autonomous decision-making entities. This explores the rise of agentic AI and its transformative impact on modern cybersecurity. As AI systems evolve from assistive tools into autonomous agents capable of independent decision-making and action, they introduce a new class of dynamic, fast-moving, and highly adaptive threats. The session examines the architecture and behavior of these agents, highlighting critical vulnerabilities that emerge from autonomy, orchestration, and trust dependencies. It presents the concept of a \"lethal trifecta\" of risks that redefine traditional security boundaries. Through practical scenarios, the workshop illustrates how adversarial agents exploit interconnected systems and data flows at scale. It then outlines a defense-first approach grounded in observability, governance, and secure infrastructure design, emphasizing a shift toward \"secure-by-design\" principles. The discussion also addresses the evolving balance between human oversight and machine autonomy. Participants will gain actionable frameworks to design resilient, trustworthy agentic systems and transition toward proactive, self-healing cybersecurity models. Published in Proceedings of the Raptors Conference , Vol. 1 (2026) Conference Raptors Conference 2026 , 21 October 2026, online Accepted 2026-09-12 DOI https://doi.org/10.68495/rc.2026.C025 Presentation Slides (PDF) Licence © 2026Harsh Verma. Published under Creative Commons Attribution 4.0 International (CC BY 4.0) . Publisher Hackathon Raptors, Community Interest Company 15557917, London, United Kingdom Permanent address https://proceedings.raptors.dev/verma-trusted-ai-autonomous-agents Open access. Every entry in the Proceedings is free to read, with no charge to authors and no charge to readers. Slides are served from this site, so they stay available at the paper's permanent address.",
    "abstractSource": "publisher",
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
    abstract: "Proposes DEICA-ML, a novel multi-layer differential evolution-based improved clustering algorithm engineered for IoT-based heterogeneous wireless sensor networks (HWSNs). Formulates an adaptive cluster-head selection and energy-efficient data transmission architecture optimizing network longevity, throughput, and cross-tier load balancing under non-uniform sensor deployment.",
    "abstractSource": "archive",
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
