# Professional Authority & Knowledge Ecosystem

## Goal and boundaries
Evolve iamharshverma.com into a connected engineering, research, speaking and author platform while preserving the existing homepage, all themes and established public URLs. Reuse verified public content; never invent achievements, publications, measurements, employer architectures or book resources.

Canonical positioning: **Principal Software Engineer at Palo Alto Networks | AI, Cybersecurity & Agentic Systems**. Keep job title, employer and expertise distinct where appropriate.

## Initial implementation assessment

### Existing capabilities to reuse
- Reuse central identity, career, education, affiliations, awards, research, books, articles, keynotes and press records; no new editorial CMS or database.
- Reuse navigation, introductions, animations, themes, article layouts, portraits, press downloads and enquiry forms.
- Insights has individual article pages and metadata; RSAC, Forbes and HackerNoon collections reuse the same articles.
- Search, visitor Q&A, a stable Person identity, canonical URLs, sitemap, robots.txt, llms.txt, analytics and static-page generation are present. Expand and validate them rather than recreating them.

### Confirmed issues and gaps
- Homepage HTML currently contains **0+, 0+, 0 and 0+** before the shared counter animation runs. Make actual approved numbers available before JavaScript and independently of animation.
- Research records still advertise books as coming in October/2026, while book records correctly say January 2027.
- Biography copies diverge; the current “50 words” download label does not match the short biography's length. Create exact 50/100/250-word variants from approved facts.
- Press totals differ between shared profile and Media data. Reconcile definitions and supporting sources rather than simply incrementing figures.
- Validate portrait URL resolution on static hosting, consolidate verified education and deduplicate sameAs entries.
- Current search routes many results to collection pages instead of their specific content, and lacks unified article/book discovery and topic filters.
- Four dedicated research pillars, technical case-study pages and the Knowledge Hub are not yet present.
- Lovable-hosted enquiries can save requests; **GitHub Pages enquiries open the visitor's email application instead**. An opened email draft is not a delivered request. Booking email notifications are not wired because a verified sender is missing.
- Static newsletter signup currently says “You're on the list” after opening an email draft; correct this false confirmation.
- Regenerate biography/topic PDFs when shared content changes.

### New pages and reusable structures
- Four research pillars, Engineering & Architecture with case-study details, Knowledge Hub, resource index and supported keynote detail pages. Expand existing pages rather than duplicating them.
- Shared biography variants and sourced metrics; research/case-study records with explicit evidence status; maintainable diagrams with text alternatives; a shared content/topic index; pathway-specific enquiry fields.

## Delivery phases

### Phase 1 — Audit and foundation
1. Standardize identity and exact 50/100/250-word biographies across pages, downloads and schema.
2. Inventory metrics: value, definition, source, verification status, public visibility and last-confirmed date when known. Hide unsupported figures; collection sizes do not establish achievements.
3. Make counters readable before animation, respecting reduced motion and navigation.
4. Reconcile dates, patent status and conflicting claims; fix broken links/images and false static-form/subscription confirmations.
5. Preserve homepage appearance and normal text entrances while keeping content available without JavaScript.

**Validation:** exact biography word counts, concrete metric/date rules, initial HTML, fresh navigation, download consistency, phone/landscape/desktop checks and applicable existing tests.

### Phase 2 — Research and engineering authority
1. Add Agentic AI Architecture, AI Security & Governance, Agent Trust & Reputation and Autonomous Cyber Defense using a shared thesis/problem/concepts/diagram/sources/related-content layout.
2. Turn the identity → behavior → evidence → reputation → risk → authorization model into a clearly labeled proposed conceptual framework, not an asserted published result.
3. Create Engineering & Architecture with reusable case-study details. Start from inspectable public repositories and public event/project material; publish only findings supported by the source.
4. Organize papers and patents with explicit published/granted/pending status. Do not expose unpublished patent contents or misrepresent aggregate publication counts as individual papers.
5. Connect pillars to existing Insights articles, talks, books and authorized case studies.

**Validation:** source-backed claims, public-project provenance, accessible diagrams, direct links, mobile layout and topic relationships.

### Phase 3 — Speaking, media and conversion
1. Expand The Era of Agentic AI, AI vs. AI: The Future of Cybersecurity and Beyond AI Engineering with audiences, takeaways, recordings and booking links. Label unconfirmed duration/format as proposed options.
2. Add source-based media categories and subject filters; retain original links and distinguish promotional material only where classification is known.
3. Refresh biography/headshot/topic downloads using shared content.
4. Give Collaborate four clear pathways and extend enquiries for event name/date/website, audience/size, topic, format, location and relevant context.
5. Preserve client/server validation, spam controls, private lead access, honest confirmation/error states and privacy notices.
6. Track successful saved submissions and actual downloads separately from opening an email application. Connect notification delivery only with an approved, verified sender.

**Validation:** real saved enquiry readback through Cloud management, invalid submissions, spam handling, error/confirmation states, download checks and analytics. Check GitHub Pages behavior separately; do not claim email delivery without a delivery result.

### Phase 4 — SEO and professional identity graph
1. Reconcile the stable Person entity, employer, education, professional profiles and author relationships across pages.
2. Add appropriate ProfilePage, Article, Book, CollectionPage and BreadcrumbList metadata. Use ScholarlyArticle, Event and VideoObject only when required facts are available; never invent upload dates, DOI or endorsements.
3. Add new pages to static generation and sitemap; validate unique metadata, canonical URLs, social images, robots directives and no-JavaScript content.
4. Update llms.txt and internal discovery to reflect new content. Audit image sizes, accessibility and mobile performance.
5. Submit the updated sitemap when authorized. Individual Google “Request indexing” and search ranking/Knowledge Panel outcomes remain outside automated control.

**Validation:** public routes, schema consistency, sitemap coverage, robots and static-hosted HTML.

### Phase 5 — Book ecosystem and resources
1. Expand both existing book entries with author perspective, audience, topics, related articles and the verified official website; preserve January 2027 availability.
2. Add only supplied or authorized sample chapters, templates and reader resources. Do not create purchase links or downloadable manuscripts that do not exist.
3. Build a resource index with actual files and source links.
4. Verify backlinks from the two book sites where access is available; changes to separate sites require separate access/authorization.

**Validation:** cover loading, resource downloads, availability wording, official outbound links and accessible navigation.

### Phase 6 — Knowledge Hub
1. Build a shared content index from approved existing records.
2. Add search and content/topic/publication/technology/date filters where supported, with reset, empty states, keyboard access and direct URLs.
3. Connect research, case studies, papers/patents, articles, books, presentations and interviews through topic views and related resources.
4. Add the graph as optional topic navigation with a list alternative, keyboard/touch access and bounded rendering cost.
5. Add Knowledge Hub and Research & Expertise navigation without rebuilding Home or overcrowding phone menus.

**Validation:** search, filters/reset, topic navigation, graph/list parity, phone/desktop fit and indexable pages.

## Integrations, decisions and limitations
- No new CMS, search service or paid dependency is required for the initial content platform.
- Keep GitHub Pages hosting initially. Use existing Cloud capabilities for saved submissions only after resolving how the live static site calls an approved public submission destination; do not expose private keys or silently move hosting.
- A verified sender domain is required for booking/media notification email. Without it, delivery remains explicitly incomplete.
- Private case studies, unpublished inventions, unverified statistics and missing reader files stay unpublished. Label independent examples without implying employer endorsement.
- The confirmed release window is January 2027, not a confirmed January 1 launch. Replace any misleading exact countdown with the month-based availability unless an exact date is supplied.
- Do not copy changes to GitHub or change the live website until Harsh explicitly requests that delivery; local saves are separate from publishing.

## Phase reports and completion
Start with Phase 1 and follow the brief's order. Report functionality, changed pages, test evidence, dependencies and next priorities after each phase; maintain the roadmap. Completion requires all applicable acceptance checks. Evidence-dependent content and external delivery stay gated by approval, never invented placeholders.