export type Project = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  details: string;
  year: string;
  videoLoopStart?: number;
  videoLoopEnd?: number;
};

export const projects: Project[] = [
  {
    slug: "justworks-every-business-starts-small",
    title: "Justworks: Every Business Starts Small",
    summary: "Brand awareness campaign bringing customer stories to life",
    image: "/images/EVERY%20BIZ/jw_thejourney_30_16x9_v2%20(1080p).mp4",
    details:
      "Use this page to add your full case study: Brief, concept, channels, execution, and results.",
    year: "2026",
  },
  {
    slug: "justworks-all-in-one-solution",
    title: "Justworks: All-In-One Solution",
    summary: "Bridging the gap between the brand's products",
    image: "/images/ONE%20SOLUTION/bigvid2.mp4",
    details:
      "Use this page to add your full case study: Brief, strategy, copy approach, and outcomes.",
    year: "2026",
    videoLoopStart: 0,
    videoLoopEnd: 3,
  },
  {
    slug: "justworks-run-your-business",
    title: "Justworks: Run Your Business",
    summary: "Empowering all kinds of founders throughout the funnel",
    image: "/images/RYB/justworks_run_your_business%20(1080p).mp4",
    details:
      "Use this page to add your full case study: Audience, message architecture, and performance.",
    year: "2026",
    videoLoopStart: 21,
    videoLoopEnd: 28,
  },
  {
    slug: "justworks-small-business-big-journey",
    title: "Justworks: Small Business, Big Journey",
    summary: "The brand's takeover at South By Southwest",
    image: "/images/SXSW/sxsw2.jpg",
    details:
      "Use this page to add your full case study: Event strategy, onsite storytelling, and campaign impact.",
    year: "2026",
  },
  {
    slug: "clove-solo",
    title: "Clove: SOLO",
    summary: "The brand's most successful product collection launch",
    image: "/images/SOLO/solo.png",
    details:
      "Use this page to add your full case study: Launch narrative, integrated channels, and results.",
    year: "2025",
  },
  {
    slug: "clove-the-clara-1",
    title: "Clove: The Clara 1",
    summary: "The first sneaker collab in healthcare history",
    image: "/images/CLARA/intheair.png",
    details:
      "Use this page to add your full case study: Collaboration concept, copy system, and performance.",
    year: "2025",
  },
  {
    slug: "clove-2.0",
    title: "Clove: 2.0",
    summary: "The rebrand everyone's been waiting for",
    image: "/images/clove%202.0/clove%202.mp4",
    details:
      "Use this page to add your full case study: Community strategy, city activations, and outcomes.",
    year: "2025",
  },
  {
    slug: "clove-product-launches",
    title: "Clove: Product Launches",
    summary: "Leading copy and social strategy for over 50 product launches",
    image: "/images/clove/product%20launches/shoes.png",
    details:
      "Use this page to add your full case study: Launch mechanics, copy framework, and conversion results.",
    year: "2025",
  },
];
