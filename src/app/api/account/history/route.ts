import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  getUserDisplayName,
  mergeScanHistory,
  readScanHistoryFromMetadata,
  sanitizeScanHistory,
} from "@/lib/supabase/profile";

async function getAuthenticatedUser() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      error: NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 503 },
      ),
      user: null,
    };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      error: NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      ),
      user: null,
    };
  }

  return { error: null, user };
}

export async function GET() {
  const { error, user } = await getAuthenticatedUser();

  if (error || !user) {
    return error;
  }

  return NextResponse.json({
    history: readScanHistoryFromMetadata(user.user_metadata),
    user: {
      email: user.email ?? null,
      fullName: getUserDisplayName(user),
      id: user.id,
    },
  });
}

export async function PUT(request: Request) {
  const { error, user } = await getAuthenticatedUser();

  if (error || !user) {
    return error;
  }

  const admin = createSupabaseAdminClient();

  if (!admin) {
    return NextResponse.json(
      { error: "Supabase admin credentials are missing." },
      { status: 503 },
    );
  }

  const payload = (await request.json().catch(() => null)) as
    | {
        history?: unknown;
      }
    | null;

  const currentHistory = readScanHistoryFromMetadata(user.user_metadata);
  const nextHistory = mergeScanHistory(
    sanitizeScanHistory(payload?.history),
    currentHistory,
  );
  const nextMetadata =
    typeof user.user_metadata === "object" && user.user_metadata !== null
      ? { ...user.user_metadata, scan_history: nextHistory }
      : { scan_history: nextHistory };

  const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
    user_metadata: nextMetadata,
  });

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    history: nextHistory,
    ok: true,
  });
}
