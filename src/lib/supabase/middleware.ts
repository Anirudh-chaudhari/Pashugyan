import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
  hasSupabaseEnv,
} from "@/lib/supabase/client";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!hasSupabaseEnv()) {
    return response;
  }

  try {
    const supabase = createServerClient(
      getSupabaseUrl()!,
      getSupabasePublishableKey()!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet, headers) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );

            response = NextResponse.next({ request });

            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );

            Object.entries(headers ?? {}).forEach(([key, value]) => {
              response.headers.set(key, value);
            });
          },
        },
      },
    );

    await supabase.auth.getUser();
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  } catch {
    return NextResponse.next({ request });
  }
}
