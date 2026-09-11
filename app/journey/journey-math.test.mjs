import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { JOURNEY } from "./journey-config.ts";
import { coverPlacement, createTimeline, framePath, heroObjectPosition, heroTransform, sampleTimeline } from "./journey-math.ts";

const master = { width: 2688, height: 1520 };
const crop = { x: 1296, y: 400, width: 1344, height: 756 };

test("every desktop and mobile frame in the production edit exists", () => {
  for (const clip of JOURNEY.clips) {
    for (let frame = 0; frame < clip.frameCount; frame++) {
      for (const mobile of [false, true]) {
        const path = new URL(`../../public${framePath(clip, frame, mobile)}`, import.meta.url);
        assert.ok(existsSync(path), `Missing ${path}`);
      }
    }
  }
});

test("the still-image handoff and video align at persistent landmarks across aspect ratios", () => {
  for (const viewport of [{ width: 1920, height: 1080 }, { width: 1280, height: 720 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 568 }]) {
    const original = coverPlacement(master, viewport, heroObjectPosition(viewport.width, viewport.height));
    const video = coverPlacement(crop, viewport);
    const transform = heroTransform(master, crop, viewport, 1);
    for (const point of [{ x: crop.x, y: crop.y }, { x: 1968, y: 778 }, { x: 2370, y: 1100 }]) {
      const stillX = (original.x + point.x * original.scale) * transform.scale + transform.x;
      const stillY = (original.y + point.y * original.scale) * transform.scale + transform.y;
      const videoX = video.x + (point.x - crop.x) * video.scale;
      const videoY = video.y + (point.y - crop.y) * video.scale;
      assert.ok(Math.abs(stillX - videoX) < 1e-6);
      assert.ok(Math.abs(stillY - videoY) < 1e-6);
    }
    assert.deepEqual(heroTransform(master, crop, viewport, 0), { scale: 1, x: -0, y: -0 });
  }
});

test("reverse scrubbing uses the same shared-frame blend and exact endpoints", () => {
  const clips = [
    { id: "a", pattern: "/a/{frame:4}.webp", frameCount: 193, fps: 24 },
    { id: "b", pattern: "/b/{frame:4}.webp", frameCount: 193, fps: 24, overlap: .25 },
  ];
  const timeline = createTimeline(clips);
  assert.equal(timeline[1].start, 7.75);
  const middle = sampleTimeline(timeline, 7.875 / 15.75);
  assert.equal(middle.length, 2);
  assert.equal(middle[0].opacity, .5);
  assert.equal(middle[1].opacity, .5);
  assert.equal(framePath(sampleTimeline(timeline, 0)[0].clip, 0), "/a/0001.webp");
  const last = sampleTimeline(timeline, 1)[0];
  assert.equal(framePath(last.clip, last.frame), "/b/0193.webp");
  for (const progress of [1, .9, .5001, .49, .1, 0]) {
    const samples = sampleTimeline(timeline, progress);
    assert.ok(samples.length > 0 && samples.length <= 2);
    assert.ok(samples.every(sample => sample.frame >= 0 && sample.frame <= sample.clip.frameCount - 1));
  }
});
