type CachedFrame = { image: ImageBitmap; used: number };

/** Decoded memory is bounded; previously visited images can use HTTP cache. */
export class FrameCache {
  private images = new Map<string, CachedFrame>();
  private requests = new Map<string, AbortController>();
  private failures = new Map<string, number>();
  private priorities: string[] = [];
  private serial = 0;
  private disposed = false;

  constructor(private capacity: number, private onReady: () => void, private concurrency = 4) {}

  get(path: string) {
    const frame = this.images.get(path);
    if (frame) frame.used = ++this.serial;
    return frame?.image;
  }

  hasFailed(path: string) {
    return this.failures.has(path);
  }

  request(paths: string[]) {
    if (this.disposed) return;
    // A prefetch window larger than the cache would continuously evict and
    // reload its own frames, even when the visitor has stopped scrolling.
    this.priorities = [...new Set(paths)].slice(0, this.capacity);
    this.pump();
  }

  private pump() {
    if (this.disposed) return;
    while (this.requests.size < this.concurrency) {
      const path = this.priorities.find((candidate) => !this.images.has(candidate) && !this.requests.has(candidate) && Date.now() - (this.failures.get(candidate) ?? 0) > 15_000);
      if (!path) break;
      const controller = new AbortController();
      this.requests.set(path, controller);
      void this.load(path, controller);
    }
  }

  private async load(path: string, controller: AbortController) {
    try {
      const response = await fetch(path, { signal: controller.signal, cache: "force-cache" });
      if (!response.ok) throw new Error("Frame unavailable");
      const image = await createImageBitmap(await response.blob());
      if (this.disposed) { image.close(); return; }
      this.images.set(path, { image, used: ++this.serial });
      while (this.images.size > this.capacity) {
        let oldestPath: string | undefined;
        let oldest = Infinity;
        for (const [key, value] of this.images) {
          // The next few requested frames must survive a just-completed prefetch.
          if (this.priorities.slice(0, 4).includes(key)) continue;
          if (value.used < oldest) { oldest = value.used; oldestPath = key; }
        }
        if (!oldestPath) break;
        this.images.get(oldestPath)?.image.close();
        this.images.delete(oldestPath);
      }
      this.onReady();
    } catch {
      if (!this.disposed && !controller.signal.aborted) {
        this.failures.set(path, Date.now());
        this.onReady();
      }
    } finally {
      this.requests.delete(path);
      this.pump();
    }
  }

  dispose() {
    this.disposed = true;
    for (const controller of this.requests.values()) controller.abort();
    for (const frame of this.images.values()) frame.image.close();
    this.requests.clear();
    this.images.clear();
    this.priorities = [];
  }
}
