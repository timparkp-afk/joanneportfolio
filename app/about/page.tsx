"use client";

import Image from "next/image";
import { safeVideoPlay } from "../lib/safeVideoPlay";
import { seekVideoPreviewFrame } from "../lib/seekVideoPreviewFrame";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Archivo, Bodoni_Moda } from "next/font/google";
import SiteNav from "../components/SiteNav";

type GalleryProject = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  videoLoopStart?: number;
  videoLoopEnd?: number;
};

const heroSans = Archivo({
  weight: ["700"],
  subsets: ["latin"],
});

const accentSerif = Bodoni_Moda({
  weight: ["500", "700"],
  subsets: ["latin"],
});

const headlineFont = Bodoni_Moda({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export default function AboutPage() {
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

  const [scrollY, setScrollY] = useState(0);
  const [storyPhraseFill, setStoryPhraseFill] = useState(0);
  const [storyOutroFill, setStoryOutroFill] = useState(0);
  const [carouselFocus, setCarouselFocus] = useState<Record<number, number>>({});
  const [carouselScrollLeft, setCarouselScrollLeft] = useState(0);
  const [isLg, setIsLg] = useState(false);
  const storyPhraseRef = useRef<HTMLSpanElement | null>(null);
  const storyOutroRef = useRef<HTMLSpanElement | null>(null);
  const carouselSectionRef = useRef<HTMLElement | null>(null);
  const carouselTrackRef = useRef<HTMLDivElement | null>(null);
  const carouselCardRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY || 0);
      const phraseTop = storyPhraseRef.current?.getBoundingClientRect().top;
      if (typeof phraseTop === "number") {
        const vh = window.innerHeight;
        const fillRaw = (vh * 0.94 - phraseTop) / (vh * 0.54);
        const fill = Math.max(0, Math.min(1, fillRaw));
        setStoryPhraseFill(fill);
      }
      const outroTop = storyOutroRef.current?.getBoundingClientRect().top;
      if (typeof outroTop === "number") {
        const vh = window.innerHeight;
        const fillRaw = (vh * 0.96 - outroTop) / (vh * 0.42);
        const fill = Math.max(0, Math.min(1, fillRaw));
        setStoryOutroFill(fill);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
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
      if ((atStart && towardStart) || (atEnd && towardEnd)) return;

      event.preventDefault();
      const next = track.scrollLeft + event.deltaY;
      track.scrollLeft = Math.max(0, Math.min(horizontalRange, next));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const imageParallax = Math.max(-32, Math.min(36, scrollY * 0.08));
  const textParallax = Math.max(-18, Math.min(22, scrollY * 0.05));
  const labelFloat = Math.max(0, Math.min(1, scrollY / 420));
  const introExitProgress = Math.max(0, Math.min(1, scrollY / 560));
  const introOpacity = 1 - introExitProgress;
  const joanneTravelProgress = Math.max(0, Math.min(1.35, (scrollY - 20) / 560));
  const spotDepth = Math.max(0, Math.min(1, scrollY / 900));
  const spotSaturation = 1 + spotDepth * 1.45;
  const spotBrightness = 1 + spotDepth * 0.08;
  const spotContrast = 1 + spotDepth * 0.12;
  const spotOpacity = 0.92 + spotDepth * 0.08;
  const colorFloodOpacity = spotDepth * 0.96;
  const storyEmojiReveal = Math.max(0, Math.min(1, (storyOutroFill - 0.62) / 0.38));

  const portraitFrameStyle = {
    opacity: introOpacity,
    transform: `translate3d(0, ${imageParallax - introExitProgress * 64}px, 0) scale(${1 - introExitProgress * 0.05})`,
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white px-4 pb-8 pt-[9.5rem] text-[#0047ff] md:px-8 md:pt-24">
      <SiteNav />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          filter: `saturate(${spotSaturation}) brightness(${spotBrightness}) contrast(${spotContrast})`,
          opacity: spotOpacity,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: colorFloodOpacity,
            background:
              "radial-gradient(circle at 16% 16%, rgba(255, 190, 232, 0.98) 0%, rgba(255, 190, 232, 0) 48%), radial-gradient(circle at 82% 18%, rgba(255, 214, 240, 0.95) 0%, rgba(255, 214, 240, 0) 44%), radial-gradient(circle at 30% 72%, rgba(240, 255, 132, 0.96) 0%, rgba(240, 255, 132, 0) 50%), radial-gradient(circle at 82% 82%, rgba(250, 255, 170, 0.95) 0%, rgba(250, 255, 170, 0) 46%), linear-gradient(140deg, rgba(255, 204, 238, 0.7) 0%, rgba(246, 255, 165, 0.78) 55%, rgba(255, 214, 241, 0.72) 100%)",
          }}
        />
        <div className="ombre-spot ombre-spot-pink ombre-drift-one" />
        <div className="ombre-spot ombre-spot-pink-soft ombre-drift-two" />
        <div className="ombre-spot ombre-spot-orange ombre-drift-four" />
        <div className="ombre-spot ombre-spot-orange-soft ombre-drift-five" />
      </div>

      <div className="relative z-10 mx-auto mt-16 grid w-full max-w-[1500px] grid-cols-1 gap-8 md:mt-20 lg:min-h-[92vh] lg:grid-cols-[43%_57%]">
        <section className="hidden flex-col justify-start lg:flex lg:order-1 lg:min-h-[86vh] lg:self-start">
          <div
            className="relative aspect-square w-[72%] max-w-[420px] overflow-hidden border border-[#0047ff]/22 bg-white/78 shadow-[0_28px_52px_rgba(0,71,255,0.18)] backdrop-blur-sm md:w-[68%] lg:mt-36"
            style={portraitFrameStyle}
          >
            <Image
              src="/images/me.png"
              alt="Portrait"
              width={960}
              height={1200}
              className="h-full w-full object-cover object-center"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_40%)]" />
          </div>
          <div className={`mt-3 flex items-center text-[11px] uppercase tracking-[0.18em] md:text-xs ${accentSerif.className}`}>
            <span className="about-float-label" style={{ transform: `translateY(${-10 + labelFloat * 10}px)` }}>
              Based in New York City
            </span>
          </div>
        </section>

        <section className="flex flex-col justify-center lg:order-2">
          <div style={{ transform: `translate3d(0, ${textParallax}px, 0)` }}>
            <div className="min-w-0">
            <p
              className={`about-headline-line about-headline-line-1 ml-0 max-w-full text-[clamp(2.8rem,9.6vw,9.6rem)] font-bold leading-[0.88] tracking-[-0.035em] lg:-ml-36 ${heroSans.className}`}
              style={{
                opacity: introOpacity,
                transform: `translate3d(0, ${-introExitProgress * 40}px, 0)`,
              }}
            >
              Hi! Welcome home.
            </p>
            <p
              className={`about-headline-line about-headline-line-2 mt-6 ml-0 w-full text-left text-[clamp(2.8rem,9.6vw,9.6rem)] font-bold leading-[0.88] tracking-[-0.035em] lg:mt-10 lg:ml-auto lg:w-fit lg:text-right lg:pr-12 ${heroSans.className}`}
              style={{
                opacity: introOpacity,
                transform: `translate3d(0, ${-introExitProgress * 34}px, 0)`,
              }}
            >
              It&apos;s me,
            </p>
            <p
              className={`about-headline-line mt-4 ml-0 w-full text-left text-[clamp(2.8rem,9.6vw,9.6rem)] font-bold leading-[0.88] tracking-[-0.035em] lg:ml-auto lg:w-fit lg:text-right lg:pr-12 lg:text-[clamp(3.2rem,10.8vw,11rem)] lg:leading-[0.86] lg:tracking-[-0.04em] lg:sticky lg:top-28 ${heroSans.className}`}
              style={{
                transform: isLg
                  ? `translate3d(${-96 * joanneTravelProgress}vw, 0, 0)`
                  : undefined,
              }}
            >
              Joanne.
            </p>
            </div>

            <div className="mt-8 w-full min-w-0 lg:hidden">
              <div
                className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden border border-[#0047ff]/22 bg-white/78 shadow-[0_28px_52px_rgba(0,71,255,0.18)] backdrop-blur-sm"
                style={portraitFrameStyle}
              >
                <Image
                  src="/images/me.png"
                  alt=""
                  width={960}
                  height={1200}
                  className="h-full w-full object-cover object-center"
                  aria-hidden
                  role="presentation"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_40%)]" />
              </div>
              <div className={`mt-3 flex items-center text-[11px] uppercase tracking-[0.18em] md:text-xs ${accentSerif.className}`}>
                <span className="about-float-label" style={{ transform: `translateY(${-10 + labelFloat * 10}px)` }}>
                  Based in New York City
                </span>
              </div>
            </div>

            <div className="mt-12 max-w-2xl pt-2 md:mt-20 md:pt-8">
              <p className={`about-headline-line about-headline-line-3 mt-2 max-w-3xl text-[clamp(1.35rem,3.2vw,2.4rem)] font-bold leading-[1.2] tracking-[-0.02em] ${heroSans.className}`}>
                My writing is personal and concise.
              </p>
              <p className={`about-headline-line about-headline-line-4 mt-16 max-w-3xl text-[clamp(1.35rem,3.2vw,2.4rem)] font-bold leading-[1.34] tracking-[-0.02em] ${heroSans.className}`}>
                I innovate with brands by bringing their{" "}
                <span
                  ref={storyPhraseRef}
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #ff7ee6 0%, #ff7ee6 100%), linear-gradient(90deg, #0047ff 0%, #0047ff 100%)",
                    backgroundSize: `${storyPhraseFill * 100}% 100%, 100% 100%`,
                    backgroundRepeat: "no-repeat",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    transition: "background-size 120ms linear",
                  }}
                >
                  unique storytelling opportunities
                </span>{" "}
                to life, <br />
                breaking <br />
                <span className="inline-block pl-24">through</span> <br />
                the tired and trite.
              </p>
              <p className={`about-headline-line about-headline-line-5 mt-16 max-w-3xl text-[clamp(1.35rem,3.2vw,2.4rem)] font-bold leading-[1.34] tracking-[-0.02em] ${heroSans.className}`}>
                Let&apos;s color outside the lines, <br />
                make the stone <em>stony</em>, <br />
                write for real humans, <br />
                and cut through the noise.
              </p>
              <p className={`about-headline-line mt-16 max-w-3xl pb-20 text-[clamp(1.35rem,3.2vw,2.4rem)] font-bold leading-[1.34] tracking-[-0.02em] ${heroSans.className}`}>
                Cheers to work that&apos;s <em>one-of-a-kind</em>, <br />
                because{" "}
                <span
                  ref={storyOutroRef}
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #ff7ee6 0%, #ff7ee6 100%), linear-gradient(90deg, #0047ff 0%, #0047ff 100%)",
                    backgroundSize: `${storyOutroFill * 100}% 100%, 100% 100%`,
                    backgroundRepeat: "no-repeat",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    transition: "background-size 120ms linear",
                  }}
                >
                  you are, too.
                </span>
                <span
                  aria-hidden="true"
                  className="inline-block"
                  style={{
                    opacity: storyEmojiReveal,
                    transform: `translate3d(0, ${(1 - storyEmojiReveal) * 8}px, 0) scale(${0.9 + storyEmojiReveal * 0.1})`,
                    transition: "opacity 180ms ease-out, transform 180ms ease-out",
                  }}
                >
                  {" "}✨
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>

      <section ref={carouselSectionRef} className="relative z-50 w-full overflow-hidden bg-transparent pb-24">
        <div ref={carouselTrackRef} className="overflow-x-auto px-3 pb-6 pt-20 md:px-6 md:pt-24">
          <div className="flex w-max min-w-full snap-x snap-mandatory gap-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:gap-6">
            <div aria-hidden="true" className="w-[70vw] shrink-0 md:w-[54vw] lg:w-[44vw]" />
            {galleryProjects.map((project, index) => {
              const focusedByScroll = carouselFocus[index] ?? 0;
              const revealRaw = (focusedByScroll - 0.12) / 0.88;
              const baseReveal = Math.min(1, Math.max(0, revealRaw));
              const firstCardGate =
                index === 0 ? Math.min(1, Math.max(0, (carouselScrollLeft - 40) / 180)) : 1;
              const reveal = baseReveal * firstCardGate;
              const isSoloCard = project.title === "Clove: SOLO";
              const isCoastCard = project.title === "Clove: 2.0";
              const isClaraCard = project.title === "Clove: The Clara 1";
              const textReveal = reveal * reveal * (3 - 2 * reveal);
              const imageLift = 78 * reveal;
              const textLiftIntoGap = 70 * textReveal;
              const isVideo = project.image.toLowerCase().endsWith(".mp4");

              return (
                <a
                  key={project.title}
                  ref={(element) => {
                    carouselCardRefs.current[index] = element;
                  }}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-[79vw] shrink-0 snap-center overflow-visible md:w-[58vw] lg:w-[47vw]"
                  style={{
                    animationDelay: `${index * 80}ms`,
                    scrollSnapStop: "always",
                  }}
                >
                  <div
                    className="relative overflow-hidden rounded-2xl border border-white/35 bg-white shadow-[0_14px_36px_rgba(255,90,0,0.2)] will-change-transform"
                    style={{
                      transform: `translateY(${-imageLift}px)`,
                      transition: "transform 280ms ease-out",
                    }}
                  >
                    {isVideo ? (
                      <video
                        src={project.image}
                        aria-label={project.title}
                        muted
                        playsInline
                        preload="auto"
                        className="aspect-[16/10] h-full w-full rounded-t-2xl object-cover transition duration-300 ease-out"
                        style={{
                          filter: `brightness(${0.5 + focusedByScroll * 0.4})`,
                        }}
                        onLoadedMetadata={(event) => {
                          const video = event.currentTarget;
                          const loopStart = project.videoLoopStart ?? 0;
                          seekVideoPreviewFrame(video, loopStart);
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
                          filter: `brightness(${0.5 + focusedByScroll * 0.4})`,
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
                      transition: "opacity 280ms ease-out, transform 280ms ease-out",
                    }}
                  >
                    <h3 className={`text-xl font-bold text-[#0047ff] md:text-3xl ${headlineFont.className}`}>
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#0047ff]/85 md:text-base">
                      {project.subtitle}
                    </p>
                  </div>
                </a>
              );
            })}
            <div aria-hidden="true" className="w-[70vw] shrink-0 md:w-[54vw] lg:w-[44vw]" />
          </div>
        </div>
      </section>
    </main>
  );
}
