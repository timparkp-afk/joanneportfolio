"use client";

import { useEffect, useRef } from "react";

type EveryBizVideoCarouselProps = {
  videos: string[];
};

export default function EveryBizVideoCarousel({ videos }: EveryBizVideoCarouselProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const syncScrollToProgress = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progressRaw = (vh - rect.top) / (vh + rect.height);
      const progress = Math.max(0, Math.min(1, progressRaw));
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;
      track.scrollLeft = maxScroll * progress;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        syncScrollToProgress();
        rafId = 0;
      });
    };

    syncScrollToProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const nudge = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(260, track.clientWidth * 0.55);
    track.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div ref={sectionRef} className="relative w-full max-w-[1120px]">
      <div className="mb-2 flex items-center justify-between px-1 text-[11px] uppercase tracking-[0.16em] text-[#dbe8ff]/80">
        <span>Campaign videos</span>
        <span>Scroll to glide -&gt;</span>
      </div>

      <button
        type="button"
        aria-label="Scroll carousel left"
        onClick={() => nudge("left")}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-black/35 px-3 py-2 text-sm text-white/90 backdrop-blur-sm"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Scroll carousel right"
        onClick={() => nudge("right")}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-black/35 px-3 py-2 text-sm text-white/90 backdrop-blur-sm"
      >
        →
      </button>

      <div
        ref={trackRef}
        className="overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max min-w-full snap-x snap-mandatory gap-3 md:gap-4">
          {videos.map((videoSrc, index) => (
            <video
              key={videoSrc}
              src={videoSrc}
              className="aspect-video w-[78vw] max-w-[560px] shrink-0 snap-start rounded-xl border border-white/20 object-cover md:w-[44vw]"
              aria-label={`Every Biz video ${index + 1}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls
            />
          ))}
        </div>
      </div>
    </div>
  );
}
