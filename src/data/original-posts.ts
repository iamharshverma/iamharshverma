import securityImage from "@/assets/enterprise-agent-security.jpg";
import trustImage from "@/assets/agentic-ai-trust.jpg";
import type { Blog, BodyImage } from "./media";
import a4iHall from "@/assets/a4i-hackathon-hall.jpg.asset.json";
import a4iTeams from "@/assets/a4i-hackathon-teams-building.jpg.asset.json";
import a4iJudge from "@/assets/harsh-verma-a4i-hackathon-judge.jpg.asset.json";

export type OriginalPost = Blog & { body: { h?: string; p: string[]; checklist?: string[]; img?: BodyImage }[]; sources?: { title: string; href: string }[] };

// Essays published first on this site. href is empty: the page itself is the original.
export const originalPosts: OriginalPost[] = [
  {
    title: "Judging Google Cloud's Agents for Impact Hackathon as a Google Developer Expert",
    img: a4iHall.url,
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
