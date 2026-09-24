---
name: Brain Viz
description: A near-black stage where a translucent brain carries the only color, docked beside a quiet research-chat instrument.
colors:
  stage-black: "#08090a"
  panel-surface: "#0f1011"
  raised-surface: "#161718"
  hairline: "rgba(255, 255, 255, 0.08)"
  hairline-soft: "rgba(255, 255, 255, 0.05)"
  text-primary: "#f7f8f8"
  text-strong: "#e2e4e7"
  text-body: "#d0d6e0"
  text-meta: "#8a8f98"
  text-disabled: "#62666d"
  evidence-weak: "#5f6fa0"
  evidence-mid: "#e9a24b"
  evidence-strong: "#ff5b3a"
  evidence-unreported: "#8a8f98"
  shell-base: "#3b4250"
  shell-rim: "#a9b4c8"
typography:
  panel-empty-title:
    fontFamily: "Inter Variable, system-ui, Segoe UI, sans-serif"
    fontSize: "20px"
    fontWeight: 590
    lineHeight: "26px"
    letterSpacing: "-0.24px"
  detail-title:
    fontFamily: "Inter Variable, system-ui, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 590
    lineHeight: "24px"
  body:
    fontFamily: "Inter Variable, system-ui, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "24px"
  message:
    fontFamily: "Inter Variable, system-ui, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "22px"
  reply:
    fontFamily: "Source Serif 4 Variable, Georgia, serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "25px"
  ui:
    fontFamily: "Inter Variable, system-ui, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 510
    lineHeight: "20px"
  meta:
    fontFamily: "Inter Variable, system-ui, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  data-mono:
    fontFamily: "JetBrains Mono Variable, ui-monospace, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: "16px"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  section: "32px"
  gutter: "16px"
components:
  panel:
    backgroundColor: "{colors.panel-surface}"
    rounded: "{rounded.xl}"
    width: "400px"
  detail-card:
    backgroundColor: "{colors.panel-surface}"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.xl}"
    padding: "16px"
    width: "340px"
  composer-box:
    backgroundColor: "{colors.raised-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "6px 6px 6px 12px"
  send-button:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.stage-black}"
    rounded: "{rounded.pill}"
    size: "28px"
  send-button-disabled:
    backgroundColor: "{colors.hairline}"
    textColor: "{colors.text-disabled}"
  point-row:
    textColor: "{colors.text-strong}"
    rounded: "{rounded.lg}"
    padding: "8px"
  point-tag:
    backgroundColor: "{colors.stage-black}"
    textColor: "{colors.text-strong}"
    typography: "{typography.data-mono}"
    rounded: "{rounded.sm}"
    height: "16px"
  notice:
    backgroundColor: "{colors.raised-surface}"
    textColor: "{colors.text-meta}"
    rounded: "{rounded.lg}"
    padding: "12px"
  legend:
    backgroundColor: "{colors.stage-black}"
    textColor: "{colors.text-meta}"
    rounded: "{rounded.lg}"
    padding: "8px 10px"
    width: "168px"
  skeleton:
    rounded: "{rounded.sm}"
    height: "10px"
---

# Design System: Brain Viz

## Overview

**Creative North Star: "The Instrument Beside the Specimen"**

The brain owns the screen. It sits full-bleed on a near-black stage, and everything textual is a docked instrument beside it: one 400px panel inset 16px from the edge, one small legend, one drag/zoom hint. The world is a Linear-derived dark theme pinned by the user. Depth is tonal (three surfaces a few percent apart), edges are white-alpha inset rings, and the only chroma on screen is data: the evidence-strength ramp on the points.

Hierarchy is carried by lightness and by weights 400 / 510 / 590, not by extra sizes or bold. Long explanatory replies switch to a serif so they read as writing; everything else is Inter. Point numbers and coordinates are set in mono so they read as identifiers and stay tabular.

The first state is a landing on the same stage (see Landing); entering glides the camera into the application's view. Below 900px the panel becomes a bottom sheet (46dvh, 8px inset) and the stage keeps the rest. While a point is pinned, the brain re-centers in the strip above the detail card so the card never covers it.

**Key Characteristics:**
- Stage `#08090a`, panel `#0f1011`, raised `#161718`; no light surfaces.
- Chrome is achromatic. Color appears only as evidence strength on points, list badges and the legend.
- Rings, not fills or shadows, separate surfaces.
- One primary action, a near-white pill.
- Weak evidence looks weak: dim, cool, small, low glow.

## Colors

Achromatic near-black chrome, a cool-gray glass shell, and one sequential data ramp.

### Primary
- **Near-White Pill** (#f7f8f8): the single primary action (send). Same value as primary text. Hover goes to pure white; there is no brand accent.

### Neutral
- **Stage Black** (#08090a): app and stage background; text color on the send pill; base of the 72%-alpha backing for legend and point tags.
- **Panel Surface** (#0f1011): chat panel and detail card.
- **Raised Surface** (#161718): composer box, user message bubble, notices.
- **Hairline** (rgba(255,255,255,0.08)) and **Hairline Soft** (rgba(255,255,255,0.05)): inset rings. Soft for resting example rows and the legend; regular for panel, card, composer, tags and kbd.
- **Text Primary** (#f7f8f8): titles, active values. **Text Strong** (#e2e4e7): messages, row values, tags. **Text Body** (#d0d6e0): default page text, secondary buttons. **Text Meta** (#8a8f98): labels, study names, notes, placeholders, legend ends.
- **Text Disabled** (#62666d): decorative separators and disabled controls only. It fails 4.5:1 on the panel surface, so it never carries meaning; meta text uses #8a8f98.

### Data ramp (the only chroma)
- **Evidence Weak** (#5f6fa0) to **Evidence Mid** (#e9a24b) to **Evidence Strong** (#ff5b3a): interpolated linearly in two segments from a 0-1 strength derived from weight `(w - 0.25) / 0.75`. Used on brain points, the 1.5px ring on list number badges, the detail dot, and the legend bar.
- **Evidence Unreported** (#8a8f98): a missing weight is "not reported", never "weakest"; it gets neutral gray, not a ramp color.

### Brain shell (WebGL)
- **Shell Base** (#3b4250) shaded 0.55-1.0 by upward-facing normal, **Shell Rim** (#a9b4c8) via a cubic fresnel term. Alpha 0.035 at the center rising to about 0.33 at the rim; unlit, no depth write. The shell is translucent so points inside stay the subject.

### Named Rules
**The Data-Only Chroma Rule.** Hue means evidence strength and nothing else. Buttons, links, nav, focus and hover are white-alpha.
**The Unreported Is Gray Rule.** Missing data never borrows a ramp color.
**The Meta Contrast Rule.** Anything the reader must read is #8a8f98 or lighter on the surfaces; #62666d is for things that may be missed.

## Typography

**UI Font:** Inter Variable (system-ui, Segoe UI, sans-serif)
**Reply Font:** Source Serif 4 Variable (Georgia, serif), assistant replies only
**Mono Font:** JetBrains Mono Variable (ui-monospace, Consolas), point numbers, coordinates, counts, kbd

**Character:** Quiet, light-weighted UI with one serif voice for the explanation. Type is small and dense in the panel; the brain supplies scale.

### Hierarchy
- **Empty title** (590, 20/26px, -0.24px tracking): panel empty state heading.
- **Title** (590, 15/24px): detail card title.
- **Body** (400, 15/24px): document default, color Text Body.
- **Message** (400, 14/22px): user bubbles, empty-state copy, composer input (14/20px).
- **Reply** (Source Serif 4, 400, 16/25px, Text Strong): assistant explanation, pre-wrapped.
- **UI** (510, 13/20px): panel title, notice title, point evidence label, example rows (400).
- **Meta** (400 or 510, 12/16px): buttons, legend title, hint, list titles, notes, detail labels. Legend ends and counts use 11px.
- **Data mono** (500, 11/16px, tabular numerals): point tags, kbd, point numbers on badges; detail coordinates at 12px.

### Named Rules
**The Lightness-Not-Bold Rule.** Rank text by stepping down the text ramp and by 400/510/590. Do not add 600+ weights or new sizes to create emphasis.
**The Mono Means Identifier Rule.** Mono is for point numbers and coordinates, which must read identically on brain, list and detail card.

## Layout

Full-viewport stage with absolutely placed overlays; the body does not scroll. Overlays share a 16px gutter (8px under 900px). The chat panel is docked right at 400px, full height minus the gutter. Legend sits top-left, drag/zoom hint bottom-left (hidden under 900px, where the hint bottom offset clears the 46dvh sheet). The detail card is 340px wide and never wider than the viewport minus gutters.

Spacing is a 4px base, in practice 4 / 8 / 12 / 16 / 24 / 32. Inside the panel: header 48px, scroll area padding 8px 16px 24px with 32px between blocks (empty state, thread, points), thread gap 20px, list rows 2px apart with -8px side margin so hover fills reach past the text edge. Use `gap` in grid and flex, not margins.

## Elevation & Depth

Tonal layering plus rings. Surfaces step stage (#08090a), panel (#0f1011), raised (#161718). Edges are inset box-shadow rings at 5% or 8% white; hover raises a ring to about 14% white. Only floating panels (chat panel, detail card) receive the one soft drop shadow.

### Shadow Vocabulary
- **Ring** (`box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08)`): panel, card, composer, tags, kbd.
- **Soft ring** (`inset 0 0 0 1px rgba(255,255,255,0.05)`): legend, resting example rows.
- **Float** (`0 2px 32px rgba(0,0,0,0.25)`): chat panel and detail card only, layered under the ring.
- **Evidence ring** (`inset 0 0 0 1.5px <evidence color>`): point-number badge.

### Named Rules
**The One Shadow Rule.** Only surfaces that float over the stage carry the soft drop shadow. Cards, rows and tags never do.

## Shapes

Small radii that shrink inward: 12px floating surfaces, 8px controls and rows nested in them, 6px small buttons, 4px tags, kbd and skeleton bars. The send button and legend bar are pills (9999px); point-number badges and detail dots are circles. No dividers between sections; whitespace and tone separate them.

## Components

### Panel
Docked 400px chat surface, 12px radius, ring plus float shadow. 48px header (title 13px/510, "New scenario" text button on the right once a thread exists), scrolling body, composer footer.

### Composer
Raised 8px-radius box with a ring, 6px 6px 6px 12px padding, auto-growing textarea (max 132px), send pill at the bottom-right. Hover lifts ring to 14% white; focus draws a 1px white (70%) outline offset 2px on the box. Below sits a 12px meta note stating the results are research associations, not a scan. Send disabled: 8% white fill, disabled text color.

### Buttons
Text button (12px/510, 6px radius, transparent, Text Body) fills 6% white and goes Text Primary on hover; disabled uses Text Disabled. The primary is the near-white send pill. Transitions are 0.16s on background, color and box-shadow with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.

### Example rows
Full-width, 8px radius, transparent with a soft ring; hover adds 4% white fill and the regular ring.

### Point row
Flex row, 8px padding, 8px radius, hover and active fill 5% white. Leading 26px circular numbered badge (mono 11px) with an evidence-colored 1.5px ring; text stack of evidence label (13px/510) over study name (12px meta, ellipsis). Pinned state is exposed through `aria-pressed`.

### Detail card
Panel surface, 12px radius, 16px padding, ring plus float shadow. Header with title and a release button carrying a kbd hint; label/value definition rows on an 84px label column (labels 12px meta, values 13px, mono coordinates 12px no-wrap); a colored 8px dot marks evidence; note in 12px meta.

### Point tag
16px-high mono 11px label on the brain, 4px radius, 72% stage-black backing with a ring. Active: Text Primary and a 50% white ring. Dimmed: 50% opacity.

### Legend
168px, 8px radius, 72% stage-black backing with soft ring. Title, a 4px pill bar painted with the three evidence stops, and "Weaker" / "Stronger" ends. It is a data key, not decoration.

### Notice
Raised surface, 8px radius, 12px padding, 13px text: 510 title in Text Primary, body in Text Meta, optional text button. Used for server and request errors.

### Skeleton
Three 10px bars, 4px radius, 7% white, pulsing opacity 1 to 0.4 over 1.4s, staggered 0.15s. Disabled under reduced motion.

### Motion and focus
State changes are 0.16s on color, background and box-shadow. Points pop in with a staggered scale-up when a result arrives; hovering a row and hovering a point light each other; pinning eases the orbit target. `prefers-reduced-motion` collapses transitions and animations to 0.01ms. Global `:focus-visible` is a 1px white (70%) outline, 2px offset.

### Landing
The entrance state of the same stage, not a separate page: the one canvas and brain persist into the application. Wide screens: a statement block anchored one 12-column grid column in from the 24px page margin (5 columns wide), vertically centered, with the brain offset right via the camera view offset and seen from above and to the side (azimuth about -35°, elevation about 11°) at distance 4.9. Squarer or smaller wide screens zoom the brain out so it never crowds the copy. Narrow or portrait screens (<640px, or <900px and not wider than 5:4) stack: the brain sits in the upper part, zoomed to fit the width, and the copy sits at the bottom.
- **Headline** (510, clamp 40-68px, line-height 1.02, -0.024em, Text Primary, balanced wrap). **Lede** (400, 17/26px, Text Meta, ~31ch). **CTA**: the near-white pill, 44px high, 14px/510, arrow nudges 3px on hover.
- **Footer**: the credit (12px Text Meta) bottom-left; a live camera readout (mono 11px, Text Disabled, decorative) bottom-right, hidden when stacked.
- **Scene additions** (landing only): four unlabeled reference markers at standard atlas locations that brighten in turn with their mono number tag, and a sparse field of dust for orbit parallax. Both are achromatic on purpose: hue means evidence strength, and the landing shows no evidence.
- **Entering**: copy lifts 16px, blurs and fades (0.5s); markers and dust fade out; the camera glides its view offset, zoom and distance into the application's view over 1.5s (ease-in-out cubic); the panel and HUD fade and slide in from 0.85s. Long scene-scale moves use `--ease-out` (cubic-bezier(0.22, 1, 0.36, 1)); UI state changes keep the 0.16s ramp. Reduced motion jumps straight to the application.

## Do's and Don'ts

### Do:
- **Do** rank text with the ramp #f7f8f8 to #8a8f98 and weights 400/510/590.
- **Do** separate surfaces with 5% or 8% white inset rings.
- **Do** derive point color, size and glow from the same strength value so weak evidence reads weak.
- **Do** keep point numbers identical on brain, list and detail card, in mono.
- **Do** keep meta text at #8a8f98 or lighter.
- **Do** keep the association-not-proof note visible beside the composer.

### Don't:
- **Don't** use a hue outside the evidence ramp for chrome, links, buttons or focus.
- **Don't** put a drop shadow on ordinary cards, rows or tags.
- **Don't** use #62666d for text that carries information.
- **Don't** use a light surface, gradient imagery or illustrations; the only gradient is the legend bar.
- **Don't** paint an unreported weight with a ramp color.
- **Don't** use serif outside assistant replies, or mono outside identifiers and coordinates.
