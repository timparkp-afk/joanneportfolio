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

  const isLightOnDark = textClassName.includes("text-white");

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

  const nameColor = isLightOnDark ? "text-white" : "text-[#0047ff]";
  const rotatingColor = isLightOnDark ? "text-white/90" : "text-[#0047ff]/90";
  const brandLinkTint = isLightOnDark ? "" : "text-[#0047ff]";

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b-0 bg-transparent pt-[calc(env(safe-area-inset-top)+24px)] text-base tracking-wide backdrop-blur-none md:pt-[env(safe-area-inset-top)] md:text-lg ${textClassName} ${navFont.className}`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 pb-2 pt-0 md:max-w-none md:flex-row md:items-start md:justify-between md:gap-4 md:px-5 md:py-3">
        <div className="flex w-full justify-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:w-auto md:justify-start md:overflow-visible [&::-webkit-scrollbar]:hidden">
          <Link
            href="/"
            className={`inline-flex max-w-none min-w-0 flex-row flex-nowrap items-center justify-center gap-1.5 whitespace-nowrap normal-case md:justify-start md:gap-2 ${brandLinkTint}`}
          >
            <span
              className={`shrink-0 text-base font-extrabold leading-snug md:text-lg md:leading-normal ${nameColor}`}
            >
              Joanne
            </span>
            <span
              className={`text-base font-medium leading-snug tracking-wide md:text-lg md:leading-normal ${rotatingColor}`}
            >
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
  );
}
