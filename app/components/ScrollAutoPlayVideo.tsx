"use client";

import { useEffect, useRef } from "react";

type ScrollAutoPlayVideoProps = {
  src: string;
  className?: string;
  ariaLabel?: string;
};

export default function ScrollAutoPlayVideo({
  src,
  className = "",
  ariaLabel = "Project video",
}: ScrollAutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!video) return;
          if (entry.isIntersecting) {
            void video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      aria-label={ariaLabel}
      muted
      playsInline
      loop
      preload="metadata"
    />
  );
}
