"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { publicAssetUrl } from "../lib/publicAssetUrl";
import { safeVideoPlay } from "../lib/safeVideoPlay";
import { seekVideoPreviewFrame } from "../lib/seekVideoPreviewFrame";

type HomeGalleryCarouselVideoProps = {
  src: string;
  ariaLabel: string;
  className?: string;
  style?: CSSProperties;
  videoLoopStart?: number;
  videoLoopEnd?: number;
};

/**
 * Home project carousel: muted autoplay when the card is in view (matches project pages’
 * scroll/visibility-driven playback). Supports optional [start, end] segment loops.
 */
export default function HomeGalleryCarouselVideo({
  src,
  ariaLabel,
  className,
  style,
  videoLoopStart,
  videoLoopEnd,
}: HomeGalleryCarouselVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const url = publicAssetUrl(src);
  const segmentLoop =
    typeof videoLoopStart === "number" && typeof videoLoopEnd === "number";

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            safeVideoPlay(video);
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.12, rootMargin: "64px 0px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [url]);

  return (
    <video
      ref={ref}
      src={url}
      aria-label={ariaLabel}
      className={className}
      style={style}
      muted
      playsInline
      preload="auto"
      loop={!segmentLoop}
      onLoadedMetadata={(event) => {
        const video = event.currentTarget;
        const start = segmentLoop ? (videoLoopStart ?? 0) : 0;
        seekVideoPreviewFrame(video, start);
      }}
      onLoadedData={(event) => safeVideoPlay(event.currentTarget)}
      onTimeUpdate={
        segmentLoop
          ? (event) => {
              const video = event.currentTarget;
              const loopStart = videoLoopStart ?? 0;
              const loopEnd = videoLoopEnd ?? 3;
              if (video.currentTime >= loopEnd) {
                video.currentTime = loopStart;
                safeVideoPlay(video);
              }
            }
          : undefined
      }
    />
  );
}
