export type UpcomingTalk = {
  title: string;
  event: string;
  role: string;
  date: string;
  location: string;
  summary: string;
  links: { label: string; href: string }[];
};

export const upcomingTalks: UpcomingTalk[] = [
  {
    title: "AI & Cybersecurity in Healthcare",
    event: "Health Tech Week 2027",
    role: "Speaker",
    date: "January 2027",
    location: "San Francisco, CA",
    summary:
      "How health systems can adopt AI agents without opening new attack surfaces: securing clinical workflows, protecting patient data and keeping humans in the loop where it matters most.",
    links: [
      { label: "Speaker profile", href: "https://healthtechweek.org/speakers/harsh-verma" },
      { label: "Event site", href: "https://healthtechweek.org/" },
      { label: "Register on Luma", href: "https://luma.com/HTSummit27" },
      { label: "LinkedIn feature", href: "https://lnkd.in/p/gZdmbTmf" },
    ],
  },
];
