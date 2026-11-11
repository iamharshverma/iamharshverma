# Making the portfolio more effective (keeping Keynote Midnight and the other 3 themes)

Goal: turn visitors (founders, event organisers, press) into bookings, while the site keeps its founder / engineer / speaker identity.

## 0. Your photo when the link is shared (do first)
- Replace the Lovable icon in the browser tab and in shared links with an icon cut from your portrait. It should be round, crisp at small sizes, and include a phone home-screen version.
- Add a 1200x630 share image with your photo, name and title to the Home page and main pages, so LinkedIn, WhatsApp, X and Slack show you instead of a default picture.
- Already-shared links may show the old preview until each app refreshes it; LinkedIn's Post Inspector can force a refresh.

## 1. Conversion (highest impact)
- **Sticky "Book Harsh" bar** on mobile: one tap to Booking, shown after the visitor scrolls past the top of the page.
- **"Work with me" paths on Home**: three cards (Keynote, Founder advisory, Media/Press). Each opens Booking with that topic already picked.
- **Proof next to every call to action**: a short line such as "Spoke at RSA Conference · Forbes Technology Council" under the main buttons.
- **Thank-you moment**: after a booking (with the confetti), show what happens next and links to the speaker sheet and recent talks.

## 2. Credibility and story
- **Signature talks block**: the 3 strongest keynotes, each with a short clip, length, audience and outcomes.
- **"As featured in" logo strip**: grayscale logos that turn to the theme color on hover. Each logo links to its source article; only verified coverage.
- **Numbers that count up on scroll**: articles, talks, awards and years in AI security. Only real figures from the site's existing content.

## 3. Interaction polish (on-theme)
- **Subtle effects**: a spotlight cursor glow in the dark theme and a soft glass sheen in the glass themes. Both turn off when a visitor's device asks for less motion.
- **Smooth page transitions** between pages.
- **Reading progress bar, reading time and "Related articles"** on Insights articles.
- **Insights filters by topic** (Agentic AI, AI Security, Leadership, Founders) plus search.

## 4. Content for founders (also helps search)
- **"AI Advisory for Founders" page**: who it is for, how it works, problems it solves, FAQs and a booking button.
- **Agentic AI topic page** that gathers related articles, talks and the books.

## 5. Speed and quality
- Smaller, sharper versions of the portrait photos, so pages load faster on mobile.
- Accessibility pass on all four themes: text contrast, keyboard focus and image descriptions.

## Suggested order
1. Share icon and preview image (section 0)
2. Conversion items (section 1)
3. Signature talks and logo strip (section 2)
4. Advisory and Agentic AI pages (section 4)
5. Polish, speed and accessibility (sections 3 and 5)

Everything is pushed to GitHub when done, so iamharshverma.com updates automatically.

## Technical notes
- Favicon: square crops of the portrait in `public/` (favicon.png, apple-touch-icon.png), linked from the root head, and the old favicon.ico removed. Share image: an absolute https URL on www.iamharshverma.com, set per page (never in the root).
- New pages get their own titles, descriptions, structured data and sitemap entries.
- Booking presets use a validated `topic` value in the page address.
- Animations respect reduced-motion settings.
- No quotes, numbers or logos are invented; content reads from the existing content files.
- Server features keep their email fallbacks on the GitHub version.
