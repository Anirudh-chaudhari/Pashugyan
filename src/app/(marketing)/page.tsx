import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HomeLanding } from "@/components/home/home-landing";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "PashuGyan | Namaste",
  description:
    "Start on the PashuGyan welcome page, then create an account or sign in to open your farmer dashboard.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/dashboard");
    }
  }

  return <HomeLanding />;
}
