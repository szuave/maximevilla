import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Beheer",
  robots: { index: false, follow: false },
};

const RUBRIEKEN = [
  "Dakwerken",
  "Ramen & deuren",
  "Elektriciteit",
  "Sanitair",
  "Verwarming & airco",
  "Tegels & natuursteen",
  "Schrijnwerk",
  "Schilderwerken",
  "Vloeren",
  "Isolatie",
  "Tuinaanleg",
  "Zonnepanelen",
  "Zwembaden",
  "Keukens",
];

const REGIONS = [
  "knokke",
  "west-vlaanderen",
  "oost-vlaanderen",
  "antwerpen",
  "vlaams-brabant",
  "limburg",
];

type Profile = {
  id: string;
  full_name: string | null;
  company: string | null;
  region: string | null;
  rubriek: string | null;
  partner_type: string | null;
  role: "admin" | "partner";
  created_at: string;
};

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") redirect("/dashboard");
  return user.id;
}

async function inviteUser(formData: FormData) {
  "use server";
  await requireAdmin();

  const email = String(formData.get("email") ?? "").trim();
  const full_name = String(formData.get("full_name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim();
  const rubriek = String(formData.get("rubriek") ?? "").trim();
  const partner_type = String(formData.get("partner_type") ?? "").trim();

  if (!email) {
    redirect("/dashboard/beheer?error=missing-email");
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name: full_name || null,
      company: company || null,
      region: region || null,
      rubriek: rubriek || null,
      partner_type: partner_type || null,
    },
  });

  if (error) {
    redirect(`/dashboard/beheer?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard/beheer");
  redirect("/dashboard/beheer?invited=" + encodeURIComponent(email));
}

async function setRole(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  const role = String(formData.get("role"));
  if (!id || (role !== "admin" && role !== "partner")) return;

  const supabase = await createClient();
  await supabase.from("profiles").update({ role }).eq("id", id);
  revalidatePath("/dashboard/beheer");
}

async function deleteUser(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  if (!id) return;

  const admin = createAdminClient();
  await admin.auth.admin.deleteUser(id);
  revalidatePath("/dashboard/beheer");
}

export default async function BeheerPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; invited?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, company, region, rubriek, partner_type, role, created_at")
    .order("created_at", { ascending: false })
    .returns<Profile[]>();

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <header>
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Beheer · admin
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          Partners{" "}
          <span className="italic text-gold-dark">beheren</span>.
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink-soft">
          Voeg nieuwe partners toe en beheer rollen. Nieuwe partners
          ontvangen een uitnodiging per e-mail om hun wachtwoord in te
          stellen.
        </p>
      </header>

      {params?.error ? (
        <div className="mt-8 rounded-2xl border border-red-300/60 bg-red-50/60 p-5 text-[14px] text-red-800">
          {params.error === "missing-email"
            ? "Vul een e-mailadres in."
            : `Er ging iets mis: ${params.error}`}
        </div>
      ) : null}

      {params?.invited ? (
        <div className="mt-8 rounded-2xl border border-green-300/60 bg-green-50/60 p-5 text-[14px] text-green-900">
          Uitnodiging verstuurd naar {params.invited}.
        </div>
      ) : null}

      <section className="mt-12 max-w-3xl rounded-3xl border border-ink-hair/60 bg-cream-soft/30 p-7 md:p-10">
        <h2 className="font-display text-[28px] font-medium leading-[1.15] text-ink md:text-[32px]">
          Nieuwe partner uitnodigen
        </h2>
        <form action={inviteUser} className="mt-8 space-y-6">
          <Field id="email" label="E-mailadres" type="email" required />
          <Field id="full_name" label="Naam" />
          <Field id="company" label="Bedrijf" />
          <div className="grid gap-6 md:grid-cols-2">
            <Select
              id="partner_type"
              label="Type partner"
              options={[
                { value: "", label: "—" },
                { value: "architect", label: "Architect" },
                { value: "vakspecialist", label: "Vakspecialist" },
              ]}
            />
            <Select
              id="region"
              label="Regio"
              options={[
                { value: "", label: "—" },
                ...REGIONS.map((r) => ({ value: r, label: capitalize(r) })),
              ]}
            />
          </div>
          <Select
            id="rubriek"
            label="Rubriek (alleen voor vakspecialisten)"
            options={[
              { value: "", label: "—" },
              ...RUBRIEKEN.map((r) => ({ value: r, label: r })),
            ]}
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-[16px] font-medium text-cream transition-colors hover:bg-gold-dark"
          >
            Uitnodiging versturen
          </button>
        </form>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-[28px] font-medium leading-[1.15] text-ink md:text-[32px]">
          Alle partners
        </h2>
        <ul className="mt-8 divide-y divide-ink-hair/50 border-y border-ink-hair/50">
          {(profiles ?? []).map((p) => (
            <li key={p.id} className="grid gap-4 py-6 md:grid-cols-12 md:items-center md:gap-6">
              <div className="md:col-span-5">
                <p className="font-display text-[20px] font-medium leading-tight text-ink md:text-[22px]">
                  {p.full_name ?? p.company ?? "Naamloos"}
                </p>
                <p className="mt-1 text-[13px] text-ink-muted">
                  {p.partner_type ?? "—"} ·{" "}
                  {p.region ? capitalize(p.region) : "—"}{" "}
                  {p.rubriek ? `· ${p.rubriek}` : ""}
                </p>
              </div>
              <div className="md:col-span-3">
                <p className="text-[12px] uppercase tracking-[0.28em] text-ink-muted">
                  Rol
                </p>
                <p className="mt-1 text-[14px] text-ink">{p.role}</p>
              </div>
              <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                <form action={setRole}>
                  <input type="hidden" name="id" value={p.id} />
                  <input
                    type="hidden"
                    name="role"
                    value={p.role === "admin" ? "partner" : "admin"}
                  />
                  <button
                    type="submit"
                    className="rounded-full border border-ink-hair/70 bg-cream/60 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-gold-dark"
                  >
                    Maak {p.role === "admin" ? "partner" : "admin"}
                  </button>
                </form>
                <form action={deleteUser}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-ink-hair/70 bg-cream/60 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-red-700/60 hover:text-red-800"
                  >
                    Verwijderen
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[14px] font-medium text-ink"
      >
        {label}
        {required ? (
          <span className="ml-1 text-gold-dark" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-3 w-full rounded-xl border border-ink-hair/70 bg-ivory/70 px-4 py-3.5 text-[16px] text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}

function Select({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[14px] font-medium text-ink"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="mt-3 w-full rounded-xl border border-ink-hair/70 bg-ivory/70 px-4 py-3.5 text-[16px] text-ink focus:border-ink focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
}
