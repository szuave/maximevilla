import type { Metadata } from "next";
import { PillButton } from "@/components/pill-button";
import {
  BreadcrumbSchema,
  ContactPageSchema,
} from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Renocheck voor producten, partnerships of vragen over het ledenportaal. Ons team antwoordt binnen één werkdag.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Renocheck",
    description:
      "Een vraag, voorstel of samenwerking? Het Renocheck team helpt u graag verder.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Contact · Renocheck",
    description:
      "Een vraag, voorstel of samenwerking? Het Renocheck team helpt u graag verder.",
  },
};

export default function ContactPage() {
  return (
    <section className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <ContactPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Contact
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Laat ons van u{" "}
          <span className="italic text-gold-dark">horen</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Een vraag, voorstel of samenwerking? Ons team antwoordt binnen één
          werkdag.
        </p>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-16">
          <aside className="min-w-0 md:col-span-5">
            <dl className="space-y-10">
              <ContactItem
                label="E-mail"
                value="info@renocheck.be"
                href="mailto:info@renocheck.be"
              />
              <ContactItem
                label="Telefoon"
                value="+32 (0)3 123 45 67"
                href="tel:+3231234567"
              />
              <ContactItem label="Kantoor" value="Renocheck" />
            </dl>
          </aside>

          <form
            className="min-w-0 md:col-span-7"
            aria-label="Contactformulier Renocheck"
          >
            <div className="rounded-[32px] border border-ink-hair/60 bg-cream-soft/60 p-8 backdrop-blur-sm md:p-12">
              <div className="grid gap-8 md:grid-cols-2">
                <Field label="Voornaam" id="firstname" placeholder="Jane" />
                <Field label="Achternaam" id="lastname" placeholder="Peeters" />
                <Field
                  label="Naam bedrijf"
                  id="bedrijf"
                  placeholder="Uw bedrijf"
                  full
                />
                <Field
                  label="E-mailadres"
                  id="email"
                  type="email"
                  placeholder="u@bedrijf.be"
                />
                <Field
                  label="Telefoon"
                  id="phone"
                  type="tel"
                  placeholder="+32…"
                />
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
                  >
                    Uw bericht
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Vertel ons waar we u mee kunnen helpen…"
                    className="mt-3 w-full resize-none border-0 border-b border-ink-hair bg-transparent px-0 py-2 text-base text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-10">
                <PillButton>Bericht versturen</PillButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  placeholder,
  type = "text",
  full,
}: {
  label: string;
  id: string;
  placeholder?: string;
  type?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : undefined}>
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

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-3 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-medium leading-[1.15] text-ink">
        {href ? (
          <a href={href} className="transition-colors hover:text-gold-dark">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
