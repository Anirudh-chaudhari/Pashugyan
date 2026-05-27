"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSupabaseAuth } from "@/components/auth/supabase-auth-provider";
import { getUserInitials } from "@/lib/supabase/profile";

const GOOGLE_ICON_PATH = "/images/stitch/sign-up-google.png";
const MAX_AVATAR_FILE_SIZE = 5 * 1024 * 1024;

function getSafeRedirectTarget(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

function readAvatarDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const image = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const maxSize = 160;
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("We couldn't prepare that profile image."));
        return;
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
      URL.revokeObjectURL(objectUrl);
      resolve(dataUrl);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Please choose a valid JPG, PNG, or WebP profile image."));
    };

    image.src = objectUrl;
  });
}

export function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hasSupabase, isReady, user } = useSupabaseAuth();
  const redirectTo = getSafeRedirectTarget(searchParams.get("redirectTo"));

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreparingAvatar, setIsPreparingAvatar] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isReady && user) {
      router.replace(redirectTo);
    }
  }, [isReady, redirectTo, router, user]);

  const submitLabel = isSubmitting ? "Creating Account..." : "Create Account";
  const avatarInitials = getUserInitials(fullName || "Farmer");

  const onAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file for the profile photo.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_AVATAR_FILE_SIZE) {
      toast.error("Profile photo must be 5MB or smaller.");
      event.target.value = "";
      return;
    }

    setIsPreparingAvatar(true);

    try {
      const nextAvatar = await readAvatarDataUrl(file);
      setAvatarDataUrl(nextAvatar);
      toast.success("Profile photo added.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "We couldn't prepare that profile photo.",
      );
    } finally {
      setIsPreparingAvatar(false);
      event.target.value = "";
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasSupabase) {
      toast.error("Supabase is not configured yet for this project.");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Please enter the farmer's full name.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required.");
      return;
    }

    if (password.length < 8) {
      toast.error("Use at least 8 characters for the password.");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please accept the terms and privacy policy to continue.");
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatarDataUrl,
          email: email.trim(),
          fullName: fullName.trim(),
          password,
        }),
      });

      const registerPayload = (await registerResponse.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!registerResponse.ok) {
        throw new Error(
          registerPayload?.error ?? "We couldn't create that farmer account just now.",
        );
      }

      toast.success("Account created. Please sign in to continue.");
      router.push(
        `/sign-in?registered=1&redirectTo=${encodeURIComponent(redirectTo)}`,
      );
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
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#fbf9f8] text-[#1b1c1c]">
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#bfcaba] bg-[#fbf9f8] px-4 shadow-sm md:px-8">
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
      </header>

      <main
        className="flex flex-1 items-center justify-center px-4 py-6 pt-24 md:px-8"
        style={{
          background: "linear-gradient(135deg, #fbf9f8 0%, #edf1ff 100%)",
        }}
      >
        <div className="w-full max-w-[440px]">
          <div className="mb-6 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#2e7d32] text-[#cbffc2] shadow-md">
              <span
                className="material-symbols-outlined text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                agriculture
              </span>
            </div>
            <h1 className="font-display text-[28px] font-bold text-[#1b1c1c] md:text-[32px]">
              Join PashuGyan
            </h1>
            <p className="mt-2 text-base leading-6 text-[#40493d]">
              Empowering your farm with AI-driven breed identification and management.
            </p>
          </div>

          <div className="rounded-xl border border-[#bfcaba] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            {notice || configNotice ? (
              <div className="mb-4 rounded-xl border border-[rgba(147,0,10,0.16)] bg-[rgba(255,218,214,0.7)] px-4 py-3 text-sm leading-6 text-[#1b1c1c]">
                {notice ?? configNotice}
              </div>
            ) : null}

            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="flex flex-col items-center gap-3 rounded-xl border border-[#bfcaba] bg-[#f5f3f3] p-4 text-center">
                <div className="relative">
                  {avatarDataUrl ? (
                    <Image
                      alt="Profile preview"
                      className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-sm"
                      height={80}
                      src={avatarDataUrl}
                      width={80}
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[radial-gradient(circle_at_top_left,rgba(163,246,156,.8),transparent_34%),linear-gradient(135deg,#2e7d32,#0d631b)] text-2xl font-bold tracking-[0.08em] text-white shadow-sm">
                      {avatarInitials}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b1c1c]">
                    Profile Photo
                  </p>
                  <p className="text-xs leading-5 text-[#40493d]">
                    Optional. If you skip this, we&apos;ll use your initials.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <label className="cursor-pointer rounded-full border border-[#2e7d32]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#2e7d32] transition hover:bg-[#2e7d32]/5">
                    {isPreparingAvatar ? "Preparing..." : "Add Photo"}
                    <input
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                      disabled={isPreparingAvatar}
                      onChange={onAvatarChange}
                      type="file"
                    />
                  </label>
                  {avatarDataUrl ? (
                    <button
                      className="rounded-full border border-[#bfcaba] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#40493d] transition hover:bg-[#f0eded]"
                      onClick={() => setAvatarDataUrl(null)}
                      type="button"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-semibold text-[#40493d]"
                  htmlFor="full_name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707a6c]">
                    person
                  </span>
                  <input
                    autoComplete="name"
                    className="h-12 w-full rounded-lg border border-[#707a6c] bg-white pl-12 pr-4 text-sm text-[#1b1c1c] outline-none transition-all placeholder:text-[#bfcaba] focus:border-[#0d631b] focus:ring-1 focus:ring-[#0d631b]"
                    id="full_name"
                    name="full_name"
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your full name"
                    required
                    value={fullName}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#40493d]" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707a6c]">
                    mail
                  </span>
                  <input
                    autoComplete="email"
                    className="h-12 w-full rounded-lg border border-[#707a6c] bg-white pl-12 pr-4 text-sm text-[#1b1c1c] outline-none transition-all placeholder:text-[#bfcaba] focus:border-[#0d631b] focus:ring-1 focus:ring-[#0d631b]"
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

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-semibold text-[#40493d]"
                  htmlFor="password"
                >
                  Create Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707a6c]">
                    lock
                  </span>
                  <input
                    autoComplete="new-password"
                    className="h-12 w-full rounded-lg border border-[#707a6c] bg-white pl-12 pr-12 text-sm text-[#1b1c1c] outline-none transition-all placeholder:text-[#bfcaba] focus:border-[#0d631b] focus:ring-1 focus:ring-[#0d631b]"
                    id="password"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Min. 8 characters"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#707a6c] transition-colors hover:text-[#0d631b]"
                    onClick={() => setShowPassword((value) => !value)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-1 flex items-start gap-3">
                <div className="flex h-5 items-center">
                  <input
                    checked={agreedToTerms}
                    className="h-4 w-4 rounded border-[#707a6c] text-[#0d631b] focus:ring-[#0d631b]"
                    id="terms"
                    onChange={(event) => setAgreedToTerms(event.target.checked)}
                    type="checkbox"
                  />
                </div>
                <label className="text-xs leading-5 text-[#40493d]" htmlFor="terms">
                  I agree to the{" "}
                  <Link className="text-[#0d631b] hover:underline" href="/terms">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link className="text-[#0d631b] hover:underline" href="/privacy-policy">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2e7d32] text-sm font-semibold text-[#cbffc2] shadow-sm transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting || !hasSupabase}
                type="submit"
              >
                {submitLabel}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#bfcaba]" />
              <span className="text-xs font-medium text-[#707a6c]">OR</span>
              <div className="h-px flex-1 bg-[#bfcaba]" />
            </div>

            <button
              className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#bfcaba] bg-[#f0eded] text-sm font-semibold text-[#1b1c1c] transition-colors hover:bg-[#eae8e7]"
              onClick={() =>
                toast.info("Google sign-up isn't connected yet. Use email registration for now.")
              }
              type="button"
            >
              <Image
                alt="Google"
                className="h-5 w-5"
                height={20}
                src={GOOGLE_ICON_PATH}
                width={20}
              />
              Sign up with Google
            </button>
          </div>

          <p className="mt-6 text-center text-base text-[#40493d]">
            Already have an account?{" "}
            <Link
              className="font-bold text-[#0d631b] hover:underline"
              href={`/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`}
            >
              Log in
            </Link>
          </p>
        </div>
      </main>

      <footer className="flex w-full flex-col items-center justify-between gap-4 border-t border-[#bfcaba] bg-[#f5f3f3] px-4 py-6 md:flex-row md:px-8">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-display text-xl font-bold text-[#0d631b]">PashuGyan</span>
          <p className="text-xs text-[#40493d]/80">
            Copyright 2024 PashuGyan AI. Empowering Indian Farmers.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#40493d]">
          <Link className="transition-colors hover:text-[#0d631b]" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="transition-colors hover:text-[#0d631b]" href="/terms">
            Terms of Service
          </Link>
          <Link className="transition-colors hover:text-[#0d631b]" href="/help-guide">
            Support
          </Link>
        </div>
      </footer>

      <div className="pointer-events-none fixed bottom-0 left-0 hidden p-8 opacity-10 lg:block">
        <span
          className="material-symbols-outlined text-[120px] text-[#0d631b]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          potted_plant
        </span>
      </div>
      <div className="pointer-events-none fixed right-0 top-24 hidden p-8 opacity-10 lg:block">
        <span
          className="material-symbols-outlined text-[160px] text-[#8f4e00]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          eco
        </span>
      </div>
    </div>
  );
}
