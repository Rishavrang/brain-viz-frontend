# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

College-level neuroscience, psychology, and pre-med students who want to understand the brain mechanisms behind a real-world scenario. They type a scenario in natural language (e.g. "I'm walking through a jungle, see a snake, and become afraid"), then explore the result: rotate and zoom a 3D brain, hover numbered points to inspect region, coordinate, evidence strength, and supporting study, and read a concise explanation that links the regions into one neural story.

Desktop/laptop is the primary experience, because the 3D brain is central. The app should still be responsive.

## Product Purpose

Translate a real-world scenario into an evidence-grounded visualization of the brain processes associated with it, instead of returning a text-only answer. Success means a student can see which research-supported regions relate to their scenario, check the evidence, and understand how the regions fit together.

Core flow: scenario → neuroscience concepts → research evidence → brain coordinates → interactive 3D visualization → explanation.

## Positioning

Every marker on the brain is an actual reported research coordinate, not an invented or approximate location. It carries a globally unique number, brain region, coordinate, supporting study, and evidence strength. A generic chatbot cannot truthfully offer this.

## Operating Context

Frontend (React, Vite, react-three-fiber, drei) talks to a backend evidence pipeline, currently a local server at `http://127.0.0.1:8000` (`/new-conversation`, `/chat`). The pipeline:

1. extracts up to 3 standardized concepts from the scenario;
2. queries a Neurosynth-based research dataset;
3. selects evidence-supported coordinates;
4. sends concepts, regions, coordinates, studies, and evidence-strength labels to the visualization and explanation layers.

The current 3D model is `src/assets/models/brain.glb`. Coordinates are mapped into it from the backend's coordinate space.

## Capabilities and Constraints

- Chat-style scenario input with conversation history.
- Interactive 3D brain: orbit, zoom, numbered points colored by weight, hover detail (point number, evidence strength, study name).
- Hover detail is today limited to point number, evidence strength, and study name. Region and coordinate display are required by the product but not yet implemented.
- Must distinguish research associations from proof of what is happening in an individual's brain. Never imply the user's brain was scanned, or that a coordinate definitively proves a function.
- Communicate uncertainty honestly: weak evidence must never look highly certain.
- Point numbers on the brain must match the numbers everywhere else (details, explanation) and be globally unique.

## Brand Commitments

Product name is not yet decided (the repository is `brain-viz-frontend`). Binding quality bar from the user: a polished, professional scientific visualization tool, not a generic AI/SaaS dashboard, meeting or exceeding the quality of TRIBE v2 in visual quality, spatial design, interaction, typography, animation, and information hierarchy. The 3D brain is the centerpiece.

## Evidence on Hand

Real Neurosynth-derived coordinates and study names arrive from the backend at runtime. Do not fabricate studies, coordinates, region names, or evidence-strength labels in mock or demo content. Brand assets are absent (Vite template favicon and images are placeholders).

## Product Principles

1. Evidence first: nothing on screen is shown without a real source behind it.
2. The brain is the answer; text supports it.
3. Uncertainty is part of the data and must be visible, never smoothed over.
4. Association is not proof: language and visuals must not overclaim.
5. Make complex neuroscience explorable, not merely readable.

## Accessibility & Inclusion

No specific standard established yet. Open decision: how hover-only point detail is reached by keyboard and touch users.
