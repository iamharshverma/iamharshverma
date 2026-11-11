# Next-level ideas for your portfolio

A menu of upgrades, grouped by goal. Approve to build the top tier (Tier 1); reply with any numbers you want added or dropped.

## Tier 1 — High impact, recommended first

1. **Blog / Insights hub with real article pages**
   Each article gets its own page (title, summary, reading time, link to the original), so Google indexes every piece and the Ask Harsh assistant can cite them.
2. **Interactive "Speaking world map"**
   A globe/map pinning every keynote, panel and judging event; click a pin to see the talk, year and photo.
3. **Book pre-order / waitlist signup**
   Email capture for both January 2027 books with a live countdown, stored privately in your backend.
4. **"Ask Harsh" upgrades**
   Suggested-question chips per page (e.g. on Books: "What is the C.A.O. framework?"), source links in answers, and a "Book a call" button when the visitor shows booking intent.
5. **Newsletter signup** in the footer and at the end of articles.

## Tier 2 — Wow factor

6. **Live "Now" page** — what you're building, reading and speaking on this month.
7. **Patents and papers explorer** — searchable, filterable cards with citation counts and topic tags.
8. **Speaker reel section** — embedded keynote videos with chapter markers.
9. **Animated stats wall** — reach, audiences, countries, papers, with scroll-triggered counters.
10. **Ambient theme touches** — subtle cursor spotlight and section transitions, tuned for each of the 4 themes.

## Tier 3 — Conversion and trust

11. **Calendar availability on Booking** — show open months for keynotes.
12. **Logo wall of organizations** you've worked with or spoken at, linking to proof.
13. **Downloadable one-page speaker sheet** auto-built from the same content as the press kit.
14. **Email notifications for bookings** — still waiting on you to set up a sending email domain.

## Technical details

- Articles: new `src/routes/insights.$slug.tsx` route reading from `src/data/media.ts`, each with its own title, description and Article structured data; added to the sitemap.
- Map: client-only lazy-loaded map component with event coordinates added to the media data.
- Waitlist/newsletter: new insert-only table with row security and rate limiting, matching the existing enquiry pattern.
- Assistant: page-aware starter prompts and source citations from the existing knowledge builder.
