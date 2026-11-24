import securityImage from "@/assets/enterprise-agent-security.jpg";
import trustImage from "@/assets/agentic-ai-trust.jpg";
import type { Blog, BodyImage } from "./media";
import a4iHall from "@/assets/a4i-hackathon-hall.jpg.asset.json";
import a4iTeams from "@/assets/a4i-hackathon-teams-building.jpg.asset.json";
import a4iJudge from "@/assets/harsh-verma-a4i-hackathon-judge.jpg.asset.json";
import a4iShare from "@/assets/google-agents-for-impact-share.jpg.asset.json";
import bwgSession from "@/assets/bwg-track2-session.jpg.asset.json";
import bwgHarsh from "@/assets/harsh-verma-build-with-gemini.jpg.asset.json";
import mvBadge from "@/assets/bwg-platform-builder-badge.png.asset.json";
import svlCover from "@/assets/bwg-sunnyvale-app-builders.jpg.asset.json";
import svlBadge from "@/assets/bwg-app-builder-badge.png.asset.json";
import gdeLogo from "@/assets/google-developer-experts-logo.jpg.asset.json";

export type OriginalPost = Blog & { body: { h?: string; p: string[]; checklist?: string[]; img?: BodyImage }[]; sources?: { title: string; href: string }[] };

// Essays published first on this site. href is empty: the page itself is the original.
export const originalPosts: OriginalPost[] = [
  {
    title: "Build with Gemini, Mountain View: Leading Track 2 for Platform Builders",
    img: bwgSession.url,
    seo: {
      title: "Build with Gemini Mountain View Track 2 | Harsh Verma",
      description: "Harsh Verma, Track Lead and TA for Build with Gemini Track 2: how Platform Builders governed an AI agent estate with Gemini, identity and gateways.",
      image: bwgSession.url,
      keywords: ["Build with Gemini", "Gemini", "Google Cloud", "Platform Builders", "Agent Registry", "Agent Identity", "Agent Gateway", "AI governance", "Harsh Verma"],
    },
    pub: "iamharshverma.com",
    topic: "Agentic AI",
    date: "August 28, 2026",
    read: "9 min read",
    href: "",
    excerpt: "Track Lead and TA notes from Build with Gemini in Mountain View: what Platform Builders built with Gemini, how the lab wove it into a real governance workflow, the before-and-after for engineers, and the impact I saw in the room.",
    sources: [
      { title: "Google Cloud: Build with Gemini, Mountain View", href: "https://cloud.google.com/events/build-with-gemini-mountain-view" },
      { title: "Track 2 lab guide: Govern Your AI Estate (NovaSmart Control Center)", href: "https://storage.googleapis.com/bwg-track2-demo-guide/lab_instructions.html" },
      { title: "My post on X about the event", href: "https://x.com/harshverma59/status/2093123019430601189" },
    ],
    body: [
      { p: [
        "On Thursday, August 27, Google's Mountain View campus turned into a workshop floor for Build with Gemini. I had the privilege of serving as a Track Lead and TA for Track 2, Platform Builders: the track for engineers who don't just call a model, but have to run, secure and answer for dozens of AI agents at once.",
        "The room was full of builders with laptops open and Google Cloud lanyards on, and one shared question on everyone's mind: once agents are everywhere in a company, who is actually in control of them?",
      ], img: { src: bwgHarsh.url, alt: "Harsh Verma wearing a Google Cloud lanyard at Build with Gemini in Mountain View", caption: "Track Lead and TA badge on, ready for Platform Builders.", portrait: true } },
      { h: "Your build: what we built with Gemini, and the problem it solves", p: [
        "Track 2's mission was called Govern Your AI Estate: Your First Week as Global Head of AI. Every participant stepped into the shoes of the new head of AI at a fictional company, NovaSmart, and inherited a messy reality: agents shipped by different teams, a shadow agent nobody had registered, shared credentials, open connections to the back office and no proof any of it was safe.",
        "Using Gemini and Google Cloud's agent platform, participants built a working control center for that estate. The problem it solves is the one I see in nearly every enterprise conversation: AI adoption moves faster than governance, and nobody can confidently answer what agents exist, what they can reach and whether they can be talked into breaking their rules.",
      ], img: { src: mvBadge.url, alt: "Google Cloud Build with Gemini Platform Builder badge", caption: "The Platform Builder badge for governing a real AI estate.", small: true } },
      { h: "Your process: how Gemini fit into the workflow", p: [
        "The lab was designed as missions, each ending with a scorecard, so Gemini worked as a teammate through a real governance loop rather than a chat window on the side:",
      ], checklist: [
        "See everything: check the environment, meet the estate and inventory every agent, model and tool.",
        "Take action: register the shadow agent in the Agent Registry and give each agent its own identity with only the access it needs.",
        "Control the connections: see who can call the back office, preview the fix before applying it, then prove the rogue caller is out through the Agent Gateway.",
        "Protect the content: test whether agents can be talked into breaking their rules, turn on screening and prove the attacks are blocked.",
        "Evaluate and decide: run evaluations, build a tougher test set, check cost and decide, with evidence, whether to launch.",
      ], img: { src: bwgSession.url, alt: "Build with Gemini Track 2 session with Agent Registry, Agent Identity, Agent Gateway and Agent Evaluation on screen", caption: "Track 2 in session: registry, identity, gateway and evaluation as one platform story." } },
      { h: "As a TA: where people got stuck, and unstuck", p: [
        "Most of my day was spent table to table. The sticking points were rarely the model itself. They were the platform questions: why a least-privilege identity broke a tool call, how to read a gateway policy, why an evaluation score dropped after a harder test set. Those are exactly the moments where learning sticks, because they mirror production.",
        "My favorite moment was watching someone 'see the fix before making it', preview a policy change, apply it, and immediately prove the rogue caller was blocked. That shift from hoping to proving is what platform engineering for AI should feel like.",
      ] },
      { h: "Before vs. after: how the workflow changes", p: [
        "Before: governance was a spreadsheet and a meeting. Agent inventories lived in tribal knowledge, credentials were shared, security reviews happened after launch, and 'is it safe?' was answered with an opinion.",
        "After: governance becomes an engineering workflow. Every agent is registered and has its own identity, connections pass through a gateway with policies you can preview, content is screened by default, and launch decisions come from evaluation scorecards instead of gut feel. Gemini speeds up each step, from reading configuration to drafting policies and summarizing what you can actually claim.",
      ] },
      { h: "The impact: tangible benefits", p: [
        "For participants, the takeaway was concrete: a repeatable playbook they can bring back to their own estate on Monday. For me, leading the track reinforced how I approach AI and security work every day.",
      ], checklist: [
        "Visibility first: you cannot secure agents you have not inventoried.",
        "Least privilege per agent: one identity, only the permissions it needs, makes failures contained and explainable.",
        "Proof over promises: every control ended with a verification step and a scorecard.",
        "Faster, safer launches: evaluation and cost checks turn the go/no-go into a data-backed decision.",
      ], img: { src: gdeLogo.url, alt: "Google Developer Experts logo", caption: "Supporting the builder community as a Google Developer Expert.", small: true } },
      { h: "Thank you", p: [
        "Thank you to the Google Cloud team for building such a thoughtful, hands-on track, and to every Platform Builder who showed up curious and left with a governed AI estate. Agents are becoming infrastructure, and infrastructure deserves the same rigor we give everything else in production.",
      ] },
    ],
  },
  {
    title: "Build with Gemini, Sunnyvale: Leading Track 3 for App Builders",
    img: svlCover.url,
    seo: {
      title: "Build with Gemini Sunnyvale Track 3 | Harsh Verma",
      description: "Harsh Verma, Track Lead and TA for Build with Gemini Sunnyvale Track 3: how App Builders shipped live apps with agent-first workflows and Gemini.",
      image: svlCover.url,
      keywords: ["Build with Gemini", "Gemini", "Google Antigravity", "App Builders", "agent-first development", "Google Developer Expert", "Harsh Verma"],
    },
    pub: "iamharshverma.com",
    topic: "Agentic AI",
    date: "August 14, 2026",
    read: "8 min read",
    href: "",
    excerpt: "Track Lead and TA notes from Build with Gemini in Sunnyvale: how App Builders skipped the boilerplate, orchestrated agents in plain language and shipped a live app from scratch in one hands-on, code-first lab.",
    sources: [
      { title: "Google Cloud: Build with Gemini, Sunnyvale", href: "https://cloud.google.com/events/build-with-gemini-sunnyvale-1" },
      { title: "Google Antigravity", href: "https://antigravity.google/" },
      { title: "Google Developer Experts program", href: "https://developers.google.com/community/experts" },
    ],
    body: [
      { p: [
        "Thursday, August 13, Sunnyvale. Lights down, screens up, and one promise on the agenda: skip the boilerplate and get straight to building. I served as a Track Lead and TA for Track 3, App Builders, the hands-on, code-first track for software developers at Build with Gemini.",
        "The theme was Building Applications with Agent-First Workflows. The tagline we kept repeating in the room: Antigravity can cook. With caveats, of course. Our loop for the day was simple: observe, build, verify, ship, repeat.",
      ], img: { src: svlBadge.url, alt: "Google Cloud Build with Gemini App Builder badge", caption: "The App Builder badge every participant earned by shipping.", small: true } },
      { h: "Your build: what we built with Gemini, and the problem it solves", p: [
        "Every developer knows the first hours of a project are rarely about the idea. They go to setting up the workspace, wiring dependencies, writing requirements nobody reads and scaffolding code that looks the same every time.",
        "In Track 3, participants used AI developer tools to set up their workspace automatically, draft project requirements and safely write application logic. Then they orchestrated their own intelligent agents with natural-language prompts to handle multi-turn conversations, and shipped a live, working application from scratch before the day ended. The problem it solves: the distance between an idea and a running app collapses from weeks to hours.",
      ] },
      { h: "Your process: how Gemini fit into the workflow", p: [
        "The lab treated Gemini as a teammate across the whole lifecycle, not a code autocomplete:",
      ], checklist: [
        "Observe: describe the app in plain language and let the agent propose requirements and a plan you review before any code exists.",
        "Build: let agents set up the workspace and scaffold the project, while you steer architecture and naming.",
        "Verify: read every diff, run the app, and ask the agent to explain and test what it wrote.",
        "Ship: deploy a live application with multi-turn agent conversations working end to end.",
        "Repeat: iterate with new prompts, keeping humans in charge of judgment and agents in charge of toil.",
      ], img: { src: svlCover.url, alt: "Build with Gemini Sunnyvale App Builders track stage with Prototype, Evaluate and Deploy screens", caption: "Prototype, evaluate, deploy: the App Builders loop on stage in Sunnyvale." } },
      { h: "As a TA: the caveats are the lesson", p: [
        "Walking the room, the most valuable moments were not when agents got everything right. They were when an agent confidently wrote something subtly wrong, and a developer caught it in review. That is the real skill of agent-first development: knowing when to trust, when to verify and how to give an agent better context.",
        "I saw developers who had never built an agent ship one, and seasoned engineers rethink how much of their day is really design versus typing.",
      ] },
      { h: "Before vs. after", p: [
        "Before: start from an empty folder, copy boilerplate from an old repo, write requirements after the code, and spend the first day on setup instead of the product.",
        "After: start from intent. The agent drafts requirements and scaffolding in minutes, the developer reviews and directs, and the first working version arrives the same afternoon. The job shifts from writing every line to designing, reviewing and verifying, which is where engineering judgment matters most.",
      ] },
      { h: "The impact", p: [
        "For me, as a Google Developer Expert and an engineer building AI systems every day, this track sharpened what I tell teams adopting AI coding tools:",
      ], checklist: [
        "Time to first working app drops from days to hours.",
        "Requirements become a living artifact the agent and the team both use.",
        "Review discipline matters more, not less: verify every change before it ships.",
        "Developers spend their energy on product decisions instead of boilerplate.",
      ], img: { src: gdeLogo.url, alt: "Google Developer Experts logo", caption: "Proud to support the community as a Google Developer Expert.", small: true } },
      { h: "Thank you", p: [
        "Thank you to the Google Cloud team and every App Builder in Sunnyvale. Real people build with AI, and watching a room full of developers ship live apps in a single day is a reminder of how fast this craft is changing.",
      ] },
    ],
  },
  {
    title: "Judging Google Cloud's Agents for Impact Hackathon as a Google Developer Expert",
    img: a4iHall.url,
    seo: {
      title: "Google Agents for Impact Hackathon | Harsh Verma",
      description: "Harsh Verma shares Google Agents for Impact hackathon judging insights and AI agent development lessons with ADK, Gemini, BigQuery and Google Antigravity.",
      image: a4iShare.url,
      keywords: ["Google Agents for Impact hackathon", "AI agent development", "Google ADK", "Gemini", "BigQuery", "Google Antigravity", "Harsh Verma"],
    },
    pub: "iamharshverma.com",
    topic: "Agentic AI",
    date: "November 20, 2026",
    read: "12 min read",
    href: "",
    excerpt: "What I learned judging Google Cloud's Agents for Impact Hackathon in Sunnyvale as a Google Cloud AI Developer Expert: the creativity, the energy in the room, and how the best teams turned urban heat data into agents a city could actually use.",
    sources: [
      { title: "Google Cloud: Agents for Impact Hackathon, Sunnyvale", href: "https://cloud.google.com/events/agents-for-impact-svl" },
      { title: "Google Cloud: Agents for Impact 2026 resources", href: "https://cloud.google.com/resources/agents-for-impact-2026" },
      { title: "Challenge 1 brief: Community Climate Resilience, Urban Heat (GitHub)", href: "https://github.com/haggman/A4I2026-challenge-1-walkability" },
      { title: "Agent Development Kit (ADK) documentation", href: "https://google.github.io/adk-docs/" },
      { title: "BigQuery ML introduction", href: "https://cloud.google.com/bigquery/docs/bqml-introduction" },
      { title: "Google Antigravity", href: "https://antigravity.google/" },
      { title: "Google Cloud Skills Boost: Agents for Impact game", href: "https://explore.qwiklabs.com/games/190" },
    ],
    body: [
      { p: [
        "On November 17, 2026 I spent the day at the Google Event Center in Sunnyvale as a judge for Google Cloud's Agents for Impact Hackathon. As a Google Cloud AI Developer Expert, I get to see a lot of AI demos. Very few days pack this much learning, creativity and raw builder energy into ten hours.",
        "The format was simple and demanding: one day, curated teams, real public datasets and Google's newest agentic stack, including Antigravity, the Agent Development Kit (ADK), Gemini models and BigQuery. One winning team advances to the AI Arena, where a live audience votes to send a team to the stage at Google Cloud Next '27.",
      ], img: { src: a4iJudge.url, alt: "Harsh Verma standing in front of the Google Cloud Agents for Impact Hackathon wall in Sunnyvale", caption: "Arriving at the Google Event Center in Sunnyvale, ready to judge.", portrait: true } },
      { h: "The problem: heat, block by block", p: [
        "The challenge I judged was Community Climate Resilience: Urban Heat. Heat is the deadliest weather in America, and also the most unequal. Two blocks in the same city can differ by more than fifteen degrees at the same hour. A city has a small budget, a hot summer coming and a decision to make about where to put help.",
        "Teams worked with NOAA Heat Watch street-level readings plus years of weather-station history. The brief asked for an agent that predicts how much hotter a specific spot runs than the rest of the city, calls that prediction for places nobody ever measured, and turns it into a recommendation a city council can act on.",
      ] },
      { h: "The ambience and the energy", p: [
        "The hall felt like a launch event: a wall of glowing light panels, numbered table beacons, and more than a dozen teams heads-down over laptops by mid-morning. Data people, agent builders, front-end developers and storytellers were sketching architectures on paper before anyone opened a keyboard.",
        "What stayed with me was the generosity. Google experts moved table to table unblocking teams, and teams helped each other with Cloud Shell and BigQuery set-up. The pressure was real, but the mood was curiosity, not competition.",
      ], img: { src: a4iTeams.url, alt: "Hackathon teams working at numbered tables in the Google Event Center hall", caption: "Mid-afternoon: teams building, mentors circulating, the countdown on screen." } },
      { h: "What I looked for as a judge", p: [
        "A polished demo is not the same as a useful agent. I asked every team the same few questions, and they map closely to what separates production AI from a prototype.",
      ], checklist: [
        "Does the agent actually call the model, or just describe historical data? Answering for unmeasured locations was the whole point.",
        "Is the claim stated correctly? The model predicts an offset (this spot runs 8° hotter), not an absolute temperature. Teams that said it precisely earned trust immediately.",
        "Is there a tool the team built, with a clear contract, rather than one long prompt?",
        "Did they audit the outcome: who benefits from the recommendation, and who might be missed?",
        "Can a city official understand the recommendation, its uncertainty and its limits in under a minute?",
      ] },
      { h: "Creativity that surprised me", p: [
        "The strongest teams treated heat as the instrument, not the ceiling. Some brought their own data, such as tree canopy, bus stops or cooling centers, to shift the question from where it is hot to where help changes outcomes. Others built placement recommendations that explained why one intersection beat another, in plain language.",
        "The best demos were not the flashiest. They were the ones where the agent was honest about what it did not know: a single day of street readings, missing timestamps in some cities, and the difference between how hot it gets and how often.",
      ] },
      { h: "Anatomy of a strong agent: what the winning patterns had in common", p: [
        "Across the tables, the teams that impressed me did not build a chatbot with a dataset attached. They built a small system: a model that reasons, a set of tools that do real work, data it can query, and an output a person can act on. The model was the coordinator, not the whole product.",
        "In practice that meant three layers. A reasoning layer (Gemini) that plans and decides which tool to call. A tool layer of narrow, well-described functions: predict the heat offset for a location, look up nearby cooling resources, rank candidate sites. And a data layer in BigQuery that holds the street readings, station history and any data the team brought in.",
      ], checklist: [
        "Narrow tools with typed inputs and outputs beat one giant prompt that tries to do everything.",
        "Each tool returns evidence (numbers, sources, row counts), so the agent's answer can be checked.",
        "The agent states uncertainty and data gaps instead of filling them with confident prose.",
        "The final output is an artifact (a ranked placement recommendation), not just a chat reply.",
      ] },
      { h: "ADK: from prompt to engineered agent", p: [
        "Google's Agent Development Kit (ADK) is an open-source framework for building agents in code. The teams that used it well treated their agent like software: they defined the agent's instructions, registered Python functions as tools, and could run and inspect it locally before deploying.",
        "ADK pays off as an agent grows. It supports composing multiple agents, so one coordinator can hand work to specialists such as a data analyst agent and a report-writing agent. It also lets you inspect each step and tool call, which is exactly what a judge, or a city official, needs to trust the answer.",
      ], checklist: [
        "Write tool docstrings as if the model is a new teammate; the description is how it decides when to call the tool.",
        "Keep a clear split between instructions (what the agent should do) and tools (what it is allowed to do).",
        "Use multi-agent composition only when roles are genuinely different; one well-scoped agent is easier to debug.",
        "Test the agent with questions about places that were never measured, the case that proves the model is actually used.",
        "Log every tool call and its arguments so you can replay and explain any answer.",
      ] },
      { h: "BigQuery and BigQuery ML: the agent's ground truth", p: [
        "BigQuery was the backbone of the challenge. Instead of moving data into a notebook, teams kept it where it lives and let SQL do the heavy lifting: joining street-level heat readings with station history, aggregating by neighborhood and filtering candidate sites.",
        "The required differentiator was BigQuery ML, which lets you train and run models with SQL. A team could train a model to predict the heat offset from features of a location, then expose ML.PREDICT behind an agent tool. That pattern, a model in the warehouse and an agent that calls it, is one I would recommend to any enterprise team: the data never leaves the governed environment, and the prediction is reproducible.",
      ], checklist: [
        "Give the agent parameterized queries or tools, never free-form SQL against production data.",
        "Cap query cost and result size so an agent loop cannot run up a bill.",
        "Return the query or model version alongside the answer for auditability.",
        "Use service accounts with least-privilege IAM, so the agent can read what it needs and nothing more.",
      ] },
      { h: "Google Antigravity: building at the speed of an idea", p: [
        "Google Antigravity is Google's agent-first development environment, where AI agents can plan, write and run code alongside the developer. In a one-day hackathon, that changes the economics of time. Teams used it to scaffold the ADK agent, write and fix SQL against BigQuery, and build a simple front end in hours rather than days.",
        "The lesson was not that AI writes the code for you. The teams that got the most from Antigravity gave it precise tasks, reviewed every change and kept the human decisions, such as what to predict, how to frame it and what to tell a city, firmly in their own hands. Agent-assisted development amplifies clear thinking; it does not replace it.",
      ] },
      { h: "Putting the Google Cloud ecosystem together", p: [
        "The most complete solutions connected the pieces into one flow: data in BigQuery, a model trained with BigQuery ML, an agent built with ADK and powered by Gemini, development accelerated in Antigravity, and the whole thing running in Google Cloud with Cloud Shell for set-up and a service such as Cloud Run or Vertex AI Agent Engine for hosting.",
        "A reference flow I would sketch for any team: a user asks a question in a simple web app; the ADK agent plans; it calls a prediction tool backed by BigQuery ML and a lookup tool backed by BigQuery; it composes a recommendation with the evidence attached; and every step is logged for review. Swap urban heat for fraud, supply chains or security alerts and the architecture still holds.",
      ] },
      { h: "Security and trust: the part most demos skip", p: [
        "Coming from AI security, I watch for what happens when an agent has real access. Even in a hackathon, the best teams scoped their service accounts, kept credentials out of code and avoided letting the model write arbitrary queries. These habits are cheap on day one and very expensive to retrofit later.",
        "For production, I would add input validation on every tool, guardrails against prompt injection in retrieved content, human approval for actions that spend budget or affect people, and evaluation sets that are re-run whenever the model, prompt or data changes.",
      ] },
      { h: "Lessons for anyone building agents", p: [
        "Frame the prediction precisely, because every downstream claim depends on it. Make the agent use real tools, so its answers are grounded. Design for the decision-maker, not the demo audience. Keep humans in the loop for decisions that move budgets or affect communities.",
        "These are the same principles I apply to agentic AI in enterprise and security work: clear authority, verifiable actions and evidence before autonomy. Seeing teams discover them in one afternoon was a reminder that good engineering habits are learnable fast when the problem is real.",
      ] },
      { h: "How to run an engaging hackathon", p: [
        "Agents for Impact is a strong template for organizers. A few things made it work:",
      ], checklist: [
        "One concrete, human problem with a real decision-maker, instead of an open-ended theme.",
        "Curated, open datasets ready on day one, with known limitations written down.",
        "Clear team lanes (data, agent, front end, story) so everyone contributes from minute zero.",
        "Published judging criteria shared before coding starts, not after.",
        "Experts on the floor, a visible countdown, and a meaningful next stage for the winners.",
      ] },
      { h: "Thank you", p: [
        "Thank you to the Google Cloud team, the Developer Experts community and every builder who spent a long day turning street-level heat data into something a city could use. I left with new ideas, new friends and real optimism about what agentic AI can do for communities. If you are planning a hackathon or building agents for public good, I would love to compare notes.",
      ] },
    ],
  },
  {
    title: "Enterprise Agent Security Checklist: Tool Permissions and Human Approvals",
    img: securityImage,
    pub: "iamharshverma.com",
    topic: "Enterprise Security",
    date: "November 12, 2026",
    read: "8 min read",
    href: "",
    excerpt: "A practical enterprise AI agent security checklist covering least-privilege tools, action-bound approvals, prompt injection, audit trails and runtime containment.",
    sources: [{ title: "Reddit discussion: How do we Secure Internal Enterprise Agents?", href: "https://www.reddit.com/r/AI_Agents/comments/1u5jzhv/how_do_we_secure_internal_enterprise_agents/" }, { title: "OWASP: Excessive Agency", href: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" }],
    body: [
      { p: ["A valid token does not make an agent's next action safe. Enterprise teams need to control what an agent can do, which actions need approval, and how execution is observed and stopped. Secure the execution path, not just the conversation.", "This checklist develops themes from a Reddit discussion on internal enterprise agents: per-agent tool scopes, destructive-action approvals, audit events and runtime monitoring. Our November 12 review found the original post deleted; the discussion is qualitative context, not a security standard or evidence of enterprise adoption. The implementation recommendations below are an editorial synthesis, not quotations or an endorsement of products in the thread."] },
      { h: "1. Define the agent's authority before connecting tools", p: ["Record the workflow, data classifications, accountable owner and maximum acceptable impact. Separate recommendations from execution. A customer-support agent that reads tickets should not inherit permission to export every customer record."], checklist: ["Assign each agent a distinct workload identity and owner; avoid shared employee credentials.", "Allow only required tools, operations and resource scopes; default-deny everything else outside the model.", "Use short-lived, task-scoped credentials; isolate development, testing and production identities.", "Document prohibited actions, sensitive datasets and a review date for every permission grant."] },
      { h: "2. Make approvals specific, enforceable and short-lived", p: ["A chat response saying 'approved' is not authorization. The execution service must verify a decision from an authenticated, authorized reviewer. Display the exact target, arguments, data exposure and expected consequence before the reviewer decides. Avoid approving an entire open-ended plan."], checklist: ["Require explicit approval for destructive writes, payments, external messages, sensitive exports and privilege changes.", "Bind approval to an immutable action payload, target resource, requester and expiry; changed arguments require new approval.", "Enforce single-use approvals and recheck current permissions immediately before execution; reject expired or replayed approvals.", "Fail closed when the approval service is unavailable, and use separation of duties for high-impact actions."] },
      { h: "3. Treat retrieved content and tool output as untrusted", p: ["Webpages, email, documents and tool responses can carry prompt injection. Instructions inside them must never expand permissions or authorize another tool. Prompt-level warnings help, but they are not a security boundary."], checklist: ["Validate tool arguments against schemas and explicit resource policies outside the model; reject arbitrary commands and URLs.", "Restrict outbound destinations and apply network-level egress controls, including protection against internal-address access.", "Keep secrets out of prompts, retrieved context and tool output; retrieve credentials only within the execution service.", "Preserve tenant and user access boundaries in retrieval, caches, memory and multi-agent handoffs."] },
      { h: "4. Observe behavior, not just successful logins", p: ["An agent can remain within its nominal scope while producing dangerous volumes or sequences of actions. Monitor exports, repeated failed writes, permission changes and unexpected resource access. Limit what can happen before an alert reaches a person."], checklist: ["Log identity, initiating user, tool, redacted arguments, policy decision, approval reference, result and correlation ID.", "Protect audit integrity and define retention and restricted access; never log raw credentials or unnecessary personal data.", "Set workflow-specific budgets for actions, data volume, runtime and spend; stop execution when a limit is reached.", "Alert on unusual action sequences and repeated failures, with a named responder and escalation path."] },
      { h: "5. Design containment and recovery before launch", p: ["Stopping the model is not enough if jobs are already queued. Containment needs to revoke credentials and stop pending execution as well. Treat retries as a security and reliability concern: a repeated payment or destructive write can be worse than a failed task."], checklist: ["Test an emergency stop that revokes agent access and cancels queued or scheduled actions.", "Use idempotency controls for side-effecting operations; require review after ambiguous outcomes instead of blindly retrying.", "Provide rollback or compensating actions where possible, and document irreversible operations explicitly.", "Prepare an incident runbook covering evidence preservation, containment, affected-user notification and safe restart."] },
      { h: "6. Prove the controls under adversarial conditions", p: ["A successful demonstration is not a release gate. Test the exact tools and approval paths used in production. Repeat tests when models, prompts, connectors or policies change; a change in one layer can invalidate assumptions elsewhere."], checklist: ["Test injected instructions in documents and tool output, cross-tenant requests and attempts to invoke denied tools.", "Test approval bypass, altered payloads, expired approvals, replay, revoked permissions and service outages.", "Record concrete evidence of denied actions, audit events and emergency-stop behavior; assign owners to failures.", "Start in read-only or approval-required mode, and expand autonomy only after a documented risk review."] },
      { h: "Release decision: evidence before autonomy", p: ["Use the checked items as a review aid, not a certification or a security score. If you cannot demonstrate enforcement, approval binding, auditability and containment on the real execution path, keep the agent read-only or approval-required. Security, platform and business owners should agree on the residual risk before production release.", "For a practical review, bring an agent's tool inventory, permission policy, approval payload and one redacted execution trace. Those artifacts make the conversation about enforceable controls rather than the model's intentions."] },
    ],
  },
  {
    title: "The Founder's Guide to Agentic AI: Build Trust Before Autonomy",
    img: trustImage,
    pub: "iamharshverma.com",
    topic: "Founders",
    date: "November 11, 2026",
    read: "7 min read",
    href: "",
    excerpt: "Most AI startups don't fail because their models are weak. They fail because customers can't trust what the agent will do next. A practical playbook for founders shipping agentic AI into real businesses.",
    body: [
      { p: [
        "Every founder pitch I hear in 2026 has the word \"agent\" in it. Agents that book, buy, triage, negotiate and remediate. The demos are impressive. Yet when I sit on selection committees and judge pitch nights, the question that separates fundable companies from the rest is rarely about the model. It is this: why would a customer let your agent act on their behalf?",
        "Autonomy is the product you want to sell. Trust is the product your customer is actually buying. Founders who design for trust first ship autonomy faster.",
      ] },
      { h: "1. Treat your first agent as an experiment, not a product", p: [
        "Your first agent should run in a narrow lane with a clear owner, a measurable outcome and an easy off switch. Pick one workflow where a mistake is cheap and reversible, instrument it heavily, and let real usage tell you where the agent is reliable. Breadth comes later; credibility comes first.",
      ] },
      { h: "2. Earn permissions over time", p: [
        "Humans get promoted by demonstrating judgment. Agents should too. Start in suggest-only mode, graduate to act-with-approval, and only then move to act-and-report. Tie each step to evidence: accuracy on real tasks, escalation rates, and how often humans override the agent. This is the simplest way to turn a scary demo into a purchase order.",
      ] },
      { h: "3. Identity and intent are your new security perimeter", p: [
        "An agent with credentials is a new kind of employee. Give every agent its own identity, scope its access to the task, and log the intent behind each action, not just the action itself. Enterprise buyers will ask how you prevent an agent from being manipulated through prompts, tools or poisoned data. Having a crisp answer is a competitive advantage, not a compliance chore.",
      ] },
      { h: "4. Your moat is orchestration, not the model", p: [
        "Frontier models are getting cheaper and more interchangeable every quarter. What compounds is the system around them: clean proprietary data flows, evaluation pipelines, feedback loops from real users, and the workflow know-how embedded in your product. Investors increasingly look for intelligence per dollar, meaning how much reliable work you deliver for every unit of compute you spend.",
      ] },
      { h: "5. Make reliability visible", p: [
        "Customers trust what they can see. Ship dashboards that show what the agent did, why, and with what confidence. Publish your evaluation results. Make rollback a single click. Observability is not an engineering afterthought; it is part of the sales motion.",
      ] },
      { h: "A simple checklist before you scale", p: [
        "Can a customer explain in one sentence what your agent is allowed to do? Can you show the evidence that it does that reliably? Can anyone stop it instantly? Do you know who is accountable when it is wrong? If the answer to all four is yes, you are ready to expand autonomy. If not, that is your roadmap.",
        "The founders who win the agentic era will not be the ones with the boldest demos. They will be the ones whose customers sleep well at night.",
      ] },
    ],
  },
];
