# Northvale — image generation prompt pack

## Start here

**LATEST WORKFLOW — complete batch:** at the user's request, individual review stops are canceled. Use `design/northvale-review/COMPLETE-REMAINING-IMAGES.md` as the current brief for all 11 remaining images, 04–08-v2 and 09–14. It uses 03-v3 as a working entrance/room reference and replaces the old interior endpoint. The older step-by-step instructions below are historical and must not trigger more per-image reviews.

**Current review update (11 September):** 01 and 02 have been reviewed as working approach candidates, with remaining camera/deck/interior drift. Follow `design/northvale-review/NEXT-SHOT-03-V3.md` to generate one close entrance view from 02 next. The original hero/opening remain authoritative. Entrance v1/v2 are not accepted references; 08 is an interior mood candidate, not a locked floor plan. No uploaded image has replaced the website assets. Earlier review files are retained as history.

Create **8 new journey images**. There are **6 optional images** for later sections: 14 new images in total, not 20. The original hero and its exact zoom crop already exist and must not be regenerated.

**First batch: generate only `03-terrace-entrance.png` and `08-living-room.png`, then send both back to Codex with the original files.** These establish whether the entrance and interior actually belong to the original cabin. Once we check them, generate the other journey images. This avoids building an entire sequence around a wrong doorway.

Use one dedicated ChatGPT conversation. Paste the setup below once, then send one shot prompt at a time with its specified attachments. Reattach the important references for each shot; conversation memory alone is not a visual constraint. Download the original generated image, not a screenshot or a contact sheet. Save using the filename given here. If the download is JPEG or WebP, keep its real extension; do not rename it to PNG.

### Reference files to upload

| Label used in prompts | File | How it is used |
| --- | --- | --- |
| MASTER | `design/northvale-cabin-reference.png` | The original, authoritative cabin photograph. Attach this to every exterior shot. |
| OPENING | `design/journey/opening-crop.png` | Exact crop of MASTER used at the end of the hero zoom. Reuse this file unchanged as frame 00. |
| MOOD | `public/journey/interior.webp` | Optional existing interior inspiration: light, fabric, wood and atmosphere only. Its floor plan is not authoritative. |
| ENTRANCE | Your accepted `03-terrace-entrance` image | Shared doorway, terrace and visible room layout. |
| ROOM | Your accepted `08-living-room` image | Shared interior layout, furnishings and lighting. |

Do **not** attach the earlier Higgsfield terrace reference or the attempted repair video as architectural references. Those introduced the entrance mismatch we are trying to fix.

### What this image set can do

These are photographic keyframes for a scroll-controlled experience: image pushes, modest depth effects, reveals, and carefully placed transitions. Eight stills do not contain the motion or newly revealed surfaces needed for a true continuous camera flight. Generating 20 unrelated stills would not solve that. We will assess the returned images before choosing where smooth transitions are credible. We may request a few specific intermediate views later, after seeing the actual gaps.

The original hero stays unchanged. This pack does not implement later site sections or authorize any paid generation.

## 1. Paste this setup into the image conversation

Attach MASTER and OPENING. Optionally attach MOOD and label it explicitly as mood only.

```text
We are creating a consistent architectural photography sequence for NORTHVALE, a fictional but believable secluded cabin retreat. I will request one image at a time. Do not generate anything until I send a numbered shot prompt.

REFERENCE PRIORITY
MASTER is the original cabin photograph and the source of truth for its exterior architecture, proportions, landscape and time of day. OPENING is a literal crop of that photograph, not another property. If I attach MOOD, it is only a reference for warm timber, linen and interior lighting; do not copy its entrance or floor plan when they conflict with MASTER. Later, accepted ENTRANCE and ROOM images will lock the newly revealed details. A previous generated image never overrides MASTER if it has drifted.

CABIN IDENTITY
One modest rectangular cabin, one simple gabled charcoal standing-seam metal roof, dark vertical timber cladding, a full-height glazed end gable, slim black window mullions, large glazed bays along the long lake-facing side, a rough grey masonry chimney toward the rear right as seen in MASTER, and a low timber terrace with understated wooden chairs. Preserve the roof pitch, ridge direction, ridge-to-eave proportions, number and spacing of structural window divisions, and the relationship of the terrace to the mossy rocky shoreline. The cabin is neither an A-frame nor a larger luxury villa. Never add a wing, vestibule, second roof, second cabin, balcony, hot tub or new facade opening.

LANDSCAPE AND LIGHT
Keep the same still mountain lake, rocky moss-covered peninsula, conifer forest, grey mountain silhouettes and small snow patches. All journey images occur during the same cool, overcast early evening, with restrained warm lamp and firelight inside. Exposure may adjust gently as the camera enters, but the weather, time and lighting fixtures do not change. No orange sunset, bright daytime or night-black windows.

ENTRANCE DESIGN DECISION
The original distant photograph does not establish a detailed door mechanism. For the new close views, treat the existing tall glazed bay on the long lake-facing side, immediately before the solid timber portion on the right in MASTER, as an operable sliding entrance. Keep its existing structural opening and surrounding roof/wall geometry. Park its moving glass leaf open within the adjacent glazing, leaving one physically usable opening. Do not punch a new doorway through timber, put a front-facing doorway under a new gable, or invent a separate building behind the opening. This is the only new exterior construction detail being resolved. Once ENTRANCE is accepted, keep the panel, opening, handle, threshold and terrace exactly consistent in all subsequent images. The door remains open in the new sequence.

CAMERA AND OUTPUT
Photoreal professional architectural photography. Horizontal 16:9, one image per request, highest available native resolution, ideally at least 2560 pixels wide if available. Use a consistent natural 35 mm full-frame-equivalent lens for the journey, a level horizon, straight verticals and camera height approximately 1.55 metres above the surface the camera is standing on. No fisheye, exaggerated wide-angle stretching or miniature scale. Keep the route through the doorway in the central third so a portrait crop remains usable. Camera movement changes perspective; do not rotate or reshape the building to create a new angle. Keep architectural details reasonably sharp, with natural photographic texture and balanced highlights. No heavy blur, artificial HDR, glossy CGI finish or exaggerated bloom.

INTERIOR
The interior must fit inside the original cabin. Preserve the furniture and fire positions visible through MASTER as far as the view supports them. Use warm timber, pale natural upholstery, restrained black metal, grey stone and soft practical lighting. Resolve unseen details conservatively. Keep a clear walkable route through the entrance, around rather than through furniture. Do not add a long corridor, extra room or second facade purely to create apparent depth. Once the interior is accepted, furniture, windows and fixtures stay in exactly the same places.

No people in the journey images. No text, captions, logos, watermarks, image borders, collages, arrows or interface elements. Generate a finished photograph, not an architectural sheet. If references conflict, tell me what conflicts rather than silently combining two incompatible buildings.

For now, acknowledge the reference hierarchy and wait for my numbered shot request.
```

## 2. First batch — establish the two shared views

### 03 — Terrace and entrance (generate this first)

**Save as:** `03-terrace-entrance.png`  
**Attach:** MASTER + OPENING. MOOD is optional, clearly labelled as material/light inspiration only.

```text
Generate shot 03: TERRACE AND ENTRANCE, using the attached MASTER and OPENING and the previously supplied Northvale rules.

Move the camera onto the existing terrace, approximately two metres outside the sliding entrance defined in the setup. Show the opening near the centre of the image from a slight three-quarter angle. Include enough of the original glazed gable/corner at image left, the long roof eave above, and the original dark timber wall at image right to demonstrate that this is the very same side of the very same cabin. Do not turn the long side into a different front facade. Keep the sliding glass panel parked open, with its physically plausible frame, track and handle visible. Preserve the existing structural bay width and the original terrace boards and edge. Reposition the camera if needed to keep the walking route clear of the existing chairs; do not remove or relocate them.

Through the actual opening, reveal a modest warm living room that fits the original shell: pale linen seating near the lake-facing glass, a low natural wood table and a restrained fire/hearth consistent with what is visible in MASTER. Establish a clear walking route into that room. No second exterior wall or roof behind the doorway. A window must show the actual surrounding landscape rather than a pasted unrelated view.

Maintain the exact early-evening light, natural 35 mm lens and 1.55 m camera height. This must be an unoccupied architectural photograph, not a redesign. Render one landscape 16:9 image with no text.
```

**Check before moving on:** the gable is still at the same end of the rectangular building; the entrance occupies the existing side bay; no roof or extra facade appears behind it; the deck connects to the threshold; an adult could walk through the opening.

### 08 — Inside the living room (generate second)

**Save as:** `08-living-room.png`  
**Attach:** MASTER + accepted 03/ENTRANCE. Optionally MOOD, with its limited role stated.

```text
Generate shot 08: INSIDE THE LIVING ROOM, using MASTER for the cabin identity and the attached accepted ENTRANCE photograph for the actual room and doorway layout.

Place the camera approximately 1.8 metres inside the same open sliding entrance, on the clear route visible in ENTRANCE. Continue the viewing direction naturally from that entrance; allow only a small turn toward the living area. We are inside the same modest room, not a new room. Keep every window, visible wall, timber ceiling direction, sofa, lamp, table and hearth in the same physical position as ENTRANCE. The interior dimensions must fit the exterior cabin. Do not stretch the room into a hotel suite or add a hallway to obtain depth.

Compose a quiet, intimate arrival: natural linen seating, a low wood table, warm practical light and a small fire, with cool lake or forest light through the actual existing windows. Preserve the warm/cool balance from outside, lifting interior exposure only naturally. The room should feel usable and lived in, with restrained detail. Keep the central route unobstructed and enough of the seating and warm light near the centre to survive a portrait crop. The doorway may now fall outside the image because the camera has passed it; it must not become a second doorway ahead.

Use the same 35 mm lens and level 1.55 m camera height. No people. No text. One photoreal landscape 16:9 photograph. This image will become the shared ROOM reference for every subsequent interior view.
```

**Send 03 and 08 to Codex now.** Include any alternate version if you are unsure which is more faithful. Do not generate the rest until we have checked these two against MASTER.

## 3. Remaining journey shots — after the first batch is accepted

Final display order: **original hero → unchanged OPENING/frame 00 → 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08**. Generate the missing shots in the order below. Distances are approximate composition guides, not measurements recovered from the photograph.

### 01 — Close exterior approach

**Save as:** `01-close-approach.png`  
**Attach:** MASTER + OPENING + ENTRANCE.

```text
Generate shot 01: CLOSE EXTERIOR APPROACH. This is the first new viewpoint after the exact OPENING crop. Move the camera a short distance forward, approximately 1.5 metres, toward the existing terrace and the entrance locked in ENTRANCE. Keep the original three-quarter view, roof shape, gable end, chimney, structural glazing and shoreline. Let the cabin grow only modestly compared with OPENING; do not jump straight to the doorway. Keep the whole recognizable cabin in view with some rocky foreground, the lake at left and forest behind. The entrance detail must agree with ENTRANCE even if small at this distance. Do not move the building or rearrange its windows to improve the composition. Same early evening, natural 35 mm lens, level 1.55 m camera, landscape 16:9, photoreal, unoccupied, no text.
```

### 02 — Terrace edge

**Save as:** `02-terrace-edge.png`  
**Attach:** MASTER + accepted 01 + ENTRANCE.

```text
Generate shot 02: TERRACE EDGE. Advance from shot 01 along a physically connected path to the edge of the existing terrace, approximately four metres from the entrance in ENTRANCE. Begin a gentle camera turn to align with that opening; preserve the building's actual orientation. The deck edge and weathered boards occupy more foreground, the glass corner remains visible at left, and the same open entrance becomes the central destination. Preserve every chair, glazing division, roof eave and dark timber surface from the references. Show the real relationship between rocky ground, the low raised deck and its entrance threshold. No floating terrace, new stair flight, added porch, duplicate roof or new doorway. Same 35 mm lens and early evening; keep a level camera at a plausible standing height. One photoreal landscape 16:9 image, no people or text.
```

### 04 — One step from the entrance

**Save as:** `04-doorway-approach.png`  
**Attach:** ENTRANCE + ROOM + MASTER.

```text
Generate shot 04: DOORWAY APPROACH. Starting from the accepted shot 03/ENTRANCE, move the camera forward approximately 0.8 metres along the clear route, so it is about 1.2 metres outside the doorway. Keep the camera height, lens and direction consistent. The unchanged black door frame now occupies more of the image, the terrace boards lead toward the threshold, and the room beyond becomes clearer. Maintain the sliding leaf in precisely the same open position. Every furniture item and interior surface must agree with ROOM, viewed from outside, and every exterior edge must agree with ENTRANCE. This is one step forward in the same location; no change in architecture, furniture, weather or exposure style. Realistic parallax rather than a flat crop. Landscape 16:9, photoreal, no people or text.
```

### 05 — Immediately outside the threshold

**Save as:** `05-before-threshold.png`  
**Attach:** accepted 04 + ENTRANCE + ROOM.

```text
Generate shot 05: BEFORE THE THRESHOLD. Move forward on the same route from shot 04 until the camera is approximately half a metre outside the open doorway. Keep the same lens, level horizon, height and direction. The original door jambs spread toward the image edges. Show a believable junction between terrace boards, the shallow sliding track and the interior floor at the bottom of the image. The unobstructed opening reveals exactly the room in ROOM, from this closer exterior position. Preserve the open glass panel, frame thickness, handle location, furniture, ceiling and light sources. No glass across the walking opening, no extra door inside it, no morphing materials. One natural architectural photograph, landscape 16:9, no people or text.
```

### 06 — Crossing the threshold

**Save as:** `06-at-threshold.png`  
**Attach:** accepted 05 + ENTRANCE + ROOM.

```text
Generate shot 06: AT THE THRESHOLD. Advance the camera from shot 05 to the plane of the same open doorway. The camera is passing through empty air, not through glass, a closed panel or a wall. Keep only the physically visible near edges of the original jambs at the outer sides of the image. The threshold passes beneath the camera; the interior floor now fills most of the foreground. Preserve the exact room layout in ROOM and the unchanged perspective direction from shot 05. Natural interior exposure begins to lift gently while the same cool evening remains visible through the windows. Do not make the door frame into a tunnel or reveal another exterior building ahead. Same 35 mm lens and level 1.55 m camera. Landscape 16:9, photoreal, no people or text.
```

### 07 — First step inside

**Save as:** `07-first-step-inside.png`  
**Attach:** accepted 06 + ROOM + ENTRANCE.

```text
Generate shot 07: FIRST STEP INSIDE. Move approximately 0.8 metres into the living room from shot 06, along the same unobstructed route. This is an intermediate camera position between the threshold photograph and the accepted shot 08/ROOM. The original door frame is now behind the camera or barely visible at the extreme sides. Do not show a new doorway ahead. Keep the furniture, windows, hearth, ceiling structure, wood grain direction and practical lighting identical to ROOM. The seating and low table become larger with natural forward parallax; do not move them toward the camera. Follow a route beside the furniture, not through it. Same 35 mm lens, level 1.55 m camera, restrained warm exposure and cool evening window light. One photoreal landscape 16:9 image with no people or text.
```

## 4. Optional images for the later site sections

These are a future image library, not additional walkthrough frames. Generate them only after the journey references are accepted. Booking inputs, navigation, typography and reviews will be built in code; do not put them in the photographs. No bedroom or bathroom images are required at this stage.

### 09 — Living-room photograph for booking

**Save as:** `09-booking-room.png`  
**Attach:** ROOM + MASTER.

```text
Create a separate editorial photograph of the same accepted Northvale living room for a future booking section. Keep ROOM's exact furniture, materials, windows and room proportions. Move the camera to a plausible nearby position to show inviting linen seating, the low wood table and soft warm practical light, with a glimpse of the same cool lake setting through the actual windows. Compose the main furniture group toward the right half and leave a quieter, naturally darker area on the left for website typography that will be added later. Do not add blank walls or remove furniture to make space. Refined architectural photography with natural 35 mm optics and restrained contrast. Same early evening. Landscape 16:9. No people, text, logos or interface.
```

### 10 — Fire and material detail

**Save as:** `10-fire-detail.png`  
**Attach:** ROOM.

```text
Photograph the exact stove or fireplace visible in the accepted ROOM reference at closer range. Preserve its actual model, shape, finish, flue, glass and stone hearth; do not replace it with a different fireplace. Include nearby timber texture and a subtle glimpse of the same linen furnishings. A small believable fire, readable dark metal, natural ash and restrained warm light. Intimate material detail photographed with a natural 50 mm lens, moderate depth of field and no exaggerated orange glow. Same evening and room. Landscape 16:9, no people, text or added decor.
```

### 11 — Empty terrace, landscape and space for reviews

**Save as:** `11-terrace-landscape.png`  
**Attach:** MASTER + ENTRANCE.

```text
Create an editorial photograph from Northvale's actual existing timber terrace looking outward toward the same lake and mountains. Preserve the deck boards, edge, chair design, shoreline and geographic relationship established by MASTER and ENTRANCE. Show a recognizable edge of the dark cabin or its glazing on the right so this is clearly the same property. Use the original terrace chairs; do not add a larger deck or new lounge furniture. Let calm lake water and the mountain landscape occupy the left half with quiet space for future website text. Same cool early-evening weather and subtle warm light spilling from the cabin. Natural 35 mm photography, believable reflections and texture. Landscape 16:9. No people, text, floating objects or decorative string lights.
```

### 12 — Guest enjoying coffee (establish the guest once)

**Save as:** `12-guest-coffee-wide.png`  
**Attach:** accepted 11 + MASTER + ENTRANCE.

```text
Use the accepted terrace photograph 11 as the exact location reference. Preserve its cabin edge, deck, chairs, lake, mountain silhouettes, light and camera composition. Add one fictional adult guest, approximately in their thirties, sitting naturally in an existing terrace chair toward the right third, viewed from behind or in a restrained three-quarter rear view. The guest wears an unbranded muted olive overshirt over an oatmeal shirt and charcoal trousers. They quietly hold one simple matte off-white ceramic coffee mug, looking out at the lake. Relaxed posture, realistic anatomy and hands, no advertising pose and no look toward the camera. Retain generous quiet lake space at left for future reviews. The person should support the landscape rather than dominate it. Same early evening, subtle warm spill from the cabin, realistic natural photography. Landscape 16:9, no text or logos. This image establishes the guest, clothing and mug for subsequent lifestyle photographs.
```

### 13 — A closer quiet coffee moment

**Save as:** `13-guest-coffee-medium.png`  
**Attach:** accepted 12 + accepted 11.

```text
Create a closer editorial photograph of the exact same fictional adult guest from image 12, in the exact same terrace chair, with the same olive overshirt, oatmeal shirt, charcoal trousers and off-white ceramic mug. Move the camera closer from the same side; do not mirror the setting or reverse which side the lake and cabin occupy. Keep the same relaxed rear three-quarter view, with the guest holding the mug near their lap and looking toward the lake. Preserve hair, body proportions, clothing and chair construction. Include the same deck edge and mountain/lake context, now softer but recognizable. A natural 50 mm photograph, restrained depth of field, same evening light. No steam cloud, extra mug, changed identity, text or logos. Landscape 16:9.
```

### 14 — Hands, coffee and timber

**Save as:** `14-coffee-detail.png`  
**Attach:** accepted 12 + accepted 13.

```text
Create a close editorial photograph of the same guest's hands gently holding the exact same matte off-white ceramic coffee mug from images 12 and 13. Retain the same olive overshirt cuffs, chair arm and weathered terrace boards. The framing is a physically plausible closer view of that seated guest, not a new tabletop arrangement. Hands have natural anatomy and a believable grip; show only the hands and objects physically present in this view. A small hint of cool reflected lake light contrasts with warm light from the same cabin. Natural 50 mm photography, subtle depth of field, fine ceramic and cloth texture, no exaggerated steam. Landscape 16:9, no lettering, branding or new objects.
```

## 5. Correction prompt — use before continuing after a mismatch

Attach the failed image and the accepted reference. Replace the bracketed sentence with the specific visible error, for example: “The roof has become a front-facing gable above the side entrance; that roof does not exist in MASTER.”

```text
Revise the attached latest generated image. It is not an accepted new reference. The attached accepted reference remains authoritative.

The specific continuity error is: [DESCRIBE THE VISIBLE MISMATCH HERE].

Correct that mismatch to agree with the accepted reference while preserving the requested shot's camera position, perspective and composition as far as physically possible. Do not solve the problem by redesigning the cabin, moving furniture, adding architecture, mirroring the room, changing weather or changing lenses. Keep every already-correct detail. Return one corrected photoreal landscape 16:9 image, without annotations, text or a comparison layout. If this camera position cannot show the requested features consistently, explain the conflict instead of inventing new construction.
```

## 6. What to send back

1. First, original files for **03 and 08**, with the MASTER image if you used a different source from the one linked above.
2. After those are checked, the complete **01–08** set, individually or in a ZIP. Keep the numerical names and original resolution.
3. Optional **09–14** can follow later. Keep any rejected alternatives in a separate folder so we do not mistake them for the accepted sequence.

Check before each handoff: same roof and gable; same glazing divisions; one door in the same bay; one connected terrace; same furniture positions; same lake direction; no mirrored room; no text or watermarks. A photoreal-looking image can still be architecturally wrong.

We will keep the current website preview intact until the replacement set has been reviewed and is ready to implement.
