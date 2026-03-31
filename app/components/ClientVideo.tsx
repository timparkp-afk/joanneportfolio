"use client";

import type { VideoHTMLAttributes } from "react";
import { seekVideoPreviewFrame } from "../lib/seekVideoPreviewFrame";

type ClientVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  /** Seconds to seek for a static preview frame (default: tiny offset for iOS). */
  previewAt?: number;
};

/**
 * Server pages can’t attach onLoadedMetadata; use this for hero / inline videos
 * so mobile Safari shows a thumbnail before the user taps play.
 */
export default function ClientVideo({
  previewAt,
  onLoadedMetadata,
  preload = "auto",
  ...rest
}: ClientVideoProps) {
  return (
    <video
      {...rest}
      preload={preload}
      playsInline
      onLoadedMetadata={(e) => {
        onLoadedMetadata?.(e);
        seekVideoPreviewFrame(e.currentTarget, previewAt);
      }}
    />
  );
}
