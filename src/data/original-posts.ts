import executiveAsset from "@/assets/harsh-verma-executive.jpg.asset.json";
import type { Blog } from "./media";

export type OriginalPost = Blog & { body: { h?: string; p: string[] }[] };

// Essays published first on this site. href is empty: the page itself is the original.
export const originalPosts: OriginalPost[] = [
  {
    title: "The Founder's Guide to Agentic AI: Build Trust Before Autonomy",
    img: `https://www.iamharshverma.com${executiveAsset.url}`,
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
