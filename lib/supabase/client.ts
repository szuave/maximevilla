import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set in the deployed JS bundle. " +
        "Add it as a Netlify build env var and redeploy with cleared cache.",
    );
  }
  if (!key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in the deployed JS bundle. " +
        "Add it as a Netlify build env var and redeploy with cleared cache.",
    );
  }

  return createBrowserClient(url, key);
}
