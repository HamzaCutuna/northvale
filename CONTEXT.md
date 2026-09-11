# Cabin Retreat Demo — Project Context

## Goal
Create a fictional but highly believable premium cabin retreat website for the HELUMO portfolio.

The website must feel like a real property that can actually be visited and booked — never like a template, UI concept, or obvious AI demo.

## Atmosphere
Cozy, quiet, cinematic and intimate.

The retreat is surrounded by dramatic nature: mountains, dense forest and a lake. Visuals should combine dark timber, stone, warm interior lighting, large windows, fireplaces, natural fabrics, mist, golden-hour light and peaceful outdoor moments.

The experience should feel premium without becoming overly luxurious or artificial.

## Visual Direction
Use:
- immersive full-screen photography/video
- refined editorial typography
- generous spacing
- minimal navigation
- warm natural tones
- subtle depth and parallax
- restrained cinematic motion

Avoid generic cards, SaaS-style layouts, excessive rounded elements, gradients, stock-photo aesthetics and unnecessary sections.

## Core Experience

### Hero
Full-screen cinematic exterior view of the cabin integrated naturally into its landscape.

The current Northvale hero is the locked establishing shot. Preserve its image, initial framing, typography, palette and minimal navigation exactly as implemented. The scroll journey begins from this existing composition; it must not replace or redesign the hero.

### Cabin Journey
A signature scroll-scrubbing sequence.

The sequence has two connected stages:

1. As scrolling begins, gradually push/zoom the existing hero image toward the cabin. Fade out the entire hero UI during this movement, including the navigation, headline, supporting copy, button and bottom annotations.
2. Transition seamlessly from the zoomed hero into a separate Higgsfield video. The video's opening frame must already be much closer to the cabin; do not start the generated video from the distant establishing camera position.

The scrubbed video continues the same forward movement: approach the terrace → move toward the entrance → pass through the doorway → end inside the cozy living room.

The still-to-video handoff must read as one continuous cinematic camera move. Match the cabin's apparent scale and screen position, camera height and viewing direction, framing, lighting, materials and movement pace. There must be no visible cut, camera reset, pause, sudden acceleration or architectural change. Build the video opening reference from the intended final hero zoom framing, then check the actual generated first frames against it before assembling the transition.

Scrolling should feel like physically entering the property.

Current implementation: the locked hero zooms into its literal source crop, followed by the user's replacement photographs (00–08, using entrance 03-v3 and living room 08-v2). Scroll drives gentle camera pushes and overlapping dissolves through the terrace, doorway and living room. This is a photographic sequence, not generated continuous video; perspective differences can remain visible at transitions. The previous Higgsfield footage is no longer used in the active journey. No generation credits were spent. Booking and terrace guest stories now follow the journey, as authorized in the presentation refinement request below. Production notes and asset provenance are recorded in `design/journey/README.md`.

### Booking
A realistic booking interface for dates, guests and stay details.

This is a demo, so no database or real booking backend is required.

### Lifestyle
A second cinematic sequence showing a guest enjoying coffee outside the cabin with the surrounding lake/mountain/forest view.

Guest reviews should be visually blended into this scene instead of appearing as a generic testimonial section.

## Higgsfield
Higgsfield will generate the main images and cinematic videos.

Current asset workflow: the user has no remaining budget for Higgsfield generation and will generate replacement still images in their own ChatGPT account, then upload them for review. Exact prompts and reference requirements are in `design/NORTHVALE-IMAGE-PROMPTS.md`: first review the entrance and living-room anchors, then complete eight journey images; six later-section photographs are optional. The proposed sliding entrance in an existing glazed bay is a design assumption to validate, not a detail proven by the original distant photograph. Do not regenerate the locked hero. Do not treat a sparse still-image set as guaranteed continuous video or spend additional generation credits without new authorization.

Visual consistency is essential. The same cabin architecture, materials, landscape, interior style and atmosphere should remain recognizable across all generated assets.

The first approved cabin design becomes the visual reference for subsequent scenes.

## Interaction
Motion should support immersion rather than decoration.

Prioritize smooth scroll-based transitions, video scrubbing, subtle parallax, typography reveals and natural micro-interactions.

## Responsive
Desktop should feel cinematic and expansive.

Mobile must be intentionally designed rather than simply shrinking the desktop layout. Preserve the atmosphere, hierarchy and usability on smaller screens.

## Development Approach

Image production workflow update: the user requests completing the remaining still-image set in their own ChatGPT conversation without returning to Codex after each image. Use `design/northvale-review/COMPLETE-REMAINING-IMAGES.md`; it supersedes earlier per-image review gates. Entrance 03-v3 is a working reference, with full-sequence continuity still unverified. Generate 04–08-v2 from its visible room, then 09–14 for later sections, and review the complete batch once. This changes asset preparation, not the section-by-section website implementation scope.
Build the experience section by section.

Do not attempt to generate the entire website at once. Each future prompt should focus on one specific section or interaction while respecting this context.

## Presentation refinement
Image 05 is excluded from the active sequence and its public derivatives have been removed; the uploaded source remains in the design archive. The pinned journey now runs for 7.5 screens with movement continuing to its endpoint. Its final invitation leads forward to booking rather than back to the hero. Booking and terrace guest stories are now implemented in normal document flow, followed by a minimal footer. The form validates dates and provides a local stay summary, without claiming availability or taking reservations. Testimonials are explicitly illustrative concept copy, not real guest reviews.

