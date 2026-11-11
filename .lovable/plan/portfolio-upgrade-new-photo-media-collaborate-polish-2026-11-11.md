# Portfolio upgrade: new photo, Media, Collaborate, polish

## 1. New portfolio picture
- Use your uploaded café portrait as the main photo on Home, About and Contact, and as the share image. The stage photo stays on the Speaking page.

## 2. New "Media" page (press & thought leadership)
Built from harshverma.me/page-media (40+ features: Business Insider, USA Today, Yahoo Finance, HackerNoon, Forbes via SkyDeck, Times Square NYC broadcast, podcasts, keynotes).
- **"As seen on" logo wall** that scrolls and glows on hover.
- **Featured spotlight carousel**: big cards for top stories (Times Square broadcast, Business Insider, USA Today, HackerNoon interview) with images.
- **Interactive press wall**: filter chips (Press, Interviews & Podcasts, Keynotes & Workshops, Awards news, Listings), live search, and a year/outlet count. Each card opens a quick-view panel with summary, image and "Read article" link.
- **Media impact stats** strip (features, outlets, countries, podcasts) with animated counters.

## 3. New "Collaborate" page (from page-social) + Blogs and Keynotes
- **Brands worked with** logo grid.
- **Ways to work together**: 6 interactive cards (Brand collaborations, Keynote & moderation, Board advisory, Masterclasses, Podcast guest, 1:1 mentorship) that expand on click.
- **Who you'll reach**: audience persona switcher (Enterprise tech leaders / AI engineers / Founders & investors) showing seniority, regions and industries as animated bars.
- **Campaign impact estimator**: sliders for format and number of posts that show estimated reach.
- **Creator badges** (Favikon Gold Tier, LinkedIn Rising Star, Category Champ, Niche Ninja).
- **Blogs**: section of articles and Forbes/HackerNoon pieces with thumbnails.
- **Keynotes**: Speaking page expanded with real talks (UC Berkeley SkyDeck Batch 21/22, Health Tech Week 2026, SF Tech Week, VLink podcast Ep. 55, FutureAGI, etc.) shown as an interactive timeline with photos.

## 4. Review and polish all pages
- Visit every page at desktop and mobile size; fix contrast (muted text, logos on dark backgrounds get light tiles), spacing and card alignment.
- Consistent page openers: `// label`, bold headline with blue highlight, short intro, and one identity strip (Founder · Engineer · Speaker).
- Navigation adds Media and Collaborate; mobile menu re-checked.

## 5. More interactive feel
- Scroll progress bar at the top, magnetic main buttons, tilt-on-hover cards, image lightbox for galleries, a "scroll to top" button, page fade transitions, and a subtle spotlight that follows the cursor on cards.

## Technical notes
- Upload the portrait via lovable-assets; reference the pointer in profile data.
- Scrape full page-media, page-social, blog and events content (titles, outlets, links, image URLs) into new arrays in src/data (media.ts, collaborate.ts), keeping profile.ts as the hub.
- New routes: src/routes/media.tsx, src/routes/collaborate.tsx with own head(); update nav and command palette.
- Shared components: Lightbox, TiltCard, ScrollProgress, Magnetic.
- Verify each route with Playwright screenshots (1280 and 390 widths).
