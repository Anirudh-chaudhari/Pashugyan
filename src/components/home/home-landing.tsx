import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  History,
  LayoutDashboard,
  Leaf,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { buildSignUpHref } from "@/lib/auth-links";

const highlights = [
  {
    icon: LayoutDashboard,
    title: "Dashboard first",
    description: "Your personal workspace opens only after sign in.",
  },
  {
    icon: ScanSearch,
    title: "Breed detection",
    description: "Upload a livestock photo when you are ready to identify it.",
  },
  {
    icon: History,
    title: "Private history",
    description: "Each farmer keeps a unique scan history tied to their account.",
  },
  {
    icon: ShieldCheck,
    title: "Secure access",
    description: "Supabase sessions keep your data safe across devices.",
  },
];

const dashboardItems = [
  "Breed detection and upload tools",
  "Breed database and references",
  "Detection history and insights",
  "Personalized farmer account view",
];

export function HomeLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbf9f8] text-[#1b1c1c]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-10rem] h-[26rem] w-[26rem] rounded-full bg-[#2e7d32]/10 blur-3xl" />
        <div className="absolute right-[-6rem] top-[18%] h-[20rem] w-[20rem] rounded-full bg-[#ff8f00]/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[18%] h-[18rem] w-[18rem] rounded-full bg-[#246dc8]/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/80 to-transparent" />
      </div>

      <header className="relative z-10 border-b border-[#bfcaba]/70 bg-white/65 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-4 px-4 md:px-8">
          <Link href="/" className="flex items-center gap-3 rounded-full">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2e7d32] text-white shadow-[0_12px_28px_rgba(46,125,50,.24)]">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-tight text-[#1b1c1c]">
                PashuGyan
              </div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#40493d]/70">
                Livestock AI
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in?redirectTo=/dashboard"
              className="rounded-full border border-[#bfcaba] bg-white px-4 py-2.5 text-sm font-semibold text-[#1b1c1c] transition hover:bg-[#f5f3f3]"
            >
              Sign in
            </Link>
            <Link
              href={buildSignUpHref("/dashboard")}
              className="rounded-full bg-[#ff8f00] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-95 active:scale-95"
            >
              Create account
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-[1440px] items-center gap-12 px-4 py-10 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
        <section className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2e7d32]/15 bg-[#2e7d32]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#2e7d32]">
            <Sparkles className="h-4 w-4" />
            Namaste
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] text-[#1b1c1c] md:text-7xl">
            Namaste, let&apos;s build your
            <span className="block text-[#2e7d32]">livestock dashboard</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#40493d]">
            Start with a simple welcome screen. When you are ready to use the
            platform, create your farmer account or sign in to open the full
            dashboard with breed detection, your scan history, and the entire
            PashuGyan toolkit.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={buildSignUpHref("/dashboard")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2e7d32]/20 transition hover:bg-[#256428] active:scale-95"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sign-in?redirectTo=/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#bfcaba] bg-white px-6 py-3 text-sm font-semibold text-[#1b1c1c] transition hover:bg-[#f5f3f3]"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-[#bfcaba] bg-white/90 p-5 shadow-sm backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2e7d32]/10 text-[#2e7d32]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-base font-semibold text-[#1b1c1c]">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#40493d]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="relative">
          <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-[#2e7d32]/10 blur-2xl lg:block" />
          <div className="rounded-[2.5rem] border border-[#bfcaba] bg-white/90 p-6 shadow-[0_25px_70px_rgba(27,28,28,.10)] backdrop-blur-sm md:p-8">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#1b4332] via-[#2e7d32] to-[#4c9f4a] p-8 text-white shadow-[0_20px_50px_rgba(46,125,50,.30)]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                <ShieldCheck className="h-4 w-4" />
                Secure session
              </div>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                Your dashboard opens after login.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/88">
                Once your account is verified, we route you straight to the main
                dashboard where all your farm tools are available in one place.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {dashboardItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur-md"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#cbffc2]" />
                    <span className="text-sm leading-6 text-white/95">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md">
                <LayoutDashboard className="h-5 w-5 text-[#cbffc2]" />
                <div className="text-sm leading-6 text-white/90">
                  After sign in, you&apos;ll land on <span className="font-semibold">Dashboard</span>, then you can
                  jump into Detect, Database, and History.
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.75rem] border border-[#bfcaba] bg-[#fbf9f8] p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2e7d32]">
                  Farmer flow
                </div>
                <div className="mt-2 text-lg font-semibold text-[#1b1c1c]">
                  Register, then sign in
                </div>
                <p className="mt-2 text-sm leading-6 text-[#40493d]">
                  New users create an account first. Returning users go straight
                  to login.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-[#bfcaba] bg-[#fbf9f8] p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff8f00]">
                  Activity gate
                </div>
                <div className="mt-2 text-lg font-semibold text-[#1b1c1c]">
                  Protected tools
                </div>
                <p className="mt-2 text-sm leading-6 text-[#40493d]">
                  Detect and the dashboard stay behind authentication for each
                  unique farmer.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
