"use client";

import { useEffect, useMemo, useRef } from "react";

type ProductLaunchesBannerRowsProps = {
  rows: string[][];
};

type RowMarqueeProps = {
  images: string[];
  speedPxPerSecond: number;
};

function RowMarquee({ images, speedPxPerSecond }: RowMarqueeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const loopImages = useMemo(() => [...images, ...images], [images]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length <= 1) return;

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
  }, [images.length, speedPxPerSecond]);

  return (
    <div className="relative h-[170px] overflow-hidden rounded-2xl border border-white/20 bg-black/10 md:h-[190px]">
      <div ref={trackRef} className="absolute inset-0 flex w-max items-center gap-3">
        {loopImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="h-full w-[34vw] min-w-[220px] max-w-[380px] overflow-hidden rounded-xl md:w-[24vw] md:min-w-[260px]"
          >
            <img
              src={src}
              alt={`Product launch visual ${index + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductLaunchesBannerRows({
  rows,
}: ProductLaunchesBannerRowsProps) {
  const speeds = [34, 28, 32];

  return (
    <section className="w-full space-y-3 md:space-y-4">
      {rows.map((rowImages, index) => (
        <RowMarquee
          key={`launch-row-${index}`}
          images={rowImages}
          speedPxPerSecond={speeds[index % speeds.length]}
        />
      ))}
    </section>
  );
}
