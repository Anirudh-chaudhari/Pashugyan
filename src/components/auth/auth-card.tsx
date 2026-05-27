"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useSupabaseAuth } from "@/components/auth/supabase-auth-provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthMode = "sign-in" | "sign-up";

type AuthCardProps = {
  mode: AuthMode;
};

export function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const { hasSupabase, isReady, user } = useSupabaseAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (isReady && user) {
      router.replace("/dashboard");
    }
  }, [isReady, router, user]);

  useEffect(() => {
    if (searchParams.get("error") === "confirmation_failed") {
      setNotice("That confirmation link is invalid or expired. Please try signing in.");
    }
  }, [searchParams]);

  const isSignUp = mode === "sign-up";

  const heading = isSignUp ? "Create farmer account" : "Sign in to PashuGyan";
  const submitLabel = isSubmitting
    ? isSignUp
      ? "Creating account..."
      : "Signing in..."
    : isSignUp
      ? "Create account"
      : "Sign in";

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

    if (isSignUp) {
      if (!fullName.trim()) {
        toast.error("Please enter the farmer's full name.");
        return;
      }

      if (password.length < 8) {
        toast.error("Use at least 8 characters for the password.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      if (isSignUp) {
        const registerResponse = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            fullName,
            password,
          }),
        });

        const registerPayload = (await registerResponse.json().catch(() => null)) as
          | { error?: string }
          | null;

        if (!registerResponse.ok) {
          throw new Error(
            registerPayload?.error ??
              "We couldn't create that farmer account just now.",
          );
        }
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success(
        isSignUp
          ? "Farmer account created and signed in."
          : "Signed in successfully.",
      );

      router.push("/dashboard");
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

  return (
    <div className="w-full max-w-xl rounded-[36px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-8 shadow-lifted">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-forest)]">
        PashuGyan
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--text-primary)]">
        {heading}
      </h1>
      <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
        {isSignUp
          ? "Register each farmer with Supabase so their scan history stays unique and syncs into the dashboard."
          : "Use your farmer account to sync breed detections and farmer dashboard history across devices."}
      </p>

      {notice ? (
        <div className="mt-6 rounded-3xl border border-[rgba(147,0,10,0.18)] bg-[rgba(255,218,214,0.58)] px-5 py-4 text-sm leading-6 text-[var(--text-primary)]">
          {notice}
        </div>
      ) : null}

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        {isSignUp ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
              Farmer name
            </span>
            <input
              autoComplete="name"
              className="focus-ring w-full rounded-2xl border border-[var(--border-raw)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)]"
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Rajesh Kumar"
              required
              value={fullName}
            />
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
            Email
          </span>
          <input
            autoComplete="email"
            className="focus-ring w-full rounded-2xl border border-[var(--border-raw)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)]"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="farmer@example.com"
            required
            type="email"
            value={email}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
            Password
          </span>
          <input
            autoComplete={isSignUp ? "new-password" : "current-password"}
            className="focus-ring w-full rounded-2xl border border-[var(--border-raw)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)]"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            required
            type="password"
            value={password}
          />
        </label>

        {isSignUp ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
              Confirm password
            </span>
            <input
              autoComplete="new-password"
              className="focus-ring w-full rounded-2xl border border-[var(--border-raw)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)]"
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat password"
              required
              type="password"
              value={confirmPassword}
            />
          </label>
        ) : null}

        <button
          className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting || !hasSupabase}
          type="submit"
        >
          {submitLabel}
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
        <span>
          {isSignUp ? "Already have an account?" : "Need a new farmer account?"}
        </span>
        <Link
          className="font-semibold text-[var(--color-forest)] transition hover:opacity-80"
          href={isSignUp ? "/sign-in" : "/sign-up"}
        >
          {isSignUp ? "Sign in" : "Register now"}
        </Link>
      </div>
    </div>
  );
}
