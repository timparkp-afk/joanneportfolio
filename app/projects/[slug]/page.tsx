import Link from "next/link";
import { notFound } from "next/navigation";
import { Archivo, Bodoni_Moda } from "next/font/google";
import fs from "node:fs";
import path from "node:path";
import EveryBizVideoCarousel from "../../components/EveryBizVideoCarousel";
import SiteNav from "../../components/SiteNav";
import ScrollAutoPlayVideo from "../../components/ScrollAutoPlayVideo";
import SoloImageCarousel from "../../components/SoloImageCarousel";
import AutoSwipeImageCarousel from "../../components/AutoSwipeImageCarousel";
import CoastMediaCarousel from "../../components/CoastMediaCarousel";
import ProductLaunchesBannerRows from "../../components/ProductLaunchesBannerRows";
import DualRotatingImageColumns from "../../components/DualRotatingImageColumns";
import { projects } from "../../projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const headlineFont = Bodoni_Moda({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const bodyFont = Archivo({
  weight: ["500", "600"],
  subsets: ["latin"],
});

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project || projectIndex < 0) {
    notFound();
  }

  const isCloveCoastToCoast = slug === "clove-2.0";
  const heroMedia = isCloveCoastToCoast ? "/images/clove%202.0/clove%202.mp4" : project.image;
  const isHeroVideo = heroMedia.toLowerCase().endsWith(".mp4");
  const projectBrand = project.title.split(":")[0].trim();
  const isAllInOne = slug === "justworks-all-in-one-solution";
  const isRunYourBusiness = slug === "justworks-run-your-business";
  const isEveryBusinessStartsSmall = slug === "justworks-every-business-starts-small";
  const isSmallBusinessBigJourney = slug === "justworks-small-business-big-journey";
  const isCloveSolo = slug === "clove-solo";
  const isClaraOne = slug === "clove-the-clara-1";
  const isCloveProductLaunches = slug === "clove-product-launches";
  const showVideoCarousel =
    slug !== "justworks-all-in-one-solution" &&
    slug !== "justworks-small-business-big-journey" &&
    slug !== "clove-solo" &&
    slug !== "clove-the-clara-1" &&
    slug !== "clove-2.0" &&
    slug !== "clove-product-launches";
  const projectSubhead = isCloveCoastToCoast
    ? "The reinvented cult classic"
    : project.title.includes(":")
    ? project.title.split(":")[1].trim()
    : project.summary;
  const rightMeta =
    slug === "justworks-all-in-one-solution"
      ? {
          role: "Lead Copywriter",
          channels: "Paid social, programmatic, video, website, in-house events",
          collaborating:
            "Creative, paid media, events, customer support, & sales",
        }
      : isCloveCoastToCoast
      ? {
          role: "Lead Copywriter",
          channels: "Paid and organic social, programmatic, video, & website",
          collaborating:
            "Creative, customer support, producers, photographers, & executives",
        }
      : isCloveProductLaunches
      ? {
          role: "Lead Copywriter, Manager of the Social Media and Editorial team",
          channels:
            "Out-of-home, events, paid social, organic social, programmatic, video, packaging, & website",
          collaborating:
            "Creative, photographers, producers, customer support, & executives",
        }
      : isClaraOne
      ? {
          role: "Copywriter",
          channels:
            "Out-of-home, events, paid social, organic social, product, packaging, & website",
          collaborating:
            "Nurse Clara, creative, events, customer support, producers, photographers, & executives",
        }
      : isCloveSolo
      ? {
          role: "Copywriter",
          channels:
            "Out-of-home, paid social, organic social, video, website, product, & packaging",
          collaborating:
            "Creative, customer support, producers, photographers, & executives",
        }
      : isSmallBusinessBigJourney
      ? {
          role: "Lead Copywriter",
          channels: "Events, South by Southwest",
          collaborating: "Creative, events, customer success, & sales",
        }
      : {
          role: "Lead Copywriter",
          channels:
            "Out-of-home, events, paid social, programmatic, video, & website",
          collaborating:
            "Creative, paid media, events, customer success, customer support, producers, & executives",
        };
  const everyBizCarouselVideos = [
    "/images/EVERY%20BIZ/videos/jw_cs_auntflow_60_16x9_v3%20(1080p).mp4",
    "/images/EVERY%20BIZ/videos/jw_cs_cartwheel_60_16x9_v1%20(1080p).mp4",
    "/images/EVERY%20BIZ/videos/jw_cs_loop_60_16x9_v3%20(1080p).mp4",
    "/images/EVERY%20BIZ/videos/jw_thejourney_15_petplate_16x9_v2%20(1080p).mp4",
    "/images/EVERY%20BIZ/videos/jw_thejourney_15_universalstandard_16x9_v2%20(1080p).mp4",
  ];
  const runYourBusinessCarouselVideos = [
    "/images/RYB/doc.mp4",
    "/images/RYB/lawyer.mp4",
    "/images/RYB/dad.mp4",
    "/images/RYB/florist.mp4",
  ];
  const soloCarouselMedia = {
    video1: encodeURI("/images/solo/carousel/VIDEO1.gif"),
    tag: encodeURI("/images/solo/carousel/tag.png"),
    lana: encodeURI("/images/solo/carousel/lana.png"),
    sabina: encodeURI("/images/solo/carousel/sabina.png"),
    tom: encodeURI("/images/solo/carousel/tom.png"),
    tag2: encodeURI("/images/solo/carousel/tag2.png"),
    tag3: encodeURI("/images/solo/carousel/tag3.png"),
    shoes: encodeURI("/images/solo/carousel/shoes.png"),
  };
  const coastCarouselMedia = [
    "/images/clove%202.0/clove3.mp4",
    "/images/clove%202.0/clove6.mp4",
    "/images/clove%202.0/clovevideo.jpg",
    "/images/clove%202.0/paid.png",
    "/images/clove%202.0/wordle.png",
  ];
  const cloveProductLaunchPhotos = fs
    .readdirSync(path.join(process.cwd(), "public", "images", "clove", "product launches"))
    .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map(
      (file) =>
        `/images/clove/${encodeURIComponent("product launches")}/${encodeURIComponent(file)}`
    );
  const encodedCloveRootFolder = `/images/${encodeURIComponent("clove")}`;
  const encodedProductLaunchesFolder = `${encodedCloveRootFolder}/${encodeURIComponent(
    "product launches"
  )}`;
  const encodedCarouselFolder = `${encodedProductLaunchesFolder}/${encodeURIComponent(
    "carousel in product launches"
  )}`;
  const cloveProductLaunchEventsFolder = path.join(
    process.cwd(),
    "public",
    "images",
    "clove",
    "product launches",
    "carousel in product launches",
    "events"
  );
  const cloveProductLaunchColumnOne = fs
    .readdirSync(cloveProductLaunchEventsFolder)
    .filter((file) => /\.(png|jpe?g|webp|gif|mp4|webm|ogg)$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map(
      (file) =>
        `${encodedCarouselFolder}/${encodeURIComponent("events")}/${encodeURIComponent(file)}`
    );
  const cloveProductLaunchRows = [0, 1, 2].map((rowIndex) =>
    cloveProductLaunchPhotos.filter((_, photoIndex) => photoIndex % 3 === rowIndex)
  );
  const claraHeaderImages = [
    "/images/CLARA/bus.png",
    "/images/CLARA/clara.png",
    "/images/CLARA/post.png",
    "/images/CLARA/intheair.png",
  ];
  const carouselVideos = isRunYourBusiness
    ? runYourBusinessCarouselVideos
    : everyBizCarouselVideos;

  return (
    <main
      className={`relative min-h-screen overflow-x-hidden px-4 pb-14 pt-20 text-[#dbe7ff] md:px-7 md:pt-24 ${bodyFont.className} ${
        isAllInOne
          ? "bg-[#1a1238]"
          : isRunYourBusiness
            ? "bg-[#2a1200]"
            : isSmallBusinessBigJourney
              ? "bg-[#0d1f4f]"
              : isCloveCoastToCoast
                ? "bg-[#102a64]"
              : isCloveProductLaunches
                ? "bg-[#2a3550]"
              : isCloveSolo
                ? "bg-[#0f1f45]"
              : isClaraOne
                ? "bg-[#2a0918]"
                : "bg-[#061514]"
      }`}
    >
      <SiteNav textClassName="text-white" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        {isAllInOne ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(108,69,188,0.76)_0%,rgba(108,69,188,0)_44%),radial-gradient(circle_at_84%_18%,rgba(150,205,255,0.56)_0%,rgba(150,205,255,0)_46%),radial-gradient(circle_at_30%_82%,rgba(79,50,146,0.72)_0%,rgba(79,50,146,0)_44%),radial-gradient(circle_at_82%_86%,rgba(127,184,255,0.6)_0%,rgba(127,184,255,0)_46%)]" />
            <div className="ombre-spot ombre-drift-one" style={{ top: "-14vh", left: "-14vw", width: "42vw", height: "42vw", background: "radial-gradient(circle, rgba(97,62,182,0.74) 0%, rgba(97,62,182,0) 74%)", opacity: 0.84 }} />
            <div className="ombre-spot ombre-drift-two" style={{ top: "22vh", right: "-16vw", width: "46vw", height: "46vw", background: "radial-gradient(circle, rgba(154,209,255,0.62) 0%, rgba(154,209,255,0) 76%)", opacity: 0.8 }} />
            <div className="ombre-spot ombre-drift-four" style={{ bottom: "-20vh", left: "18vw", width: "48vw", height: "48vw", background: "radial-gradient(circle, rgba(83,56,157,0.72) 0%, rgba(83,56,157,0) 76%)", opacity: 0.84 }} />
            <div className="ombre-spot ombre-drift-five" style={{ top: "52vh", right: "16vw", width: "36vw", height: "36vw", background: "radial-gradient(circle, rgba(173,221,255,0.54) 0%, rgba(173,221,255,0) 74%)", opacity: 0.78 }} />
          </>
        ) : isRunYourBusiness ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,108,24,0.72)_0%,rgba(214,108,24,0)_42%),radial-gradient(circle_at_84%_18%,rgba(255,223,130,0.56)_0%,rgba(255,223,130,0)_46%),radial-gradient(circle_at_28%_82%,rgba(166,69,9,0.74)_0%,rgba(166,69,9,0)_44%),radial-gradient(circle_at_82%_84%,rgba(255,245,168,0.56)_0%,rgba(255,245,168,0)_46%)]" />
            <div className="ombre-spot ombre-drift-one" style={{ top: "-14vh", left: "-14vw", width: "42vw", height: "42vw", background: "radial-gradient(circle, rgba(188,86,14,0.76) 0%, rgba(188,86,14,0) 74%)", opacity: 0.84 }} />
            <div className="ombre-spot ombre-drift-two" style={{ top: "22vh", right: "-16vw", width: "46vw", height: "46vw", background: "radial-gradient(circle, rgba(255,229,138,0.64) 0%, rgba(255,229,138,0) 76%)", opacity: 0.78 }} />
            <div className="ombre-spot ombre-drift-four" style={{ bottom: "-20vh", left: "18vw", width: "48vw", height: "48vw", background: "radial-gradient(circle, rgba(154,63,7,0.74) 0%, rgba(154,63,7,0) 76%)", opacity: 0.84 }} />
            <div className="ombre-spot ombre-drift-five" style={{ top: "52vh", right: "16vw", width: "36vw", height: "36vw", background: "radial-gradient(circle, rgba(255,239,166,0.58) 0%, rgba(255,239,166,0) 74%)", opacity: 0.76 }} />
          </>
        ) : isSmallBusinessBigJourney ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(42,96,214,0.72)_0%,rgba(42,96,214,0)_42%),radial-gradient(circle_at_84%_18%,rgba(255,241,166,0.58)_0%,rgba(255,241,166,0)_46%),radial-gradient(circle_at_30%_82%,rgba(26,64,165,0.76)_0%,rgba(26,64,165,0)_44%),radial-gradient(circle_at_82%_84%,rgba(255,249,188,0.56)_0%,rgba(255,249,188,0)_46%)]" />
            <div className="ombre-spot ombre-drift-one" style={{ top: "-14vh", left: "-14vw", width: "42vw", height: "42vw", background: "radial-gradient(circle, rgba(41,88,203,0.76) 0%, rgba(41,88,203,0) 74%)", opacity: 0.84 }} />
            <div className="ombre-spot ombre-drift-two" style={{ top: "22vh", right: "-16vw", width: "46vw", height: "46vw", background: "radial-gradient(circle, rgba(255,236,155,0.62) 0%, rgba(255,236,155,0) 76%)", opacity: 0.8 }} />
            <div className="ombre-spot ombre-drift-four" style={{ bottom: "-20vh", left: "18vw", width: "48vw", height: "48vw", background: "radial-gradient(circle, rgba(29,72,184,0.76) 0%, rgba(29,72,184,0) 76%)", opacity: 0.82 }} />
            <div className="ombre-spot ombre-drift-five" style={{ top: "52vh", right: "16vw", width: "36vw", height: "36vw", background: "radial-gradient(circle, rgba(255,248,186,0.56) 0%, rgba(255,248,186,0) 74%)", opacity: 0.78 }} />
          </>
        ) : isCloveCoastToCoast ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,115,242,0.74)_0%,rgba(56,115,242,0)_42%),radial-gradient(circle_at_84%_18%,rgba(255,243,166,0.62)_0%,rgba(255,243,166,0)_46%),radial-gradient(circle_at_30%_82%,rgba(32,86,210,0.76)_0%,rgba(32,86,210,0)_44%),radial-gradient(circle_at_82%_84%,rgba(255,248,190,0.58)_0%,rgba(255,248,190,0)_46%)]" />
            <div className="ombre-spot ombre-drift-one" style={{ top: "-14vh", left: "-14vw", width: "42vw", height: "42vw", background: "radial-gradient(circle, rgba(58,118,240,0.78) 0%, rgba(58,118,240,0) 74%)", opacity: 0.84 }} />
            <div className="ombre-spot ombre-drift-two" style={{ top: "22vh", right: "-16vw", width: "46vw", height: "46vw", background: "radial-gradient(circle, rgba(255,239,162,0.66) 0%, rgba(255,239,162,0) 76%)", opacity: 0.82 }} />
            <div className="ombre-spot ombre-drift-four" style={{ bottom: "-20vh", left: "18vw", width: "48vw", height: "48vw", background: "radial-gradient(circle, rgba(34,89,214,0.76) 0%, rgba(34,89,214,0) 76%)", opacity: 0.84 }} />
            <div className="ombre-spot ombre-drift-five" style={{ top: "52vh", right: "16vw", width: "36vw", height: "36vw", background: "radial-gradient(circle, rgba(255,249,194,0.58) 0%, rgba(255,249,194,0) 74%)", opacity: 0.8 }} />
          </>
        ) : isCloveProductLaunches ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(95,54,24,0.9)_0%,rgba(37,83,92,0.88)_52%,rgba(26,96,108,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(214,128,72,0.52)_0%,rgba(214,128,72,0)_42%),radial-gradient(circle_at_84%_18%,rgba(73,171,163,0.54)_0%,rgba(73,171,163,0)_46%),radial-gradient(circle_at_30%_82%,rgba(178,98,48,0.5)_0%,rgba(178,98,48,0)_44%),radial-gradient(circle_at_82%_84%,rgba(61,156,149,0.5)_0%,rgba(61,156,149,0)_46%)]" />
            <div className="ombre-spot ombre-drift-one" style={{ top: "-14vh", left: "-14vw", width: "42vw", height: "42vw", background: "radial-gradient(circle, rgba(201,112,56,0.64) 0%, rgba(201,112,56,0) 74%)", opacity: 0.78 }} />
            <div className="ombre-spot ombre-drift-two" style={{ top: "22vh", right: "-16vw", width: "46vw", height: "46vw", background: "radial-gradient(circle, rgba(69,165,157,0.64) 0%, rgba(69,165,157,0) 76%)", opacity: 0.8 }} />
            <div className="ombre-spot ombre-drift-four" style={{ bottom: "-20vh", left: "18vw", width: "48vw", height: "48vw", background: "radial-gradient(circle, rgba(170,92,44,0.62) 0%, rgba(170,92,44,0) 76%)", opacity: 0.78 }} />
            <div className="ombre-spot ombre-drift-five" style={{ top: "52vh", right: "16vw", width: "36vw", height: "36vw", background: "radial-gradient(circle, rgba(58,150,143,0.6) 0%, rgba(58,150,143,0) 74%)", opacity: 0.76 }} />
          </>
        ) : isCloveSolo ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(90,204,255,0.8)_0%,rgba(90,204,255,0)_42%),radial-gradient(circle_at_84%_18%,rgba(255,200,232,0.68)_0%,rgba(255,200,232,0)_46%),radial-gradient(circle_at_30%_82%,rgba(118,224,255,0.72)_0%,rgba(118,224,255,0)_44%),radial-gradient(circle_at_82%_84%,rgba(255,224,243,0.62)_0%,rgba(255,224,243,0)_46%)]" />
            <div className="ombre-spot ombre-drift-one" style={{ top: "-14vh", left: "-14vw", width: "42vw", height: "42vw", background: "radial-gradient(circle, rgba(112,218,255,0.86) 0%, rgba(112,218,255,0) 74%)", opacity: 0.9 }} />
            <div className="ombre-spot ombre-drift-two" style={{ top: "22vh", right: "-16vw", width: "46vw", height: "46vw", background: "radial-gradient(circle, rgba(255,196,229,0.8) 0%, rgba(255,196,229,0) 76%)", opacity: 0.88 }} />
            <div className="ombre-spot ombre-drift-four" style={{ bottom: "-20vh", left: "18vw", width: "48vw", height: "48vw", background: "radial-gradient(circle, rgba(134,230,255,0.78) 0%, rgba(134,230,255,0) 76%)", opacity: 0.86 }} />
            <div className="ombre-spot ombre-drift-five" style={{ top: "52vh", right: "16vw", width: "36vw", height: "36vw", background: "radial-gradient(circle, rgba(255,220,241,0.74) 0%, rgba(255,220,241,0) 74%)", opacity: 0.84 }} />
          </>
        ) : isClaraOne ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(166,28,89,0.78)_0%,rgba(166,28,89,0)_42%),radial-gradient(circle_at_84%_18%,rgba(255,222,238,0.6)_0%,rgba(255,222,238,0)_46%),radial-gradient(circle_at_30%_82%,rgba(111,18,64,0.74)_0%,rgba(111,18,64,0)_44%),radial-gradient(circle_at_82%_84%,rgba(255,240,247,0.56)_0%,rgba(255,240,247,0)_46%)]" />
            <div className="ombre-spot ombre-drift-one" style={{ top: "-14vh", left: "-14vw", width: "42vw", height: "42vw", background: "radial-gradient(circle, rgba(146,24,78,0.8) 0%, rgba(146,24,78,0) 74%)", opacity: 0.84 }} />
            <div className="ombre-spot ombre-drift-two" style={{ top: "22vh", right: "-16vw", width: "46vw", height: "46vw", background: "radial-gradient(circle, rgba(255,228,241,0.66) 0%, rgba(255,228,241,0) 76%)", opacity: 0.8 }} />
            <div className="ombre-spot ombre-drift-four" style={{ bottom: "-20vh", left: "18vw", width: "48vw", height: "48vw", background: "radial-gradient(circle, rgba(120,20,69,0.76) 0%, rgba(120,20,69,0) 76%)", opacity: 0.84 }} />
            <div className="ombre-spot ombre-drift-five" style={{ top: "52vh", right: "16vw", width: "36vw", height: "36vw", background: "radial-gradient(circle, rgba(255,243,249,0.58) 0%, rgba(255,243,249,0) 74%)", opacity: 0.78 }} />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(12,74,58,0.72)_0%,rgba(12,74,58,0)_42%),radial-gradient(circle_at_84%_18%,rgba(17,52,109,0.76)_0%,rgba(17,52,109,0)_46%),radial-gradient(circle_at_32%_80%,rgba(13,88,66,0.62)_0%,rgba(13,88,66,0)_44%),radial-gradient(circle_at_82%_84%,rgba(24,65,132,0.66)_0%,rgba(24,65,132,0)_46%)]" />
            <div className="ombre-spot ombre-drift-one" style={{ top: "-14vh", left: "-14vw", width: "42vw", height: "42vw", background: "radial-gradient(circle, rgba(11,95,68,0.7) 0%, rgba(11,95,68,0) 74%)", opacity: 0.82 }} />
            <div className="ombre-spot ombre-drift-two" style={{ top: "22vh", right: "-16vw", width: "46vw", height: "46vw", background: "radial-gradient(circle, rgba(19,71,164,0.72) 0%, rgba(19,71,164,0) 76%)", opacity: 0.78 }} />
            <div className="ombre-spot ombre-drift-four" style={{ bottom: "-20vh", left: "18vw", width: "48vw", height: "48vw", background: "radial-gradient(circle, rgba(6,82,63,0.7) 0%, rgba(6,82,63,0) 76%)", opacity: 0.82 }} />
            <div className="ombre-spot ombre-drift-five" style={{ top: "52vh", right: "16vw", width: "36vw", height: "36vw", background: "radial-gradient(circle, rgba(20,59,135,0.68) 0%, rgba(20,59,135,0) 74%)", opacity: 0.78 }} />
          </>
        )}
      </div>

      <div className="relative z-10 mx-auto mt-3 w-full max-w-[1500px]">
        <Link href="/projects" className="inline-block text-xs uppercase tracking-[0.18em] text-[#dbe8ff] underline">
          Back to projects
        </Link>
      </div>

      <section className="relative z-10 mx-auto mt-2 w-full max-w-[1500px] px-3 py-6 text-[#e6eeff] md:px-8 md:py-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <h2 className={`-ml-2 text-[clamp(2.5rem,6vw,5.2rem)] font-bold leading-none md:-ml-5 ${headlineFont.className}`}>
              {projectBrand}
            </h2>
            <p className={`-ml-2 mt-2 text-[clamp(1rem,1.9vw,1.85rem)] leading-[1.1] text-[#dbe8ff]/92 md:-ml-5 ${bodyFont.className}`}>
              {projectSubhead}
            </p>
          </div>
          <div className="max-w-[330px] justify-self-end space-y-5 text-right text-[14px] leading-relaxed text-[#dbe8ff]">
            <p>Role: {rightMeta.role}</p>
            <p>
              Channels: {rightMeta.channels}
            </p>
            <p>
              Collaborating with: {rightMeta.collaborating}
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto mt-2 w-full max-w-[1500px]">
        <section className="flex flex-col items-center space-y-5 pt-2 md:pt-6">
          {isCloveProductLaunches ? (
            <section className="w-full max-w-[1360px] space-y-2">
              <ProductLaunchesBannerRows rows={cloveProductLaunchRows} />
            </section>
          ) : (
            <article
              className={`relative w-full max-w-[1360px] overflow-hidden rounded-2xl ${
                isCloveSolo || isClaraOne
                  ? "border-none bg-transparent shadow-none"
                  : "border border-white/45 bg-[#cad3e4]/40 shadow-[0_18px_40px_rgba(18,35,63,0.16)]"
              } ${isAllInOne ? "p-2 md:p-3" : isClaraOne ? "aspect-[16/6]" : "aspect-[16/11]"}`}
            >
              {isAllInOne ? (
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
                  <video
                    src="/images/ONE%20SOLUTION/bigvid1.mp4"
                    className="h-[320px] w-full rounded-lg object-cover md:h-[430px]"
                    controls
                    playsInline
                    preload="metadata"
                  />
                  <video
                    src="/images/ONE%20SOLUTION/bigvid2.mp4"
                    className="h-[320px] w-full rounded-lg object-cover md:h-[430px]"
                    controls
                    playsInline
                    preload="metadata"
                  />
                </div>
              ) : isClaraOne ? (
                <AutoSwipeImageCarousel images={claraHeaderImages} />
              ) : isHeroVideo ? (
                <video
                  src={heroMedia}
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={heroMedia}
                  alt={project.title}
                  className={`h-full w-full ${isCloveSolo ? "object-contain" : "object-cover"}`}
                />
              )}
            </article>
          )}
          {!isRunYourBusiness && showVideoCarousel ? (
            <EveryBizVideoCarousel videos={carouselVideos} />
          ) : null}
          <section className="w-full max-w-[1120px] pt-4 text-[#dbe8ff]">
            <h3 className={`mb-6 text-left text-[clamp(1.6rem,3.4vw,3rem)] font-bold ${headlineFont.className}`}>
              {isCloveProductLaunches ? "The Campaigns" : "The Campaign"}
            </h3>
            <p className={`text-left text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed ${bodyFont.className}`}>
              {isCloveCoastToCoast
                ? "After listening closely to its community, Clove launched a reinvented version of its cult-classic sneaker line, preserving what customers loved while thoughtfully addressing what they had asked for. This wasn't just a product update. It was proof that the brand was paying attention."
                : isCloveProductLaunches
                ? "From 2020 to 2023, I spearheaded over 50 product launches across new colorways, accessories, brand collaborations, and limited-edition collections. Each one was built to feel like an event, not a release."
                : isClaraOne
                ? "Inspired by Nike's Jordan collection, Clove launched the first sneaker collaboration in the healthcare space. The Clara 1 was intentionally designed and strategically produced to honor an iconic healthcare professional driving real change, both in her community and on the hospital floor."
                : isCloveSolo
                ? "This campaign celebrated the launch of five new sneakers in a bold new silhouette: SOLO, defined by a single elastic band. As the brightest launch in Clove's history, it was built around the people who wear the brand every day, real healthcare professionals making a genuine impact in their communities."
                : isSmallBusinessBigJourney
                ? "This campaign brought Justworks to life at South by Southwest 2025. Taking cues from SXSW's official theme, Forge New Frontiers, I leaned into a Western tone of voice to position Justworks as an exciting, trustworthy partner for prospective customers discovering the brand for the first time."
                : isRunYourBusiness
                ? "This campaign refreshed Justworks' 2023 brand awareness work for the start of 2024. The tagline, Run Your Business, Don't Let It Run You, set the tone: a direct, empowering call for small business owners to reclaim control of their journey."
                : isEveryBusinessStartsSmall
                ? (
                  <>
                    This campaign was built on a simple but powerful truth: <strong>every business starts small.</strong> Rather than speaking to founders at scale, it met them where they were, validating their ambitions without putting a ceiling on where those ambitions could lead. We brought 11 real customer stories to life across a full campaign ecosystem, from a hero video to out-of-home placements, <strong>all made entirely in-house</strong>.
                  </>
                )
                : "For the first time, this video campaign positioned Justworks as a true all-in-one solution. Rather than marketing PEO, Payroll, and EOR as isolated products, I led the copy strategy to reframe them as a single, cohesive experience built for small business owners."}
            </p>
            <h3 className={`mt-12 text-left text-[clamp(1.6rem,3.4vw,3rem)] font-bold ${headlineFont.className}`}>
              Our Strategy
            </h3>
            <p className={`mt-6 text-left text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed ${bodyFont.className}`}>
              {isCloveCoastToCoast
                ? "The creative challenge here was a familiar one with higher stakes: how do you excite loyal customers about a product they already own? The answer was honesty. Rather than obscuring the changes behind aspirational language, the copy leaned into the improvements directly, naming each one and explaining what it actually meant for the person wearing them through a twelve-hour shift."
                : isCloveProductLaunches
                ? "Every launch was built as its own world: a distinct name, color story, theme, and roster of real healthcare professionals and brand partners who brought it to life. No two felt the same, and that was intentional. Each launch required a full campaign ecosystem spanning social, email, SMS, editorial, out-of-home, and CTV. To drive urgency and reward the community that had built Clove into what it was, I developed the reverse hype strategy, a teaser-first approach that built anticipation well before every drop and consistently moved product within minutes of going live."
                : isEveryBusinessStartsSmall
                ? (
                  <>
                    I spent two months immersed in real customer interviews, drawing out the headlines and narratives that would anchor the campaign. The creative challenge was a precise one: write copy that felt personal and emotionally resonant for each founder, while staying universal enough that any small business owner could see themselves in it.
                    <br />
                    <br />
                    From there, I spearheaded the full creative process, from concept ideation through asset creation, working cross-functionally to serve every channel&apos;s needs. The result was 11 distinct customer stories told through brand CTV spots, out-of-home placements, SEO-optimized landing pages, and more, all built to strengthen both the brand and the community it stood for.
                  </>
                )
                : isClaraOne
                ? "From the start, Clara and I connected on a personal level. We were both Korean American, and she wanted the sneaker to carry elements of our shared culture. That conversation led to the heart of the Clara 1: the Mugunghwa flower. As South Korea's national flower, the Mugunghwa represents resilience, a quality that defines every healthcare professional working today."
                : isCloveSolo
                ? (
                  <>
                    Clove&apos;s DNA has always been rooted in supporting the healthcare community, so the campaign had to be built around <strong>real people and honest stories</strong>. The tagline became: <strong>The Brightest Support In Healthcare.</strong>
                  </>
                )
                : isSmallBusinessBigJourney
                ? "After diving deep into Western iconography and classic film archives, I landed on the campaign tagline: Small Business, Big Journey. It spoke directly to our core customer while naturally tapping into the \"new frontiers\" theme without feeling heavy-handed. The line carried a real point of view: just because you ran a small business didn't mean the journey was any less significant than what a large enterprise faced. That ambition deserved to be acknowledged."
                : isRunYourBusiness
                ? "Rather than glossing over the difficulty of running a business, I leaned into it. By leading with the emotional weight of those challenges, the contrast with Justworks as a solution hit harder. It wasn't just about resolved checklists. It was about the relief of finally having real support."
                : "As the first campaign of its kind, it came with real creative latitude, and real responsibility. The central challenge was crafting copy that stayed concise and conversational without underselling the breadth of what Justworks offers. I partnered closely with brand and motion graphics designers to develop storyboards and assets that felt polished and intentional, moving viewers fluidly from one feature to the next."}
            </p>
            <p className={`mt-8 text-left text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed ${bodyFont.className}`}>
              {isCloveProductLaunches ? (
                <>
                  The strategy also had a deeper purpose. By centering real people and genuine stories at the heart of every launch, the work never felt like advertising. It felt like a celebration of the healthcare community itself.
                </>
              ) : isEveryBusinessStartsSmall ? null : isCloveCoastToCoast ? (
                <>
                  A video campaign starring real healthcare professionals brought those updates to life in authentic, on-the-floor context. The visuals and copy worked in tandem, one showing the experience, the other articulating it.
                </>
              ) : isClaraOne ? (
                <>
                  Every line of copy had to hold two things at once: Clara&apos;s warm, down-to-earth voice and the elevated weight of a genuinely historic collaboration. I balanced conversational copy written from Clara&apos;s point of view with more sophisticated lines that underscored just how exclusive and one-of-a-kind this moment was for the healthcare space.
                </>
              ) : isCloveSolo ? (
                <>
                  The insight was layered. Healthcare professionals often seek out striking colorways as one of the few ways to express personal style beneath a uniform. The line spoke to that, described the collection for what it was, and landed a quiet wink: it was the healthcare professionals themselves who were the true brightest support for their patients, every single day.
                  <br />
                  <br />
                  With five bold colorways to work with, I interviewed and crafted five long-form and short-form stories alongside healthcare professionals with genuinely remarkable backgrounds. From a CRNA with over 60 years of experience to a medical student advocating for the LGBTQ+ community, every line of copy was <em>written to feel empowering, unapologetic, and impossible to scroll past.</em>
                </>
              ) : isSmallBusinessBigJourney ? (
                <>
                  That anchor line gave us the creative sandbox to have a lot more fun at the asset level. Some of my favorites were witty, specific, and did the work of communicating our product solutions without sounding like a product brochure.
                  <br />
                  <br />
                  <em>Small business problems? This ain&apos;t our first rodeo.</em>
                  <br />
                  <em>From a lone star to a team of trailblazers.</em>
                  <br />
                  <em>For the perfect hire beyond the horizon.</em>
                  <br />
                  <em>For the dream wrangler. For the trail boss.</em>
                </>
              ) : isRunYourBusiness
                ? "The work required holding a careful balance: honest enough to resonate with the struggle, optimistic enough to make Justworks feel like the answer owners didn't know they'd been waiting for."
                : "I partnered closely with our brand designers and motion graphics designers to storyboard and create elevated, sophisticated assets that flawlessly led viewers from one feature to another."}
            </p>
            {isRunYourBusiness && showVideoCarousel ? (
              <div className="mt-10">
                <EveryBizVideoCarousel videos={carouselVideos} />
              </div>
            ) : null}
            {isAllInOne ? (
              <section className="mt-10 w-full max-w-[1120px]">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <img
                    src="/images/ONE%20SOLUTION/sm1.gif"
                    alt="All-In-One creative 1"
                    className="h-[280px] w-full rounded-xl border border-white/20 object-cover md:h-[340px]"
                  />
                  <img
                    src="/images/ONE%20SOLUTION/sm3.gif"
                    alt="All-In-One creative 2"
                    className="h-[280px] w-full rounded-xl border border-white/20 bg-black/20 object-contain p-1 md:h-[340px]"
                  />
                  <img
                    src="/images/ONE%20SOLUTION/sm4.gif"
                    alt="All-In-One creative 3"
                    className="h-[280px] w-full rounded-xl border border-white/20 object-cover md:h-[340px]"
                  />
                  <img
                    src="/images/ONE%20SOLUTION/sm5.gif"
                    alt="All-In-One creative 4"
                    className="h-[280px] w-full rounded-xl border border-white/20 object-cover md:h-[340px]"
                  />
                </div>
              </section>
            ) : (
              <>
                {isRunYourBusiness || isSmallBusinessBigJourney ? null : isCloveCoastToCoast ? (
                  <section className="mt-8 w-full max-w-[1220px]">
                    <CoastMediaCarousel media={coastCarouselMedia} />
                  </section>
                ) : isCloveProductLaunches ? (
                  <section className="mt-8 w-full max-w-[1220px]">
                    <DualRotatingImageColumns
                      images={cloveProductLaunchColumnOne}
                    />
                  </section>
                ) : isCloveSolo ? (
                  <section className="mt-8 w-full max-w-[1120px]">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.65fr_1fr]">
                        <img
                          src={soloCarouselMedia.video1}
                          alt="Clove SOLO video creative"
                          className="h-[430px] w-full rounded-xl object-contain"
                        />
                        <img
                          src={soloCarouselMedia.tag}
                          alt="Clove SOLO tag creative"
                          className="h-[430px] w-full rounded-xl object-contain"
                        />
                      </div>
                      <SoloImageCarousel
                        images={[
                          soloCarouselMedia.lana,
                          soloCarouselMedia.sabina,
                          soloCarouselMedia.tom,
                          soloCarouselMedia.tag2,
                          soloCarouselMedia.tag3,
                          soloCarouselMedia.shoes,
                        ]}
                      />
                    </div>
                  </section>
                ) : (
                  <>
                    <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 px-2 md:px-4">
                      <div
                        className={`mx-auto w-full ${
                          isClaraOne
                            ? "max-w-[1260px]"
                            : "max-w-[1160px]"
                        }`}
                      >
                      <img
                        src={isClaraOne ? "/images/CLARA/clara2.png" : "/images/EVERY%20BIZ/customer.jpg"}
                        alt={isClaraOne ? "Clara campaign visual" : "Customers"}
                        className={`mx-auto w-full rounded-xl object-contain ${
                          isClaraOne ? "h-[440px] md:h-[600px]" : "h-[320px] max-w-[1160px] border border-white/20 bg-black/20 p-1 md:h-[430px]"
                        }`}
                      />
                      </div>
                    </div>
                    {isClaraOne ? (
                      <section className="mt-8 w-full max-w-[1360px]">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                          <div className="lg:col-span-4">
                            <img
                              src="/images/CLARA/clara1.png"
                              alt="Clara collage image 1"
                              className="h-[340px] w-full rounded-xl object-contain md:h-[460px]"
                            />
                          </div>
                          <div className="lg:col-span-4">
                            <ScrollAutoPlayVideo
                              src="/images/CLARA/clara5small.mp4"
                              ariaLabel="Clara collage video 5"
                              className="h-[360px] w-full rounded-xl object-contain md:h-[500px]"
                            />
                          </div>
                          <div className="lg:col-span-4">
                            <img
                              src="/images/CLARA/cross.png"
                              alt="Clara collage image 2"
                              className="h-[340px] w-full rounded-xl object-contain md:h-[460px]"
                            />
                          </div>
                          <div className="lg:col-span-7">
                            <img
                              src="/images/CLARA/ig.png"
                              alt="Clara collage image 3"
                              className="h-[320px] w-full rounded-xl object-contain md:h-[420px]"
                            />
                          </div>
                          <div className="lg:col-span-5">
                            <img
                              src="/images/CLARA/mailer.png"
                              alt="Clara collage image 4"
                              className="h-[320px] w-full rounded-xl object-contain md:h-[420px]"
                            />
                          </div>
                        </div>
                      </section>
                    ) : (
                      <>
                        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                          <ScrollAutoPlayVideo
                            src="/images/EVERY%20BIZ/ooh.mp4"
                            ariaLabel="Out of home video"
                            className="h-[260px] w-full rounded-xl border border-white/20 object-cover md:h-[320px]"
                          />
                          <ScrollAutoPlayVideo
                            src="/images/EVERY%20BIZ/nyctrip.mp4"
                            ariaLabel="NYC trip video"
                            className="h-[260px] w-full rounded-xl border border-white/20 object-cover md:h-[320px]"
                          />
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                          <img
                            src="/images/EVERY%20BIZ/jw1.jpg"
                            alt="Justworks campaign image 1"
                            className="h-[240px] w-full rounded-xl border border-white/20 object-cover md:h-[280px]"
                          />
                          <img
                            src="/images/EVERY%20BIZ/jw5.jpg"
                            alt="Justworks campaign image 5"
                            className="h-[240px] w-full rounded-xl border border-white/20 object-cover md:h-[280px]"
                          />
                          <img
                            src="/images/EVERY%20BIZ/jw6.jpg"
                            alt="Justworks campaign image 6"
                            className="h-[240px] w-full rounded-xl border border-white/20 object-cover md:h-[280px]"
                          />
                        </div>
                        <section className="mt-16 w-full text-[#dbe8ff]">
                          <img
                            src="/images/EVERY%20BIZ/comps.png"
                            alt="Campaign comps"
                            className="mt-8 h-auto w-full rounded-xl border border-white/20 bg-black/20 object-contain p-1"
                          />
                        </section>
                      </>
                    )}
                  </>
                )}
              </>
            )}
            {isSmallBusinessBigJourney ? (
              <section className="mt-12 w-full">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <img src="/images/SXSW/sxsw1.png" alt="SXSW visual 1" className="h-[320px] w-full rounded-xl border border-white/20 object-cover" />
                    <img src="/images/SXSW/sxsw3.jpg" alt="SXSW visual 3" className="h-[320px] w-full rounded-xl border border-white/20 object-cover" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <img src="/images/SXSW/sxsw4.jpg" alt="SXSW visual 4" className="h-[420px] w-full rounded-xl border border-white/20 object-cover" />
                    <img src="/images/SXSW/sxss5.jpg" alt="SXSW visual 5" className="h-[420px] w-full rounded-xl border border-white/20 object-cover" />
                    <img src="/images/SXSW/sxsw6.jpg" alt="SXSW visual 6" className="h-[420px] w-full rounded-xl border border-white/20 object-cover" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="h-[420px] w-full overflow-hidden rounded-xl border border-white/20">
                      <img
                        src="/images/SXSW/sxsw7.jpg"
                        alt="SXSW visual 7"
                        className="h-full w-full scale-[1.28] object-cover"
                        style={{ objectPosition: "center 20%" }}
                      />
                    </div>
                    <img src="/images/SXSW/sxsw10.png" alt="SXSW visual 10" className="h-[420px] w-full rounded-xl border border-white/20 object-cover" />
                    <img src="/images/SXSW/sxsw11.png" alt="SXSW visual 11" className="h-[420px] w-full rounded-xl border border-white/20 object-cover" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <img src="/images/SXSW/sxsw8.jpg" alt="SXSW visual 8" className="h-[420px] w-full rounded-xl border border-white/20 object-cover" />
                    <img src="/images/SXSW/sxsw12.png" alt="SXSW visual 12" className="h-[420px] w-full rounded-xl border border-white/20 object-cover" />
                  </div>
                </div>
              </section>
            ) : null}
            <section className="mt-16 w-full max-w-[1120px] text-[#dbe8ff]">
              <h3 className={`text-left text-[clamp(1.6rem,3.4vw,3rem)] font-bold ${headlineFont.className}`}>
                The Result
              </h3>
              <p className={`mt-8 text-left text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed ${bodyFont.className}`}>
                {isCloveCoastToCoast ? (
                  <>
                    The relaunch reinforced Clove as a brand genuinely shaped by its community rather than one that simply marketed to it. Tackling the most-requested fix, quieter outsoles, drove a measurable lift in engagement, sales, and long-term customer retention. It was a reminder that sometimes the strongest campaign insight isn&apos;t a creative leap. It&apos;s simply proving you listened.
                  </>
                ) : isCloveProductLaunches ? (
                  <>
                    Colorways sold out in minutes. Fan favorites earned second and third relaunches. What began as a launch framework became a repeatable engine for community excitement and remains Clove&apos;s leading launch strategy today.
                    <br />
                    <br />
                    <strong>Brand Partners</strong>
                    <br />
                    La Colombe, Sanzo, Vacation Sunscreen, Van Leeuwen, Levain, Owala
                    <br />
                    <br />
                    <strong>Nonprofit Partners</strong>
                    <br />
                    Philadelphia FIGHT, Lynn Sage Breast Cancer Foundation, American Heart Association
                  </>
                ) : isClaraOne ? (
                  <>
                    The Clara 1 sold out within a few weeks of launch, drove the highest engagement rates in Clove&apos;s history, and laid the groundwork for what would become an ongoing collaboration. The campaign ran across:
                    <br />
                    <br />
                    <strong>Product</strong>: Sneaker boxes and collaboration cards
                    <br />
                    <strong>Website</strong>: Product description pages and long-form blog posts
                    <br />
                    <strong>Social</strong>: Instagram, Facebook, and TikTok
                    <br />
                    <strong>Digital ads</strong>: Google and Meta
                    <br />
                    <strong>Out-of-home ads</strong>: Bus placements in Atlanta, Clara&apos;s hometown
                    <br />
                    <br />
                    A personal note: the embroidered Mugunghwa carries the story of my own family, who immigrated and persevered through a foreign land. This launch will always hold a special place for me.
                  </>
                ) : isCloveSolo ? (
                  <>
                    Every sneaker style sold out within one week of launch. The demand was strong enough that Clove restocked and relaunched twice more in the following year. The campaign ran across:
                    <br />
                    <br />
                    <strong>Product</strong>: Sneaker boxes, cards, and matching totes
                    <br />
                    <strong>Website</strong>: Product description pages and long-form blog posts
                    <br />
                    <strong>Social</strong>: Instagram, Facebook, and TikTok
                    <br />
                    <strong>Digital ads</strong>: Google and Meta
                    <br />
                    <strong>Out-of-home ads</strong>: Digital monitors in New York City and bus stops in Philadelphia
                  </>
                ) : isSmallBusinessBigJourney ? (
                  <>
                    SXSW was consistently Justworks&apos; highest-performing event of the year, and 2025 proved it again through a meaningful influx of leads and conversions. The campaign stretched across every touchpoint of the takeover:
                    <br />
                    <br />
                    <strong>SXSW Expo</strong>: 10x20 booths, swag, digital monitors
                    <br />
                    <strong>SXSW Education Expo</strong>: 10x10 booths, swag, digital monitors
                    <br />
                    <strong>Caf&eacute; Takeover at Revoluci&oacute;n:</strong> Co-branded cups, stickers, table tents, signage, and a custom mural by local artist Fabian Rey
                    <br />
                    <strong>SXSW Customer Party:</strong> Digital monitors and branded event collateral
                    <br />
                    <strong>Private Event at Franklin&apos;s BBQ:</strong> Invites and signage
                    <br />
                    <strong>Email:</strong> Outreach to both current and prospective customers
                  </>
                ) : isRunYourBusiness ? (
                  <>
                    I developed a full bank of headlines and video scripts that ran across:
                    <br />
                    <strong>CTV</strong>: 8 original videos
                    <br />
                    <strong>Paid social and programmatic</strong>: Meta, Google,
                    LinkedIn, and display banners
                    <br />
                    <strong>Out-of-home</strong>: Bus, train, and digital placements across San Francisco, Miami, Los Angeles, and Denver
                  </>
                ) : isEveryBusinessStartsSmall ? (
                  <>
                    The campaign ran across a wide footprint:
                    <br />
                    <br />
                    <strong>Out-of-home</strong>: Billboards, subway placements, and digital screens across Austin, Los Angeles, San Francisco, Denver, New York, New Jersey, Connecticut, and Miami
                    <br />
                    <strong>Events</strong>: TechCrunch and StartUp Week
                    <br />
                    <strong>Paid media</strong>: Meta, Google, LinkedIn, and display banners
                    <br />
                    <strong>Video</strong>: YouTube and CTV
                    <br />
                    <strong>Website</strong>: Homepage refresh and new case study blog posts
                    <br />
                    <br />
                    A personal note: every handwritten element in the campaign came from a real small business founder in the Justworks community. And in a full-circle moment, this campaign reunited me with Clove, my former workplace and a proud Justworks customer, a reminder of why this work has always meant something more than marketing.
                  </>
                ) : (
                  <>
                    The All-In-One Solution videos ran across CTV, YouTube, LinkedIn, Meta, and Google, strengthening click-through and engagement during historically underperforming months. The work also extended into internal company events and communications.
                  </>
                )}
              </p>
              {isRunYourBusiness || isSmallBusinessBigJourney || isCloveSolo || isClaraOne || isCloveCoastToCoast || isCloveProductLaunches || isEveryBusinessStartsSmall ? null : (
                <p className={`mt-8 pb-6 text-left text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed ${bodyFont.className}`}>
                  {isAllInOne
                    ? "A standout moment: the campaign featured real Justworks customer service representatives, bringing an unexpected human dimension to the brand that hadn't existed before."
                    : "Special shoutout: We got to feature real customer service representatives, humanizing Justworks in a newfound way for the first time."}
                </p>
              )}
            </section>
            {isRunYourBusiness ? (
              <section className="mt-12 w-full max-w-[1120px] space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <img
                    src="/images/RYB/ooh/Screenshot%202026-03-02%20at%204.40.42%E2%80%AFPM.png"
                    alt="Run Your Business out-of-home visual 1"
                    className="h-[240px] w-full rounded-xl border border-white/20 bg-black/20 object-contain p-1 md:h-[280px]"
                  />
                  <img
                    src="/images/RYB/ooh/Screenshot%202026-03-12%20at%203.48.56%E2%80%AFPM.png"
                    alt="Run Your Business out-of-home visual 2"
                    className="h-[240px] w-full rounded-xl border border-white/20 bg-black/20 object-contain p-1 md:h-[280px]"
                  />
                </div>
                <img
                  src="/images/RYB/ooh/ooh3.png"
                  alt="Run Your Business out-of-home visual 3"
                  className="h-[240px] w-full rounded-xl border border-white/20 bg-black/20 object-contain p-1 md:h-[320px]"
                />
              </section>
            ) : null}
            {isAllInOne ? (
              <section className="mt-12 w-full">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <img
                    src="/images/ONE%20SOLUTION/sm6.gif"
                    alt="All-In-One creative 5"
                    className="h-[220px] w-full rounded-xl border border-white/20 object-cover md:h-[280px]"
                  />
                  <img
                    src="/images/ONE%20SOLUTION/sm7.png"
                    alt="All-In-One creative 6"
                    className="h-[220px] w-full rounded-xl border border-white/20 object-cover md:h-[280px]"
                  />
                </div>
              </section>
            ) : !isRunYourBusiness &&
              !isSmallBusinessBigJourney &&
              !isCloveSolo &&
              !isClaraOne &&
              !isCloveCoastToCoast &&
              !isCloveProductLaunches ? (
              <section className="mt-12 w-full">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <img
                    src="/images/EVERY%20BIZ/jw7.png"
                    alt="Justworks campaign image 7"
                    className="h-[220px] w-full rounded-xl border border-white/20 object-cover"
                  />
                  <img
                    src="/images/EVERY%20BIZ/jw8.png"
                    alt="Justworks campaign image 8"
                    className="h-[220px] w-full rounded-xl border border-white/20 object-cover"
                  />
                  <img
                    src="/images/EVERY%20BIZ/jw9.png"
                    alt="Justworks campaign image 9"
                    className="h-[220px] w-full rounded-xl border border-white/20 object-cover"
                  />
                  <img
                    src="/images/EVERY%20BIZ/jw10.png"
                    alt="Justworks campaign image 10"
                    className="h-[220px] w-full rounded-xl border border-white/20 object-cover"
                  />
                </div>
              </section>
            ) : null}
          </section>
        </section>
      </div>
    </main>
  );
}
