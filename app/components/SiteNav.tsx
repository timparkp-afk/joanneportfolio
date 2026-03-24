"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Archivo } from "next/font/google";

const navFont = Archivo({
  weight: ["500", "600"],
  subsets: ["latin"],
});

type SiteNavProps = {
  textClassName?: string;
};

export default function SiteNav({ textClassName = "text-[#0047ff]" }: SiteNavProps) {
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
    <nav
      className={`fixed left-0 top-0 z-50 flex w-full items-start justify-between px-3 py-2 text-base tracking-wide md:px-5 md:py-3 md:text-lg ${textClassName} ${navFont.className}`}
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
  );
}
