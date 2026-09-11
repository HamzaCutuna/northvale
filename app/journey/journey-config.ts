import type { Crop, FrameClip, Size } from "./journey-math";

const photo = (id: string, zoom: number, x: number, y = .5, mobileX = x, seconds = 1.8): FrameClip => ({
  id, pattern: `/journey/stills/${id}.webp`, mobilePattern: `/journey/stills/mobile/${id}.webp`,
  frameCount: Math.round(seconds * 60) + 1, fps: 60, overlap: .24,
  camera: { zoom, x, y, mobileX },
});

/** User-supplied photographs; the first image is the literal locked hero crop. */
export const JOURNEY = {
  master: { width: 2688, height: 1520 } satisfies Size,
  openingCrop: { x: 1296, y: 400, width: 1344, height: 756 } satisfies Crop,
  pushEnd: .18,
  handoffStart: .176,
  handoffEnd: .18,
  travelEnd: 1,
  scrollScreens: 7.5,
  poster: "/journey/stills/08-living-room-v2.webp",
  clips: [
    photo("opening-crop", 1, .5, .5, .5, .65),
    photo("00-opening-door-edit", 1.07, .68, .57, .5, 1.1),
    photo("01-close-approach", 1.13, .68, .56, .62),
    photo("02-terrace-edge", 1.14, .67, .53, .66),
    photo("03-terrace-entrance-v3", 1.16, .68, .51, .68),
    photo("04-doorway-approach", 1.13, .68, .51, .68),
    photo("06-at-threshold", 1.10, .6, .51, .6),
    photo("07-first-step-inside", 1.08, .56, .5, .56),
    photo("08-living-room-v2", 1.045, .5, .5, .53, 1.7),
  ],
};
