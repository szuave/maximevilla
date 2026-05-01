import type { Metadata } from "next";
import Image from "next/image";
import { PillLink } from "@/components/pill-button";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Bouwers",
  description:
    "Bent u aan het bouwen of renoveren? Het Renocheck netwerk brengt u in contact met betrouwbare architecten en vakspecialisten in uw regio.",
  alternates: { canonical: "/bouwers" },
  openGraph: {
    title: "Voor bouwers · Renocheck",
    description:
      "Vind de juiste partners voor uw bouw- of renovatieproject — via één netwerk.",
    url: "/bouwers",
    type: "website",
  },
  twitter: {
    title: "Voor bouwers · Renocheck",
    description:
      "Vind de juiste partners voor uw bouw- of renovatieproject — via één netwerk.",
  },
};

const STEPS = [
  {
    nr: "01",
    title: "U vertelt uw project",
    body: "Renovatie, nieuwbouw of interieur — geef de regio en de scope aan, wij doen de rest.",
  },
  {
    nr: "02",
    title: "Wij stellen partners voor",
    body: "Een geselecteerde architect en vakspecialisten uit uw regio die elkaar al kennen.",
  },
  {
    nr: "03",
    title: "U beslist samen",
    body: "Eén kennismakingsgesprek, één coherent voorstel — geen versnipperde offertes.",
  },
];

export default function BouwersPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Bouwers", url: "/bouwers" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Voor bouwers
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Eén ingang voor uw{" "}
          <span className="italic text-gold-dark">project</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Bouwen of renoveren is een puzzel van architecten, aannemers en
          tientallen vakspecialisten. Renocheck brengt deze partners samen
          per regio — zodat u één netwerk hebt in plaats van twintig
          contacten.
        </p>
      </section>

      <section
        aria-labelledby="visual-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-7">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] bg-ink/5">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90"
                  alt="Renovatieproject in uitvoering"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 md:col-span-5">
              <p className="text-[18px] text-ink-soft">Waarom een netwerk</p>
              <h2
                id="visual-title"
                className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Partners die elkaar{" "}
                <span className="italic text-gold-dark">kennen</span>.
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  Onze partners werken niet voor het eerst samen. Ze delen
                  ervaringen, planningen en standaarden — wat zich vertaalt
                  in vlottere werven en samenhangender resultaten voor u.
                </p>
                <p>
                  Eén regionale kring vakmensen, één gedeelde standaard van
                  vakkennis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="steps-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Hoe het werkt
            </p>
            <h2
              id="steps-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Drie stappen tot uw{" "}
              <span className="italic text-gold-dark">team</span>.
            </h2>
          </div>

          <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
            {STEPS.map((s) => (
              <li key={s.nr} className="min-w-0">
                <span className="font-display text-[56px] font-light leading-none text-gold-dark md:text-[72px]">
                  {s.nr}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-12 bg-ink-hair"
                />
                <h3 className="mt-6 font-display text-[28px] font-medium leading-[1.1] text-ink md:text-[32px]">
                  {s.title}
                </h3>
                <p className="mt-5 text-[16px] leading-[1.7] text-ink-soft">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[1280px] px-6 md:mt-44 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Klaar om te starten</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Vertel ons over uw{" "}
              <span className="italic text-gold-dark">project</span>.
            </h2>
            <div className="mt-10">
              <PillLink href="/contact">Neem contact op</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Eén bericht volstaat. We beluisteren uw project, stemmen af
              welke regio en rubrieken nodig zijn, en stellen een team voor
              dat past.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
