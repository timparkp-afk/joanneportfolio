"use client";

import { useEffect, useRef } from "react";
import {
  subscribeChannelCarousel,
  unsubscribeChannelCarousel,
} from "../lib/channelCarouselTicker";
import { safeVideoPlay } from "../lib/safeVideoPlay";

type ChannelAutoCarouselProps = {
  items: string[];
  ariaLabel: string;
  /** Card size; `xlarge` is intended for the Video channel (taller/wider than `large`). */
  size?: "default" | "large" | "xlarge";
  /** Continuous horizontal auto-scroll (seamless loop when there are 2+ items). */
  autoScroll?: boolean;
  /** When false, videos show controls and do not autoplay (images unchanged). */
  videoAutoplay?: boolean;
};

const isVideoAsset = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

const cardSizeClasses: Record<NonNullable<ChannelAutoCarouselProps["size"]>, string> = {
  default:
    "h-[190px] min-w-[58vw] sm:min-w-[46vw] md:h-[240px] md:min-w-[36vw] lg:min-w-[28vw]",
  large:
    "h-[260px] min-w-[72vw] sm:min-w-[60vw] md:h-[320px] md:min-w-[44vw] lg:min-w-[36vw]",
  xlarge:
    "h-[300px] min-w-[82vw] sm:min-w-[70vw] md:h-[400px] md:min-w-[50vw] lg:min-w-[42vw]",
};

export default function ChannelAutoCarousel({
  items,
  ariaLabel,
  size = "default",
  autoScroll = false,
  videoAutoplay = true,
}: ChannelAutoCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const displayItems =
    autoScroll && items.length > 1 ? [...items, ...items] : items;
  const showAutoScroll = autoScroll && items.length > 1;

  const itemsKey = items.join("\0");

  useEffect(() => {
    if (!showAutoScroll) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const entry = { scroller, track };
    subscribeChannelCarousel(entry);
    return () => unsubscribeChannelCarousel(entry);
  }, [showAutoScroll, itemsKey]);

  /** Pause off-screen videos so the page doesn't decode 6+ streams while scrolling. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const syncVideos = (visible: boolean) => {
      const list = root.querySelectorAll<HTMLVideoElement>("video");
      list.forEach((v) => {
        if (!videoAutoplay) return;
        if (visible) {
          safeVideoPlay(v);
        } else {
          v.pause();
        }
      });
    };

    const io = new IntersectionObserver(
      (observed) => {
        const hit = observed[0];
        if (!hit) return;
        const visible = hit.isIntersecting && hit.intersectionRatio > 0.02;
        syncVideos(visible);
      },
      { root: null, rootMargin: "120px 0px 120px 0px", threshold: [0, 0.05, 0.15] }
    );

    io.observe(root);
    return () => io.disconnect();
  }, [itemsKey, videoAutoplay]);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#0047ff]/35 bg-white/90 px-5 py-8 text-center text-sm shadow-[0_14px_36px_rgba(0,71,255,0.12)]">
        No assets in this channel folder yet.
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative [contain:layout_paint]">
      {items.length > 1 ? (
        <div className="mb-2 flex items-center justify-end pr-1 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#0047ff]/70">
          {showAutoScroll ? (
            <>Drag or scroll to explore &rarr;</>
          ) : (
            <>Scroll to view more &rarr;</>
          )}
        </div>
      ) : null}
      <div
        ref={scrollerRef}
        aria-label={ariaLabel}
        className="overflow-x-auto overflow-y-hidden pb-2 [overscroll-behavior-x:contain] [overscroll-behavior-y:auto]"
      >
        <div
          ref={trackRef}
          className={`flex w-max gap-4 pr-8 ${showAutoScroll ? "" : "snap-x snap-mandatory"}`}
        >
          {displayItems.map((src, index) => {
            const isVideo = isVideoAsset(src);
            return (
              <article
                key={`${src}-${index}`}
                className={`group relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/35 bg-white/90 p-2 shadow-[0_14px_36px_rgba(0,71,255,0.12)] ${showAutoScroll ? "" : "snap-start"} ${cardSizeClasses[size]}`}
              >
                {isVideo ? (
                  <video
                    src={src}
                    aria-label="Channel sample"
                    className="h-full w-full object-contain"
                    controls={!videoAutoplay}
                    muted={videoAutoplay}
                    loop={videoAutoplay}
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={src}
                    alt="Channel sample"
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
      {items.length > 1 ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white/75 to-transparent"
        />
      ) : null}
    </div>
  );
}
