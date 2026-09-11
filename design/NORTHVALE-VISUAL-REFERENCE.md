# Northvale — hero and visual reference

`CONTEXT.md` remains the source of truth. This file records the first implemented hero and the cabin reference requested on 10 September 2026. A hero-to-interior scroll preview is now implemented; see `design/journey/README.md` for its assets and known exterior continuity limitation. Booking and lifestyle sections are not implemented.

## Canonical cabin image

- Original master: `design/northvale-cabin-reference.png` (2688 × 1520).
- Website asset: `public/images/northvale-hero.webp` (same dimensions, WebP quality 88).
- Higgsfield generation ID: `de8b435c-b645-4112-89ab-181404e80b44`.
- Model: `gpt_image_2`, 2k, high quality, landscape 16:9 request.
- This is a detail refinement of the first generated cabin, job `ee72a9a9-67fc-4162-af2d-90f3ef514ec0`, retained in `design/northvale-cabin-reference-initial.png`.
- Full prompts, original URLs and lineage: `design/northvale-image-provenance.json`.

Use the canonical master image or its completed Higgsfield job ID as the actual image reference for all subsequent Northvale generations. Do not rely on a text prompt alone. Preserve its architecture, placement on the shoreline, mountain and forest context, and interior material language. New lighting or camera angles must still describe this same property. Keep this original master intact; use new filenames for any later imagery or revisions.

## Recognizable architecture and landscape

A single modest, rectangular cabin with dark vertical timber cladding, a charcoal standing-seam gabled metal roof, and a full-height glazed front gable framed in slim black mullions. Broad glazed bays continue along the lake-facing side. A rough grey masonry chimney rises toward the rear right. A low timber deck follows the facade; understated wooden chairs sit near the windows. Warm lamps, pale natural upholstery and a small fire are visible through the glass.

The cabin stands on a mossy, rocky peninsula at the edge of a still mountain lake. Dense spruce and pine forest rises behind it. Across the water are rugged grey mountains with small snow patches. Calm water reflects the cabin, trees and peaks. The hero is photographed at eye level from a three-quarter exterior angle, with the cabin at right and open lake at left, under cool, clouded early-evening light.

No exact country, coordinates, capacity, nightly price, awards or amenities beyond the established visual details are approved or implied by this hero.

## Initial visual language

- Display and wordmark: locally hosted Cormorant Garamond, 400 regular and italic.
- Navigation and body: locally hosted Manrope, variable 400–600.
- Warm ivory: `#f2efe5`.
- Deep pine: `#17221f`.
- Dark ink: `#101a18`.
- Soft stone: `#d0d1c7`.
- Muted amber accent: `#bf976a`; the main warmth comes from the cabin lighting.
- Fine translucent rules, square-edged controls, generous margins, and a simple line-drawn N mark.
- A uniform photographic shade supports contrast. No decorative gradient backgrounds.

## Hero behavior

Headline: “A little closer to nowhere.”

The wordmark and “The cabin” return to the hero. “The setting” and “View the setting” open an accessible full-image view within the hero experience. Native dialog focus containment, Escape dismissal and focus restoration are preserved. The complete landscape remains available on mobile in this view.

Desktop places copy over the lake at left. Portrait layouts place the heading above the cabin and supporting copy near the bottom. The tighter portrait crop prioritizes the glazed gable and warm windows. Image source sizing accounts for the full-height crop to avoid using a blurry phone-width source.

Entrance motion is a single restrained image settling movement and short text reveals. Reduced-motion preferences disable all motion. No autoplay audio, perpetual animation, fake scroll cues or links to unfinished sections.

Fonts are local, with their licenses and provenance in `app/fonts/`. Set `NEXT_PUBLIC_SITE_URL` to the actual public origin when deployment is requested so social metadata resolves to the correct host; the current default is local development.

## Locked direction for the future cabin journey

The current hero is the establishing shot and must remain exactly as it is at the start of the experience.

The first scroll movement belongs to the still image: smoothly scale and reframe the existing hero toward the cabin while the complete UI fades away. The hero's zoom destination is a designed match frame, not an arbitrary scale amount. Choose it around the cabin and terrace so it can hand off to the closer opening of a separate Higgsfield video.

The generated video starts from that close framing and continues toward the terrace, approaches the entrance, passes through an actual doorway and ends inside the living room. Do not generate a long approach from the original distant lakeside viewpoint. Maintain a plausible connected path; do not pass through a glass pane, wall or furniture.

### Continuity criteria

- Prepare and retain the exact final hero crop as the video opening reference, alongside the untouched canonical cabin master. Use these to constrain the first generated frame; keep any new assets under distinct filenames.
- Align persistent landmarks across the handoff: the roof ridge, glazed gable, window mullions, deck edge and shoreline. The cabin's position, scale, viewing direction and camera height must agree, as must the early-evening light, warm interior, exposure and color treatment.
- A flat-image zoom does not produce the perspective changes of a moving camera. Keep the still-image push restrained, match the handoff composition carefully, and let depth and parallax develop naturally once the video takes over. A dissolve must not be used to conceal mismatched cabin geometry or doubled window edges.
- Carry the same perceived direction and pace through the transition. No restart from rest, pullback, jump in focal length, sudden turn or visible change of shot. The video motion should ease naturally toward the final living-room composition.
- Make the still transform, UI fade and video position follow the same scroll progression, including reverse scrolling. Fade out inactive controls from keyboard navigation as well as visually. The video must be ready at its matching opening frame before it is revealed.
- Check the handoff independently for desktop and portrait framing. Preserve the same cabin identity and provide a reduced-motion alternative when the journey is implemented.

The implemented preview uses an exact 1344 × 756 crop at (1296, 400) in the master, an 8.5-viewport scroll track, and generated exterior/interior footage. These continuity criteria remain the quality target; the provisional exterior blend does not yet satisfy them. See `design/journey/README.md`.
