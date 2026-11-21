# Harsh Verma — AI, Cybersecurity & Agentic Systems

Official portfolio of **Harsh Verma**, Principal Software Engineer at Palo Alto Networks | AI, Cybersecurity & Agentic Systems, Forbes Technology Council member, author, keynote speaker and advisor.

🌐 **Website:** [www.iamharshverma.com](https://www.iamharshverma.com)

## About Harsh

Harsh's professional interests span agentic AI, cybersecurity and trustworthy autonomous systems. His owner-provided portfolio figures include 27+ peer-reviewed papers and six patents in total: two granted and four pending. Pending inventions are not represented as granted patents. Public project reviews distinguish inspectable code from proposed improvements.

- **Education:** Stanford Graduate School of Business, UT Dallas
- **Recognition:** Forbes Technology Council, BCS Fellow, ACM and industry keynotes
- **Speaking:** ACM Distinguished Keynote, UC Berkeley SkyDeck, SF Tech Week, international conferences
- **Mentoring and judging:** Techstars, UC Berkeley SkyDeck, Mayfield AI Garage, global hackathons
- **Books (January 2027):** *Beyond AI Engineering* and *AI vs. AI*
- **Writing:** Forbes Technology Council, HackerNoon, RSA Conference, The AI Journal

## What's on the site

| Page | What it offers |
| --- | --- |
| Home | Rotating roles with matching portraits, interactive expertise map, highlights, FAQ |
| About | Interactive career and education journey with timeline |
| Research | Four technical pillars, papers, patent references and research interests |
| Engineering | Public-source architecture case studies with implementation limitations |
| Knowledge Hub | Unified search, topic graph, filters and connected resources |
| Books | Both forthcoming books, individual details, C.A.O. explorer and update requests |
| Resources | Shared biographies and speaker/media downloads |
| Speaking | Keynote theater and a global stage map of events |
| Media | Searchable press, podcasts and awards |
| Insights | 30+ articles with individual pages and a newsletter |
| Press Kit / Media Kit | Bio, high-resolution photos, quotes and PDF downloads |
| Collaborate / Booking / Contact | Keynote and advisory booking requests |

**Extras:** "Ask Harsh" visitor assistant, six selectable themes, accessible site search, structured data, sitemap and `llms.txt`. GitHub Pages opens email drafts for enquiries and signups; opening a draft is not a confirmed submission or enrollment. Lovable-hosted preview requests can be saved separately.

## Tech stack

React 19 · TanStack Start · Vite · Tailwind CSS v4 · Framer Motion · Lovable Cloud (database and AI)

## Run locally

```sh
npm install
npm run dev
```

Site content lives in `src/data/`. Shared identity, research pillars, case studies and the Knowledge Hub reuse these records. After adding content, run `python3 scripts/update-authority-sitemap.py` with the local preview running to merge its discoverable URLs into the static build's sitemap. GitHub Pages uses that sitemap as its page manifest.

Regenerate biography downloads from shared records:

```sh
bun -e "import { professionalIdentity } from './src/data/identity.ts'; import { flagshipTalks } from './src/data/flagship-talks.ts'; console.log(JSON.stringify({identity: professionalIdentity, talks: flagshipTalks}))" | python3 scripts/generate-press-resources.py
```

The offline PDF generator requires Python's `reportlab`; it is not bundled into the website runtime.

## Contact

Media, speaking and advisory enquiries: [harshverma59@gmail.com](mailto:harshverma59@gmail.com) · [Book Harsh](https://www.iamharshverma.com/booking)

---

Built with [Lovable](https://lovable.dev).
