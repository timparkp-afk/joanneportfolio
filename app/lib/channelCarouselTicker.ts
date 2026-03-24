/**
 * Single shared animation frame for all channel carousels — avoids N competing
 * RAF callbacks and keeps vertical page scroll smoother.
 */
type CarouselTickEntry = {
  scroller: HTMLDivElement;
  track: HTMLDivElement;
};

const entries = new Set<CarouselTickEntry>();
let rafId: number | null = null;
let lastTs = 0;

const PX_PER_SEC = 42;

function tick(now: number) {
  if (entries.size === 0) {
    rafId = null;
    lastTs = 0;
    return;
  }

  if (lastTs === 0) lastTs = now;
  const deltaSec = Math.min(0.05, (now - lastTs) / 1000);
  lastTs = now;

  for (const { scroller, track } of entries) {
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) continue;
    scroller.scrollLeft += PX_PER_SEC * deltaSec;
    if (scroller.scrollLeft >= halfWidth) {
      scroller.scrollLeft -= halfWidth;
    }
  }

  rafId = requestAnimationFrame(tick);
}

export function subscribeChannelCarousel(entry: CarouselTickEntry) {
  entries.add(entry);
  if (entries.size === 1) {
    lastTs = 0;
    rafId = requestAnimationFrame(tick);
  }
}

export function unsubscribeChannelCarousel(entry: CarouselTickEntry) {
  entries.delete(entry);
  if (entries.size === 0 && rafId != null) {
    cancelAnimationFrame(rafId);
    rafId = null;
    lastTs = 0;
  }
}
