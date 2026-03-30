import { Archivo, Bodoni_Moda } from "next/font/google";
import { channelMediaByFolder } from "../generated/media-manifest";
import SiteNav from "../components/SiteNav";
import ChannelAutoCarousel from "../components/ChannelAutoCarousel";

type ChannelCard = {
  label: string;
  folder: string;
};

const headlineFont = Bodoni_Moda({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const channelHeaderFont = Archivo({
  weight: ["500", "600"],
  subsets: ["latin"],
});

const channelCards: ChannelCard[] = [
  {
    label: "Out Of Home",
    folder: "out of home",
  },
  {
    label: "Video",
    folder: "video",
  },
  {
    label: "Paid Media",
    folder: "paid media",
  },
  {
    label: "Organic Social",
    folder: "social",
  },
  {
    label: "Email",
    folder: "email",
  },
  {
    label: "Events",
    folder: "events",
  },
];

export default function ChannelsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white px-4 pb-16 pt-24 text-[#0047ff] md:px-8">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="ombre-spot ombre-spot-pink ombre-drift-one" />
        <div className="ombre-spot ombre-spot-pink-soft ombre-drift-two" />
        <div className="ombre-spot ombre-spot-orange ombre-drift-four" />
        <div className="ombre-spot ombre-spot-orange-soft ombre-drift-five" />
      </div>

      <SiteNav />

      <section className="relative z-10 mx-auto mt-14 max-w-6xl">
        <h1
          className={`whitespace-nowrap text-[clamp(1.45rem,4.6vw,4.4rem)] tracking-tight ${headlineFont.className}`}
        >
          <span className="italic">expertise</span> across every channel
        </h1>
        <div className="mt-10 space-y-12">
          {channelCards.map((channel) => (
            <section key={channel.label} className="space-y-4">
              <h2
                className={`text-[clamp(1.1rem,2.1vw,1.5rem)] font-semibold uppercase tracking-[0.08em] ${channelHeaderFont.className}`}
              >
                {channel.label}
              </h2>
              <ChannelAutoCarousel
                ariaLabel={`${channel.label} carousel`}
                items={channelMediaByFolder[channel.folder] ?? []}
                size="large"
                autoScroll
              />
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
