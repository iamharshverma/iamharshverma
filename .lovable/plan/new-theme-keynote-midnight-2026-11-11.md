# New theme: "Keynote Midnight"

A sharper, more executive look that reads as founder + engineer + speaker at once, replacing the current gold/serif style.

## Look and feel
- **Colors:** deep midnight-navy background, crisp off-white text, one confident electric-blue accent (engineer) with a warm signal-amber highlight used sparingly for stats and awards (speaker/stage energy). Cards in slightly lighter slate with fine hairline borders.
- **Typography:** Space Grotesk for headlines (modern, founder/tech), DM Sans for body text, JetBrains Mono for small labels, dates and tech tags (engineer detail).
- **Hero:** bigger, bolder name; rotating title in electric blue; a subtle grid backdrop (like a blueprint) with the animated network on top; photo framed like a stage spotlight.
- **Details:** sharper corners (less rounded), stronger contrast, blue glow on hover, amber numbers on stats, "terminal-style" small labels such as `// founder · engineer · speaker`.
- **Hero line:** "Founder mindset. Engineer's precision. Speaker's voice." under the name.

## What changes
- Colors, fonts, glows and backgrounds across every page update automatically from the shared style settings.
- Home hero gets the new tagline, the grid background and the spotlight photo frame.
- Headings across pages switch from the serif italic gold to bold grotesk with blue highlights.
- No content, pages or features change.

## Technical notes
- Rewrite tokens in src/styles.css (oklch): background, card, primary (electric blue), new `--signal` amber, gradients, glow shadow, `bg-grid` utility; replace `text-gold-gradient`/`bg-gold-gradient` utilities with blue-based equivalents under the same names or rename and update usages.
- Swap Google Fonts link in __root.tsx; update `--font-display`/`--font-sans`.
- Remove `italic` from highlighted headline spans; reduce radius to 0.5rem.
- NeuralField reads the new accent token.
