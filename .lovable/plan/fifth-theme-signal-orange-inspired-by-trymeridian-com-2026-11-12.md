# Fifth theme: "Signal Orange" (inspired by trymeridian.com)

A bright, modern tech look added as a fifth option to the same theme icon in the header.

## Look and feel
- **Background:** soft warm off-white at the top that turns into a strong orange glow toward the bottom of each page's main banner, like Meridian's hero.
- **Colors:** near-black text, vivid orange (#F75D00) for main buttons and highlights, grey for secondary text, and a small green accent for "live" or success states.
- **Buttons:** solid orange main buttons and solid black secondary buttons, with small rounded corners (not pill-shaped).
- **Typography:** a clean modern font for headings and text (Space Grotesk / DM Sans, already used on the site), plus a monospaced font for the menu and small labels, like Meridian's navigation.
- **Details:** faint dashed vertical guide lines in the background, white header bar, crisp thin borders on cards and no frosted glass.
- **Logo:** the deep-blue and red HV logo stays the same.

## Theme switch
- The theme icon goes through all five: Keynote Midnight → Classic Light → Founder Glass → Executive Sky → Signal Orange → back to Midnight.
- A new icon (an orange sun or orbit) shows when Signal Orange is next. Your choice is remembered like the other themes.

## Check before finishing
- Home, About, Speaking, Books, Insights, Booking and the menu in the new theme, on computer and phone, to fix any hard-to-read text.
- Push to GitHub so iamharshverma.com gets the new theme.

## Technical details
- `src/styles.css`: add a `:root[data-theme="signal"]` block with semantic color tokens, a hero gradient, dashed guide lines and button overrides, following the existing theme blocks.
- `ThemeToggle.tsx`: add `signal` to `THEMES`/`NAMES` and an icon (`Orbit`).
- No new font download needed, since JetBrains Mono is already loaded.
