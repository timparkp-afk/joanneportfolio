import Link from "next/link";

type CampaignCard = {
  name: string;
  image: string;
  href: string;
  external?: boolean;
};

const campaignCards: CampaignCard[] = [
  {
    name: "Small Business, Big Journey",
    image: "/images/SXSW/sxsw2.jpg",
    href: "https://joyhwangbo.com/work/small-business-big-journey",
    external: true,
  },
  {
    name: "Every Business Starts Small",
    image: "/images/EVERY BIZ/jw1.jpg",
    href: "https://joyhwangbo.com/work/every-business-starts-small",
    external: true,
  },
  {
    name: "All-In-One Justworks",
    image: "/images/ONE SOLUTION/sm9.webp",
    href: "https://joyhwangbo.com/work/the-all-in-one-justworks",
    external: true,
  },
  {
    name: "SOLO",
    image: "/images/EVERY BIZ/jw3.png",
    href: "https://joyhwangbo.com/work/solo",
    external: true,
  },
  {
    name: "Clara 1",
    image: "/images/SXSW/sxsw8.jpg",
    href: "https://joyhwangbo.com/work/clara1",
    external: true,
  },
  {
    name: "Organic Social",
    image: "/images/SXSW/sxsw9.jpg",
    href: "https://joyhwangbo.com/work/socialmedia",
    external: true,
  },
];

export default function CampaignsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 text-[#0047ff]">
      <header className="mb-10 flex items-center justify-between text-sm font-medium uppercase tracking-wide">
        <Link href="/">Joanne</Link>
        <div className="flex items-center gap-8">
          <Link href="/about">About</Link>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=johwangbo@gmail.com">Contact</a>
        </div>
      </header>

      <section className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold md:text-5xl">Campaigns</h1>
        <p className="text-sm md:text-base">
          Click a card to open the project. Hover to reveal the title.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campaignCards.map((card) => (
          <a
            key={card.name}
            href={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noopener noreferrer" : undefined}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-[#0047ff]/30 bg-white/60 shadow-[0_12px_24px_rgba(0,71,255,0.15)]"
          >
            <img
              src={card.image}
              alt={card.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#0047ff]/12 opacity-0 transition group-hover:opacity-100" />
            <div className="absolute inset-x-3 bottom-3 rounded-full bg-white/80 px-4 py-2 text-center text-sm font-medium opacity-0 backdrop-blur-md transition group-hover:opacity-100">
              {card.name}
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
