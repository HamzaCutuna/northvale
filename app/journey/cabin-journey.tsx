"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { JOURNEY } from "./journey-config";
import { FrameCache } from "./frame-cache";
import { clamp, coverPlacement, createTimeline, framePath, sampleTimeline, smoothstep, type Sample } from "./journey-math";
import styles from "./journey.module.css";

type JourneyControls = { arrive: () => void; returnToLake: () => void; simplify: () => void };

export default function CabinJourney({ children }: { children: ReactNode }) {
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const arrival = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const staticArrival = useRef<HTMLElement>(null);
  const controls = useRef<JourneyControls | null>(null);

  useEffect(() => {
    const root = track.current;
    const viewport = stage.current;
    const surface = canvas.current;
    const endControls = arrival.current;
    const loadingStatus = status.current;
    if (!root || !viewport || !surface || !endControls || !loadingStatus) return;
    const media = viewport.querySelector<HTMLElement>(".hero-media");
    const shade = viewport.querySelector<HTMLElement>(".hero-shade");
    const ui = Array.from(viewport.querySelectorAll<HTMLElement>(".site-header, .hero-content, .hero-footnote"));
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeline = createTimeline(window.innerWidth <= 600 ? JOURNEY.mobileClips : JOURNEY.clips);
    let disposeEngine = () => {};

    function resetHero() {
      if (media) media.style.transform = "";
      if (shade) shade.style.opacity = "";
      for (const element of ui) {
        element.style.filter = "";
        element.style.visibility = "";
        element.inert = false;
      }
    }

    function setup() {
      disposeEngine();
      resetHero();
      const context = surface!.getContext("2d", { alpha: false });
      if (motionPreference.matches || !context || !window.createImageBitmap || !timeline.length) {
        root!.dataset.motion = "still";
        controls.current = {
          arrive: () => staticArrival.current?.scrollIntoView(),
          returnToLake: () => window.scrollTo({ top: root!.offsetTop, behavior: "instant" }),
          simplify: () => staticArrival.current?.scrollIntoView(),
        };
        return;
      }
      root!.dataset.motion = "scroll";
      let disposed = false;
      let raf = 0;
      let lastTime = 0;
      let progress = 0;
      let target = 0;
      let width = 0;
      let height = 0;
      let dpr = 1;
      let range = 1;
      let top = 0;
      let mobile = false;
      let drawn = false;
      let lastFramePath = "";
      let paintKey = "";
      let focusArrival = false;
      let pendingTimer: ReturnType<typeof setTimeout> | undefined;
      const cache = new FrameCache(12, requestTick, 3);

      function requestTick() {
        if (!disposed && !raf) raf = requestAnimationFrame(tick);
      }

      function stopWaiting() {
        if (pendingTimer) clearTimeout(pendingTimer);
        pendingTimer = undefined;
        loadingStatus!.hidden = true;
      }

      function queueFrames() {
        const clipProgress = progress;
        const samples = sampleTimeline(timeline, clipProgress);
        const paths = samples.map(sample => framePath(sample.clip, sample.frame, mobile));
        if (lastFramePath) paths.push(lastFramePath);
        const last = timeline[timeline.length - 1];
        paths.push(framePath(last, last.frameCount - 1, mobile));
        // Decode adjacent photographs first, then the rest of the small set.
        for (const sample of samples) {
          const index = timeline.indexOf(sample.clip);
          if (timeline[index + 1]) paths.push(framePath(timeline[index + 1], 0, mobile));
          if (timeline[index - 1]) paths.push(framePath(timeline[index - 1], 0, mobile));
        }
        paths.push(...timeline.map(clip => framePath(clip, 0, mobile)));
        cache.request(paths);
        return samples;
      }

      function drawCover(image: ImageBitmap, opacity = 1, sample?: Sample) {
        const camera = sample?.clip.camera;
        const amount = sample ? clamp(sample.frame / (sample.clip.frameCount - 1)) : 0;
        const placement = coverPlacement(image, { width, height }, .5);
        const zoom = 1 + ((camera?.zoom ?? 1) - 1) * amount;
        const focusX = width * (camera?.x ?? .5);
        const focusY = height * (camera?.y ?? .5);
        context!.globalAlpha = opacity;
        context!.drawImage(image, placement.x * zoom - focusX * (zoom - 1), placement.y * zoom - focusY * (zoom - 1), image.width * placement.scale * zoom, image.height * placement.scale * zoom);
      }

      function tick(time: number) {
        raf = 0;
        if (disposed) return;
        const elapsed = lastTime ? Math.min(50, time - lastTime) : 16;
        lastTime = time;
        progress += (target - progress) * (1 - Math.exp(-elapsed / 85));
        if (Math.abs(target - progress) < 0.00003) progress = target;
        root!.dataset.progress = progress.toFixed(4);
        root!.dataset.moving = progress > 0.0001 ? "true" : "false";
        if (media) media.style.transform = "";
        const uiOpacity = 1 - smoothstep(progress / 0.105);
        for (const element of ui) {
          element.style.filter = uiOpacity < 1 ? `opacity(${uiOpacity})` : "";
          element.style.visibility = uiOpacity <= 0.001 ? "hidden" : "";
          element.inert = uiOpacity <= 0.05;
        }
        if (shade) shade.style.opacity = String(1 - smoothstep(progress / JOURNEY.pushEnd));

        const samples = queueFrames();
        const frames = samples.map(sample => ({ sample, path: framePath(sample.clip, sample.frame, mobile) }));
        const ready = frames.map(frame => ({ ...frame, image: cache.get(frame.path) }));
        const canDraw = ready.length > 0 && ready.every(frame => !!frame.image);
        if (canDraw) {
          const key = ready.map(frame => `${frame.path}:${frame.sample.frame.toFixed(3)}:${frame.sample.opacity.toFixed(3)}`).join("|");
          if (key !== paintKey) {
            context!.setTransform(dpr, 0, 0, dpr, 0, 0);
            // Opaque base + one weighted overlay avoids darkening the seam.
            drawCover(ready[0].image!, 1, ready[0].sample);
            if (ready[1]) drawCover(ready[1].image!, ready[1].sample.opacity, ready[1].sample);
            context!.globalAlpha = 1;
            lastFramePath = ready[ready.length - 1].path;
            paintKey = key;
            drawn = true;
          }
          stopWaiting();
        } else if (progress > JOURNEY.handoffStart && !pendingTimer) {
          pendingTimer = setTimeout(() => {
            if (!disposed) loadingStatus!.hidden = false;
          }, 2500);
        }
        const sceneOpacity = drawn ? smoothstep(progress / .025) : 0;
        surface!.style.opacity = String(sceneOpacity);
        // Never announce arrival before its actual image has decoded.
        const arrived = progress >= .93 && canDraw;
        endControls!.style.opacity = arrived ? "1" : "0";
        endControls!.style.visibility = arrived ? "visible" : "hidden";
        endControls!.inert = !arrived;
        if (arrived && focusArrival) {
          endControls!.focus({ preventScroll: true });
          focusArrival = false;
        }
        if (progress !== target) requestTick();
      }

      function measure() {
        const bounds = viewport!.getBoundingClientRect();
        const nextWidth = bounds.width;
        const nextHeight = bounds.height;
        top = root!.getBoundingClientRect().top + window.scrollY;
        range = Math.max(1, root!.offsetHeight - nextHeight);
        mobile = nextWidth <= 600;
        timeline = createTimeline(mobile ? JOURNEY.mobileClips : JOURNEY.clips);
        if (nextWidth !== width || nextHeight !== height) {
          width = nextWidth;
          height = nextHeight;
          dpr = Math.min(window.devicePixelRatio || 1, mobile ? 3 : 1.5);
          surface!.width = Math.round(width * dpr);
          surface!.height = Math.round(height * dpr);
          paintKey = "";
          const currentFrames = sampleTimeline(timeline, progress).map(sample => ({
            sample, image: cache.get(framePath(sample.clip, sample.frame, mobile)),
          }));
          if (currentFrames.length && currentFrames.every(frame => frame.image)) {
            context!.setTransform(dpr, 0, 0, dpr, 0, 0);
            drawCover(currentFrames[0].image!, 1, currentFrames[0].sample);
            if (currentFrames[1]) drawCover(currentFrames[1].image!, currentFrames[1].sample.opacity, currentFrames[1].sample);
            context!.globalAlpha = 1;
          } else drawn = false;
        }
        onScroll();
      }

      function onScroll() {
        target = clamp((window.scrollY - top) / range);
        requestTick();
      }

      const observer = new ResizeObserver(measure);
      observer.observe(viewport!);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", measure, { passive: true });
      measure();
      progress = target;

      disposeEngine = () => {
        if (disposed) return;
        disposed = true;
        cancelAnimationFrame(raf);
        if (pendingTimer) clearTimeout(pendingTimer);
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", measure);
        cache.dispose();
        surface!.style.opacity = "0";
        loadingStatus!.hidden = true;
      };
      controls.current = {
        arrive: () => {
          focusArrival = true;
          target = progress = 1;
          window.scrollTo({ top: top + range, behavior: "instant" });
          requestTick();
        },
        returnToLake: () => {
          progress = target = 0;
          window.scrollTo({ top, behavior: "instant" });
          requestTick();
          viewport!.querySelector<HTMLElement>("#northvale")?.focus({ preventScroll: true });
        },
        simplify: () => {
          disposeEngine();
          resetHero();
          root!.dataset.motion = "still";
          staticArrival.current?.scrollIntoView({ behavior: "instant" });
        },
      };
    }
    setup();
    motionPreference.addEventListener("change", setup);
    return () => {
      disposeEngine();
      motionPreference.removeEventListener("change", setup);
      resetHero();
      controls.current = null;
    };
  }, []);

  return (
    <section ref={track} className={styles.track} style={{ "--journey-screens": JOURNEY.scrollScreens } as CSSProperties} aria-label="A journey into Northvale">
      <button className={styles.skip} onClick={() => controls.current?.arrive()}>Skip to the living room</button>
      <div ref={stage} className={styles.stage}>
        {children}
        <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
        <p className={styles.srOnly}>Scroll to approach the terrace, enter through the doorway and arrive in Northvale’s warm living room. Scroll back to return to the lake.</p>
        <div ref={arrival} className={styles.arrival} tabIndex={-1}>
          <span className={styles.arrivalNote}>Make yourself at home.</span>
          <a href="#stay">Stay a little longer <span aria-hidden="true">↓</span></a>
        </div>
        <div ref={status} className={styles.status} role="status" hidden>
          <span>The view is taking a moment.</span>
          <button onClick={() => controls.current?.simplify()}>View the living room</button>
        </div>
      </div>
      <section ref={staticArrival} className={styles.staticArrival} aria-label="Inside Northvale" tabIndex={-1}>
        <picture><source media="(max-width: 600px)" srcSet="/journey/stills/mobile/08-living-room-v2-portrait.webp" /><Image src={JOURNEY.poster} fill sizes="(max-aspect-ratio: 16/9) 177vh, 100vw" alt="Inside Northvale: a cream linen sofa by lake-facing windows, warm timber and a glowing wood stove." /></picture>
        <div className={styles.staticCaption}>
          <p>Make yourself at home.</p>
          <a href="#stay">Stay a little longer <span aria-hidden="true">↓</span></a>
        </div>
      </section>
    </section>
  );
}



