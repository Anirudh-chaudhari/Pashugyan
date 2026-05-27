import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
}

export function getSupabasePublishableKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    null
  );
}

export function hasSupabaseEnv() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey());
}

export function createSupabaseBrowserClient() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  return createBrowserClient(getSupabaseUrl()!, getSupabasePublishableKey()!);
}
