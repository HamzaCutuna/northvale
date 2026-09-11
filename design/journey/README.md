# Northvale journey — current preview

The user chose to review the existing imagery on 10 September 2026 after declining additional Higgsfield credits. No 3D rebuild or further paid generation is authorized by that choice. The original hero remains the canonical visual reference.

## Edit

- The first 18% of the scroll pushes the existing hero into the exact master-image crop `(1296, 400, 1344, 756)` while its UI fades.
- The exterior uses frames 0–107 and 138–192 of the Seedance source, with a short 0.24-second blend. The source's baked, extended dissolve was removed.
- The entrance joins the Kling interior clip with a 0.16-second blend. It moves through the open doorway and ends in the living room.
- The Wan repair clip is excluded: it introduced a second facade behind the entrance. Its files remain available for comparison.
- Scroll runs through 5 viewport heights. Image frames provide reversible seeking without video-keyframe delays. Desktop frames are 1600 × 900; mobile frames are 960 × 540. Decoded images are held in a bounded cache rather than loading the entire sequence into memory.
- Reduced motion and unavailable canvas use an exterior/interior still alternative. There is a keyboard skip, return control, and an image-loading fallback.

## Known visual limitation

The exterior changes entrance geometry between the two retained portions. The short blend is a reviewable compromise using the existing assets, **not an approved seamless architectural match**. The living-room passage is substantially more consistent. Do not describe the complete edit as a photoreal continuous take or use its altered entrance to redefine the original cabin.

## Asset provenance

| Asset | Higgsfield job or media ID | Role |
| --- | --- | --- |
| Canonical hero | de8b435c-b645-4112-89ab-181404e80b44 | Original cabin master, unchanged |
| Opening crop | 9cc9c86f-af09-445a-b356-35d38a76d072 | Exact crop of master, no new generation |
| Terrace reference | 18737dcd-ffff-47b3-98d7-a4dcdd16943d | GPT Image 2 keyframe |
| Interior reference | 4abb2576-3257-4948-93e4-ee852c904526 | GPT Image 2 keyframe derived from terrace |
| Exterior source | e2b5e6c7-2254-48e9-8e88-1f0e253c3795 | Seedance, 193 frames at 24 fps |
| Interior source | f8a600e2-56a9-4665-93f6-c4916303a588 | Kling 3 Pro, 193 frames at 24 fps |
| Excluded repair | 30654c9d-870d-4814-bde6-322d05cc6ef3 | Wan 2.7, 60 frames at 30 fps |

Reference images and contact sheets are retained in this directory. The two ZIP archives retain the exported frame sets. Runtime media and timing live in `public/journey/` and `app/journey/journey-config.ts`.

## Scope

Only the hero-to-interior experience is implemented. Booking, lifestyle and reviews remain future sections. Continue section by section according to `CONTEXT.md`.

## Checks

`npm run lint`, `npm run build`, and `node --experimental-strip-types --test app/journey/journey-math.test.mjs`.

## Replacement photographic journey — September 11, 2026

The active webpage now uses the user-supplied photographs in `design/northvale-review`, replacing all previous generated video frames. The hero remains unchanged. Its exact opening crop is the first canvas image, followed by 01, 03-v3, 06 and 08-v2. Redundant near-duplicates (00 opening door edit, 02 terrace edge, 04 doorway approach, 07 first step inside) were removed from the scroll sequence on 11 September 2026 to keep each beat visually distinct. Rejected entrance versions and the original 08 are excluded.

WebP copies live in `public/journey/stills` with smaller mobile copies. Originals are preserved. Scroll drives per-photo forward zooms and reversible crossfades in a five-screen pinned track. Adjacent images are decoded ahead of the current view; decoded memory is bounded. Reduced-motion visitors receive the original hero and the new living-room photograph without the pinned motion.

This is an edited still-image experience. The original hero-to-crop alignment is exact; the independently generated perspectives are not a geometrically continuous video. Do not describe those dissolves as a verified seamless walkthrough. Images 09–14 remain available for future booking and lifestyle work; no additional sections were built.
