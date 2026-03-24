"use client";

import { useEffect, useMemo, useState } from "react";

type SoloImageCarouselProps = {
  images: string[];
};

export default function SoloImageCarousel({ images }: SoloImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const imageCount = images.length;

  useEffect(() => {
    if (imageCount <= 1 || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imageCount);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [imageCount, isPaused]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % imageCount);
  };

  const getWrappedOffset = (index: number) => {
    if (imageCount <= 0) return 0;
    const raw = index - activeIndex;
    const half = Math.floor(imageCount / 2);
    if (raw > half) return raw - imageCount;
    if (raw < -half) return raw + imageCount;
    return raw;
  };

  const cardStyles = useMemo(
    () =>
      images.map((_, index) => {
        const offset = getWrappedOffset(index);
        const abs = Math.abs(offset);

        // Keep only nearby cards visible for a clean 3D stack.
        if (abs > 3) {
          return {
            opacity: 0,
            pointerEvents: "none" as const,
            transform: "translate3d(0px, 16px, -500px) scale(0.7) rotateY(0deg)",
            zIndex: 0,
          };
        }

        const translateX = offset * 225;
        const translateZ = abs === 0 ? 120 : 70 - abs * 44;
        const rotateY = offset * -23;
        const scale = abs === 0 ? 1 : 0.88 - abs * 0.1;
        const opacity = abs === 0 ? 1 : 0.82 - abs * 0.2;
        const blur = abs === 0 ? 0 : Math.min(2.8, abs * 1.15);

        return {
          opacity: Math.max(0, opacity),
          pointerEvents: abs <= 1 ? ("auto" as const) : ("none" as const),
          transform: `translate3d(${translateX}px, 0px, ${translateZ}px) scale(${Math.max(0.62, scale)}) rotateY(${rotateY}deg)`,
          filter: `blur(${blur}px)`,
          zIndex: 100 - abs,
        };
      }),
    [activeIndex, imageCount, images]
  );

  if (imageCount === 0) return null;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative h-[470px] overflow-hidden rounded-2xl md:h-[560px]"
        style={{ perspective: "1300px" }}
      >
        <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`View carousel image ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className="absolute h-[320px] w-[62vw] max-w-[520px] overflow-hidden rounded-2xl shadow-[0_22px_48px_rgba(0,0,0,0.3)] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] md:h-[430px] md:w-[36vw]"
              style={cardStyles[index]}
            >
              <img
                src={src}
                alt={`Clove SOLO carousel image ${index + 1}`}
                className="h-full w-full bg-black/20 object-contain"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {imageCount > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/35 bg-black/35 px-3 py-2 text-sm text-white backdrop-blur-sm"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/35 bg-black/35 px-3 py-2 text-sm text-white backdrop-blur-sm"
          >
            →
          </button>
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                aria-label={`Jump to image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-6 bg-white" : "w-2.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
