import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_ML_BASE } from "@/lib/classify";

const ML_BASE =
  process.env.ML_API_URL ?? process.env.NEXT_PUBLIC_ML_API_URL ?? DEFAULT_ML_BASE;

export async function GET(request: NextRequest) {
  if (!request.nextUrl.searchParams.has("ping")) {
    return NextResponse.json({ ok: true, url: ML_BASE });
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8_000);
    const response = await fetch(ML_BASE, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timer);

    return NextResponse.json({ ok: response.ok }, { status: response.ok ? 200 : 503 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const incoming = await request.formData();
    const file = incoming.get("file");

    if (!(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No image received. Please upload a JPG, PNG, or WEBP file." },
        { status: 400 },
      );
    }

    const forward = new FormData();
    forward.append(
      "file",
      file,
      "name" in file && typeof file.name === "string" ? file.name : "upload.jpg",
    );

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 90_000);

    const response = await fetch(`${ML_BASE}/predict`, {
      method: "POST",
      body: forward,
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timer);

    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        {
          error:
            "Model is warming up. Please wait 30 seconds and try the scan again.",
        },
        { status: 503 },
      );
    }

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            payload?.error ??
            payload?.detail ??
            `Upstream model request failed with status ${response.status}.`,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(payload);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Model request timed out. Please retry in a few moments." },
        { status: 408 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected model gateway error.",
      },
      { status: 500 },
    );
  }
}
