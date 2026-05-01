import Image from "next/image";
import Link from "next/link";
import { PillButton, PillLink } from "@/components/pill-button";

const PATHWAYS = [
  {
    href: "/bouwers",
    eyebrow: "Bouwen of verbouwen",
    title: "Vind uw team",
    tagline:
      "Eén ingang voor wie bouwt of renoveert — wij brengen u in contact met de juiste architecten en vakspecialisten in uw regio.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=90",
    alt: "Modern architectonisch gebouw — Renocheck bouwers",
  },
  {
    href: "/architecten",
    eyebrow: "Architectenbureau",
    title: "Voor de architect",
    tagline:
      "Een lokaal architectennetwerk dat samen aan tafel zit met de uitvoerders — voor projecten die kloppen van schets tot oplevering.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=90",
    alt: "Architect aan het werk met bouwplannen",
  },
  {
    href: "/vakspecialisten",
    eyebrow: "Veertien rubrieken",
    title: "Voor de vakman",
    tagline:
      "Per regio één vakspecialist per rubriek — van dakwerken tot zonnepanelen, één gedeelde standaard.",
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1600&q=90",
    alt: "Vakspecialist op de werf met materiaal",
  },
];

const REGIONS = [
  { name: "Knokke", slug: "knokke" },
  { name: "West-Vlaanderen", slug: "west-vlaanderen" },
  { name: "Oost-Vlaanderen", slug: "oost-vlaanderen" },
  { name: "Antwerpen", slug: "antwerpen" },
  { name: "Vlaams-Brabant", slug: "vlaams-brabant" },
  { name: "Limburg", slug: "limburg" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pathways />
      <Regions />
      <Manifesto />
      <PullQuote />
      <PartnerCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[88svh] flex-col justify-center px-6 pb-20 pt-32 sm:px-8 md:min-h-[100svh] md:px-16 md:py-20 lg:px-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="min-w-0 md:col-span-7">
            <p className="enter-up delay-300 text-[18px] text-ink-soft">
              Renocheck · Het bouwnetwerk
            </p>

            <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,6.5vw,5.75rem)] font-medium leading-[0.98] text-ink">
              Het netwerk dat<br />
              <span className="italic text-gold-dark">samen</span> bouwt.
            </h1>

            <p className="enter-up delay-500 mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
              Renocheck verbindt architecten en vakspecialisten per regio in
              Vlaanderen — partners die elkaar kennen, voordat uw project
              start.
            </p>

            <div className="enter-up delay-600 mt-10">
              <PillLink href="#pathways">Ontdek het netwerk</PillLink>
            </div>
          </div>

          <figure className="enter-fade delay-700 hidden min-w-0 md:col-span-5 md:block">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-ink/5">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=90"
                alt="Architecten en vakspecialisten in overleg over een bouwproject"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              <span aria-hidden="true" className="h-px w-8 bg-gold-dark/60" />
              Het netwerk · 2026
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Pathways() {
  return (
    <section
      id="pathways"
      aria-labelledby="pathways-title"
      className="relative scroll-mt-24 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[18px] text-ink-soft">Het netwerk</p>
            <h2
              id="pathways-title"
              className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.05] text-ink"
            >
              Drie ingangen,{" "}
              <span className="italic text-gold-dark">één</span> netwerk.
            </h2>
          </div>
          <Link
            href="/over-ons"
            className="hidden text-[13px] font-medium uppercase tracking-[0.28em] text-ink-muted transition-colors hover:text-ink md:inline-block"
          >
            Hoe werkt het →
          </Link>
        </div>

        <ul className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
          {PATHWAYS.map((p, i) => (
            <li
              key={p.href}
              className="enter-up"
              style={{ animationDelay: `${700 + i * 150}ms` }}
            >
              <PathwayCard {...p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PathwayCard({
  href,
  eyebrow,
  title,
  tagline,
  image,
  alt,
}: {
  href: string;
  eyebrow: string;
  title: string;
  tagline: string;
  image: string;
  alt: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${title} — ${tagline}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-ink/5">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority
        />
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-ink-muted">
            {eyebrow}
          </p>
          <h3 className="mt-3 font-display text-[34px] font-medium leading-[1.05] text-ink md:text-[40px]">
            {title}
          </h3>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink-hair/70 text-ink-soft transition-all duration-300 group-hover:border-gold-dark group-hover:bg-gold-dark group-hover:text-cream"
        >
          <svg
            viewBox="0 0 16 10"
            className="h-3 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 5h14M11 1l4 4-4 4" />
          </svg>
        </span>
      </div>

      <p className="mt-4 max-w-xs text-[14px] leading-[1.6] text-ink-soft">
        {tagline}
      </p>
    </Link>
  );
}

function Regions() {
  return (
    <section
      aria-labelledby="regions-title"
      className="relative py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Regio's</p>
            <h2
              id="regions-title"
              className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Een netwerk in{" "}
              <span className="italic text-gold-dark">elke</span> regio.
            </h2>
            <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-ink-soft">
              Per regio een vaste selectie van architecten en veertien
              vakspecialisten — één per rubriek. Lokaal, samen, op maat van uw
              project.
            </p>
          </div>

          <ul className="min-w-0 md:col-span-7">
            {REGIONS.map((r, i) => (
              <li key={r.slug}>
                <Link
                  href="/vakspecialisten"
                  className={`group flex items-center justify-between gap-6 py-5 md:py-6 ${
                    i === 0 ? "border-t border-ink-hair/40" : ""
                  } border-b border-ink-hair/40`}
                >
                  <span className="font-display text-[24px] font-medium leading-tight text-ink transition-colors group-hover:text-gold-dark md:text-[30px]">
                    {r.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-hair/70 text-ink-soft transition-all duration-300 group-hover:border-gold-dark group-hover:bg-gold-dark group-hover:text-cream"
                  >
                    <svg
                      viewBox="0 0 16 10"
                      className="h-3 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 5h14M11 1l4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section
      aria-labelledby="visie-title"
      className="relative py-24 md:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Over Renocheck</p>
            <h2
              id="visie-title"
              className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.02] text-ink"
            >
              Eén netwerk voor{" "}
              <span className="italic text-gold-dark">elk</span> bouwproject.
            </h2>
            <div className="mt-10">
              <PillLink href="/login">Word partner</PillLink>
            </div>
          </div>

          <div className="min-w-0 space-y-6 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[21px]">
              Een bouwproject is een puzzel van vakken. Renocheck verbindt
              architecten en vakspecialisten in één regio — partners die
              elkaar al kennen voordat uw project start.
            </p>
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[21px]">
              Geen versnipperde offertes, geen tegenstrijdige planningen.
              Eén kring vakmensen die samen aan een project werken — van
              eerste schets tot oplevering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PullQuote() {
  return (
    <section
      aria-label="Renocheck manifest"
      className="relative py-20 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <span
            aria-hidden="true"
            className="mx-auto block h-px w-12 bg-gold-dark/60"
          />
          <blockquote className="mt-10 font-display text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[1.1] text-ink">
            Vakwerk is{" "}
            <span className="italic text-gold-dark">mensen</span>werk.
          </blockquote>
          <p className="mt-10 text-[12px] font-medium uppercase tracking-[0.32em] text-ink-muted">
            Het Renocheck idee
          </p>
        </div>
      </div>
    </section>
  );
}

function PartnerCTA() {
  return (
    <section
      aria-labelledby="partner-title"
      className="relative pb-14 pt-10 md:pt-14"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="relative overflow-hidden rounded-[40px] bg-cream-warm ring-1 ring-ink-hair/40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gold-soft/40 blur-3xl"
          />

          <div className="relative grid gap-10 p-7 sm:p-10 md:grid-cols-12 md:items-center md:gap-16 md:p-16 lg:p-20">
            <div className="min-w-0 md:col-span-6">
              <p className="text-[18px] text-ink-soft">Word partner</p>
              <h2
                id="partner-title"
                className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[1.02] text-ink"
              >
                Sluit aan bij het{" "}
                <span className="italic text-gold-dark">Renocheck</span>{" "}
                netwerk.
              </h2>
              <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-ink-soft">
                Per regio nemen we één vakspecialist per rubriek op. Laat uw
                gegevens achter en we contacteren u voor een kennismaking.
              </p>
            </div>

            <form
              className="min-w-0 md:col-span-6 md:max-w-lg md:justify-self-end"
              aria-label="Partner aanvraag"
            >
              <div className="rounded-[28px] bg-ivory/80 p-6 ring-1 ring-ink-hair/50 backdrop-blur sm:p-8">
                <div className="space-y-6">
                  <FieldInput
                    id="bedrijf"
                    label="Naam bedrijf"
                    type="text"
                    placeholder="Uw bedrijf"
                  />
                  <FieldInput
                    id="rubriek"
                    label="Rubriek"
                    type="text"
                    placeholder="Bv. dakwerken, sanitair, elektriciteit"
                  />
                  <FieldInput
                    id="email"
                    label="E-mailadres"
                    type="email"
                    placeholder="u@bedrijf.be"
                  />
                  <div className="pt-2">
                    <PillButton>Stuur aanvraag</PillButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========= small reusable pieces ========= */

function FieldInput({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full border-0 border-b border-ink-hair bg-transparent px-0 py-2 text-base text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
