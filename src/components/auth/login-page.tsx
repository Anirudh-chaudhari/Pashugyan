"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useSupabaseAuth } from "@/components/auth/supabase-auth-provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const BACKGROUND_IMAGE_PATH = "/images/stitch/sign-in-farm-background.jpg";
const GOOGLE_ICON_PATH = "/images/stitch/sign-in-google.png";

function getSafeRedirectTarget(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const { hasSupabase, isReady, user } = useSupabaseAuth();
  const redirectTo = getSafeRedirectTarget(searchParams.get("redirectTo"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (isReady && user) {
      router.replace(redirectTo);
    }
  }, [isReady, redirectTo, router, user]);

  useEffect(() => {
    if (searchParams.get("error") === "confirmation_failed") {
      setNotice("That confirmation link is invalid or expired. Please try signing in.");
      return;
    }

    if (searchParams.get("registered") === "1") {
      setNotice("Account created successfully. Please sign in to continue.");
    }
  }, [searchParams]);

  const submitLabel = isSubmitting ? "Signing In..." : "Sign In";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasSupabase || !supabase) {
      toast.error("Supabase is not configured yet for this project.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      if (!rememberMe) {
        toast.success("Signed in successfully for this browser session.");
      } else {
        toast.success("Signed in successfully.");
      }

      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected authentication error.";
      setNotice(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const configNotice = !hasSupabase
    ? "Supabase auth is not configured yet for this project."
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf9f8]">
      <header className="z-50 border-b border-[#bfcaba] bg-[#fbf9f8] shadow-sm">
        <div className="flex h-16 w-full items-center justify-between px-4 md:px-8">
          <Link
            className="font-display text-2xl font-bold text-[#0d631b] transition-opacity hover:opacity-90"
            href="/"
          >
            PashuGyan
          </Link>
          <Link
            aria-label="Open help guide"
            className="rounded-full p-2 text-[#0d631b] transition-colors hover:bg-[#f5f3f3]"
            href="/help-guide"
          >
            <span className="material-symbols-outlined">help_outline</span>
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center px-4 py-6 md:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            alt="A lush Indian farm landscape with healthy cattle in soft golden-hour light."
            className="object-cover opacity-20 grayscale-[20%]"
            fill
            priority
            src={BACKGROUND_IMAGE_PATH}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fbf9f8]/80 via-transparent to-[#fbf9f8]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-xl border border-[#bfcaba] bg-white p-8 shadow-[0px_2px_8px_rgba(0,0,0,0.05)] transition-all hover:shadow-lg md:p-10">
            <div className="mb-10 text-center">
              <h1 className="font-display text-[28px] font-bold text-[#1b1c1c] md:text-[32px]">
                Welcome Back
              </h1>
              <p className="mt-2 text-base leading-6 text-[#40493d]">
                Sign in to manage your livestock health and data.
              </p>
            </div>

            {notice || configNotice ? (
              <div className="mb-6 rounded-xl border border-[rgba(147,0,10,0.16)] bg-[rgba(255,218,214,0.7)] px-4 py-3 text-sm leading-6 text-[#1b1c1c]">
                {notice ?? configNotice}
              </div>
            ) : null}

            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#40493d]" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    autoComplete="email"
                    className="h-12 w-full rounded-lg border border-[#707a6c] bg-transparent px-4 text-sm text-[#1b1c1c] outline-none transition-all placeholder:text-[#bfcaba] focus:border-[#0d631b] focus:ring-1 focus:ring-[#0d631b]"
                    id="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    required
                    type="email"
                    value={email}
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-[#40493d]"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    autoComplete="current-password"
                    className="h-12 w-full rounded-lg border border-[#707a6c] bg-transparent px-4 pr-12 text-sm text-[#1b1c1c] outline-none transition-all placeholder:text-[#bfcaba] focus:border-[#0d631b] focus:ring-1 focus:ring-[#0d631b]"
                    id="password"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#40493d] transition-colors hover:text-[#0d631b]"
                    onClick={() => setShowPassword((value) => !value)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="group flex cursor-pointer items-center gap-2">
                  <input
                    checked={rememberMe}
                    className="h-5 w-5 rounded border-[#707a6c] text-[#0d631b] focus:ring-[#0d631b]"
                    onChange={(event) => setRememberMe(event.target.checked)}
                    type="checkbox"
                  />
                  <span className="text-sm font-semibold text-[#40493d] transition-colors group-hover:text-[#1b1c1c]">
                    Remember me
                  </span>
                </label>
                <button
                  className="text-sm font-semibold text-[#0d631b] transition-all hover:underline"
                  onClick={() =>
                    toast.info("Password reset isn't connected yet. Use your registered password for now.")
                  }
                  type="button"
                >
                  Forgot password?
                </button>
              </div>

              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0d631b] text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-[#2e7d32] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting || !hasSupabase}
                type="submit"
              >
                <span>{submitLabel}</span>
                <span className="material-symbols-outlined text-[20px]">login</span>
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#bfcaba]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#40493d]">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex h-12 items-center justify-center gap-2 rounded-lg border border-[#bfcaba] transition-colors hover:bg-[#f5f3f3] active:scale-95"
                onClick={() =>
                  toast.info("Google sign-in isn't connected yet. Use email login for now.")
                }
                type="button"
              >
                <Image alt="Google" className="h-5 w-5" height={20} src={GOOGLE_ICON_PATH} width={20} />
                <span className="text-sm font-semibold text-[#1b1c1c]">Google</span>
              </button>
              <button
                className="flex h-12 items-center justify-center gap-2 rounded-lg border border-[#bfcaba] transition-colors hover:bg-[#f5f3f3] active:scale-95"
                onClick={() =>
                  toast.info("Mobile login isn't connected yet. Use email login for now.")
                }
                type="button"
              >
                <span className="material-symbols-outlined text-[#40493d]">phone_iphone</span>
                <span className="text-sm font-semibold text-[#1b1c1c]">Mobile</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-base text-[#40493d]">
                Don&apos;t have an account?{" "}
                <Link
                  className="font-bold text-[#0d631b] hover:underline"
                  href={`/sign-up?redirectTo=${encodeURIComponent(redirectTo)}`}
                >
                  Sign Up for Free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex w-full flex-col items-center justify-between gap-4 border-t border-[#bfcaba] bg-[#f5f3f3] px-4 py-6 md:flex-row md:px-8">
        <div className="font-display text-xl font-bold text-[#0d631b]">PashuGyan AI</div>
        <div className="text-xs text-[#40493d]">Copyright 2024 PashuGyan AI. Empowering Indian Farmers.</div>
        <div className="flex flex-wrap gap-4 text-xs text-[#40493d]">
          <Link className="opacity-80 transition-colors hover:text-[#0d631b] hover:opacity-100" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="opacity-80 transition-colors hover:text-[#0d631b] hover:opacity-100" href="/terms">
            Terms of Service
          </Link>
          <Link className="opacity-80 transition-colors hover:text-[#0d631b] hover:opacity-100" href="/help-guide">
            Support
          </Link>
        </div>
      </footer>
    </div>
  );
}
