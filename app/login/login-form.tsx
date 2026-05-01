"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PillButton } from "@/components/pill-button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(
          error.message === "Invalid login credentials"
            ? "Ongeldig e-mailadres of wachtwoord."
            : error.message,
        );
        setLoading(false);
        return;
      }

      router.replace(next);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Onbekende fout";
      setError(
        message.includes("URL and API key")
          ? "De server is nog niet correct geconfigureerd. Neem contact op met de beheerder."
          : message,
      );
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Login formulier"
      className="space-y-7"
    >
      <Field
        id="email"
        label="E-mailadres"
        type="email"
        autoComplete="email"
        placeholder="u@bedrijf.be"
        value={email}
        onChange={setEmail}
        required
      />
      <Field
        id="password"
        label="Wachtwoord"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
        required
      />

      {error ? (
        <p className="text-[13px] text-red-700/90" role="alert">
          {error}
        </p>
      ) : null}

      <div className="pt-2">
        <PillButton type="submit" disabled={loading} aria-busy={loading}>
          {loading ? "Bezig met inloggen…" : "Log in"}
        </PillButton>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  placeholder,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
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
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-3 w-full border-0 border-b border-ink-hair bg-transparent px-0 py-2 text-base text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
