"use client";

import { useEffect, useMemo, useRef } from "react";

type AutoSwipeImageCarouselProps = {
  images: string[];
  speedPxPerSecond?: number;
};

export default function AutoSwipeImageCarousel({
  images,
  speedPxPerSecond = 46,
}: AutoSwipeImageCarouselProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const loopImages = useMemo(() => [...safeImages, ...safeImages], [safeImages]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || safeImages.length <= 1) return;

    let rafId = 0;
    let offsetPx = 0;
    let lastTs = 0;

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const deltaMs = ts - lastTs;
      lastTs = ts;

      const halfWidth = track.scrollWidth / 2;
      offsetPx += (speedPxPerSecond * deltaMs) / 1000;
      if (offsetPx >= halfWidth) {
        offsetPx -= halfWidth;
      }

      track.style.transform = `translateX(${-offsetPx}px)`;
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [safeImages.length, speedPxPerSecond]);

  if (safeImages.length === 0) return null;

  return (
    <div className="h-full w-full overflow-hidden rounded-2xl">
      <div ref={trackRef} className="flex h-full w-max items-stretch gap-3">
        {loopImages.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="h-full w-[58vw] min-w-[300px] max-w-[560px] shrink-0 md:w-[36vw] md:min-w-[360px] lg:w-[30vw]"
          >
          <img
            src={src}
            alt={`Header slide ${idx + 1}`}
            className="h-full w-full rounded-2xl object-cover"
            draggable={false}
          />
          </div>
        ))}
      </div>
    </div>
  );
}
