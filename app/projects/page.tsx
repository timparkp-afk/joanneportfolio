"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Archivo } from "next/font/google";
import { projects } from "../projects";

const navFont = Archivo({
  weight: ["500", "600"],
  subsets: ["latin"],
});

export default function ProjectsPage() {
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

  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white px-4 pb-16 pt-24 text-[#0047ff] md:px-8">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="ombre-spot ombre-spot-pink ombre-drift-one" />
        <div className="ombre-spot ombre-spot-pink-soft ombre-drift-two" />
        <div className="ombre-spot ombre-spot-orange ombre-drift-four" />
        <div className="ombre-spot ombre-spot-orange-soft ombre-drift-five" />
      </div>

      <nav
        className={`fixed left-0 top-0 z-50 flex w-full items-start justify-between px-3 py-2 text-base tracking-wide text-[#0047ff] md:px-5 md:py-3 md:text-lg ${navFont.className}`}
      >
        <Link href="/" className="inline-flex items-center gap-2 normal-case">
          <span className="font-extrabold">Joanne</span>
          <span className="hidden normal-case md:inline">{typedText}</span>
          <span className="hidden animate-pulse md:inline">|</span>
        </Link>
        <div className="flex items-center gap-4 uppercase md:gap-6">
          <Link
            href="/about"
            className="rounded-full border border-white/60 bg-white/25 px-3.5 py-1.5 text-sm shadow-[0_8px_24px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,71,255,0.2)] backdrop-blur-xl md:px-4 md:py-1.5 md:text-base"
          >
            about
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-white/60 bg-white/25 px-3.5 py-1.5 text-sm shadow-[0_8px_24px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,71,255,0.2)] backdrop-blur-xl md:px-4 md:py-1.5 md:text-base"
          >
            projects
          </Link>
          <Link
            href="/channels"
            className="rounded-full border border-white/60 bg-white/25 px-3.5 py-1.5 text-sm shadow-[0_8px_24px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,71,255,0.2)] backdrop-blur-xl md:px-4 md:py-1.5 md:text-base"
          >
            channels
          </Link>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=johwangbo@gmail.com"
            className="rounded-full border border-white/60 bg-white/25 px-3.5 py-1.5 text-sm shadow-[0_8px_24px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,71,255,0.2)] backdrop-blur-xl md:px-4 md:py-1.5 md:text-base"
          >
            contact
          </a>
        </div>
      </nav>

      <section className="relative z-10 mx-auto mt-14 max-w-7xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project) => {
            const isVideo = project.image.toLowerCase().endsWith(".mp4");
            return (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/35 bg-white/60 shadow-[0_14px_36px_rgba(0,71,255,0.16)] backdrop-blur-sm"
              >
                {isVideo ? (
                  <video
                    src={project.image}
                    aria-label={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(event) => {
                      const video = event.currentTarget;
                      const loopStart = project.videoLoopStart ?? 0;
                      video.currentTime = loopStart;
                    }}
                    onTimeUpdate={(event) => {
                      const video = event.currentTarget;
                      const loopStart = project.videoLoopStart ?? 0;
                      const loopEnd = project.videoLoopEnd ?? 3;
                      if (video.currentTime >= loopEnd) {
                        video.currentTime = loopStart;
                        void video.play();
                      }
                    }}
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-black/6 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <h2 className="text-lg font-bold leading-tight text-white md:text-2xl">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm text-white/90 md:text-base">{project.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
