export type Size = { width: number; height: number };
export type Crop = Size & { x: number; y: number };
export type FrameClip = {
  id: string;
  pattern: string;
  mobilePattern?: string;
  frameCount: number;
  fps: number;
  firstFrame?: number;
  /** Seconds shared with the end of the preceding clip. */
  overlap?: number;
  /** Still photographs use a continuous camera push over their virtual frames. */
  camera?: { zoom: number; x: number; y: number; mobileX?: number };
};
export type TimedClip = FrameClip & { start: number; end: number };
export type Sample = { clip: TimedClip; frame: number; opacity: number };

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const smoothstep = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

/** Matches the existing hero's CSS object-position, including portrait tablets. */
export function heroObjectPosition(width: number, height: number) {
  if (width <= 600) return 0.73;
  if (width <= 1050) return width / height <= 1 ? 0.68 : 0.61;
  return 0.5;
}

export function coverPlacement(source: Size, viewport: Size, positionX = 0.5) {
  const scale = Math.max(viewport.width / source.width, viewport.height / source.height);
  return {
    scale,
    x: (viewport.width - source.width * scale) * positionX,
    y: (viewport.height - source.height * scale) / 2,
  };
}

/**
 * Transform the original object-fit:cover image into the exact source rectangle
 * used to seed the first clip. This remains aligned on portrait viewports.
 */
export function heroTransform(master: Size, crop: Crop, viewport: Size, progress: number) {
  const original = coverPlacement(master, viewport, heroObjectPosition(viewport.width, viewport.height));
  const cropped = coverPlacement(crop, viewport);
  const finalScale = cropped.scale / original.scale;
  const amount = smoothstep(progress);
  const scale = Math.exp(Math.log(finalScale) * amount);
  const factor = finalScale === 1 ? amount : (scale - 1) / (finalScale - 1);
  const finalX = cropped.x - crop.x * cropped.scale - original.x * finalScale;
  const finalY = cropped.y - crop.y * cropped.scale - original.y * finalScale;
  return { scale, x: finalX * factor, y: finalY * factor };
}

export function createTimeline(clips: readonly FrameClip[]): TimedClip[] {
  const timeline: TimedClip[] = [];
  for (const clip of clips) {
    if (clip.frameCount < 1 || clip.fps <= 0) continue;
    const duration = Math.max(1 / clip.fps, (clip.frameCount - 1) / clip.fps);
    const previous = timeline.at(-1);
    // Never allow a three-way overlap, even with malformed metadata.
    const overlap = previous ? Math.min(clip.overlap ?? 0, duration / 2, (previous.end - previous.start) / 2) : 0;
    const start = previous ? previous.end - Math.max(0, overlap) : 0;
    timeline.push({ ...clip, start, end: start + duration });
  }
  return timeline;
}

export function sampleTimeline(timeline: readonly TimedClip[], progress: number): Sample[] {
  const duration = timeline.at(-1)?.end ?? 0;
  const time = clamp(progress) * duration;
  const active = timeline.filter((clip, index) => time >= clip.start && (time < clip.end || index === timeline.length - 1));
  const blend = active.length > 1 ? smoothstep((time - active[1].start) / (active[0].end - active[1].start)) : 0;
  return active.map((clip, index) => ({
    clip,
    frame: clamp((time - clip.start) * clip.fps, 0, clip.frameCount - 1),
    opacity: active.length === 1 ? 1 : index === 0 ? 1 - blend : blend,
  }));
}

export function framePath(clip: FrameClip, frame: number, mobile = false) {
  const number = Math.round(clamp(frame, 0, clip.frameCount - 1)) + (clip.firstFrame ?? 1);
  return (mobile && clip.mobilePattern ? clip.mobilePattern : clip.pattern)
    .replace(/\{frame(?::(\d+))?\}/g, (_match, digits: string | undefined) => String(number).padStart(Number(digits ?? 4), "0"));
}
