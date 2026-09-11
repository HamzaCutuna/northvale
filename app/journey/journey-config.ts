import type { Crop, FrameClip, Size } from "./journey-math";

const photo = (id: string, zoom: number, x: number, y = .5, mobileX = x, seconds = 1.8): FrameClip => ({
  id, pattern: `/journey/stills/${id}.webp`, mobilePattern: `/journey/stills/mobile/${id}-portrait.webp`,
  frameCount: Math.round(seconds * 60) + 1, fps: 60, overlap: .24,
  camera: { zoom, x, y, mobileX },
});

/** Three-view edit: close approach, terrace entrance, living room. */
export const JOURNEY = {
  master: { width: 2688, height: 1520 } satisfies Size,
  openingCrop: { x: 1296, y: 400, width: 1344, height: 756 } satisfies Crop,
  pushEnd: .18,
  handoffStart: .176,
  handoffEnd: .18,
  travelEnd: 1,
  scrollScreens: 4,
  poster: "/journey/stills/08-living-room-v2.webp",
  mobileClips: [
    photo("01-close-approach", 1.12, .5, .56, .5, 2.2),
    photo("03-terrace-entrance-v3", 1.18, .5, .51, .5, 2.2),
    photo("08-living-room-v2", 1.045, .5, .5, .5, 2.4),
  ],
  clips: [
    photo("01-close-approach", 1.12, .68, .56, .62, 2.2),
    photo("03-terrace-entrance-v3", 1.18, .68, .51, .68, 2.2),
    photo("08-living-room-v2", 1.045, .5, .5, .53, 2.4),
  ],
};



