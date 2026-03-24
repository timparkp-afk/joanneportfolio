"use client";

import { useEffect, useRef, useState } from "react";

type ScrollPanImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function ScrollPanImage({ src, alt, className = "" }: ScrollPanImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updatePan = () => {
      const container = containerRef.current;
      const image = imageRef.current;
      if (!container || !image) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progressRaw = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const progress = Math.max(0, Math.min(1, progressRaw));

      // Move left -> right -> left while section is scrolled through.
      const swing = Math.sin(progress * Math.PI);
      const overflow = Math.max(0, image.scrollWidth - container.clientWidth);
      setTranslateX(-overflow * swing);
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updatePan();
        rafId = 0;
      });
    };

    updatePan();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="h-full w-[140%] max-w-none object-cover transition-transform duration-150 ease-out"
        style={{ transform: `translateX(${translateX}px)` }}
      />
    </div>
  );
}
