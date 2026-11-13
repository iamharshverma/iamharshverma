<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Portfolio content lives in src/data (profile.ts hub, media.ts for press/keynotes/blogs/judging, collaborate.ts); pages read from it so updates happen in one place.
- Recognition-only features live in src/data/recognition.ts with thumbnails, descriptions, original PDFs and page previews; a per-entry featured flag enables the larger editorial treatment while rows directly open document tabs or the interview URL, protecting the homepage and supporting mobile viewing.
- Site-hosted checklist articles use the shared Insights article route with checklist items and source links in original-post data; this keeps static pages, discovery and citations consistent.
- The dedicated professional profile reuses profile and keynote data and references the shared Person schema identity, so search-focused content stays consistent with the portfolio.
- Shared site chrome (Header, Footer, CommandPalette) is mounted in __root.tsx around <Outlet />.
- Visitor Q&A assistant streams from src/routes/api/chat.ts; its knowledge is built server-side from src/data in src/lib/ai/knowledge.server.ts, so new content is answerable automatically.
- Custom analytics events are emitted inline via window.__lovableEvents.track and registered in .lovable/events.json.
- Public contact and booking requests share a client/server validated insert-only server function; private rows are available only through Cloud management so visitors cannot read leads.
- The header owns the theme switch, with semantic CSS variables and a stored browser preference so every page shares the selected appearance.
- Home and About reuse PortraitOrbit with page-specific center text, center links and optional section links passed as props, so portrait links and scroll animation stay consistent without changing other pages.
- PortraitOrbit measures geometry with ResizeObserver and animates numeric transforms; React state changes only at expansion boundaries to avoid per-frame layout and rerenders.
- PageHero accepts optional side media without changing text-only pages; About owns its editorial portrait introduction and accessible background disclosure to keep both designs page-specific.
- Press resources and sourced recommendations live in src/data; the press PDF is prebuilt from the same biography and topics and served as a same-origin static download.
- GitHub Pages static build: `vite.pages.config.ts` + `.github/workflows/github-pages.yml`, toggled by `deploy.config.json`; server features fall back via `src/lib/site-mode.ts` (STATIC_SITE). Why: Pages has no server. Uploaded photos are mirrored in `github-pages/__l5e` because Lovable asset URLs only resolve on Lovable hosting — re-copy when adding assets.
