"use client";

import Link from "next/link";
import { Archivo, Bodoni_Moda } from "next/font/google";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { safeVideoPlay } from "./lib/safeVideoPlay";

function useMediaMinLg() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => true
  );
}

const navFont = Archivo({
  weight: ["500", "600"],
  subsets: ["latin"],
});

const headlineFont = Bodoni_Moda({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

type GalleryProject = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  videoLoopStart?: number;
  videoLoopEnd?: number;
};

type CursorPosition = { x: number; y: number };
type TrailImage = { id: number; x: number; y: number; src: string; rotate: number };

const TRAIL_INTERVAL_MS = 50;
const TRAIL_MIN_DISTANCE_PX = 5;
const TRAIL_LIFETIME_MS = 700;
const TRAIL_MAX_VISIBLE = 11;

export default function Home() {
  const galleryProjects = useMemo<GalleryProject[]>(
    () => [
      {
        title: "Justworks: Every Business Starts Small",
        subtitle: "Brand awareness campaign bringing customer stories to life",
        image: "/images/EVERY%20BIZ/jw1.jpg",
        href: "/projects/justworks-every-business-starts-small",
      },
      {
        title: "Justworks: All-In-One Solution",
        subtitle: "Bridging the gap between the brand's products",
        image: "/images/ONE%20SOLUTION/bigvid2.mp4",
        href: "/projects/justworks-all-in-one-solution",
        videoLoopStart: 0,
        videoLoopEnd: 3,
      },
      {
        title: "Justworks: Run Your Business",
        subtitle: "Empowering all kinds of founders throughout the funnel",
        image: "/images/RYB/justworks_run_your_business%20(1080p).mp4",
        href: "/projects/justworks-run-your-business",
        videoLoopStart: 21,
        videoLoopEnd: 28,
      },
      {
        title: "Justworks: Small Business, Big Journey",
        subtitle: "The brand's takeover at South By Southwest",
        image: "/images/SXSW/sxsw1.png",
        href: "/projects/justworks-small-business-big-journey",
      },
      {
        title: "Clove: SOLO",
        subtitle: "The brand's most successful product collection launch",
        image: "/images/SOLO/solo.png",
        href: "/projects/clove-solo",
      },
      {
        title: "Clove: The Clara 1",
        subtitle: "The first sneaker collab in healthcare history",
        image: "/images/CLARA/intheair.png",
        href: "/projects/clove-the-clara-1",
      },
      {
        title: "Clove: 2.0",
        subtitle: "The rebrand everyone's been waiting for",
        image: "/images/clove%202.0/clove%202.mp4",
        href: "/projects/clove-2.0",
      },
      {
        title: "Clove: Product Launches",
        subtitle: "Leading copy and social strategy for over 50 product launches",
        image: "/images/clove/product%20launches/shoes.png",
        href: "/projects/clove-product-launches",
      },
    ],
    []
  );

  const imagePool = useMemo(
    () =>
      [
        "/images/EVERY BIZ/jw1.jpg",
        "/images/EVERY BIZ/jw2.gif",
        "/images/EVERY BIZ/jw3.png",
        "/images/EVERY BIZ/jw4.jpg",
        "/images/EVERY BIZ/jw5.jpg",
        "/images/EVERY BIZ/jw6.jpg",
        "/images/EVERY BIZ/jw7.png",
        "/images/EVERY BIZ/jw8.png",
        "/images/EVERY BIZ/jw9.png",
        "/images/EVERY BIZ/jw10.png",
        "/images/ONE SOLUTION/sm1.gif",
        "/images/ONE SOLUTION/sm3.gif",
        "/images/ONE SOLUTION/sm4.gif",
        "/images/ONE SOLUTION/sm5.gif",
        "/images/ONE SOLUTION/sm6.gif",
        "/images/ONE SOLUTION/sm9.webp",
        "/images/SXSW/sxsw1.png",
        "/images/SXSW/sxsw2.jpg",
        "/images/SXSW/sxsw3.jpg",
        "/images/SXSW/sxsw4.jpg",
        "/images/SXSW/sxss5.jpg",
        "/images/SXSW/sxsw6.jpg",
        "/images/SXSW/sxsw7.jpg",
        "/images/SXSW/sxsw8.jpg",
        "/images/SXSW/sxsw9.jpg",
      ].map((path) => encodeURI(path)),
    []
  );

  const typingPhrases = useMemo(
    () => [
      "is a copywriter in NYC",
      "leads copy for nationwide campaigns",
      "is a free verse poet",
      "loves Ocean Vuong and Claudia Rankine",
      "is the spreadsheet queen",
      "vibe coded this website",
      "was a florist in her past life",
    ],
    []
  );

  const channelTunnelItems = useMemo(
    () => [
      { label: "Video", image: "/images/clove%202.0/clove3.mp4" },
      { label: "Out of home", image: "/images/EVERY%20BIZ/ooh.mp4" },
      { label: "Paid media", image: "/images/clove%202.0/paid.png" },
      { label: "Events", image: "/images/SXSW/sxsw8.jpg" },
      { label: "Website", image: "/images/ONE%20SOLUTION/sm1.gif" },
    ],
    []
  );

  const channelTetrisSlots = useMemo(
    () => [
      { x: 31, y: 29, w: 62, h: 58 },
      { x: 81, y: 16, w: 38, h: 32 },
      { x: 81, y: 45, w: 38, h: 26 },
      { x: 23, y: 79, w: 46, h: 42 },
      { x: 73, y: 79, w: 54, h: 42 },
    ],
    []
  );

  const channelTetrisSpawns = useMemo(
    () => [
      { x: 18, y: 20 },
      { x: 84, y: 22 },
      { x: 20, y: 82 },
      { x: 82, y: 78 },
      { x: 50, y: 12 },
    ],
    []
  );

  const companyLogos = useMemo(
    () => [
      { name: "Teladoc Health", src: "/images/logos/teladochealth-logo-plum-aqua-rgb.png" },
      { name: "Justworks", src: "/images/logos/JW%20Header.avif" },
      { name: "Clove", src: "/images/logos/logo-black.png" },
    ],
    []
  );

  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [trailImages, setTrailImages] = useState<TrailImage[]>([]);
  const [storyStyle, setStoryStyle] = useState<CSSProperties>({
    opacity: 1,
    transform: "translateY(0px)",
  });
  const [storyHighlightProgress, setStoryHighlightProgress] = useState(0);
  const [activeLogoIndex, setActiveLogoIndex] = useState(0);
  const [channelTunnelProgress, setChannelTunnelProgress] = useState(0);
  const isLg = useMediaMinLg();
  const channelTunnelEffectiveProgress = isLg ? channelTunnelProgress : 1;
  const [carouselFocus, setCarouselFocus] = useState<Record<number, number>>({});
  const [carouselScrollLeft, setCarouselScrollLeft] = useState(0);

  const lastPointRef = useRef<CursorPosition | null>(null);
  const lastEmitRef = useRef(0);
  const trailIdRef = useRef(0);
  const channelTunnelProgressRef = useRef(0);
  const channelTunnelSectionRef = useRef<HTMLElement | null>(null);
  const storySectionRef = useRef<HTMLElement | null>(null);
  const carouselSectionRef = useRef<HTMLElement | null>(null);
  const carouselTrackRef = useRef<HTMLDivElement | null>(null);
  const carouselCardRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    channelTunnelProgressRef.current = isLg ? channelTunnelProgress : 1;
  }, [channelTunnelProgress, isLg]);

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    const isComplete = typedText === currentPhrase;
    const isEmpty = typedText.length === 0;

    if (isComplete && !isDeleting) {
      const timer = window.setTimeout(() => setIsDeleting(true), 1000);
      return () => window.clearTimeout(timer);
    }

    if (isEmpty && isDeleting) {
      const timer = window.setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((idx) => (idx + 1) % typingPhrases.length);
      }, 220);
      return () => window.clearTimeout(timer);
    }

    const timeout = window.setTimeout(() => {
      setTypedText((current) =>
        isDeleting
          ? current.slice(0, Math.max(0, current.length - 1))
          : currentPhrase.slice(0, current.length + 1)
      );
    }, isDeleting ? 45 : 70);

    return () => window.clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex, typingPhrases]);

  const pickRandomImage = () => imagePool[Math.floor(Math.random() * imagePool.length)];

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!hovering) return;

    const point = { x: event.clientX, y: event.clientY };
    const now = Date.now();
    const last = lastPointRef.current;
    const distance = last
      ? Math.hypot(point.x - last.x, point.y - last.y)
      : Number.POSITIVE_INFINITY;

    if (now - lastEmitRef.current < TRAIL_INTERVAL_MS || distance < TRAIL_MIN_DISTANCE_PX) {
      return;
    }

    const id = trailIdRef.current++;
    const nextImage: TrailImage = {
      id,
      x: point.x,
      y: point.y,
      src: pickRandomImage(),
      rotate: Math.random() * 1.2 - 0.6,
    };

    setTrailImages((previous) => [...previous.slice(-TRAIL_MAX_VISIBLE), nextImage]);

    window.setTimeout(() => {
      setTrailImages((previous) => previous.filter((item) => item.id !== id));
    }, TRAIL_LIFETIME_MS);

    lastEmitRef.current = now;
    lastPointRef.current = point;
  };

  const handlePointerEnterPage = (event: React.PointerEvent<HTMLElement>) => {
    setHovering(true);
    lastPointRef.current = { x: event.clientX, y: event.clientY };
    lastEmitRef.current = Date.now();
  };

  const handlePointerLeavePage = () => {
    setHovering(false);
    lastPointRef.current = null;
  };

  useEffect(() => {
    let rafId = 0;

    const updateStory = () => {
      const section = storySectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const enterRaw = (viewportHeight - rect.top) / viewportHeight;
      const enter = Math.min(1, Math.max(0, enterRaw));
      const enterEased = enter * enter * (3 - 2 * enter);
      const centerPassed = viewportHeight / 2 - (rect.top + rect.height / 2);
      const moveRaw = centerPassed / Math.max(1, rect.height * 0.85);
      const move = Math.min(1, Math.max(0, moveRaw));
      const moveEased = move * move * (3 - 2 * move);
      const highlightRaw = (viewportHeight - rect.top) / (viewportHeight * 0.88);
      const highlightClamped = Math.min(1, Math.max(0, highlightRaw));
      const highlightEased =
        highlightClamped * highlightClamped * (3 - 2 * highlightClamped);

      setStoryStyle({
        opacity: 1,
        transform: `translateY(${(1 - enterEased) * 140 - moveEased * 150}px)`,
      });
      setStoryHighlightProgress(highlightEased);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateStory();
        rafId = 0;
      });
    };

    updateStory();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const getStoryHighlightStyle = (): CSSProperties => {
    const fill = Math.min(1, Math.max(0, storyHighlightProgress));
    return {
      backgroundImage:
        "linear-gradient(180deg, rgba(219,255,162,0.96) 0%, rgba(152,252,122,0.98) 55%, rgba(96,228,96,0.98) 100%)",
      backgroundRepeat: "no-repeat",
      backgroundSize: `${fill * 100}% 100%`,
      transition: "background-size 160ms ease-out",
      paddingInline: "0.07em",
      paddingBlock: "0.03em",
      borderRadius: "0.2em",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.78), inset 0 -2px 0 rgba(68,170,60,0.28), 0 2px 8px rgba(136,236,120,0.3)",
    };
  };

  useEffect(() => {
    const syncBoundaryProgress = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const section = channelTunnelSectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.top > vh * 0.55 && channelTunnelProgressRef.current !== 0) {
        setChannelTunnelProgress(0);
      } else if (rect.bottom < vh * 0.45 && channelTunnelProgressRef.current !== 1) {
        setChannelTunnelProgress(1);
      }
    };

    syncBoundaryProgress();
    window.addEventListener("scroll", syncBoundaryProgress, { passive: true });
    window.addEventListener("resize", syncBoundaryProgress);

    return () => {
      window.removeEventListener("scroll", syncBoundaryProgress);
      window.removeEventListener("resize", syncBoundaryProgress);
    };
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const section = channelTunnelSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const pinned = rect.top <= vh * 0.18 && rect.bottom >= vh * 0.82;
      if (!pinned) return;

      const current = channelTunnelProgressRef.current;
      const delta = event.deltaY;
      const shouldCapture = (delta > 0 && current < 1) || (delta < 0 && current > 0);
      if (!shouldCapture) return;

      event.preventDefault();
      const next = Math.min(1, Math.max(0, current + delta * 0.0022));
      setChannelTunnelProgress(next);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track) return;
    let rafId = 0;

    const updateFocus = () => {
      const trackRect = track.getBoundingClientRect();
      const centerX = trackRect.left + trackRect.width / 2;
      const next: Record<number, number> = {};

      carouselCardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - centerX);
        const normalized = Math.max(0, 1 - distance / (trackRect.width * 0.6));
        const eased = normalized * normalized * (3 - 2 * normalized);
        next[index] = eased;
      });

      setCarouselFocus(next);
      setCarouselScrollLeft(track.scrollLeft);
    };

    const onMove = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateFocus();
        rafId = 0;
      });
    };

    updateFocus();
    track.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      track.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
    };
  }, [galleryProjects.length]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const section = carouselSectionRef.current;
      const track = carouselTrackRef.current;
      if (!section || !track) return;

      const sectionRect = section.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionOnScreen = sectionRect.top < vh && sectionRect.bottom > 0;
      const trackFullyVisible = trackRect.top >= 0 && trackRect.bottom <= vh;
      if (!sectionOnScreen || !trackFullyVisible) return;

      const horizontalRange = track.scrollWidth - track.clientWidth;
      if (horizontalRange <= 0) return;

      const verticalIntent = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
      if (!verticalIntent) return;

      const atStart = track.scrollLeft <= 0;
      const atEnd = track.scrollLeft >= horizontalRange - 1;
      const towardStart = event.deltaY < 0;
      const towardEnd = event.deltaY > 0;

      // Let page scroll continue naturally once carousel hits edges.
      if ((atStart && towardStart) || (atEnd && towardEnd)) return;

      event.preventDefault();
      const next = track.scrollLeft + event.deltaY;
      track.scrollLeft = Math.max(0, Math.min(horizontalRange, next));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveLogoIndex((prev) => (prev + 1) % companyLogos.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [companyLogos.length]);

  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden bg-white text-[#0047ff]"
      onPointerEnter={handlePointerEnterPage}
      onPointerLeave={handlePointerLeavePage}
      onPointerMove={handlePointerMove}
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="ombre-spot ombre-spot-pink ombre-drift-one" />
        <div className="ombre-spot ombre-spot-pink-soft ombre-drift-two" />
        <div className="ombre-spot ombre-spot-orange ombre-drift-four" />
        <div className="ombre-spot ombre-spot-orange-soft ombre-drift-five" />
      </div>

      {trailImages.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt=""
          aria-hidden="true"
          className="trail-image"
          style={{
            left: `${image.x}px`,
            top: `${image.y}px`,
            transform: `translate(-50%, -50%) rotate(${image.rotate}deg)`,
          }}
        />
      ))}

      <header
        className={`fixed left-0 top-0 z-50 w-full border-b-0 bg-transparent pt-[calc(env(safe-area-inset-top)+24px)] text-base tracking-wide backdrop-blur-none md:pt-[env(safe-area-inset-top)] md:text-lg ${navFont.className}`}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 pb-2 pt-0 md:max-w-none md:flex-row md:items-start md:justify-between md:gap-4 md:px-5 md:py-3">
          <div className="flex w-full justify-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:w-auto md:justify-start md:overflow-visible [&::-webkit-scrollbar]:hidden">
            <Link
              href="/"
              className="inline-flex max-w-none min-w-0 flex-row flex-nowrap items-center justify-center gap-1.5 whitespace-nowrap normal-case text-[#0047ff] md:justify-start md:gap-2"
            >
              <span className="shrink-0 text-base font-extrabold leading-snug md:text-lg md:leading-normal">
                Joanne
              </span>
              <span className="text-base font-medium leading-snug tracking-wide text-[#0047ff]/90 md:text-lg md:leading-normal">
                {typedText}
                <span className="inline animate-pulse">|</span>
              </span>
            </Link>
          </div>

          <nav aria-label="Primary" className="w-full md:w-auto md:shrink-0">
            <ul className="grid w-full list-none grid-cols-2 gap-1.5 p-0 uppercase md:flex md:w-auto md:items-center md:justify-end md:gap-6">
              <li className="min-w-0">
                <Link
                  href="/about"
                  className="flex min-h-[34px] w-full items-center justify-center rounded-full border border-white/60 bg-white/25 px-1.5 py-1 text-center text-[0.65rem] font-medium uppercase leading-tight tracking-wide shadow-[0_8px_24px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,71,255,0.2)] backdrop-blur-xl sm:min-h-[38px] sm:px-2 sm:text-xs md:min-h-0 md:w-auto md:px-3.5 md:py-1.5 md:text-base"
                >
                  about
                </Link>
              </li>
              <li className="min-w-0">
                <Link
                  href="/projects"
                  className="flex min-h-[34px] w-full items-center justify-center rounded-full border border-white/60 bg-white/25 px-1.5 py-1 text-center text-[0.65rem] font-medium uppercase leading-tight tracking-wide shadow-[0_8px_24px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,71,255,0.2)] backdrop-blur-xl sm:min-h-[38px] sm:px-2 sm:text-xs md:min-h-0 md:w-auto md:px-3.5 md:py-1.5 md:text-base"
                >
                  projects
                </Link>
              </li>
              <li className="min-w-0">
                <Link
                  href="/channels"
                  className="flex min-h-[34px] w-full items-center justify-center rounded-full border border-white/60 bg-white/25 px-1.5 py-1 text-center text-[0.65rem] font-medium uppercase leading-tight tracking-wide shadow-[0_8px_24px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,71,255,0.2)] backdrop-blur-xl sm:min-h-[38px] sm:px-2 sm:text-xs md:min-h-0 md:w-auto md:px-3.5 md:py-1.5 md:text-base"
                >
                  channels
                </Link>
              </li>
              <li className="min-w-0">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=johwangbo@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[34px] w-full items-center justify-center rounded-full border border-white/60 bg-white/25 px-1.5 py-1 text-center text-[0.65rem] font-medium uppercase leading-tight tracking-wide shadow-[0_8px_24px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,71,255,0.2)] backdrop-blur-xl sm:min-h-[38px] sm:px-2 sm:text-xs md:min-h-0 md:w-auto md:px-3.5 md:py-1.5 md:text-base"
                >
                  contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="relative z-40 mt-[9.5rem] min-h-[90vh] w-full pb-8 md:mt-24">
        <section className="flex h-[76vh] w-full items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/5 px-4 pt-10 sm:px-6 md:px-10 md:pt-14">
          <h1
            className={`mx-auto w-full min-w-0 max-w-full break-words text-balance text-center text-[clamp(1.45rem,5.2vw+0.65rem,7.2rem)] font-semibold uppercase leading-[0.92] tracking-[0.01em] text-[#0047ff] [overflow-wrap:anywhere] sm:text-[clamp(1.85rem,6vw+0.5rem,7.2rem)] sm:leading-[0.88] md:text-[clamp(2.5rem,7vw,7.2rem)] md:leading-[0.86] ${headlineFont.className}`}
          >
            <span className="block md:whitespace-nowrap">copywriter,</span>
            <span className="mt-[0.02em] flex flex-wrap items-center justify-center gap-x-[0.12em] gap-y-1 text-[0.9em] tracking-[0.005em] md:mt-[0.02em] md:block md:whitespace-nowrap md:gap-x-0 md:gap-y-0">
              <span className="inline">visual</span>
              <span className="mx-[0.06em] inline-flex h-[0.84em] min-h-[1em] w-[1.2em] min-w-[1.2em] shrink-0 overflow-hidden rounded-[0.08em] align-[-0.08em] sm:mx-[0.12em]">
                <img
                  src="/images/EVERY%20BIZ/jw2.gif"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="inline">storyteller,</span>
            </span>
            <span className="mt-[0.02em] block md:whitespace-nowrap">&amp; killer poet</span>
          </h1>
        </section>
      </section>

      <section
        ref={channelTunnelSectionRef}
        className={`relative z-40 w-full ${isLg ? "" : "h-auto py-10"}`}
        style={isLg ? { height: "100vh" } : undefined}
      >
        <div
          className={`flex w-full items-center justify-center overflow-hidden ${
            isLg ? "sticky top-0 h-screen" : "relative min-h-0 py-4"
          }`}
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-20 text-[#0047ff]/70 ${headlineFont.className}`}
          >
            <span className="absolute left-4 top-6 text-[clamp(2.8rem,10vw,8rem)] font-semibold leading-none md:left-10 md:top-8">
              writing
            </span>
            <span className="absolute bottom-6 right-5 text-[clamp(2.8rem,9vw,7rem)] font-semibold italic leading-none md:bottom-8 md:right-10">
              for
            </span>
          </div>
          <div
            className={`relative h-[min(72vh,680px)] w-[min(78vw,760px)] ${
              isLg ? "translate-y-[4vh] md:translate-y-[3vh]" : "translate-y-0"
            }`}
          >
            {channelTunnelItems.map((item, index) => {
              const slot = channelTetrisSlots[index];
              const spawn = channelTetrisSpawns[index];
              if (!slot || !spawn) return null;
              const isVideo = item.image.toLowerCase().endsWith(".mp4");

              const sequence = channelTunnelEffectiveProgress * channelTunnelItems.length;
              const cardProgress = Math.min(1, Math.max(0, sequence - index));
              const inPlay = cardProgress > 0 || index <= Math.floor(sequence);
              if (!inPlay) return null;

              const appearPhase = Math.min(1, cardProgress / 0.24);
              const mergePhase =
                cardProgress <= 0.24 ? 0 : Math.min(1, (cardProgress - 0.24) / 0.76);

              const x = spawn.x + (slot.x - spawn.x) * mergePhase;
              const y = spawn.y + (slot.y - spawn.y) * mergePhase;
              const width = 12 + (slot.w - 12) * mergePhase;
              const height = 12 + (slot.h - 12) * mergePhase;
              const scale = 0.72 + appearPhase * 0.28;
              const opacity = Math.min(1, cardProgress / 0.12);

              return (
                <div
                  key={item.label}
                  className="absolute overflow-hidden rounded-xl border border-white/40 bg-white/5"
                  style={{
                    opacity,
                    zIndex: 70 + index,
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${width}%`,
                    height: `${height}%`,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transformOrigin: "center center",
                  }}
                >
                  {isVideo ? (
                    <video
                      src={item.image}
                      aria-label={item.label}
                      className="h-full w-full object-cover shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedData={(event) => safeVideoPlay(event.currentTarget)}
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="h-full w-full object-cover shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
                      style={{
                        transition: "transform 100ms linear, opacity 120ms linear",
                      }}
                    />
                  )}
                  <p className="pointer-events-none absolute bottom-2 left-1/2 z-10 inline-flex max-w-[calc(100%-0.75rem)] -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-full bg-black/68 px-[0.55em] py-[0.35em] text-[0.65rem] font-bold uppercase leading-none tracking-[0.06em] text-white sm:text-[0.68rem] md:bottom-3 md:px-[0.65em] md:py-[0.4em] md:text-sm md:tracking-[0.1em]">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        ref={storySectionRef}
        className="relative z-40 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 md:grid-cols-[minmax(0,1fr)_320px] md:px-10 lg:px-16">
          <div className="mr-auto w-full max-w-3xl">
            <div
              id="story-text-panel"
              style={storyStyle}
              className="relative z-30 p-5 text-left text-lg leading-[1.42] text-[#0047ff] will-change-transform md:p-8 md:text-2xl"
            >
              <p>
                At{" "}
                <a
                  href="https://www.teladochealth.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold"
                >
                  Teladoc Health
                </a>
                , I lead B2C copy to drive a 47% lift in brand awareness, the{" "}
                <span style={getStoryHighlightStyle()}>
                  highest in company history.
                </span>
              </p>
              <p className="mt-3">
                Before that, I launched{" "}
                <a
                  href="https://www.justworks.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold"
                >
                  Justworks
                </a>
                &apos; first nationwide brand campaign built on{" "}
                <span style={getStoryHighlightStyle()}>
                  real customer stories.
                </span>
                {" "}At{" "}
                <a
                  href="https://goclove.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold"
                >
                  Clove
                </a>
                , I managed the Social Media and Editorial team to make the brand become the{" "}
                <span style={getStoryHighlightStyle()}>
                  #1 sneaker in healthcare
                </span>
                {" "}and go viral with over 9.2 million impressions.
              </p>
            </div>
          </div>

          <div className="relative hidden md:block md:translate-x-16 md:self-center">
            <div className="relative h-[236px] w-[236px]">
              {companyLogos.map((logo, index) => (
                <div
                  key={logo.name}
                  className="absolute inset-0 rounded-2xl border border-[#0047ff]/20 bg-white p-5 shadow-[0_18px_30px_rgba(0,71,255,0.14)] transition-opacity duration-700 ease-in-out"
                  style={{ opacity: activeLogoIndex === index ? 1 : 0 }}
                >
                  <img src={logo.src} alt={logo.name} className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={carouselSectionRef} className="relative z-50 w-full overflow-hidden bg-transparent pb-24">
        <div className="px-3 pt-20 md:px-6 lg:pt-24">
          <div className="mb-2 flex justify-end lg:hidden">
            <span
              className={`inline-flex items-center gap-[8px] text-sm font-medium tracking-wide text-[#0047ff] ${navFont.className}`}
              aria-label="Scroll horizontally to browse projects"
            >
              <span>Scroll</span>
              <span aria-hidden className="select-none">
                →
              </span>
            </span>
          </div>
        </div>
        <div
          ref={carouselTrackRef}
          className="scroll-px-3 overflow-x-auto overscroll-x-contain px-3 pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:px-6 md:scroll-px-6"
        >
          <div className="flex w-max min-w-full snap-x snap-mandatory gap-4 scroll-smooth md:gap-6">
            <div aria-hidden="true" className="shrink-0 max-lg:w-0 lg:w-[44vw]" />
            {galleryProjects.map((project, index) => {
              const carouselStatic = !isLg;
              const focusedByScroll = carouselFocus[index] ?? 0;
              const revealRaw = (focusedByScroll - 0.12) / 0.88;
              const baseReveal = Math.min(1, Math.max(0, revealRaw));
              const firstCardGate =
                index === 0 && isLg
                  ? Math.min(1, Math.max(0, (carouselScrollLeft - 40) / 180))
                  : 1;
              const reveal = carouselStatic ? 1 : baseReveal * firstCardGate;
              const isSoloCard = project.title === "Clove: SOLO";
              const isCoastCard = project.title === "Clove: 2.0";
              const isClaraCard = project.title === "Clove: The Clara 1";
              const textRevealRaw = (reveal - 0.62) / 0.28;
              const textRevealClamped = Math.min(1, Math.max(0, textRevealRaw));
              const textReveal = carouselStatic
                ? 1
                : textRevealClamped * textRevealClamped * (3 - 2 * textRevealClamped);
              const imageLift = carouselStatic ? 0 : 78 * reveal;
              const textLiftIntoGap = carouselStatic ? 0 : 70 * textReveal;
              const mediaBrightness = carouselStatic
                ? 0.9
                : 0.5 + focusedByScroll * 0.4;
              const isVideo = project.image.toLowerCase().endsWith(".mp4");

              return (
                <Link
                  key={project.title}
                  ref={(element) => {
                    carouselCardRefs.current[index] = element;
                  }}
                  href={project.href}
                  className="group relative w-[calc(100vw-1.5rem)] shrink-0 snap-start overflow-visible lg:w-[47vw] lg:snap-center"
                  style={{
                    animationDelay: `${index * 80}ms`,
                    scrollSnapStop: "always",
                  }}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-white/35 bg-white shadow-[0_14px_36px_rgba(255,90,0,0.2)] ${isLg ? "will-change-transform" : ""}`}
                    style={{
                      transform: `translateY(${-imageLift}px)`,
                      transition: isLg ? "transform 280ms ease-out" : "none",
                    }}
                  >
                    {isVideo ? (
                      <video
                        src={project.image}
                        aria-label={project.title}
                        muted
                        playsInline
                        preload="metadata"
                        className="aspect-[16/10] h-full w-full rounded-t-2xl object-cover transition duration-300 ease-out"
                        style={{
                          filter: `brightness(${mediaBrightness})`,
                        }}
                        onLoadedMetadata={(event) => {
                          const video = event.currentTarget;
                          const loopStart = project.videoLoopStart ?? 0;
                          video.currentTime = loopStart;
                        }}
                        onLoadedData={(event) => safeVideoPlay(event.currentTarget)}
                        onTimeUpdate={(event) => {
                          const video = event.currentTarget;
                          const loopStart = project.videoLoopStart ?? 0;
                          const loopEnd = project.videoLoopEnd ?? 3;
                          if (video.currentTime >= loopEnd) {
                            video.currentTime = loopStart;
                            safeVideoPlay(video);
                          }
                        }}
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="aspect-[16/10] h-full w-full rounded-t-2xl object-cover transition duration-300 ease-out"
                        style={{
                          filter: `brightness(${mediaBrightness})`,
                          objectPosition: isSoloCard
                            ? "82% center"
                            : isCoastCard
                              ? "center 18%"
                              : isClaraCard
                                ? "center 58%"
                              : "center",
                        }}
                      />
                    )}
                    <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  </div>
                  <div
                    className="min-h-[112px] px-1 pt-4 md:min-h-[124px] md:px-2 md:pt-5"
                    style={{
                      opacity: textReveal,
                      transform: `translateY(${(1 - textReveal) * 34 - textLiftIntoGap}px)`,
                      transition: isLg
                        ? "opacity 280ms ease-out, transform 280ms ease-out"
                        : "none",
                    }}
                  >
                    <h3 className={`text-xl font-bold text-[#0047ff] md:text-3xl ${headlineFont.className}`}>
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#0047ff]/85 md:text-base">
                      {project.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
            <div aria-hidden="true" className="shrink-0 max-lg:w-0 lg:w-[44vw]" />
          </div>
        </div>
      </section>
    </main>
  );
}
