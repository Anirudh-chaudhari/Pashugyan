import imageCompression from "browser-image-compression";

export interface Prediction {
  breed: string;
  confidence: number;
}

export interface ClassificationResult {
  breed: string;
  confidence: number;
  animalType: "cattle" | "buffalo" | "unknown";
  allPredictions: Prediction[];
}

export type ClassifyResponse =
  | { ok: true; data: ClassificationResult }
  | { ok: false; error: string; code: number };

const DEFAULT_ML_BASE =
  "https://anirudh435-cattle-buffalo-breed-fastapi.hf.space";

function normalizeConfidence(value: unknown) {
  if (typeof value === "number") {
    return value > 1 ? value / 100 : value;
  }

  if (typeof value === "string") {
    const clean = value.trim();
    const parsed = parseFloat(clean);

    if (Number.isNaN(parsed)) {
      return 0;
    }

    return clean.includes("%") || parsed > 1 ? parsed / 100 : parsed;
  }

  return 0;
}

/** Normalize whatever the FastAPI returns into our app shape. */
export function normalize(raw: Record<string, unknown>): ClassificationResult {
  const breed = String(
    raw.breed ?? raw.class ?? raw.label ?? raw.prediction ?? "Unknown",
  );
  const confidence = normalizeConfidence(
    raw.confidence ?? raw.score ?? raw.probability,
  );

  const buffaloBreeds = new Set([
    "murrah",
    "surti",
    "mehsana",
    "jaffarabadi",
    "bhadawari",
    "nili-ravi",
    "pandharpuri",
    "nagpuri",
  ]);

  const rawPredictions = (
    (raw.all_predictions ??
      raw.predictions ??
      raw.top_k ??
      raw.top_predictions ??
      []) as Array<Record<string, unknown>>
  ).map((prediction) => ({
    breed: String(
      prediction.breed ?? prediction.class ?? prediction.label ?? "Unknown",
    ),
    confidence: normalizeConfidence(
      prediction.confidence ?? prediction.score ?? prediction.probability,
    ),
  }));

  const allPredictions = rawPredictions.length
    ? rawPredictions
    : [{ breed, confidence }];

  const animalType =
    breed === "Unknown"
      ? "unknown"
      : buffaloBreeds.has(breed.toLowerCase())
        ? "buffalo"
        : "cattle";

  return { breed, confidence, animalType, allPredictions };
}

export async function classifyImage(file: File): Promise<ClassifyResponse> {
  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      preserveExif: false,
    });

    const form = new FormData();
    form.append("file", compressed, compressed.name);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 90_000);

    const response = await fetch("/api/classify", {
      method: "POST",
      body: form,
      signal: controller.signal,
    });
    clearTimeout(timer);

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return {
        ok: false,
        error: "Model is warming up. Please wait 30 seconds and try again.",
        code: 503,
      };
    }

    const payload = (await response.json()) as
      | Record<string, unknown>
      | { error?: string; data?: Record<string, unknown> };

    if (!response.ok) {
      return {
        ok: false,
        error:
          "error" in payload && typeof payload.error === "string"
            ? payload.error
            : `API error ${response.status}`,
        code: response.status,
      };
    }

    const raw = "data" in payload && payload.data ? payload.data : payload;
    return { ok: true, data: normalize(raw as Record<string, unknown>) };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        ok: false,
        error: "Request timed out. The model may still be warming up.",
        code: 408,
      };
    }

    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unexpected error",
      code: 500,
    };
  }
}

export async function pingMLService() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8_000);
    const response = await fetch("/api/classify?ping=1", {
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      return false;
    }

    const payload = (await response.json()) as { ok?: boolean };
    return payload.ok === true;
  } catch {
    return false;
  }
}

export { DEFAULT_ML_BASE };
