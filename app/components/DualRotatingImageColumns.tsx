"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { safeVideoPlay } from "../lib/safeVideoPlay";
import { seekVideoPreviewFrame } from "../lib/seekVideoPreviewFrame";

type DualRotatingImageColumnsProps = {
  images: string[];
};

const isVideoAsset = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

export default function DualRotatingImageColumns({
  images,
}: DualRotatingImageColumnsProps) {
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    if (images.length <= 1 || paused) return;

    let rafId = 0;
    let lastTs = 0;
    const itemsPerSecond = 0.3;

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const deltaSec = (ts - lastTs) / 1000;
      lastTs = ts;

      progressRef.current = (progressRef.current + deltaSec * itemsPerSecond) % images.length;
      setProgress(progressRef.current);
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [images.length, paused]);

  const cardStyles = useMemo(
    () =>
      images.map((_, index) => {
        const raw = index - progress;
        const half = Math.floor(images.length / 2);
        const offset =
          raw > half ? raw - images.length : raw < -half ? raw + images.length : raw;
        const abs = Math.abs(offset);

        if (abs > 2) {
          return {
            opacity: 0,
            transform: "translate3d(0px, 20px, -420px) scale(0.65) rotateY(0deg)",
            zIndex: 0,
          };
        }

        const translateX = offset * 300;
        const translateZ = abs === 0 ? 150 : 90 - abs * 55;
        const rotateY = offset * -22;
        const scale = abs === 0 ? 1 : 0.88 - abs * 0.13;
        const opacity = abs === 0 ? 1 : 0.86 - abs * 0.24;

        return {
          opacity: Math.max(0, opacity),
          transform: `translate3d(${translateX}px, 0px, ${translateZ}px) scale(${Math.max(0.62, scale)}) rotateY(${rotateY}deg)`,
          zIndex: 100 - abs,
        };
      }),
    [images, progress]
  );

  if (images.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1380px]">
      <div
        className="relative h-[430px] w-full overflow-hidden md:h-[560px]"
        style={{ perspective: "1700px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
          {images.map((src, index) => {
            const isVideo = isVideoAsset(src);
            return (
              <article
                key={`${src}-${index}`}
                className="absolute h-[330px] w-[82vw] max-w-[1080px] overflow-hidden rounded-2xl border border-white/18 bg-black/15 shadow-[0_28px_60px_rgba(0,0,0,0.35)] will-change-transform md:h-[450px] md:w-[70vw]"
                style={cardStyles[index]}
              >
                {isVideo ? (
                  <video
                    src={src}
                    aria-label={`Launch visual ${index + 1}`}
                    className="h-full w-full object-contain p-2"
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
                    alt={`Launch visual ${index + 1}`}
                    className="h-full w-full object-contain p-2"
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
      {/* intentionally no bottom controls/label */}
    </section>
  );
}
