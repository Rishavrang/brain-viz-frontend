---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: ["src/components/Brain.jsx","src/components/BrainPoint.jsx"]
---

# Surface: main viewer + chat panel (src/App.jsx)

Mode: Operate for the chat panel, Experience for the 3D viewer. Redesign inside a user-pinned world (Linear-based dark theme in CLAUDE.md; Vercel = grid/type-weight ideas only; Observable = optional serif for long-form replies only). No concept tournament: the world was pinned by the user.

Audience and job: college neuroscience/psychology/pre-med students on desktop. They type a scenario, rotate the 3D brain, inspect numbered research coordinates, and read a short explanation that links the regions.

Confirmed answers: full-bleed stage + right-docked chat panel; hover + click-to-pin + numbered list linked to the brain; region row only when the backend supplies `region`; coordinate always shown.

Constraints: real coordinates/studies only, no invented regions or labels; association is not proof; weak evidence must look weak; point numbers identical on brain, list and detail card; keyboard reachable; responsive (panel becomes a bottom sheet under 900px).

## Direction contract

THESIS: The brain is the answer and owns the screen; text is a docked instrument beside it. Refuses the chatbot-with-a-canvas-above-it arrangement.

OWN-WORLD: Near-black #08090A stage, #0F1011 floating panel with a 1px white-alpha inset ring and the single soft shadow, Inter Variable UI with light weights (400/510/590), Source Serif 4 for long replies, mono for point numbers and coordinates. Brain is a translucent cool-gray shell with a rim light; the only chroma on screen is the evidence-strength ramp on the points (dim blue = weak, amber = mid, red-orange = strong). Near-white pill for the one primary action.

STORY: Student describes a scenario, watches the numbered points appear on the brain, hovers or pins one to read region/coordinate/evidence/study, and reads the explanation knowing it is a research association.

FIRST VIEWPORT: Full-viewport brain centered in the free area left of a 400px panel (16px inset, 12px radius). Panel: 48px header, empty state with three example scenarios, footer with input and the association-not-proof note. Bottom-left of the stage: a quiet drag/zoom hint. Primary action: send pill at the input's right edge.

FORM: Full-bleed stage + docked panel (option 1 of 3 offered). Signature interaction: points pop in with a staggered scale-up when a result arrives; hovering a list row and hovering a point light each other; pinning eases the orbit target toward the point.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
