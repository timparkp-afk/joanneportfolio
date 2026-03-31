"use client";

import { useEffect, useRef, useState } from "react";
import { safeVideoPlay } from "../lib/safeVideoPlay";
import { seekVideoPreviewFrame } from "../lib/seekVideoPreviewFrame";

type CoastMediaCarouselProps = {
  media: string[];
};

const isVideoAsset = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);
const isPaidAsset = (src: string) => /\/paid\.png$/i.test(src);

export default function CoastMediaCarousel({ media }: CoastMediaCarouselProps) {
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef(0);

  const itemCount = media.length;

  useEffect(() => {
    if (itemCount <= 1 || paused) return;

    let rafId = 0;
    let lastTs = 0;
    const itemsPerSecond = 0.24;

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const deltaSec = (ts - lastTs) / 1000;
      lastTs = ts;

      progressRef.current = (progressRef.current + deltaSec * itemsPerSecond) % itemCount;
      setProgress(progressRef.current);

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [itemCount, paused]);

  const cardStyles = media.map((_, index) => {
    const phase = ((index - progress) / itemCount) * Math.PI * 2;
    const x = Math.sin(phase) * 320;
    const zDepth = (Math.cos(phase) + 1) / 2;
    const z = -300 + zDepth * 460;
    const scale = 0.72 + zDepth * 0.52;
    const rotateY = -Math.sin(phase) * 26;
    const opacity = 0.2 + zDepth * 0.8;

    return {
      opacity,
      pointerEvents: zDepth > 0.45 ? ("auto" as const) : ("none" as const),
      transform: `translate3d(${x}px, 0px, ${z}px) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex: Math.round(zDepth * 1000),
      filter: `blur(${(1 - zDepth) * 0.7}px)`,
    };
  });

  if (itemCount === 0) return null;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative h-[420px] overflow-hidden rounded-2xl md:h-[520px]"
        style={{ perspective: "1750px" }}
      >
        <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
          {media.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              aria-label={`View carousel item ${index + 1}`}
              className="absolute h-[290px] w-[64vw] max-w-[620px] overflow-hidden rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.4)] transition-[opacity,filter] duration-300 ease-linear md:h-[390px] md:w-[48vw]"
              style={{
                ...cardStyles[index],
                filter: isPaidAsset(src) ? "none" : cardStyles[index].filter,
              }}
            >
              {isVideoAsset(src) ? (
                <video
                  src={src}
                  className="h-full w-full object-contain"
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedMetadata={(event) => seekVideoPreviewFrame(event.currentTarget, 0)}
                  onLoadedData={(event) => safeVideoPlay(event.currentTarget)}
                />
              ) : (
                <img
                  src={src}
                  alt={`Clove 2.0 carousel item ${index + 1}`}
                  className="h-full w-full object-contain"
                  style={{ imageRendering: "auto" }}
                  draggable={false}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
