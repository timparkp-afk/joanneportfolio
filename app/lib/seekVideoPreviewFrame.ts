/**
 * Mobile Safari often shows a black video until a frame is decoded after metadata.
 * Seeking to a small offset (or loop segment start) forces a drawable frame for thumbnails.
 */
export function seekVideoPreviewFrame(
  video: HTMLVideoElement,
  preferredTimeSeconds?: number
) {
  let t = 0.001;
  if (typeof preferredTimeSeconds === "number" && Number.isFinite(preferredTimeSeconds)) {
    t = preferredTimeSeconds > 0 ? preferredTimeSeconds : 0.001;
  }
  try {
    const d = video.duration;
    if (Number.isFinite(d) && d > 0) {
      if (t >= d - 0.05) {
        video.currentTime = Math.max(0.001, d - 0.1);
        return;
      }
    }
    video.currentTime = t;
  } catch {
    /* ignore */
  }
}
