import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { hasSupabaseEnv } from "@/lib/supabase/client";

export function createSupabaseServerClient() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: Record<string, unknown>) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            return;
          }
        },
        remove(name: string, options: Record<string, unknown>) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            return;
          }
        },
      },
    },
  );
}
