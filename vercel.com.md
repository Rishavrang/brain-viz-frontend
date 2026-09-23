# Design Map

## Spacing Scale
- Base unit: 4px
- Common values: 2px (x336), 6px (x94), 12px (x30), 4px, 8px, 16px, 20px, 24px, 32px, 40px
- Section gap: 208px, no divider rules
- Grid gap: 24px; footer padding 40px 24px
- Method: `gap`; margins are 0 on h1, h2, p, section, nav

## Font Hierarchy
- h1: 64px / 64px, weight 400, tracking -3.84px, GeistSans
- h2: 56px / 56px, weight 450, tracking -3.36px
- Lead: 24px, weight 400-450
- Button: 16px, weight 500
- Body: 14px / 20px, weight 400 (x127)
- Meta: 11-12px
- Mono: Geist Mono (x27)
- Weights in use: 400, 450, 500

## Color Palette
- Background: `#FAFAFA` (70.9% of background area)
- Surface: `#FFFFFF` (17.5%)
- Text and CTA fill: `#171717`
- Secondary text: `#4D4D4D`; muted `#8F8F8F`, `#666666`
- Ring: `#EBEBEB`, `rgba(0,0,0,0.08)`
- Incidental: green `#297A3A` (x3)
- Neutrals are pure gray, not tinted

## Image Ratios
- Product mock (Notion): 1.90:1 (950x500), rendered 911px
- Product mock (Zapier): 1.78:1 (633x355), rendered 911px
- Logo marks: about 1.15:1 at 16px

## Component Tokens
- Radius: 4px, 6px (nav buttons), 9999px (hero CTAs)
- Shadows: `0 0 0 1px rgba(0,0,0,0.08)`, `0 0 0 1px #EBEBEB`; no blur shadows
- Buttons: hero pill 16px w500 (dark `#171717` and white with ring); nav 14px, 6px radius (Sign Up dark)
- Grid: 12 columns x 92.72px, 24px gap, x=24 to x=1401 at 1440, `max-width: none`
- Motion: `opacity 0.3s cubic-bezier(0.4,0,0.2,1)`, `height 0.2s cubic-bezier(0,0,0.2,1)`, 0.15s on interactive elements
- `:focus-visible` and `prefers-reduced-motion` are both present
- Not verified: footer and lower sections did not render in the capture

---

# Taste DNA

### Gray UI, Logos Carry the Color
- **Trigger**: When the designers faced a page with nothing to prove except that big companies run on the product.
- **Decision**: They chose a gray-only interface (`#FAFAFA`, `#171717`, `#4D4D4D`) over a brand-hue accent for CTAs and links.
- **Reason**: The customer logos are the persuasion. If the interface has its own accent, OpenAI's and DoorDash's marks compete with it.
- **Evidence**: `#FAFAFA` 70.9%, `#FFFFFF` 17.5%, `#171717` about 11% of background area. The primary CTA is a `#171717` pill. `#297A3A` appears x3 and no other chroma is in the UI. The logo row is 7 marks across x=24 to x=1401.

### Tight Regular-Weight Display Type
- **Trigger**: When the designers faced a 64px headline that had to feel large without shouting.
- **Decision**: They chose weight 400 with -0.06em tracking and 1.0 line-height over a bold display weight with default tracking.
- **Reason**: At this size a bold weight looks heavy, and default tracking leaves gaps between letters. Tight regular type reads as one shape.
- **Evidence**: h1 64px/64px w400 tracking -3.84px. h2 56px/56px w450 tracking -3.36px. Body 14/20px w400. No weight above 500 in the sampled elements.

### Rings, Not Shadows
- **Trigger**: When the designers faced panels that had to separate from a near-white page.
- **Decision**: They chose a 1px ring (`rgba(0,0,0,0.08)` or `#EBEBEB`) and a whiter fill (`#FFFFFF` on `#FAFAFA`) over blurred drop shadows or thick borders.
- **Reason**: On a light page, drop shadows add gray haze under every panel. A 2% lightness step plus a hairline gives an edge without darkening the space around it.
- **Evidence**: `rgba(0,0,0,0.08)` ring x5, `#EBEBEB` ring x7. No offset or blur shadow in the sampled set. Radius is 6px on utility buttons and pill on hero CTAs.

### Edge-Anchored, Empty Between
- **Trigger**: When the designers faced a wide screen and the usual choice of a centered container.
- **Decision**: They chose a 12-column grid running gutter to gutter (24px margins, `max-width: none`) with 208px between sections over a centered 1200px container.
- **Reason**: Left-anchored headings, nav logo and logo row share one edge at x=24. With the space between sections left empty, each block reads on its own.
- **Evidence**: 12 columns x 92.72px, 24px gap, x=24 to x=1401. Section gaps are 208px, measured twice, with no dividers. h1, nav logo and logo row all start at x=24.
