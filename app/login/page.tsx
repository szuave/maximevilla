import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in op het Renocheck partner-portaal.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main id="main" className="relative flex min-h-screen flex-col lg:flex-row">
      {/* ---------- Visual side ---------- */}
      <aside
        aria-hidden="true"
        className="relative hidden overflow-hidden lg:flex lg:w-[52%] lg:flex-col lg:justify-between lg:p-12 xl:p-16"
      >
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90"
          alt=""
          fill
          sizes="52vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/70 via-ink/55 to-ink/80" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-gold-dark/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-[440px] w-[440px] rounded-full bg-gold/15 blur-3xl" />

        {/* Top: back link */}
        <Link
          href="/"
          className="relative inline-flex items-center gap-2 self-start text-[13px] font-medium uppercase tracking-[0.28em] text-cream/80 transition-colors hover:text-gold-soft"
        >
          <svg
            viewBox="0 0 16 10"
            className="h-3 w-4 rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M1 5h14M11 1l4 4-4 4" />
          </svg>
          Terug naar de site
        </Link>

        {/* Middle: brand */}
        <Link
          href="/"
          aria-label="Renocheck — home"
          className="relative inline-flex items-baseline self-start font-display text-cream"
        >
          <span className="text-[34px] font-medium leading-none tracking-tight">
            Reno
          </span>
          <span className="text-[34px] font-medium italic leading-none tracking-tight text-gold-soft">
            check
          </span>
          <span
            aria-hidden="true"
            className="ml-1.5 inline-block h-1.5 w-1.5 translate-y-[-7px] rounded-full bg-gold-soft opacity-90"
          />
        </Link>

        {/* Bottom: editorial quote */}
        <div className="relative max-w-md text-cream">
          <span
            aria-hidden="true"
            className="block h-px w-12 bg-gold-soft/80"
          />
          <blockquote className="mt-7 font-display text-[34px] font-medium leading-[1.15] xl:text-[40px]">
            Vakwerk is{" "}
            <span className="italic text-gold-soft">mensen</span>werk.
          </blockquote>
          <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.32em] text-cream/70">
            Renocheck · Partner portaal
          </p>
        </div>
      </aside>

      {/* ---------- Form side ---------- */}
      <section className="relative flex flex-1 flex-col px-6 py-12 sm:px-10 lg:px-20 lg:py-16 xl:px-28">
        {/* Mobile only: back link + logo (visual side is hidden on mobile) */}
        <div className="flex items-center justify-between gap-6 lg:hidden">
          <Link
            href="/"
            className="enter-up delay-200 inline-flex items-center gap-2 text-[13px] text-ink-muted transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 16 10"
              className="h-3 w-4 rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 5h14M11 1l4 4-4 4" />
            </svg>
            Terug naar de site
          </Link>

          <Link
            href="/"
            aria-label="Renocheck — home"
            className="enter-up delay-200 inline-flex items-baseline font-display text-ink"
          >
            <span className="text-[24px] font-medium leading-none tracking-tight">
              Reno
            </span>
            <span className="text-[24px] font-medium italic leading-none tracking-tight text-gold-dark">
              check
            </span>
          </Link>
        </div>

        <div className="my-auto w-full max-w-sm py-12 lg:max-w-md">
          <p className="enter-up delay-300 text-[11px] font-medium uppercase tracking-[0.32em] text-ink-muted">
            Inloggen
          </p>
          <h1 className="enter-up delay-400 mt-4 font-display text-[clamp(2.25rem,4vw,3.25rem)] font-medium leading-[1.05] text-ink">
            Welkom{" "}
            <span className="italic text-gold-dark">terug</span>.
          </h1>
          <p className="enter-up delay-500 mt-5 text-[15px] leading-[1.6] text-ink-soft">
            Log in op uw partner-account om uw blog en agenda bij te werken.
          </p>

          <div className="enter-up delay-600 mt-10">
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>

          <p className="mt-12 text-[13px] text-ink-muted">
            Geen account?{" "}
            <Link
              href="/contact"
              className="font-medium text-ink-soft underline-offset-4 transition-colors hover:text-gold-dark hover:underline"
            >
              Vraag een partnerschap aan
            </Link>
            .
          </p>
        </div>

        {/* Bottom: copyright/footer note */}
        <p className="mt-auto pt-12 text-[11px] text-ink-muted">
          © {new Date().getFullYear()} Renocheck. Alle rechten voorbehouden.
        </p>
      </section>
    </main>
  );
}
