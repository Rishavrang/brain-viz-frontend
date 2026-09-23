# Design Map

## Spacing Scale
- Base unit: 4px
- Common values: 4px (x231), 17px (x107, 1em prose margin), 8px (x59), 2px, 16px, 32px, 64px (x15), 96px (x8)
- Block spacing: ~64-96px of white space or a band change; no `<section>` elements
- Grid gap: 16px
- Nav height: 56px with a 1px bottom line

## Font Hierarchy
- Hero: 72px, weight 700, Inter Variable; lead line 30px w400 above it
- h2: 48px
- Lead: 20-24px, Source Serif 4
- Prose: 17px / 25.5px, weight 400, Source Serif 4 Variable, max-width 584.5px
- UI: 14px, weight 400/500, Inter Variable
- Code: 14px, Spline Sans Mono Variable
- Meta: 12px mono
- Weights in use: 400, 500, 600, 700

## Color Palette
- Background: `lab(98.26 -0.25 -0.71)` (~`#F9FAFB`, 59.9% of background area), surface `#FFFFFF` (34.1%)
- Hero band: ~`#111827` (approx from screenshot); footer band ~`#111111` (approx)
- Text: `#1B1E23`, `#323539`, muted ~`#969BA9`
- CTA blue: ~`#2563EB` (approx); announcement pill ~`#4ADE9B` (approx)
- Neutrals are cool-tinted (negative b*)
- Editor-mock syntax colors only: `#005CC5`, `#E36209`, `#6F42C1`

## Image Ratios
- Gallery thumbnail: 1.60:1 (640x400), rendered 275px
- Product screenshot (Zed): 1.30:1 (1080x829)
- Editor strip: 6.53:1 (992x152)
- History panel: 0.64:1; fork network: 1.00:1

## Component Tokens
- Radius: 4px (x76), 6px (x96), 9999px (avatars, tags); no radius above 8px
- Shadows: none
- Borders: 1px light gray on thumbnails and panels (approx)
- Buttons: "Get started" 14px w500, 4px radius, padding 6px 16px (outlined in nav, filled blue for the final CTA)
- Grid: gallery `repeat(auto-fill, minmax(16rem, 1fr))` = 4 x 276px, 16px gap; content x=137 to x=1289 (~1152px); `max-width: none`
- Motion: `opacity 0.75s cubic-bezier(0.4,0,0.2,1)`, `0.15s cubic-bezier(0.4,0,0.2,1)` on interactive elements
- `prefers-reduced-motion` present; `:focus-visible` not found in readable stylesheets

---

# Taste DNA

### Serif for Reading, Sans and Mono for Tools
- **Trigger**: When the designers faced a product that is a document people read and run code in, and a page that has to show both.
- **Decision**: They chose a serif for prose (Source Serif 4, 17/25.5px, 584.5px measure) with Inter for interface and mono for code, over one sans family everywhere.
- **Reason**: Long explanatory paragraphs read as writing rather than as UI, and the type change tells the visitor which parts are narrative and which are the tool.
- **Evidence**: Source Serif 4 x35, Inter x842, Spline Sans Mono x1346. Prose `max-width` 584.545px, line-height 1.5. Code at 14px.

### Saturation Reserved for Data
- **Trigger**: When the designers faced a marketing page for a data-visualization tool.
- **Decision**: They chose a gray-blue interface on `#F9FAFB`/`#FFFFFF` with one solid blue CTA over a saturated brand palette across the page.
- **Reason**: If the page chrome is colorful, the charts have to compete with it. Here the sunburst, maps and gradient thumbnails carry the color.
- **Evidence**: Surfaces `lab(98.26 -0.25 -0.71)` 59.9% and `#FFFFFF` 34.1% of background area. Text `#1B1E23` / `#323539`. Purple, green and orange-red only in chart thumbnails and hero cards. Syntax colors `#005CC5` / `#E36209` / `#6F42C1` appear only inside the editor mock.

### Flat, Bordered, No Shadows
- **Trigger**: When the designers faced a page full of screenshots and thumbnails that all need an edge.
- **Decision**: They chose 1px light borders, 4-6px radii and dark/light bands over drop shadows.
- **Reason**: Shadows under dozens of thumbnails add gray haze to the charts. Hairlines keep the edges without changing the colors next to them.
- **Evidence**: `shadows: []` in the sampled set. Radii 6px x96, 4px x76. Gallery thumbnails 640x400 (1.60:1) with light-gray borders. Dark navy hero, light body, near-black footer.

### Two-Register Headline
- **Trigger**: When the designers faced a new positioning word ("agentic") to add to an existing tagline.
- **Decision**: They chose a 30px w400 lead line with the new word dimmed, followed by a 72px w700 payoff line, over one uniform headline.
- **Reason**: The visitor reads the old, familiar phrase first, then the large claim, and the dimmed word marks what changed.
- **Evidence**: 72px x1 and 30px x2 in the size distribution, weights 400 and 700. "agentic" in gray (~`#6B7280`, approx) among white words on the dark hero.
