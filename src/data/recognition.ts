import magazinePdf from "@/assets/harsh-verma-passion-vista.pdf.asset.json";
import certificatePdf from "@/assets/harsh-verma-passion-vista-certificate.pdf.asset.json";
import cover from "@/assets/harsh-verma-magazine-1.jpg.asset.json";
import storyPageTwo from "@/assets/harsh-verma-magazine-2.jpg.asset.json";
import storyPageThree from "@/assets/harsh-verma-magazine-3.jpg.asset.json";
import certificate from "@/assets/harsh-verma-certificate-1.jpg.asset.json";
import cioStory from "@/assets/harsh-verma-cio-story-updated.pdf.asset.json";
import cioCertificate from "@/assets/harsh-verma-cio-certificate.pdf.asset.json";
import cioTrophy from "@/assets/harsh-verma-cio-trophy.pdf.asset.json";
import cioCertificatePage from "@/assets/harsh-verma-cio-updated-certificate-1.jpg.asset.json";
import cioTrophyPage from "@/assets/harsh-verma-cio-updated-trophy-1.jpg.asset.json";
import cioStory1 from "@/assets/harsh-verma-cio-updated-story-1.jpg.asset.json";
import cioStory2 from "@/assets/harsh-verma-cio-updated-story-2.jpg.asset.json";
import cioStory3 from "@/assets/harsh-verma-cio-updated-story-3.jpg.asset.json";
import cioStory4 from "@/assets/harsh-verma-cio-updated-story-4.jpg.asset.json";
import cioStory5 from "@/assets/harsh-verma-cio-updated-story-5.jpg.asset.json";
import cioStory6 from "@/assets/harsh-verma-cio-updated-story-6.jpg.asset.json";
import cioStory7 from "@/assets/harsh-verma-cio-updated-story-7.jpg.asset.json";
import cioStory8 from "@/assets/harsh-verma-cio-updated-story-8.jpg.asset.json";
import primePortrait from "@/assets/harsh-verma-prime-interview.jpg.asset.json";
import bcsPortrait from "@/assets/harsh-verma-bcs-interview.jpg.asset.json";
import xRaisedPortrait from "@/assets/harsh-verma-x-raised-interview.jpg.asset.json";
import hackerNoonCover from "@/assets/harsh-verma-hackernoon-interview.jpg.asset.json";

export const magazineFeatures = [{
  featured: true,
  title: "The Most Admired Global Indians 2026",
  name: "Harsh Verma",
  outlet: "Passion Vista",
  kind: "Cover feature",
  headline: "Where AI, Cybersecurity and Human Purpose Meet at Scale",
  storyUrl: "https://www.passionvista.com/harsh-verma-where-ai-cybersecurity-and-human-purpose-meet-at-scale/",
  cover: cover.url,
  documents: [
    { id: "magazine", label: "Magazine PDF", url: magazinePdf.url, pages: [cover.url, storyPageTwo.url, storyPageThree.url] },
    { id: "certificate", label: "Certificate", url: certificatePdf.url, pages: [certificate.url] },
  ],
}, {
  title: "Building AI Systems That Can Be Trusted",
  name: "Harsh Verma",
  outlet: "Prime Insightful",
  kind: "Interview",
  headline: "Harsh Verma on the Future of Intelligent, Secure Technology",
  storyUrl: "https://primefulinsights.com/harsh-verma/",
  cover: primePortrait.url,
  documents: [] as { id: string; label: string; url: string; pages: string[] }[],
}, {
  title: "Top 5 Most Dynamic Leaders Shaping the Future in 2026",
  name: "Harsh Verma",
  outlet: "CIO Insightful",
  kind: "Cover feature",
  headline: "Building the Future of Trustworthy AI in a World of Intelligent Systems",
  storyUrl: "https://cioinsightful.com/top-5-most-dynamic-leaders-shaping-the-future-in-2026/",
  cover: cioStory1.url,
  documents: [
    { id: "magazine", label: "Cover story", url: cioStory.url, pages: [cioStory1.url, cioStory2.url, cioStory3.url, cioStory4.url, cioStory5.url, cioStory6.url, cioStory7.url, cioStory8.url] },
    { id: "certificate", label: "Certificate", url: cioCertificate.url, pages: [cioCertificatePage.url] },
    { id: "trophy", label: "Trophy", url: cioTrophy.url, pages: [cioTrophyPage.url] },
  ],
}, {
  title: "Harsh Verma FBCS",
  name: "Harsh Verma",
  outlet: "BCS, The Chartered Institute for IT",
  kind: "Interview",
  headline: "A conversation on BCS Fellowship, responsible AI, mentoring future tech leaders and technology that benefits society.",
  storyUrl: "https://www.bcs.org/membership-and-registrations/our-members/harsh-verma-fbcs",
  cover: bcsPortrait.url,
  documents: [],
}, {
  title: "Engineering Beyond the Code",
  name: "Harsh Verma",
  outlet: "X-Raised · The AI Journal",
  kind: "Interview",
  headline: "Harsh Verma on the future of AI and cybersecurity, strategic thinking and the skills engineers need in an AI-driven world.",
  storyUrl: "https://aijourn.com/harsh-verma-on-engineering-beyond-the-code-the-future-of-ai-and-cybersecurity/",
  cover: xRaisedPortrait.url,
  documents: [],
}, {
  title: "The Production Gap: Your AI Model Isn’t as Reliable as You Think",
  name: "Harsh Verma",
  outlet: "HackerNoon",
  kind: "Interview",
  headline: "Harsh Verma on engineering resilient AI for production, securing autonomous agents and the technical judgment needed to build systems people can trust.",
  storyUrl: "https://hackernoon.com/the-production-gap-your-ai-model-isnt-as-reliable-as-you-think-interview",
  cover: hackerNoonCover.url,
  documents: [],
}];