/**
 * HTMLMediaElement.play() returns a Promise that rejects with AbortError when the browser
 * interrupts playback (e.g. power-saving for background video). Swallowing avoids noisy runtime errors.
 */
export function safeVideoPlay(video: HTMLVideoElement) {
  void video.play().catch(() => {
    /* ignore */
  });
}
