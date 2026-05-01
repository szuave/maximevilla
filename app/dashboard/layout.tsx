import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardChrome } from "./dashboard-chrome";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, company")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <DashboardChrome
      user={{
        email: user.email ?? "",
        name: profile?.full_name ?? null,
        company: profile?.company ?? null,
        role: profile?.role ?? "partner",
      }}
    >
      {children}
    </DashboardChrome>
  );
}
