import Image from "next/image";
import Link from "next/link";
import { PillButton, PillLink } from "@/components/pill-button";

const CATEGORIES = [
  {
    href: "/aanbiedingen#goodies",
    kicker: "Ontdek",
    title: "Goodies",
    tagline: "Branded attenties die bijblijven bij uw klanten.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90",
    alt: "Een Renocheck goodie voor bouwprofessionals",
  },
  {
    href: "/aanbiedingen#hometrends",
    kicker: "Ontdek",
    title: "Hometrends",
    tagline: "Eigentijdse interieurcollecties voor uw projecten.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
    alt: "Hometrends collectie Renocheck",
  },
  {
    href: "/aanbiedingen#house-home",
    kicker: "Ontdek",
    title: "House & Home",
    tagline: "Tijdloze klassiekers voor elke woning.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=90",
    alt: "House & Home collectie Renocheck",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Manifesto />
      <PullQuote />
      <Catalog />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center px-6 pb-16 pt-28 sm:px-8 md:px-16 md:py-20 lg:px-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid items-center gap-14 md:grid-cols-12 md:gap-16">
          <div className="min-w-0 md:col-span-7">
            <p className="enter-up delay-300 text-[18px] text-ink-soft">
              Renocheck · Voor bouwprofessionals
            </p>

            <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,6.5vw,5.75rem)] font-medium leading-[0.98] text-ink">
              Alles voor uw bureau,<br />
              op één <span className="italic text-gold-dark">plek</span>.
            </h1>

            <p className="enter-up delay-500 mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
              Producten, planners en events voor bouwprofessionals. Alles op
              één plek.
            </p>

            <div className="enter-up delay-600 mt-10">
              <PillLink href="#collecties">Ontdek de collecties</PillLink>
            </div>
          </div>

          <figure className="enter-fade delay-700 min-w-0 md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-ink/5">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=90"
                alt="Renocheck — sfeerbeeld van een bouwprofessional aan het werk"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              <span aria-hidden="true" className="h-px w-8 bg-gold-dark/60" />
              Collectie · 2026
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section
      id="collecties"
      aria-labelledby="collecties-title"
      className="relative py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[18px] text-ink-soft">Onze collecties</p>
            <h2
              id="collecties-title"
              className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.05] text-ink"
            >
              Drie werelden,{" "}
              <span className="italic text-gold-dark">één</span> selectie.
            </h2>
          </div>
          <Link
            href="/aanbiedingen"
            className="hidden text-[13px] font-medium uppercase tracking-[0.28em] text-ink-muted transition-colors hover:text-ink md:inline-block"
          >
            Alles bekijken →
          </Link>
        </div>

        <ul className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
          {CATEGORIES.map((cat, i) => (
            <li
              key={cat.href}
              className="enter-up"
              style={{ animationDelay: `${700 + i * 150}ms` }}
            >
              <CategoryCard {...cat} index={i + 1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CategoryCard({
  href,
  title,
  tagline,
  image,
  alt,
  index,
}: {
  href: string;
  kicker: string;
  title: string;
  tagline: string;
  image: string;
  alt: string;
  index: number;
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
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
            {String(index).padStart(2, "0")} — Collectie
          </p>
          <h3 className="mt-3 font-display text-[40px] font-medium italic leading-[0.98] text-ink md:text-[48px]">
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

function Manifesto() {
  return (
    <section
      aria-labelledby="visie-title"
      className="relative py-24 md:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">
              Over Renocheck
            </p>
            <h2
              id="visie-title"
              className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.02] text-ink"
            >
              Eén platform voor{" "}
              <span className="italic text-gold-dark">elk</span> vak.
            </h2>
            <div className="mt-10">
              <PillLink href="/login">Word Renocheck lid</PillLink>
            </div>
          </div>

          <div className="min-w-0 space-y-6 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[21px]">
              Goodies, planners, signage en interieurcollecties uit Hometrends
              en House &amp; Home — samengebracht in één platform.
            </p>
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[21px]">
              Eén ledenportaal voor uw bestellingen, events en notificaties —
              via e-mail, WhatsApp of bericht.
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
      className="relative py-28 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <span
            aria-hidden="true"
            className="mx-auto block h-px w-12 bg-gold-dark/60"
          />
          <blockquote className="mt-10 font-display text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[1.1] text-ink">
            Het vak verdient{" "}
            <span className="italic text-gold-dark">één</span> thuis.
          </blockquote>
          <p className="mt-10 text-[12px] font-medium uppercase tracking-[0.32em] text-ink-muted">
            Het Renocheck idee
          </p>
        </div>
      </div>
    </section>
  );
}

function Catalog() {
  return (
    <section
      aria-labelledby="catalogus-title"
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

          <div className="relative grid gap-14 p-10 md:grid-cols-12 md:items-center md:gap-16 md:p-16 lg:p-20">
            <div className="min-w-0 md:col-span-6">
              <p className="text-[18px] text-ink-soft">
                Catalogus
              </p>
              <h2
                id="catalogus-title"
                className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[1.02] text-ink"
              >
                De volledige{" "}
                <span className="italic text-gold-dark">Renocheck</span>{" "}
                catalogus in uw mailbox.
              </h2>
              <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-ink-soft">
                De volledige selectie met prijzen en beschikbaarheid — direct
                in uw mailbox.
              </p>
            </div>

            <form
              className="min-w-0 md:col-span-6 md:max-w-lg md:justify-self-end"
              aria-label="Catalogus aanvragen"
            >
              <div className="rounded-[28px] bg-ivory/80 p-8 ring-1 ring-ink-hair/50 backdrop-blur">
                <div className="space-y-6">
                  <FieldInput
                    id="bedrijf"
                    label="Naam bedrijf"
                    type="text"
                    placeholder="Uw bedrijf"
                  />
                  <FieldInput
                    id="email"
                    label="E-mailadres"
                    type="email"
                    placeholder="u@bedrijf.be"
                  />
                  <div className="pt-2">
                    <PillButton>Ontvang de catalogus</PillButton>
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
