import type { Metadata } from "next";
import Image from "next/image";
import { PillLink } from "@/components/pill-button";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Aanbiedingen",
  description:
    "Ontdek de volledige Renocheck collectie — goodies, Hometrends en House & Home — voor architecten, aannemers en interieurprofessionals.",
  alternates: { canonical: "/aanbiedingen" },
  openGraph: {
    title: "Aanbiedingen · Renocheck",
    description:
      "Goodies, planners, signage en interieurcollecties voor bouwprofessionals.",
    url: "/aanbiedingen",
    type: "website",
  },
  twitter: {
    title: "Aanbiedingen · Renocheck",
    description:
      "Goodies, planners, signage en interieurcollecties voor bouwprofessionals.",
  },
};

const COLLECTIONS = [
  {
    id: "goodies",
    kicker: "Collectie 01",
    title: "Attenties die",
    accent: "bijblijven",
    tail: ".",
    body: "Gebrande notitieboeken, drinkware en kleinere stukken die uw bureau vertegenwoordigen — uitgekozen voor materiaal en detail.",
    image:
      "https://images.unsplash.com/photo-1577003833619-76bbd7f82948?auto=format&fit=crop&w=1800&q=90",
    alt: "Goodies collectie Renocheck",
  },
  {
    id: "hometrends",
    kicker: "Collectie 02",
    title: "Eigentijdse stukken voor",
    accent: "moderne",
    tail: " interieurs.",
    body: "Een gelimiteerde selectie Hometrends — sculpturale vormen, zachte texturen en materialen met een hedendaagse hand.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90",
    alt: "Hometrends interieurcollectie",
  },
  {
    id: "house-home",
    kicker: "Collectie 03",
    title: "Tijdloze klassiekers voor",
    accent: "elk",
    tail: " project.",
    body: "House & Home brengt stukken met lange levensduur — massief hout, natuursteen en warme metalen, uitgekozen om te blijven.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=90",
    alt: "House & Home collectie",
  },
];

export default function AanbiedingenPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Aanbiedingen", url: "/aanbiedingen" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Collecties
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Drie collecties,{" "}
          <span className="italic text-gold-dark">één</span> platform.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Zorgvuldig samengestelde producten — van branded goodies tot
          tijdloze interieurstukken — voor elke bouwprofessional.
        </p>
      </section>

      {COLLECTIONS.map((c, i) => (
        <CollectionSection
          key={c.id}
          {...c}
          reverse={i % 2 === 1}
        />
      ))}

      <section className="mx-auto mt-32 max-w-[1280px] px-6 md:mt-48 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Catalogus</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Alles in{" "}
              <span className="italic text-gold-dark">één</span> document.
            </h2>
            <div className="mt-10">
              <PillLink href="/#catalogus-title">Vraag de catalogus aan</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              De volledige Renocheck selectie met prijzen, materialen en
              beschikbaarheid — direct in uw mailbox, op uw eigen moment.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

function CollectionSection({
  id,
  kicker,
  title,
  accent,
  tail,
  body,
  image,
  alt,
  reverse,
}: {
  id: string;
  kicker: string;
  title: string;
  accent: string;
  tail: string;
  body: string;
  image: string;
  alt: string;
  reverse: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative mt-32 scroll-mt-24 md:mt-48"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <div
            className={`min-w-0 md:col-span-5 ${
              reverse ? "md:order-2" : ""
            }`}
          >
            <p className="text-[18px] text-ink-soft">{kicker}</p>
            <h2
              id={`${id}-title`}
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
            >
              {title}{" "}
              <span className="italic text-gold-dark">{accent}</span>
              {tail}
            </h2>
            <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
              {body}
            </p>
          </div>

          <div className={`min-w-0 md:col-span-7 ${reverse ? "md:order-1" : ""}`}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-ink/5 md:aspect-[5/4]">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
