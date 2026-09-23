# Design Map

## Spacing Scale
- Base unit: 4px
- Common values: 4px (x116), 8px (x135), 12px (x46), 16px, 24px (x18), 48px (x9)
- Off-grid nudges: 2px, 6px (x76), 10px, 11px
- Section gap: ~150-224px of empty space (224px measured), no rules between sections
- Method: `gap` (e.g. `ul` gap 8px); margins are 0 on h3, p, ul, nav

## Font Hierarchy
- h1: 64px / 64px, weight 510, tracking -1.408px, Inter Variable
- h2: 48px / 48px, weight 510, tracking -1.056px
- h3: 20px / 26.6px, weight 590, tracking -0.24px
- h4: 16px / 28px, weight 590
- Body: 15px / 24px, weight 400
- UI: 13-14px, weight 400 / 510
- Meta: 12px (most common size, x201)
- Mono: Berkeley Mono at 12-13px for issue IDs and inline code

## Color Palette
- Background: `#08090A` (64.1% of background area)
- Surface: `#0F1011` (20.7%), raised `#161718`
- Text: `#F7F8F8`, `#E2E4E7`, `#D0D6E0`, `#8A8F98` (body/nav, x190), `#62666D` (meta, x132)
- Border: `rgba(255,255,255,0.08)`
- CTA: near-white pill (approx from screenshot)
- Mock-UI only (under 1% of area): pink `#F79CE0`, green tint `rgba(0,255,5,0.1)`

## Image Ratios
- Hero app screenshot: 1.79:1 (2560x1429)
- Agent panel: 0.77:1 (400x520)
- Comment / row cards: ~4.5:1 (662x147, 381x82)
- Avatars and logos: 1:1 (14, 16, 36px)

## Component Tokens
- Radius: 4px, 6px, 8px, 9px, 12px, 9999px (pills, x72), 50% (avatars)
- Nested radius: 12px panel > 9px card > 6px/4px chips
- Shadows: `0 0 0 1px rgba(0,0,0,.2)`; `0 2px 32px rgba(0,0,0,.25)`; `inset 0 0 0 .5px rgba(255,255,255,.08)`; `inset 0 0 0 1px rgba(255,255,255,.05)`; `inset 0 0 0 1px #23252A`
- Buttons: 13px, weight 400/510, pill 9999px, 12px side padding
- Grid: app-mock frame `232px 1072px`; footer 5 columns; content ~1272px wide (x 77-1348); nav 72px with 1px bottom hairline
- Motion: 0.1s / 0.16s on border-color, background, color, filter; `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- `:focus-visible` and `prefers-reduced-motion` are both present

---

# Taste DNA

### No Brand Accent
- **Trigger**: When the designers faced a dark page where a brand hue would be the usual way to mark the primary action.
- **Decision**: They chose a white pill button on near-black (`#08090A`) over a saturated brand-color CTA and accent links.
- **Reason**: The mock-ups contain colored status icons and labels, which are the product's own signals. A page-level accent would compete with them.
- **Evidence**: No chromatic color in nav, links or buttons. `#08090A` is 64.1% and `#0F1011` is 20.7% of background area. The CTA is a 9999px near-white pill, and the accent candidates are all grays and white.

### Lightness Ladder
- **Trigger**: When the designers faced a large amount of small text on a dark surface where bold weights would smear.
- **Decision**: They chose five steps of text lightness and 400/510 weights over larger sizes and heavier weights to rank information.
- **Reason**: On dark backgrounds, bolder type blooms and sizes inflate the panels. Lightness lets a reader skip dim meta text without it being hidden.
- **Evidence**: `#F7F8F8`, `#E2E4E7`, `#D0D6E0`, `#8A8F98` x190, `#62666D` x132. Weights 400 x484 and 510 x141. 12/13/14/15px make up about 584 text nodes.

### Hairlines, Not Shadows
- **Trigger**: When the designers faced stacking panels that are only a few percent lighter than the page.
- **Decision**: They chose 0.5-1px white-alpha inset rings, with one soft drop shadow for floating agent panels, over layered drop shadows on every card.
- **Reason**: A black shadow is invisible on `#08090A`, so the edge has to come from light. Only the floating panel overlaps content, so only it gets a shadow.
- **Evidence**: `inset 0 0 0 .5px rgba(255,255,255,.08)`, `inset 0 0 0 1px rgba(255,255,255,.05)`, `0 2px 32px rgba(0,0,0,.25)` on the 400x520 panel. All shadows are single-layer. Radius steps 12 -> 9 -> 6 -> 4px.

### Product as Imagery
- **Trigger**: When the designers faced a marketing page that would normally carry illustrations, stock photos or abstract gradients.
- **Decision**: They chose cropped, near-live UI mock-ups over illustration or photography.
- **Reason**: The buyer is judging a tool they will live in for hours. A screenshot with real issue IDs and mono chips shows density and speed better than a picture of a team.
- **Evidence**: Hero image 2560x1429 (1.79:1) at 1440px. Agent panels 400x520 (0.77:1). Every sampled image is a screenshot or a 1:1 avatar/logo. Berkeley Mono x264 for `ENG-2844`-style IDs. About 150-224px of whitespace between sections and one hairline above the footer.
