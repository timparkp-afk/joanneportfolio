"use client";

import Link from "next/link";
import SiteNav from "../components/SiteNav";
import { projects } from "../projects";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white px-4 pb-16 pt-[9.5rem] text-[#0047ff] md:px-8 md:pt-24">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="ombre-spot ombre-spot-pink ombre-drift-one" />
        <div className="ombre-spot ombre-spot-pink-soft ombre-drift-two" />
        <div className="ombre-spot ombre-spot-orange ombre-drift-four" />
        <div className="ombre-spot ombre-spot-orange-soft ombre-drift-five" />
      </div>

      <SiteNav />

      <section className="relative z-10 mx-auto mt-6 max-w-7xl md:mt-14">
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
                  <div className="mt-1 text-sm text-white/90 md:text-base">{project.summary}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
