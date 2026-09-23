## Design System

One dark theme for the whole app: the 3D brain viewer, the chat panel, and everything else. **Linear is the base.** Vercel and Observable contribute only the specific ideas listed under "Secondary references" — never their color schemes. There are no light surfaces anywhere in this app.

*Sources: linear.app (base), vercel.com (layout and type weight only), observablehq.com (serif for long-form text only). Full analyses are in `linear.app.md`, `vercel.com.md`, `observablehq.com.md`.*

### Base: Linear

#### Tokens
- Colors: background `#08090A`, surface `#0F1011`, raised surface `#161718`, hairline border `rgba(255,255,255,0.08)`
- Text ramp: `#F7F8F8` (primary), `#E2E4E7`, `#D0D6E0`, `#8A8F98` (body/nav), `#62666D` (meta)
- Fonts: Inter Variable (all UI text), Berkeley Mono or another mono (IDs, coordinates, code only)
- Type: h1 64/64px w510 tracking -1.408px; h2 48/48px w510 tracking -1.056px; h3 20/26.6px w590; body 15/24px w400; UI 13px; meta 12px
- Weights in use: 400, 510, 590
- Radius: 4, 6, 8, 9, 12px; 9999px for pills/buttons; 50% for avatars. Radius shrinks inward when nested (12 > 9 > 6 > 4)
- Shadows: `inset 0 0 0 0.5px rgba(255,255,255,0.08)`, `inset 0 0 0 1px rgba(255,255,255,0.05)`; floating panels only: `0 2px 32px rgba(0,0,0,0.25)`
- Spacing: base 4px; common 4/8/12/24/48px; use `gap`, not margins
- Motion: 0.1-0.16s on border-color/background/color, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`; keep `:focus-visible` and `prefers-reduced-motion`

#### Directives
- Primary action: a near-white pill on `#08090A`. The UI carries no brand hue; color belongs to the brain data (the evidence-strength gradient on the 3D coordinates).
- Rank text by lightness (`#F7F8F8` → `#62666D`) and weight (400/510), not by adding sizes or bold — heavy type blooms on dark surfaces.
- Separate stacked surfaces that differ by a few percent lightness with a 0.5-1px white-alpha inset ring — black shadows are invisible on `#08090A`.
- A panel that floats over content (chat panel over the viewer, tooltips) gets the one soft drop shadow `0 2px 32px rgba(0,0,0,0.25)`; nothing else gets one.
- Separate sections with whitespace only — no divider lines, no alternating background bands.
- Show the real thing (the live 3D brain, real explanations, real IDs in mono) rather than illustrations or stock imagery.

#### Anti-patterns
- Never add a brand-hue accent to nav, links or buttons.
- Never use drop shadows on ordinary cards, or multi-layer shadows.
- Never add illustrations, stock photos or decorative gradients (the evidence-strength color gradient on the brain is data, not decoration).
- Never use a second sans-serif family. Mono is for IDs and code; the one allowed serif is described below.
- Never separate sections with divider lines or alternating background colors.
- Never introduce a light background, light panel or light-mode variant.

### Secondary references (ideas only, no colors)

#### From Vercel: layout structure and type weight
- Layout: a 12-column grid with 24px gutters (columns ~92.72px at 1440, 24px page margins), content anchored to the gutter edge rather than a centered fixed-width container, `max-width: none` on the shell.
- Type weight: display and heading type stays light — weight 400-510 with tight tracking (Vercel: h1 64/64px w400, -0.06em; h2 56/56px w450) and 1.0 line-height. Never set display type above weight 590.
- Ignore Vercel's colors (`#FAFAFA`, `#FFFFFF`, `#171717`, `#EBEBEB`), its ring-on-white edges, and its 208px section gap.

#### From Observable: serif for long-form explanation text (optional)
- Long-form explanatory text, such as the chat's structured brain explanations, may be set in a serif: Source Serif 4 Variable, 17/25.5px, w400, measure capped near 584px (~65 characters), 1em paragraph spacing.
- Use it only if it fits the panel. Short UI text, labels, buttons, nav and chat input stay in Inter; IDs, coordinates and code stay in mono.
- Text color still comes from the Linear ramp (`#E2E4E7` / `#D0D6E0` on `#0F1011`), not Observable's dark-on-white.
- Ignore Observable's colors (`#F9FAFB`, `#FFFFFF`, blue CTA, mint pill), its light body, and its bordered-thumbnail gallery styling.
