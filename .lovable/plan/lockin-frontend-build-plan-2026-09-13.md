# LOCKIN frontend build plan

## Goal

Build a polished, responsive frontend-only prototype that makes LOCKIN’s adaptive loop immediately understandable. All information and interactions will be local demo state with no backend, authentication, APIs, telemetry, or persistence.

## Pages and flow

- **Landing (`/`)** — asymmetric editorial hero, “your study plan should adapt to you,” handwritten callouts, primary CTA, custom warm isometric bedroom artwork, and visual sections explaining the tell → learn → adapt loop.
- **Onboarding (`/onboarding`)** — six conversational steps for energy window, focus capacity, study methods, friction, availability, and plan preview. Choices update locally and trigger playful annotations.
- **Study DNA (`/study-dna`)** — editorial profile distinguishing self-reported traits from observed evidence with tactile INITIAL / OBSERVED / HIGH CONFIDENCE labels.
- **Today (`/today`)** — spatial workspace pairing the room scene with an active Biology plan and a “WHY IS MY PLAN LIKE THIS?” control.
- **Adaptive explanation** — an interactive drawer inside Today showing what LOCKIN noticed, why it matters, and exactly what changed.
- **Study session (`/session`)** — calm 25-minute active-recall screen with visible progress and working local pause/finish controls.
- **Feedback (`/feedback`)** — playful post-session response screen where COOKED / KINDA / ABSOLUTELY NOT visibly changes the next-plan message.

## Visual system

- Use the specified warm paper, near-black, brick red, wood brown, green, and muted blue palette only; no purple, gradients, glass effects, or generic dashboard styling.
- Establish editorial display typography plus handwritten annotation typography, crisp 2px borders, selective hard shadows, paper textures, hand-drawn marks, and restrained motion.
- Keep layouts asymmetric and varied rather than repeating identical cards.
- Treat page composition, typography, and interaction quality as the primary craft focus. Build the bedroom as a polished layered CSS/SVG composition with enough organic detail to feel warm and intentional, without letting custom illustration work dominate the implementation.

## Shared experience

- Add a minimal branded navigation that connects all real routes without turning the site into a conventional SaaS shell.
- Use reusable buttons, labels, paper panels, annotations, and bedroom artwork while preserving distinct page compositions.
- Add route-specific titles, descriptions, Open Graph text, and social card metadata.
- Respect reduced-motion preferences and make keyboard/focus states clear.

## Validation

- Verify all routes and interactive controls in the running preview.
- Check desktop and mobile layouts for clipping, overlap, readable type, and stable controls.
- Confirm the latest build completes without errors.
