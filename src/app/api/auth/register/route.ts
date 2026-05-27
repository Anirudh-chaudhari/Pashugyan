import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function isEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

function sanitizeAvatarDataUrl(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!/^data:image\/(jpeg|jpg|png|webp);base64,/i.test(trimmed)) {
    return null;
  }

  if (trimmed.length > 300_000) {
    return null;
  }

  return trimmed;
}

export async function POST(request: Request) {
  const admin = createSupabaseAdminClient();

  if (!admin) {
    return NextResponse.json(
      { error: "Supabase admin credentials are missing." },
      { status: 503 },
    );
  }

  const payload = (await request.json().catch(() => null)) as
    | {
        avatarDataUrl?: unknown;
        email?: unknown;
        fullName?: unknown;
        password?: unknown;
      }
    | null;

  const avatarDataUrl = sanitizeAvatarDataUrl(payload?.avatarDataUrl);
  const email = payload?.email;
  const fullName = payload?.fullName;
  const password = payload?.password;

  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (typeof fullName !== "string" || fullName.trim().length < 2) {
    return NextResponse.json(
      { error: "Please provide the farmer's full name." },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json(
      { error: "Use a password with at least 8 characters." },
      { status: 400 },
    );
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: email.trim().toLowerCase(),
    email_confirm: true,
    password,
    user_metadata: {
      ...(avatarDataUrl ? { avatar_url: avatarDataUrl } : {}),
      full_name: fullName.trim(),
      scan_history: [],
    },
  });

  if (error) {
    return NextResponse.json(
      {
        error:
          error.message === "A user with this email address has already been registered"
            ? "That email is already registered. Please sign in instead."
            : error.message,
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      userId: data.user.id,
    },
    { status: 201 },
  );
}
